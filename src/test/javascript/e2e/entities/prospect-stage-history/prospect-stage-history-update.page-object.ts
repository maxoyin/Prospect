import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProspectStageHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.prospectStageHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#prospect-stage-history-name'));
  createdAtInput: ElementFinder = element(by.css('input#prospect-stage-history-createdAt'));
  fromStageSelect: ElementFinder = element(by.css('select#prospect-stage-history-fromStage'));
  toStageSelect: ElementFinder = element(by.css('select#prospect-stage-history-toStage'));
  prospectSelect: ElementFinder = element(by.css('select#prospect-stage-history-prospect'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async fromStageSelectLastOption() {
    await this.fromStageSelect.all(by.tagName('option')).last().click();
  }

  async fromStageSelectOption(option) {
    await this.fromStageSelect.sendKeys(option);
  }

  getFromStageSelect() {
    return this.fromStageSelect;
  }

  async getFromStageSelectedOption() {
    return this.fromStageSelect.element(by.css('option:checked')).getText();
  }

  async toStageSelectLastOption() {
    await this.toStageSelect.all(by.tagName('option')).last().click();
  }

  async toStageSelectOption(option) {
    await this.toStageSelect.sendKeys(option);
  }

  getToStageSelect() {
    return this.toStageSelect;
  }

  async getToStageSelectedOption() {
    return this.toStageSelect.element(by.css('option:checked')).getText();
  }

  async prospectSelectLastOption() {
    await this.prospectSelect.all(by.tagName('option')).last().click();
  }

  async prospectSelectOption(option) {
    await this.prospectSelect.sendKeys(option);
  }

  getProspectSelect() {
    return this.prospectSelect;
  }

  async getProspectSelectedOption() {
    return this.prospectSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await this.fromStageSelectLastOption();
    await this.toStageSelectLastOption();
    await this.prospectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
