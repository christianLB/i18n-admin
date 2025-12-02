import type { ToolbarProps } from '../../types';
import { getFlag } from '../../utils';

export function Toolbar({
  onAddRow,
  onExport,
  isDirty,
  languages,
  visibleLanguages,
  searchQuery,
  focusedKey,
  onToggleLanguage,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
}: ToolbarProps) {
  return (
    <div className="mb-4 space-y-3">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search keys or translations..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search translations"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main action buttons - stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddRow}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + Add key
          </button>

          <button
            onClick={onExport}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Export JSON
          </button>

          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              onClick={onExpandAll}
              className="px-3 py-2 text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors border-r border-gray-300"
              title="Expand all folders"
              aria-label="Expand all folders"
            >
              ⊞
            </button>
            <button
              onClick={onCollapseAll}
              className="px-3 py-2 text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors"
              title="Collapse all folders"
              aria-label="Collapse all folders"
            >
              ⊟
            </button>
          </div>
        </div>

        {focusedKey && (
          <div className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded truncate max-w-xs" title={focusedKey}>
            📍 {focusedKey}
          </div>
        )}

        {isDirty && (
          <span className="text-sm text-red-600 font-medium" role="status" aria-live="polite">
            * unsaved changes
          </span>
        )}
      </div>

      {/* Language visibility toggles - wrap on mobile */}
      <fieldset className="p-2 bg-gray-50 border border-gray-200 rounded">
        <legend className="sr-only">Toggle language visibility</legend>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <span className="text-sm font-medium text-gray-700">Languages:</span>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {languages.map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={visibleLanguages.includes(lang)}
                  onChange={() => onToggleLanguage(lang)}
                  className="w-4 h-4 cursor-pointer"
                  aria-label={`Show ${lang} column`}
                />
                <span className="text-base">{getFlag(lang)}</span>
                <span className="text-sm font-medium uppercase select-none">
                  {lang}
                </span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>
    </div>
  );
}
