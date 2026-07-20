import { api } from './api';
import type { Subscriber } from '../types';

export type { Subscriber };

export const subscriberService = {
  getAll(): Promise<Subscriber[]> {
    return api.get<Subscriber[]>('/api/subscribers');
  },

  subscribe(email: string): Promise<{ message: string }> {
    return api.post<{ message: string }>('/api/subscribe', { email });
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/subscribers/${id}`);
  },
};
