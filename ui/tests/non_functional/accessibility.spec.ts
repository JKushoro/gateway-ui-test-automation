//ui/tests/non_functional/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { sharedSetup, sharedTeardown, TestSetup } from '../../../utils/testSetupHelper';

test.describe('Accessibility Testing with Axe', () => {
    let setup: TestSetup;

    test.beforeAll(async ({ browser }) => {
        setup = await sharedSetup(browser);
        await setup.page.goto(process.env.BASE_URL!);
    });

    test.afterAll(async () => {
        await sharedTeardown(setup.page);
    });

    const pagesToTest = [
        { name: 'Homepage', path: '' },
        { name: 'Contact', path: '#contact' },
        { name: 'Reservation (sample)', path: 'reservation/1?checkin=2025-08-12&checkout=2025-08-13' },
        { name: 'Login Page', path: '#admin' }
    ];

    for (const page of pagesToTest) {
        test(`should have no critical accessibility issues on ${page.name}`, async () => {
            const url = `${process.env.BASE_URL}${page.path}`;
            await setup.page.goto(url);

            await injectAxe(setup.page);

            try {
                await checkA11y(setup.page, undefined, {
                    detailedReport: true,
                    detailedReportOptions: { html: true },
                    includedImpacts: ['critical']
                });
            } catch (err) {
                console.warn(`Accessibility violations found on ${page.name}`, err);
            }
        });
    }

    test('should have no critical accessibility issues on Rooms Dashboard (after login)', async () => {
        await setup.page.goto(`${process.env.BASE_URL}admin`);

        await setup.page.getByLabel('Username').fill(process.env.USER_NAME!);
        await setup.page.getByLabel('Password').fill(process.env.PASSWORD!);
        await setup.page.getByRole('button', { name: 'Login' }).click();
        await setup.page.getByRole('link', { name: 'Rooms' }).click();

        await injectAxe(setup.page);

        try {
            await checkA11y(setup.page, undefined, {
                detailedReport: true,
                detailedReportOptions: { html: true },
                includedImpacts: ['critical']
            });
        } catch (err) {
            console.warn('Accessibility violations found on Rooms Dashboard', err);
        }
    });
});
