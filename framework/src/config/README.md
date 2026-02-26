# Playwright Configuration Builder

Reusable Playwright configuration that works for any project in the framework.

## Usage

### Quick Setup (Recommended)
```typescript
// playwright.config.ts
import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

export default PlaywrightConfigBuilder.quickConfig('your-project-name');
```

### Custom Configuration
```typescript
// playwright.config.ts
import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

export default PlaywrightConfigBuilder.buildConfig({
  testDir: './custom-tests',
  workers: 2,
  use: {
    headless: false,
  }
});
```

## Features

- **Standardized Settings**: Consistent configuration across all projects
- **Environment-Aware**: Automatically loads BASE_URL from environment
- **Comprehensive Reporting**: HTML, JSON, Allure, JUnit, and GitHub integration
- **CI/CD Ready**: Optimized for both local development and CI environments
- **Rate Limiting Safe**: Single worker to avoid API rate limits
- **Full Debugging**: Screenshots, videos, and traces enabled

## Configuration Includes

- `fullyParallel: false` - Sequential test execution
- `workers: 1` - Single worker to avoid rate limiting
- `retries: 2` in CI, `1` locally
- Multiple reporters (HTML, JSON, Allure, JUnit, List, GitHub)
- Full tracing, screenshots, and video recording
- 45-second timeouts for actions and navigation
- 1920x1080 viewport