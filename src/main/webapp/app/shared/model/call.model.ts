import dayjs from 'dayjs';
import { IAgent } from 'app/shared/model/agent.model';
import { IProspect } from 'app/shared/model/prospect.model';

export interface ICall {
  id?: number;
  comment?: string | null;
  createdAt?: string | null;
  agent?: IAgent | null;
  prospect?: IProspect | null;
}

export const defaultValue: Readonly<ICall> = {};
