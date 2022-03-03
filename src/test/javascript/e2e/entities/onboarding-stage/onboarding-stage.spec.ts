import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OnboardingStageComponentsPage from './onboarding-stage.page-object';
import OnboardingStageUpdatePage from './onboarding-stage-update.page-object';
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

describe('OnboardingStage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let onboardingStageComponentsPage: OnboardingStageComponentsPage;
  let onboardingStageUpdatePage: OnboardingStageUpdatePage;
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
    onboardingStageComponentsPage = new OnboardingStageComponentsPage();
    onboardingStageComponentsPage = await onboardingStageComponentsPage.goToPage(navBarPage);
  });

  it('should load OnboardingStages', async () => {
    expect(await onboardingStageComponentsPage.title.getText()).to.match(/Onboarding Stages/);
    expect(await onboardingStageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete OnboardingStages', async () => {
    const beforeRecordsCount = (await isVisible(onboardingStageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(onboardingStageComponentsPage.table);
    onboardingStageUpdatePage = await onboardingStageComponentsPage.goToCreateOnboardingStage();
    await onboardingStageUpdatePage.enterData();

    expect(await onboardingStageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(onboardingStageComponentsPage.table);
    await waitUntilCount(onboardingStageComponentsPage.records, beforeRecordsCount + 1);
    expect(await onboardingStageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await onboardingStageComponentsPage.deleteOnboardingStage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(onboardingStageComponentsPage.records, beforeRecordsCount);
      expect(await onboardingStageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(onboardingStageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
