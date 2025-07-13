### 🏡 Shady Meadows – UI Automation Test Suite
**End-to-end automation framework** for the Shady Meadows room booking application, built with 
Playwright and TypeScript.
This suite replicates real-world user journeys with full **CRUD** workflows, dynamic data handling, and 
accessibility validation — making it scalable, readable, and CI-ready.

### 🔍 Overview
This project was built to automate the critical workflows of the Shady Meadows web app. 
It validates both **customer-facing flows and admin panel operations**, ensuring reliability across:
- Functional workflows (Login, Booking, Messaging)
- Full **CRUD** operations (Create → Read → Update → Delete for rooms & messages)
- Non-functional testing (Accessibility)
- Dynamic data-driven testing using @faker-js/faker
- HTML reporting with video, screenshot, and trace support
---

### 🔁 Functional Test Coverage
| Area                    | Actions Covered                                         |
| ----------------------- | ------------------------------------------------------- |
| 🔐 **Login**            | Valid/invalid credentials, error handling, assertions   |
| 📩 **Contact Form**     | Fill, submit, assert confirmation                       |
| 🛏️ **Room Management** | **Create**, **Read**, **Update**, **Delete** room cards |
| 🧾 **Reservation**      | Select dates, fill user info, confirm booking           |
| 📬 **Message Review**   | Message appears in admin, popup info validated, delete  |
| 📅 **Reports**          | Calendar reflects bookings based on selected dates      |

### ♿ Accessibility Testing
Accessibility checks are implemented using axe-playwright, validating:
- Homepage
- Contact page
- Reservation page
- Login page
- Admin Rooms dashboard (after login)
Only critical impact violations are flagged. Tests log violations but don’t break builds unless necessary.

## 📂 Project Structure
``````
shadymeadows-automation-suite/
├── .github/                 # GitHub workflows or project config (if applicable)
├── docs/                    # Documentation (optional folder)
├── test-results/            # Playwright output (screenshots, videos, traces)
├── playwright-report/       # HTML report output
├── node_modules/            # Project dependencies (auto-generated)
│
├── ui/                      # Core test framework
│   ├── base/                # BasePage + core abstractions
│   │   └── BasePage.ts
│   │
│   ├── config/              # Env config loader
│   │   └── EnvConfig.ts
│   │
│   ├── helpers/             # Custom helper utilities
│   │   ├── ActionHelper.ts
│   │   ├── WaitHelper.ts
│   │   ├── LocatorHelper.ts
│   │   ├── AssertionHelper.ts
│   │   ├── DatePickerHelper.ts
│   │   └── RowMatcherHelper.ts
│   │
│   ├── hooks/               # Global lifecycle hooks
│   │   └── globalHooks.ts
│   │
│   ├── pages/               # Page Object Models (POMs)
│   │   ├── HomePage.ts
│   │   ├── ContactPage.ts
│   │   ├── LoginPage.ts
│   │   ├── ControlPanel.ts
│   │   ├── RoomsPage.ts
│   │   ├── ReservationPage.ts
│   │   ├── AdminMessagesPage.ts
│   │   └── ReportsCalendarPage.ts
│   │
│   ├── steps/               # Business logic workflows
│   │   ├── HomeSteps.ts
│   │   ├── LoginSteps.ts
│   │   ├── ContactSteps.ts
│   │   ├── RoomsSteps.ts
│   │   ├── ReservationSteps.ts
│   │   ├── AdminMessagesSteps.ts
│   │   ├── ReportSteps.ts
│   │   └── ControlPanelSteps.ts
│   │
│   └── tests/               # Test suites
│       ├── contact_message_lifecycle.spec.ts
│       ├── login_validation_scenarios.spec.ts
│       ├── room_booking_report_flow.spec.ts
│       └── non_functional/
│           └── accessibility.spec.ts
│
├── utils/                   # Shared utility layer
│   ├── dataStore.ts         # Runtime value store between steps
│   ├── dataGenerator.ts     # Generic faker-powered generators
│   ├── testSetupHelper.ts   # Central setup/teardown for tests
│   ├── stringUtils.ts       # String comparison utilities
│   ├── interfaces/
│   │   ├── formTypes.ts
│   │   └── Person.ts
│   └── generators/
│       ├── formGenerator.ts
│       └── personGenerator.ts
│
├── .env                     # Environment config (base URL, credentials)
├── package.json             # Project metadata and test scripts
├── playwright.config.ts     # Playwright test runner configuration
├── tsconfig.json            # TypeScript config
└── README.md                # Project documentation
``````

### 🧠 Tech Highlights
### 🔧 Architecture & Patterns
- Page Object Model (POM)
- Central BasePage for helper injection
- Separation of concerns via Steps, Helpers, and Pages

### 🔁 Reusable Helpers
| Helper             | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `ActionHelper`     | Clicks, fills, selects, checkboxes, dropdowns     |
| `WaitHelper`       | Waits for elements, URLs, DOM changes             |
| `LocatorHelper`    | Smart locators for labels, inputs, buttons        |
| `AssertionHelper`  | Custom Playwright assertions                      |
| `DatePickerHelper` | Handles React-datepicker with date-fns formatting |
| `RowMatcherHelper` | Match rows by dynamic text in admin tables        |

### 🧪 How to Run
### 📦 Install dependencies
```
npm install
```

### 🎭 Install Playwright browsers
```
npx playwright install
```

### 🔐 Set up your .env
```
BASE_URL=xxx
USER_NAME=xxx
PASSWORD=xxx
IMAGE=xxx
```

### 🧪 Run tests
```
npm test
```
### 🧪Run tests in headed mode
```
npm run test:headed
```

### 📊 View HTML report
```
npm run test:report
```

### 🧪 Sample Test Output
```
✔ Contact form submitted successfully       (2s)
✔ Message appears in Admin panel           (1.4s)
✔ Room created, edited, and validated      (3.2s)
✔ Booking confirmed with correct dates...  (2.9s)
✔ Room deleted and no longer visible...    (1.8s)
✔ Login fails for invalid credentials      (0.6s)
✔ Accessibility check passed on Login...   (0 violations)
```

## 🚦 CI/CD Ready
This suite is built with CI in mind:
- ✅ Headless mode support
- 🔁 Retry logic when running in CI (via env detection)
- 📷 Screenshot & 📽️ video on failure
- 🔍 Trace capture for debugging flaky tests

### 💬 What Makes This Suite Stand Out
- ✅ Covers real-world business flows with validation
- ♻️ Full CRUD automation with database-like assertions
- 🧠 Smart use of dataStore to share values across steps
- ⚙️ Modular structure: clean separation of logic
- 🎨 Styled for maintainability and team scaling
- 📈 Easily extendable for API or mobile testing


### 👤 Author
**John Kushoro**