import { Page, Locator, expect } from '@playwright/test';
import { BasePage_SOLID } from './BasePage_SOLID';

export interface TableRowData {
    lastName: string;
    email: string;
}

export class TablePage extends BasePage_SOLID {
    readonly table: Locator;

    constructor(page: Page) {
        super(page);
        this.table = page.locator('#table1');
    }

    async goto(): Promise<void> {
        await this.navigate('https://the-internet.herokuapp.com/tables');
    }

    async isLoaded(): Promise<void> {
        await this.table.waitFor({ state: 'visible', timeout: 20000 });
    }

    getRows(): Locator {
        return this.table.locator('tbody tr');
    }

    getOfRows(): Locator {
        return this.getRows();
    }

    async getRowCount(): Promise<number> {
        return await this.getRows().count();
    }

    async getRowData(rowIndex: number): Promise<TableRowData> {
        const row = this.getRows().nth(rowIndex);
        const cells = row.locator('td');
        const lastName = (await cells.nth(0).textContent())?.trim() || '';
        const email = (await cells.nth(2).textContent())?.trim() || '';

        return {
            lastName,
            email,
        };
    }

    async getAllRowsData(): Promise<TableRowData[]> {
        const rowCount = await this.getRowCount();
        const results: TableRowData[] = [];

        for (let index = 0; index < rowCount; index++) {
            results.push(await this.getRowData(index));
        }

        return results;
    }

    async validateRowData(rowData: TableRowData): Promise<void> {
        expect(rowData.lastName.length).toBeGreaterThan(0);
        expect(rowData.email).toMatch(/.+@.+\..+/);
    }
}