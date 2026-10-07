import { Page, Locator } from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export interface ProductInfo {
    name: string;
    price: string;
}

export class ComboPage extends BasePage_SOLID {
    readonly page: Page;
    readonly productName: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.productName = page.locator('.catalogueV2heading');
    }

    async goto(): Promise<void> {
        await this.navigate('https://www.kapruka.com/online/combogifts');
    }

    async isLoaded(): Promise<void> {
        await this.productName.first().waitFor({ state: 'visible', timeout: 20000 });
    }

    async getFirstProductName(): Promise<string> {
        const nameLocator = this.productName.first();
        await nameLocator.waitFor({ state: 'visible', timeout: 20000 });

        const name = await nameLocator.textContent();
        return name?.trim() || '';
    }

    private formatUsdPrice(rawPrice: string): string {
        const cleanPrice = rawPrice.replace(/,/g, '').replace(/[^\d.]/g, '');
        const value = Number.parseFloat(cleanPrice);

        if (Number.isNaN(value)) {
            return rawPrice.trim();
        }

        return `US$${value.toFixed(2)}`;
    }

    async getFirstProductPrice(): Promise<string> {
        const nameLocator = this.productName.first();
        const card = nameLocator.locator('xpath=ancestor::div[contains(@class, "catalogueV2textBlock")]');
        const priceLocator = card.locator('.catalogueV2converted .lTitlePrice').last();

        await priceLocator.waitFor({ state: 'visible', timeout: 20000 });
        const price = await priceLocator.textContent();
        return this.formatUsdPrice(price ?? '');
    }

    async listAllProducts(): Promise<ProductInfo[]> {
        await this.isLoaded();
        const count = await this.productName.count();
        const results: ProductInfo[] = [];

        for (let i = 0; i < count; i++) {
            const nameLocator = this.productName.nth(i);
            const name = (await nameLocator.textContent())?.trim() || '';
            const card = nameLocator.locator('xpath=ancestor::div[contains(@class, "catalogueV2textBlock")]');
            const priceLocator = card.locator('.catalogueV2converted .lTitlePrice').last();

            let price = '';
            if (await priceLocator.count() > 0) {
                price = (await priceLocator.textContent())?.trim() || '';
            }

            results.push({ name, price: this.formatUsdPrice(price) });
        }

        return results;
    }
}
