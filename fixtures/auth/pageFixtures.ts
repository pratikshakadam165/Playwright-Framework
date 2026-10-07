import { test as base, expect } from '@playwright/test';
import { TablePage } from '../../pages/TablePage';

type PageFixtures = {
    tablePage: TablePage;
};

export const test = base.extend<PageFixtures>({
    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await tablePage.goto();
        await tablePage.isLoaded();
        await use(tablePage);
    },
});

export { expect };
