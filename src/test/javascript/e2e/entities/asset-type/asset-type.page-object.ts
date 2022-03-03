import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import AssetTypeUpdatePage from './asset-type-update.page-object';

const expect = chai.expect;
export class AssetTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.assetType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-assetType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class AssetTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('asset-type-heading'));
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
    await navBarPage.getEntityPage('asset-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateAssetType() {
    await this.createButton.click();
    return new AssetTypeUpdatePage();
  }

  async deleteAssetType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const assetTypeDeleteDialog = new AssetTypeDeleteDialog();
    await waitUntilDisplayed(assetTypeDeleteDialog.deleteModal);
    expect(await assetTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/prospectServiceApp.assetType.delete.question/);
    await assetTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(assetTypeDeleteDialog.deleteModal);

    expect(await isVisible(assetTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
