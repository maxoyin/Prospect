import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProspectStageEventSourcingUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.prospectStageEventSourcing.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  createdAtInput: ElementFinder = element(by.css('input#prospect-stage-event-sourcing-createdAt'));
  propsectIdInput: ElementFinder = element(by.css('input#prospect-stage-event-sourcing-propsectId'));
  eventInput: ElementFinder = element(by.css('input#prospect-stage-event-sourcing-event'));
  payloadInput: ElementFinder = element(by.css('input#prospect-stage-event-sourcing-payload'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setPropsectIdInput(propsectId) {
    await this.propsectIdInput.sendKeys(propsectId);
  }

  async getPropsectIdInput() {
    return this.propsectIdInput.getAttribute('value');
  }

  async setEventInput(event) {
    await this.eventInput.sendKeys(event);
  }

  async getEventInput() {
    return this.eventInput.getAttribute('value');
  }

  async setPayloadInput(payload) {
    await this.payloadInput.sendKeys(payload);
  }

  async getPayloadInput() {
    return this.payloadInput.getAttribute('value');
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
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPropsectIdInput('propsectId');
    expect(await this.getPropsectIdInput()).to.match(/propsectId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEventInput('event');
    expect(await this.getEventInput()).to.match(/event/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPayloadInput('payload');
    expect(await this.getPayloadInput()).to.match(/payload/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
