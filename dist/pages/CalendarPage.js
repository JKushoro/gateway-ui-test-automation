"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarPage = void 0;
const BasePage_1 = require("../core/BasePage");
/**
 * CalendarPage - Page Object Model for Calendar functionality
 * Contains all locators and interactions for calendar management
 */
class CalendarPage extends BasePage_1.BasePage {
    constructor(page) {
        super(page);
    }
    // Locators
    get locators() {
        return {
            // Page header
            pageTitle: this.locatorHelper.getByText('Calendar'),
            breadcrumb: this.locatorHelper.getByTestId('breadcrumb') ||
                this.locatorHelper.getLocator('.breadcrumb'),
            // Calendar navigation
            calendarHeader: this.locatorHelper.getByTestId('calendar-header') ||
                this.locatorHelper.getLocator('.calendar-header'),
            currentMonthYear: this.locatorHelper.getByTestId('current-month-year'),
            previousMonthButton: this.locatorHelper.getButtonByText('Previous') ||
                this.locatorHelper.getByTestId('prev-month-btn'),
            nextMonthButton: this.locatorHelper.getButtonByText('Next') ||
                this.locatorHelper.getByTestId('next-month-btn'),
            todayButton: this.locatorHelper.getButtonByText('Today') ||
                this.locatorHelper.getByTestId('today-btn'),
            // View toggles
            monthViewButton: this.locatorHelper.getButtonByText('Month') ||
                this.locatorHelper.getByTestId('month-view-btn'),
            weekViewButton: this.locatorHelper.getButtonByText('Week') ||
                this.locatorHelper.getByTestId('week-view-btn'),
            dayViewButton: this.locatorHelper.getButtonByText('Day') ||
                this.locatorHelper.getByTestId('day-view-btn'),
            agendaViewButton: this.locatorHelper.getButtonByText('Agenda') ||
                this.locatorHelper.getByTestId('agenda-view-btn'),
            // Calendar container
            calendarContainer: this.locatorHelper.getByTestId('calendar-container') ||
                this.locatorHelper.getLocator('.calendar'),
            calendarGrid: this.locatorHelper.getByTestId('calendar-grid') ||
                this.locatorHelper.getLocator('.calendar-grid'),
            // Calendar elements
            calendarDays: this.locatorHelper.getLocator('.calendar-day'),
            calendarWeeks: this.locatorHelper.getLocator('.calendar-week'),
            calendarEvents: this.locatorHelper.getLocator('.calendar-event'),
            timeSlots: this.locatorHelper.getLocator('.time-slot'),
            // Event elements
            eventTitle: this.locatorHelper.getLocator('.event-title'),
            eventTime: this.locatorHelper.getLocator('.event-time'),
            eventDescription: this.locatorHelper.getLocator('.event-description'),
            allDayEvents: this.locatorHelper.getLocator('.all-day-event'),
            // Action buttons
            createEventButton: this.locatorHelper.getButtonByText('Create Event') ||
                this.locatorHelper.getByTestId('create-event-btn'),
            importCalendarButton: this.locatorHelper.getButtonByText('Import') ||
                this.locatorHelper.getByTestId('import-calendar-btn'),
            exportCalendarButton: this.locatorHelper.getButtonByText('Export') ||
                this.locatorHelper.getByTestId('export-calendar-btn'),
            printCalendarButton: this.locatorHelper.getButtonByText('Print') ||
                this.locatorHelper.getByTestId('print-calendar-btn'),
            refreshButton: this.locatorHelper.getButtonByText('Refresh') ||
                this.locatorHelper.getByTestId('refresh-btn'),
            // Filters and search
            searchInput: this.locatorHelper.getInputByPlaceholder('Search events...') ||
                this.locatorHelper.getByTestId('search-input'),
            eventTypeFilter: this.locatorHelper.getByTestId('event-type-filter'),
            advisorFilter: this.locatorHelper.getByTestId('advisor-filter'),
            clientFilter: this.locatorHelper.getByTestId('client-filter'),
            statusFilter: this.locatorHelper.getByTestId('status-filter'),
            // Calendar legends
            calendarLegend: this.locatorHelper.getByTestId('calendar-legend') ||
                this.locatorHelper.getLocator('.calendar-legend'),
            appointmentLegend: this.locatorHelper.getByText('Appointments'),
            meetingLegend: this.locatorHelper.getByText('Meetings'),
            deadlineLegend: this.locatorHelper.getByText('Deadlines'),
            holidayLegend: this.locatorHelper.getByText('Holidays'),
            // Event modal/form
            eventModal: this.locatorHelper.getByTestId('event-modal') ||
                this.locatorHelper.getLocator('.modal'),
            modalTitle: this.locatorHelper.getByTestId('modal-title'),
            eventTitleInput: this.locatorHelper.getInputByLabel('Event Title'),
            eventDescriptionTextarea: this.locatorHelper.getInputByLabel('Description'),
            eventTypeSelect: this.locatorHelper.getInputByLabel('Event Type'),
            startDateInput: this.locatorHelper.getInputByLabel('Start Date'),
            startTimeInput: this.locatorHelper.getInputByLabel('Start Time'),
            endDateInput: this.locatorHelper.getInputByLabel('End Date'),
            endTimeInput: this.locatorHelper.getInputByLabel('End Time'),
            allDayCheckbox: this.locatorHelper.getInputByLabel('All Day'),
            locationInput: this.locatorHelper.getInputByLabel('Location'),
            attendeesInput: this.locatorHelper.getInputByLabel('Attendees'),
            reminderSelect: this.locatorHelper.getInputByLabel('Reminder'),
            repeatSelect: this.locatorHelper.getInputByLabel('Repeat'),
            prioritySelect: this.locatorHelper.getInputByLabel('Priority'),
            // Event actions
            viewEventButton: this.locatorHelper.getButtonByText('View'),
            editEventButton: this.locatorHelper.getButtonByText('Edit'),
            deleteEventButton: this.locatorHelper.getButtonByText('Delete'),
            duplicateEventButton: this.locatorHelper.getButtonByText('Duplicate'),
            // Recurring event options
            recurringOptions: this.locatorHelper.getByTestId('recurring-options'),
            dailyOption: this.locatorHelper.getByText('Daily'),
            weeklyOption: this.locatorHelper.getByText('Weekly'),
            monthlyOption: this.locatorHelper.getByText('Monthly'),
            yearlyOption: this.locatorHelper.getByText('Yearly'),
            customOption: this.locatorHelper.getByText('Custom'),
            // Time picker
            timePicker: this.locatorHelper.getByTestId('time-picker') ||
                this.locatorHelper.getLocator('.time-picker'),
            hourSelect: this.locatorHelper.getByTestId('hour-select'),
            minuteSelect: this.locatorHelper.getByTestId('minute-select'),
            amPmSelect: this.locatorHelper.getByTestId('ampm-select'),
            // Date picker
            datePicker: this.locatorHelper.getByTestId('date-picker') ||
                this.locatorHelper.getLocator('.date-picker'),
            datePickerCalendar: this.locatorHelper.getLocator('.date-picker-calendar'),
            // Sidebar/Mini calendar
            miniCalendar: this.locatorHelper.getByTestId('mini-calendar') ||
                this.locatorHelper.getLocator('.mini-calendar'),
            upcomingEvents: this.locatorHelper.getByTestId('upcoming-events') ||
                this.locatorHelper.getLocator('.upcoming-events'),
            // Common form buttons
            saveButton: this.locatorHelper.getButtonByText('Save'),
            cancelButton: this.locatorHelper.getButtonByText('Cancel'),
            closeModalButton: this.locatorHelper.getByTestId('close-modal') ||
                this.locatorHelper.getLocator('.close, .btn-close'),
            // Drag and drop indicators
            dropZone: this.locatorHelper.getByTestId('drop-zone') ||
                this.locatorHelper.getLocator('.drop-zone'),
            dragHandle: this.locatorHelper.getByTestId('drag-handle') ||
                this.locatorHelper.getLocator('.drag-handle'),
            // Loading states
            calendarLoading: this.locatorHelper.getByTestId('calendar-loading') ||
                this.locatorHelper.getLocator('.calendar-loading'),
        };
    }
    /**
     * Navigate to Calendar page
     */
    async navigate() {
        await this.navigateToPath('/calendar');
    }
    /**
     * Wait for page to load
     */
    async waitForPageLoad() {
        await this.waitHelper.waitForElement(this.locators.pageTitle);
        await this.waitHelper.waitForElement(this.locators.calendarContainer);
        await this.waitHelper.waitForElementToBeHidden(this.locators.calendarLoading);
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
     * Switch to month view
     */
    async switchToMonthView() {
        await this.actionHelper.clickLocator(this.locators.monthViewButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Switch to week view
     */
    async switchToWeekView() {
        await this.actionHelper.clickLocator(this.locators.weekViewButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Switch to day view
     */
    async switchToDayView() {
        await this.actionHelper.clickLocator(this.locators.dayViewButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Switch to agenda view
     */
    async switchToAgendaView() {
        await this.actionHelper.clickLocator(this.locators.agendaViewButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Navigate to previous month
     */
    async goToPreviousMonth() {
        await this.actionHelper.clickLocator(this.locators.previousMonthButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Navigate to next month
     */
    async goToNextMonth() {
        await this.actionHelper.clickLocator(this.locators.nextMonthButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Navigate to today
     */
    async goToToday() {
        await this.actionHelper.clickLocator(this.locators.todayButton);
        await this.waitForLoadingToComplete();
    }
    /**
     * Search for events
     */
    async searchEvents(searchTerm) {
        await this.actionHelper.fillInputByPlaceholder('Search events...', searchTerm);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Filter events by type
     */
    async filterByEventType(eventType) {
        await this.actionHelper.clickLocator(this.locators.eventTypeFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.eventTypeFilter.toString(), eventType);
    }
    /**
     * Filter events by advisor
     */
    async filterByAdvisor(advisor) {
        await this.actionHelper.clickLocator(this.locators.advisorFilter);
        await this.actionHelper.selectCustomDropdown(this.locators.advisorFilter.toString(), advisor);
    }
    /**
     * Create new event
     */
    async clickCreateEvent() {
        await this.actionHelper.clickLocator(this.locators.createEventButton);
        await this.waitHelper.waitForElement(this.locators.eventModal);
    }
    /**
     * Fill event form
     */
    async fillEventForm(eventData) {
        await this.actionHelper.fillInputByLabel('Event Title', eventData.title);
        if (eventData.description) {
            await this.actionHelper.fillInputByLabel('Description', eventData.description);
        }
        await this.actionHelper.selectCustomDropdown(this.locators.eventTypeSelect.toString(), eventData.eventType);
        await this.actionHelper.fillInputByLabel('Start Date', eventData.startDate);
        await this.actionHelper.fillInputByLabel('End Date', eventData.endDate);
        if (eventData.allDay) {
            await this.actionHelper.checkCheckbox(this.locators.allDayCheckbox.toString());
        }
        else {
            if (eventData.startTime) {
                await this.actionHelper.fillInputByLabel('Start Time', eventData.startTime);
            }
            if (eventData.endTime) {
                await this.actionHelper.fillInputByLabel('End Time', eventData.endTime);
            }
        }
        if (eventData.location) {
            await this.actionHelper.fillInputByLabel('Location', eventData.location);
        }
        if (eventData.attendees) {
            await this.actionHelper.fillInputByLabel('Attendees', eventData.attendees);
        }
        if (eventData.reminder) {
            await this.actionHelper.selectCustomDropdown(this.locators.reminderSelect.toString(), eventData.reminder);
        }
        if (eventData.repeat) {
            await this.actionHelper.selectCustomDropdown(this.locators.repeatSelect.toString(), eventData.repeat);
        }
        if (eventData.priority) {
            await this.actionHelper.selectCustomDropdown(this.locators.prioritySelect.toString(), eventData.priority);
        }
    }
    /**
     * Save event
     */
    async saveEvent() {
        await this.actionHelper.clickLocator(this.locators.saveButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.eventModal);
    }
    /**
     * Cancel event creation/editing
     */
    async cancelEvent() {
        await this.actionHelper.clickLocator(this.locators.cancelButton);
        await this.waitHelper.waitForElementToBeHidden(this.locators.eventModal);
    }
    /**
     * Click on a specific date
     */
    async clickDate(date) {
        const dateElement = this.locatorHelper.getByText(date);
        await this.actionHelper.clickLocator(dateElement);
    }
    /**
     * Click on an event
     */
    async clickEvent(eventTitle) {
        const eventElement = this.locatorHelper.getContainingText('.calendar-event', eventTitle);
        await this.actionHelper.clickLocator(eventElement);
    }
    /**
     * Edit event
     */
    async editEvent(eventTitle) {
        await this.clickEvent(eventTitle);
        await this.actionHelper.clickLocator(this.locators.editEventButton);
        await this.waitHelper.waitForElement(this.locators.eventModal);
    }
    /**
     * Delete event
     */
    async deleteEvent(eventTitle) {
        await this.clickEvent(eventTitle);
        await this.actionHelper.clickLocator(this.locators.deleteEventButton);
    }
    /**
     * Duplicate event
     */
    async duplicateEvent(eventTitle) {
        await this.clickEvent(eventTitle);
        await this.actionHelper.clickLocator(this.locators.duplicateEventButton);
        await this.waitHelper.waitForElement(this.locators.eventModal);
    }
    /**
     * Get current month and year
     */
    async getCurrentMonthYear() {
        return await this.actionHelper.getTrimmedText(this.locators.currentMonthYear);
    }
    /**
     * Get events count for current view
     */
    async getEventsCount() {
        return await this.actionHelper.getElementCount('.calendar-event');
    }
    /**
     * Check if event exists
     */
    async eventExists(eventTitle) {
        const eventElement = this.locatorHelper.getContainingText('.calendar-event', eventTitle);
        return await this.actionHelper.isVisible(eventElement.toString());
    }
    /**
     * Drag and drop event to new time slot
     */
    async dragEventToTimeSlot(eventTitle, targetTimeSlot) {
        const eventElement = this.locatorHelper.getContainingText('.calendar-event', eventTitle);
        const targetSlot = this.locatorHelper.getContainingText('.time-slot', targetTimeSlot);
        await this.actionHelper.dragAndDrop(eventElement.toString(), targetSlot.toString());
    }
    /**
     * Export calendar
     */
    async exportCalendar() {
        await this.actionHelper.clickLocator(this.locators.exportCalendarButton);
    }
    /**
     * Import calendar
     */
    async importCalendar() {
        await this.actionHelper.clickLocator(this.locators.importCalendarButton);
    }
    /**
     * Print calendar
     */
    async printCalendar() {
        await this.actionHelper.clickLocator(this.locators.printCalendarButton);
    }
    /**
     * Refresh calendar
     */
    async refreshCalendar() {
        await this.actionHelper.clickLocator(this.locators.refreshButton);
        await this.waitForLoadingToComplete();
    }
}
exports.CalendarPage = CalendarPage;
//# sourceMappingURL=CalendarPage.js.map