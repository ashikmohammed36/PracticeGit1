//import { test } from "../fixtures/pom-fixture";
import { LoginPage } from "../pages/LoginPage";
//import CommonUtils from "../utils/CommonUtils";
import { test } from "../fixtures/hooks-fixture";
import { expect } from "@playwright/test";
import { UserPage } from "../pages/UserPage";

// test.beforeEach('Before Each hook', async ({loginPage})=>{
// await loginPage.goToOrangeHrm();
// });
// test.afterEach('After Each hook', async ({userPage})=>{
// await userPage.logout();
// });


test("test1:", async ({ page, gotoUrl }) => {

    // console.log(process.env.BASE_URL);
    // console.log(process.env.USER_NAME);
    // console.log(process.env.PASSWORD);



    //const loginPage = new LoginPage(page);
    // await loginPage.goToOrangeHrm();
    //await loginPage.loginOrangeHrm();

    // const commonUtilsObj = new CommonUtils();
    //commonUtilsObj.encryptData('admin123');
    // console.log(commonUtils.decryptData(process.env.USER_NAME!));
    // console.log(commonUtils.decryptData(process.env.PASSWORD!));
    /**
     * already authentication is setup
     */
    //  await loginPage.loginOrangeHrm("Admin","admin123");
    console.log(await page.title());
});
test("test2:", async ({ page, gotoUrl }) => {
    await expect(page).toHaveTitle('OrangeHRM');
});
test("test3:", async ({ page, gotoUrl, logout }) => {
    await expect(page).toHaveTitle('OrangeHRM');
});