import dayjs from 'dayjs';
import { IAddress } from 'app/shared/model/address.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IGuarantor {
  id?: number;
  lastName?: string | null;
  firstName?: string | null;
  otherNames?: string | null;
  gender?: Gender | null;
  email?: string | null;
  phone?: string | null;
  alternatePhone?: string | null;
  bvn?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  adress?: IAddress | null;
}

export const defaultValue: Readonly<IGuarantor> = {};
