import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import prospect, {
  ProspectState
} from 'app/entities/prospect/prospect.reducer';
// prettier-ignore
import guarantor, {
  GuarantorState
} from 'app/entities/guarantor/guarantor.reducer';
// prettier-ignore
import call, {
  CallState
} from 'app/entities/call/call.reducer';
// prettier-ignore
import agent, {
  AgentState
} from 'app/entities/agent/agent.reducer';
// prettier-ignore
import onboardingStage, {
  OnboardingStageState
} from 'app/entities/onboarding-stage/onboarding-stage.reducer';
// prettier-ignore
import prospectStageHistory, {
  ProspectStageHistoryState
} from 'app/entities/prospect-stage-history/prospect-stage-history.reducer';
// prettier-ignore
import prospectStageEventSourcing, {
  ProspectStageEventSourcingState
} from 'app/entities/prospect-stage-event-sourcing/prospect-stage-event-sourcing.reducer';
// prettier-ignore
import entryChannel, {
  EntryChannelState
} from 'app/entities/entry-channel/entry-channel.reducer';
// prettier-ignore
import address, {
  AddressState
} from 'app/entities/address/address.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import assetType, {
  AssetTypeState
} from 'app/entities/asset-type/asset-type.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly prospect: ProspectState;
  readonly guarantor: GuarantorState;
  readonly call: CallState;
  readonly agent: AgentState;
  readonly onboardingStage: OnboardingStageState;
  readonly prospectStageHistory: ProspectStageHistoryState;
  readonly prospectStageEventSourcing: ProspectStageEventSourcingState;
  readonly entryChannel: EntryChannelState;
  readonly address: AddressState;
  readonly location: LocationState;
  readonly assetType: AssetTypeState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  prospect,
  guarantor,
  call,
  agent,
  onboardingStage,
  prospectStageHistory,
  prospectStageEventSourcing,
  entryChannel,
  address,
  location,
  assetType,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
