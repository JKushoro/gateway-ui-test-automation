# Gateway UI Test Automation - Architecture & Developer Guide

## 🎯 Overview

This document provides comprehensive guidelines for developers working on the Gateway UI test automation framework. It covers architecture patterns, coding standards, best practices, and junior developer guidelines.

## 🏗️ Architecture Principles

### SOLID Principles Applied
- **Single Responsibility**: Each class/method has one clear purpose
- **Open/Closed**: Easy to extend without modifying existing code  
- **Liskov Substitution**: Derived classes are substitutable for base classes
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### DRY (Don't Repeat Yourself)
- Centralized imports in `SharedImports.ts`
- Base classes for common functionality
- Utility functions for repeated operations
- Configuration management

## 📁 Detailed Architecture

### Framework Layer (Core)
```
framework/src/
├── core/                   # Base classes & fundamental patterns
│   ├── BasePage.ts        # Foundation for all page objects
│   └── TestManagement.ts  # Test lifecycle management
├── helpers/               # Action & utility helpers  
│   ├── ActionHelper.ts    # User interactions (click, type, navigate)
│   ├── AssertionHelper.ts # Test verifications
│   ├── WaitHelper.ts      # Wait strategies  
│   └── simple/           # Simplified helper variants
├── services/             # Business services
│   └── AuthenticationService.ts
├── utils/               # Utility functions
│   ├── DataStore.ts     # Test data management
│   ├── Logger.ts        # Logging functionality
│   └── TestDataGenerator.ts
├── types/              # TypeScript definitions
└── constants/          # Application constants
```

### Project Layer (Gateway UI)
```
projects/gateway-ui/
├── pages/              # Page Object Models (UI structure)
│   ├── auth/          # Authentication pages
│   ├── clients/       # Client management pages  
│   ├── kyc/          # KYC-specific pages
│   └── components/   # Reusable UI components
├── steps/             # Step definitions (business logic)
│   ├── auth/         # Authentication workflows
│   ├── clients/      # Client management workflows
│   ├── kyc/         # KYC workflows
│   └── components/  # Component interaction steps
├── tests/            # Test specifications
│   ├── smoke/       # Critical path tests
│   ├── regression/  # Full regression suite
│   └── shared/     # Test utilities and base classes
├── config/          # Environment configurations
└── shared/         # Shared imports and common code
```

## 🎨 Design Patterns

### 1. Page Object Model (POM)
**Purpose**: Separate UI structure from test logic

**Implementation**:
```typescript
// ❌ Bad: Logic in test
test('login test', async ({ page }) => {
  await page.fill('[data-testid="email"]', 'user@test.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="login-btn"]');
});

// ✅ Good: Page Object separation
export class LoginLocators extends BasePage {
  get emailInput() { return this.page.locator('[data-testid="email"]'); }
  get passwordInput() { return this.page.locator('[data-testid="password"]'); }  
  get loginButton() { return this.page.locator('[data-testid="login-btn"]'); }
}
```

### 2. Step Object Pattern
**Purpose**: Encapsulate business workflows

**Implementation**:
```typescript
export class LoginSteps extends BaseSteps {
  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.action.fillInput(this.locators.emailInput, email);
    await this.action.fillInput(this.locators.passwordInput, password);
    await this.action.clickLocator(this.locators.loginButton);
    await this.assertion.expectToBeVisible(this.locators.dashboardHeader);
  }
}
```

### 3. Factory Pattern
**Purpose**: Create objects without specifying exact classes
```typescript
export class TestDataGenerator {
  static createUser(options?: Partial<User>): User {
    return {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ...options
    };
  }
}
```

### 4. Singleton Pattern  
**Purpose**: Ensure single instance of shared resources
```typescript
export class DataStore {
  private static instance: DataStore;
  private store = new Map<string, any>();
  
  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
}
```

## 📋 Coding Standards

### File Naming Conventions
- **Classes**: `PascalCase` (e.g., `LoginSteps.ts`, `UserDashboard.ts`)
- **Utilities**: `camelCase` (e.g., `dataHelper.ts`, `testUtils.ts`)  
- **Folders**: `kebab-case` (e.g., `kyc-forms/`, `client-management/`)
- **Test Files**: `kebab-case.spec.ts` (e.g., `login.spec.ts`, `user-creation.spec.ts`)

### Code Organization Rules

#### Maximum File Sizes
- **Classes**: 500 lines maximum
- **Utilities**: 300 lines maximum  
- **Tests**: 200 lines maximum
- **Split large files** into focused modules

#### Folder Structure Guidelines
- **Maximum 3 levels deep**: Avoid deep nesting
- **Logical grouping**: Group by feature, not technical layer
- **Consistent naming**: Same pattern across all folders

### Import Strategy
```typescript
// ✅ Good: Centralized imports
import { Page, expect, BasePage, dataStore } from '@shared/SharedImports';

// ❌ Bad: Individual imports everywhere  
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';  
import { BasePage } from '@framework/core/BasePage';
```

### Method Naming
```typescript
// ✅ Good: Descriptive method names
async fillUserRegistrationForm(userData: UserData): Promise<void>
async verifyUserIsLoggedIn(): Promise<void>
async navigateToAccountSettings(): Promise<void>

// ❌ Bad: Unclear method names
async fillForm(data: any): Promise<void>
async check(): Promise<void>  
async go(): Promise<void>
```

## 👨‍💻 Junior Developer Guidelines

### Getting Started Checklist
1. **Read this document** - Understand the architecture
2. **Explore `SharedImports.ts`** - See what's available
3. **Study `BasePage.ts`** - Understand base functionality  
4. **Look at existing step files** - Learn the patterns
5. **Check test files** - See how steps are used

### Creating New Components

#### 1. Page Object Template
```typescript
// File: pages/feature/my-page.locators.ts
import { BasePage, FrameworkConfig } from '@/framework/src';
import { Page, Locator } from '@playwright/test';

export class MyPageLocators extends BasePage {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // Only locators here - no business logic
  get submitButton(): Locator {
    return this.page.locator('[data-testid="submit"]');
  }
  
  get cancelButton(): Locator {
    return this.page.locator('[data-testid="cancel"]');
  }
}
```

#### 2. Step Class Template  
```typescript
// File: steps/feature/my-feature.steps.ts
import { BaseSteps } from '@steps/BaseSteps';
import { MyPageLocators } from '@pages/feature/my-page.locators';

export class MyFeatureSteps extends BaseSteps {
  private readonly pageLocators: MyPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.pageLocators = new MyPageLocators(page, config);
  }

  /**
   * Complete the main workflow for this feature
   */
  public async completeMyFeatureWorkflow(): Promise<void> {
    await this.validatePageIsLoaded();
    await this.fillRequiredInformation(); 
    await this.submitAndVerify();
  }

  private async validatePageIsLoaded(): Promise<void> {
    await this.assertion.expectToBeVisible(this.pageLocators.submitButton);
  }
}
```

#### 3. Test Template
```typescript  
// File: tests/smoke/my-feature.spec.ts
import { test } from '@playwright/test';
import { MyFeatureSteps } from '@steps/feature/my-feature.steps';

test.describe('My Feature Tests', () => {
  let myFeatureSteps: MyFeatureSteps;

  test.beforeEach(async ({ page }) => {
    myFeatureSteps = new MyFeatureSteps(page);
  });

  test('should complete main workflow successfully', async () => {
    await myFeatureSteps.completeMyFeatureWorkflow();
  });
});
```

### Best Practices for Junior Developers

#### Do's ✅
- **Use descriptive names** for everything (variables, methods, classes)
- **Follow existing patterns** - copy similar files and adapt
- **Add JSDoc comments** for any public method
- **Keep methods small** - one responsibility per method
- **Use the base classes** - don't reinvent functionality  
- **Import from SharedImports** - maintain consistency
- **Store test data** in DataStore for sharing between tests
- **Use the logger** for debugging information

#### Don'ts ❌
- **Don't put business logic in page objects** - only locators and basic interactions
- **Don't duplicate code** - use existing helpers and base classes
- **Don't use individual imports** - use SharedImports.ts
- **Don't hardcode values** - use constants and configuration
- **Don't ignore the data store** - share data properly between tests
- **Don't create deep inheritance** - keep it simple
- **Don't make files too big** - split when over 500 lines

### Common Anti-Patterns to Avoid

#### 1. Logic in Page Objects
```typescript
// ❌ Bad: Business logic in page object
export class LoginPage {
  async loginAsValidUser(): Promise<void> {
    await this.emailInput.fill('user@test.com');
    await this.passwordInput.fill('password123');
    await this.loginButton.click();
    // Don't validate here - that's business logic!
    await expect(this.dashboardHeader).toBeVisible();
  }
}

// ✅ Good: Only UI structure in page object
export class LoginLocators {
  get emailInput() { return this.page.locator('[data-testid="email"]'); }
  get passwordInput() { return this.page.locator('[data-testid="password"]'); }
  get loginButton() { return this.page.locator('[data-testid="login-btn"]'); }
}
```

#### 2. Hardcoded Test Data
```typescript
// ❌ Bad: Hardcoded data
await loginSteps.login('user@test.com', 'password123');

// ✅ Good: Generated/configured data
const testUser = TestDataGenerator.createUser();
await loginSteps.login(testUser.email, testUser.password);
```

#### 3. No Error Context
```typescript
// ❌ Bad: Generic error
await expect(element).toBeVisible();

// ✅ Good: Descriptive error context  
await expect(element).toBeVisible('Login button should be visible after page load');
```

## 🔧 Configuration Management

### Environment Variables
```typescript
// config/environment.ts
export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS === 'true',
  slowMo: parseInt(process.env.SLOW_MO || '0'),
  timeout: parseInt(process.env.TIMEOUT || '30000')
};
```

### Test Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    baseURL: config.baseUrl,
    headless: config.headless,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
```

## 📊 Testing Strategy

### Test Pyramid
- **Unit Tests**: Framework helper methods (20%)
- **Integration Tests**: Page object interactions (30%)  
- **E2E Tests**: Complete user workflows (50%)

### Test Categories
- **Smoke Tests**: Critical path verification (~15 tests)
- **Regression Tests**: Full feature coverage (~100 tests)
- **Cross-browser Tests**: Multi-browser compatibility
- **Performance Tests**: Load time and responsiveness

### Test Data Strategy
```typescript
// Isolated test data per test
test('should create user account', async () => {
  const userData = TestDataGenerator.createUser();
  await registrationSteps.createAccount(userData);
  
  // Store for later use
  dataStore.set('currentUser', userData);
});
```

## 🚦 Development Workflow

### Adding New Features
1. **Framework Enhancement**: Add to `framework/src/` if reusable
2. **Project Implementation**: Create pages/steps in `projects/gateway-ui/`
3. **Test Creation**: Write comprehensive test coverage
4. **Documentation**: Update JSDoc comments and guides

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Uses existing patterns consistently  
- [ ] Includes JSDoc comments for public methods
- [ ] Stays under file size limits
- [ ] Has appropriate test coverage
- [ ] Uses centralized imports
- [ ] Follows error handling patterns

### Quality Gates
- **ESLint**: Code style enforcement
- **Prettier**: Code formatting  
- **TypeScript**: Type checking with strict mode
- **Tests**: All tests must pass
- **Coverage**: Minimum 80% test coverage for new code

## 🎯 Success Metrics

### Junior Developer Experience
- **File Discovery**: Find any file in < 30 seconds
- **Pattern Recognition**: Understand code structure quickly
- **Onboarding Time**: Productive within 2 days
- **Consistency**: Same patterns across all files

### Code Quality Indicators  
- **File Sizes**: No files > 500 lines
- **Naming**: Consistent conventions throughout
- **Documentation**: Comprehensive JSDoc coverage
- **Test Coverage**: > 80% for critical paths
- **Build Time**: < 2 minutes for full test run

## 📚 Additional Resources

### Essential Reading
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)

### Internal Resources
- Framework source code examples in `framework/src/`
- Working test implementations in `projects/gateway-ui/tests/`
- Shared utilities and helpers documentation

### Getting Help
1. **Check existing implementations** - find similar patterns
2. **Review base classes** - understand available functionality  
3. **Use the logger** - add debug information for troubleshooting
4. **Follow the patterns** - consistency is key
5. **Ask the team** - better to ask than guess

---

**Remember**: The goal is clean, maintainable code that any junior developer can understand and contribute to effectively! 🚀