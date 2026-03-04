import { BasePage, FrameworkConfig } from '@/framework/src';
import { Locator, Page } from '@playwright/test';

export class ClientDetailsPageLocators extends BasePage {
  constructor(page: Page, config: Partial<FrameworkConfig> = {}) {
    super(page, config);
  }

  /** Clickable nav link/tab by visible text */
  public getNavLinkByText(linkText: string): Locator {
    // Prefer ARIA-friendly roles (tabs/links/buttons)
    const byRole = this.page
      .getByRole('link', { name: linkText, exact: true })
      .or(this.page.getByRole('tab', { name: linkText, exact: true }))
      .or(this.page.getByRole('button', { name: linkText, exact: true }));

    // Fallback: common nav containers (adjust selectors to your app if needed)
    const fallback = this.page
      .locator('nav, .nav, .nav-tabs, .sidebar, .gateway-bs, .client-file-nav')
      .locator('a, button, [role="tab"]')
      .filter({ hasText: linkText })
      .first();

    return byRole.first().or(fallback);
  }

  /** Layout A: gateway-bs boxes */
  public gatewayBsCell(sectionTitle: string, labelText: string): Locator {
    const section = this.page
      .locator('div.gateway-bs')
      .filter({ has: this.page.locator('.gateway-bs-title', { hasText: sectionTitle }) })
      .first();

    const row = section
      .locator('div.form-group')
      .filter({ has: section.locator('.col-md-5', { hasText: labelText }) })
      .first();

    return row.locator('.col-md-7').first();
  }

  /** Layout B: summary panel (form-group anchor) */
  public summaryPanelCell(sectionTitle: string, labelText: string): Locator {
    const panel = this.page
      .locator('div')
      .filter({ has: this.page.locator('h3,h4,h5', { hasText: sectionTitle }) })
      .first();

    const formGroup = panel
      .locator('div.form-group')
      .filter({ has: panel.locator('.control-label', { hasText: labelText }) })
      .first();

    return formGroup.locator('.col-md-7').first();
  }

  /** Layout B alternative: sibling navigation */
  public summaryPanelCellAlt(sectionTitle: string, labelText: string): Locator {
    const panel = this.page
      .locator('div')
      .filter({ has: this.page.locator('h3,h4,h5', { hasText: sectionTitle }) })
      .first();

    return panel.locator('.col-md-5').filter({ hasText: labelText }).locator('+ .col-md-7').first();
  }
}
