/**
 * stripStyles
 *
 * Strips inline `style="..."` attributes, bare `<span>` wrappers, and
 * common HTML entities from rich-text HTML strings.
 *
 * Useful when rendering dangerouslySetInnerHTML content that comes from
 * a rich-text editor (e.g. Quill, TinyMCE) and you want a clean look
 * without the editor's hardcoded colors or fonts overriding your CSS.
 *
 * @example
 *   stripStyles('<p style="color:red">Hello <span>World</span></p>')
 *   // → '<p>Hello World</p>'
 */
export function stripStyles(html: string | undefined | null): string {
  if (!html) return '';

  return html
    .replace(/ style="[^"]*"/gi, '')                          // remove style="..."
    .replace(/<span\b[^>]*>([^<]*)<\/span>/gi, '$1')         // unwrap <span>text</span>
    .replace(/&amp;nbsp;/g, ' ')                              // &amp;nbsp; → space
    .replace(/&nbsp;/g, ' ')                                  // &nbsp; → space
    .replace(/&nbsp/g, ' ')                                   // &nbsp (no semicolon)
    .replace(/\u00A0/g, ' ');                                 // non-breaking space char
}

/**
 * plainText
 *
 * Strips ALL HTML tags from a string, returning plain text only.
 * Useful for generating meta descriptions or search previews from HTML content.
 *
 * @example
 *   plainText('<p>Hello <strong>World</strong></p>')
 *   // → 'Hello World'
 */
export function plainText(html: string | undefined | null): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * truncate
 *
 * Truncates a string to a maximum length and appends an ellipsis.
 *
 * @example
 *   truncate('Hello World this is a long string', 20)
 *   // → 'Hello World this is…'
 */
export function truncate(text: string | undefined | null, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
