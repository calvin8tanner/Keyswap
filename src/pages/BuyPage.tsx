import { useState } from 'react';
import { Search, MapPin, DollarSign, Home, TrendingUp, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { PropertyFilters } from '../components/PropertyFilters';
import { PropertyGrid } from '../components/PropertyGrid';

interface BuyPageProps {
  onPropertySelect: (property: any) => void;
}

export function BuyPage({ onPropertySelect }: BuyPageProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: [100000, 1000000],
    amenities: [],
    managementType: undefined
  });
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyType, setPropertyType] = useState('');

  return (
    <div>
      {/* Enhanced Buy Hero Section */}
      <section className="bg-gradient-to-b from-background to-purple-lighter/20 py-16">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="mb-4 text-black">Buy Turnkey STR Properties</h1>
            <p className="text-black max-w-3xl mx-auto">
              Find profitable short-term rental properties with detailed analytics, guest reviews, and booking history. 
              Our marketplace connects you with fully-furnished, guest-ready STR investments.
            </p>
          </div>

          <Card className="max-w-6xl mx-auto p-6 mb-8 border-purple/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <label className="block mb-2 text-black">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple h-4 w-4" />
                  <Input
                    placeholder="City, State, ZIP"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block mb-2 text-black">Property Type</label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple h-4 w-4 z-10" />
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="pl-10 border-purple/20 focus:border-purple text-black">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="single-family">Single Family</SelectItem>
                      <SelectItem value="multi-family">Multi Family</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Max Price */}
              <div>
                <label className="block mb-2 text-black">Max Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple h-4 w-4" />
                  <Input
                    placeholder="Any Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="pl-10 border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button size="lg" className="w-full bg-purple hover:bg-purple-dark text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Search Properties
                </Button>
              </div>
            </div>
          </Card>

          {/* Investment Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center border-purple/10 hover:border-purple/20 transition-colors">
              <TrendingUp className="h-8 w-8 text-purple mx-auto mb-3" />
              <h3 className="mb-2 text-black">High RevPAR</h3>
              <p className="text-sm text-black">
                Properties with verified revenue per available room from $75-$300+
              </p>
            </Card>
            <Card className="p-6 text-center border-purple/10 hover:border-purple/20 transition-colors">
              <Calendar className="h-8 w-8 text-purple mx-auto mb-3" />
              <h3 className="mb-2 text-black">High Occupancy</h3>
              <p className="text-sm text-black">
                Average occupancy rates of 70%+ with established guest base
              </p>
            </Card>
            <Card className="p-6 text-center border-purple/10 hover:border-purple/20 transition-colors">
              <Users className="h-8 w-8 text-purple mx-auto mb-3" />
              <h3 className="mb-2 text-black">Turnkey Ready</h3>
              <p className="text-sm text-black">
                Fully furnished with existing STR listings and guest reviews
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Filters and Property Grid */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <PropertyFilters 
          filters={filters}
          setFilters={setFilters}
        />
        
        <PropertyGrid 
          searchLocation={searchLocation}
          filters={filters}
          onPropertySelect={onPropertySelect}
        />
      </div>
    </div>
  );
}