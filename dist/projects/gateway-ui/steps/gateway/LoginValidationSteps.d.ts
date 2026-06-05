import { Page, BasePage, FrameworkConfig } from '../../shared/SharedImports';
/**
 * LoginValidationSteps - Orchestrates login UI validation scenarios
 *
 * Follows SOLID principles:
 * - Single Responsibility: Orchestrates validation test scenarios only
 * - Open/Closed: Open for extension (new validation scenarios), closed for modification
 * - Dependency Inversion: Depends on abstractions (UI interactions, session management)
 */
export declare class LoginValidationSteps extends BasePage {
    private readonly loginPage;
    private readonly uiInteractions;
    private readonly sessionManager;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Verify login button is present and functional
     */
    verifyLoginButtonPresent(): Promise<void>;
    /**
     * Verify redirect to Microsoft login page
     */
    verifyRedirectToMicrosoftLogin(): Promise<void>;
    /**
     * Verify username field focus and accessibility
     */
    verifyLoginFormFocus(): Promise<void>;
    /**
     * Verify browser back navigation behavior
     */
    verifyBrowserBackButton(): Promise<void>;
    attemptLoginWithInvalidUsername(): Promise<void>;
    attemptLoginWithInvalidPassword(): Promise<void>;
    attemptLoginWithEmptyUsername(): Promise<void>;
    attemptLoginWithEmptyPassword(): Promise<void>;
    attemptLoginWithMalformedEmail(): Promise<void>;
    attemptLoginWithSQLInjection(): Promise<void>;
    attemptLoginWithXSSPayload(): Promise<void>;
    attemptLoginWithLongUsername(): Promise<void>;
    attemptLoginWithSpecialCharacters(): Promise<void>;
    attemptLoginWithWhitespaceUsername(): Promise<void>;
    attemptLoginWithWhitespacePassword(): Promise<void>;
    private prepareForValidation;
    private openMicrosoftLoginForValidation;
}
//# sourceMappingURL=LoginValidationSteps.d.ts.map