import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CallUpdatePage from './call-update.page-object';

const expect = chai.expect;
export class CallDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.call.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-call'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CallComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('call-heading'));
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
    await navBarPage.getEntityPage('call');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCall() {
    await this.createButton.click();
    return new CallUpdatePage();
  }

  async deleteCall() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const callDeleteDialog = new CallDeleteDialog();
    await waitUntilDisplayed(callDeleteDialog.deleteModal);
    expect(await callDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.call.delete.question/);
    await callDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(callDeleteDialog.deleteModal);

    expect(await isVisible(callDeleteDialog.deleteModal)).to.be.false;
  }
}
