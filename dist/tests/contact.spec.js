"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const TestSetup_1 = require("../core/TestSetup");
const formGenerator_1 = require("../utils/generators/formGenerator");
test_1.test.describe('Contact Form - Valid Submissions', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should submit contact form with all fields', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitContactFormSuccessfully({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
        });
    });
    (0, test_1.test)('should submit contact form with minimal required fields', async () => {
        await setup.contactSteps.submitMinimalForm();
    });
    (0, test_1.test)('should submit form using Enter key', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitWithEnterKey({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
        });
    });
    (0, test_1.test)('should handle special characters in form fields', async () => {
        await setup.contactSteps.testSpecialCharacters();
    });
});
test_1.test.describe('Contact Form - Validation', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should show validation errors for empty required fields', async () => {
        await setup.contactSteps.testEmptyRequiredFields();
    });
    (0, test_1.test)('should validate email format', async () => {
        await setup.contactSteps.testInvalidEmailFormat('invalid-email');
    });
    (0, test_1.test)('should validate email format with missing @', async () => {
        await setup.contactSteps.testInvalidEmailFormat('testexample.com');
    });
    (0, test_1.test)('should validate email format with missing domain', async () => {
        await setup.contactSteps.testInvalidEmailFormat('test@');
    });
    (0, test_1.test)('should show validation error for missing name', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitContactFormWithErrors({
            email: formData.email,
            subject: formData.subject,
            message: formData.message
            // name intentionally omitted
        });
    });
    (0, test_1.test)('should show validation error for missing email', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitContactFormWithErrors({
            name: formData.name,
            subject: formData.subject,
            message: formData.message
            // email intentionally omitted
        });
    });
    (0, test_1.test)('should show validation error for missing message', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitContactFormWithErrors({
            name: formData.name,
            email: formData.email,
            subject: formData.subject
            // message intentionally omitted
        });
    });
});
test_1.test.describe('Contact Form - Functionality', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should reset form when reset button is clicked', async () => {
        await setup.contactSteps.testFormReset();
    });
    (0, test_1.test)('should clear form programmatically', async () => {
        await setup.contactSteps.clearContactForm();
    });
    (0, test_1.test)('should handle maximum length inputs', async () => {
        await setup.contactSteps.testMaxLengthInputs();
    });
    (0, test_1.test)('should test field character limits', async () => {
        await setup.contactSteps.testFieldCharacterLimits();
    });
    (0, test_1.test)('should get current form state', async () => {
        await setup.contactSteps.navigateToContact();
        const formState = await setup.contactSteps.getFormState();
        (0, test_1.expect)(formState.values.name).toBe('');
        (0, test_1.expect)(formState.values.email).toBe('');
        (0, test_1.expect)(formState.values.subject).toBe('');
        (0, test_1.expect)(formState.values.message).toBe('');
        (0, test_1.expect)(formState.submitButtonEnabled).toBe(true);
    });
});
test_1.test.describe('Contact Form - Accessibility', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should verify form accessibility', async () => {
        await setup.contactSteps.verifyFormAccessibility();
    });
    (0, test_1.test)('should support keyboard navigation', async () => {
        await setup.contactSteps.testKeyboardNavigation();
    });
    (0, test_1.test)('should test privacy policy checkbox if present', async () => {
        await setup.contactSteps.testPrivacyPolicyCheckbox();
    });
});
test_1.test.describe('Contact Form - Edge Cases', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should handle very long email addresses', async () => {
        const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com';
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.submitContactFormSuccessfully({
            name: formData.name,
            email: longEmail,
            subject: formData.subject,
            message: formData.message
        });
    });
    (0, test_1.test)('should handle international characters', async () => {
        await setup.contactSteps.submitContactFormSuccessfully({
            name: 'José María García-López',
            email: 'josé@exämple.com',
            subject: 'Tëst Sübject with Ümlauts',
            message: 'Message with international characters: café, naïve, résumé, piñata'
        });
    });
    (0, test_1.test)('should handle very long message', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        const longMessage = 'This is a very long message. '.repeat(100);
        await setup.contactSteps.submitContactFormSuccessfully({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: longMessage
        });
    });
    (0, test_1.test)('should handle HTML in form fields', async () => {
        await setup.contactSteps.submitContactFormSuccessfully({
            name: 'Test <b>User</b>',
            email: 'test@example.com',
            subject: 'Subject with <script>alert("xss")</script>',
            message: 'Message with <div>HTML tags</div> and <a href="#">links</a>'
        });
    });
    (0, test_1.test)('should handle multiple form submissions', async () => {
        const formData1 = (0, formGenerator_1.generateForm)();
        const formData2 = (0, formGenerator_1.generateForm)();
        // Submit first form
        await setup.contactSteps.submitContactFormSuccessfully({
            name: formData1.name,
            email: formData1.email,
            subject: formData1.subject,
            message: formData1.message
        });
        // Navigate back and submit second form
        await setup.contactSteps.navigateToContact();
        await setup.contactSteps.submitContactFormSuccessfully({
            name: formData2.name,
            email: formData2.email,
            subject: formData2.subject,
            message: formData2.message
        });
    });
    (0, test_1.test)('should handle rapid form submissions', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.navigateToContact();
        await setup.contactSteps.fillContactForm({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        });
        // Try to submit multiple times rapidly
        await setup.contactSteps.submitForm();
        await setup.page.waitForTimeout(100);
        await setup.contactSteps.submitForm();
        // Should still show success or handle gracefully
        await setup.contactSteps.verifySubmissionSuccess();
    });
});
test_1.test.describe('Contact Form - Performance', () => {
    let setup;
    test_1.test.beforeEach(async ({ browser }) => {
        setup = await (0, TestSetup_1.contactSetup)(browser);
    });
    test_1.test.afterEach(async () => {
        await (0, TestSetup_1.sharedTeardown)(setup);
    });
    (0, test_1.test)('should load contact page quickly', async () => {
        const startTime = Date.now();
        await setup.contactSteps.navigateToContact();
        const endTime = Date.now();
        const loadTime = endTime - startTime;
        (0, test_1.expect)(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });
    (0, test_1.test)('should submit form within acceptable time', async () => {
        const formData = (0, formGenerator_1.generateForm)();
        await setup.contactSteps.navigateToContact();
        await setup.contactSteps.fillContactForm({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
        });
        const startTime = Date.now();
        await setup.contactSteps.submitForm();
        await setup.contactSteps.verifySubmissionSuccess();
        const endTime = Date.now();
        const submitTime = endTime - startTime;
        (0, test_1.expect)(submitTime).toBeLessThan(10000); // Should submit within 10 seconds
    });
});
