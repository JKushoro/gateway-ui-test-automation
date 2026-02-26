"use strict";
// projects/gateway-ui/shared/SharedImports.ts
// Centralized imports for Gateway UI project to eliminate duplication
// All KYC step files should import from here instead of individual imports
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
exports.BaseKYCSteps = exports.expect = void 0;
// Re-export everything from framework for easy access
__exportStar(require("@/framework/src"), exports);
// Commonly used Playwright imports
var test_1 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_1.expect; } });
// Project-specific imports
var BaseKYCSteps_1 = require("@steps/kyc_forms/BaseKYCSteps");
Object.defineProperty(exports, "BaseKYCSteps", { enumerable: true, get: function () { return BaseKYCSteps_1.BaseKYCSteps; } });
//# sourceMappingURL=SharedImports.js.map