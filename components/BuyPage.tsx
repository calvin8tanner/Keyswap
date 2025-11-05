type BuyPageProps = {
  onPropertySelect: (property: any) => void;
};

export function BuyPage({ onPropertySelect }: BuyPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Buy STR Properties</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-black mb-4">Browse our marketplace of verified short-term rental properties.</p>
          <p className="text-gray-600">No properties available at this time.</p>
        </div>
      </div>
    </div>
  );
}
