type PropertyDetailProps = {
  property: any;
  onBack: () => void;
};

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={onBack}
          className="mb-6 text-[#1F3B2C] hover:opacity-70 transition font-semibold"
        >
          &larr; Back to Results
        </button>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-black mb-4">Property Details</h1>
          <p className="text-gray-600">Property information will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
