/**
 * Types for i18n Admin application
 */

/**
 * Represents a nested locale object (e.g., { common: { ok: "OK" } })
 */
export type LocaleData = {
  [key: string]: string | LocaleData;
};

/**
 * Flattened representation of locale data
 * e.g., { "common.ok": "OK", "common.cancel": "Cancel" }
 */
export type FlatLocaleData = {
  [key: string]: string;
};

/**
 * Complete locale structure with all languages
 * e.g., { en: {...}, es: {...} }
 */
export type LocalesData = {
  [language: string]: LocaleData;
};

/**
 * A single translation row in the table
 */
export interface TranslationRow {
  key: string; // Full key path (e.g., "common.ok")
  name: string; // Last segment only (e.g., "ok")
  parentPath: string; // Parent path (e.g., "common")
  depth: number; // Nesting level (0 = root)
  isParent: boolean; // true if this key has children (not translatable)
  values: {
    [language: string]: string;
  };
}

/**
 * Props for TranslationRow component
 */
export interface TranslationRowProps {
  row: TranslationRow;
  rowIndex: number;
  allRows: TranslationRow[];
  languages: string[];
  allParentKeys: string[];
  isCollapsed: boolean;
  onKeyChange: (newKey: string) => void;
  onValueChange: (language: string, value: string) => void;
  onDelete: () => void;
  onAddChild: () => void;
  onAddChildParent: () => void;
  onToggleCollapse: () => void;
  onFocus: () => void;
  onMove: (newParentPath: string) => void;
}

/**
 * Props for TranslationTable component
 */
export interface TranslationTableProps {
  rows: TranslationRow[];
  languages: string[];
  allParentKeys: string[];
  collapsedKeys: Set<string>;
  onKeyChange: (index: number, newKey: string) => void;
  onValueChange: (index: number, language: string, value: string) => void;
  onDeleteRow: (index: number) => void;
  onAddChildRow: (index: number) => void;
  onAddChildParentRow: (index: number) => void;
  onToggleCollapse: (key: string) => void;
  onFocusRow: (key: string) => void;
  onMoveRow: (index: number, newParentPath: string) => void;
}

/**
 * Props for Toolbar component
 */
export interface ToolbarProps {
  onAddRow: () => void;
  onExport: () => void;
  isDirty: boolean;
  languages: string[];
  visibleLanguages: string[];
  searchQuery: string;
  focusedKey: string | null;
  onToggleLanguage: (lang: string) => void;
  onSearchChange: (query: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

/**
 * Props for ExportPanel component
 */
export interface ExportPanelProps {
  exportLinks: ExportLink[];
}

/**
 * Represents a downloadable export link
 */
export interface ExportLink {
  language: string;
  href: string;
  filename: string;
}
