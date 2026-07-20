/**
 * buildQueryString
 *
 * Converts a plain params object into a URL query string.
 * Only defined (non-undefined, non-null, non-empty) values are included.
 *
 * @example
 *   buildQueryString({ search: 'hello', limit: 10 })  // → '?search=hello&limit=10'
 *   buildQueryString({ search: '' })                  // → ''
 *   buildQueryString(undefined)                       // → ''
 */
export function buildQueryString(
  params?: Record<string, string | number | boolean | undefined | null>
): string {
  if (!params) return '';

  const q = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      q.set(key, String(value));
    }
  }

  const str = q.toString();
  return str ? `?${str}` : '';
}
