import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProspectUpdatePage {
  pageTitle: ElementFinder = element(by.id('prospectServiceApp.prospect.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  prospectiveIdInput: ElementFinder = element(by.css('input#prospect-prospectiveId'));
  lastNameInput: ElementFinder = element(by.css('input#prospect-lastName'));
  firstNameInput: ElementFinder = element(by.css('input#prospect-firstName'));
  otherNamesInput: ElementFinder = element(by.css('input#prospect-otherNames'));
  dateOfBirthInput: ElementFinder = element(by.css('input#prospect-dateOfBirth'));
  genderSelect: ElementFinder = element(by.css('select#prospect-gender'));
  emailInput: ElementFinder = element(by.css('input#prospect-email'));
  phoneInput: ElementFinder = element(by.css('input#prospect-phone'));
  alternatePhoneInput: ElementFinder = element(by.css('input#prospect-alternatePhone'));
  disabilitiesInput: ElementFinder = element(by.css('input#prospect-disabilities'));
  bvnInput: ElementFinder = element(by.css('input#prospect-bvn'));
  bvnAddressInput: ElementFinder = element(by.css('input#prospect-bvnAddress'));
  isBvnVerifiedInput: ElementFinder = element(by.css('input#prospect-isBvnVerified'));
  bvnInformationInput: ElementFinder = element(by.css('input#prospect-bvnInformation'));
  driversLicenseNumberInput: ElementFinder = element(by.css('input#prospect-driversLicenseNumber'));
  driversLicenseExpiryInput: ElementFinder = element(by.css('input#prospect-driversLicenseExpiry'));
  dateAvailableForTestInput: ElementFinder = element(by.css('input#prospect-dateAvailableForTest'));
  photoUrlInput: ElementFinder = element(by.css('input#prospect-photoUrl'));
  noShowCountInput: ElementFinder = element(by.css('input#prospect-noShowCount'));
  activatedInput: ElementFinder = element(by.css('input#prospect-activated'));
  inRecoveryInput: ElementFinder = element(by.css('input#prospect-inRecovery'));
  retrainInput: ElementFinder = element(by.css('input#prospect-retrain'));
  createdAtInput: ElementFinder = element(by.css('input#prospect-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#prospect-updatedAt'));
  addressSelect: ElementFinder = element(by.css('select#prospect-address'));
  onboardingStageSelect: ElementFinder = element(by.css('select#prospect-onboardingStage'));
  locationSelect: ElementFinder = element(by.css('select#prospect-location'));
  agentSelect: ElementFinder = element(by.css('select#prospect-agent'));
  entryChannelSelect: ElementFinder = element(by.css('select#prospect-entryChannel'));
  assetTypeSelect: ElementFinder = element(by.css('select#prospect-assetType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setProspectiveIdInput(prospectiveId) {
    await this.prospectiveIdInput.sendKeys(prospectiveId);
  }

  async getProspectiveIdInput() {
    return this.prospectiveIdInput.getAttribute('value');
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

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
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

  async setDisabilitiesInput(disabilities) {
    await this.disabilitiesInput.sendKeys(disabilities);
  }

  async getDisabilitiesInput() {
    return this.disabilitiesInput.getAttribute('value');
  }

  async setBvnInput(bvn) {
    await this.bvnInput.sendKeys(bvn);
  }

  async getBvnInput() {
    return this.bvnInput.getAttribute('value');
  }

  async setBvnAddressInput(bvnAddress) {
    await this.bvnAddressInput.sendKeys(bvnAddress);
  }

  async getBvnAddressInput() {
    return this.bvnAddressInput.getAttribute('value');
  }

  getIsBvnVerifiedInput() {
    return this.isBvnVerifiedInput;
  }
  async setBvnInformationInput(bvnInformation) {
    await this.bvnInformationInput.sendKeys(bvnInformation);
  }

  async getBvnInformationInput() {
    return this.bvnInformationInput.getAttribute('value');
  }

  async setDriversLicenseNumberInput(driversLicenseNumber) {
    await this.driversLicenseNumberInput.sendKeys(driversLicenseNumber);
  }

  async getDriversLicenseNumberInput() {
    return this.driversLicenseNumberInput.getAttribute('value');
  }

  async setDriversLicenseExpiryInput(driversLicenseExpiry) {
    await this.driversLicenseExpiryInput.sendKeys(driversLicenseExpiry);
  }

  async getDriversLicenseExpiryInput() {
    return this.driversLicenseExpiryInput.getAttribute('value');
  }

  async setDateAvailableForTestInput(dateAvailableForTest) {
    await this.dateAvailableForTestInput.sendKeys(dateAvailableForTest);
  }

  async getDateAvailableForTestInput() {
    return this.dateAvailableForTestInput.getAttribute('value');
  }

  async setPhotoUrlInput(photoUrl) {
    await this.photoUrlInput.sendKeys(photoUrl);
  }

  async getPhotoUrlInput() {
    return this.photoUrlInput.getAttribute('value');
  }

  async setNoShowCountInput(noShowCount) {
    await this.noShowCountInput.sendKeys(noShowCount);
  }

  async getNoShowCountInput() {
    return this.noShowCountInput.getAttribute('value');
  }

  getActivatedInput() {
    return this.activatedInput;
  }
  getInRecoveryInput() {
    return this.inRecoveryInput;
  }
  getRetrainInput() {
    return this.retrainInput;
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

  async onboardingStageSelectLastOption() {
    await this.onboardingStageSelect.all(by.tagName('option')).last().click();
  }

  async onboardingStageSelectOption(option) {
    await this.onboardingStageSelect.sendKeys(option);
  }

  getOnboardingStageSelect() {
    return this.onboardingStageSelect;
  }

  async getOnboardingStageSelectedOption() {
    return this.onboardingStageSelect.element(by.css('option:checked')).getText();
  }

  async locationSelectLastOption() {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
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

  async entryChannelSelectLastOption() {
    await this.entryChannelSelect.all(by.tagName('option')).last().click();
  }

  async entryChannelSelectOption(option) {
    await this.entryChannelSelect.sendKeys(option);
  }

  getEntryChannelSelect() {
    return this.entryChannelSelect;
  }

  async getEntryChannelSelectedOption() {
    return this.entryChannelSelect.element(by.css('option:checked')).getText();
  }

  async assetTypeSelectLastOption() {
    await this.assetTypeSelect.all(by.tagName('option')).last().click();
  }

  async assetTypeSelectOption(option) {
    await this.assetTypeSelect.sendKeys(option);
  }

  getAssetTypeSelect() {
    return this.assetTypeSelect;
  }

  async getAssetTypeSelectedOption() {
    return this.assetTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setProspectiveIdInput('prospectiveId');
    expect(await this.getProspectiveIdInput()).to.match(/prospectiveId/);
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
    await this.setDateOfBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateOfBirthInput()).to.contain('2001-01-01T02:30');
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
    await this.setDisabilitiesInput('disabilities');
    expect(await this.getDisabilitiesInput()).to.match(/disabilities/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnInput('bvn');
    expect(await this.getBvnInput()).to.match(/bvn/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnAddressInput('bvnAddress');
    expect(await this.getBvnAddressInput()).to.match(/bvnAddress/);
    await waitUntilDisplayed(this.saveButton);
    const selectedIsBvnVerified = await this.getIsBvnVerifiedInput().isSelected();
    if (selectedIsBvnVerified) {
      await this.getIsBvnVerifiedInput().click();
      expect(await this.getIsBvnVerifiedInput().isSelected()).to.be.false;
    } else {
      await this.getIsBvnVerifiedInput().click();
      expect(await this.getIsBvnVerifiedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnInformationInput('bvnInformation');
    expect(await this.getBvnInformationInput()).to.match(/bvnInformation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDriversLicenseNumberInput('driversLicenseNumber');
    expect(await this.getDriversLicenseNumberInput()).to.match(/driversLicenseNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDriversLicenseExpiryInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDriversLicenseExpiryInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateAvailableForTestInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateAvailableForTestInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhotoUrlInput('photoUrl');
    expect(await this.getPhotoUrlInput()).to.match(/photoUrl/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNoShowCountInput('5');
    expect(await this.getNoShowCountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedActivated = await this.getActivatedInput().isSelected();
    if (selectedActivated) {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.false;
    } else {
      await this.getActivatedInput().click();
      expect(await this.getActivatedInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedInRecovery = await this.getInRecoveryInput().isSelected();
    if (selectedInRecovery) {
      await this.getInRecoveryInput().click();
      expect(await this.getInRecoveryInput().isSelected()).to.be.false;
    } else {
      await this.getInRecoveryInput().click();
      expect(await this.getInRecoveryInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    const selectedRetrain = await this.getRetrainInput().isSelected();
    if (selectedRetrain) {
      await this.getRetrainInput().click();
      expect(await this.getRetrainInput().isSelected()).to.be.false;
    } else {
      await this.getRetrainInput().click();
      expect(await this.getRetrainInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getCreatedAtInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getUpdatedAtInput()).to.contain('2001-01-01T02:30');
    await this.addressSelectLastOption();
    await this.onboardingStageSelectLastOption();
    await this.locationSelectLastOption();
    await this.agentSelectLastOption();
    await this.entryChannelSelectLastOption();
    // this.assetTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
