import {Page, Locator, expect} from '@playwright/test';
import {BasePage_SOLID} from './BasePage_SOLID';

export class TopSellerPage extends BasePage_SOLID{

    readonly topSeller : Locator;
    
    constructor(page:Page)
    {
        super(page);
        this.topSeller = this.page.getByRole('link', {name : 'Top Sellers'})
    }

    async goto(): Promise<void>
    {
        await this.navigate('/');
    }
    async isLoaded():Promise<void>
    {
        await expect (this.topSeller.waitFor({state: 'visible'}));

    }
    async click(): Promise<void>
    {
        await this.click();
    }




    
}