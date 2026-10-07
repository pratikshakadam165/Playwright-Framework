import {test, expect} from '@playwright/test';
import { ScrollPage } from '../../pages/ScrollPage';

test.describe('Kapruka Scroll to event screen', ()=>
{
    test('Scroll to Popular search today', async({page}) =>

    {
        const scrollpage = new ScrollPage(page);
        await scrollpage.goto();
        await scrollpage.scrollToBestSellingGifts();

        //after scrolling take screenshot
        await page.screenshot({path: 'dist/afterscroll.png'});

        await page.screenshot({path: 'dist/02-full.png', fullPage: true});




    })




})