import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, MapPin, TrendingUp, DollarSign } from 'lucide-react';

interface HeroSearchProps {
  onNavigate?: (page: 'buy') => void;
  onSearch?: (query: string) => void;
}

export function HeroSearch({ onNavigate, onSearch }: HeroSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const popularLocations = [
    'Miami, FL',
    'Austin, TX', 
    'Nashville, TN',
    'Orlando, FL'
  ];

  const stats = [
    { icon: TrendingUp, label: 'Avg ROI', value: '12.8%' },
    { icon: DollarSign, label: 'Avg Nightly', value: '$185' },
    { icon: MapPin, label: 'Properties', value: '2,847' }
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    if (onNavigate) {
      onNavigate('buy');
    }
  };

  const handleLocationClick = (location: string) => {
    setSearchQuery(location);
    if (onSearch) {
      onSearch(location);
    }
    if (onNavigate) {
      onNavigate('buy');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {/* Background with gradient */}
      <div className="bg-gradient-to-br from-purple-lighter to-white py-16 px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto text-center">
          <h1 className="text-4xl md:text-6xl mb-6 text-black">
            Find Your Perfect
            <br />
            STR Investment
          </h1>
          <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
            Discover turnkey short-term rental properties with proven income potential. 
            Invest smarter with real performance data.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-black" />
              </div>
              <Input
                type="text"
                placeholder="Search by city, neighborhood, or property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-24 py-4 text-lg rounded-full border-2 border-purple/20 focus:border-purple shadow-lg bg-white text-black placeholder:text-black/60"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <Button 
                  size="sm" 
                  className="rounded-full bg-purple hover:bg-purple-dark text-white shadow-md"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Popular Locations */}
          <div className="mb-12">
            <p className="text-sm text-black mb-4">Popular Investment Markets:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularLocations.map((location) => (
                <Badge
                  key={location}
                  variant="outline"
                  className="cursor-pointer hover:scale-105 transition-transform border-purple/20 text-black hover:bg-purple-lighter"
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple/10 hover:shadow-xl transition-all duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-lighter text-purple mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl mb-2 text-black">
                  {stat.value}
                </div>
                <div className="text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple/5 rounded-full blur-xl"></div>
    </div>
  );
}