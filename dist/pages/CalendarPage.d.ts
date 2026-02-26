import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * CalendarPage - Page Object Model for Calendar functionality
 * Contains all locators and interactions for calendar management
 */
export declare class CalendarPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        calendarHeader: import("playwright-core").Locator;
        currentMonthYear: import("playwright-core").Locator;
        previousMonthButton: import("playwright-core").Locator;
        nextMonthButton: import("playwright-core").Locator;
        todayButton: import("playwright-core").Locator;
        monthViewButton: import("playwright-core").Locator;
        weekViewButton: import("playwright-core").Locator;
        dayViewButton: import("playwright-core").Locator;
        agendaViewButton: import("playwright-core").Locator;
        calendarContainer: import("playwright-core").Locator;
        calendarGrid: import("playwright-core").Locator;
        calendarDays: import("playwright-core").Locator;
        calendarWeeks: import("playwright-core").Locator;
        calendarEvents: import("playwright-core").Locator;
        timeSlots: import("playwright-core").Locator;
        eventTitle: import("playwright-core").Locator;
        eventTime: import("playwright-core").Locator;
        eventDescription: import("playwright-core").Locator;
        allDayEvents: import("playwright-core").Locator;
        createEventButton: import("playwright-core").Locator;
        importCalendarButton: import("playwright-core").Locator;
        exportCalendarButton: import("playwright-core").Locator;
        printCalendarButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        eventTypeFilter: import("playwright-core").Locator;
        advisorFilter: import("playwright-core").Locator;
        clientFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        calendarLegend: import("playwright-core").Locator;
        appointmentLegend: import("playwright-core").Locator;
        meetingLegend: import("playwright-core").Locator;
        deadlineLegend: import("playwright-core").Locator;
        holidayLegend: import("playwright-core").Locator;
        eventModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        eventTitleInput: import("playwright-core").Locator;
        eventDescriptionTextarea: import("playwright-core").Locator;
        eventTypeSelect: import("playwright-core").Locator;
        startDateInput: import("playwright-core").Locator;
        startTimeInput: import("playwright-core").Locator;
        endDateInput: import("playwright-core").Locator;
        endTimeInput: import("playwright-core").Locator;
        allDayCheckbox: import("playwright-core").Locator;
        locationInput: import("playwright-core").Locator;
        attendeesInput: import("playwright-core").Locator;
        reminderSelect: import("playwright-core").Locator;
        repeatSelect: import("playwright-core").Locator;
        prioritySelect: import("playwright-core").Locator;
        viewEventButton: import("playwright-core").Locator;
        editEventButton: import("playwright-core").Locator;
        deleteEventButton: import("playwright-core").Locator;
        duplicateEventButton: import("playwright-core").Locator;
        recurringOptions: import("playwright-core").Locator;
        dailyOption: import("playwright-core").Locator;
        weeklyOption: import("playwright-core").Locator;
        monthlyOption: import("playwright-core").Locator;
        yearlyOption: import("playwright-core").Locator;
        customOption: import("playwright-core").Locator;
        timePicker: import("playwright-core").Locator;
        hourSelect: import("playwright-core").Locator;
        minuteSelect: import("playwright-core").Locator;
        amPmSelect: import("playwright-core").Locator;
        datePicker: import("playwright-core").Locator;
        datePickerCalendar: import("playwright-core").Locator;
        miniCalendar: import("playwright-core").Locator;
        upcomingEvents: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        dropZone: import("playwright-core").Locator;
        dragHandle: import("playwright-core").Locator;
        calendarLoading: import("playwright-core").Locator;
    };
    /**
     * Navigate to Calendar page
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
     * Switch to month view
     */
    switchToMonthView(): Promise<void>;
    /**
     * Switch to week view
     */
    switchToWeekView(): Promise<void>;
    /**
     * Switch to day view
     */
    switchToDayView(): Promise<void>;
    /**
     * Switch to agenda view
     */
    switchToAgendaView(): Promise<void>;
    /**
     * Navigate to previous month
     */
    goToPreviousMonth(): Promise<void>;
    /**
     * Navigate to next month
     */
    goToNextMonth(): Promise<void>;
    /**
     * Navigate to today
     */
    goToToday(): Promise<void>;
    /**
     * Search for events
     */
    searchEvents(searchTerm: string): Promise<void>;
    /**
     * Filter events by type
     */
    filterByEventType(eventType: string): Promise<void>;
    /**
     * Filter events by advisor
     */
    filterByAdvisor(advisor: string): Promise<void>;
    /**
     * Create new event
     */
    clickCreateEvent(): Promise<void>;
    /**
     * Fill event form
     */
    fillEventForm(eventData: {
        title: string;
        description?: string;
        eventType: string;
        startDate: string;
        startTime?: string;
        endDate: string;
        endTime?: string;
        allDay?: boolean;
        location?: string;
        attendees?: string;
        reminder?: string;
        repeat?: string;
        priority?: string;
    }): Promise<void>;
    /**
     * Save event
     */
    saveEvent(): Promise<void>;
    /**
     * Cancel event creation/editing
     */
    cancelEvent(): Promise<void>;
    /**
     * Click on a specific date
     */
    clickDate(date: string): Promise<void>;
    /**
     * Click on an event
     */
    clickEvent(eventTitle: string): Promise<void>;
    /**
     * Edit event
     */
    editEvent(eventTitle: string): Promise<void>;
    /**
     * Delete event
     */
    deleteEvent(eventTitle: string): Promise<void>;
    /**
     * Duplicate event
     */
    duplicateEvent(eventTitle: string): Promise<void>;
    /**
     * Get current month and year
     */
    getCurrentMonthYear(): Promise<string>;
    /**
     * Get events count for current view
     */
    getEventsCount(): Promise<number>;
    /**
     * Check if event exists
     */
    eventExists(eventTitle: string): Promise<boolean>;
    /**
     * Drag and drop event to new time slot
     */
    dragEventToTimeSlot(eventTitle: string, targetTimeSlot: string): Promise<void>;
    /**
     * Export calendar
     */
    exportCalendar(): Promise<void>;
    /**
     * Import calendar
     */
    importCalendar(): Promise<void>;
    /**
     * Print calendar
     */
    printCalendar(): Promise<void>;
    /**
     * Refresh calendar
     */
    refreshCalendar(): Promise<void>;
}
//# sourceMappingURL=CalendarPage.d.ts.map