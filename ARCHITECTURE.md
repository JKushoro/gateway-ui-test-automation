# Gateway UI Test Automation - Architecture Guide

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture Principles](#architecture-principles)
- [Folder Structure](#folder-structure)
- [Design Patterns](#design-patterns)
- [Code Organization](#code-organization)
- [For Junior Developers](#for-junior-developers)

## 🎯 Project Overview

This project follows a **layered architecture** with clear separation of concerns, making it easy for junior developers to understand and contribute.

```
┌─────────────────────────────────────────┐
│                TESTS                    │  ← Test specifications
├─────────────────────────────────────────┤
│                STEPS                    │  ← Business logic & workflows
├─────────────────────────────────────────┤
│                PAGES                    │  ← UI element locators
├─────────────────────────────────────────┤
│              FRAMEWORK                  │  ← Core utilities & helpers
└─────────────────────────────────────────┘
```

## 🏗️ Architecture Principles

### SOLID Principles Applied:
- **S** - Single Responsibility: Each class has one clear purpose
- **O** - Open/Closed: Easy to extend without modifying existing code
- **L** - Liskov Substitution: Derived classes are substitutable for base classes
- **I** - Interface Segregation: Small, focused interfaces
- **D** - Dependency Inversion: Depend on abstractions, not concretions

### DRY (Don't Repeat Yourself):
- Centralized imports in `SharedImports.ts`
- Base classes for common functionality
- Utility functions for repeated operations
- Configuration management

## 📁 Folder Structure

### Root Level
```
├── framework/                  # Core framework (reusable across projects)
├── projects/gateway-ui/        # Gateway-specific implementation
├── playwright/                 # Playwright configuration
├── docs/                      # Documentation
└── config files               # Project configuration
```

### Framework Structure
```
framework/src/
├── core/                      # Base classes
│   └── BasePage.ts           # Foundation for all page objects
├── helpers/                   # Action & assertion helpers
│   ├── ActionHelper.ts       # Click, type, navigate actions
│   ├── AssertionHelper.ts    # Verification methods
│   ├── WaitHelper.ts         # Wait strategies
│   └── ...
├── services/                  # Business services
│   └── AuthenticationService.ts
├── utils/                     # Utility functions
│   ├── DataStore.ts          # Test data management
│   ├── Logger.ts             # Logging functionality
│   └── ...
├── types/                     # TypeScript definitions
└── constants/                 # Application constants
```

### Gateway UI Structure
```
projects/gateway-ui/
├── pages/                     # Page Object Models
│   ├── components/           # Reusable UI components
│   ├── kyc/                  # KYC-specific pages
│   └── clients/              # Client management pages
├── steps/                     # Step definitions (business logic)
│   ├── kyc_forms/           # KYC workflow steps
│   ├── clients/             # Client management steps
│   └── components/          # Component interaction steps
├── tests/                     # Test specifications
│   ├── smoke/               # Smoke tests
│   └── regression/          # Regression tests
├── utils/                     # Project-specific utilities
└── environments/             # Environment configurations
```

## 🎨 Design Patterns

### 1. Page Object Model (POM)
- **Purpose**: Separate UI structure from test logic
- **Location**: `projects/gateway-ui/pages/`
- **Example**: `LoginPageLocators.ts` contains only element selectors

### 2. Step Object Pattern
- **Purpose**: Encapsulate business workflows
- **Location**: `projects/gateway-ui/steps/`
- **Example**: `LoginSteps.ts` contains login business logic

### 3. Factory Pattern
- **Purpose**: Create objects without specifying exact classes
- **Example**: `TestDataGenerator.ts` creates test data

### 4. Singleton Pattern
- **Purpose**: Ensure single instance of shared resources
- **Example**: `DataStore.ts` for test data sharing

### 5. Strategy Pattern
- **Purpose**: Define family of algorithms
- **Example**: Different authentication strategies

## 📚 Code Organization

### Import Strategy
```typescript
// ✅ Good - Use centralized imports
import { Page, expect, BasePage, dataStore } from '@shared/SharedImports';

// ❌ Bad - Individual imports
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
```

### Class Hierarchy
```typescript
// Base classes provide common functionality
BasePage
├── BaseKYCSteps          # KYC-specific base functionality
│   ├── KycPersonalDetailsPageSteps
│   ├── KycIncomePageSteps
│   └── ...
└── BaseClientSteps       # Client-specific base functionality
    ├── RetailClientCreationSteps
    └── CorporateClientCreationSteps
```

### Naming Conventions
- **Classes**: PascalCase (`LoginSteps`, `BasePage`)
- **Methods**: camelCase (`performLogin`, `fillPersonalDetails`)
- **Files**: PascalCase for classes, kebab-case for configs
- **Folders**: kebab-case (`kyc-forms`, `client-management`)

## 👨‍💻 For Junior Developers

### Getting Started Checklist
1. **Read this document** - Understand the architecture
2. **Explore `SharedImports.ts`** - See what's available
3. **Look at `BaseKYCSteps.ts`** - Understand base functionality
4. **Study existing step files** - Learn the patterns
5. **Check test files** - See how steps are used

### Common Patterns to Follow

#### 1. Creating a New Page Object
```typescript
// File: pages/MyNewPageLocators.ts
export class MyNewPageLocators extends BasePage {
  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
  }

  // Only locators here - no business logic
  get submitButton(): Locator {
    return this.page.locator('[data-testid="submit"]');
  }
}
```

#### 2. Creating Step Definitions
```typescript
// File: steps/MyNewSteps.ts
export class MyNewSteps extends BaseKYCSteps {
  private readonly pageLocators: MyNewPageLocators;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.pageLocators = new MyNewPageLocators(page, config);
  }

  // Business logic methods here
  public async performAction(): Promise<void> {
    await this.action.clickLocator(this.pageLocators.submitButton);
  }
}
```

#### 3. Writing Tests
```typescript
// File: tests/my-feature.spec.ts
import { test } from '@playwright/test';
import { MyNewSteps } from '@steps/MyNewSteps';

test('should perform action', async ({ page }) => {
  const steps = new MyNewSteps(page);
  await steps.performAction();
});
```

### Best Practices
1. **One responsibility per class/method**
2. **Use descriptive names**
3. **Add JSDoc comments for public methods**
4. **Follow existing patterns**
5. **Use the base classes - don't reinvent**
6. **Import from `SharedImports.ts`**
7. **Store test data in `DataStore`**
8. **Use the logger for debugging**

### Common Mistakes to Avoid
- ❌ Putting business logic in page objects
- ❌ Duplicating code instead of using base classes
- ❌ Individual imports instead of `SharedImports`
- ❌ Hardcoding values instead of using constants
- ❌ Not using the data store for sharing data
- ❌ Creating deep inheritance hierarchies

### Getting Help
1. **Check existing similar functionality** - Don't reinvent
2. **Look at base classes** - They might have what you need
3. **Use the logger** - Add debug information
4. **Follow the patterns** - Consistency is key
5. **Ask questions** - Better to ask than guess

## 🔧 Tools and Utilities

### Available Helpers
- **ActionHelper**: Click, type, navigate actions
- **AssertionHelper**: Verification methods
- **WaitHelper**: Wait strategies
- **DataStore**: Test data management
- **Logger**: Debugging and logging
- **TestDataGenerator**: Generate test data

### Configuration
- **Environment files**: `.env.qa`, `.env.dev`
- **Playwright config**: `playwright.config.ts`
- **TypeScript config**: `tsconfig.json`

This architecture ensures maintainable, scalable, and understandable code for developers of all levels.