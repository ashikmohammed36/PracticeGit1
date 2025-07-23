import { test } from '../fixtures/hooks-fixture';
import loginTestData from '../data/login-module-data.json';
import { expect } from '@playwright/test';

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});
test.describe("Invalid login scenarios", () => {
    test('Login with invalid password', {
        tag: ['@UI', '@UAT'],
        annotation: {
            type: 'Test Case Link',
            description: '// update the link //'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const username = commonUtils.decryptData(process.env.USER_NAME!);
        await loginPage.loginOrangeHrm(username, loginTestData.invalid_password);
        await expect(loginPage.invalidCredentialsError).toHaveText(loginTestData.invalid_credentails_text);
        await expect(loginPage.userNameInput).toBeVisible();
        console.log("Invalid Credentials Error Message Verified");
    });
    test('Login with invalid username', {
        tag: ['@UI'],
        annotation: {
            type: 'Test Case Link',
            description: '// update the link //'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.loginOrangeHrm(password, loginTestData.invalid_username);
        await expect(loginPage.invalidCredentialsError).toHaveText(loginTestData.invalid_credentails_text);
        await expect(loginPage.userNameInput).toBeVisible();
    });
    test('Login with both invalid username and password', {
        tag: ['@UI', '@UAT', '@DEV']
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        await loginPage.loginOrangeHrm(loginTestData.invalid_username, loginTestData.invalid_username);
        await expect(loginPage.invalidCredentialsError).toHaveText(loginTestData.invalid_credentails_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })

});
/**
 * Visual Testing
 */
test('Login with both valid username and password', {
    tag: ['@VISUAL', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: '// update the link //'
    }
}, async ({ gotoUrl, loginPage, commonUtils,leftNavigationMenu }) => {
    const userName = commonUtils.decryptData(process.env.USER_NAME!);
    const password = commonUtils.decryptData(process.env.PASSWORD!)
    await loginPage.loginOrangeHrm(userName, password);
    await expect(leftNavigationMenu.orangeHrmLogo).toHaveScreenshot('Orange HRM Brand Logo.png');
   await expect (leftNavigationMenu.leftSidePanel).toHaveScreenshot('Left Side Panel.png');
});
