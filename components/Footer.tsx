type FooterProps = {
  onNavigate: (page: any) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#C5A250' }}>Keyswap</h3>
            <p className="text-gray-400">The marketplace for short-term rental properties</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('about')} className="block text-gray-400 hover:text-white transition">About</button>
              <button onClick={() => onNavigate('careers')} className="block text-gray-400 hover:text-white transition">Careers</button>
              <button onClick={() => onNavigate('blog')} className="block text-gray-400 hover:text-white transition">Blog</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('help')} className="block text-gray-400 hover:text-white transition">Help Center</button>
              <button onClick={() => onNavigate('contact')} className="block text-gray-400 hover:text-white transition">Contact</button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <button onClick={() => onNavigate('privacy')} className="block text-gray-400 hover:text-white transition">Privacy</button>
              <button onClick={() => onNavigate('terms')} className="block text-gray-400 hover:text-white transition">Terms</button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 Keyswap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
