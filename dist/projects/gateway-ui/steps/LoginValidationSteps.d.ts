import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
/**
 * LoginValidationSteps - LOGIN TESTS / VALIDATIONS ONLY
 * - Negative tests
 * - Security payload tests
 * - Focus / back button behaviour
 *
 * Uses LoginSteps as the engine.
 */
export declare class LoginValidationSteps extends BasePage {
    private readonly login;
    private readonly loginPage;
    private readonly envManager;
    constructor(page: Page, config?: Partial<FrameworkConfig>);
    /**
     * Navigate + open Microsoft login page.
     */
    private openMicrosoftLogin;
    /**
     * Submit username step (optionally blank).
     */
    private submitUsername;
    /**
     * Submit password step (optionally blank).
     */
    private submitPassword;
    /**
     * Verify Microsoft error text.
     */
    private expectErrorText;
    /**
     * Get advisor email from env (uses ADVISOR_EMAIL only).
     */
    private getAdvisorEmailOrThrow;
    verifyLoginButtonPresent(): Promise<void>;
    verifyRedirectToMicrosoftLogin(): Promise<void>;
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
    verifyLoginFormFocus(): Promise<void>;
    verifyBrowserBackButton(): Promise<void>;
}
//# sourceMappingURL=LoginValidationSteps.d.ts.map