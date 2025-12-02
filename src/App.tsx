import { useState, useCallback } from 'react';
import { useTranslations } from './hooks/useTranslations';
import { initialLocales } from './data/initialLocales';
import { TranslationTable } from './components/TranslationTable';
import { Toolbar } from './components/Toolbar';
import { ExportPanel } from './components/ExportPanel';
import { EmptyState } from './components/EmptyState';
import { Toast } from './components/Toast';

function App() {
  const {
    filteredRows,
    languages,
    visibleLanguages,
    isDirty,
    exportLinks,
    searchQuery,
    collapsedKeys,
    focusedKey,
    addRow,
    addChildRow,
    addChildParentRow,
    deleteRow,
    updateKey,
    updateValue,
    moveRow,
    toggleLanguageVisibility,
    generateExports,
    setSearchQuery,
    toggleCollapse,
    expandAll,
    collapseAll,
    setFocusedKey,
    getParentKeys,
  } = useTranslations(initialLocales);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleExport = useCallback(() => {
    generateExports();
    setToast({
      message: `Exported ${languages.length} language${languages.length > 1 ? 's' : ''} successfully`,
      type: 'success',
    });
  }, [generateExports, languages.length]);

  const closeToast = useCallback(() => setToast(null), []);

  const isEmpty = filteredRows.length === 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          i18n Admin
        </h1>

        <Toolbar
          onAddRow={addRow}
          onExport={handleExport}
          isDirty={isDirty}
          languages={languages}
          visibleLanguages={visibleLanguages}
          searchQuery={searchQuery}
          focusedKey={focusedKey}
          onToggleLanguage={toggleLanguageVisibility}
          onSearchChange={setSearchQuery}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
        />

        {isEmpty ? (
          isSearching ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-2">🔍</p>
              <p>No results found for "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-blue-600 hover:text-blue-700 underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <EmptyState onAddFirstKey={addRow} />
          )
        ) : (
          <TranslationTable
            rows={filteredRows}
            languages={visibleLanguages}
            allParentKeys={getParentKeys()}
            collapsedKeys={collapsedKeys}
            onKeyChange={updateKey}
            onValueChange={updateValue}
            onDeleteRow={deleteRow}
            onAddChildRow={addChildRow}
            onAddChildParentRow={addChildParentRow}
            onToggleCollapse={toggleCollapse}
            onFocusRow={setFocusedKey}
            onMoveRow={moveRow}
          />
        )}

        <ExportPanel exportLinks={exportLinks} />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}

export default App;
