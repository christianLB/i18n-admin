import { useState, useMemo } from 'react';

interface SnippetModalProps {
  parentKey: string;
  childKeys: string[];
  onClose: () => void;
}

function toUpperSnakeCase(str: string): string {
  return str
    .replace(/-/g, '_')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toUpperCase();
}

function generateSnippet(
  parentKey: string,
  childKeys: string[],
  useKeyPrefix: boolean
): string {
  if (childKeys.length === 0) {
    return '// No translation keys found';
  }

  const lines = childKeys.map((fullKey) => {
    const name = toUpperSnakeCase(fullKey.split('.').pop()!);
    const value = useKeyPrefix
      ? fullKey.slice(parentKey.length + 1) // remove parent prefix + dot
      : fullKey;
    return `  ${name}: '${value}',`;
  });

  const keysBlock = `const keys = {\n${lines.join('\n')}\n};`;

  if (useKeyPrefix) {
    return `const { t } = useTranslation('${parentKey}');\n\n${keysBlock}`;
  }
  return keysBlock;
}

export function SnippetModal({
  parentKey,
  childKeys,
  onClose,
}: SnippetModalProps) {
  const [useKeyPrefix, setUseKeyPrefix] = useState(true);
  const [copied, setCopied] = useState(false);

  const snippet = useMemo(
    () => generateSnippet(parentKey, childKeys, useKeyPrefix),
    [parentKey, childKeys, useKeyPrefix]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-xl w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">
            Code snippet for{' '}
            <span className="font-mono text-blue-600">"{parentKey}"</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Options */}
        <div className="px-4 py-3 border-b border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useKeyPrefix}
              onChange={(e) => setUseKeyPrefix(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Use keyPrefix with useTranslation
            </span>
          </label>
        </div>

        {/* Code */}
        <div className="p-4 bg-gray-900 max-h-80 overflow-auto">
          <pre className="text-sm text-gray-100 font-mono whitespace-pre">
            {snippet}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {childKeys.length} key{childKeys.length !== 1 ? 's' : ''}
          </span>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy to clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}
