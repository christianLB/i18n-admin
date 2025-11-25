import type { LocaleData, FlatLocaleData } from '../types';

/**
 * Flattens a nested locale object into a flat key-value structure
 * @example
 * flatten({ common: { ok: "OK" } }) => { "common.ok": "OK" }
 */
export function flatten(obj: LocaleData, prefix = ''): FlatLocaleData {
  const out: FlatLocaleData = {};

  if (!obj || typeof obj !== 'object') {
    return out;
  }

  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (val && typeof val === 'object' && !Array.isArray(val)) {
      // Recursively flatten nested objects
      Object.assign(out, flatten(val as LocaleData, fullKey));
    } else {
      // Convert value to string
      out[fullKey] = String(val);
    }
  }

  return out;
}
