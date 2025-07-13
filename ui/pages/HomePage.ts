//ui/pages/HomePage.ts
import { BasePage } from "../base/BasePage";
import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly primaryButton = this.page.locator('button.btn.btn-primary');
    private readonly roomCards = this.page.locator('.room-card');
    private readonly sectionTitle = this.page.getByRole('heading', { level: 2 });

    private getRoomTitle = (card: Locator) => card.getByRole('heading', { level: 5 });
    private getBookNowButton = (card: Locator) => card.getByRole('link', { name: 'Book Now' });
    private getRoomPrice = (card: Locator) => card.locator('.fw-bold.fs-5');
    private getRoomDetailPrice = () => this.page.locator('span.fs-2.fw-bold.text-primary');
    private getCardFeatureBadgesLocator = (card: Locator) => card.locator('.badge');



    public getPrimaryButton(): Locator {
        return this.primaryButton;
    }

    public getRoomCards(): Locator {
        return this.roomCards;
    }

    public getSectionHeading(title: string): Locator {
        return this.sectionTitle.filter({ hasText: title });
    }


    public getCardTitle(card: Locator): Locator {
        return this.getRoomTitle(card);
    }

    public getCardPrice(card: Locator): Locator {
        return this.getRoomPrice(card);
    }

    public getCardActionButton(card: Locator): Locator {
        return this.getBookNowButton(card);
    }

    public getCardDescriptionSelector(): string {
        return '.card-text';
    }

    public getCardFeatureBadges(card: Locator): Locator {
        return this.getCardFeatureBadgesLocator(card);
    }

    public getDetailPriceElement(): Locator {
        return this.getRoomDetailPrice();
    }

}
