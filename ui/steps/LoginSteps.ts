//src/steps/LoginSteps.ts
import {expect, Page} from "@playwright/test";
import {ActionHelper} from "../helpers/ActionHelper";
import {WaitHelper} from "../helpers/WaitHelper";
import {LoginPage} from "../pages/LoginPage";
import {HomeSteps} from "./HomeSteps";

export class LoginSteps {
    private actionHelper: ActionHelper;
    private waitHelper: WaitHelper;
    private homeSteps: HomeSteps;
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.waitHelper = new WaitHelper(page);
        this.actionHelper = new ActionHelper(page);
        this.homeSteps = new HomeSteps(page);
        this.loginPage = new LoginPage(page);
    }

    public async login(username?: string, password?: string): Promise<void> {
        const originalUrl = this.loginPage.getPage().url();

        if (username !== undefined) {
            await this.actionHelper.fillInputByLabel('Username', username);
        }

        if (password !== undefined) {
            await this.actionHelper.fillInputByLabel('Password', password);
        }

        await this.homeSteps.clickPrimaryButton('Login');


        if (username && password && username === process.env.USER_NAME && password === process.env.PASSWORD) {
            await this.waitHelper.waitForUrlToChangeFrom(originalUrl);
        }
    }

    public async assertInvalidLoginMessage(): Promise<void> {
        const alert = this.loginPage.loginErrorMessageAlert;
        await expect(alert).toBeVisible();
        const message = await alert.textContent();
        expect(message).toContain('Invalid credentials');
    }

    public async loginWithEnvCredentials(): Promise<void> {
        await this.actionHelper.fillInputByLabel('Username', process.env.USER_NAME!);
        await this.actionHelper.fillInputByLabel('Password', process.env.PASSWORD!);
        await this.homeSteps.clickPrimaryButton('Login');
    }

    public async loginSuccessfully(username: string, password: string): Promise<void> {
        const originalUrl = this.loginPage.getPage().url();
        await this.login(username, password);
        await this.waitHelper.waitForUrlToChangeFrom(originalUrl);
    }


    public async loginAndExpectInvalid(username = '', password = ''): Promise<void> {
        await this.login(username, password);
        await this.assertInvalidLoginMessage();
    }

    public async assertSectionTitle(expectedTitle: string): Promise<void> {
        const title = await this.homeSteps.getSectionTitleElement(expectedTitle);
        await expect(title).toBeVisible();
        await expect(title).toHaveText(expectedTitle);
    }

}


