import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly invalidCredentialsError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn=page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsError=page.getByText('Invalid credentials');
        
    }
    async goToOrangeHrm(){
        await this.page.goto(`${process.env.BASE_URL}web/index.php/auth/login`,{waitUntil: 'load'});
    }

    async loginOrangeHrm(userName:string,password:string){
       await this.userNameInput.fill(userName);
       await this.passwordInput.fill(password);
       await this.loginBtn.click();
       await this.page.waitForLoadState('load');
    }
}