interface ErrorScreenProps {
  error: string;
  onRetry: () => void;
}

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              CEGsoft TaxesAI Demo
            </h1>
            <p className="text-lg text-gray-600">Authentication Error</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-red-500 text-5xl">⚠️</div>
              <p className="text-red-600 font-semibold text-center">{error}</p>
              <button
                onClick={onRetry}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
