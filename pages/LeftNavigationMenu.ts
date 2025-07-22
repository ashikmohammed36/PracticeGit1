import { Locator, Page, expect } from "@playwright/test";
export class LeftNavigationMenu {
    readonly page: Page;
    readonly pimLink: Locator;
    readonly orangeHrmLogo: Locator;
    readonly leftSidePanel: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pimLink = page.getByRole('link', { name: 'PIM' });
        this.orangeHrmLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftSidePanel = page.locator('div.oxd-sidepanel-body');

    }

    async openPimModule() {
        await this.pimLink.click();
        await expect(this.page).toHaveURL(/viewEmployeeList/);
    }
}