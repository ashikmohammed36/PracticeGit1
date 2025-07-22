import { test } from '../fixtures/common-fixture';
import { expect } from '@playwright/test';
test('Global Setup for Auto login', async ({ page, loginPage, commonUtils, dashboardPage }) => {
    const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
    const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!)

    await loginPage.goToOrangeHrm();
    await loginPage.loginOrangeHrm(decryptedUserName, decryptedPassword);
    await page.waitForURL(process.env.BASE_URL + 'web/index.php/dashboard/index');
    await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');
    await page.context().storageState({
        path: './playwright/.auth/auth.json'
    })
})