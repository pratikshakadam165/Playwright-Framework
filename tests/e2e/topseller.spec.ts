import {test, expect} from '@playwright/test';
import {TopSellerPage} from '../../pages/TopSellerPage';

test('Click on Top Seller link', async ({page})=>
{
    const tops = new TopSellerPage(page);
     await tops.goto();
    await tops.isLoaded();
    await tops.click();

}
);
