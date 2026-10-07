import test from "node:test";
import {Page, Locator, expect} from '@playwright/test';
import { BasePage} from "./BasePage";

export class LoginPage extends BasePage{
    readonly emailInput : Locator; //variable names for locator 
    readonly passwordInput: Locator; //variable names for locator 
    readonly loginButton: Locator; //variable names for locator 


    constructor (page: Page)
    {
        super(page); //called base page constructor using super keyword 
        this.emailInput = page.locator('input[name="email"]'); //added locator values to variables which wee defined at the start
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[type="submit"]');

    }
    async goto(): Promise<void>
    {
        await this.navigate("https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp");
        //navigate is basepage class method which is used here in login class 
    }

    async isLoaded(): Promise<void> {//putting assertions here for each element
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(email: string, password: string): Promise<void>
    {
        await this.fill(this.emailInput, email);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);

    }
    async verifyLoginSuccess(): Promise<void>
    {
        const currentUrl = this.page.url();
        if(currentUrl. includes('error'))
        {
            throw new Error("login failed");
        }
        await expect(this.page).not.toHaveURL(/accountLogin/);
    }








}