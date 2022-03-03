import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProspectStageEventSourcingComponentsPage from './prospect-stage-event-sourcing.page-object';
import ProspectStageEventSourcingUpdatePage from './prospect-stage-event-sourcing-update.page-object';
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

describe('ProspectStageEventSourcing e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let prospectStageEventSourcingComponentsPage: ProspectStageEventSourcingComponentsPage;
  let prospectStageEventSourcingUpdatePage: ProspectStageEventSourcingUpdatePage;
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
    prospectStageEventSourcingComponentsPage = new ProspectStageEventSourcingComponentsPage();
    prospectStageEventSourcingComponentsPage = await prospectStageEventSourcingComponentsPage.goToPage(navBarPage);
  });

  it('should load ProspectStageEventSourcings', async () => {
    expect(await prospectStageEventSourcingComponentsPage.title.getText()).to.match(/Prospect Stage Event Sourcings/);
    expect(await prospectStageEventSourcingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ProspectStageEventSourcings', async () => {
    const beforeRecordsCount = (await isVisible(prospectStageEventSourcingComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(prospectStageEventSourcingComponentsPage.table);
    prospectStageEventSourcingUpdatePage = await prospectStageEventSourcingComponentsPage.goToCreateProspectStageEventSourcing();
    await prospectStageEventSourcingUpdatePage.enterData();

    expect(await prospectStageEventSourcingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(prospectStageEventSourcingComponentsPage.table);
    await waitUntilCount(prospectStageEventSourcingComponentsPage.records, beforeRecordsCount + 1);
    expect(await prospectStageEventSourcingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await prospectStageEventSourcingComponentsPage.deleteProspectStageEventSourcing();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(prospectStageEventSourcingComponentsPage.records, beforeRecordsCount);
      expect(await prospectStageEventSourcingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(prospectStageEventSourcingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
