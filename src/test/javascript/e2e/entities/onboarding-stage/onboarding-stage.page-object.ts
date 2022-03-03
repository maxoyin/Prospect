import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import OnboardingStageUpdatePage from './onboarding-stage-update.page-object';

const expect = chai.expect;
export class OnboardingStageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.onboardingStage.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-onboardingStage'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class OnboardingStageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('onboarding-stage-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('onboarding-stage');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateOnboardingStage() {
    await this.createButton.click();
    return new OnboardingStageUpdatePage();
  }

  async deleteOnboardingStage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const onboardingStageDeleteDialog = new OnboardingStageDeleteDialog();
    await waitUntilDisplayed(onboardingStageDeleteDialog.deleteModal);
    expect(await onboardingStageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.onboardingStage.delete.question/
    );
    await onboardingStageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(onboardingStageDeleteDialog.deleteModal);

    expect(await isVisible(onboardingStageDeleteDialog.deleteModal)).to.be.false;
  }
}
