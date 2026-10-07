import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';

test.describe('Kapruka Login Test', () => //describe is used to define multiple test cases in one script 
{
    test('Valid user should login successfully', async({page})=> //test cases defined here  
    //async - it is asynchronus in nature bcoz broweser will take its own time to perform actions 
    //page is a fixture which will pull page property & launch a page
    {
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await loginpage.login(process.env.TEST_EMAIL || 'pratikshakadam165@gmail.com',process.env.TEST_PASSWORD || 'Pratiksha-0928*');
        await loginpage.verifyLoginSuccess();

    })

});