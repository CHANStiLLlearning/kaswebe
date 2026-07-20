import { api } from './api';
import type { Program, ProgramInput } from '../types';

export type { Program, ProgramInput };

export const programService = {
  getAll(): Promise<Program[]> {
    return api.get<Program[]>('/api/programs');
  },

  create(data: ProgramInput): Promise<Program> {
    return api.post<Program>('/api/programs', data);
  },

  update(id: number, data: Partial<ProgramInput>): Promise<Program> {
    return api.put<Program>(`/api/programs/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/programs/${id}`);
  },
};
