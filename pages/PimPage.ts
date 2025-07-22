import { Locator, Page ,expect} from "@playwright/test";
export class PimPage {
    readonly page: Page;
    readonly addPimBtn: Locator;
    readonly firstName: Locator;
    readonly middleName: Locator;
    readonly lastName: Locator;
    readonly saveBtn: Locator;
    readonly newEmpNameHeading: Locator;
    constructor(page: Page) {
        this.page=page;
        this.addPimBtn=page.getByRole('button', { name: ' Add' });
        this.firstName=page.getByRole('textbox', { name: 'First Name' });
        this.middleName=page.getByRole('textbox', { name: 'Middle Name' });
        this.lastName=page.getByRole('textbox', { name: 'Last Name' });
        this.saveBtn=page.getByRole('button', { name: 'Save' });
        this.newEmpNameHeading=page.locator('.orangehrm-edit-employee-name');
        
    }
    async addEmployee(firstName :string,middleName:string,lastName:string){
        await this.addPimBtn.click();
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveBtn.click();

    }
    
}