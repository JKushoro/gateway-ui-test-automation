import { test, expect, type Page } from '@playwright/test';
import { sharedSetup, sharedTeardown, TestSetup } from '../../utils/testSetupHelper';
import { beforeEachHook, afterEachHook } from '../hooks/global/globalHooks';

test.describe('Login - Valid and Invalid Scenarios', () => {
    let setup: TestSetup;
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        setup = await sharedSetup(browser);
        page = setup.page;
        await beforeEachHook(page);

        await setup.controlPanelSteps.clickMainSiteNavLinkByText('Admin');
    });

    test.afterEach(async () => {
        await afterEachHook(page);
        await sharedTeardown(page);
    });

    test('should display the Login screen successfully', async () =>
        await setup.loginSteps.assertSectionTitle('Login')
    );

    test('should show error when submitting empty login form', async () =>
        await setup.loginSteps.loginAndExpectInvalid()
    );

    test('should login successfully with valid credentials', async () =>
        await setup.loginSteps.loginSuccessfully(process.env.USER_NAME!, process.env.PASSWORD!)
    );

    test('should show error for empty username and password', async () =>
        await setup.loginSteps.loginAndExpectInvalid('', '')
    );

    test('should show error for invalid username and password', async () =>
        await setup.loginSteps.loginAndExpectInvalid('invalid', 'invalid')
    );

    test('should show error for empty username and valid password', async () =>
        await setup.loginSteps.loginAndExpectInvalid('', process.env.PASSWORD!)
    );

    test('should show error for valid username and empty password', async () =>
        await setup.loginSteps.loginAndExpectInvalid(process.env.USER_NAME!, '')
    );

    test('should show error for valid username and invalid password', async () =>
        await setup.loginSteps.loginAndExpectInvalid(process.env.USER_NAME!, 'wrongPassword')
    );

    test('should show error for invalid username and valid password', async () =>
        await setup.loginSteps.loginAndExpectInvalid('wrongUsername', process.env.PASSWORD!)
    );

    test('should trim whitespace and show error for whitespace-padded valid credentials', async () =>
        await setup.loginSteps.loginAndExpectInvalid(
            ` ${process.env.USER_NAME!} `,
            ` ${process.env.PASSWORD!} `
        )
    );

    test('should show error for SQL injection attempt', async () =>
        await setup.loginSteps.loginAndExpectInvalid(`' OR 1=1 --`, 'anyPassword')
    );

    test('should show error for long random input', async () =>
        await setup.loginSteps.loginAndExpectInvalid('a'.repeat(256), 'b'.repeat(256))
    );

});
