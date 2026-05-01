# API Cleanup Error Handling Guide

## Overview

This document explains the enhanced error handling and retry mechanisms implemented to address API availability issues during test cleanup operations.

## Problem Description

The original issue was that the CDM (Client Data Management) API at `https://api.fairstone.co.uk/cdm/qa` was returning 403 "Site Disabled" errors, causing verbose error logs during test cleanup. While the main tests passed, the cleanup failures generated extensive error output.

## Solution Components

### 1. API Availability Check

The `ApiClient` now includes an `isApiAvailable()` method that:
- Attempts a lightweight health check first
- Falls back to a minimal factfinds request if health endpoint doesn't exist
- Returns `true` if API is responsive, `false` otherwise
- Uses a 5-second timeout to avoid hanging

### 2. Retry Mechanism with Exponential Backoff

The `retryWithBackoff()` method provides:
- Configurable maximum retry attempts (default: 3)
- Exponential backoff delay calculation: `baseDelay * 2^(attempt-1)`
- Graceful error handling between attempts
- Final error propagation if all attempts fail

### 3. Enhanced Error Categorization

The `getErrorMessage()` method categorizes errors:
- **403 Errors**: "API service unavailable"
- **HTTP Errors**: Status code and message
- **Network Errors**: Connection issues
- **Generic Errors**: Fallback handling

### 4. Configurable Cleanup Options

The `TestCleanupHelper` now supports:
- **Skip Cleanup**: Environment variable `SKIP_CLEANUP=true`
- **Timeout Control**: Configurable operation timeouts
- **Retry Configuration**: Adjustable retry attempts
- **Graceful Degradation**: Continue tests even if cleanup fails

## Usage Examples

### Basic Usage (Backward Compatible)

```typescript
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

// Simple cleanup (uses defaults)
await cleanupClient1FactFinds();
```

### Advanced Configuration

```typescript
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

// Cleanup with custom options
await cleanupClient1FactFinds({
  skipCleanup: false,        // Don't skip cleanup
  maxRetries: 2,             // Retry up to 2 times
  timeoutMs: 15000,          // 15-second timeout
  typeId: 1,                 // Filter by fact find type
  statusId: 1                // Filter by status (Open)
});
```

### Environment-Based Control

Set in `.env.qa` file:
```bash
# Skip cleanup entirely when API is unavailable
SKIP_CLEANUP=true
```

## Error Handling Behavior

### API Unavailable (403 Errors)
- **Detection**: Checks for 403 status or "Site Disabled" message
- **Action**: Logs warning and skips cleanup gracefully
- **Impact**: Test continues without failure

### Network Issues
- **Detection**: ECONNREFUSED, ENOTFOUND, timeout errors
- **Action**: Retry with exponential backoff
- **Fallback**: Skip cleanup after max retries

### Timeout Handling
- **API Check**: 10-second timeout for availability check
- **Cleanup Operation**: Configurable timeout (default: 30 seconds)
- **Behavior**: Graceful timeout with warning message

## Implementation Details

### CDM API Client Enhancements

```typescript
// Check API availability before operations
const isAvailable = await api.isApiAvailable();
if (!isAvailable) {
  throw new Error('API is not available - skipping cleanup');
}

// Retry mechanism for critical operations
await this.retryWithBackoff(async () => {
  // Your API operation here
}, 3, 2000); // 3 retries, 2-second base delay
```

### Test Integration

```typescript
// In your test files
import { cleanupClient1FactFinds } from '@framework/utils/TestCleanupHelper';

test('My test', async () => {
  // ... test logic ...
  
  // Cleanup with error handling
  await cleanupClient1FactFinds({
    maxRetries: 2,
    timeoutMs: 15000
  });
});
```

## Monitoring and Debugging

### Log Messages

The enhanced system provides categorized log messages:

```
[Cleanup] Checking API availability...
[Cleanup] API service unavailable (1234ms): API service unavailable (403: Site Disabled)
[Cleanup] Test will continue despite cleanup failure
```

### Error Categories

1. **API Unavailable**: 403 errors, site disabled
2. **Network Issues**: Connection refused, DNS resolution
3. **Timeouts**: Operation or availability check timeouts
4. **Generic Errors**: Other unexpected errors

## Best Practices

### For Test Authors

1. **Use Default Settings**: The defaults are optimized for most scenarios
2. **Configure Timeouts**: Adjust based on your test environment
3. **Monitor Logs**: Check cleanup status in test output
4. **Environment Control**: Use `SKIP_CLEANUP=true` when API is down

### For CI/CD Pipelines

1. **Set Environment Variables**: Configure `SKIP_CLEANUP` based on API status
2. **Monitor Cleanup Success**: Track cleanup failure rates
3. **Adjust Timeouts**: Increase timeouts for slower environments
4. **Graceful Degradation**: Ensure tests pass even with cleanup failures

## Troubleshooting

### Common Issues

1. **API Always Unavailable**
   - Check API endpoint URL in `.env.qa`
   - Verify API key validity
   - Confirm network connectivity

2. **Cleanup Timeouts**
   - Increase `timeoutMs` in cleanup options
   - Check API response times
   - Consider reducing retry attempts

3. **Excessive Retry Attempts**
   - Reduce `maxRetries` for faster failure
   - Implement circuit breaker pattern if needed
   - Monitor API availability trends

### Quick Fixes

```bash
# Temporarily disable cleanup
export SKIP_CLEANUP=true

# Or set in .env.qa
echo "SKIP_CLEANUP=true" >> .env.qa
```

## Future Enhancements

1. **Circuit Breaker**: Implement circuit breaker pattern for repeated failures
2. **Health Dashboard**: API availability monitoring dashboard
3. **Cleanup Metrics**: Track cleanup success/failure rates
4. **Alternative Cleanup**: Fallback cleanup mechanisms
5. **Batch Operations**: Optimize API calls for better performance

## Related Files

- `framework/src/utils/cdm.ts` - Enhanced API client
- `framework/src/utils/TestCleanupHelper.ts` - Improved cleanup helper
- `projects/gateway-ui/environments/.env.qa` - Environment configuration
- `projects/gateway-ui/tests/smoke/create_core_fact_find.smoke.spec.ts` - Example usage