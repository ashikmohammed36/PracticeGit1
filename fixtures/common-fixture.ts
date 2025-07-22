import { test as baseTest } from './pom-fixture';
import CommonUtils from '../utils/CommonUtils';

type CommonFixturesType = {
    commonUtils: CommonUtils;
};
export const test = baseTest.extend<CommonFixturesType>({
    commonUtils: async ({ }, use) => {
        await use(new CommonUtils())
    }
});
