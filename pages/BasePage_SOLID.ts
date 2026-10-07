// ============================================================================

// ============================================================================
import{Page, Locator} from '@playwright/test';

export abstract class BasePage_SOLID
{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page; //store this.page
    }

    async click(locator: Locator): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.click();
    }

    async navigate(url: string): Promise<void>
    {
        await this.page.goto(url, {waitUntil: 'load'});
    }

    async fill(locator: Locator, value: string): Promise<void>
    {
        await locator.waitFor({state: 'visible'});
        await locator.fill(value);
    }

    abstract isLoaded(): Promise<void>;


    //scrolling option 1 
    async scrollToElement(locator : Locator): Promise<void>
    {
        await this.page.mouse.wheel(0, 1500);
        await this.page.waitForTimeout(1000);
    }

    //directly scroll until an element is visible - option 2 (recommended)

    async scrollDirectlyToElement(locator:Locator):Promise<void>
    {
        await locator.scrollIntoViewIfNeeded();
    }

    // option 3 - scroll using javascript 

    async scrollUsingJavascript():Promise<void>
    {
        await this.page.evaluate(() =>window.scrollBy(0, 1500));

    }
}
