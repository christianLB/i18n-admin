import type { LocaleData, LocalesData, TranslationRow } from '../types';
import { getDepth, getParentPath, getKeyName } from './keyHelpers';

/**
 * Extracts TranslationRow[] from nested locale data
 * Detects parents (objects) and leafs (strings)
 */
export function extractRowsFromNestedData(
  localesData: LocalesData
): TranslationRow[] {
  const languages = Object.keys(localesData);
  const rowsMap = new Map<string, TranslationRow>();

  // Process each language
  for (const lang of languages) {
    processNestedObject(localesData[lang], '', lang, rowsMap, languages);
  }

  // Convert map to sorted array
  return Array.from(rowsMap.values()).sort((a, b) => a.key.localeCompare(b.key));
}

/**
 * Recursively process nested object and populate rows
 */
function processNestedObject(
  obj: LocaleData,
  parentPath: string,
  currentLang: string,
  rowsMap: Map<string, TranslationRow>,
  allLanguages: string[]
): void {
  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentPath ? `${parentPath}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // This is a PARENT node
      ensureParentRow(fullKey, rowsMap, allLanguages);
      // Recurse into children
      processNestedObject(value as LocaleData, fullKey, currentLang, rowsMap, allLanguages);
    } else {
      // This is a LEAF node (translatable)
      ensureLeafRow(fullKey, rowsMap, allLanguages);
      // Set translation value for current language
      const row = rowsMap.get(fullKey)!;
      row.values[currentLang] = String(value);
    }
  }
}

/**
 * Ensure a parent row exists in the map
 */
function ensureParentRow(
  fullKey: string,
  rowsMap: Map<string, TranslationRow>,
  languages: string[]
): void {
  if (!rowsMap.has(fullKey)) {
    const values: Record<string, string> = {};
    for (const lang of languages) {
      values[lang] = ''; // Parents have no translations
    }

    rowsMap.set(fullKey, {
      key: fullKey,
      name: getKeyName(fullKey),
      parentPath: getParentPath(fullKey),
      depth: getDepth(fullKey),
      isParent: true,
      values,
    });
  }
}

/**
 * Ensure a leaf row exists in the map
 */
function ensureLeafRow(
  fullKey: string,
  rowsMap: Map<string, TranslationRow>,
  languages: string[]
): void {
  if (!rowsMap.has(fullKey)) {
    const values: Record<string, string> = {};
    for (const lang of languages) {
      values[lang] = '';
    }

    rowsMap.set(fullKey, {
      key: fullKey,
      name: getKeyName(fullKey),
      parentPath: getParentPath(fullKey),
      depth: getDepth(fullKey),
      isParent: false,
      values,
    });
  }
}
