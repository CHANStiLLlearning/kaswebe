/**
 * formatDate
 *
 * Formats a raw date string (ISO or YYYY-MM-DD) into a human-readable string.
 * Returns the original string as a fallback if the date is unparseable.
 *
 * @example
 *   formatDate('2026-07-20')              // → 'July 20, 2026'
 *   formatDate('2026-07-20', 'short')     // → 'Jul 20, 2026'
 *   formatDate('2026-07-20', 'numeric')   // → '07/20/2026'
 *   formatDate('2026-07-20', 'relative')  // → 'Today' | 'Yesterday' | '3 days ago' | …
 */
export type DateFormat = 'long' | 'short' | 'numeric' | 'relative';

export function formatDate(
  dateString: string | undefined | null,
  format: DateFormat = 'long'
): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Fallback: return as-is

  if (format === 'relative') {
    return toRelative(date);
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : format === 'short'
      ? { year: 'numeric', month: 'short', day: 'numeric' }
      : { year: 'numeric', month: '2-digit', day: '2-digit' };

  return date.toLocaleDateString('en-US', options);
}

function toRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? 's' : ''} ago`;
}

/**
 * isUpcoming
 *
 * Returns true if the given date string is in the future (today or later).
 */
export function isUpcoming(dateString: string): boolean {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date >= today;
}
