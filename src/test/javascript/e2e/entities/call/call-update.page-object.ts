import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CallUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.call.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  commentInput: ElementFinder = element(by.css('input#call-comment'));
  createdAtInput: ElementFinder = element(by.css('input#call-createdAt'));
  agentSelect: ElementFinder = element(by.css('select#call-agent'));
  prospectSelect: ElementFinder = element(by.css('select#call-prospect'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async agentSelectLastOption() {
    await this.agentSelect.all(by.tagName('option')).last().click();
  }

  async agentSelectOption(option) {
    await this.agentSelect.sendKeys(option);
  }

  getAgentSelect() {
    return this.agentSelect;
  }

  async getAgentSelectedOption() {
    return this.agentSelect.element(by.css('option:checked')).getText();
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
    await this.setCommentInput('comment');
    expect(await this.getCommentInput()).to.match(/comment/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await this.agentSelectLastOption();
    await this.prospectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
