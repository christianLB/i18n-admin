import type { TranslationTableProps } from '../../types';
import { TranslationRow } from './TranslationRow';
import { getFlag } from '../../utils';

export function TranslationTable({
  rows,
  languages,
  collapsedKeys,
  onKeyChange,
  onValueChange,
  onDeleteRow,
  onAddChildRow,
  onAddChildParentRow,
  onToggleCollapse,
}: TranslationTableProps) {
  return (
    <div className="relative">
      {/* Mobile scroll hint */}
      <p className="sm:hidden text-xs text-gray-500 mb-1 text-center">
        Swipe to see all columns
      </p>

      <div className="max-h-[70vh] overflow-auto border border-gray-300 rounded -webkit-overflow-scrolling-touch">
        <table className="w-full border-collapse text-xs min-w-[600px]">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-20 bg-gray-100 border border-gray-300 p-2 text-left min-w-[140px] sm:min-w-[200px]"
              >
                Key
              </th>
              {languages.map((lang) => (
                <th
                  key={lang}
                  scope="col"
                  className="sticky top-0 z-10 bg-gray-100 border border-gray-300 p-2 text-left min-w-[120px] sm:min-w-[180px]"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-base">{getFlag(lang)}</span>
                    <span className="uppercase font-semibold">{lang}</span>
                  </span>
                </th>
              ))}
              <th
                scope="col"
                className="sticky top-0 z-10 bg-gray-100 border border-gray-300 p-2 w-16 sm:w-24"
                aria-label="Actions"
              >
                {/* Actions column */}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <TranslationRow
                key={row.key || `new-${index}`}
                row={row}
                rowIndex={index}
                allRows={rows}
                languages={languages}
                isCollapsed={collapsedKeys.has(row.key)}
                onKeyChange={(newKey) => onKeyChange(index, newKey)}
                onValueChange={(lang, value) => onValueChange(index, lang, value)}
                onDelete={() => onDeleteRow(index)}
                onAddChild={() => onAddChildRow(index)}
                onAddChildParent={() => onAddChildParentRow(index)}
                onToggleCollapse={() => onToggleCollapse(row.key)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
