import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProspectUpdatePage from './prospect-update.page-object';

const expect = chai.expect;
export class ProspectDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.prospect.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prospect'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProspectComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prospect-heading'));
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
    await navBarPage.getEntityPage('prospect');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProspect() {
    await this.createButton.click();
    return new ProspectUpdatePage();
  }

  async deleteProspect() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prospectDeleteDialog = new ProspectDeleteDialog();
    await waitUntilDisplayed(prospectDeleteDialog.deleteModal);
    expect(await prospectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.prospect.delete.question/);
    await prospectDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prospectDeleteDialog.deleteModal);

    expect(await isVisible(prospectDeleteDialog.deleteModal)).to.be.false;
  }
}
