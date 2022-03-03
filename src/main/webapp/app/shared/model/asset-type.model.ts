import dayjs from 'dayjs';
import { IProspect } from 'app/shared/model/prospect.model';

export interface IAssetType {
  id?: number;
  name?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  prospects?: IProspect[] | null;
}

export const defaultValue: Readonly<IAssetType> = {};
