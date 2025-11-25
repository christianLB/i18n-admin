/**
 * Helper functions for working with translation keys
 */

/**
 * Calculate depth of a key based on dots
 * @example getDepth("common.ok") => 1
 * @example getDepth("dashboard") => 0
 */
export function getDepth(key: string): number {
  if (!key) return 0;
  return key.split('.').length - 1;
}

/**
 * Get the parent path of a key
 * @example getParentPath("common.ok") => "common"
 * @example getParentPath("dashboard") => ""
 */
export function getParentPath(key: string): string {
  if (!key) return '';
  const parts = key.split('.');
  if (parts.length === 1) return '';
  return parts.slice(0, -1).join('.');
}

/**
 * Get the last segment (name) of a key
 * @example getKeyName("common.ok") => "ok"
 * @example getKeyName("dashboard") => "dashboard"
 */
export function getKeyName(key: string): string {
  if (!key) return '';
  const parts = key.split('.');
  return parts[parts.length - 1];
}

/**
 * Build full key from parent path and name
 * @example buildKey("common", "ok") => "common.ok"
 * @example buildKey("", "dashboard") => "dashboard"
 */
export function buildKey(parentPath: string, name: string): string {
  if (!parentPath) return name;
  return `${parentPath}.${name}`;
}

/**
 * Create an empty values object for all languages
 * @example createEmptyValues(["en", "fr"]) => { en: "", fr: "" }
 */
export function createEmptyValues(languages: string[]): Record<string, string> {
  return Object.fromEntries(languages.map((lang) => [lang, '']));
}
