import { api } from './api';
import type { Settings } from '../types';

export type { Settings };

export const settingsService = {
  get(): Promise<Settings> {
    return api.get<Settings>('/api/settings');
  },

  save(data: Settings): Promise<Settings> {
    return api.post<Settings>('/api/settings', data);
  },
};
