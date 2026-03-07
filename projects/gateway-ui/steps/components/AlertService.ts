import { Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { AlertServiceLocator } from '@components/AlertServiceLocator';

export class AlertService extends BasePage {
  private readonly alert: AlertServiceLocator;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.alert = new AlertServiceLocator(page);
  }

  /**
   * Waits for a visible alert, optionally asserts title/message,
   * clicks the button by exact text, then waits for dismissal.
   */
  public async handleAlertByButton(
    buttonText: string,
    expectedTitle?: string,
    expectedMessage?: string
  ): Promise<void> {
    const container = this.alert.container;

    // Wait for alert container
    await this.wait.waitForElement(container);

    // Optional assertions
    if (expectedTitle) {
      await this.assert.assertElementHasText(this.alert.alertTitle, expectedTitle);
    }

    if (expectedMessage) {
      await this.assert.assertElementContainsText(this.alert.alertMessage, expectedMessage);
    }

    // Click and wait for dismissal
    await this.action.clickButtonByTextIn(buttonText, container);
    await this.wait.waitForLocatorToBeHidden(container);
  }

  /** Convenience: “Client Created” */
  public async handleClientCreationSuccessAlert(buttonText: string): Promise<void> {
    await this.handleAlertByButton(
      buttonText,
      'Client Created',
      'The client record was created successfully'
    );
  }

  /** Convenience: “Enable client for new fact find?” */
  public async handleEnableClientForNewFactFind(buttonText: string): Promise<void> {
    await this.handleAlertByButton(
      buttonText,
      'Enable client for new fact find?',
      'Are you sure you want to enable this client for the new fact find?'
    );
  }
}