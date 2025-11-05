export function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Help Center</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-black mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-black mb-2">How does Keyswap work?</h4>
              <p className="text-gray-700">
                Keyswap connects buyers and sellers of short-term rental properties with verified income data.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-black mb-2">How do I list my property?</h4>
              <p className="text-gray-700">
                Navigate to the Sell page and provide your property details and income documentation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-black mb-2">What fees does Keyswap charge?</h4>
              <p className="text-gray-700">
                Our fee structure varies based on the transaction. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
