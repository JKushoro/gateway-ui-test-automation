"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUIPage = void 0;
/**
 * Base UI Page Class
 * Simple base class for page objects with essential functionality
 */
class BaseUIPage {
    constructor(page, config = {}) {
        this.page = page;
    }
    /**
     * Get the page instance
     */
    getPage() {
        return this.page;
    }
    /**
     * Get current URL
     */
    getCurrentUrl() {
        return this.page.url();
    }
    /**
     * Get page title
     */
    async getPageTitle() {
        return await this.page.title();
    }
}
exports.BaseUIPage = BaseUIPage;
//# sourceMappingURL=BaseUIPage.js.map