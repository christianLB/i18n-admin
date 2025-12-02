import { useState, useMemo } from 'react';

interface ParentNode {
  key: string;
  name: string;
  children: ParentNode[];
}

interface MoveKeyModalProps {
  currentKey: string;
  currentParentPath: string;
  allParents: string[];
  onMove: (newParentPath: string) => void;
  onClose: () => void;
}

/**
 * Build a tree structure from flat parent keys
 */
function buildParentTree(parentKeys: string[]): ParentNode[] {
  const root: ParentNode[] = [];
  const nodeMap = new Map<string, ParentNode>();

  // Sort by depth to process parents before children
  const sorted = [...parentKeys].sort((a, b) => {
    const depthA = a.split('.').length;
    const depthB = b.split('.').length;
    return depthA - depthB;
  });

  for (const key of sorted) {
    const parts = key.split('.');
    const name = parts[parts.length - 1];
    const node: ParentNode = { key, name, children: [] };
    nodeMap.set(key, node);

    if (parts.length === 1) {
      // Root level
      root.push(node);
    } else {
      // Find parent
      const parentKey = parts.slice(0, -1).join('.');
      const parent = nodeMap.get(parentKey);
      if (parent) {
        parent.children.push(node);
      } else {
        // Parent doesn't exist in our list, treat as root
        root.push(node);
      }
    }
  }

  return root;
}

export function MoveKeyModal({
  currentKey,
  currentParentPath,
  allParents,
  onMove,
  onClose,
}: MoveKeyModalProps) {
  // Track selected path at each column level
  const [selectedPath, setSelectedPath] = useState<string[]>(() => {
    // Initialize with current parent path segments
    if (!currentParentPath) return [];
    return currentParentPath.split('.');
  });

  // Filter out invalid destinations (self and descendants)
  const validParents = useMemo(() => {
    return allParents.filter(
      (p) => p !== currentKey && !p.startsWith(currentKey + '.')
    );
  }, [allParents, currentKey]);

  // Build tree from valid parents
  const tree = useMemo(() => buildParentTree(validParents), [validParents]);

  // Get the currently selected full path
  const selectedFullPath = selectedPath.join('.');

  // Get nodes for each column
  const columns = useMemo(() => {
    const cols: ParentNode[][] = [];

    // First column: root level + "(root)" option
    cols.push(tree);

    // Subsequent columns based on selection
    let currentNodes = tree;
    for (let i = 0; i < selectedPath.length; i++) {
      const segment = selectedPath[i];
      const selected = currentNodes.find((n) => n.name === segment);
      if (selected && selected.children.length > 0) {
        cols.push(selected.children);
        currentNodes = selected.children;
      } else {
        break;
      }
    }

    return cols;
  }, [tree, selectedPath]);

  const handleSelect = (columnIndex: number, node: ParentNode | null) => {
    if (node === null) {
      // Selected "(root)"
      setSelectedPath([]);
    } else {
      // Build new path up to this column + selected node
      const newPath = selectedPath.slice(0, columnIndex);
      newPath.push(node.name);
      setSelectedPath(newPath);
    }
  };

  const handleMove = () => {
    onMove(selectedFullPath);
    onClose();
  };

  const isCurrentLocation = selectedFullPath === currentParentPath;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">
            Move "<span className="font-mono text-blue-600">{currentKey}</span>" to...
          </h2>
        </div>

        {/* Column browser */}
        <div className="flex border-b border-gray-200 overflow-x-auto" style={{ minHeight: '200px', maxHeight: '300px' }}>
          {columns.map((nodes, colIndex) => (
            <div
              key={colIndex}
              className="min-w-[150px] border-r border-gray-200 last:border-r-0 overflow-y-auto"
            >
              {/* Root option only in first column */}
              {colIndex === 0 && (
                <button
                  onClick={() => handleSelect(colIndex, null)}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-blue-50 ${
                    selectedPath.length === 0 ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                  }`}
                >
                  <span className="italic">(root)</span>
                </button>
              )}

              {nodes.map((node) => {
                const isSelected = selectedPath[colIndex] === node.name;
                const hasChildren = node.children.length > 0;
                const isCurrent = node.key === currentParentPath;

                return (
                  <button
                    key={node.key}
                    onClick={() => handleSelect(colIndex, node)}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-blue-50 ${
                      isSelected ? 'bg-blue-100 text-blue-700' : ''
                    } ${isCurrent ? 'font-semibold' : ''}`}
                  >
                    <span className="truncate">{node.name}</span>
                    <span className="flex items-center gap-1">
                      {isCurrent && <span className="text-xs text-gray-400">●</span>}
                      {hasChildren && <span className="text-gray-400">›</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Empty column placeholder */}
          {columns.length < 4 && (
            <div className="flex-1 min-w-[100px] bg-gray-50" />
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="text-gray-400">Destination:</span>{' '}
            <span className="font-mono">
              {selectedFullPath || '(root)'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleMove}
              disabled={isCurrentLocation}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                isCurrentLocation
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Move here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
