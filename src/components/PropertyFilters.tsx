import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { ChevronDown, Filter } from 'lucide-react';

interface PropertyFiltersProps {
  filters: {
    propertyType: string;
    priceRange: number[];
    amenities: string[];
    managementType?: string;
  };
  setFilters: (filters: any) => void;
}

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const strFeatures = [
    'High Occupancy Rate',
    'Instant Book Ready',
    'Self Check-in',
    'Professional Photos',
    'Guest Favorites',
    'Hot Tub',
    'Pool',
    'WiFi',
    'Kitchen',
    'Parking',
    'Pet Friendly',
    'AC/Heating',
    'Washer/Dryer',
    'Smart TV',
    'Workspace',
    'Fire Pit',
    'Outdoor Seating',
    'Game Room',
    'Near Attractions'
  ];

  const toggleFeature = (feature: string) => {
    const currentFeatures = filters.amenities;
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    setFilters({ ...filters, amenities: updatedFeatures });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* Property Filters Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-purple/20 text-black hover:bg-purple-lighter">
              <Filter className="h-4 w-4" />
              <span className="text-black">Property Filters</span>
              {(filters.amenities.length > 0 || filters.managementType) && (
                <Badge variant="secondary" className="ml-1 bg-purple text-white">
                  {filters.amenities.length + (filters.managementType ? 1 : 0)}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4">
            <div className="space-y-4">
              {/* Minimum Nightly Rate */}
              <div>
                <h4 className="mb-2 text-sm text-black">Min Nightly Rate</h4>
                <Select>
                  <SelectTrigger className="border-purple/20 focus:border-purple text-black">
                    <SelectValue placeholder="Any Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rate</SelectItem>
                    <SelectItem value="75">$75+</SelectItem>
                    <SelectItem value="100">$100+</SelectItem>
                    <SelectItem value="150">$150+</SelectItem>
                    <SelectItem value="200">$200+</SelectItem>
                    <SelectItem value="300">$300+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DropdownMenuSeparator />

              {/* Management Type */}
              <div>
                <h4 className="mb-2 text-sm text-black">Management Type</h4>
                <Select 
                  value={filters.managementType || 'all'} 
                  onValueChange={(value) => setFilters({ 
                    ...filters, 
                    managementType: value === 'all' ? undefined : value 
                  })}
                >
                  <SelectTrigger className="border-purple/20 focus:border-purple text-black">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="self-managed">Self Managed</SelectItem>
                    <SelectItem value="property-managed">Property Managed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DropdownMenuSeparator />

              {/* STR Features */}
              <div>
                <h4 className="mb-3 text-sm text-black">Features & Amenities</h4>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {strFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={filters.amenities.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                        className="border-purple/20 data-[state=checked]:bg-purple data-[state=checked]:border-purple"
                      />
                      <label htmlFor={feature} className="text-xs text-black cursor-pointer">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {filters.amenities.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div>
                    <h4 className="mb-2 text-sm text-black">Selected Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {filters.amenities.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs bg-purple-lighter text-black">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}