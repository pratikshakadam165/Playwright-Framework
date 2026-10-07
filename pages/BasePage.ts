import{Page, Locator, expect} from '@playwright/test';

export abstract class BasePage
{
    readonly page: Page;  //readonly is defined as it will not remodify the value 

    constructor(page: Page)
    {
        this.page = page;//assigning value of page to page parameter. //this will call current instance of the object
    }
    async click(locator: Locator) : Promise<void>
    {
        await locator.waitFor({state: 'visible' });  //here in this method we will wait for locator to be visible & then perform next step which is click 
        await locator.click();
    }
    async navigate(url : string) : Promise<void>
    {
        await this.page.goto(url, {waitUntil: 'load'}); //this method for navigating to URL 
    }
    async fill(locator: Locator, value: string): Promise<void>
    {
        await locator.waitFor({state: 'visible'});  //here we have defined method to fill values 
        await locator.fill(value);
    }

    abstract isLoaded(): Promise<void> //every class extending basepage class can implement its own implementation here thats why isLoaded is abstract here 

}
