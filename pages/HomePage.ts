import {Page, Locator, expect} from'@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export class HomePage extends BasePage_SOLID
{

    readonly kitchenAppliances : Locator 

    constructor(page: Page)
    {
        super(page)
        this.kitchenAppliances = page.getByRole('link', {name: /Kitchen Appliances/});
    }

    async goto():Promise<void>
    {
        await this.navigate("https://www.kapruka.com/online/electronics/price/kitchen_appliances");
    }

    async isLoaded(): Promise<void>
    {
        await expect (this.kitchenAppliances).toBeVisible();
    }

    async hoverKitchenAppliances():Promise<void>
    {
        await this.kitchenAppliances.hover();

    }

    async getKitchenAppliancesTooltip() :Promise<string | null>
    {
        return await this.kitchenAppliances.getAttribute('title');
    }

    async verifyKitchenAppliancesTooltip(): Promise<void>
    {
        await expect(this.kitchenAppliances).toHaveAttribute('title', 'Shop For Kitchen Appliances b(1244)b');

    }







}