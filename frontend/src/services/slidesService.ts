import { api } from './api';
import type { Slide, SlideInput } from '../types';

export type { Slide, SlideInput };

export const slidesService = {
  getAll(): Promise<Slide[]> {
    return api.get<Slide[]>('/api/slides');
  },

  create(data: SlideInput): Promise<Slide> {
    return api.post<Slide>('/api/slides', data);
  },

  update(id: number, data: Partial<SlideInput>): Promise<Slide> {
    return api.put<Slide>(`/api/slides/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/slides/${id}`);
  },
};
