import { api } from './api';
import type { FacultyMember, FacultyInput, FacultyParams } from '../types';
import { buildQueryString } from '../utils';

export type { FacultyMember, FacultyInput, FacultyParams };

export const facultyService = {
  getAll(params?: FacultyParams): Promise<FacultyMember[]> {
    return api.get<FacultyMember[]>(`/api/teachers${buildQueryString(params)}`);
  },


  create(data: FacultyInput): Promise<FacultyMember> {
    return api.post<FacultyMember>('/api/teachers', data);
  },

  update(id: number, data: Partial<FacultyInput>): Promise<FacultyMember> {
    return api.put<FacultyMember>(`/api/teachers/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/teachers/${id}`);
  },
};
