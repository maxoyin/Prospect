import dayjs from 'dayjs';
import { IAddress } from 'app/shared/model/address.model';
import { ICall } from 'app/shared/model/call.model';
import { IProspectStageHistory } from 'app/shared/model/prospect-stage-history.model';
import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { ILocation } from 'app/shared/model/location.model';
import { IAgent } from 'app/shared/model/agent.model';
import { IEntryChannel } from 'app/shared/model/entry-channel.model';
import { IAssetType } from 'app/shared/model/asset-type.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IProspect {
  id?: number;
  prospectiveId?: string;
  lastName?: string | null;
  firstName?: string | null;
  otherNames?: string | null;
  dateOfBirth?: string | null;
  gender?: Gender | null;
  email?: string | null;
  phone?: string | null;
  alternatePhone?: string | null;
  disabilities?: string | null;
  bvn?: string | null;
  bvnAddress?: string | null;
  isBvnVerified?: boolean | null;
  bvnInformation?: string | null;
  driversLicenseNumber?: string | null;
  driversLicenseExpiry?: string | null;
  dateAvailableForTest?: string | null;
  photoUrl?: string | null;
  noShowCount?: number | null;
  activated?: boolean | null;
  inRecovery?: boolean | null;
  retrain?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  address?: IAddress | null;
  calls?: ICall[] | null;
  prospectStageHistories?: IProspectStageHistory[] | null;
  onboardingStage?: IOnboardingStage | null;
  location?: ILocation | null;
  agent?: IAgent | null;
  entryChannel?: IEntryChannel | null;
  assetTypes?: IAssetType[] | null;
}

export const defaultValue: Readonly<IProspect> = {
  isBvnVerified: false,
  activated: false,
  inRecovery: false,
  retrain: false,
};
