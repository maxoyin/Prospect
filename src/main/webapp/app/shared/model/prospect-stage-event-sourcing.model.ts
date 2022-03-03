import dayjs from 'dayjs';

export interface IProspectStageEventSourcing {
  id?: number;
  createdAt?: string | null;
  propsectId?: string | null;
  event?: string | null;
  payload?: string | null;
}

export const defaultValue: Readonly<IProspectStageEventSourcing> = {};
