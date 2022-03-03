import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GuarantorUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.guarantor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  lastNameInput: ElementFinder = element(by.css('input#guarantor-lastName'));
  firstNameInput: ElementFinder = element(by.css('input#guarantor-firstName'));
  otherNamesInput: ElementFinder = element(by.css('input#guarantor-otherNames'));
  genderSelect: ElementFinder = element(by.css('select#guarantor-gender'));
  emailInput: ElementFinder = element(by.css('input#guarantor-email'));
  phoneInput: ElementFinder = element(by.css('input#guarantor-phone'));
  alternatePhoneInput: ElementFinder = element(by.css('input#guarantor-alternatePhone'));
  bvnInput: ElementFinder = element(by.css('input#guarantor-bvn'));
  createdAtInput: ElementFinder = element(by.css('input#guarantor-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#guarantor-updatedAt'));
  adressSelect: ElementFinder = element(by.css('select#guarantor-adress'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setOtherNamesInput(otherNames) {
    await this.otherNamesInput.sendKeys(otherNames);
  }

  async getOtherNamesInput() {
    return this.otherNamesInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setAlternatePhoneInput(alternatePhone) {
    await this.alternatePhoneInput.sendKeys(alternatePhone);
  }

  async getAlternatePhoneInput() {
    return this.alternatePhoneInput.getAttribute('value');
  }

  async setBvnInput(bvn) {
    await this.bvnInput.sendKeys(bvn);
  }

  async getBvnInput() {
    return this.bvnInput.getAttribute('value');
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

  async adressSelectLastOption() {
    await this.adressSelect.all(by.tagName('option')).last().click();
  }

  async adressSelectOption(option) {
    await this.adressSelect.sendKeys(option);
  }

  getAdressSelect() {
    return this.adressSelect;
  }

  async getAdressSelectedOption() {
    return this.adressSelect.element(by.css('option:checked')).getText();
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
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOtherNamesInput('otherNames');
    expect(await this.getOtherNamesInput()).to.match(/otherNames/);
    await waitUntilDisplayed(this.saveButton);
    await this.genderSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('email');
    expect(await this.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('phone');
    expect(await this.getPhoneInput()).to.match(/phone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAlternatePhoneInput('alternatePhone');
    expect(await this.getAlternatePhoneInput()).to.match(/alternatePhone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnInput('bvn');
    expect(await this.getBvnInput()).to.match(/bvn/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
    await this.adressSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
