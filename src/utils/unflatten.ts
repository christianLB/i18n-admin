import type { FlatLocaleData, LocaleData } from '../types';

/**
 * Converts a flat key-value structure back into a nested object
 * @example
 * unflatten({ "common.ok": "OK" }) => { common: { ok: "OK" } }
 */
export function unflatten(flat: FlatLocaleData): LocaleData {
  const root: LocaleData = {};

  for (const fullKey in flat) {
    const parts = fullKey.split('.');
    let ref: LocaleData = root;

    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        // Last part: assign the value
        ref[part] = flat[fullKey];
      } else {
        // Intermediate part: ensure object exists
        if (!ref[part] || typeof ref[part] !== 'object') {
          ref[part] = {};
        }
        ref = ref[part];
      }
    });
  }

  return root;
}
