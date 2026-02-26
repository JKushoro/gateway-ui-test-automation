import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * UnmappedStorePage - Page Object Model for Unmapped Store functionality
 * Contains all locators and interactions for managing unmapped documents and data
 */
export declare class UnmappedStorePage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        typeFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        sourceFilter: import("playwright-core").Locator;
        mapItemButton: import("playwright-core").Locator;
        bulkMapButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        unmappedTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        selectColumn: import("playwright-core").Locator;
        itemIdColumn: import("playwright-core").Locator;
        typeColumn: import("playwright-core").Locator;
        titleColumn: import("playwright-core").Locator;
        sourceColumn: import("playwright-core").Locator;
        receivedDateColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        sizeColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        documentType: import("playwright-core").Locator;
        emailType: import("playwright-core").Locator;
        imageType: import("playwright-core").Locator;
        dataType: import("playwright-core").Locator;
        attachmentType: import("playwright-core").Locator;
        unmappedStatus: import("playwright-core").Locator;
        pendingStatus: import("playwright-core").Locator;
        mappedStatus: import("playwright-core").Locator;
        errorStatus: import("playwright-core").Locator;
        processingStatus: import("playwright-core").Locator;
        emailSource: import("playwright-core").Locator;
        uploadSource: import("playwright-core").Locator;
        scanSource: import("playwright-core").Locator;
        importSource: import("playwright-core").Locator;
        apiSource: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        mapButton: import("playwright-core").Locator;
        downloadButton: import("playwright-core").Locator;
        previewButton: import("playwright-core").Locator;
        deleteItemButton: import("playwright-core").Locator;
        mappingModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        clientSelect: import("playwright-core").Locator;
        advisorSelect: import("playwright-core").Locator;
        categorySelect: import("playwright-core").Locator;
        subcategorySelect: import("playwright-core").Locator;
        documentTypeSelect: import("playwright-core").Locator;
        tagsInput: import("playwright-core").Locator;
        notesTextarea: import("playwright-core").Locator;
        suggestionsSection: import("playwright-core").Locator;
        suggestionsList: import("playwright-core").Locator;
        applySuggestionButton: import("playwright-core").Locator;
        previewSection: import("playwright-core").Locator;
        previewContainer: import("playwright-core").Locator;
        previewImage: import("playwright-core").Locator;
        previewText: import("playwright-core").Locator;
        metadataSection: import("playwright-core").Locator;
        metadataTable: import("playwright-core").Locator;
        fileNameDisplay: import("playwright-core").Locator;
        fileSizeDisplay: import("playwright-core").Locator;
        fileTypeDisplay: import("playwright-core").Locator;
        createdDateDisplay: import("playwright-core").Locator;
        ocrSection: import("playwright-core").Locator;
        ocrText: import("playwright-core").Locator;
        runOcrButton: import("playwright-core").Locator;
        ocrConfidenceScore: import("playwright-core").Locator;
        bulkMappingModal: import("playwright-core").Locator;
        bulkClientSelect: import("playwright-core").Locator;
        bulkAdvisorSelect: import("playwright-core").Locator;
        bulkCategorySelect: import("playwright-core").Locator;
        selectedItemsCount: import("playwright-core").Locator;
        mapItemSaveButton: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        selectAllCheckbox: import("playwright-core").Locator;
        itemCheckboxes: import("playwright-core").Locator;
        totalUnmappedCard: import("playwright-core").Locator;
        pendingMappingCard: import("playwright-core").Locator;
        recentlyMappedCard: import("playwright-core").Locator;
        errorItemsCard: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        autoMappingSection: import("playwright-core").Locator;
        enableAutoMappingCheckbox: import("playwright-core").Locator;
        confidenceThresholdSlider: import("playwright-core").Locator;
        autoMappingRulesButton: import("playwright-core").Locator;
    };
    /**
     * Navigate to Unmapped Store page
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
     * Search unmapped items
     */
    searchUnmappedItems(searchTerm: string): Promise<void>;
    /**
     * Filter by type
     */
    filterByType(type: string): Promise<void>;
    /**
     * Filter by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Filter by source
     */
    filterBySource(source: string): Promise<void>;
    /**
     * View unmapped item
     */
    viewUnmappedItem(itemId: string): Promise<void>;
    /**
     * Preview unmapped item
     */
    previewUnmappedItem(itemId: string): Promise<void>;
    /**
     * Map single item
     */
    mapItem(itemId: string): Promise<void>;
    /**
     * Fill mapping form
     */
    fillMappingForm(mappingData: {
        client: string;
        advisor: string;
        category: string;
        subcategory?: string;
        documentType: string;
        tags?: string;
        notes?: string;
    }): Promise<void>;
    /**
     * Apply auto-mapping suggestion
     */
    applySuggestion(suggestionIndex?: number): Promise<void>;
    /**
     * Run OCR on document
     */
    runOCR(): Promise<void>;
    /**
     * Save mapping
     */
    saveMapping(): Promise<void>;
    /**
     * Cancel mapping
     */
    cancelMapping(): Promise<void>;
    /**
     * Select multiple items for bulk mapping
     */
    selectItems(itemIds: string[]): Promise<void>;
    /**
     * Select all items
     */
    selectAllItems(): Promise<void>;
    /**
     * Perform bulk mapping
     */
    performBulkMapping(): Promise<void>;
    /**
     * Fill bulk mapping form
     */
    fillBulkMappingForm(bulkData: {
        client: string;
        advisor: string;
        category: string;
    }): Promise<void>;
    /**
     * Save bulk mapping
     */
    saveBulkMapping(): Promise<void>;
    /**
     * Download unmapped item
     */
    downloadItem(itemId: string): Promise<void>;
    /**
     * Delete unmapped item
     */
    deleteItem(itemId: string): Promise<void>;
    /**
     * Get item status
     */
    getItemStatus(itemId: string): Promise<string>;
    /**
     * Get selected items count
     */
    getSelectedItemsCount(): Promise<string>;
    /**
     * Get total unmapped count
     */
    getTotalUnmappedCount(): Promise<string>;
    /**
     * Get OCR confidence score
     */
    getOCRConfidenceScore(): Promise<string>;
    /**
     * Get OCR extracted text
     */
    getOCRText(): Promise<string>;
    /**
     * Enable auto-mapping
     */
    enableAutoMapping(): Promise<void>;
    /**
     * Configure auto-mapping rules
     */
    configureAutoMappingRules(): Promise<void>;
    /**
     * Export unmapped items
     */
    exportUnmappedItems(): Promise<void>;
    /**
     * Refresh unmapped items list
     */
    refreshUnmappedItems(): Promise<void>;
}
//# sourceMappingURL=UnmappedStorePage.d.ts.map