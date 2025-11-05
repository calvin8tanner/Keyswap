type HeaderProps = {
  currentPage: string;
  onNavigate: (page: any) => void;
};

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold cursor-pointer"
            style={{ color: '#1F3B2C' }}
          >
            Keyswap
          </div>
          <nav className="flex gap-8">
            <button
              onClick={() => onNavigate('buy')}
              className={`text-black hover:opacity-70 transition ${currentPage === 'buy' ? 'font-semibold' : ''}`}
            >
              Buy
            </button>
            <button
              onClick={() => onNavigate('sell')}
              className={`text-black hover:opacity-70 transition ${currentPage === 'sell' ? 'font-semibold' : ''}`}
            >
              Sell
            </button>
            <button
              onClick={() => onNavigate('agents')}
              className={`text-black hover:opacity-70 transition ${currentPage === 'agents' ? 'font-semibold' : ''}`}
            >
              Find Agent
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
