import { api } from './api';
import type { NewsArticle, NewsInput, NewsParams } from '../types';
import { buildQueryString } from '../utils';

export type { NewsArticle, NewsInput, NewsParams };

export const newsService = {
  getAll(params?: NewsParams): Promise<NewsArticle[]> {
    return api.get<NewsArticle[]>(`/api/news${buildQueryString(params)}`);
  },

  create(data: NewsInput): Promise<NewsArticle> {
    return api.post<NewsArticle>('/api/news', data);
  },

  update(id: number, data: Partial<NewsInput>): Promise<NewsArticle> {
    return api.put<NewsArticle>(`/api/news/${id}`, data);
  },

  delete(id: number): Promise<void> {
    return api.del(`/api/news/${id}`);
  },
};
