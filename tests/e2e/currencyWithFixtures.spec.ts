import {test, expect} from '../../fixtures/pageFixtures';

test.describe('kapruka currency dropdown', ()=>
{
    test('switch from USD to INR', async ({currencyPage})=>
    {
        await currencyPage.selectCurrency('USD');
        await currencyPage.verifyCurrency('USD');

        await currencyPage.selectCurrency('INR');
        await currencyPage.verifyCurrency('INR');




    
    
    
    
    })







})
