interface EmptyStateProps {
  onAddFirstKey: () => void;
}

export function EmptyState({ onAddFirstKey }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      <div className="text-6xl mb-4">🌐</div>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No translations yet
      </h2>
      <p className="text-gray-500 text-center mb-6 max-w-md">
        Start building your i18n structure by adding your first translation key.
        You can create folders to organize your translations hierarchically.
      </p>
      <button
        onClick={onAddFirstKey}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        + Add first key
      </button>
    </div>
  );
}
