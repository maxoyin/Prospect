import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EntryChannelComponentsPage from './entry-channel.page-object';
import EntryChannelUpdatePage from './entry-channel-update.page-object';
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

describe('EntryChannel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let entryChannelComponentsPage: EntryChannelComponentsPage;
  let entryChannelUpdatePage: EntryChannelUpdatePage;
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
    entryChannelComponentsPage = new EntryChannelComponentsPage();
    entryChannelComponentsPage = await entryChannelComponentsPage.goToPage(navBarPage);
  });

  it('should load EntryChannels', async () => {
    expect(await entryChannelComponentsPage.title.getText()).to.match(/Entry Channels/);
    expect(await entryChannelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EntryChannels', async () => {
    const beforeRecordsCount = (await isVisible(entryChannelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(entryChannelComponentsPage.table);
    entryChannelUpdatePage = await entryChannelComponentsPage.goToCreateEntryChannel();
    await entryChannelUpdatePage.enterData();

    expect(await entryChannelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(entryChannelComponentsPage.table);
    await waitUntilCount(entryChannelComponentsPage.records, beforeRecordsCount + 1);
    expect(await entryChannelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await entryChannelComponentsPage.deleteEntryChannel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(entryChannelComponentsPage.records, beforeRecordsCount);
      expect(await entryChannelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(entryChannelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
