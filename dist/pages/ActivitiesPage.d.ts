import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * ActivitiesPage - Page Object Model for Activities functionality
 * Contains all locators and interactions for managing activities
 */
export declare class ActivitiesPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        filterDropdown: import("playwright-core").Locator;
        typeFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        dateRangeFilter: import("playwright-core").Locator;
        createActivityButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        listViewButton: import("playwright-core").Locator;
        calendarViewButton: import("playwright-core").Locator;
        activitiesTable: import("playwright-core").Locator;
        tableHeaders: import("playwright-core").Locator;
        tableRows: import("playwright-core").Locator;
        activityIdColumn: import("playwright-core").Locator;
        titleColumn: import("playwright-core").Locator;
        typeColumn: import("playwright-core").Locator;
        clientColumn: import("playwright-core").Locator;
        advisorColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        dueDateColumn: import("playwright-core").Locator;
        priorityColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        calendarContainer: import("playwright-core").Locator;
        monthView: import("playwright-core").Locator;
        weekView: import("playwright-core").Locator;
        dayView: import("playwright-core").Locator;
        calendarNavigation: import("playwright-core").Locator;
        previousMonthButton: import("playwright-core").Locator;
        nextMonthButton: import("playwright-core").Locator;
        todayButton: import("playwright-core").Locator;
        viewButton: import("playwright-core").Locator;
        editButton: import("playwright-core").Locator;
        completeButton: import("playwright-core").Locator;
        deleteButton: import("playwright-core").Locator;
        pendingStatus: import("playwright-core").Locator;
        inProgressStatus: import("playwright-core").Locator;
        completedStatus: import("playwright-core").Locator;
        overdueStatus: import("playwright-core").Locator;
        highPriority: import("playwright-core").Locator;
        mediumPriority: import("playwright-core").Locator;
        lowPriority: import("playwright-core").Locator;
        activityModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        titleInput: import("playwright-core").Locator;
        typeSelect: import("playwright-core").Locator;
        clientSelect: import("playwright-core").Locator;
        advisorSelect: import("playwright-core").Locator;
        descriptionTextarea: import("playwright-core").Locator;
        dueDateInput: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
    };
    /**
     * Navigate to Activities page
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
     * Search for activities
     */
    searchActivities(searchTerm: string): Promise<void>;
    /**
     * Filter activities by type
     */
    filterByType(type: string): Promise<void>;
    /**
     * Filter activities by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Switch to list view
     */
    switchToListView(): Promise<void>;
    /**
     * Switch to calendar view
     */
    switchToCalendarView(): Promise<void>;
    /**
     * Create new activity
     */
    clickCreateActivity(): Promise<void>;
    /**
     * Fill activity form
     */
    fillActivityForm(activityData: {
        title: string;
        type: string;
        client: string;
        advisor: string;
        description: string;
        dueDate: string;
        priority: string;
        status?: string;
    }): Promise<void>;
    /**
     * Save activity
     */
    saveActivity(): Promise<void>;
    /**
     * Cancel activity creation/editing
     */
    cancelActivity(): Promise<void>;
    /**
     * View activity details
     */
    viewActivity(activityId: string): Promise<void>;
    /**
     * Edit activity
     */
    editActivity(activityId: string): Promise<void>;
    /**
     * Complete activity
     */
    completeActivity(activityId: string): Promise<void>;
    /**
     * Delete activity
     */
    deleteActivity(activityId: string): Promise<void>;
    /**
     * Get activity count
     */
    getActivityCount(): Promise<number>;
    /**
     * Get activity status
     */
    getActivityStatus(activityId: string): Promise<string>;
    /**
     * Navigate calendar to previous month
     */
    goToPreviousMonth(): Promise<void>;
    /**
     * Navigate calendar to next month
     */
    goToNextMonth(): Promise<void>;
    /**
     * Navigate calendar to today
     */
    goToToday(): Promise<void>;
    /**
     * Export activities
     */
    exportActivities(): Promise<void>;
    /**
     * Refresh activities list
     */
    refreshActivities(): Promise<void>;
}
//# sourceMappingURL=ActivitiesPage.d.ts.map