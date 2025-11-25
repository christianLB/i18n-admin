import type { TranslationRowProps } from '../../types';
import { getRowError } from '../../utils';

export function TranslationRow({
  row,
  rowIndex,
  allRows,
  languages,
  isCollapsed,
  onKeyChange,
  onValueChange,
  onDelete,
  onAddChild,
  onAddChildParent,
  onToggleCollapse,
}: TranslationRowProps) {
  const indentPx = row.depth * 16; // 16px per level
  const keyError = getRowError(row, allRows, rowIndex);
  const hasKeyError = keyError !== null;

  const handleDelete = () => {
    const message = row.isParent
      ? `Delete "${row.key || 'this folder'}" and all its children?`
      : `Delete "${row.key || 'this key'}"?`;

    if (window.confirm(message)) {
      onDelete();
    }
  };

  // Common key input styling based on validation
  const keyInputBaseClass = "flex-1 px-2 py-1 text-xs border rounded focus:outline-none focus:ring-2";
  const keyInputValidClass = hasKeyError
    ? "border-red-300 bg-red-50 focus:ring-red-500"
    : "border-gray-300 focus:ring-blue-500";

  if (row.isParent) {
    // PARENT ROW: Only show key, no translation inputs, with collapse and + buttons
    return (
      <tr className="bg-gray-50">
        {/* Key cell */}
        <td className="border border-gray-300 p-1">
          <div className="flex flex-col gap-1" style={{ paddingLeft: `${indentPx}px` }}>
            <div className="flex items-center gap-1">
              {/* Collapse toggle button */}
              <button
                onClick={onToggleCollapse}
                className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                aria-label={isCollapsed ? 'Expand folder' : 'Collapse folder'}
                title={isCollapsed ? 'Expand' : 'Collapse'}
              >
                {isCollapsed ? '▶' : '▼'}
              </button>
              <input
                type="text"
                value={row.name}
                onChange={(e) => onKeyChange(e.target.value)}
                className={`${keyInputBaseClass} ${keyInputValidClass} font-semibold`}
                placeholder="parent-key"
              />
            </div>
            {hasKeyError && (
              <span className="text-xs text-red-600 ml-6">{keyError}</span>
            )}
          </div>
        </td>

        {/* Language cells - no inputs for parents */}
        {languages.map((lang) => (
          <td key={lang} className="border border-gray-300 p-1 bg-gray-100">
            <span className="text-xs text-gray-400 italic px-2">— parent —</span>
          </td>
        ))}

        {/* Actions cell - buttons for parents */}
        <td className="border border-gray-300 p-1 text-center">
          <div className="flex gap-1 justify-center">
            <button
              onClick={onAddChildParent}
              className="px-2 py-1 text-xs hover:bg-yellow-100 rounded transition-colors"
              aria-label="Add nested folder"
              title="Add nested folder"
            >
              📁
            </button>
            <button
              onClick={onAddChild}
              className="px-2 py-1 text-xs hover:bg-green-100 rounded transition-colors"
              aria-label="Add translation key"
              title="Add translation key"
            >
              🔤
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-xs hover:bg-red-50 rounded transition-colors"
              aria-label="Delete folder"
              title="Delete folder"
            >
              🗑
            </button>
          </div>
        </td>
      </tr>
    );
  }

  // LEAF ROW: Show translation inputs, with delete button
  return (
    <tr>
      {/* Key cell */}
      <td className="border border-gray-300 p-1">
        <div className="flex flex-col gap-1" style={{ paddingLeft: `${indentPx + 20}px` }}>
          <input
            type="text"
            value={row.name}
            onChange={(e) => onKeyChange(e.target.value)}
            className={`${keyInputBaseClass} ${keyInputValidClass}`}
            placeholder="key"
          />
          {hasKeyError && (
            <span className="text-xs text-red-600">{keyError}</span>
          )}
        </div>
      </td>

      {/* Language cells - translation inputs for leafs */}
      {languages.map((lang) => {
        const value = row.values[lang] || '';
        const isMissing = !value.trim();

        return (
          <td key={lang} className="border border-gray-300 p-1">
            <input
              type="text"
              value={value}
              onChange={(e) => onValueChange(lang, e.target.value)}
              className={`w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isMissing
                  ? 'bg-red-50 border-red-300 placeholder-red-400'
                  : 'border-gray-300'
              }`}
              placeholder={isMissing ? 'Missing translation' : ''}
            />
          </td>
        );
      })}

      {/* Actions cell - only delete button for leafs */}
      <td className="border border-gray-300 p-1 text-center">
        <button
          onClick={handleDelete}
          className="px-2 py-1 text-sm hover:bg-red-50 rounded transition-colors"
          aria-label="Delete key"
          title="Delete key"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}
