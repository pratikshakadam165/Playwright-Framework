import { test as base } from '@playwright/test';
import { CurrencyPage } from '../pages/Currency_Page';
import { ComboPage } from '../pages/ComboPage';
import { TablePage } from '../pages/TablePage';
import { PersonaliseCakePage } from '../pages/PersonaliseCakePage';

// new fixtures will be created in this file

type PageFixtures = {
    currencyPage: CurrencyPage;
    combopage: ComboPage;
    tablepage: TablePage;
    cakepage: PersonaliseCakePage;
};

export const test = base.extend<PageFixtures>({
    currencyPage: async ({ page }, use) => {
        const currencyPage = new CurrencyPage(page);
        await currencyPage.goto();
        await currencyPage.isLoaded();
        await use(currencyPage);
    },
    combopage: async ({ page }, use) => {
        const combopage = new ComboPage(page);
        await combopage.goto();
        await combopage.isLoaded();
        await use(combopage);
    },
    tablepage: async ({ page }, use) => {
        const tablepage = new TablePage(page);
        await tablepage.goto();
        await tablepage.isLoaded();
        await use(tablepage);
    },
    cakepage: async ({ page }, use) => {
        const cakepage = new PersonaliseCakePage(page);
        await cakepage.goto();
        await cakepage.isLoaded();
        await use(cakepage);
    },
});

export { expect } from '@playwright/test';

