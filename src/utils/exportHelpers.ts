import type { TranslationRow, FlatLocaleData, LocaleData, ExportLink } from '../types';
import { unflatten } from './unflatten';

/**
 * Converts rows back into flat structure per language
 */
export function buildFlatPerLanguage(
  rows: TranslationRow[],
  languages: string[]
): Record<string, FlatLocaleData> {
  const flatPerLang: Record<string, FlatLocaleData> = {};

  for (const lang of languages) {
    flatPerLang[lang] = {};
  }

  rows.forEach((row) => {
    if (!row.key.trim()) return; // Skip empty keys

    for (const lang of languages) {
      flatPerLang[lang][row.key] = row.values[lang] || '';
    }
  });

  return flatPerLang;
}

/**
 * Generates export links for each language
 */
export function generateExportLinks(
  rows: TranslationRow[],
  languages: string[]
): ExportLink[] {
  const flatPerLang = buildFlatPerLanguage(rows, languages);
  const links: ExportLink[] = [];

  for (const lang of languages) {
    const nested: LocaleData = unflatten(flatPerLang[lang]);
    const json = JSON.stringify(nested, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    links.push({
      language: lang,
      href,
      filename: `${lang}.json`,
    });
  }

  return links;
}

/**
 * Triggers download of a single file
 */
export function downloadFile(href: string, filename: string): void {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Cleanup function to revoke blob URLs
 */
export function revokeExportLinks(links: ExportLink[]): void {
  links.forEach((link) => URL.revokeObjectURL(link.href));
}
