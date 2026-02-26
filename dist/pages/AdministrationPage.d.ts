import { Page } from '@playwright/test';
import { BasePage } from '../core/BasePage';
/**
 * AdministrationPage - Page Object Model for Administration functionality
 * Contains all locators and interactions for system administration
 */
export declare class AdministrationPage extends BasePage {
    constructor(page: Page);
    get locators(): {
        pageTitle: import("playwright-core").Locator;
        breadcrumb: import("playwright-core").Locator;
        userManagementSection: import("playwright-core").Locator;
        systemSettingsSection: import("playwright-core").Locator;
        securitySection: import("playwright-core").Locator;
        auditLogsSection: import("playwright-core").Locator;
        backupSection: import("playwright-core").Locator;
        usersTab: import("playwright-core").Locator;
        rolesTab: import("playwright-core").Locator;
        permissionsTab: import("playwright-core").Locator;
        searchInput: import("playwright-core").Locator;
        roleFilter: import("playwright-core").Locator;
        statusFilter: import("playwright-core").Locator;
        departmentFilter: import("playwright-core").Locator;
        createUserButton: import("playwright-core").Locator;
        createRoleButton: import("playwright-core").Locator;
        exportButton: import("playwright-core").Locator;
        refreshButton: import("playwright-core").Locator;
        usersTable: import("playwright-core").Locator;
        userTableHeaders: import("playwright-core").Locator;
        userTableRows: import("playwright-core").Locator;
        userIdColumn: import("playwright-core").Locator;
        usernameColumn: import("playwright-core").Locator;
        emailColumn: import("playwright-core").Locator;
        fullNameColumn: import("playwright-core").Locator;
        roleColumn: import("playwright-core").Locator;
        departmentColumn: import("playwright-core").Locator;
        statusColumn: import("playwright-core").Locator;
        lastLoginColumn: import("playwright-core").Locator;
        actionsColumn: import("playwright-core").Locator;
        viewUserButton: import("playwright-core").Locator;
        editUserButton: import("playwright-core").Locator;
        deactivateUserButton: import("playwright-core").Locator;
        resetPasswordButton: import("playwright-core").Locator;
        deleteUserButton: import("playwright-core").Locator;
        activeStatus: import("playwright-core").Locator;
        inactiveStatus: import("playwright-core").Locator;
        suspendedStatus: import("playwright-core").Locator;
        userModal: import("playwright-core").Locator;
        modalTitle: import("playwright-core").Locator;
        usernameInput: import("playwright-core").Locator;
        emailInput: import("playwright-core").Locator;
        firstNameInput: import("playwright-core").Locator;
        lastNameInput: import("playwright-core").Locator;
        passwordInput: import("playwright-core").Locator;
        confirmPasswordInput: import("playwright-core").Locator;
        roleSelect: import("playwright-core").Locator;
        departmentSelect: import("playwright-core").Locator;
        statusSelect: import("playwright-core").Locator;
        generalSettingsTab: import("playwright-core").Locator;
        emailSettingsTab: import("playwright-core").Locator;
        notificationSettingsTab: import("playwright-core").Locator;
        integrationSettingsTab: import("playwright-core").Locator;
        systemNameInput: import("playwright-core").Locator;
        timezoneSelect: import("playwright-core").Locator;
        languageSelect: import("playwright-core").Locator;
        sessionTimeoutInput: import("playwright-core").Locator;
        smtpServerInput: import("playwright-core").Locator;
        smtpPortInput: import("playwright-core").Locator;
        smtpUsernameInput: import("playwright-core").Locator;
        smtpPasswordInput: import("playwright-core").Locator;
        fromEmailInput: import("playwright-core").Locator;
        passwordPolicySection: import("playwright-core").Locator;
        twoFactorAuthSection: import("playwright-core").Locator;
        ipWhitelistSection: import("playwright-core").Locator;
        auditLogsTable: import("playwright-core").Locator;
        logDateFilter: import("playwright-core").Locator;
        logUserFilter: import("playwright-core").Locator;
        logActionFilter: import("playwright-core").Locator;
        saveButton: import("playwright-core").Locator;
        cancelButton: import("playwright-core").Locator;
        closeModalButton: import("playwright-core").Locator;
        pagination: import("playwright-core").Locator;
        previousPageButton: import("playwright-core").Locator;
        nextPageButton: import("playwright-core").Locator;
        pageInfo: import("playwright-core").Locator;
    };
    /**
     * Navigate to Administration page
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
     * Navigate to Users tab
     */
    goToUsersTab(): Promise<void>;
    /**
     * Navigate to Roles tab
     */
    goToRolesTab(): Promise<void>;
    /**
     * Navigate to Permissions tab
     */
    goToPermissionsTab(): Promise<void>;
    /**
     * Search for users
     */
    searchUsers(searchTerm: string): Promise<void>;
    /**
     * Filter users by role
     */
    filterByRole(role: string): Promise<void>;
    /**
     * Filter users by status
     */
    filterByStatus(status: string): Promise<void>;
    /**
     * Create new user
     */
    clickCreateUser(): Promise<void>;
    /**
     * Fill user form
     */
    fillUserForm(userData: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        password?: string;
        role: string;
        department: string;
        status: string;
    }): Promise<void>;
    /**
     * Save user
     */
    saveUser(): Promise<void>;
    /**
     * Cancel user creation/editing
     */
    cancelUser(): Promise<void>;
    /**
     * Edit user
     */
    editUser(username: string): Promise<void>;
    /**
     * Deactivate user
     */
    deactivateUser(username: string): Promise<void>;
    /**
     * Reset user password
     */
    resetUserPassword(username: string): Promise<void>;
    /**
     * Delete user
     */
    deleteUser(username: string): Promise<void>;
    /**
     * Navigate to System Settings
     */
    goToSystemSettings(): Promise<void>;
    /**
     * Navigate to General Settings tab
     */
    goToGeneralSettings(): Promise<void>;
    /**
     * Navigate to Email Settings tab
     */
    goToEmailSettings(): Promise<void>;
    /**
     * Navigate to Audit Logs
     */
    goToAuditLogs(): Promise<void>;
    /**
     * Get user count
     */
    getUserCount(): Promise<number>;
    /**
     * Get user status
     */
    getUserStatus(username: string): Promise<string>;
    /**
     * Export users
     */
    exportUsers(): Promise<void>;
    /**
     * Refresh users list
     */
    refreshUsers(): Promise<void>;
}
//# sourceMappingURL=AdministrationPage.d.ts.map