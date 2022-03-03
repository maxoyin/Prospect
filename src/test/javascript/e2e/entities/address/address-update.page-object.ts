import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AddressUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.address.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  numberInput: ElementFinder = element(by.css('input#address-number'));
  streetInput: ElementFinder = element(by.css('input#address-street'));
  cityInput: ElementFinder = element(by.css('input#address-city'));
  stateInput: ElementFinder = element(by.css('input#address-state'));
  countryNameInput: ElementFinder = element(by.css('input#address-countryName'));
  countryCodeInput: ElementFinder = element(by.css('input#address-countryCode'));
  createdAtInput: ElementFinder = element(by.css('input#address-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#address-updatedAt'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNumberInput(number) {
    await this.numberInput.sendKeys(number);
  }

  async getNumberInput() {
    return this.numberInput.getAttribute('value');
  }

  async setStreetInput(street) {
    await this.streetInput.sendKeys(street);
  }

  async getStreetInput() {
    return this.streetInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setStateInput(state) {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput() {
    return this.stateInput.getAttribute('value');
  }

  async setCountryNameInput(countryName) {
    await this.countryNameInput.sendKeys(countryName);
  }

  async getCountryNameInput() {
    return this.countryNameInput.getAttribute('value');
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt) {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput() {
    return this.updatedAtInput.getAttribute('value');
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
    await this.setNumberInput('number');
    expect(await this.getNumberInput()).to.match(/number/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStreetInput('street');
    expect(await this.getStreetInput()).to.match(/street/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    expect(await this.getCityInput()).to.match(/city/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStateInput('state');
    expect(await this.getStateInput()).to.match(/state/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryNameInput('countryName');
    expect(await this.getCountryNameInput()).to.match(/countryName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCountryCodeInput('countryCode');
    expect(await this.getCountryCodeInput()).to.match(/countryCode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
