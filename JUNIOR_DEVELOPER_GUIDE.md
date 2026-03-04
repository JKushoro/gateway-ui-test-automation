# 👨‍💻 Junior Developer Guide - Gateway UI Test Automation

## 🚀 Quick Start

### 1. Understanding the Project Structure
```
📁 gateway-ui-test-automation/
├── 📁 framework/           # Core reusable components
│   ├── 📁 src/helpers/     # Action & assertion helpers
│   ├── 📁 src/utils/       # Utility functions
│   ├── 📁 src/services/    # Business services (like AuthenticationService)
│   └── 📁 src/types/       # TypeScript definitions
├── 📁 projects/gateway-ui/ # Gateway-specific implementation
│   ├── 📁 pages/          # UI element locators (what to click)
│   ├── 📁 steps/          # Business logic (how to do things)
│   └── 📁 tests/          # Test specifications
└── 📁 playwright/         # Playwright configuration
```

### 2. The Golden Rule: Use SharedImports! 🌟
**Always import from SharedImports.ts - it has everything you need!**

```typescript
// ✅ GOOD - Use SharedImports
import { Page, BaseKYCSteps, dataStore, expect } from '@shared/SharedImports';

// ❌ BAD - Individual imports
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { BaseKYCSteps } from '../kyc_forms/BaseKYCSteps';
```

## 📚 Common Patterns

### Creating a New Step File
```typescript
// File: steps/MyNewSteps.ts
import { Page, BaseKYCSteps, dataStore } from '@shared/SharedImports';

export class MyNewSteps extends BaseKYCSteps {
  constructor(page: Page) {
    super(page);
  }

  public async doSomething(): Promise<void> {
    // Your business logic here
    await this.action.clickLocator(this.page.locator('button'));
    
    // Store data for later use
    dataStore.setValue('myKey', 'myValue');
  }
}
```

### Creating a New Page Locator
```typescript
// File: pages/MyPageLocators.ts
import { Page, Locator, BasePage } from '@shared/SharedImports';

export class MyPageLocators extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Only locators here - no business logic!
  get submitButton(): Locator {
    return this.page.locator('[data-testid="submit"]');
  }
}
```

### Writing a Test
```typescript
// File: tests/my-test.spec.ts
import { test, expect } from '@shared/SharedImports';
import { MyNewSteps } from '@steps/MyNewSteps';

test('should do something', async ({ page }) => {
  const steps = new MyNewSteps(page);
  await steps.doSomething();
  
  // Add assertions
  await expect(page.locator('success-message')).toBeVisible();
});
```

## 🛠️ Available Tools

### Base Classes (Your Best Friends!)
- **`BaseKYCSteps`** - Use for KYC-related functionality
- **`BasePage`** - Use for page objects
- **`AuthenticationService`** - Handles login/logout

### Helpers (Make Your Life Easier!)
- **`ActionHelper`** - Click, type, navigate
- **`AssertionHelper`** - Verify things
- **`WaitHelper`** - Wait for elements
- **`dataStore`** - Share data between steps

### Utilities
- **`TestDataGenerator`** - Generate test data
- **`createLogger`** - Debug your code
- **`FormDataHelper`** - Handle form data

## 🎯 Best Practices

### DO ✅
1. **Extend base classes** - Don't reinvent the wheel
2. **Use SharedImports** - One import to rule them all
3. **Store data in dataStore** - Share data between steps
4. **Add JSDoc comments** - Help others understand your code
5. **Follow existing patterns** - Look at similar files first

### DON'T ❌
1. **Put business logic in page objects** - Keep them separate
2. **Duplicate code** - Use base classes and utilities
3. **Hardcode values** - Use constants or test data
4. **Create deep inheritance** - Keep it simple
5. **Ignore the logger** - Use it for debugging

## 🔍 Finding Your Way Around

### Need to add a new KYC step?
1. Look at `projects/gateway-ui/steps/kyc_forms/`
2. Extend `BaseKYCSteps`
3. Follow the pattern of existing files

### Need to add a new page?
1. Look at `projects/gateway-ui/pages/`
2. Extend `BasePage`
3. Only add locators, no business logic

### Need to write a test?
1. Look at `projects/gateway-ui/tests/`
2. Import from `SharedImports`
3. Use existing step classes

### Stuck? 🤔
1. **Check existing similar functionality** - Don't reinvent
2. **Look at base classes** - They might have what you need
3. **Use the logger** - `createLogger('YourClass')` for debugging
4. **Follow the patterns** - Consistency is key
5. **Ask questions** - Better to ask than guess wrong

## 🎨 Code Style

### Naming Conventions
- **Classes**: `PascalCase` (LoginSteps, BasePage)
- **Methods**: `camelCase` (performLogin, fillForm)
- **Files**: `PascalCase` for classes, `kebab-case` for configs
- **Folders**: `kebab-case` (kyc-forms, client-management)

### File Organization
```
MyFeatureSteps.ts          # Business logic
MyFeaturePageLocators.ts   # UI elements
my-feature.spec.ts         # Tests
```

## 🚨 Common Mistakes

### Mistake 1: Not Using SharedImports
```typescript
// ❌ BAD
import { Page } from '@playwright/test';
import { expect } from '@playwright/test';

// ✅ GOOD
import { Page, expect } from '@shared/SharedImports';
```

### Mistake 2: Business Logic in Page Objects
```typescript
// ❌ BAD - LoginPageLocators.ts
export class LoginPageLocators {
  async performLogin() { /* business logic here */ }
}

// ✅ GOOD - LoginSteps.ts
export class LoginSteps {
  async performLogin() { /* business logic here */ }
}
```

### Mistake 3: Not Using Base Classes
```typescript
// ❌ BAD
export class MySteps {
  constructor(private page: Page) {}
  // Reinventing everything...
}

// ✅ GOOD
export class MySteps extends BaseKYCSteps {
  constructor(page: Page) {
    super(page); // Gets all the base functionality!
  }
}
```

## 🎓 Learning Path

1. **Start Here**: Read this guide
2. **Explore**: Look at `SharedImports.ts` to see what's available
3. **Study**: Examine `BaseKYCSteps.ts` to understand base functionality
4. **Practice**: Look at existing step files to learn patterns
5. **Build**: Create your first step file following the patterns

Remember: **When in doubt, follow existing patterns!** 🌟