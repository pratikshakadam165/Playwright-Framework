import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';
// CHANGE 1: Import the centralized config instead of hardcoding the URL below.
// WHY: The old code had the full login URL typed directly inside this class.
// That violates the Dependency Inversion Principle (DIP) - a high-level
// module (LoginPage) should depend on an abstraction (config), not a
// concrete, hardcoded detail. This also means switching between
// dev/staging/production environments now requires ZERO code changes -
// just a different .env file or BASE_URL value in CI/CD.
import { config } from '../config/environment';
import { BasePage_SOLID } from './BasePage_SOLID';

export class LoginPage_SOLID extends BasePage_SOLID{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;


constructor (page: Page)
{
    super(page);
    this.emailInput = page.locator('input[name="email"]'); //css selector - html tag and attribute
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[type="submit"]');
}

async goto(): Promise<void>{
    // CHANGE 2: Build the URL from config instead of a hardcoded literal.
    // BEFORE: await this.navigate('https://www.kapruka.com/shops/customerAccounts/accountLogin.jsp');
    // WHY: Same DIP reasoning as above - this class no longer "knows" or
    // "cares" what environment it's running against. That responsibility now
    // belongs to config/environment.ts.
    await this.navigate(`${config.baseUrl}${config.loginPath}`);
}

async isLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
}

async login(email:string, password: string): Promise<void>{
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
}

async verifyLoginSuccess(): Promise<void>{
    const currentUrl = this.page.url();
    if (currentUrl.includes('error'))
    {
        throw new Error("Login failed");
    }
    await expect(this.page).not.toHaveURL(/accountLogin/);
}

// NOTE (not changed, just flagging for the team):
// This method currently mixes "checking state" with "asserting/throwing".
// Per Single Responsibility Principle, many teams prefer Page Objects to
// stay assertion-free, and move expect() calls into the .spec.ts file
// instead. Left as-is for now since it works, but worth a team discussion
// before this framework scales to more pages/tests.

}
//OPEN FOR EXTENSION
//QA - Module 1 Automation - 
//Module 2 automation
//CI CD
//SCRUM MASTER FOR A DAY XX

//SOLID
//KISS
//POM
//ENV
//HARDCODE
//SENSITIVE DATA
//ASSERTIONS
