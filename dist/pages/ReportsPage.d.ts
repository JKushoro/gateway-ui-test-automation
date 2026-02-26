import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * ReportsPage - Page Object Model for Reports functionality
 * Contains all locators and interactions for report generation and management
 */
export declare class ReportsPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        clientReportsSection: import("playwright-core").Locator;
        portfolioReportsSection: import("playwright-core").Locator;
        complianceReportsSection: import("playwright-core").Locator;
        performanceReportsSection: import("playwright-core").Locator;
        auditReportsSection: import("playwright-core").Locator;
        customReportsSection: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        categoryFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        createdByFilter: import("playwright-core").Locator;
        createReportButton: import("playwright-core").Locator;
        scheduleReportButton: import("playwright-core").Locator;
        importTemplateButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        reportsTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        reportIdColumn: import("playwright-core").Locator;
        nameColumn: import("playwright-core").Locator;
        categoryColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        createdByColumn: import("playwright-core").Locator;
        createdDateColumn: import("playwright-core").Locator;
        lastRunColumn: import("playwright-core").Locator;
        nextRunColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        readyStatus: import("playwright-core").Locator;
        runningStatus: import("playwright-core").Locator;
        completedStatus: import("playwright-core").Locator;
        failedStatus: import("playwright-core").Locator;
        scheduledStatus: import("playwright-core").Locator;
        runButton: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        downloadButton: import("playwright-core").Locator;
        scheduleButton: import("playwright-core").Locator;
        duplicateButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        reportBuilderModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        reportNameInput: import("playwright-core").Locator;
        reportDescriptionTextarea: import("playwright-core").Locator;
        reportCategorySelect: import("playwright-core").Locator;
        reportTypeSelect: import("playwright-core").Locator;
        dataSourceSection: import("playwright-core").Locator;
        clientsDataSource: import("playwright-core").Locator;
        portfoliosDataSource: import("playwright-core").Locator;
        transactionsDataSource: import("playwright-core").Locator;
        performanceDataSource: import("playwright-core").Locator;
        fieldsSection: import("playwright-core").Locator;
        availableFields: import("playwright-core").Locator;
        selectedFields: import("playwright-core").Locator;
        addFieldButton: import("playwright-core").Locator;
        removeFieldButton: import("playwright-core").Locator;
        filtersSection: import("playwright-core").Locator;
        addFilterButton: import("playwright-core").Locator;
        filterFieldSelect: import("playwright-core").Locator;
        filterOperatorSelect: import("playwright-core").Locator;
        filterValueInput: import("playwright-core").Locator;
        sortingSection: import("playwright-core").Locator;
        sortFieldSelect: import("playwright-core").Locator;
        sortOrderSelect: import("playwright-core").Locator;
        groupBySelect: import("playwright-core").Locator;
        formatSection: import("playwright-core").Locator;
        pdfFormat: import("playwright-core").Locator;
        excelFormat: import("playwright-core").Locator;
        csvFormat: import("playwright-core").Locator;
        htmlFormat: import("playwright-core").Locator;
        schedulingSection: import("playwright-core").Locator;
        scheduleEnabledCheckbox: import("playwright-core").Locator;
        frequencySelect: import("playwright-core").Locator;
        startDateInput: import("playwright-core").Locator;
        endDateInput: import("playwright-core").Locator;
        timeInput: import("playwright-core").Locator;
        emailRecipientsInput: import("playwright-core").Locator;
        previewSection: import("playwright-core").Locator;
        previewButton: import("playwright-core").Locator;
        previewContainer: import("playwright-core").Locator;
        templatesSection: import("playwright-core").Locator;
        templatesList: import("playwright-core").Locator;
        useTemplateButton: import("playwright-core").Locator;
        saveAsTemplateButton: import("playwright-core").Locator;
        quickReportsSection: import("playwright-core").Locator;
        clientSummaryReport: import("playwright-core").Locator;
        portfolioPerformanceReport: import("playwright-core").Locator;
        transactionHistoryReport: import("playwright-core").Locator;
        complianceStatusReport: import("playwright-core").Locator;
        historySection: import("playwright-core").Locator;
        historyTable: import("playwright-core").Locator;
        historyEntries: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        runReportButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
        totalReportsCard: import("playwright-core").Locator;
        scheduledReportsCard: import("playwright-core").Locator;
        recentRunsCard: import("playwright-core").Locator;
        failedReportsCard: import("playwright-core").Locator;
    };
    /**
     * Navigate to Reports page
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
     * Search reports
     */
    searchReports(searchTerm: string): Promise<void>;
    /**
     * Filter by category
     */
    filterByCategory(category: string): Promise<void>;
    /**
     * Filter by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Create new report
     */
    clickCreateReport(): Promise<void>;
    /**
     * Fill basic report information
     */
    fillBasicReportInfo(reportData: {
        name: string;
        description: string;
        category: string;
        type: string;
    }): Promise<void>;
    /**
     * Select data sources
     */
    selectDataSources(dataSources: string[]): Promise<void>;
    /**
     * Add fields to report
     */
    addFields(fields: string[]): Promise<void>;
    /**
     * Add filter to report
     */
    addFilter(filterData: {
        field: string;
        operator: string;
        value: string;
    }): Promise<void>;
    /**
     * Configure sorting
     */
    configureSorting(sortData: {
        field: string;
        order: string;
        groupBy?: string;
    }): Promise<void>;
    /**
     * Select output format
     */
    selectOutputFormat(format: string): Promise<void>;
    /**
     * Configure scheduling
     */
    configureScheduling(scheduleData: {
        enabled: boolean;
        frequency?: string;
        startDate?: string;
        endDate?: string;
        time?: string;
        recipients?: string;
    }): Promise<void>;
    /**
     * Preview report
     */
    previewReport(): Promise<void>;
    /**
     * Save report
     */
    saveReport(): Promise<void>;
    /**
     * Run report
     */
    runReport(): Promise<void>;
    /**
     * Cancel report creation/editing
     */
    cancelReport(): Promise<void>;
    /**
     * Run existing report
     */
    runExistingReport(reportId: string): Promise<void>;
    /**
     * Download report
     */
    downloadReport(reportId: string): Promise<void>;
    /**
     * Schedule existing report
     */
    scheduleExistingReport(reportId: string): Promise<void>;
    /**
     * Edit report
     */
    editReport(reportId: string): Promise<void>;
    /**
     * Delete report
     */
    deleteReport(reportId: string): Promise<void>;
    /**
     * Use template
     */
    useTemplate(templateName: string): Promise<void>;
    /**
     * Run quick report
     */
    runQuickReport(reportType: string): Promise<void>;
    /**
     * Get report status
     */
    getReportStatus(reportId: string): Promise<string>;
    /**
     * Get total reports count
     */
    getTotalReportsCount(): Promise<string>;
    /**
     * Refresh reports list
     */
    refreshReports(): Promise<void>;
}
//# sourceMappingURL=ReportsPage.d.ts.map