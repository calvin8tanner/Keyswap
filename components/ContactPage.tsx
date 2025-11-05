export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-black font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3B2C]"
                  required
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3B2C]"
                  required
                />
              </div>
              <div>
                <label className="block text-black font-semibold mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3B2C] h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1F3B2C] text-white font-semibold rounded-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-black mb-4">Contact Information</h3>
            <div className="space-y-4 text-gray-700">
              <p>Email: support@keyswap.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Main Street, Suite 100, San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
