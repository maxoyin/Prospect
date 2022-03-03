import dayjs from 'dayjs';
import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { IProspect } from 'app/shared/model/prospect.model';

export interface IProspectStageHistory {
  id?: number;
  name?: string | null;
  createdAt?: string | null;
  fromStage?: IOnboardingStage | null;
  toStage?: IOnboardingStage | null;
  prospect?: IProspect | null;
}

export const defaultValue: Readonly<IProspectStageHistory> = {};
