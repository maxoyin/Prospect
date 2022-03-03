import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProspectComponentsPage from './prospect.page-object';
import ProspectUpdatePage from './prospect-update.page-object';
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

describe('Prospect e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prospectComponentsPage: ProspectComponentsPage;
  let prospectUpdatePage: ProspectUpdatePage;
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
    prospectComponentsPage = new ProspectComponentsPage();
    prospectComponentsPage = await prospectComponentsPage.goToPage(navBarPage);
  });

  it('should load Prospects', async () => {
    expect(await prospectComponentsPage.title.getText()).to.match(/Prospects/);
    expect(await prospectComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Prospects', async () => {
    const beforeRecordsCount = (await isVisible(prospectComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prospectComponentsPage.table);
    prospectUpdatePage = await prospectComponentsPage.goToCreateProspect();
    await prospectUpdatePage.enterData();

    expect(await prospectComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prospectComponentsPage.table);
    await waitUntilCount(prospectComponentsPage.records, beforeRecordsCount + 1);
    expect(await prospectComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prospectComponentsPage.deleteProspect();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prospectComponentsPage.records, beforeRecordsCount);
      expect(await prospectComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prospectComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
