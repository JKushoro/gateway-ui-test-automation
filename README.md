# Gateway UI Test Automation

A clean, junior developer-friendly Playwright test automation framework for the Gateway UI application.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **npm or yarn**

### Installation & Setup
```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd gateway-ui-test-automation
npm install

# 2. Install framework dependencies
cd framework && npm install && cd ..

# 3. Install project dependencies  
cd projects/gateway-ui && npm install && cd ../..

# 4. Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Development mode (headed, slow for debugging)
npm run test:dev

# QA mode (headless, fast)
npm run test:qa

# Run specific test
npm run test:dev -- tests/login.spec.ts

# Run with different browser
BROWSER=firefox npm run test:qa
```

## 📁 Project Structure

```
gateway-ui-test-automation/
├── framework/              # Reusable test framework
│   ├── src/
│   │   ├── core/          # Base classes
│   │   ├── helpers/       # Action & utility helpers
│   │   ├── services/      # Business services
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Utility functions
├── projects/
│   └── gateway-ui/        # Gateway-specific implementation  
│       ├── pages/         # Page Object Models
│       ├── steps/         # Business logic & workflows
│       ├── tests/         # Test specifications
│       └── config/        # Environment configurations
├── README.md              # This file
├── ARCHITECTURE.md        # Detailed architecture guide
└── CHANGELOG.md          # Version history
```

## ✍️ Writing Tests (Junior Developer Guide)

### 1. Create a Page Object
```typescript
// pages/auth/login.locators.ts
export class LoginLocators extends BasePage {
  get emailInput() { return this.page.locator('[data-testid="email"]'); }
  get passwordInput() { return this.page.locator('[data-testid="password"]'); }
  get loginButton() { return this.page.locator('[data-testid="login-btn"]'); }
}
```

### 2. Create Step Class
```typescript
// steps/auth/login.steps.ts  
export class LoginSteps extends BaseSteps {
  async loginWithCredentials(email: string, password: string): Promise<void> {
    await this.action.fillInput(this.locators.emailInput, email);
    await this.action.fillInput(this.locators.passwordInput, password);
    await this.action.clickLocator(this.locators.loginButton);
  }
}
```

### 3. Write the Test
```typescript
// tests/smoke/login.spec.ts
import { test } from '@playwright/test';
import { LoginSteps } from '@steps/auth/login.steps';

test('should login successfully', async ({ page }) => {
  const loginSteps = new LoginSteps(page);
  await loginSteps.loginWithCredentials('user@test.com', 'password123');
});
```

## 🔧 Configuration

Create `.env` files for different environments:
```bash
# .env.development
BASE_URL=http://localhost:3000
BROWSER=chromium
HEADLESS=false

# .env.qa  
BASE_URL=https://qa-gateway.example.com
BROWSER=chromium
HEADLESS=true
```

## 📊 Test Reports

Reports are generated in `projects/gateway-ui/test-results/`:
- **HTML Report**: Interactive report with screenshots
- **JUnit Report**: For CI/CD integration
- **JSON Report**: Structured test data

## 🆘 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests fail in CI but pass locally | Check environment variables and browser versions |
| Slow test execution | Enable parallel execution with `--workers=4` |
| Flaky tests | Improve wait conditions and element locators |

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Detailed framework architecture, patterns, and best practices
- **[CHANGELOG.md](CHANGELOG.md)**: Version history and changes

## 🤝 Contributing

1. Follow the patterns shown in existing tests
2. Keep files under 500 lines
3. Use descriptive names for tests and methods
4. Add JSDoc comments to public methods
5. Run tests locally before submitting PRs

---

**Questions?** Check the [Architecture Guide](ARCHITECTURE.md) or ask the team! 🚀