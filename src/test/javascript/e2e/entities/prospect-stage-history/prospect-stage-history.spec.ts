import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProspectStageHistoryComponentsPage from './prospect-stage-history.page-object';
import ProspectStageHistoryUpdatePage from './prospect-stage-history-update.page-object';
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

describe('ProspectStageHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prospectStageHistoryComponentsPage: ProspectStageHistoryComponentsPage;
  let prospectStageHistoryUpdatePage: ProspectStageHistoryUpdatePage;
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
    prospectStageHistoryComponentsPage = new ProspectStageHistoryComponentsPage();
    prospectStageHistoryComponentsPage = await prospectStageHistoryComponentsPage.goToPage(navBarPage);
  });

  it('should load ProspectStageHistories', async () => {
    expect(await prospectStageHistoryComponentsPage.title.getText()).to.match(/Prospect Stage Histories/);
    expect(await prospectStageHistoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ProspectStageHistories', async () => {
    const beforeRecordsCount = (await isVisible(prospectStageHistoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prospectStageHistoryComponentsPage.table);
    prospectStageHistoryUpdatePage = await prospectStageHistoryComponentsPage.goToCreateProspectStageHistory();
    await prospectStageHistoryUpdatePage.enterData();

    expect(await prospectStageHistoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prospectStageHistoryComponentsPage.table);
    await waitUntilCount(prospectStageHistoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await prospectStageHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prospectStageHistoryComponentsPage.deleteProspectStageHistory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prospectStageHistoryComponentsPage.records, beforeRecordsCount);
      expect(await prospectStageHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prospectStageHistoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
