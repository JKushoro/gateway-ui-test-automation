# Gateway UI Test Automation - Coding Standards

## Overview

This document establishes coding standards and best practices for the Gateway UI Test Automation project to ensure consistency, maintainability, and code quality across the entire codebase.

## Table of Contents

- [TypeScript Standards](#typescript-standards)
- [File Organization](#file-organization)
- [Naming Conventions](#naming-conventions)
- [Page Object Model (POM) Standards](#page-object-model-pom-standards)
- [Step Definition Standards](#step-definition-standards)
- [Test Writing Standards](#test-writing-standards)
- [Import/Export Standards](#importexport-standards)
- [Error Handling](#error-handling)
- [Documentation Standards](#documentation-standards)
- [Framework Usage](#framework-usage)

## TypeScript Standards

### Type Safety
```typescript
// Good: Explicit typing
public async fillForm(data: FormData): Promise<FormResult> {
  // Implementation
}

// Avoid: Any types
public async fillForm(data: any): Promise<any> {
  // Implementation
}
```

### Interface Definitions
```typescript
// Good: Clear interface definitions
export interface ClientData {
  companyName: string;
  email: string;
  phone: string;
  contactForename: string;
  contactSurname: string;
}

// Good: Optional properties when appropriate
export interface SearchOptions {
  timeout?: number;
  retries?: number;
  waitForElement?: boolean;
}
```

### Generic Types
```typescript
// Good: Use generics for reusable components
export class DataStore {
  public getValue<T>(key: string): T | undefined {
    // Implementation
  }
}
```

## File Organization

### Directory Structure
```
projects/gateway-ui/
├── pages/           # Page objects only
├── steps/           # Business logic and workflows
├── tests/           # Test specifications
├── setup/           # Environment setup
├── environments/    # Configuration files
└── docs/           # Project documentation
```

### File Naming
- **Page Objects**: `{PageName}Page.ts` (e.g., `LoginPageLocators.ts`)
- **Step Definitions**: `{Feature}Steps.ts` (e.g., `LoginSteps.ts`)
- **Test Files**: `{feature}.{type}.spec.ts` (e.g., `login.smoke.spec.ts`)
- **Component Services**: `{Component}.ts` (e.g., `Forms.ts`)
- **Locator Classes**: `{Component}Locators.ts` (e.g., `FormsLocators.ts`)

## Naming Conventions

### Classes
```typescript
// Good: PascalCase for classes
export class LoginPageLocators extends BasePage {
  // Implementation
}

export class CreateCorporateClientSteps extends BasePage {
  // Implementation
}
```

### Methods
```typescript
// Good: camelCase for methods, descriptive names
public async clickLoginButton(): Promise<void> {
  // Implementation
}

public async fillUsernameField(username: string): Promise<void> {
  // Implementation
}

// Good: Business-focused method names
public async executeCompleteClientCreation(): Promise<ClientData> {
  // Implementation
}
```

### Variables and Properties
```typescript
// Good: camelCase, descriptive names
private readonly loginPage: LoginPageLocators;
private readonly testDataGenerator: TestDataGenerator;

// Good: Boolean variables with is/has/can prefix
private readonly isPageLoaded: boolean;
private readonly hasValidationErrors: boolean;
```

### Constants
```typescript
// Good: UPPER_SNAKE_CASE for constants
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRY_ATTEMPTS = 3;
const VALID_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

## Page Object Model (POM) Standards

### Page Object Structure
```typescript
// Good: Proper POM implementation
export class LoginPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  // Locators grouped in getter
  get locators() {
    return {
      loginButton: this.page.getByRole('link', { name: 'Login' }),
      usernameInput: this.page.locator('input#i0116'),
      passwordInput: this.page.locator('input#i0118'),
      errorMessage: this.page.locator('.error-message')
    };
  }

  // Business methods
  public async clickLogin(): Promise<void> {
    await this.action.clickLocator(this.locators.loginButton);
  }

  public async fillCredentials(username: string, password: string): Promise<void> {
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
  }
}
```

### Locator Best Practices
```typescript
// Good: Multiple fallback strategies
get locators() {
  return {
    submitButton: this.locate.getByTestId('submit-btn') || 
                  this.locate.getButtonByText('Submit') ||
                  this.locate.getLocator('button[type="submit"]')
  };
}

// Good: Semantic locators
usernameInput: this.locate.getInputByLabel('Username') ||
               this.locate.getLocator('input[name="username"]')

// Avoid: Brittle selectors
usernameInput: this.locate.getLocator('.form-group:nth-child(1) input')
```

## Step Definition Standards

### Step Class Structure
```typescript
// Good: Step definition pattern
export class LoginSteps extends BasePage {
  private loginPage: LoginPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.loginPage = new LoginPageLocators(page, config);
  }

  // Main workflow methods (execute*)
  public async executeSuccessfulLogin(): Promise<void> {
    await this.navigateToLogin();
    await this.performLogin();
    await this.verifyLoginSuccess();
  }

  // Individual step methods
  private async navigateToLogin(): Promise<void> {
    await this.loginPage.navigate();
  }

  private async performLogin(): Promise<void> {
    // Implementation
  }
}
```

### Method Organization
```typescript
// Good: Clear method hierarchy
export class ClientSteps extends BasePage {
  // Main workflow methods (public)
  public async executeCompleteClientCreation(): Promise<ClientData> {
    const clientData = await this.createClient();
    await this.verifyClientCreated(clientData);
    return clientData;
  }

  // Supporting methods (private)
  private async createClient(): Promise<ClientData> {
    // Implementation
  }

  private async verifyClientCreated(data: ClientData): Promise<void> {
    // Implementation
  }
}
```

## Test Writing Standards

### Test Structure
```typescript
// Good: Clear test organization
test.describe('Client Management', () => {
  let clientSteps: CreateCorporateClientSteps;
  let searchSteps: ClientsSearchSteps;

  test.beforeEach(async ({ page }) => {
    clientSteps = new CreateCorporateClientSteps(page);
    searchSteps = new ClientsSearchSteps(page);
    
    // Setup
    await GatewaySetup.setupForEnvironment(page, 'qa');
  });

  test('should create corporate client successfully', async () => {
    // Arrange - handled in beforeEach
    
    // Act
    const clientData = await clientSteps.executeCompleteClientCreation();
    
    // Assert
    expect(clientData.companyName).toBeTruthy();
    expect(clientData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
```

### Test Naming
```typescript
// Good: Descriptive test names
test('should display error when email format is invalid', async () => {
  // Test implementation
});

test('should successfully create corporate client with valid data', async () => {
  // Test implementation
});

// Avoid: Vague test names
test('test login', async () => {
  // Test implementation
});
```

## Import/Export Standards

### Import Organization
```typescript
// Good: Organized imports
// External libraries first
import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Framework imports
import { BasePage } from '@framework/core/BasePage';
import { TestDataGenerator } from '@framework/utils/TestDataGenerator';

// Project imports
import { LoginPageLocators } from '@pages/LoginPageLocators';
import { DashboardSteps } from '@steps/DashboardSteps';

// Type imports last
import type { ClientData, FormResult } from '../types';
```

### Export Standards
```typescript
// Good: Named exports for classes
export class LoginPageLocators extends BasePage {
  // Implementation
}

// Good: Type exports
export type ClientData = {
  companyName: string;
  email: string;
};

// Good: Default export for main functionality
export default class GatewaySetup {
  // Implementation
}
```

## Error Handling

### Error Messages
```typescript
// Good: Descriptive error messages
if (!username || !password) {
  throw new Error('Username and password must be provided for login');
}

// Good: Context in error messages
try {
  await this.action.clickLocator(this.locators.submitButton);
} catch (error) {
  throw new Error(`Failed to click submit button: ${error.message}`);
}
```

### Try-Catch Usage
```typescript
// Good: Specific error handling
public async isElementVisible(locator: Locator): Promise<boolean> {
  try {
    await this.wait.waitForElement(locator, 5000);
    return true;
  } catch (TimeoutError) {
    return false;
  }
}

// Good: Cleanup in finally blocks
public async performComplexOperation(): Promise<void> {
  try {
    await this.startOperation();
    await this.executeOperation();
  } catch (error) {
    await this.handleError(error);
    throw error;
  } finally {
    await this.cleanup();
  }
}
```

## Documentation Standards

### Class Documentation
```typescript
/**
 * LoginPageLocators - Page Object Model for the login functionality
 * 
 * Handles all login-related interactions including:
 * - Navigation to login page
 * - Credential input
 * - Authentication flow
 * - Error handling
 * 
 * @example
 * ```typescript
 * const loginPage = new LoginPageLocators(page);
 * await loginPage.navigate();
 * await loginPage.fillCredentials('user@example.com', 'password');
 * ```
 */
export class LoginPageLocators extends BasePage {
  // Implementation
}
```

### Method Documentation
```typescript
/**
 * Executes the complete client creation workflow
 * 
 * This method handles:
 * 1. Navigation to client creation page
 * 2. Form filling with generated data
 * 3. Submission and validation
 * 4. Data storage for later use
 * 
 * @param clientData - Optional client data overrides
 * @returns Promise resolving to the created client data
 * @throws Error if client creation fails
 * 
 * @example
 * ```typescript
 * const clientData = await clientSteps.executeCompleteClientCreation({
 *   companyName: 'Custom Company Name'
 * });
 * ```
 */
public async executeCompleteClientCreation(
  clientData?: Partial<ClientData>
): Promise<ClientData> {
  // Implementation
}
```

## Framework Usage

### Helper Usage
```typescript
// Good: Use framework helpers
export class LoginSteps extends BasePage {
  public async performLogin(username: string, password: string): Promise<void> {
    // Use framework helpers
    await this.action.fillInputByLabel('Username', username);
    await this.action.fillInputByLabel('Password', password);
    await this.action.clickButtonByText('Sign In');
    
    // Use wait helpers
    await this.wait.waitForNetworkIdle();
    await this.wait.waitForUrlToMatch(/dashboard/);
  }
}

// Avoid: Direct Playwright calls when framework helpers exist
public async performLogin(username: string, password: string): Promise<void> {
  await this.page.fill('#username', username);
  await this.page.fill('#password', password);
  await this.page.click('button[type="submit"]');
}
```

### DataStore Usage
```typescript
// Good: Consistent DataStore usage
export class FormsService {
  public async fillClientForm(data: ClientData): Promise<void> {
    // Store data for later use
    dataStore.setValue('client.companyName', data.companyName);
    dataStore.setValue('client.email', data.email);
    
    // Fill form
    await this.fillForm(data);
  }

  public async verifyStoredData(): Promise<void> {
    // Retrieve stored data
    const storedCompany = dataStore.getValue<string>('client.companyName');
    const displayedCompany = await this.getDisplayedCompanyName();
    
    expect(displayedCompany).toBe(storedCompany);
  }
}
```

## Code Quality Checklist

### Before Committing
- [ ] All methods have proper TypeScript types
- [ ] Error handling is implemented where appropriate
- [ ] Documentation is complete and accurate
- [ ] Naming conventions are followed
- [ ] Framework helpers are used instead of direct Playwright calls
- [ ] Tests are independent and don't rely on each other
- [ ] No hardcoded values (use configuration or test data generation)
- [ ] Imports are organized and clean
- [ ] No unused imports or variables

### Code Review Checklist
- [ ] Code follows established patterns
- [ ] Business logic is in step classes, not page objects
- [ ] Locators use fallback strategies
- [ ] Error messages are descriptive
- [ ] Methods have single responsibility
- [ ] Test data is generated or stored properly
- [ ] Documentation matches implementation

## Common Anti-Patterns to Avoid

### Mixing Concerns
```typescript
// Don't put business logic in page objects
export class LoginPageLocators extends BasePage {
  public async performCompleteLoginFlow(): Promise<void> {
    await this.navigate();
    await this.fillCredentials();
    await this.submitForm();
    await this.verifySuccess(); // This belongs in steps
  }
}
```

### Hardcoded Values
```typescript
// Don't hardcode test data
await this.fillForm({
  companyName: 'Test Company',
  email: 'test@example.com'
});

// Use test data generation
const testData = TestDataGenerator.generateClientData();
await this.fillForm(testData);
```

### Brittle Selectors
```typescript
// Avoid fragile selectors
const button = this.page.locator('.container > div:nth-child(2) > button');

// Use semantic selectors with fallbacks
const button = this.locate.getByTestId('submit-button') ||
               this.locate.getButtonByText('Submit') ||
               this.locate.getLocator('button[type="submit"]');
```

This coding standards document ensures consistency and maintainability across the entire test automation codebase.