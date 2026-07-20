/**
 * Central type definitions for all data models.
 * Import from here instead of defining types inside service files.
 *
 * Usage:
 *   import type { Program, NewsArticle } from '../types';
 */

// ─── Common ──────────────────────────────────────────────────────────────────

/** Generic helper: any model that has an auto-generated numeric id. */
export type WithId<T> = T & { id: number };

/** Generic API response wrapper (used when the backend wraps data). */
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

// ─── Settings ─────────────────────────────────────────────────────────────────

/** Key-value map of school-wide settings (e.g. schoolName, phone, address). */
export type Settings = Record<string, string>;

// ─── Slides (Hero Banner) ─────────────────────────────────────────────────────

export type Slide = {
  id: number;
  image: string;
  tag: string;
  title: string;
  description: string;
  iconName: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
};

export type SlideInput = Omit<Slide, 'id'>;

// ─── Programs ─────────────────────────────────────────────────────────────────

export type Program = {
  id: number;
  title: string;
  description: string;
  path: string;
  iconName: string;
  colorClass: string;
  ageRange?: string;
  gradeLevel?: string;
  image?: string;
};

export type ProgramInput = Omit<Program, 'id'>;

// ─── Features (Key Features / Why Choose Us) ─────────────────────────────────

export type Feature = {
  id: number;
  title: string;
  description: string;
  iconName?: string;
  colorClass?: string;
};

export type FeatureInput = Omit<Feature, 'id'>;

// ─── News ─────────────────────────────────────────────────────────────────────

export type NewsArticle = {
  id: number;
  title: string;
  image: string;
  date: string;
  description: string;
  createdAt: string;
};

export type NewsInput = Omit<NewsArticle, 'id' | 'createdAt'>;

/** Query params accepted by the news list endpoint. */
export type NewsParams = {
  search?: string;
  limit?: number;
};

// ─── Events ───────────────────────────────────────────────────────────────────

export type SchoolEvent = {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image?: string;
  status?: string;
  badge?: string;
  createdAt: string;
};

export type EventInput = Omit<SchoolEvent, 'id' | 'createdAt'>;

/** Query params accepted by the events list endpoint. */
export type EventParams = {
  search?: string;
  date?: string;
  limit?: number;
};

// ─── Faculty / Teachers ───────────────────────────────────────────────────────

export type FacultyMember = {
  id: number;
  name: string;
  title?: string;
  subject?: string;
  image?: string;
  createdAt?: string;
};

export type FacultyInput = Omit<FacultyMember, 'id' | 'createdAt'>;

export type FacultyParams = {
  limit?: number;
};

// ─── Partners ─────────────────────────────────────────────────────────────────

export type Partner = {
  id: number;
  name: string;
  logo: string;
};

export type PartnerInput = Omit<Partner, 'id'>;

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export type FAQ = {
  id: number;
  question: string;
  answer_kh: string;
  answer_en: string;
};

export type FAQInput = Omit<FAQ, 'id'>;

// ─── Contact ──────────────────────────────────────────────────────────────────

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
};

export type ContactInput = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

// ─── Subscribers ──────────────────────────────────────────────────────────────

export type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
};
