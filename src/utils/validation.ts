import type { TranslationRow } from '../types';

/**
 * Allowed characters in translation keys:
 * - Letters (a-z, A-Z)
 * - Numbers (0-9)
 * - Dots (.) for nesting
 * - Underscores (_) and hyphens (-) for readability
 */
const KEY_PATTERN = /^[a-zA-Z0-9._-]+$/;

/**
 * Check if a key name is valid (without the parent path)
 * @example isValidKeyName("ok") => true
 * @example isValidKeyName("hello world") => false (spaces not allowed)
 * @example isValidKeyName("") => false (empty not allowed)
 */
export function isValidKeyName(name: string): boolean {
  const trimmed = name.trim();
  if (!trimmed) return false;
  // Key name shouldn't contain dots (those are for nesting)
  if (trimmed.includes('.')) return false;
  return /^[a-zA-Z0-9_-]+$/.test(trimmed);
}

/**
 * Check if a full key is valid
 * @example isValidKey("common.ok") => true
 * @example isValidKey("") => false
 * @example isValidKey("common..ok") => false (double dots)
 */
export function isValidKey(key: string): boolean {
  const trimmed = key.trim();
  if (!trimmed) return false;
  // Check for double dots or leading/trailing dots
  if (/\.\./.test(trimmed) || trimmed.startsWith('.') || trimmed.endsWith('.')) {
    return false;
  }
  return KEY_PATTERN.test(trimmed);
}

/**
 * Check if a key already exists in the rows (duplicate detection)
 * @param key - The key to check
 * @param rows - All translation rows
 * @param currentIndex - Current row index (to exclude self from check)
 */
export function isDuplicateKey(
  key: string,
  rows: TranslationRow[],
  currentIndex: number
): boolean {
  if (!key.trim()) return false;
  return rows.some(
    (row, index) => index !== currentIndex && row.key === key.trim()
  );
}

/**
 * Get validation error message for a key name
 * Returns null if key is valid
 */
export function getKeyNameError(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return 'Key name cannot be empty';
  }

  if (trimmed.includes('.')) {
    return 'Key name cannot contain dots';
  }

  if (/\s/.test(trimmed)) {
    return 'Key name cannot contain spaces';
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return 'Key name can only contain letters, numbers, _ and -';
  }

  return null;
}

/**
 * Get full validation error for a row
 * Returns null if row is valid
 */
export function getRowError(
  row: TranslationRow,
  rows: TranslationRow[],
  currentIndex: number
): string | null {
  // Check key name validity
  const nameError = getKeyNameError(row.name);
  if (nameError) return nameError;

  // Check for duplicates
  if (isDuplicateKey(row.key, rows, currentIndex)) {
    return 'Duplicate key exists';
  }

  return null;
}
