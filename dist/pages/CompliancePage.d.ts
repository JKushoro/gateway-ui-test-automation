import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * CompliancePage - Page Object Model for Compliance functionality
 * Contains all locators and interactions for compliance management
 */
export declare class CompliancePage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        regulatorySection: import("playwright-core").Locator;
        auditSection: import("playwright-core").Locator;
        riskManagementSection: import("playwright-core").Locator;
        reportingSection: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        typeFilter: import("playwright-core").Locator;
        priorityFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        createComplianceItemButton: import("playwright-core").Locator;
        generateReportButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        complianceTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        itemIdColumn: import("playwright-core").Locator;
        titleColumn: import("playwright-core").Locator;
        typeColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        priorityColumn: import("playwright-core").Locator;
        assignedToColumn: import("playwright-core").Locator;
        dueDateColumn: import("playwright-core").Locator;
        lastReviewColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        compliantStatus: import("playwright-core").Locator;
        nonCompliantStatus: import("playwright-core").Locator;
        pendingStatus: import("playwright-core").Locator;
        inReviewStatus: import("playwright-core").Locator;
        overdueStatus: import("playwright-core").Locator;
        highPriority: import("playwright-core").Locator;
        mediumPriority: import("playwright-core").Locator;
        lowPriority: import("playwright-core").Locator;
        criticalPriority: import("playwright-core").Locator;
        regulatoryType: import("playwright-core").Locator;
        internalType: import("playwright-core").Locator;
        auditType: import("playwright-core").Locator;
        riskType: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        reviewButton: import("playwright-core").Locator;
        approveButton: import("playwright-core").Locator;
        rejectButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        complianceModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        itemTitleInput: import("playwright-core").Locator;
        descriptionTextarea: import("playwright-core").Locator;
        typeSelect: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        assignedToSelect: import("playwright-core").Locator;
        dueDateInput: import("playwright-core").Locator;
        requirementsTextarea: import("playwright-core").Locator;
        evidenceTextarea: import("playwright-core").Locator;
        reviewSection: import("playwright-core").Locator;
        reviewNotesTextarea: import("playwright-core").Locator;
        reviewStatusSelect: import("playwright-core").Locator;
        reviewerSelect: import("playwright-core").Locator;
        reviewDateInput: import("playwright-core").Locator;
        attachmentsSection: import("playwright-core").Locator;
        uploadAttachmentButton: import("playwright-core").Locator;
        attachmentsList: import("playwright-core").Locator;
        auditTrailSection: import("playwright-core").Locator;
        auditEntries: import("playwright-core").Locator;
        complianceOverview: import("playwright-core").Locator;
        complianceScore: import("playwright-core").Locator;
        overdueItems: import("playwright-core").Locator;
        upcomingDeadlines: import("playwright-core").Locator;
        recentActivity: import("playwright-core").Locator;
        reportsSection: import("playwright-core").Locator;
        reportTypeSelect: import("playwright-core").Locator;
        reportPeriodSelect: import("playwright-core").Locator;
        reportFormatSelect: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
    };
    /**
     * Navigate to Compliance page
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
     * Search compliance items
     */
    searchComplianceItems(searchTerm: string): Promise<void>;
    /**
     * Filter by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter by type
     */
    filterByType(type: string): Promise<void>;
    /**
     * Filter by priority
     */
    filterByPriority(priority: string): Promise<void>;
    /**
     * Create new compliance item
     */
    clickCreateComplianceItem(): Promise<void>;
    /**
     * Fill compliance item form
     */
    fillComplianceForm(complianceData: {
        title: string;
        description: string;
        type: string;
        priority: string;
        assignedTo: string;
        dueDate: string;
        requirements?: string;
        evidence?: string;
    }): Promise<void>;
    /**
     * Save compliance item
     */
    saveComplianceItem(): Promise<void>;
    /**
     * Cancel compliance item creation/editing
     */
    cancelComplianceItem(): Promise<void>;
    /**
     * Review compliance item
     */
    reviewComplianceItem(itemId: string, reviewData: {
        notes: string;
        status: string;
        reviewer: string;
        date: string;
    }): Promise<void>;
    /**
     * Approve compliance item
     */
    approveComplianceItem(itemId: string): Promise<void>;
    /**
     * Reject compliance item
     */
    rejectComplianceItem(itemId: string): Promise<void>;
    /**
     * Generate compliance report
     */
    generateReport(reportData: {
        type: string;
        period: string;
        format: string;
    }): Promise<void>;
    /**
     * Upload attachment
     */
    uploadAttachment(filePath: string): Promise<void>;
    /**
     * Get compliance score
     */
    getComplianceScore(): Promise<string>;
    /**
     * Get overdue items count
     */
    getOverdueItemsCount(): Promise<string>;
    /**
     * Get compliance item status
     */
    getComplianceItemStatus(itemId: string): Promise<string>;
    /**
     * Export compliance data
     */
    exportComplianceData(): Promise<void>;
    /**
     * Refresh compliance list
     */
    refreshComplianceList(): Promise<void>;
}
//# sourceMappingURL=CompliancePage.d.ts.map