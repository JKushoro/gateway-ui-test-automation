import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * CaseManagementPage - Page Object Model for Case Management functionality
 * Contains all locators and interactions for managing cases
 */
export declare class CaseManagementPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        filterDropdown: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        priorityFilter: import("playwright-core").Locator;
        advisorFilter: import("playwright-core").Locator;
        clientFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        caseTypeFilter: import("playwright-core").Locator;
        createCaseButton: import("playwright-core").Locator;
        bulkActionsButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        listViewButton: import("playwright-core").Locator;
        kanbanViewButton: import("playwright-core").Locator;
        casesTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        caseIdColumn: import("playwright-core").Locator;
        titleColumn: import("playwright-core").Locator;
        clientColumn: import("playwright-core").Locator;
        advisorColumn: import("playwright-core").Locator;
        typeColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        priorityColumn: import("playwright-core").Locator;
        createdDateColumn: import("playwright-core").Locator;
        dueDateColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        kanbanBoard: import("playwright-core").Locator;
        kanbanColumns: import("playwright-core").Locator;
        kanbanCards: import("playwright-core").Locator;
        newColumn: import("playwright-core").Locator;
        inProgressColumn: import("playwright-core").Locator;
        reviewColumn: import("playwright-core").Locator;
        completedColumn: import("playwright-core").Locator;
        closedColumn: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        assignButton: import("playwright-core").Locator;
        closeButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        duplicateButton: import("playwright-core").Locator;
        newStatus: import("playwright-core").Locator;
        inProgressStatus: import("playwright-core").Locator;
        reviewStatus: import("playwright-core").Locator;
        completedStatus: import("playwright-core").Locator;
        closedStatus: import("playwright-core").Locator;
        onHoldStatus: import("playwright-core").Locator;
        highPriority: import("playwright-core").Locator;
        mediumPriority: import("playwright-core").Locator;
        lowPriority: import("playwright-core").Locator;
        urgentPriority: import("playwright-core").Locator;
        consultationType: import("playwright-core").Locator;
        complaintType: import("playwright-core").Locator;
        reviewType: import("playwright-core").Locator;
        followUpType: import("playwright-core").Locator;
        caseModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        caseTitleInput: import("playwright-core").Locator;
        caseDescriptionTextarea: import("playwright-core").Locator;
        caseTypeSelect: import("playwright-core").Locator;
        clientSelect: import("playwright-core").Locator;
        advisorSelect: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        dueDateInput: import("playwright-core").Locator;
        tagsInput: import("playwright-core").Locator;
        caseDetailsSection: import("playwright-core").Locator;
        notesSection: import("playwright-core").Locator;
        attachmentsSection: import("playwright-core").Locator;
        historySection: import("playwright-core").Locator;
        addNoteButton: import("playwright-core").Locator;
        noteTextarea: import("playwright-core").Locator;
        saveNoteButton: import("playwright-core").Locator;
        notesList: import("playwright-core").Locator;
        uploadAttachmentButton: import("playwright-core").Locator;
        fileInput: import("playwright-core").Locator;
        attachmentsList: import("playwright-core").Locator;
        downloadAttachmentButton: import("playwright-core").Locator;
        deleteAttachmentButton: import("playwright-core").Locator;
        historyTimeline: import("playwright-core").Locator;
        historyEntries: import("playwright-core").Locator;
        assignmentModal: import("playwright-core").Locator;
        assignToSelect: import("playwright-core").Locator;
        assignmentNotesTextarea: import("playwright-core").Locator;
        assignCaseButton: import("playwright-core").Locator;
        bulkActionsDropdown: import("playwright-core").Locator;
        selectAllCheckbox: import("playwright-core").Locator;
        caseCheckboxes: import("playwright-core").Locator;
        bulkAssignOption: import("playwright-core").Locator;
        bulkStatusChangeOption: import("playwright-core").Locator;
        bulkDeleteOption: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        totalCasesCard: import("playwright-core").Locator;
        openCasesCard: import("playwright-core").Locator;
        overdueCasesCard: import("playwright-core").Locator;
        completedTodayCard: import("playwright-core").Locator;
    };
    /**
     * Navigate to Case Management page
     */
    navigate(): Promise<void>;
    /**
     * Wait for page to load
     */
    waitForPageLoad(): Promise<void>;
    /**
     * Check if we're on the correct page
     */
    isPageLoaded(): Promise<boolean>;
    /**
     * Search for cases
     */
    searchCases(searchTerm: string): Promise<void>;
    /**
     * Filter cases by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter cases by priority
     */
    filterByPriority(priority: string): Promise<void>;
    /**
     * Filter cases by advisor
     */
    filterByAdvisor(advisor: string): Promise<void>;
    /**
     * Switch to list view
     */
    switchToListView(): Promise<void>;
    /**
     * Switch to kanban view
     */
    switchToKanbanView(): Promise<void>;
    /**
     * Create new case
     */
    clickCreateCase(): Promise<void>;
    /**
     * Fill case form
     */
    fillCaseForm(caseData: {
        title: string;
        description: string;
        caseType: string;
        client: string;
        advisor: string;
        priority: string;
        status?: string;
        dueDate: string;
        tags?: string;
    }): Promise<void>;
    /**
     * Save case
     */
    saveCase(): Promise<void>;
    /**
     * Cancel case creation/editing
     */
    cancelCase(): Promise<void>;
    /**
     * View case details
     */
    viewCase(caseId: string): Promise<void>;
    /**
     * Edit case
     */
    editCase(caseId: string): Promise<void>;
    /**
     * Assign case
     */
    assignCase(caseId: string): Promise<void>;
    /**
     * Close case
     */
    closeCase(caseId: string): Promise<void>;
    /**
     * Delete case
     */
    deleteCase(caseId: string): Promise<void>;
    /**
     * Add note to case
     */
    addNote(noteText: string): Promise<void>;
    /**
     * Upload attachment
     */
    uploadAttachment(filePath: string): Promise<void>;
    /**
     * Drag case card to different column (Kanban view)
     */
    dragCaseToColumn(caseTitle: string, targetColumn: string): Promise<void>;
    /**
     * Select multiple cases for bulk actions
     */
    selectCases(caseIds: string[]): Promise<void>;
    /**
     * Perform bulk assign
     */
    bulkAssign(advisor: string): Promise<void>;
    /**
     * Get case count
     */
    getCaseCount(): Promise<number>;
    /**
     * Get case status
     */
    getCaseStatus(caseId: string): Promise<string>;
    /**
     * Export cases
     */
    exportCases(): Promise<void>;
    /**
     * Refresh cases list
     */
    refreshCases(): Promise<void>;
    /**
     * Get total cases count from statistics
     */
    getTotalCasesCount(): Promise<string>;
    /**
     * Get open cases count from statistics
     */
    getOpenCasesCount(): Promise<string>;
}
//# sourceMappingURL=CaseManagementPage.d.ts.map