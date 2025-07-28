/*import { test } from '../../fixtures/common-fixture';
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
})*/
// tests/global.setup.ts
import { chromium, FullConfig, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage'; // adjust path if needed
import { DashboardPage } from '../../pages/DashboardPage';
import  CommonUtils  from '../../utils/CommonUtils';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: true }); // force headless for CI
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const commonUtils = new CommonUtils();

  const decryptedUserName = commonUtils.decryptData(process.env.USER_NAME!);
  const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);

  await loginPage.goToOrangeHrm();
  await loginPage.loginOrangeHrm(decryptedUserName, decryptedPassword);

  await page.waitForURL(`${process.env.BASE_URL}web/index.php/dashboard/index`);
  await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');

  await context.storageState({ path: './playwright/.auth/auth.json' });

  await browser.close();
}

export default globalSetup;
