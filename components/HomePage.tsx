type HomePageProps = {
  onPropertySelect: (property: any) => void;
  onNavigate: (page: any) => void;
};

export function HomePage({ onPropertySelect, onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1F3B2C] to-[#2d5a42] text-white py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Keyswap
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            The marketplace for short-term rental properties
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('buy')}
              className="px-8 py-4 bg-[#C5A250] text-black font-semibold rounded-lg hover:opacity-90 transition"
            >
              Browse Properties
            </button>
            <button
              onClick={() => onNavigate('sell')}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition"
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-black mb-8">Featured Properties</h2>
        <p className="text-black">No properties available at this time.</p>
      </div>
    </div>
  );
}
