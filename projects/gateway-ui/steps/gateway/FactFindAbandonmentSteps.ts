// projects/gateway-ui/steps/gateway/FactFindAbandonmentSteps.ts
import { expect, Page } from '@playwright/test';
import { BasePage } from '@framework/core/BasePage';
import { FrameworkConfig } from '@framework/types';
import { FactFindPageLocators } from '@pages/gatewayElementLocators/FactFindPageLocators';
import { AlertComponent } from '@pages/componentsLocator/AlertServiceLocator';

/**
 * FactFindAbandonmentSteps - Handles abandoning fact finds and verifying abandonment status
 * CICD Pipeline Ready: Robust error handling and reliable assertions
 */
export class FactFindAbandonmentSteps extends BasePage {
  private readonly factFindLocators: FactFindPageLocators;
  private readonly alertComponent: AlertComponent;

  constructor(page: Page, config?: Partial<FrameworkConfig>) {
    super(page, config);
    this.factFindLocators = new FactFindPageLocators(page, config);
    this.alertComponent = new AlertComponent(page);
  }

  // =============================
  // CORE ACTIONS
  // =============================

  /**
   * Click the abandon button for the first fact find in the history table
   */
  public async clickAbandonButton(): Promise<void> {
    await this.action.clickLocator(this.factFindLocators.abandonButtonFirstRow);
  }

  /**
   * Handle the abandon confirmation popup with comprehensive validation
   */
  public async confirmAbandonInPopup(): Promise<void> {
    // Wait for modal to appear
    await expect(this.alertComponent.abandonFactFindModal).toBeVisible({ timeout: 15000 });
    
    // Verify modal content for reliability
    await expect(this.alertComponent.abandonFactFindTitle).toContainText('Abandon Fact Find');
    await expect(this.alertComponent.abandonFactFindWarning).toBeVisible();
    
    // Confirm abandonment
    await this.action.clickLocator(this.alertComponent.abandonConfirmButton);
    
    // Wait for modal to close
    await expect(this.alertComponent.abandonFactFindModal).not.toBeVisible({ timeout: 15000 });
  }

  /**
   * Complete abandon flow: click abandon button and confirm in popup
   */
  public async abandonFactFind(): Promise<void> {
    await this.clickAbandonButton();
    await this.confirmAbandonInPopup();
  }

  // =============================
  // STATUS VERIFICATION (DRY)
  // =============================

  /**
   * Get the status cell for the first fact find (DRY helper)
   */
  private getStatusCell() {
    return this.factFindLocators.factFindHistoryFirstRowCells.nth(1);
  }

  /**
   * Get the current status of the first fact find
   */
  public async getFactFindStatus(): Promise<string> {
    return await this.getStatusCell().textContent() || '';
  }

  /**
   * Verify fact find status matches expected value (DRY method)
   */
  private async verifyFactFindStatus(expectedStatus: string): Promise<void> {
    // Wait for status refresh after actions
    await this.wait.waitForTimeout(3000);
    
    const statusCell = this.getStatusCell();
    await expect(statusCell).toContainText(expectedStatus, { timeout: 15000 });
  }

  /**
   * Verify that a fact find exists and is in "Open" status
   */
  public async verifyFactFindIsOpen(): Promise<void> {
    await this.verifyFactFindStatus('Open');
  }

  /**
   * Verify that the fact find status shows as "Abandoned"
   */
  public async verifyFactFindIsAbandoned(): Promise<void> {
    await this.verifyFactFindStatus('Abandoned');
  }

  // =============================
  // LAUNCH PREVENTION VERIFICATION
  // =============================

  /**
   * Verify that the Launch Fact Find link is not available
   */
  public async verifyLaunchFactFindNotAvailable(): Promise<void> {
    const launchLink = this.factFindLocators.launchFactFindLinkFirstRow;
    await expect(launchLink).not.toBeVisible();
  }

  // =============================
  // UTILITY METHODS
  // =============================

  /**
   * Wait for the fact find history table to be visible
   */
  public async waitForFactFindHistoryTable(): Promise<void> {
    await expect(this.factFindLocators.factFindHistoryTable).toBeVisible({ timeout: 15000 });
  }

  /**
   * Reload page and wait for content to load (CICD friendly)
   */
  public async reloadPageAndWait(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForFactFindHistoryTable();
  }

  // =============================
  // EXECUTE METHODS (CICD READY)
  // =============================

  /**
   * Execute the complete abandon fact find flow with status verification
   */
  public async executeAbandonFactFind(): Promise<void> {
    await this.verifyFactFindIsOpen();
    await this.abandonFactFind();
    await this.verifyFactFindIsAbandoned();
  }

  /**
   * Execute verification that abandoned fact find cannot be launched
   */
  public async executeVerifyAbandonedFactFindCannotBeLaunched(): Promise<void> {
    await this.verifyLaunchFactFindNotAvailable();
  }

  /**
   * Execute verification that abandonment status is maintained after page reload
   */
  public async executeVerifyAbandonmentStatusMaintained(): Promise<void> {
    await this.reloadPageAndWait();
    await this.verifyFactFindIsAbandoned();
    await this.verifyLaunchFactFindNotAvailable();
  }

  /**
   * Execute comprehensive system response verification for abandoned fact find
   */
  public async executeVerifySystemResponseForAbandonedFactFind(): Promise<void> {
    const status = await this.getFactFindStatus();
    expect(status.toLowerCase()).toContain('abandoned');
    await this.verifyLaunchFactFindNotAvailable();
  }
}