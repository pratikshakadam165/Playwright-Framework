import { Page, Locator} from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';


export interface productinfo
{
    Name : string;
    Price: string
}

export  class ComboPage extends BasePage_SOLID
{
    readonly page : Page;
    readonly productName: Locator

    constructor(page: Page)
    {
        super(page);
        this.page=page;
        this.productName = page.locator('.catalogueV2heading');
    }

    async goto(): Promise<void>
    {
        this.navigate('https://www.kapruka.com/online/combogifts');
    }

    async isLoaded(): Promise<void>
    {
        await this.productName.first().waitFor({state: 'visible', timeout : 20000});
    }

    async getFirstproductname ():Promise<string>
    {
        const nameLocator = this.productName.first();
        await nameLocator.waitFor({state: 'visible'});

        const name = await nameLocator.textContent();
        return name?.trim() || '';
    }

    async getFirstProductprice():Promise<string>
    {
        const card = await this.productName.first().locator('xpath = ancestor::div[contains(@class, "catalogueV2textBlock")]');
        const priceLocator = card.locator('.1TitlePrice').first();
        await priceLocator.waitFor({state: 'visible', timeout: 20000})
        const price = await priceLocator.textContent();
        return price?.trim() || '';
    }

    async listAllproducts(): Promise<ProductInfo[]>
    {
        await this.isLoaded();
        const count = await this.productName.count();
        const results : ProductInfo[] = [];
        for(let i = 0; i< count; i++)
        {
            const nameLocator = this.productName.nth(i);
            const name = (await nameLocator.textContent())?.trim() || '';
            const card = nameLocator.locator('xpath = ancestor::div[contains(@class, "catalogueV2textBlock")]') ;
            const priceLocator = card.locator('.1TitlePric').first();
            let price = '';
            if(await priceLocator.count()>0)
            {
                price = (await priceLocator.textContent())?.trim() || '';
            }

            results.push({name, price});
            
        }
        return results;


    }









}
