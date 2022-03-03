import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProspectStageEventSourcingUpdatePage from './prospect-stage-event-sourcing-update.page-object';

const expect = chai.expect;
export class ProspectStageEventSourcingDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('prospectServiceApp.prospectStageEventSourcing.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-prospectStageEventSourcing'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProspectStageEventSourcingComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('prospect-stage-event-sourcing-heading'));
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
    await navBarPage.getEntityPage('prospect-stage-event-sourcing');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProspectStageEventSourcing() {
    await this.createButton.click();
    return new ProspectStageEventSourcingUpdatePage();
  }

  async deleteProspectStageEventSourcing() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const prospectStageEventSourcingDeleteDialog = new ProspectStageEventSourcingDeleteDialog();
    await waitUntilDisplayed(prospectStageEventSourcingDeleteDialog.deleteModal);
    expect(await prospectStageEventSourcingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /prospectServiceApp.prospectStageEventSourcing.delete.question/
    );
    await prospectStageEventSourcingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(prospectStageEventSourcingDeleteDialog.deleteModal);

    expect(await isVisible(prospectStageEventSourcingDeleteDialog.deleteModal)).to.be.false;
  }
}
