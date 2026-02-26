"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompliancePage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * CompliancePage - Page Object Model for Compliance functionality
 * Contains all locators and interactions for compliance management
 */
class CompliancePage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Compliance'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Main sections
            regulatorySection: this.locatorHelper.getByText('Regulatory'),
            auditSection: this.locatorHelper.getByText('Audit'),
            riskManagementSection: this.locatorHelper.getByText('Risk Management'),
            reportingSection: this.locatorHelper.getByText('Reporting'),
            // Search and filters
            searchInput: this.locatorHelper.getInputByPlaceholder('Search compliance items...') ||
                this.locatorHelper.getByTestId('search-input'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            typeFilter: this.locatorHelper.getByTestId('type-filter'),
            priorityFilter: this.locatorHelper.getByTestId('priority-filter'),
            dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
            // Action buttons
            createComplianceItemButton: this.locatorHelper.getButtonByText('Create Compliance Item') ||
                this.locatorHelper.getByTestId('create-compliance-btn'),
            generateReportButton: this.locatorHelper.getButtonByText('Generate Report') ||
                this.locatorHelper.getByTestId('generate-report-btn'),
            exportButton: this.locatorHelper.getButtonByText('Export') ||
                this.locatorHelper.getByTestId('export-btn'),
            refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                this.locatorHelper.getByTestId('refresh-btn'),
            // Compliance items table
            complianceTable: this.locatorHelper.getByTestId('compliance-table') ||
                this.locatorHelper.getLocator('table'),
            tableHeaders: this.locatorHelper.getLocator('thead th'),
            tableRows: this.locatorHelper.getLocator('tbody tr'),
            // Table columns
            itemIdColumn: this.locatorHelper.getByText('Item ID'),
            titleColumn: this.locatorHelper.getByText('Title'),
            typeColumn: this.locatorHelper.getByText('Type'),
            statusColumn: this.locatorHelper.getByText('Status'),
            priorityColumn: this.locatorHelper.getByText('Priority'),
            assignedToColumn: this.locatorHelper.getByText('Assigned To'),
            dueDateColumn: this.locatorHelper.getByText('Due Date'),
            lastReviewColumn: this.locatorHelper.getByText('Last Review'),
            actionsColumn: this.locatorHelper.getByText('Actions'),
            // Status indicators
            compliantStatus: this.locatorHelper.getByText('Compliant'),
            nonCompliantStatus: this.locatorHelper.getByText('Non-Compliant'),
            pendingStatus: this.locatorHelper.getByText('Pending'),
            inReviewStatus: this.locatorHelper.getByText('In Review'),
            overdueStatus: this.locatorHelper.getByText('Overdue'),
            // Priority indicators
            highPriority: this.locatorHelper.getByText('High'),
            mediumPriority: this.locatorHelper.getByText('Medium'),
            lowPriority: this.locatorHelper.getByText('Low'),
            criticalPriority: this.locatorHelper.getByText('Critical'),
            // Compliance types
            regulatoryType: this.locatorHelper.getByText('Regulatory'),
            internalType: this.locatorHelper.getByText('Internal'),
            auditType: this.locatorHelper.getByText('Audit'),
            riskType: this.locatorHelper.getByText('Risk'),
            // Row actions
            viewButton: this.locatorHelper.getButtonByText('View'),
            editButton: this.locatorHelper.getButtonByText('Edit'),
            reviewButton: this.locatorHelper.getButtonByText('Review'),
            approveButton: this.locatorHelper.getButtonByText('Approve'),
            rejectButton: this.locatorHelper.getButtonByText('Reject'),
            deleteButton: this.locatorHelper.getButtonByText('Delete'),
            // Modal/Form elements
            complianceModal: this.locatorHelper.getByTestId('compliance-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            itemTitleInput: this.locatorHelper.getInputByLabel('Title'),
            descriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
            typeSelect: this.locatorHelper.getInputByLabel('Type'),
            prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
            statusSelect: this.locatorHelper.getInputByLabel('Status'),
            assignedToSelect: this.locatorHelper.getInputByLabel('Assigned To'),
            dueDateInput: this.locatorHelper.getInputByLabel('Due Date'),
            requirementsTextarea: this.locatorHelper.getInputByLabel('Requirements'),
            evidenceTextarea: this.locatorHelper.getInputByLabel('Evidence'),
            // Review section
            reviewSection: this.locatorHelper.getByTestId('review-section'),
            reviewNotesTextarea: this.locatorHelper.getInputByLabel('Review Notes'),
            reviewStatusSelect: this.locatorHelper.getInputByLabel('Review Status'),
            reviewerSelect: this.locatorHelper.getInputByLabel('Reviewer'),
            reviewDateInput: this.locatorHelper.getInputByLabel('Review Date'),
            // Attachments
            attachmentsSection: this.locatorHelper.getByTestId('attachments-section'),
            uploadAttachmentButton: this.locatorHelper.getButtonByText('Upload Attachment'),
            attachmentsList: this.locatorHelper.getByTestId('attachments-list'),
            // Audit trail
            auditTrailSection: this.locatorHelper.getByTestId('audit-trail'),
            auditEntries: this.locatorHelper.getLocator('.audit-entry'),
            // Dashboard widgets
            complianceOverview: this.locatorHelper.getByTestId('compliance-overview'),
            complianceScore: this.locatorHelper.getByTestId('compliance-score'),
            overdueItems: this.locatorHelper.getByTestId('overdue-items'),
            upcomingDeadlines: this.locatorHelper.getByTestId('upcoming-deadlines'),
            recentActivity: this.locatorHelper.getByTestId('recent-activity'),
            // Reports section
            reportsSection: this.locatorHelper.getByTestId('reports-section'),
            reportTypeSelect: this.locatorHelper.getInputByLabel('Report Type'),
            reportPeriodSelect: this.locatorHelper.getInputByLabel('Period'),
            reportFormatSelect: this.locatorHelper.getInputByLabel('Format'),
            // Common form buttons
            saveButton: this.locatorHelper.getButtonByText('Save'),
            cancelButton: this.locatorHelper.getButtonByText('Cancel'),
            closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                this.locatorHelper.getLocator('.close, .btn-close'),
            // Pagination
            pagination: this.locatorHelper.getByTestId('pagination') ||
                this.locatorHelper.getLocator('.pagination'),
            previousPageButton: this.locatorHelper.getButtonByText('Previous'),
            nextPageButton: this.locatorHelper.getButtonByText('Next'),
            pageInfo: this.locatorHelper.getByTestId('page-info'),
        };
    }
    /**
     * Navigate to Compliance page
     */
    async navigate() {
        await this.navigateToPath('/compliance');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        await this.waitHelper.waitForElement(this.locators.complianceTable);
    }
    /**
     * Check if we're on the correct page
     */
    async isPageLoaded() {
        try {
            await this.waitForPageLoad();
            return true;
        }
        catch {
            return false;
        }
    }
    /**
     * Search compliance items
     */
    async searchComplianceItems(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search compliance items...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter by status
     */
    async filterByStatus(status) {
        await this.actionHelper.clickLocator(this.locators.statusFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
    }
    /**
     * Filter by type
     */
    async filterByType(type) {
        await this.actionHelper.clickLocator(this.locators.typeFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.typeFilter.toString(), type);
    }
    /**
     * Filter by priority
     */
    async filterByPriority(priority) {
        await this.actionHelper.clickLocator(this.locators.priorityFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.priorityFilter.toString(), priority);
    }
    /**
     * Create new compliance item
     */
    async clickCreateComplianceItem() {
        await this.actionHelper.clickLocator(this.locators.createComplianceItemButton);
        await this.waitHelper.waitForElement(this.locators.complianceModal);
    }
    /**
     * Fill compliance item form
     */
    async fillComplianceForm(complianceData) {
        await this.actionHelper.fillInputByLabel('Title', complianceData.title);
        await this.actionHelper.fillInputByLabel('Description', complianceData.description);
        await this.actionHelper.selectCustomDropdown(this.locators.typeSelect.toString(), complianceData.type);
        await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), complianceData.priority);
        await this.actionHelper.selectCustomDropdown(this.locators.assignedToSelect.toString(), complianceData.assignedTo);
        await this.actionHelper.fillInputByLabel('Due Date', complianceData.dueDate);
        if (complianceData.requirements) {
            await this.actionHelper.fillInputByLabel('Requirements', complianceData.requirements);
        }
        if (complianceData.evidence) {
            await this.actionHelper.fillInputByLabel('Evidence', complianceData.evidence);
        }
    }
    /**
     * Save compliance item
     */
    async saveComplianceItem() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.complianceModal);
    }
    /**
     * Cancel compliance item creation/editing
     */
    async cancelComplianceItem() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.complianceModal);
    }
    /**
     * Review compliance item
     */
    async reviewComplianceItem(itemId, reviewData) {
        const row = this.locatorHelper.getContainingText('tr', itemId);
        const reviewButton = row.locator('button:has-text("Review")');
        await this.actionHelper.clickLocator(reviewButton);
        await this.actionHelper.fillInputByLabel('Review Notes', reviewData.notes);
        await this.actionHelper.selectCustomDropdown(this.locators.reviewStatusSelect.toString(), reviewData.status);
        await this.actionHelper.selectCustomDropdown(this.locators.reviewerSelect.toString(), reviewData.reviewer);
        await this.actionHelper.fillInputByLabel('Review Date', reviewData.date);
        await this.actionHelper.clickLocator(this.locators.saveButton);
    }
    /**
     * Approve compliance item
     */
    async approveComplianceItem(itemId) {
        const row = this.locatorHelper.getContainingText('tr', itemId);
        const approveButton = row.locator('button:has-text("Approve")');
        await this.actionHelper.clickLocator(approveButton);
    }
    /**
     * Reject compliance item
     */
    async rejectComplianceItem(itemId) {
        const row = this.locatorHelper.getContainingText('tr', itemId);
        const rejectButton = row.locator('button:has-text("Reject")');
        await this.actionHelper.clickLocator(rejectButton);
    }
    /**
     * Generate compliance report
     */
    async generateReport(reportData) {
        await this.actionHelper.clickLocator(this.locators.generateReportButton);
        await this.actionHelper.selectCustomDropdown(this.locators.reportTypeSelect.toString(), reportData.type);
        await this.actionHelper.selectCustomDropdown(this.locators.reportPeriodSelect.toString(), reportData.period);
        await this.actionHelper.selectCustomDropdown(this.locators.reportFormatSelect.toString(), reportData.format);
        await this.actionHelper.clickLocator(this.locators.saveButton);
    }
    /**
     * Upload attachment
     */
    async uploadAttachment(filePath) {
        await this.actionHelper.clickLocator(this.locators.uploadAttachmentButton);
        await this.actionHelper.uploadFile('input[type="file"]', filePath);
    }
    /**
     * Get compliance score
     */
    async getComplianceScore() {
        return await this.actionHelper.getTrimmedText(this.locators.complianceScore);
    }
    /**
     * Get overdue items count
     */
    async getOverdueItemsCount() {
        const overdueWidget = this.locators.overdueItems;
        const countElement = overdueWidget.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
    /**
     * Get compliance item status
     */
    async getComplianceItemStatus(itemId) {
        const row = this.locatorHelper.getContainingText('tr', itemId);
        const statusCell = row.locator('td').nth(3); // Assuming status is 4th column
        return await this.actionHelper.getTrimmedText(statusCell);
    }
    /**
     * Export compliance data
     */
    async exportComplianceData() {
        await this.actionHelper.clickLocator(this.locators.exportButton);
    }
    /**
     * Refresh compliance list
     */
    async refreshComplianceList() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
}
exports.CompliancePage = CompliancePage;
//# sourceMappingURL=CompliancePage.js.map