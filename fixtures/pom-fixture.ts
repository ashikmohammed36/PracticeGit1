import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { UserPage } from '../pages/UserPage';
import { LeftNavigationMenu } from '../pages/LeftNavigationMenu';
import { PimPage } from '../pages/PimPage';
type PomFixturesType = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userPage: UserPage;
    leftNavigationMenu: LeftNavigationMenu;
    pimPage: PimPage;
}
export const test = baseTest.extend<PomFixturesType>({
    loginPage: async ({ page }, use) => {
        const loginPageObj = new LoginPage(page);
        await use(loginPageObj);
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page))
    },
    userPage: async ({ page }, use) => {
        await use(new UserPage(page))
    },
    leftNavigationMenu: async ({ page }, use) => {
        await use(new LeftNavigationMenu(page))
    },
    pimPage: async ({ page }, use) => {
        await use(new PimPage(page))
    }
});