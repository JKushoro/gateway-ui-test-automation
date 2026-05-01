"use strict";
// projects/gateway-ui/shared/SharedImports.ts
// 🎯 SINGLE SOURCE OF TRUTH for all Gateway UI imports
// 📚 All step files should import from here to eliminate duplication
// 🔧 Following DRY principles and making code easier for junior developers
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCDatePickerLocators = exports.LoginPageLocators = exports.EnvironmentManager = exports.getEnvironmentManager = exports.SideNavService = exports.NavBarService = exports.AlertService = exports.KYCDatePickerService = exports.PostcodeLookupService = exports.BaseKYCSteps = exports.MESSAGES = exports.UI_SELECTORS = exports.logger = exports.createLogger = exports.QuestionHelper = exports.KYCHelper = exports.FormDataHelper = exports.TestDataGenerator = exports.DataStore = exports.dataStore = exports.TableHelper = exports.TextHelper = exports.LocatorHelper = exports.WaitHelper = exports.AssertionHelper = exports.ActionHelper = exports.AuthenticationService = exports.BasePage = exports.test = exports.expect = void 0;
exports.createTestSetup = createTestSetup;
// ==========================================
// PLAYWRIGHT CORE IMPORTS
// ==========================================
var test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } });
// ==========================================
// FRAMEWORK CORE IMPORTS
// ==========================================
var BasePage_1 = require("@framework/core/BasePage");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_1.BasePage; } });
var AuthenticationService_1 = require("@framework/services/AuthenticationService");
Object.defineProperty(exports, "AuthenticationService", { enumerable: true, get: function () { return AuthenticationService_1.AuthenticationService; } });
// Framework Helpers (most commonly used)
var ActionHelper_1 = require("@framework/helpers/ActionHelper");
Object.defineProperty(exports, "ActionHelper", { enumerable: true, get: function () { return ActionHelper_1.ActionHelper; } });
var AssertionHelper_1 = require("@framework/helpers/AssertionHelper");
Object.defineProperty(exports, "AssertionHelper", { enumerable: true, get: function () { return AssertionHelper_1.AssertionHelper; } });
var WaitHelper_1 = require("@framework/helpers/WaitHelper");
Object.defineProperty(exports, "WaitHelper", { enumerable: true, get: function () { return WaitHelper_1.WaitHelper; } });
var LocatorHelper_1 = require("@framework/helpers/LocatorHelper");
Object.defineProperty(exports, "LocatorHelper", { enumerable: true, get: function () { return LocatorHelper_1.LocatorHelper; } });
var TextHelper_1 = require("@framework/helpers/TextHelper");
Object.defineProperty(exports, "TextHelper", { enumerable: true, get: function () { return TextHelper_1.TextHelper; } });
var TableHelper_1 = require("@framework/helpers/TableHelper");
Object.defineProperty(exports, "TableHelper", { enumerable: true, get: function () { return TableHelper_1.TableHelper; } });
// Framework Utils (most commonly used)
var DataStore_1 = require("@framework/utils/DataStore");
Object.defineProperty(exports, "dataStore", { enumerable: true, get: function () { return DataStore_1.dataStore; } });
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
var TestDataGenerator_1 = require("@framework/utils/TestDataGenerator");
Object.defineProperty(exports, "TestDataGenerator", { enumerable: true, get: function () { return TestDataGenerator_1.TestDataGenerator; } });
var FormDataHelper_1 = require("@framework/utils/FormDataHelper");
Object.defineProperty(exports, "FormDataHelper", { enumerable: true, get: function () { return FormDataHelper_1.FormDataHelper; } });
var KYCHelper_1 = require("@framework/utils/KYCHelper");
Object.defineProperty(exports, "KYCHelper", { enumerable: true, get: function () { return KYCHelper_1.KYCHelper; } });
var QuestionHelper_1 = require("@framework/utils/QuestionHelper");
Object.defineProperty(exports, "QuestionHelper", { enumerable: true, get: function () { return QuestionHelper_1.QuestionHelper; } });
var Logger_1 = require("@framework/utils/Logger");
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return Logger_1.createLogger; } });
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return Logger_1.logger; } });
// Framework Constants
var CommonConstants_1 = require("@framework/constants/CommonConstants");
Object.defineProperty(exports, "UI_SELECTORS", { enumerable: true, get: function () { return CommonConstants_1.UI_SELECTORS; } });
Object.defineProperty(exports, "MESSAGES", { enumerable: true, get: function () { return CommonConstants_1.MESSAGES; } });
// ==========================================
// PROJECT-SPECIFIC BASE CLASSES
// ==========================================
var BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
Object.defineProperty(exports, "BaseKYCSteps", { enumerable: true, get: function () { return BaseKYCSteps_1.BaseKYCSteps; } });
// ==========================================
// PROJECT-SPECIFIC SERVICES
// ==========================================
var PostcodeLookup_1 = require("@steps/components/PostcodeLookup");
Object.defineProperty(exports, "PostcodeLookupService", { enumerable: true, get: function () { return PostcodeLookup_1.PostcodeLookupService; } });
var KYCDatePickerService_1 = require("@steps/components/KYCDatePickerService");
Object.defineProperty(exports, "KYCDatePickerService", { enumerable: true, get: function () { return KYCDatePickerService_1.KYCDatePickerService; } });
var AlertService_1 = require("@steps/components/AlertService");
Object.defineProperty(exports, "AlertService", { enumerable: true, get: function () { return AlertService_1.AlertService; } });
var NavBar_1 = require("@steps/components/NavBar");
Object.defineProperty(exports, "NavBarService", { enumerable: true, get: function () { return NavBar_1.NavBarService; } });
var SideNav_1 = require("@steps/components/SideNav");
Object.defineProperty(exports, "SideNavService", { enumerable: true, get: function () { return SideNav_1.SideNavService; } });
// ==========================================
// PROJECT-SPECIFIC UTILITIES
// ==========================================
var EnvironmentManager_1 = require("@framework/utils/EnvironmentManager");
Object.defineProperty(exports, "getEnvironmentManager", { enumerable: true, get: function () { return EnvironmentManager_1.getEnvironmentManager; } });
Object.defineProperty(exports, "EnvironmentManager", { enumerable: true, get: function () { return EnvironmentManager_1.EnvironmentManager; } });
const LoginSteps_1 = require("@steps/gateway/LoginSteps");
const GatewayManagementSteps_1 = require("@steps/gateway/GatewayManagementSteps");
/**
 * Creates a standardized test setup to eliminate code duplication across test files
 * @param browser - Playwright browser instance
 * @param environment - Test environment (default: 'qa')
 * @returns Promise<TestSetup> - Configured test setup with common services
 */
async function createTestSetup(browser, environment = 'qa') {
    const page = await browser.newPage();
    // Setup authentication for test environment
    await LoginSteps_1.LoginSteps.setupForEnvironment(page, environment);
    // Initialize common services
    const factFindManagementSteps = new GatewayManagementSteps_1.GatewayManagementSteps(page);
    const sideNav = new (await Promise.resolve().then(() => __importStar(require('@steps/components/SideNav')))).SideNavService(page);
    const navBar = new (await Promise.resolve().then(() => __importStar(require('@steps/components/NavBar')))).NavBarService(page);
    return {
        page,
        factFindManagementSteps,
        sideNav,
        navBar
    };
}
// ==========================================
// COMMONLY USED PAGE LOCATORS
// ==========================================
var LoginPageLocators_1 = require("@pages/gatewayElementLocators/LoginPageLocators");
Object.defineProperty(exports, "LoginPageLocators", { enumerable: true, get: function () { return LoginPageLocators_1.LoginPageLocators; } });
var KYCDatePickerLocators_1 = require("@pages/componentsLocator/KYCDatePickerLocators");
Object.defineProperty(exports, "KYCDatePickerLocators", { enumerable: true, get: function () { return KYCDatePickerLocators_1.KYCDatePickerLocators; } });
// ==========================================
// FOR JUNIOR DEVELOPERS - QUICK REFERENCE
// ==========================================
/*
🚀 QUICK START GUIDE:

1. CREATING A NEW STEP FILE:
   import { Page, BaseKYCSteps, dataStore } from '@shared/SharedImports';

2. CREATING A NEW PAGE LOCATOR:
   import { Page, Locator, BasePage } from '@shared/SharedImports';

3. CREATING A NEW TEST:
   import { test, expect, Page } from '@shared/SharedImports';

4. COMMON PATTERNS:
   - Use dataStore for sharing data between steps
   - Extend BaseKYCSteps for KYC-related functionality
   - Use createLogger for debugging
   - Use TestDataGenerator for test data

5. NEED HELP?
   - Check existing step files for patterns
   - Look at BaseKYCSteps for common methods
   - Use the logger for debugging: createLogger('YourClass')
*/ 
//# sourceMappingURL=SharedImports.js.map