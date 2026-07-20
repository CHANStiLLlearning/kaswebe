/**
 * utils/index.ts — barrel export
 *
 * Import any utility from one place:
 *   import { buildQueryString, formatDate, stripStyles } from '../utils';
 */

export { buildQueryString } from './buildQueryString';
export { formatDate, isUpcoming } from './formatDate';
export type { DateFormat } from './formatDate';
export { stripStyles, plainText, truncate } from './stripHtml';
