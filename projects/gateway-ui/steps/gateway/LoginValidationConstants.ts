// projects/gateway-ui/steps/gateway/LoginValidationConstants.ts

/**
 * Constants for login validation error messages and test data
 */
export const LOGIN_ERROR_MESSAGES = {
  INVALID_USERNAME: 'This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.',
  INVALID_PASSWORD: "Your account or password is incorrect. If you don't remember your password, reset it now.",
  EMPTY_USERNAME: 'Enter a valid email address, phone number, or Skype name.',
  EMPTY_PASSWORD: 'Please enter your password.',
  USERNAME_NOT_FOUND: "We couldn't find an account with that username.",
} as const;

export const TEST_DATA = {
  INVALID_USERNAME: 'invalid.user@fairstone.co.uk',
  INVALID_PASSWORD: 'InvalidPassword123',
  MALFORMED_EMAIL: 'invalid-email-format',
  SQL_INJECTION: "admin'; DROP TABLE users; --",
  XSS_PAYLOAD: "<script>alert('XSS')</script>",
  LONG_USERNAME_PREFIX: 'a'.repeat(500),
  SPECIAL_CHARS_USERNAME: 'user@#$%^&*()fairstone.co.uk',
  WHITESPACE: '   ',
} as const;

export const TIMEOUTS = {
  URL_NAVIGATION: 15000,
  ELEMENT_VISIBILITY: 10000,
  FORM_SUBMISSION: 2000,
} as const;