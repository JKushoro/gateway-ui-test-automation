"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseManagementPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * CaseManagementPage - Page Object Model for Case Management functionality
 * Contains all locators and interactions for managing cases
 */
class CaseManagementPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Case Management'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Search and filters
            searchInput: this.locatorHelper.getInputByPlaceholder('Search cases...') ||
                this.locatorHelper.getByTestId('search-input'),
            filterDropdown: this.locatorHelper.getByTestId('filter-dropdown') ||
                this.locatorHelper.getLocator('.filter-dropdown'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            priorityFilter: this.locatorHelper.getByTestId('priority-filter'),
            advisorFilter: this.locatorHelper.getByTestId('advisor-filter'),
            clientFilter: this.locatorHelper.getByTestId('client-filter'),
            dateRangeFilter: this.locatorHelper.getByTestId('date-range-filter'),
            caseTypeFilter: this.locatorHelper.getByTestId('case-type-filter'),
            // Action buttons
            createCaseButton: this.locatorHelper.getButtonByText('Create Case') ||
                this.locatorHelper.getByTestId('create-case-btn'),
            bulkActionsButton: this.locatorHelper.getButtonByText('Bulk Actions') ||
                this.locatorHelper.getByTestId('bulk-actions-btn'),
            exportButton: this.locatorHelper.getButtonByText('Export') ||
                this.locatorHelper.getByTestId('export-btn'),
            refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                this.locatorHelper.getByTestId('refresh-btn'),
            // View toggles
            listViewButton: this.locatorHelper.getButtonByText('List View') ||
                this.locatorHelper.getByTestId('list-view-btn'),
            kanbanViewButton: this.locatorHelper.getButtonByText('Kanban View') ||
                this.locatorHelper.getByTestId('kanban-view-btn'),
            // Table elements (List View)
            casesTable: this.locatorHelper.getByTestId('cases-table') ||
                this.locatorHelper.getLocator('table'),
            tableHeaders: this.locatorHelper.getLocator('thead th'),
            tableRows: this.locatorHelper.getLocator('tbody tr'),
            // Table columns
            caseIdColumn: this.locatorHelper.getByText('Case ID'),
            titleColumn: this.locatorHelper.getByText('Title'),
            clientColumn: this.locatorHelper.getByText('Client'),
            advisorColumn: this.locatorHelper.getByText('Advisor'),
            typeColumn: this.locatorHelper.getByText('Type'),
            statusColumn: this.locatorHelper.getByText('Status'),
            priorityColumn: this.locatorHelper.getByText('Priority'),
            createdDateColumn: this.locatorHelper.getByText('Created Date'),
            dueDateColumn: this.locatorHelper.getByText('Due Date'),
            actionsColumn: this.locatorHelper.getByText('Actions'),
            // Kanban board elements
            kanbanBoard: this.locatorHelper.getByTestId('kanban-board') ||
                this.locatorHelper.getLocator('.kanban-board'),
            kanbanColumns: this.locatorHelper.getLocator('.kanban-column'),
            kanbanCards: this.locatorHelper.getLocator('.kanban-card'),
            // Kanban column headers
            newColumn: this.locatorHelper.getByText('New'),
            inProgressColumn: this.locatorHelper.getByText('In Progress'),
            reviewColumn: this.locatorHelper.getByText('Under Review'),
            completedColumn: this.locatorHelper.getByText('Completed'),
            closedColumn: this.locatorHelper.getByText('Closed'),
            // Row/Card actions
            viewButton: this.locatorHelper.getButtonByText('View'),
            editButton: this.locatorHelper.getButtonByText('Edit'),
            assignButton: this.locatorHelper.getButtonByText('Assign'),
            closeButton: this.locatorHelper.getButtonByText('Close'),
            deleteButton: this.locatorHelper.getButtonByText('Delete'),
            duplicateButton: this.locatorHelper.getButtonByText('Duplicate'),
            // Status indicators
            newStatus: this.locatorHelper.getByText('New'),
            inProgressStatus: this.locatorHelper.getByText('In Progress'),
            reviewStatus: this.locatorHelper.getByText('Under Review'),
            completedStatus: this.locatorHelper.getByText('Completed'),
            closedStatus: this.locatorHelper.getByText('Closed'),
            onHoldStatus: this.locatorHelper.getByText('On Hold'),
            // Priority indicators
            highPriority: this.locatorHelper.getByText('High'),
            mediumPriority: this.locatorHelper.getByText('Medium'),
            lowPriority: this.locatorHelper.getByText('Low'),
            urgentPriority: this.locatorHelper.getByText('Urgent'),
            // Case types
            consultationType: this.locatorHelper.getByText('Consultation'),
            complaintType: this.locatorHelper.getByText('Complaint'),
            reviewType: this.locatorHelper.getByText('Review'),
            followUpType: this.locatorHelper.getByText('Follow-up'),
            // Modal/Form elements
            caseModal: this.locatorHelper.getByTestId('case-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            caseTitleInput: this.locatorHelper.getInputByLabel('Case Title'),
            caseDescriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
            caseTypeSelect: this.locatorHelper.getInputByLabel('Case Type'),
            clientSelect: this.locatorHelper.getInputByLabel('Client'),
            advisorSelect: this.locatorHelper.getInputByLabel('Advisor'),
            prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
            statusSelect: this.locatorHelper.getInputByLabel('Status'),
            dueDateInput: this.locatorHelper.getInputByLabel('Due Date'),
            tagsInput: this.locatorHelper.getInputByLabel('Tags'),
            // Case details sections
            caseDetailsSection: this.locatorHelper.getByTestId('case-details'),
            notesSection: this.locatorHelper.getByTestId('case-notes'),
            attachmentsSection: this.locatorHelper.getByTestId('case-attachments'),
            historySection: this.locatorHelper.getByTestId('case-history'),
            // Notes and comments
            addNoteButton: this.locatorHelper.getButtonByText('Add Note') ||
                this.locatorHelper.getByTestId('add-note-btn'),
            noteTextarea: this.locatorHelper.getInputByLabel('Note'),
            saveNoteButton: this.locatorHelper.getButtonByText('Save Note'),
            notesList: this.locatorHelper.getByTestId('notes-list'),
            // Attachments
            uploadAttachmentButton: this.locatorHelper.getButtonByText('Upload Attachment') ||
                this.locatorHelper.getByTestId('upload-attachment-btn'),
            fileInput: this.locatorHelper.getLocator('input[type="file"]'),
            attachmentsList: this.locatorHelper.getByTestId('attachments-list'),
            downloadAttachmentButton: this.locatorHelper.getButtonByText('Download'),
            deleteAttachmentButton: this.locatorHelper.getButtonByText('Delete'),
            // Case history
            historyTimeline: this.locatorHelper.getByTestId('history-timeline'),
            historyEntries: this.locatorHelper.getLocator('.history-entry'),
            // Assignment modal
            assignmentModal: this.locatorHelper.getByTestId('assignment-modal'),
            assignToSelect: this.locatorHelper.getInputByLabel('Assign To'),
            assignmentNotesTextarea: this.locatorHelper.getInputByLabel('Assignment Notes'),
            assignCaseButton: this.locatorHelper.getButtonByText('Assign'),
            // Bulk actions
            bulkActionsDropdown: this.locatorHelper.getByTestId('bulk-actions-dropdown'),
            selectAllCheckbox: this.locatorHelper.getInputByLabel('Select All'),
            caseCheckboxes: this.locatorHelper.getLocator('input[type="checkbox"]'),
            bulkAssignOption: this.locatorHelper.getByText('Bulk Assign'),
            bulkStatusChangeOption: this.locatorHelper.getByText('Change Status'),
            bulkDeleteOption: this.locatorHelper.getByText('Delete Selected'),
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
            // Statistics cards
            totalCasesCard: this.locatorHelper.getByText('Total Cases'),
            openCasesCard: this.locatorHelper.getByText('Open Cases'),
            overdueCasesCard: this.locatorHelper.getByText('Overdue Cases'),
            completedTodayCard: this.locatorHelper.getByText('Completed Today'),
        };
    }
    /**
     * Navigate to Case Management page
     */
    async navigate() {
        await this.navigateToPath('/case-management');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        // Wait for either table or kanban view to load
        try {
            await this.waitHelper.waitForElement(this.locators.casesTable, 2000);
        }
        catch {
            await this.waitHelper.waitForElement(this.locators.kanbanBoard);
        }
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
     * Search for cases
     */
    async searchCases(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search cases...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter cases by status
     */
    async filterByStatus(status) {
        await this.actionHelper.clickLocator(this.locators.statusFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.statusFilter.toString(), status);
    }
    /**
     * Filter cases by priority
     */
    async filterByPriority(priority) {
        await this.actionHelper.clickLocator(this.locators.priorityFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.priorityFilter.toString(), priority);
    }
    /**
     * Filter cases by advisor
     */
    async filterByAdvisor(advisor) {
        await this.actionHelper.clickLocator(this.locators.advisorFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorFilter.toString(), advisor);
    }
    /**
     * Switch to list view
     */
    async switchToListView() {
        await this.actionHelper.clickLocator(this.locators.listViewButton);
        await this.waitHelper.waitForElement(this.locators.casesTable);
    }
    /**
     * Switch to kanban view
     */
    async switchToKanbanView() {
        await this.actionHelper.clickLocator(this.locators.kanbanViewButton);
        await this.waitHelper.waitForElement(this.locators.kanbanBoard);
    }
    /**
     * Create new case
     */
    async clickCreateCase() {
        await this.actionHelper.clickLocator(this.locators.createCaseButton);
        await this.waitHelper.waitForElement(this.locators.caseModal);
    }
    /**
     * Fill case form
     */
    async fillCaseForm(caseData) {
        await this.actionHelper.fillInputByLabel('Case Title', caseData.title);
        await this.actionHelper.fillInputByLabel('Description', caseData.description);
        await this.actionHelper.selectCustomDropdown(this.locators.caseTypeSelect.toString(), caseData.caseType);
        await this.actionHelper.selectCustomDropdown(this.locators.clientSelect.toString(), caseData.client);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorSelect.toString(), caseData.advisor);
        await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), caseData.priority);
        await this.actionHelper.fillInputByLabel('Due Date', caseData.dueDate);
        if (caseData.status) {
            await this.actionHelper.selectCustomDropdown(this.locators.statusSelect.toString(), caseData.status);
        }
        if (caseData.tags) {
            await this.actionHelper.fillInputByLabel('Tags', caseData.tags);
        }
    }
    /**
     * Save case
     */
    async saveCase() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.caseModal);
    }
    /**
     * Cancel case creation/editing
     */
    async cancelCase() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.caseModal);
    }
    /**
     * View case details
     */
    async viewCase(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const viewButton = row.locator('button:has-text("View")');
        await this.actionHelper.clickLocator(viewButton);
    }
    /**
     * Edit case
     */
    async editCase(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const editButton = row.locator('button:has-text("Edit")');
        await this.actionHelper.clickLocator(editButton);
        await this.waitHelper.waitForElement(this.locators.caseModal);
    }
    /**
     * Assign case
     */
    async assignCase(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const assignButton = row.locator('button:has-text("Assign")');
        await this.actionHelper.clickLocator(assignButton);
        await this.waitHelper.waitForElement(this.locators.assignmentModal);
    }
    /**
     * Close case
     */
    async closeCase(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const closeButton = row.locator('button:has-text("Close")');
        await this.actionHelper.clickLocator(closeButton);
    }
    /**
     * Delete case
     */
    async deleteCase(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const deleteButton = row.locator('button:has-text("Delete")');
        await this.actionHelper.clickLocator(deleteButton);
    }
    /**
     * Add note to case
     */
    async addNote(noteText) {
        await this.actionHelper.clickLocator(this.locators.addNoteButton);
        await this.actionHelper.fillInputByLabel('Note', noteText);
        await this.actionHelper.clickLocator(this.locators.saveNoteButton);
    }
    /**
     * Upload attachment
     */
    async uploadAttachment(filePath) {
        await this.actionHelper.clickLocator(this.locators.uploadAttachmentButton);
        await this.actionHelper.uploadFile(this.locators.fileInput.toString(), filePath);
    }
    /**
     * Drag case card to different column (Kanban view)
     */
    async dragCaseToColumn(caseTitle, targetColumn) {
        const caseCard = this.locatorHelper.getContainingText('.kanban-card', caseTitle);
        const targetCol = this.locatorHelper.getContainingText('.kanban-column', targetColumn);
        await this.actionHelper.dragAndDrop(caseCard.toString(), targetCol.toString());
    }
    /**
     * Select multiple cases for bulk actions
     */
    async selectCases(caseIds) {
        for (const caseId of caseIds) {
            const row = this.locatorHelper.getContainingText('tr', caseId);
            const checkbox = row.locator('input[type="checkbox"]');
            await this.actionHelper.checkCheckbox(checkbox.toString());
        }
    }
    /**
     * Perform bulk assign
     */
    async bulkAssign(advisor) {
        await this.actionHelper.clickLocator(this.locators.bulkActionsButton);
        await this.actionHelper.clickLocator(this.locators.bulkAssignOption);
        await this.actionHelper.selectCustomDropdown(this.locators.assignToSelect.toString(), advisor);
        await this.actionHelper.clickLocator(this.locators.assignButton);
    }
    /**
     * Get case count
     */
    async getCaseCount() {
        return await this.actionHelper.getElementCount('tbody tr');
    }
    /**
     * Get case status
     */
    async getCaseStatus(caseId) {
        const row = this.locatorHelper.getContainingText('tr', caseId);
        const statusCell = row.locator('td').nth(5); // Assuming status is 6th column
        return await this.actionHelper.getTrimmedText(statusCell);
    }
    /**
     * Export cases
     */
    async exportCases() {
        await this.actionHelper.clickLocator(this.locators.exportButton);
    }
    /**
     * Refresh cases list
     */
    async refreshCases() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Get total cases count from statistics
     */
    async getTotalCasesCount() {
        const card = this.locatorHelper.getContainingText('.card', 'Total Cases');
        const countElement = card.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
    /**
     * Get open cases count from statistics
     */
    async getOpenCasesCount() {
        const card = this.locatorHelper.getContainingText('.card', 'Open Cases');
        const countElement = card.locator('.count, .number').first();
        return await this.actionHelper.getTrimmedText(countElement);
    }
}
exports.CaseManagementPage = CaseManagementPage;
//# sourceMappingURL=CaseManagementPage.js.map