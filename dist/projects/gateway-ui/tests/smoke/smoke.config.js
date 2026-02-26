"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlaywrightConfigBuilder_1 = require("@framework/config/PlaywrightConfigBuilder");
/**
 * Smoke Test Configuration
 * Fast, critical path tests that verify basic functionality
 * Should run in under 5 minutes
 */
exports.default = PlaywrightConfigBuilder_1.PlaywrightConfigBuilder.buildConfig({
    testDir: '.',
    outputDir: './test-results/smoke'
});
//# sourceMappingURL=smoke.config.js.map