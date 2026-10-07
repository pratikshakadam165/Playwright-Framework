import {test, expect} from '@playwright/test';
import {CurrencyPage} from '../../pages/Currency_Page';

test.describe('kapruka currency dropdown', ()=>
{
    test('switch from USD to INR', async({page})=>
    {
       const currencypage = new CurrencyPage(page);
       await currencypage.goto();
       await currencypage.isLoaded();
       await currencypage.selectCurrency('USD');
       await currencypage.verifyCurrency('USD');

       //to select INR currency 
       await currencypage.selectCurrency('INR');
       await currencypage.verifyCurrency('INR');
    
    }
)
}
);

