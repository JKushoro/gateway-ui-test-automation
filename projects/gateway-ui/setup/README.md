# Gateway UI Setup System

This directory contains the centralized setup system for Gateway UI test automation, providing a clean and maintainable approach to environment management and test initialization.

## Overview

The new setup system replaces the old `NavigationSteps` approach with a more comprehensive and flexible solution that:

- Centralizes URL management in one place
- Supports multiple environments (QA, Development, Production)
- Removes hardcoded URLs from page objects
- Reuses assertion methods from existing steps
- Provides simple and comprehensive setup options

## Components

### 1. EnvironmentSetup

**File:** [`EnvironmentSetup.ts`](./EnvironmentSetup.ts)

Centralized environment configuration management that loads settings from environment-specific `.env` files.

**Features:**

- Singleton pattern for consistent configuration access
- Automatic loading of environment variables
- Support for QA, Development, and Production environments
- Configuration validation
- Easy access to URLs, timeouts, and browser settings

**Usage:**

```typescript
const envSetup = EnvironmentSetup.getInstance('qa');
const baseUrl = envSetup.getBaseUrl();
const dashboardUrl = envSetup.getDashboardUrl();
const timeout = envSetup.getTestTimeout();
```

### 2. GatewaySetup

**File:** [`GatewaySetup.ts`](./GatewaySetup.ts)

Comprehensive setup class that combines navigation, authentication, and assertions.

**Features:**

- Quick setup for smoke tests
- Full setup for comprehensive tests
- Environment-specific setup
- Delegates to existing DashboardSteps for assertions
- Backward compatibility with NavigationSteps

**Usage:**

```typescript
// Quick setup for smoke tests
const gatewaySetup = new GatewaySetup(page, 'qa');
await gatewaySetup.quickSetup();

// Full setup with all verifications
await gatewaySetup.fullSetup();

// Environment-specific setup
const qaSetup = await GatewaySetup.setupForEnvironment(page, 'qa');
```

## Environment Configuration

Environment-specific configuration files are located in [`../environments/`](../environments/):

- **QA:** `.env.qa` - QA environment settings
- **Development:** `.env.development` - Local development settings
- **Production:** `.env.production` - Production environment settings

### Configuration Structure

Each environment file contains:

```bash
# Base URLs
BASE_URL=https://qa-fairstonegateway.fairstone.co.uk
DASHBOARD_URL=https://qa-fairstonegateway.fairstone.co.uk/dashboard/developmentdash

# Timeouts
TEST_TIMEOUT=30000
NAVIGATION_TIMEOUT=60000
ELEMENT_TIMEOUT=15000

# Browser Configuration
HEADLESS=false
BROWSER=chromium
VIEWPORT_WIDTH=1280
VIEWPORT_HEIGHT=720

# Logging
LOG_LEVEL=info
SCREENSHOT_ON_FAILURE=true
VIDEO_ON_FAILURE=true

# Test Data
TEST_ENVIRONMENT=qa
```

## Migration Guide

### From NavigationSteps to GatewaySetup

**Old Approach (Deprecated):**

```typescript
import { NavigationSteps } from '@steps/NavigationSteps';

const navigationSteps = new NavigationSteps(page);
await navigationSteps.navigateToGatewayQA();
```

**New Approach:**

```typescript
import { GatewaySetup } from '@setup/GatewaySetup';

const gatewaySetup = new GatewaySetup(page, 'qa');
await gatewaySetup.quickSetup(); // or fullSetup()
```

### Benefits of Migration

1. **Centralized Configuration:** All URLs and settings in one place
2. **Environment Flexibility:** Easy switching between QA, Dev, and Prod
3. **Better Assertions:** Reuses existing DashboardSteps methods
4. **Cleaner Page Objects:** LoginPageLocators now only contains locators
5. **Improved Maintainability:** Single source of truth for environment settings

## Usage Examples

### 1. Basic Smoke Test

```typescript
import { test } from '@playwright/test';
import { GatewaySetup } from '@setup/GatewaySetup';

test('Basic smoke test', async ({ page }) => {
  const gatewaySetup = new GatewaySetup(page, 'qa');
  await gatewaySetup.quickSetup();

  // Test is now ready with user logged in and on dashboard
});
```

### 2. Comprehensive Test with Verifications

```typescript
test('Comprehensive dashboard test', async ({ page }) => {
  const gatewaySetup = new GatewaySetup(page, 'qa');
  await gatewaySetup.fullSetup();

  // All dashboard metrics and menu items are verified
  await gatewaySetup.verifyMetricValuesAreValid();
});
```

### 3. Environment-Specific Test

```typescript
test('Environment-specific test', async ({ page }) => {
  const setup = await GatewaySetup.setupForEnvironment(page, 'development');

  const envConfig = setup.getEnvironmentSetup();
  console.log('Testing on:', envConfig.getEnvironment());
});
```

### 4. Using Dashboard Operations

```typescript
test('Dashboard operations', async ({ page }) => {
  const gatewaySetup = new GatewaySetup(page, 'qa');
  await gatewaySetup.quickSetup();

  // Access dashboard operations
  await gatewaySetup.performSearch('client name');
  await gatewaySetup.navigateToSection('clients');

  // Get dashboard state for debugging
  const state = await gatewaySetup.getDashboardState();
  console.log('Dashboard state:', state);
});
```

## Setup Methods

### GatewaySetup Methods

| Method                      | Description                                  | Use Case                  |
| --------------------------- | -------------------------------------------- | ------------------------- |
| `quickSetup()`              | Fast setup with minimal verification         | Smoke tests, quick checks |
| `fullSetup()`               | Complete setup with all verifications        | Comprehensive tests       |
| `setupForEnvironment()`     | Static method for environment-specific setup | Environment testing       |
| `setupGatewayApplication()` | Core setup method                            | Custom setup flows        |

### Verification Methods (Delegated to DashboardSteps)

| Method                            | Description                                |
| --------------------------------- | ------------------------------------------ |
| `verifyDashboardMetrics()`        | Verify all dashboard metrics are visible   |
| `verifySideMenuItems()`           | Verify side menu navigation items          |
| `verifyMetricValuesAreValid()`    | Verify metric values are numeric and valid |
| `verifyUserProfileAccess()`       | Verify user profile and login status       |
| `verifyDashboardResponsiveness()` | Verify dashboard elements are interactive  |

### Navigation Methods

| Method                           | Description                               |
| -------------------------------- | ----------------------------------------- |
| `navigateToSection(sectionName)` | Navigate to specific dashboard section    |
| `performSearch(searchTerm)`      | Perform search operation                  |
| `getAllMetricValues()`           | Get all dashboard metric values           |
| `getDashboardState()`            | Get current dashboard state for debugging |

## Best Practices

1. **Use Quick Setup for Smoke Tests:** Faster execution with minimal verification
2. **Use Full Setup for Comprehensive Tests:** Includes all necessary verifications
3. **Environment Configuration:** Always specify environment explicitly
4. **Error Handling:** Use `getDashboardState()` for debugging failed tests
5. **Reuse Assertions:** Leverage existing DashboardSteps methods through GatewaySetup

## Backward Compatibility

The old `NavigationSteps` class is still available but deprecated. It now delegates to `GatewaySetup` internally and shows deprecation warnings. This ensures existing tests continue to work while encouraging migration to the new approach.

## File Structure

```
setup/
├── README.md                    # This documentation
├── EnvironmentSetup.ts         # Environment configuration management
└── GatewaySetup.ts            # Main setup class

environments/
├── .env.qa                     # QA environment configuration
├── .env.development           # Development environment configuration
└── .env.production           # Production environment configuration

tests/examples/
└── gateway-setup-example.spec.ts  # Example usage patterns
```

## Troubleshooting

### Common Issues

1. **Import Errors:** Ensure `@setup/*` path is added to `tsconfig.json`
2. **Environment Not Found:** Check that the environment file exists in `environments/`
3. **Configuration Missing:** Use `validateConfig()` to check required settings
4. **Setup Failures:** Use `getDashboardState()` to debug the current state

### Debug Information

```typescript
const gatewaySetup = new GatewaySetup(page, 'qa');
const envSetup = gatewaySetup.getEnvironmentSetup();

console.log('Environment:', envSetup.getEnvironment());
console.log('Base URL:', envSetup.getBaseUrl());
console.log('Configuration:', envSetup.getAllConfig());

const dashboardState = await gatewaySetup.getDashboardState();
console.log('Dashboard State:', dashboardState);
```
