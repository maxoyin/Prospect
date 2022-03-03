import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CallComponentsPage from './call.page-object';
import CallUpdatePage from './call-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Call e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let callComponentsPage: CallComponentsPage;
  let callUpdatePage: CallUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    callComponentsPage = new CallComponentsPage();
    callComponentsPage = await callComponentsPage.goToPage(navBarPage);
  });

  it('should load Calls', async () => {
    expect(await callComponentsPage.title.getText()).to.match(/Calls/);
    expect(await callComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Calls', async () => {
    const beforeRecordsCount = (await isVisible(callComponentsPage.noRecords)) ? 0 : await getRecordsCount(callComponentsPage.table);
    callUpdatePage = await callComponentsPage.goToCreateCall();
    await callUpdatePage.enterData();

    expect(await callComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(callComponentsPage.table);
    await waitUntilCount(callComponentsPage.records, beforeRecordsCount + 1);
    expect(await callComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await callComponentsPage.deleteCall();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(callComponentsPage.records, beforeRecordsCount);
      expect(await callComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(callComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
