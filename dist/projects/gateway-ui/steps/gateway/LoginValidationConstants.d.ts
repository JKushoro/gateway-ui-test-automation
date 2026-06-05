/**
 * Constants for login validation error messages and test data
 */
export declare const LOGIN_ERROR_MESSAGES: {
    readonly INVALID_USERNAME: "This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.";
    readonly INVALID_PASSWORD: "Your account or password is incorrect. If you don't remember your password, reset it now.";
    readonly EMPTY_USERNAME: "Enter a valid email address, phone number, or Skype name.";
    readonly EMPTY_PASSWORD: "Please enter your password.";
    readonly USERNAME_NOT_FOUND: "We couldn't find an account with that username.";
};
export declare const TEST_DATA: {
    readonly INVALID_USERNAME: "invalid.user@fairstone.co.uk";
    readonly INVALID_PASSWORD: "InvalidPassword123";
    readonly MALFORMED_EMAIL: "invalid-email-format";
    readonly SQL_INJECTION: "admin'; DROP TABLE users; --";
    readonly XSS_PAYLOAD: "<script>alert('XSS')</script>";
    readonly LONG_USERNAME_PREFIX: string;
    readonly SPECIAL_CHARS_USERNAME: "user@#$%^&*()fairstone.co.uk";
    readonly WHITESPACE: "   ";
};
export declare const TIMEOUTS: {
    readonly URL_NAVIGATION: 15000;
    readonly ELEMENT_VISIBILITY: 10000;
    readonly FORM_SUBMISSION: 2000;
};
//# sourceMappingURL=LoginValidationConstants.d.ts.map