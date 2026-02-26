# Gateway UI Test Automation - Project Structure Guide

## Overview

This document provides a comprehensive guide to the project structure, making it easy to navigate and understand the codebase organization.

## Project Architecture

```
gateway-ui-test-automation/
├── framework/                      # Reusable Test Automation Framework
│   ├── src/
│   │   ├── core/                   # Base classes and core functionality
│   │   │   └── BasePage.ts         # Foundation for all page objects
│   │   ├── helpers/                # Specialized helper classes
│   │   │   ├── ActionHelper.ts     # User interactions (click, type, etc.)
│   │   │   ├── AssertionHelper.ts  # Test verifications and assertions
│   │   │   ├── WaitHelper.ts       # Smart waiting strategies
│   │   │   ├── LocatorHelper.ts    # Element location strategies
│   │   │   ├── ElementHelper.ts    # Element manipulation utilities
│   │   │   ├── TextHelper.ts       # Text processing utilities
│   │   │   └── AuthenticationHelper.ts # Authentication flows
│   │   ├── config/                 # Configuration management
│   │   │   ├── EnvManager.ts       # Environment configuration
│   │   │   └── README.md           # Configuration documentation
│   │   ├── utils/                  # Utilities and tools
│   │   │   ├── TestDataGenerator.ts # Dynamic test data generation
│   │   │   ├── DataStore.ts        # Test data storage and retrieval
│   │   │   └── FormDataHelper.ts   # Form data management
│   │   ├── types/                  # TypeScript type definitions
│   │   │   ├── index.ts            # Main type exports
│   │   │   ├── Environment.ts      # Environment type definitions
│   │   │   └── PlaywrightTypes.ts  # Playwright type extensions
│   │   ├── data/                   # Static test data
│   │   │   └── real-uk-postcodes.json # UK postcode data
│   │   └── index.ts                # Framework main exports
│   ├── package.json                # Framework dependencies
│   ├── tsconfig.json               # Framework TypeScript config
│   └── README.md                   # Framework documentation
├── projects/
│   └── gateway-ui/                 # Gateway UI Test Project
│       ├── pages/                  # Page Object Model implementations
│       │   ├── LoginPageLocators.ts        # Login page object
│       │   ├── DashboardPage.ts    # Dashboard page object
│       │   ├── clients/            # Client-related page objects
│       │   │   ├── ClientDetailsPageLocators.ts
│       │   │   ├── CreateCorporateClientPageLocators.ts
│       │   │   └── SearchClientsPageLocators.ts
│       │   └── componentsLocator/  # Component locator classes
│       │       ├── DatePickerLocators.ts
│       │       ├── FormsLocators.ts
│       │       ├── PostcodeLookupLocators.ts
│       │       └── SideNavLocators.ts
│       ├── steps/                  # Business logic and test steps
│       │   ├── LoginSteps.ts       # Login workflow steps
│       │   ├── DashboardSteps.ts   # Dashboard workflow steps
│       │   ├── clients/            # Client management steps
│       │   │   ├── ClientFilesSteps.ts
│       │   │   ├── CorporateClientCreationSteps.ts
│       │   │   └── ClientsSearchSteps.ts
│       │   ├── components/         # Component service classes
│       │   │   ├── DatePicker.ts   # Date picker interactions
│       │   │   ├── Forms.ts        # Form handling service
│       │   │   ├── PostcodeLookup.ts # Postcode lookup service
│       │   │   └── SideNav.ts      # Side navigation service
│       │   └── USAGE.md            # Steps usage documentation
│       ├── setup/                  # Test setup and configuration
│       │   ├── GatewaySetup.ts     # Main setup class
│       │   └── README.md           # Setup documentation
│       ├── tests/                  # Test specifications
│       │   └── smoke/              # Smoke test suite
│       │       └── create_corporate_client.smoke.spec.ts
│       ├── environments/           # Environment configurations
│       │   ├── .env.development    # Development settings
│       │   ├── .env.qa             # QA environment settings
│       │   └── .env.production     # Production settings
│       └── docs/                   # Project documentation
│           └── DataStore-FormData-Usage.md
├── playwright.config.ts            # Root Playwright configuration
├── tsconfig.json                   # Root TypeScript configuration
├── package.json                    # Root dependencies
└── README.md                       # Main project documentation
```

## Navigation Guide

### Quick Access by Task

#### Writing Tests
- **Test Files**: `projects/gateway-ui/tests/`
- **Page Objects**: `projects/gateway-ui/pages/`
- **Step Definitions**: `projects/gateway-ui/steps/`

#### Framework Development
- **Core Classes**: `framework/src/core/`
- **Helper Classes**: `framework/src/helpers/`
- **Utilities**: `framework/src/utils/`

#### Configuration
- **Environment Settings**: `projects/gateway-ui/environments/`
- **Playwright Config**: `playwright.config.ts`
- **TypeScript Config**: `tsconfig.json`

#### Documentation
- **Framework Docs**: `framework/README.md`
- **Setup Guide**: `projects/gateway-ui/setup/README.md`
- **Usage Examples**: `projects/gateway-ui/steps/USAGE.md`

### Architecture Patterns

#### Page Object Model (POM)
```typescript
// Location: projects/gateway-ui/pages/
export class LoginPageLocators extends BasePage {
  get locators() {
    return {
      loginButton: this.page.getByRole('link', { name: 'Login' }),
      usernameInput: this.page.locator('input#i0116'),
      // ... other locators
    };
  }
  
  // Business methods
  public async clickLogin(): Promise<void> {
    await this.action.clickLocator(this.locators.loginButton);
  }
}
```

#### Step Definition Pattern
```typescript
// Location: projects/gateway-ui/steps/
export class LoginSteps extends BasePage {
  private loginPage: LoginPageLocators;
  
  constructor(page: Page) {
    super(page);
    this.loginPage = new LoginPageLocators(page);
  }
  
  public async performLogin(): Promise<void> {
    // Business logic implementation
  }
}
```

#### Component Services
```typescript
// Location: projects/gateway-ui/steps/components/
export class FormsService {
  public async fillMinimalForm(data: FormData): Promise<FormResult> {
    // Component-specific logic
  }
}
```

### Directory Purposes

| Directory | Purpose | When to Use |
|-----------|---------|-------------|
| `framework/src/core/` | Base classes and foundational code | Creating new base classes |
| `framework/src/helpers/` | Reusable helper utilities | Adding new interaction patterns |
| `framework/src/utils/` | Test utilities and data management | Test data generation, storage |
| `projects/gateway-ui/pages/` | Page object implementations | New pages or page updates |
| `projects/gateway-ui/steps/` | Business logic and workflows | Complex test scenarios |
| `projects/gateway-ui/tests/` | Test specifications | Writing actual tests |
| `projects/gateway-ui/setup/` | Test environment setup | Environment configuration |

### File Naming Conventions

#### Page Objects
- **Pattern**: `{PageName}Page.ts`
- **Examples**: `LoginPageLocators.ts`, `DashboardPage.ts`
- **Location**: `projects/gateway-ui/pages/`

#### Step Definitions
- **Pattern**: `{Feature}Steps.ts`
- **Examples**: `LoginSteps.ts`, `CorporateClientCreationSteps.ts`
- **Location**: `projects/gateway-ui/steps/`

#### Test Files
- **Pattern**: `{feature}.{type}.spec.ts`
- **Examples**: `create_corporate_client.smoke.spec.ts`
- **Location**: `projects/gateway-ui/tests/`

#### Component Locators
- **Pattern**: `{Component}Locators.ts`
- **Examples**: `DatePickerLocators.ts`, `FormsLocators.ts`
- **Location**: `projects/gateway-ui/pages/componentsLocator/`

### Getting Started Workflows

#### Adding a New Test
1. Create page object in `projects/gateway-ui/pages/`
2. Create step definition in `projects/gateway-ui/steps/`
3. Write test in `projects/gateway-ui/tests/`
4. Update documentation if needed

#### Adding Framework Functionality
1. Create helper in `framework/src/helpers/`
2. Export from `framework/src/index.ts`
3. Update framework documentation
4. Add usage examples

#### Environment Configuration
1. Update environment files in `projects/gateway-ui/environments/`
2. Modify `GatewaySetup.ts` if needed
3. Update setup documentation

### Key Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| `README.md` | Main project overview | All users |
| `framework/README.md` | Framework documentation | Framework developers |
| `projects/gateway-ui/setup/README.md` | Setup guide | Test developers |
| `projects/gateway-ui/steps/USAGE.md` | Step usage examples | Test writers |
| `PROJECT_STRUCTURE.md` | This navigation guide | All users |

### Finding What You Need

#### "I want to..."
- **Write a new test** → `projects/gateway-ui/tests/`
- **Create a page object** → `projects/gateway-ui/pages/`
- **Add business logic** → `projects/gateway-ui/steps/`
- **Configure environment** → `projects/gateway-ui/environments/`
- **Extend framework** → `framework/src/`
- **Understand setup** → `projects/gateway-ui/setup/README.md`
- **See usage examples** → `projects/gateway-ui/steps/USAGE.md`

#### "I'm looking for..."
- **Login functionality** → `projects/gateway-ui/pages/LoginPageLocators.ts` & `projects/gateway-ui/steps/LoginSteps.ts`
- **Form handling** → `projects/gateway-ui/steps/components/Forms.ts`
- **Date picker logic** → `projects/gateway-ui/steps/components/DatePicker.ts`
- **Client management** → `projects/gateway-ui/steps/clients/`
- **Test data generation** → `framework/src/utils/TestDataGenerator.ts`
- **Configuration management** → `framework/src/config/EnvManager.ts`

### Best Practices

1. **Follow the established patterns** - Use existing code as templates
2. **Keep concerns separated** - Pages for structure, Steps for logic, Tests for scenarios
3. **Use the framework helpers** - Leverage ActionHelper, WaitHelper, etc.
4. **Document new features** - Update relevant README files
5. **Maintain consistency** - Follow naming conventions and file organization

This structure ensures maintainability, scalability, and ease of navigation for all team members.