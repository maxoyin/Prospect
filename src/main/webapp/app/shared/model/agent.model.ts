import dayjs from 'dayjs';
import { IAddress } from 'app/shared/model/address.model';
import { ICall } from 'app/shared/model/call.model';

export interface IAgent {
  id?: number;
  role?: string;
  lastName?: string | null;
  firstName?: string | null;
  code?: string | null;
  status?: string | null;
  dateEnrolled?: string | null;
  registeredProspects?: number | null;
  activatedProspects?: number | null;
  inPipeline?: number | null;
  lastRegistration?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  address?: IAddress | null;
  calls?: ICall[] | null;
}

export const defaultValue: Readonly<IAgent> = {};
