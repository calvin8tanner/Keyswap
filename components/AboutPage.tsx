export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">About Keyswap</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <p className="text-black text-lg">
            Keyswap is the premier marketplace for short-term rental properties.
          </p>
          <div>
            <h3 className="text-2xl font-semibold text-black mb-3">Our Mission</h3>
            <p className="text-gray-700">
              We make it easy to buy and sell income-producing STR properties with verified revenue data and transparent transactions.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-black mb-3">Why Choose Keyswap?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Verified income documentation</li>
              <li>Transparent pricing and valuations</li>
              <li>Expert STR agents</li>
              <li>Streamlined transaction process</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
