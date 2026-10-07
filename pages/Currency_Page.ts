import {Page, Locator, expect} from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';
import { promises } from 'node:dns';

export class  CurrencyPage extends BasePage_SOLID {
    readonly currencyDropDown : Locator;

    constructor(page:Page)
    {
        super(page)
        this. currencyDropDown = page.getByRole('combobox', {name :'Select Currency'}) ///locator attribute added here 
    }

    async goto():Promise<void>

    {
        await this.navigate('/');
    }

    async isLoaded(): Promise<void> {
        await expect(this.currencyDropDown.waitFor({state: 'visible'}));
    }

    async selectCurrency(currency: 'INR' | 'USD'): Promise<void>
    {
        await this.currencyDropDown.selectOption({label: currency});
        await this.page.waitForLoadState('load');

    }

    async verifyCurrency(expected: string): Promise<void>
    {
        await expect(this.currencyDropDown).toHaveValue(expected);
    }








}