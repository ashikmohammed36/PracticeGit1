import { test } from '../fixtures/hooks-fixture';
import { expect } from '@playwright/test';
import pimTestData from '../data/pim-module-data.json';

test('Add Employee under PIM Module',{
    tag:['@UI' ,'@UAT']
},async({gotoUrl,leftNavigationMenu,pimPage})=>{
    await leftNavigationMenu.openPimModule();
    await pimPage.addEmployee(pimTestData.first_name,pimTestData.middle_name,pimTestData.last_name);
    await expect(pimPage.newEmpNameHeading).toHaveText(`${pimTestData.first_name} ${pimTestData.last_name}`);
});