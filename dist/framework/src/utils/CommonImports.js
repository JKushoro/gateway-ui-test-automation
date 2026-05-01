"use strict";
/**
 * 🎯 Framework Common Imports
 *
 * Single source of truth for framework-level imports.
 * This file provides commonly used framework exports in one place.
 *
 * @fileoverview Framework common imports utility
 * @author Framework Team
 * @since 1.0.0
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.createLogger = exports.QuestionHelper = exports.KYCHelper = exports.FormDataHelper = exports.TestDataGenerator = exports.DataStore = exports.dataStore = exports.TableHelper = exports.TextHelper = exports.LocatorHelper = exports.WaitHelper = exports.AssertionHelper = exports.ActionHelper = exports.AuthenticationService = exports.BasePage = exports.test = exports.expect = void 0;
// ==========================================
// PLAYWRIGHT CORE IMPORTS
// ==========================================
var test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
Object.defineProperty(exports, "test", { enumerable: true, get: function () { return test_1.test; } });
// ==========================================
// FRAMEWORK CORE EXPORTS
// ==========================================
var BasePage_1 = require("../core/BasePage");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_1.BasePage; } });
// ==========================================
// FRAMEWORK SERVICES
// ==========================================
var AuthenticationService_1 = require("../services/AuthenticationService");
Object.defineProperty(exports, "AuthenticationService", { enumerable: true, get: function () { return AuthenticationService_1.AuthenticationService; } });
// ==========================================
// FRAMEWORK HELPERS
// ==========================================
var ActionHelper_1 = require("../helpers/ActionHelper");
Object.defineProperty(exports, "ActionHelper", { enumerable: true, get: function () { return ActionHelper_1.ActionHelper; } });
var AssertionHelper_1 = require("../helpers/AssertionHelper");
Object.defineProperty(exports, "AssertionHelper", { enumerable: true, get: function () { return AssertionHelper_1.AssertionHelper; } });
var WaitHelper_1 = require("../helpers/WaitHelper");
Object.defineProperty(exports, "WaitHelper", { enumerable: true, get: function () { return WaitHelper_1.WaitHelper; } });
var LocatorHelper_1 = require("../helpers/LocatorHelper");
Object.defineProperty(exports, "LocatorHelper", { enumerable: true, get: function () { return LocatorHelper_1.LocatorHelper; } });
var TextHelper_1 = require("../helpers/TextHelper");
Object.defineProperty(exports, "TextHelper", { enumerable: true, get: function () { return TextHelper_1.TextHelper; } });
var TableHelper_1 = require("../helpers/TableHelper");
Object.defineProperty(exports, "TableHelper", { enumerable: true, get: function () { return TableHelper_1.TableHelper; } });
// ==========================================
// FRAMEWORK UTILITIES
// ==========================================
var DataStore_1 = require("./DataStore");
Object.defineProperty(exports, "dataStore", { enumerable: true, get: function () { return DataStore_1.dataStore; } });
Object.defineProperty(exports, "DataStore", { enumerable: true, get: function () { return DataStore_1.DataStore; } });
var TestDataGenerator_1 = require("./TestDataGenerator");
Object.defineProperty(exports, "TestDataGenerator", { enumerable: true, get: function () { return TestDataGenerator_1.TestDataGenerator; } });
var FormDataHelper_1 = require("./FormDataHelper");
Object.defineProperty(exports, "FormDataHelper", { enumerable: true, get: function () { return FormDataHelper_1.FormDataHelper; } });
var KYCHelper_1 = require("./KYCHelper");
Object.defineProperty(exports, "KYCHelper", { enumerable: true, get: function () { return KYCHelper_1.KYCHelper; } });
var QuestionHelper_1 = require("./QuestionHelper");
Object.defineProperty(exports, "QuestionHelper", { enumerable: true, get: function () { return QuestionHelper_1.QuestionHelper; } });
var Logger_1 = require("./Logger");
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return Logger_1.createLogger; } });
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return Logger_1.logger; } });
// ==========================================
// FRAMEWORK CONSTANTS
// ==========================================
__exportStar(require("../constants/CommonConstants"), exports);
//# sourceMappingURL=CommonImports.js.map