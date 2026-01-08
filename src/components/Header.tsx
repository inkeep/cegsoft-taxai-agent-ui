export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          CEGsoft TaxesAI Assistant
        </span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">
        AI Tax Assistant
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
        Ask questions about your tax returns, Form 482, and Puerto Rico tax
        regulations.
      </p>
    </div>
  );
}
