import dayjs from 'dayjs';

export interface IOnboardingStage {
  id?: number;
  name?: string | null;
  description?: string | null;
  rank?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export const defaultValue: Readonly<IOnboardingStage> = {};
