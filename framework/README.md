# UI Test Automation Framework

A comprehensive, enterprise-grade UI test automation framework built with Playwright and TypeScript. Designed for professional test automation with clean architecture, type safety, and extensive helper utilities.

## Table of Contents

- [Overview](#overview)
- [Framework Architecture](#framework-architecture)
- [Core Components](#core-components)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)
- [Testing Patterns](#testing-patterns)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Support](#support)

## Overview

This framework provides a complete solution for UI test automation with the following key benefits:

**For Beginners:**
- Simple, intuitive API that requires minimal setup
- Pre-built common patterns and actions
- Comprehensive documentation with examples
- Clear error messages and debugging support

**For Advanced Users:**
- Extensible architecture for custom implementations
- Advanced configuration options
- Performance monitoring and optimization tools
- Integration with CI/CD pipelines

**For Teams:**
- Consistent coding standards and patterns
- Reusable components across projects
- Centralized configuration management
- Comprehensive reporting and analytics

## Framework Architecture

The framework follows a modular architecture with clear separation of concerns:

```
framework/
├── src/
│   ├── core/                   # Base classes and core functionality
│   │   ├── BasePage.ts         # Foundation for all page objects
│   │   ├── BaseUIPage.ts       # Enhanced base with common UI patterns
│   │   └── BaseSteps.ts        # Foundation for step definition classes
│   ├── helpers/                # Specialized helper classes
│   │   ├── ActionHelper.ts     # User interactions (click, type, select)
│   │   ├── WaitHelper.ts       # Smart waiting strategies
│   │   ├── LocatorHelper.ts    # Element location strategies
│   │   ├── AssertionHelper.ts  # Comprehensive assertions
│   │   ├── ElementHelper.ts    # Element manipulation utilities
│   │   └── AuthenticationHelper.ts # Authentication flows
│   ├── config/                 # Configuration management
│   │   ├── EnvManager.ts       # Environment configuration
│   │   └── PlaywrightConfigBuilder.ts # Playwright configuration
│   ├── utils/                  # Utilities and tools
│   │   ├── TestDataGenerator.ts # Test data generation
│   │   ├── UITestUtils.ts      # UI-specific utilities
│   │   └── ApiHelper.ts        # API testing support
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts            # Framework type exports
│   └── index.ts                # Main framework exports
├── package.json                # Framework dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This documentation
```

## Core Components

### Base Classes

#### BasePage
The foundation class for all page objects, providing:
- Navigation utilities with proper error handling
- Common page operations with timeout management
- Comprehensive helper composition
- Configuration management

```typescript
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly actionHelper: ActionHelper;
  protected readonly waitHelper: WaitHelper;
  protected readonly locatorHelper: LocatorHelper;
  protected readonly assertionHelper: AssertionHelper;
  protected readonly elementHelper: typeof ElementHelper;
  protected readonly config: Partial<FrameworkConfig>;

  // Abstract methods that must be implemented
  public abstract navigate(): Promise<void>;
  public abstract waitForPageLoad(): Promise<void>;
  public abstract isPageLoaded(): Promise<boolean>;
}
```

#### BaseUIPage
Enhanced base class with additional UI-specific functionality:
- Form handling utilities with validation
- Common UI patterns (modals, dropdowns, tables)
- Standardized CRUD operations
- Built-in accessibility helpers

```typescript
export abstract class BaseUIPage extends BasePage {
  protected abstract pageIdentifier: string;
  protected abstract pageTitle: string;
  protected abstract pageUrl: string;

  // Pre-built common operations
  protected async performSave(): Promise<void>;
  protected async performCancel(): Promise<void>;
  protected async fillFormField(fieldName: string, value: string | boolean): Promise<void>;
}
```

#### BaseSteps
Foundation for step definition classes:
- Business logic organization
- Cross-page workflow management
- Test data handling
- Assertion patterns

### Helper Classes

#### ActionHelper
Handles all user interactions with enhanced reliability:

```typescript
export class ActionHelper {
  // Click operations with smart waiting
  public async click(selector: string, options: ClickOptions = {}): Promise<void>;
  public async clickLocator(locator: Locator, options: ClickOptions = {}): Promise<void>;
  
  // Text input with validation
  public async fill(selector: string, value: string, options: ActionOptions = {}): Promise<void>;
  public async fillInputByLabel(label: string, value: string, exact: boolean = true): Promise<void>;
  
  // Selection operations
  public async selectOptionFromDropdown(selector: string, label: string): Promise<void>;
  public async checkCheckbox(selector: string, options: ActionOptions = {}): Promise<void>;
  
  // Advanced interactions
  public async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void>;
  public async uploadFile(selector: string, filePath: string | string[]): Promise<void>;
}
```

#### WaitHelper
Provides intelligent waiting strategies:

```typescript
export class WaitHelper {
  // Element state waiting
  public async waitForElement(locator: Locator, timeout?: number): Promise<void>;
  public async waitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void>;
  
  // Custom condition waiting
  public async waitForCondition(condition: () => Promise<boolean>, timeout?: number): Promise<void>;
  public async waitForUrlToMatch(pattern: RegExp, timeout?: number): Promise<void>;
}
```

#### LocatorHelper
Advanced element location strategies:

```typescript
export class LocatorHelper {
  // Multiple locator strategies
  public getLocator(selector: string): Locator;
  public getByTestId(testId: string): Locator;
  public getInputByLabel(label: string, exact: boolean = true): Locator;
  public getButtonByText(text: string, exact: boolean = true): Locator;
  
  // Fallback locator support
  public getLocatorWithFallbacks(selectors: string[]): Locator;
}
```

#### AssertionHelper
Comprehensive assertion library:

```typescript
export class AssertionHelper {
  // Element state assertions
  public async assertElementVisible(locator: Locator): Promise<void>;
  public async assertElementHidden(locator: Locator): Promise<void>;
  
  // Content assertions
  public async assertTextContent(locator: Locator, expectedText: string): Promise<void>;
  public async assertElementCount(locator: Locator, expectedCount: number): Promise<void>;
  
  // Page assertions
  public async assertPageTitle(expectedTitle: string): Promise<void>;
  public async assertPageUrl(expectedUrl: string | RegExp): Promise<void>;
}
```

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Framework Installation

1. **Install the framework package:**
   ```bash
   npm install @fairstone/ui-automation-framework
   ```

2. **Install peer dependencies:**
   ```bash
   npm install @playwright/test playwright
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Development Setup

For framework development or customization:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd framework
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the framework:**
   ```bash
   npm run build
   ```

4. **Run framework tests:**
   ```bash
   npm test
   ```

## Quick Start

### Basic Page Object Following Framework Patterns

```typescript
import { BasePage } from '@framework/core/BasePage';
import { Page } from '@playwright/test';

export class LoginPageLocators extends BasePage {
  
  constructor(page: Page) {
    super(page);
  }

  // Organized locators using framework patterns
  public get locators() {
    return {
      usernameInput: this.locatorHelper.getByTestId('username-input') || 
                     this.locatorHelper.getInputByLabel('Username') ||
                     this.locatorHelper.getLocator('#username'),
      
      passwordInput: this.locatorHelper.getByTestId('password-input') || 
                     this.locatorHelper.getInputByLabel('Password') ||
                     this.locatorHelper.getLocator('#password'),
      
      loginButton: this.locatorHelper.getByTestId('login-button') || 
                   this.locatorHelper.getButtonByText('Login') ||
                   this.locatorHelper.getLocator('button[type="submit"]'),
      
      errorMessage: this.locatorHelper.getByTestId('error-message') ||
                    this.locatorHelper.getLocator('.error-message, .alert-error')
    };
  }

  // Required abstract method implementations
  public async navigate(): Promise<void> {
    await this.navigateToPath('/login');
  }

  public async waitForPageLoad(): Promise<void> {
    await this.waitHelper.waitForElement(this.locators.usernameInput);
    await this.waitHelper.waitForElement(this.locators.passwordInput);
    await this.waitHelper.waitForElement(this.locators.loginButton);
  }

  public async isPageLoaded(): Promise<boolean> {
    try {
      await this.waitForPageLoad();
      return true;
    } catch {
      return false;
    }
  }

  // Business logic methods
  public async fillUsername(username: string): Promise<void> {
    await this.actionHelper.fillInputByLabel('Username', username);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.actionHelper.fillInputByLabel('Password', password);
  }

  public async clickLogin(): Promise<void> {
    await this.actionHelper.clickLocator(this.locators.loginButton);
  }

  public async getErrorMessage(): Promise<string> {
    await this.waitHelper.waitForElement(this.locators.errorMessage);
    return await this.actionHelper.getTrimmedText(this.locators.errorMessage);
  }
}
```

### Enhanced Page Object Using BaseUIPage

```typescript
import { BaseUIPage } from '@framework/core/BaseUIPage';
import { Page } from '@playwright/test';

export class UserManagementPage extends BaseUIPage {
  protected pageIdentifier = '[data-testid="user-management"]';
  protected pageTitle = 'User Management';
  protected pageUrl = '/admin/users';

  constructor(page: Page) {
    super(page);
  }

  get locators() {
    return {
      addUserButton: this.locatorHelper.getByTestId('add-user'),
      userTable: this.locatorHelper.getByTestId('user-table'),
      searchInput: this.locatorHelper.getByTestId('search-users')
    };
  }

  // Using inherited form handling
  public async createUser(userData: UserData): Promise<void> {
    await this.performCreate(); // Inherited method
    
    await this.fillFormField('firstName', userData.firstName);
    await this.fillFormField('lastName', userData.lastName);
    await this.fillFormField('email', userData.email);
    await this.fillFormField('role', userData.role, 'select');
    
    await this.performSave(); // Inherited method
  }

  // Using inherited search functionality
  public async searchUsers(searchTerm: string): Promise<void> {
    await this.performSearch(searchTerm, '[data-testid="search-users"]');
  }
}
```

### Step Definition Class Following Framework Patterns

```typescript
import { Page } from '@playwright/test';
import { BaseSteps } from '@framework/core/BaseSteps';
import { LoginPageLocators } from '../pages/LoginPageLocators';
import { DashboardPage } from '../pages/DashboardPage';

export class AuthSteps extends BaseSteps {
  private loginPage: LoginPageLocators;
  private dashboardPage: DashboardPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPageLocators(page);
    this.dashboardPage = new DashboardPage(page);
  }

  public async authenticateUser(): Promise<void> {
    await this.loginPage.navigate();
    await this.loginPage.waitForPageLoad();
    
    // OAuth authentication logic here
    await this.performOAuthLogin();
    
    await this.verifyDashboardAccess();
  }

  public async verifyDashboardAccess(): Promise<void> {
    await this.dashboardPage.waitForPageLoad();
    await this.assertionHelper.assertPageUrl(/dashboard/);
  }

  private async performOAuthLogin(): Promise<void> {
    // OAuth-specific implementation
    // Framework handles the complexity
  }
}
```

### Test Implementation Following Best Practices

```typescript
import { test, expect } from '@playwright/test';
import { AuthSteps } from '../steps/AuthSteps';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';

test.describe('Authentication Tests', () => {
  let authSteps: AuthSteps;
  let testDataGenerator: TestDataGenerator;

  test.beforeEach(async ({ page }) => {
    authSteps = new AuthSteps(page);
    testDataGenerator = new TestDataGenerator();
  });

  test('should authenticate user successfully', async () => {
    await authSteps.authenticateUser();
    
    const authState = await authSteps.getAuthenticationState();
    expect(authState.isAuthenticated).toBe(true);
    expect(authState.onDashboard).toBe(true);
  });

  test('should handle authentication errors gracefully', async () => {
    // Test error scenarios
    await expect(async () => {
      await authSteps.authenticateWithInvalidCredentials();
    }).rejects.toThrow('Authentication failed');
  });
});
```

## Configuration

### Environment Configuration

```typescript
// Using EnvManager for configuration
import { EnvManager } from '@framework/config/EnvManager';

const envManager = EnvManager.getInstance();

// Environment-specific settings
const config = {
  baseUrl: envManager.getBaseUrl(),
  timeout: envManager.getTimeout(),
  browser: envManager.getBrowser(),
  headless: envManager.isHeadless()
};
```

### Playwright Configuration

```typescript
import { PlaywrightConfigBuilder } from '@framework/config/PlaywrightConfigBuilder';

export default PlaywrightConfigBuilder.buildConfig({
  testDir: './tests',
  projectName: 'my-project',
  environments: ['development', 'qa', 'production']
});
```

### Environment Variables

```bash
# .env.development
NODE_ENV=development
BASE_URL=http://localhost:3000
BROWSER=chromium
HEADLESS=false
TIMEOUT=30000
SLOW_MO=500

# .env.qa
NODE_ENV=qa
BASE_URL=https://qa.example.com
BROWSER=chromium
HEADLESS=true
TIMEOUT=60000
```

## Best Practices

### Page Object Design Principles

1. **Single Responsibility**: Each page object represents one page or component
2. **Encapsulation**: Keep locators and page-specific logic within the page object
3. **Abstraction**: Provide business-focused methods rather than technical operations
4. **Reusability**: Design methods to be reusable across different test scenarios

```typescript
// Good: Business-focused method
public async submitContactForm(contactData: ContactData): Promise<void> {
  await this.fillFormField('name', contactData.name);
  await this.fillFormField('email', contactData.email);
  await this.fillFormField('message', contactData.message);
  await this.performSave();
  await this.waitForSuccessMessage();
}

// Avoid: Technical implementation details in tests
// await page.fill('#name', 'John');
// await page.fill('#email', 'john@example.com');
// await page.click('button[type="submit"]');
```

### Locator Strategy Best Practices

1. **Use data-testid attributes** as primary locators
2. **Implement fallback strategies** for robustness
3. **Avoid brittle selectors** like CSS classes or XPath
4. **Use semantic locators** when possible

```typescript
// Good: Multiple fallback strategies
usernameInput: this.locatorHelper.getByTestId('username-input') || 
               this.locatorHelper.getInputByLabel('Username') ||
               this.locatorHelper.getLocator('#username')

// Avoid: Brittle selectors
// usernameInput: this.page.locator('.form-group:nth-child(1) input')
```

### Error Handling Best Practices

1. **Meaningful Messages**: Provide clear error messages for debugging
2. **Graceful Degradation**: Handle expected failures gracefully
3. **Retry Logic**: Implement appropriate retry mechanisms
4. **Comprehensive Logging**: Add logging for troubleshooting

```typescript
public async performSave(): Promise<void> {
  try {
    await this.actionHelper.clickLocator(this.locators.saveButton);
    await this.waitForSaveConfirmation();
  } catch (error) {
    throw new Error(`Failed to save form: ${error.message}`);
  }
}

// Retry logic implementation
public async performActionWithRetry<T>(
  action: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      await this.page.waitForTimeout(1000 * attempt);
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Test Organization Best Practices

1. **Descriptive Names**: Use clear, descriptive test and method names
2. **Test Independence**: Each test should be independent and not rely on others
3. **Data Management**: Use test data generators for dynamic data
4. **Proper Cleanup**: Implement cleanup in teardown methods

```typescript
test.describe('Contact Form Validation', () => {
  test('should display error when email format is invalid', async () => {
    // Clear test intention from the name
  });

  test('should accept valid contact form submission', async () => {
    // Independent test that doesn't rely on previous tests
  });
});
```

### Performance Optimization

1. **Smart Waiting**: Use appropriate wait strategies
2. **Parallel Execution**: Design tests for parallel execution
3. **Resource Management**: Clean up resources properly
4. **Selective Testing**: Use test tags for selective execution

```typescript
// Use specific waits instead of arbitrary delays
await this.waitHelper.waitForElement(this.locators.successMessage);

// Instead of
// await this.page.waitForTimeout(5000);
```

## API Reference

### BasePage Methods

#### Navigation
- `navigate(): Promise<void>` - Navigate to the page (abstract)
- `navigateToUrl(url: string): Promise<void>` - Navigate to specific URL
- `navigateToPath(path: string): Promise<void>` - Navigate to relative path
- `reload(): Promise<void>` - Reload the current page
- `goBack(): Promise<void>` - Navigate back in browser history

#### Page State
- `waitForPageLoad(): Promise<void>` - Wait for page to load (abstract)
- `isPageLoaded(): Promise<boolean>` - Check if page is loaded (abstract)
- `getPageTitle(): Promise<string>` - Get the current page title
- `getCurrentUrl(): string` - Get current URL

#### Utilities
- `takeScreenshot(options?: ScreenshotOptions): Promise<Buffer>` - Take screenshot
- `waitForNetworkIdle(): Promise<void>` - Wait for network to be idle
- `clearStorage(): Promise<void>` - Clear browser storage
- `setViewportSize(width: number, height: number): Promise<void>` - Set viewport

### BaseUIPage Methods

#### Form Operations
- `fillFormField(fieldName: string, value: string | boolean, fieldType?: string): Promise<void>` - Fill form field
- `performSave(): Promise<void>` - Submit form using save button
- `performCancel(): Promise<void>` - Cancel form operation
- `hasValidationErrors(): Promise<boolean>` - Check for validation errors

#### Common UI Patterns
- `performSearch(searchTerm: string, searchSelector?: string): Promise<void>` - Perform search
- `performFilter(filterType: string, filterValue: string): Promise<void>` - Apply filter
- `performCreate(): Promise<void>` - Trigger create/add action
- `switchView(viewType: string): Promise<void>` - Switch between views

### ActionHelper Methods

#### Click Operations
- `click(selector: string, options?: ClickOptions): Promise<void>` - Click element
- `clickLocator(locator: Locator, options?: ClickOptions): Promise<void>` - Click locator
- `doubleClick(selector: string, options?: ClickOptions): Promise<void>` - Double-click
- `rightClick(selector: string, options?: ClickOptions): Promise<void>` - Right-click

#### Input Operations
- `fill(selector: string, value: string, options?: ActionOptions): Promise<void>` - Fill input
- `fillInputByLabel(label: string, value: string, exact?: boolean): Promise<void>` - Fill by label
- `type(selector: string, text: string, options?: TypeOptions): Promise<void>` - Type text
- `clear(selector: string, options?: ActionOptions): Promise<void>` - Clear input

#### Selection Operations
- `selectOptionFromDropdown(selector: string, label: string): Promise<void>` - Select dropdown option
- `checkCheckbox(selector: string, options?: ActionOptions): Promise<void>` - Check checkbox
- `uncheckCheckbox(selector: string, options?: ActionOptions): Promise<void>` - Uncheck checkbox

### WaitHelper Methods

#### Element Waiting
- `waitForElement(locator: Locator, timeout?: number): Promise<void>` - Wait for element visibility
- `waitForElementToBeHidden(locator: Locator, timeout?: number): Promise<void>` - Wait for element to be hidden
- `waitForElementEnabled(locator: Locator, timeout?: number): Promise<void>` - Wait for element to be enabled

#### Condition Waiting
- `waitForCondition(condition: () => Promise<boolean>, timeout?: number): Promise<void>` - Wait for custom condition
- `waitForUrlToMatch(pattern: RegExp, timeout?: number): Promise<void>` - Wait for URL pattern
- `waitForTextContent(locator: Locator, text: string, timeout?: number): Promise<void>` - Wait for text content

## Testing Patterns

### Page Object Model Pattern

The framework enforces the Page Object Model pattern for maintainable and reusable test code:

```typescript
// Page Object - Encapsulates page structure and behavior
export class ProductPage extends BasePage {
  
  get locators() {
    return {
      productTitle: this.locatorHelper.getByTestId('product-title'),
      addToCartButton: this.locatorHelper.getByTestId('add-to-cart'),
      quantityInput: this.locatorHelper.getByTestId('quantity')
    };
  }

  public async addToCart(quantity: number = 1): Promise<void> {
    await this.actionHelper.fill(this.locators.quantityInput.toString(), quantity.toString());
    await this.actionHelper.clickLocator(this.locators.addToCartButton);
  }
}

// Test - Uses page object methods
test('should add product to cart', async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.navigate();
  await productPage.addToCart(2);
  // Assertions...
});
```

### Step Definition Pattern

For complex workflows, use step definition classes:

```typescript
export class CheckoutSteps extends BaseSteps {
  public async completeCheckoutProcess(customerData: CustomerData): Promise<OrderData> {
    await this.addProductToCart();
    await this.proceedToCheckout();
    await this.fillShippingInformation(customerData);
    await this.selectPaymentMethod();
    await this.confirmOrder();
    
    return await this.getOrderConfirmation();
  }
}
```

### Data-Driven Testing Pattern

Use test data generators for comprehensive testing:

```typescript
test.describe('User Registration', () => {
  const testDataGenerator = new TestDataGenerator();

  test('should register users with various data combinations', async ({ page }) => {
    const userData = testDataGenerator.generateUser({
      locale: 'en_US',
      includeOptionalFields: true
    });

    const registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
    await registrationPage.registerUser(userData);
    
    // Verify registration success
  });
});
```

## Troubleshooting

### Common Issues and Solutions

#### Element Not Found Errors

**Problem**: Tests fail with "Element not found" errors
**Solutions**:
1. Verify locator strategies are correct
2. Add appropriate wait conditions
3. Check if element is in a frame or shadow DOM
4. Use more robust locator strategies

```typescript
// Instead of immediate interaction
await this.actionHelper.clickLocator(this.locators.submitButton);

// Use wait-then-interact pattern
await this.waitHelper.waitForElement(this.locators.submitButton);
await this.actionHelper.clickLocator(this.locators.submitButton);
```

#### Timing Issues

**Problem**: Tests are flaky due to timing issues
**Solutions**:
1. Replace fixed waits with conditional waits
2. Use framework wait helpers
3. Implement retry mechanisms
4. Check for loading indicators

```typescript
// Avoid fixed timeouts
await this.page.waitForTimeout(5000);

// Use conditional waits
await this.waitHelper.waitForElementToBeHidden(this.locators.loadingSpinner);
```

#### Authentication Problems

**Problem**: Tests fail due to authentication issues
**Solutions**:
1. Use authentication helpers
2. Implement session management
3. Check token expiration
4. Verify environment configuration

```typescript
// Use authentication helper
const authHelper = new AuthenticationHelper(this.page);
await authHelper.authenticateWithOAuth(email, password);

// Check authentication status
if (!await authHelper.isAuthenticated()) {
  throw new Error('Authentication failed');
}
```

### Debugging Techniques

#### Enable Debug Mode

```bash
# Run tests with debug output
DEBUG=pw:api npm test

# Run with browser visible
HEADLESS=false npm test

# Enable trace collection
ENABLE_TRACE=true npm test
```

#### Add Debug Information

```typescript
// Add debug logging
console.log(`Attempting to click element: ${await element.textContent()}`);

// Take screenshots for debugging
await this.takeScreenshot({ path: 'debug-screenshot.png' });

// Pause execution for manual inspection
await this.page.pause();
```

#### Use Playwright Inspector

```bash
# Run with Playwright inspector
npx playwright test --debug

# Open specific test in inspector
npx playwright test tests/login_validation.spec.ts --debug
```

### Performance Monitoring

#### Track Test Execution Times

```typescript
export class PerformanceHelper {
  private startTime: number;

  public startTimer(): void {
    this.startTime = Date.now();
  }

  public endTimer(operationName: string): number {
    const duration = Date.now() - this.startTime;
    console.log(`${operationName} took ${duration}ms`);
    return duration;
  }
}
```

#### Monitor Resource Usage

```typescript
// Monitor memory usage
const memoryUsage = process.memoryUsage();
console.log(`Memory usage: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`);

// Monitor page performance
const performanceMetrics = await this.getPerformanceMetrics();
console.log('Performance metrics:', performanceMetrics);
```

## Contributing

### Development Setup

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/ui-automation-framework.git
   cd ui-automation-framework
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Coding Standards

#### TypeScript Guidelines

1. **Use strict TypeScript configuration**
2. **Provide comprehensive type definitions**
3. **Use meaningful variable and method names**
4. **Add JSDoc comments for public APIs**

```typescript
/**
 * Performs a click action on the specified element with retry logic
 * @param locator - The element locator to click
 * @param options - Click options including timeout and retry count
 * @returns Promise that resolves when click is successful
 * @throws Error if element cannot be clicked after all retries
 */
public async click(locator: Locator, options?: ClickOptions): Promise<void> {
  // Implementation
}
```

#### Code Organization

1. **Follow single responsibility principle**
2. **Use consistent naming conventions**
3. **Organize imports logically**
4. **Keep methods focused and concise**

```typescript
// Good: Focused, single-purpose method
public async fillLoginForm(email: string, password: string): Promise<void> {
  await this.fillFormField('email', email);
  await this.fillFormField('password', password);
}

// Avoid: Methods that do too many things
public async loginAndNavigateToDashboard(email: string, password: string): Promise<void> {
  // Too many responsibilities in one method
}
```

### Testing Guidelines

#### Framework Tests

1. **Write unit tests for helper classes**
2. **Create integration tests for page objects**
3. **Add end-to-end tests for complete workflows**
4. **Maintain high test coverage**

```typescript
// Unit test example
describe('ActionHelper', () => {
  test('should click element successfully', async () => {
    const mockPage = createMockPage();
    const actionHelper = new ActionHelper(mockPage);
    
    await actionHelper.click(mockLocator);
    
    expect(mockPage.click).toHaveBeenCalledWith(mockLocator);
  });
});
```

### Pull Request Process

1. **Ensure all tests pass**
2. **Update documentation as needed**
3. **Add changelog entries**
4. **Request review from maintainers**
5. **Address feedback promptly**

## Support

### Getting Help

1. **Check the documentation** - Most questions are answered here
2. **Review existing issues** - Your question might already be answered
3. **Check the examples** - Look at working implementations
4. **Contact the team** - Reach out for complex issues

### Reporting Issues

When reporting issues, please include:

1. **Framework version**
2. **Node.js version**
3. **Operating system**
4. **Browser versions**
5. **Minimal reproduction case**
6. **Error messages and stack traces**

### Feature Requests

For feature requests, please provide:

1. **Use case description**
2. **Proposed solution**
3. **Alternative solutions considered**
4. **Impact assessment**

---

**Built with professional standards for enterprise test automation**