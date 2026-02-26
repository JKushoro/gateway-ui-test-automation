"use strict";
// framework/src/utils/CommonImports.ts
// Centralized imports to reduce duplication across the project
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitHelper = exports.TextHelper = exports.TableHelper = exports.LocatorHelper = exports.ElementHelper = exports.AssertionHelper = exports.ActionHelper = exports.createLogger = exports.TestDataGenerator = exports.dataStore = exports.BasePage = exports.expect = void 0;
// Playwright core imports
var test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
// Framework core imports
var BasePage_1 = require("../core/BasePage");
Object.defineProperty(exports, "BasePage", { enumerable: true, get: function () { return BasePage_1.BasePage; } });
// Framework utilities
var DataStore_1 = require("./DataStore");
Object.defineProperty(exports, "dataStore", { enumerable: true, get: function () { return DataStore_1.dataStore; } });
var TestDataGenerator_1 = require("./TestDataGenerator");
Object.defineProperty(exports, "TestDataGenerator", { enumerable: true, get: function () { return TestDataGenerator_1.TestDataGenerator; } });
var Logger_1 = require("./Logger");
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return Logger_1.createLogger; } });
// Framework helpers
var ActionHelper_1 = require("../helpers/ActionHelper");
Object.defineProperty(exports, "ActionHelper", { enumerable: true, get: function () { return ActionHelper_1.ActionHelper; } });
var AssertionHelper_1 = require("../helpers/AssertionHelper");
Object.defineProperty(exports, "AssertionHelper", { enumerable: true, get: function () { return AssertionHelper_1.AssertionHelper; } });
var ElementHelper_1 = require("../helpers/ElementHelper");
Object.defineProperty(exports, "ElementHelper", { enumerable: true, get: function () { return ElementHelper_1.ElementHelper; } });
var LocatorHelper_1 = require("../helpers/LocatorHelper");
Object.defineProperty(exports, "LocatorHelper", { enumerable: true, get: function () { return LocatorHelper_1.LocatorHelper; } });
var TableHelper_1 = require("../helpers/TableHelper");
Object.defineProperty(exports, "TableHelper", { enumerable: true, get: function () { return TableHelper_1.TableHelper; } });
var TextHelper_1 = require("../helpers/TextHelper");
Object.defineProperty(exports, "TextHelper", { enumerable: true, get: function () { return TextHelper_1.TextHelper; } });
var WaitHelper_1 = require("../helpers/WaitHelper");
Object.defineProperty(exports, "WaitHelper", { enumerable: true, get: function () { return WaitHelper_1.WaitHelper; } });
//# sourceMappingURL=CommonImports.js.map