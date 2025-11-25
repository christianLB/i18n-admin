/**
 * Language code to flag emoji mapping
 * Uses ISO 639-1 language codes
 */
const FLAGS: Record<string, string> = {
  // Major languages
  en: '🇬🇧',
  'en-us': '🇺🇸',
  'en-gb': '🇬🇧',
  es: '🇪🇸',
  'es-mx': '🇲🇽',
  'es-ar': '🇦🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  it: '🇮🇹',
  pt: '🇵🇹',
  'pt-br': '🇧🇷',
  nl: '🇳🇱',
  ru: '🇷🇺',
  pl: '🇵🇱',
  uk: '🇺🇦',
  cs: '🇨🇿',
  sk: '🇸🇰',
  hu: '🇭🇺',
  ro: '🇷🇴',
  bg: '🇧🇬',
  hr: '🇭🇷',
  sl: '🇸🇮',
  sr: '🇷🇸',
  el: '🇬🇷',
  tr: '🇹🇷',

  // Nordic
  sv: '🇸🇪',
  no: '🇳🇴',
  da: '🇩🇰',
  fi: '🇫🇮',
  is: '🇮🇸',

  // Asian
  zh: '🇨🇳',
  'zh-cn': '🇨🇳',
  'zh-tw': '🇹🇼',
  ja: '🇯🇵',
  ko: '🇰🇷',
  vi: '🇻🇳',
  th: '🇹🇭',
  id: '🇮🇩',
  ms: '🇲🇾',
  tl: '🇵🇭',

  // Middle East / South Asia
  ar: '🇸🇦',
  he: '🇮🇱',
  fa: '🇮🇷',
  hi: '🇮🇳',
  bn: '🇧🇩',
  ta: '🇮🇳',
  ur: '🇵🇰',

  // Other
  ca: '🇪🇸', // Catalan
  eu: '🇪🇸', // Basque
  gl: '🇪🇸', // Galician
  et: '🇪🇪',
  lv: '🇱🇻',
  lt: '🇱🇹',
  af: '🇿🇦',
  sw: '🇰🇪',
};

/**
 * Get flag emoji for a language code
 * @param lang - ISO 639-1 language code (e.g., "en", "es", "fr")
 * @returns Flag emoji or globe emoji if not found
 */
export function getFlag(lang: string): string {
  const normalized = lang.toLowerCase().trim();
  return FLAGS[normalized] ?? '🌐';
}

/**
 * Get flag + language code display string
 * @param lang - ISO 639-1 language code
 * @returns Formatted string like "🇬🇧 EN"
 */
export function getFlagLabel(lang: string): string {
  return `${getFlag(lang)} ${lang.toUpperCase()}`;
}
