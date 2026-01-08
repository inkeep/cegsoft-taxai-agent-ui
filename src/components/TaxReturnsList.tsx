import type { TaxReturn } from "../types";

interface TaxReturnsListProps {
  taxReturns?: TaxReturn[];
  selectedReturnId: string;
  onSelectReturn: (returnId: string) => void;
  onClearSelection: () => void;
}

export function TaxReturnsList({
  taxReturns,
  selectedReturnId,
  onSelectReturn,
  onClearSelection,
}: TaxReturnsListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Tax Returns</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Click a return to pass its record ID to the agent</span>
          <button
            type="button"
            onClick={onClearSelection}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Clear Selection
          </button>
        </div>
      </div>
      {taxReturns?.length ? (
        <div className="space-y-3">
          {taxReturns.map((taxReturn) => {
            const isSelected = taxReturn.id === selectedReturnId;
            return (
              <button
                key={taxReturn.id}
                onClick={() => onSelectReturn(taxReturn.id)}
                className={`w-full text-left rounded-xl border transition shadow-sm px-5 py-4 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                    : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50/60"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {taxReturn.title}
                    </h3>
                    {isSelected ? (
                      <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                        Selected
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        Select
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{taxReturn.type}</p>
                  <p className="text-sm text-gray-700 break-all">
                    Return ID: {taxReturn.id}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>Tax Year: {taxReturn.taxYear}</span>
                    <span>Last Accessed: {taxReturn.lastAccessed}</span>
                    <span>Created: {taxReturn.created}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No tax returns available for this client.
        </p>
      )}
    </div>
  );
}
