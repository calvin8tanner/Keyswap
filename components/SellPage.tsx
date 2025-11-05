export function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Sell Your STR Property</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-black mb-4">List your short-term rental property on our marketplace.</p>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Why Sell with Keyswap?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Verified buyers looking for STR investments</li>
                <li>Income-based valuations</li>
                <li>Fast, transparent transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
