import dayjs from 'dayjs';

export interface IAddress {
  id?: number;
  number?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export const defaultValue: Readonly<IAddress> = {};
