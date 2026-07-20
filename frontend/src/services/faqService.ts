import { api } from './api';
import type { FAQ, FAQInput } from '../types';

export type { FAQ, FAQInput };

export const faqService = {
  getAll(): Promise<FAQ[]> {
    return api.get<FAQ[]>('/api/faqs');
  },

  create(data: FAQInput): Promise<FAQ> {
    return api.post<FAQ>('/api/faqs', data);
  },

  update(id: number, data: Partial<FAQInput>): Promise<FAQ> {
    return api.put<FAQ>(`/api/faqs/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/faqs/${id}`);
  },
};
