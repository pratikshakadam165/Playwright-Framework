import {Page, Locator, expect} from '@playwright/test';
import { BasePage_SOLID } from '../pages/BasePage_SOLID';

export class ScrollPage extends BasePage_SOLID
{
    readonly bestSellingGifts : Locator;

    constructor(page: Page)
    {
        super(page);
        this.bestSellingGifts = page.getByText('Popular Searches Today:', {exact : true});
    }
     async goto(): Promise<void>
     {
        await this.navigate('shops/events_home.jsp');
     }
     async isLoaded(): Promise<void>
     {
        await expect(this.bestSellingGifts).toBeVisible();
     }

     async scrollToBestSellingGifts(): Promise<void> {
         await this.scrollToElement(this.bestSellingGifts);
        //  await this.scrollDirectlyToElement(this.bestSellingGifts);
     }







}

