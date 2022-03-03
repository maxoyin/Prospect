import dayjs from 'dayjs';

export interface IEntryChannel {
  id?: number;
  name?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export const defaultValue: Readonly<IEntryChannel> = {};
