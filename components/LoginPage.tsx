type LoginPageProps = {
  onNavigate: (page: any) => void;
  onLogin: (user: any, token: string) => void;
};

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stub login
    console.log('Login submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3B2C]"
              required
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3B2C]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#1F3B2C] text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-[#1F3B2C] font-semibold hover:opacity-70"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
