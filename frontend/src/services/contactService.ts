import { api } from './api';
import type { ContactMessage, ContactInput } from '../types';

export type { ContactMessage, ContactInput };

export const contactService = {
  getAll(): Promise<ContactMessage[]> {
    return api.get<ContactMessage[]>('/api/contact');
  },

  send(data: ContactInput): Promise<ContactMessage> {
    return api.post<ContactMessage>('/api/contact', data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/contact/${id}`);
  },
};
