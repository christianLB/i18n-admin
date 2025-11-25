import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TranslationRow, LocalesData, ExportLink } from '../types';
import {
  generateExportLinks,
  revokeExportLinks,
  buildKey,
  extractRowsFromNestedData,
  createEmptyValues,
} from '../utils';

interface UseTranslationsReturn {
  rows: TranslationRow[];
  filteredRows: TranslationRow[];
  languages: string[];
  visibleLanguages: string[];
  isDirty: boolean;
  exportLinks: ExportLink[];
  searchQuery: string;
  collapsedKeys: Set<string>;
  addRow: () => void;
  addChildRow: (parentIndex: number) => void;
  addChildParentRow: (parentIndex: number) => void;
  deleteRow: (index: number) => void;
  updateKey: (index: number, newKey: string) => void;
  updateValue: (index: number, language: string, value: string) => void;
  toggleLanguageVisibility: (lang: string) => void;
  generateExports: () => void;
  setSearchQuery: (query: string) => void;
  toggleCollapse: (key: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

/**
 * Custom hook to manage translation rows state and operations
 */
export function useTranslations(
  initialLocales: LocalesData
): UseTranslationsReturn {
  const [languages] = useState<string[]>(() => Object.keys(initialLocales));
  const [visibleLanguages, setVisibleLanguages] = useState<string[]>(() => Object.keys(initialLocales));
  // Initialize rows synchronously from initial data
  const [rows, setRows] = useState<TranslationRow[]>(() =>
    extractRowsFromNestedData(initialLocales)
  );
  const [isDirty, setIsDirty] = useState(false);
  const [exportLinks, setExportLinks] = useState<ExportLink[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedKeys, setCollapsedKeys] = useState<Set<string>>(new Set());

  // Cleanup export links on unmount
  useEffect(() => {
    return () => {
      if (exportLinks.length > 0) {
        revokeExportLinks(exportLinks);
      }
    };
  }, [exportLinks]);

  const markDirty = useCallback(() => {
    setIsDirty(true);
  }, []);

  // Toggle collapse state for a parent key
  const toggleCollapse = useCallback((key: string) => {
    setCollapsedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Expand all parents
  const expandAll = useCallback(() => {
    setCollapsedKeys(new Set());
  }, []);

  // Collapse all parents
  const collapseAll = useCallback(() => {
    const parentKeys = rows
      .filter((row) => row.isParent && row.key)
      .map((row) => row.key);
    setCollapsedKeys(new Set(parentKeys));
  }, [rows]);

  // Filter rows based on search and collapse state
  const filteredRows = useMemo(() => {
    let result = rows;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((row) => {
        // Match key
        if (row.key.toLowerCase().includes(query)) return true;
        // Match any translation value
        return Object.values(row.values).some((val) =>
          val.toLowerCase().includes(query)
        );
      });
      // When searching, don't apply collapse - show all matches
      return result;
    }

    // Apply collapse filter (only when not searching)
    result = result.filter((row) => {
      // Check if any ancestor is collapsed
      for (const collapsedKey of collapsedKeys) {
        if (row.parentPath === collapsedKey || row.parentPath.startsWith(collapsedKey + '.')) {
          return false;
        }
      }
      return true;
    });

    return result;
  }, [rows, searchQuery, collapsedKeys]);

  const toggleLanguageVisibility = useCallback((lang: string) => {
    setVisibleLanguages((prev) => {
      if (prev.includes(lang)) {
        // Don't allow hiding all languages
        if (prev.length === 1) return prev;
        return prev.filter((l) => l !== lang);
      } else {
        return [...prev, lang];
      }
    });
  }, []);

  const addRow = useCallback(() => {
    const values = createEmptyValues(languages);
    setRows((prev) => [
      ...prev,
      { key: '', name: '', parentPath: '', depth: 0, isParent: true, values },
    ]);
    markDirty();
  }, [languages, markDirty]);

  // Helper to find actual index in rows array from filtered row
  const getActualIndex = useCallback(
    (filteredIndex: number): number => {
      const filteredRow = filteredRows[filteredIndex];
      return rows.findIndex((r) => r === filteredRow);
    },
    [rows, filteredRows]
  );

  const addChildRow = useCallback(
    (filteredIndex: number) => {
      const actualIndex = getActualIndex(filteredIndex);
      const parent = rows[actualIndex];
      const values = createEmptyValues(languages);
      const newRow: TranslationRow = {
        key: `${parent.key}.`,
        name: '',
        parentPath: parent.key,
        depth: parent.depth + 1,
        isParent: false, // Children are leafs by default
        values,
      };
      // Insert right after parent
      setRows((prev) => [
        ...prev.slice(0, actualIndex + 1),
        newRow,
        ...prev.slice(actualIndex + 1),
      ]);
      // Expand parent if collapsed
      if (collapsedKeys.has(parent.key)) {
        setCollapsedKeys((prev) => {
          const next = new Set(prev);
          next.delete(parent.key);
          return next;
        });
      }
      markDirty();
    },
    [rows, languages, markDirty, getActualIndex, collapsedKeys]
  );

  const addChildParentRow = useCallback(
    (filteredIndex: number) => {
      const actualIndex = getActualIndex(filteredIndex);
      const parent = rows[actualIndex];
      const values = createEmptyValues(languages);
      const newRow: TranslationRow = {
        key: `${parent.key}.`,
        name: '',
        parentPath: parent.key,
        depth: parent.depth + 1,
        isParent: true, // Nested parent (folder)
        values,
      };
      // Insert right after parent
      setRows((prev) => [
        ...prev.slice(0, actualIndex + 1),
        newRow,
        ...prev.slice(actualIndex + 1),
      ]);
      // Expand parent if collapsed
      if (collapsedKeys.has(parent.key)) {
        setCollapsedKeys((prev) => {
          const next = new Set(prev);
          next.delete(parent.key);
          return next;
        });
      }
      markDirty();
    },
    [rows, languages, markDirty, getActualIndex, collapsedKeys]
  );

  const deleteRow = useCallback(
    (filteredIndex: number) => {
      const actualIndex = getActualIndex(filteredIndex);
      setRows((prev) => prev.filter((_, i) => i !== actualIndex));
      markDirty();
    },
    [markDirty, getActualIndex]
  );

  const updateKey = useCallback(
    (filteredIndex: number, newName: string) => {
      const actualIndex = getActualIndex(filteredIndex);
      setRows((prev) => {
        const updated = [...prev];
        const row = updated[actualIndex];
        const newKey = buildKey(row.parentPath, newName);
        updated[actualIndex] = {
          ...row,
          key: newKey,
          name: newName,
        };
        return updated;
      });
      markDirty();
    },
    [markDirty, getActualIndex]
  );

  const updateValue = useCallback(
    (filteredIndex: number, language: string, value: string) => {
      const actualIndex = getActualIndex(filteredIndex);
      setRows((prev) => {
        const updated = [...prev];
        updated[actualIndex] = {
          ...updated[actualIndex],
          values: {
            ...updated[actualIndex].values,
            [language]: value,
          },
        };
        return updated;
      });
      markDirty();
    },
    [markDirty, getActualIndex]
  );

  const generateExports = useCallback(() => {
    // Revoke previous links
    if (exportLinks.length > 0) {
      revokeExportLinks(exportLinks);
    }

    // Generate new export links (always from full rows, not filtered)
    const newLinks = generateExportLinks(rows, languages);
    setExportLinks(newLinks);
    setIsDirty(false);
  }, [rows, languages, exportLinks]);

  return {
    rows,
    filteredRows,
    languages,
    visibleLanguages,
    isDirty,
    exportLinks,
    searchQuery,
    collapsedKeys,
    addRow,
    addChildRow,
    addChildParentRow,
    deleteRow,
    updateKey,
    updateValue,
    toggleLanguageVisibility,
    generateExports,
    setSearchQuery,
    toggleCollapse,
    expandAll,
    collapseAll,
  };
}
