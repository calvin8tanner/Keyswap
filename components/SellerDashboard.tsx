type SellerDashboardProps = {
  onNavigate: (page: any) => void;
  onLogout: () => void;
  user: any;
  accessToken: string;
};

export function SellerDashboard({ onNavigate, onLogout, user, accessToken }: SellerDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#1F3B2C] text-white py-6">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Welcome, {user?.name || 'User'}!</h2>
          <p className="text-gray-600">Your seller dashboard will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
