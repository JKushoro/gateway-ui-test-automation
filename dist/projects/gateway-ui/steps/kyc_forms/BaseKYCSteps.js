"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseKYCSteps = void 0;
const src_1 = require("@/framework/src");
/**
 * Base class for KYC form steps with common functionality
 * Now extends KYCHelper to reduce duplication
 */
class BaseKYCSteps extends src_1.KYCHelper {
    constructor(page, config) {
        // Initialize with a logger to prevent undefined errors
        const logger = (0, src_1.createLogger)('BaseKYCSteps');
        super(page, logger, config);
    }
    /**
     * Persist key/value pairs under a prefix in the data store
     */
    persist(prefix, obj) {
        for (const [key, value] of Object.entries(obj)) {
            src_1.dataStore.setValue(`${prefix}.${key}`, value);
        }
    }
}
exports.BaseKYCSteps = BaseKYCSteps;
//# sourceMappingURL=BaseKYCSteps.js.map