import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AssetTypeComponentsPage from './asset-type.page-object';
import AssetTypeUpdatePage from './asset-type-update.page-object';
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

describe('AssetType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let assetTypeComponentsPage: AssetTypeComponentsPage;
  let assetTypeUpdatePage: AssetTypeUpdatePage;
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
    assetTypeComponentsPage = new AssetTypeComponentsPage();
    assetTypeComponentsPage = await assetTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load AssetTypes', async () => {
    expect(await assetTypeComponentsPage.title.getText()).to.match(/Asset Types/);
    expect(await assetTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete AssetTypes', async () => {
    const beforeRecordsCount = (await isVisible(assetTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(assetTypeComponentsPage.table);
    assetTypeUpdatePage = await assetTypeComponentsPage.goToCreateAssetType();
    await assetTypeUpdatePage.enterData();

    expect(await assetTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(assetTypeComponentsPage.table);
    await waitUntilCount(assetTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await assetTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await assetTypeComponentsPage.deleteAssetType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(assetTypeComponentsPage.records, beforeRecordsCount);
      expect(await assetTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(assetTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
