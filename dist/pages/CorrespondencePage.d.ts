import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * CorrespondencePage - Page Object Model for Correspondence functionality
 * Contains all locators and interactions for managing correspondence
 */
export declare class CorrespondencePage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        inboxSection: import("playwright-core").Locator;
        sentSection: import("playwright-core").Locator;
        draftsSection: import("playwright-core").Locator;
        templatesSection: import("playwright-core").Locator;
        archiveSection: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        typeFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        priorityFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        clientFilter: import("playwright-core").Locator;
        composeButton: import("playwright-core").Locator;
        replyButton: import("playwright-core").Locator;
        forwardButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        archiveButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        correspondenceTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        selectColumn: import("playwright-core").Locator;
        typeColumn: import("playwright-core").Locator;
        subjectColumn: import("playwright-core").Locator;
        fromColumn: import("playwright-core").Locator;
        toColumn: import("playwright-core").Locator;
        clientColumn: import("playwright-core").Locator;
        dateColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        priorityColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        emailType: import("playwright-core").Locator;
        letterType: import("playwright-core").Locator;
        smsType: import("playwright-core").Locator;
        faxType: import("playwright-core").Locator;
        noteType: import("playwright-core").Locator;
        draftStatus: import("playwright-core").Locator;
        sentStatus: import("playwright-core").Locator;
        deliveredStatus: import("playwright-core").Locator;
        readStatus: import("playwright-core").Locator;
        failedStatus: import("playwright-core").Locator;
        highPriority: import("playwright-core").Locator;
        mediumPriority: import("playwright-core").Locator;
        lowPriority: import("playwright-core").Locator;
        urgentPriority: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        duplicateButton: import("playwright-core").Locator;
        printButton: import("playwright-core").Locator;
        composeModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        typeSelect: import("playwright-core").Locator;
        toInput: import("playwright-core").Locator;
        ccInput: import("playwright-core").Locator;
        bccInput: import("playwright-core").Locator;
        clientSelect: import("playwright-core").Locator;
        subjectInput: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        messageEditor: import("playwright-core").Locator;
        messageTextarea: import("playwright-core").Locator;
        boldButton: import("playwright-core").Locator;
        italicButton: import("playwright-core").Locator;
        underlineButton: import("playwright-core").Locator;
        bulletListButton: import("playwright-core").Locator;
        numberedListButton: import("playwright-core").Locator;
        attachmentsSection: import("playwright-core").Locator;
        attachFileButton: import("playwright-core").Locator;
        fileInput: import("playwright-core").Locator;
        attachmentsList: import("playwright-core").Locator;
        removeAttachmentButton: import("playwright-core").Locator;
        templatesDropdown: import("playwright-core").Locator;
        useTemplateButton: import("playwright-core").Locator;
        saveAsTemplateButton: import("playwright-core").Locator;
        templateNameInput: import("playwright-core").Locator;
        schedulingSection: import("playwright-core").Locator;
        scheduleCheckbox: import("playwright-core").Locator;
        scheduleDateInput: import("playwright-core").Locator;
        scheduleTimeInput: import("playwright-core").Locator;
        deliverySection: import("playwright-core").Locator;
        deliveryReceiptCheckbox: import("playwright-core").Locator;
        readReceiptCheckbox: import("playwright-core").Locator;
        signatureSection: import("playwright-core").Locator;
        signatureSelect: import("playwright-core").Locator;
        includeSignatureCheckbox: import("playwright-core").Locator;
        sendButton: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        saveDraftButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        viewModal: import("playwright-core").Locator;
        correspondenceContent: import("playwright-core").Locator;
        correspondenceHeader: import("playwright-core").Locator;
        correspondenceBody: import("playwright-core").Locator;
        correspondenceAttachments: import("playwright-core").Locator;
        selectAllCheckbox: import("playwright-core").Locator;
        bulkActionsDropdown: import("playwright-core").Locator;
        bulkDeleteOption: import("playwright-core").Locator;
        bulkArchiveOption: import("playwright-core").Locator;
        bulkMarkReadOption: import("playwright-core").Locator;
        bulkMarkUnreadOption: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        totalCorrespondenceCard: import("playwright-core").Locator;
        unreadCorrespondenceCard: import("playwright-core").Locator;
        sentTodayCard: import("playwright-core").Locator;
        pendingCard: import("playwright-core").Locator;
    };
    /**
     * Navigate to Correspondence page
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
     * Search correspondence
     */
    searchCorrespondence(searchTerm: string): Promise<void>;
    /**
     * Filter by type
     */
    filterByType(type: string): Promise<void>;
    /**
     * Filter by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter by priority
     */
    filterByPriority(priority: string): Promise<void>;
    /**
     * Navigate to section
     */
    navigateToSection(section: string): Promise<void>;
    /**
     * Compose new correspondence
     */
    clickCompose(): Promise<void>;
    /**
     * Fill correspondence form
     */
    fillCorrespondenceForm(correspondenceData: {
        type: string;
        to: string;
        cc?: string;
        bcc?: string;
        client?: string;
        subject: string;
        priority: string;
        message: string;
    }): Promise<void>;
    /**
     * Format message text
     */
    formatText(format: 'bold' | 'italic' | 'underline'): Promise<void>;
    /**
     * Attach file
     */
    attachFile(filePath: string): Promise<void>;
    /**
     * Use template
     */
    useTemplate(templateName: string): Promise<void>;
    /**
     * Save as template
     */
    saveAsTemplate(templateName: string): Promise<void>;
    /**
     * Schedule correspondence
     */
    scheduleCorrespondence(scheduleData: {
        date: string;
        time: string;
    }): Promise<void>;
    /**
     * Configure delivery options
     */
    configureDeliveryOptions(options: {
        deliveryReceipt?: boolean;
        readReceipt?: boolean;
    }): Promise<void>;
    /**
     * Include signature
     */
    includeSignature(signatureName?: string): Promise<void>;
    /**
     * Send correspondence
     */
    sendCorrespondence(): Promise<void>;
    /**
     * Save as draft
     */
    saveDraft(): Promise<void>;
    /**
     * Cancel correspondence
     */
    cancelCorrespondence(): Promise<void>;
    /**
     * View correspondence
     */
    viewCorrespondence(correspondenceId: string): Promise<void>;
    /**
     * Reply to correspondence
     */
    replyToCorrespondence(correspondenceId: string): Promise<void>;
    /**
     * Forward correspondence
     */
    forwardCorrespondence(correspondenceId: string): Promise<void>;
    /**
     * Delete correspondence
     */
    deleteCorrespondence(correspondenceId: string): Promise<void>;
    /**
     * Archive correspondence
     */
    archiveCorrespondence(correspondenceId: string): Promise<void>;
    /**
     * Select multiple correspondence items
     */
    selectCorrespondenceItems(correspondenceIds: string[]): Promise<void>;
    /**
     * Perform bulk action
     */
    performBulkAction(action: string): Promise<void>;
    /**
     * Get correspondence status
     */
    getCorrespondenceStatus(correspondenceId: string): Promise<string>;
    /**
     * Get total correspondence count
     */
    getTotalCorrespondenceCount(): Promise<string>;
    /**
     * Get unread correspondence count
     */
    getUnreadCorrespondenceCount(): Promise<string>;
    /**
     * Refresh correspondence list
     */
    refreshCorrespondence(): Promise<void>;
}
//# sourceMappingURL=CorrespondencePage.d.ts.map