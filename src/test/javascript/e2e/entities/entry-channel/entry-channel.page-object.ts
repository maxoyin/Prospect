import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EntryChannelUpdatePage from './entry-channel-update.page-object';

const expect = chai.expect;
export class EntryChannelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.entryChannel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-entryChannel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EntryChannelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('entry-channel-heading'));
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
    await navBarPage.getEntityPage('entry-channel');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEntryChannel() {
    await this.createButton.click();
    return new EntryChannelUpdatePage();
  }

  async deleteEntryChannel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const entryChannelDeleteDialog = new EntryChannelDeleteDialog();
    await waitUntilDisplayed(entryChannelDeleteDialog.deleteModal);
    expect(await entryChannelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.entryChannel.delete.question/);
    await entryChannelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(entryChannelDeleteDialog.deleteModal);

    expect(await isVisible(entryChannelDeleteDialog.deleteModal)).to.be.false;
  }
}
