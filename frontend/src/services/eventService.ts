import { api } from './api';
import type { SchoolEvent, EventInput, EventParams } from '../types';
import { buildQueryString } from '../utils';

export type { SchoolEvent, EventInput, EventParams };

export const eventService = {
  getAll(params?: EventParams): Promise<SchoolEvent[]> {
    return api.get<SchoolEvent[]>(`/api/events${buildQueryString(params)}`);
  },

  create(data: EventInput): Promise<SchoolEvent> {
    return api.post<SchoolEvent>('/api/events', data);
  },

  update(id: number, data: Partial<EventInput>): Promise<SchoolEvent> {
    return api.put<SchoolEvent>(`/api/events/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/events/${id}`);
  },
};
