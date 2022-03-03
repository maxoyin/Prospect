import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class AgentUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.agent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  roleInput: ElementFinder = element(by.css('input#agent-role'));
  lastNameInput: ElementFinder = element(by.css('input#agent-lastName'));
  firstNameInput: ElementFinder = element(by.css('input#agent-firstName'));
  codeInput: ElementFinder = element(by.css('input#agent-code'));
  statusInput: ElementFinder = element(by.css('input#agent-status'));
  dateEnrolledInput: ElementFinder = element(by.css('input#agent-dateEnrolled'));
  registeredProspectsInput: ElementFinder = element(by.css('input#agent-registeredProspects'));
  activatedProspectsInput: ElementFinder = element(by.css('input#agent-activatedProspects'));
  inPipelineInput: ElementFinder = element(by.css('input#agent-inPipeline'));
  lastRegistrationInput: ElementFinder = element(by.css('input#agent-lastRegistration'));
  createdAtInput: ElementFinder = element(by.css('input#agent-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#agent-updatedAt'));
  addressSelect: ElementFinder = element(by.css('select#agent-address'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return this.roleInput.getAttribute('value');
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

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setDateEnrolledInput(dateEnrolled) {
    await this.dateEnrolledInput.sendKeys(dateEnrolled);
  }

  async getDateEnrolledInput() {
    return this.dateEnrolledInput.getAttribute('value');
  }

  async setRegisteredProspectsInput(registeredProspects) {
    await this.registeredProspectsInput.sendKeys(registeredProspects);
  }

  async getRegisteredProspectsInput() {
    return this.registeredProspectsInput.getAttribute('value');
  }

  async setActivatedProspectsInput(activatedProspects) {
    await this.activatedProspectsInput.sendKeys(activatedProspects);
  }

  async getActivatedProspectsInput() {
    return this.activatedProspectsInput.getAttribute('value');
  }

  async setInPipelineInput(inPipeline) {
    await this.inPipelineInput.sendKeys(inPipeline);
  }

  async getInPipelineInput() {
    return this.inPipelineInput.getAttribute('value');
  }

  async setLastRegistrationInput(lastRegistration) {
    await this.lastRegistrationInput.sendKeys(lastRegistration);
  }

  async getLastRegistrationInput() {
    return this.lastRegistrationInput.getAttribute('value');
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

  async addressSelectLastOption() {
    await this.addressSelect.all(by.tagName('option')).last().click();
  }

  async addressSelectOption(option) {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect() {
    return this.addressSelect;
  }

  async getAddressSelectedOption() {
    return this.addressSelect.element(by.css('option:checked')).getText();
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
    await this.setRoleInput('role');
    expect(await this.getRoleInput()).to.match(/role/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeInput('code');
    expect(await this.getCodeInput()).to.match(/code/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateEnrolledInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateEnrolledInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setRegisteredProspectsInput('5');
    expect(await this.getRegisteredProspectsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setActivatedProspectsInput('5');
    expect(await this.getActivatedProspectsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setInPipelineInput('5');
    expect(await this.getInPipelineInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastRegistrationInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getLastRegistrationInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
    await this.addressSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
