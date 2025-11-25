import type { ExportPanelProps } from '../../types';

export function ExportPanel({ exportLinks }: ExportPanelProps) {
  if (exportLinks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded">
      <h3 className="text-sm font-semibold mb-2">Download translations:</h3>
      <div className="flex flex-wrap gap-2">
        {exportLinks.map((link) => (
          <a
            key={link.language}
            href={link.href}
            download={link.filename}
            className="px-3 py-1 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors"
          >
            📥 {link.filename}
          </a>
        ))}
      </div>
    </div>
  );
}
