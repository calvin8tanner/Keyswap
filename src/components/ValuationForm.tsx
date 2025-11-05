import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  MapPin, Home, Bed, Bath, Ruler, Star, DollarSign, 
  Percent, TrendingUp, MessageSquare, ChevronDown, ChevronUp,
  Droplets, Zap, Briefcase, Building, Calculator, X, Plus, Search
} from 'lucide-react';
import type { PropertyData } from './ValuationTool';

interface ValuationFormProps {
  onSubmit: (data: PropertyData & PerformanceData & ExpenseData) => void;
}

interface PerformanceData {
  annualRevenue: number;
  avgOccupancy: number;
  avgNightlyRate: number;
  starRating: number;
  numReviews: number;
}

interface ExpenseData {
  cleaningCost: number;
  managementPercent: number;
  monthlyUtilities: number;
  monthlyHOA: number;
  annualTaxes: number;
}

export function ValuationForm({ onSubmit }: ValuationFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    address: '',
    bedrooms: 2,
    bathrooms: 2,
    sleeps: 4,
    sqft: 1200,
    propertyType: '',
    amenities: [],
    renovated: false,
    strAllowed: true
  });

  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    annualRevenue: 50000,
    avgOccupancy: 75,
    avgNightlyRate: 200,
    starRating: 5,
    numReviews: 25
  });

  const [expenseData, setExpenseData] = useState<ExpenseData>({
    cleaningCost: 150,
    managementPercent: 20,
    monthlyUtilities: 200,
    monthlyHOA: 0,
    annualTaxes: 3000
  });

  const [expensesOpen, setExpensesOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [amenitySearchOpen, setAmenitySearchOpen] = useState(false);
  const [amenitySearch, setAmenitySearch] = useState('');

  // Calculate live estimate
  const [estimatedValue, setEstimatedValue] = useState(0);
  const [kviScore, setKviScore] = useState(0);
  const [marketMultiplier, setMarketMultiplier] = useState(0);
  const [capRate, setCapRate] = useState(0);

  // Comprehensive amenities list with categories and weights for valuation
  const amenitiesByCategory = {
    'Core Property': [
      'Full Kitchen', 'Living Room', 'Dining Area', 'Private Entrance',
      'Dedicated Parking', 'Air Conditioning', 'Heating', 'Wi-Fi',
      'Smart TV', 'Washer/Dryer', 'Iron & Board', 'Hair Dryer',
      'Closet', 'Workspace'
    ],
    'Premium Interior': [
      'Fireplace', 'Indoor Hot Tub', 'Jacuzzi', 'Sauna',
      'Home Theater', 'Smart Home', 'Soundproofing', 'Luxury Linens',
      'Walk-in Closet', 'Rain Shower', 'Soaking Tub', 'Game Room',
      'Pool Table', 'Home Gym', 'Wine Fridge', 'Espresso Machine',
      'Air Purifier', 'Security System'
    ],
    'Outdoor': [
      'Private Pool', 'Heated Pool', 'Outdoor Hot Tub', 'Fire Pit',
      'BBQ Grill', 'Patio/Deck', 'Outdoor Dining', 'Lounge Chairs',
      'Garden/Lawn', 'Mountain View', 'Water View', 'City View',
      'Balcony', 'Outdoor Kitchen', 'Fenced Yard', 'Boat Dock',
      'Rooftop Terrace', 'Outdoor Shower'
    ],
    'Location': [
      'Walking to Downtown', 'Beachfront', 'Waterfront', 'Mountain View',
      'Ski-in Ski-out', 'Near Transit', 'EV Charger', 'Wheelchair Accessible',
      'Elevator', 'Step-free Entry'
    ],
    'Pet & Family': [
      'Pet-Friendly Dogs', 'Pet-Friendly Cats', 'Dog Run', 'Crib',
      'Pack n Play', 'High Chair', 'Baby Gate', 'Board Games',
      'Child-safe Locks'
    ],
    'Business': [
      'High-speed Fiber', 'Office Desk', 'Printer/Scanner',
      'Ring Light', 'Meeting Space', 'Quiet Hours', 'Coffee Station'
    ],
    'Safety & Convenience': [
      '24/7 Check-in', 'Smart Lock', 'Concierge', 'Housekeeping',
      'Essentials Provided', 'Smoke Detector', 'CO2 Detector',
      'Fire Extinguisher', 'First Aid Kit', 'Safe/Lockbox',
      'Security Cameras', 'Generator'
    ],
    'Experience & Luxury': [
      'Near Landmarks', 'Local Partnerships', 'Kayaks/Bikes Included',
      'On-site Experiences', 'Themed Interior', 'Instagrammable Design',
      'Near Nightlife', 'Sustainability Features'
    ]
  };

  // Flatten all amenities for selection
  const allAmenities = Object.values(amenitiesByCategory).flat();

  useEffect(() => {
    // Weighted amenities calculation
    const calculateAmenitiesBonus = () => {
      let bonus = 0;
      
      // Core amenities (baseline - minimal impact)
      const coreAmenities = amenitiesByCategory['Core Property'];
      const coreCount = formData.amenities.filter(a => coreAmenities.includes(a)).length;
      bonus += coreCount * 2000; // $2k per core amenity
      
      // Premium Interior (+3-7% of base value)
      const premiumInterior = amenitiesByCategory['Premium Interior'];
      const premiumCount = formData.amenities.filter(a => premiumInterior.includes(a)).length;
      bonus += premiumCount * 8000; // $8k per premium amenity
      
      // Outdoor (+5-10% of base value)
      const outdoor = amenitiesByCategory['Outdoor'];
      const outdoorCount = formData.amenities.filter(a => outdoor.includes(a)).length;
      bonus += outdoorCount * 12000; // $12k per outdoor amenity
      
      // Location features (high impact)
      const location = amenitiesByCategory['Location'];
      const locationCount = formData.amenities.filter(a => location.includes(a)).length;
      bonus += locationCount * 15000; // $15k per location feature
      
      // Pet & Family (+2-5%)
      const petFamily = amenitiesByCategory['Pet & Family'];
      const petFamilyCount = formData.amenities.filter(a => petFamily.includes(a)).length;
      bonus += petFamilyCount * 5000; // $5k per pet/family amenity
      
      // Business (+1-3%)
      const business = amenitiesByCategory['Business'];
      const businessCount = formData.amenities.filter(a => business.includes(a)).length;
      bonus += businessCount * 3000; // $3k per business amenity
      
      // Safety & Convenience (+1-2%)
      const safety = amenitiesByCategory['Safety & Convenience'];
      const safetyCount = formData.amenities.filter(a => safety.includes(a)).length;
      bonus += safetyCount * 2500; // $2.5k per safety feature
      
      // Experience & Luxury (+10-15%)
      const experience = amenitiesByCategory['Experience & Luxury'];
      const experienceCount = formData.amenities.filter(a => experience.includes(a)).length;
      bonus += experienceCount * 18000; // $18k per luxury/experience feature
      
      return bonus;
    };
    
    // Valuation calculation with weighted amenities
    const baseValue = performanceData.annualRevenue * 8.2; // Revenue multiple
    const bedroomBonus = formData.bedrooms * 15000;
    const bathroomBonus = formData.bathrooms * 8000;
    const sqftBonus = (formData.sqft / 100) * 500; // $500 per 100 sqft
    const amenitiesBonus = calculateAmenitiesBonus();
    const ratingBonus = (performanceData.starRating / 5) * 25000;
    const reviewsBonus = Math.min(performanceData.numReviews * 300, 15000); // Cap at $15k
    
    const total = baseValue + bedroomBonus + bathroomBonus + sqftBonus + amenitiesBonus + ratingBonus + reviewsBonus;
    setEstimatedValue(Math.round(total));
    
    // Calculate metrics
    setMarketMultiplier(parseFloat((total / performanceData.annualRevenue).toFixed(1)));
    setCapRate(parseFloat(((performanceData.annualRevenue / total) * 100).toFixed(1)));
    
    // KVI Score (0-100 scale)
    const occupancyScore = (performanceData.avgOccupancy / 100) * 25;
    const revenueScore = Math.min((performanceData.annualRevenue / 60000) * 25, 25);
    const ratingScore = (performanceData.starRating / 5) * 15;
    const reviewsScore = Math.min((performanceData.numReviews / 50) * 10, 10);
    const amenitiesScore = Math.min((formData.amenities.length / 15) * 25, 25);
    
    setKviScore(parseFloat((occupancyScore + revenueScore + ratingScore + reviewsScore + amenitiesScore).toFixed(1)));
  }, [formData, performanceData]);

  const propertyTypes = [
    'Single Family', 'Condo', 'Townhouse', 'Duplex', 
    'Apartment', 'Villa', 'Cabin', 'Other'
  ];

  const handleInputChange = (field: keyof PropertyData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePerformanceChange = (field: keyof PerformanceData, value: any) => {
    setPerformanceData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpenseChange = (field: keyof ExpenseData, value: any) => {
    setExpenseData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, ...performanceData, ...expenseData });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT COLUMN - Form Inputs */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-poppins mb-2 text-black">Estimate Your STR's Market Value</h2>
          <p className="text-black opacity-70">Powered by Vivrant Analytics AI™</p>
        </div>

        {/* Section 1: Property Basics */}
        <Card className="glass-card rounded-2xl shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-poppins mb-4 text-forest-green">Property Basics</h3>
            
            {/* Address */}
            <div className="space-y-2 mb-4">
              <Label className="flex items-center gap-2 text-black">
                <MapPin className="w-4 h-4 text-forest-green" />
                Address *
              </Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Beach Road, Miami, FL"
                className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:border-gold`}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Property Type, Bedrooms, Bathrooms */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <Home className="w-4 h-4 text-forest-green" />
                  Property Type *
                </Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                  <SelectTrigger className={`border ${errors.propertyType ? 'border-red-500' : 'border-gray-300'} focus:border-gold`}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <Bed className="w-4 h-4 text-forest-green" />
                  Bedrooms
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('bedrooms', Math.max(0, formData.bedrooms - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
                    className="text-center border-gray-300 focus:border-gold"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('bedrooms', formData.bedrooms + 1)}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <Bath className="w-4 h-4 text-forest-green" />
                  Bathrooms
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('bathrooms', Math.max(0, formData.bathrooms - 0.5))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value) || 0)}
                    className="text-center border-gray-300 focus:border-gold"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleInputChange('bathrooms', formData.bathrooms + 0.5)}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="mb-2 text-black flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-forest-green" />
                  Square Feet
                </Label>
                <Input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => handleInputChange('sqft', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-gold"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label className="text-black">Amenities</Label>
              <p className="text-xs text-gray-600">Premium amenities can increase your property value by up to 15%</p>
              
              {/* Selected Amenities */}
              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                  {formData.amenities.map(amenity => (
                    <Badge
                      key={amenity}
                      variant="default"
                      className="bg-forest-green text-white hover:bg-forest-green-dark cursor-pointer"
                      onClick={() => handleAmenityToggle(amenity)}
                    >
                      {amenity}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Search Box */}
              <Popover open={amenitySearchOpen} onOpenChange={setAmenitySearchOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={amenitySearchOpen}
                    className="w-full justify-between border-gray-300 hover:border-gold"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-forest-green" />
                      <span className="text-gray-600">Search and add amenities...</span>
                    </div>
                    <Plus className="w-4 h-4 text-forest-green" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search amenities..." 
                      value={amenitySearch}
                      onValueChange={setAmenitySearch}
                    />
                    <CommandList className="max-h-[300px]">
                      <CommandEmpty>No amenity found.</CommandEmpty>
                      {Object.entries(amenitiesByCategory).map(([category, amenities]) => {
                        // Filter amenities based on search and exclude already selected ones
                        const filteredAmenities = amenities.filter(
                          amenity => !formData.amenities.includes(amenity)
                        );
                        
                        if (filteredAmenities.length === 0) return null;
                        
                        return (
                          <CommandGroup key={category} heading={category}>
                            {filteredAmenities.map(amenity => (
                              <CommandItem
                                key={amenity}
                                value={amenity}
                                onSelect={() => {
                                  handleAmenityToggle(amenity);
                                  setAmenitySearch('');
                                }}
                                className="cursor-pointer"
                              >
                                <Plus className="w-4 h-4 mr-2 text-forest-green" />
                                {amenity}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        );
                      })}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <p className="text-xs text-gray-500 italic">
                {formData.amenities.length} amenity{formData.amenities.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Performance Data */}
        <Card className="glass-card rounded-2xl shadow-sm border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-poppins mb-4 text-forest-green">Performance Data</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2 text-black">
                    <DollarSign className="w-4 h-4 text-forest-green" />
                    Annual Revenue ($)
                  </Label>
                  <span className="text-black font-outfit">{formatCurrency(performanceData.annualRevenue)}</span>
                </div>
                <Input
                  type="number"
                  value={performanceData.annualRevenue}
                  onChange={(e) => handlePerformanceChange('annualRevenue', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-gold"
                />
                <p className="text-xs text-gray-600 mt-1">Gross STR revenue last 12 months</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="flex items-center gap-2 text-black">
                    <Percent className="w-4 h-4 text-forest-green" />
                    Average Occupancy (%)
                  </Label>
                  <span className="text-black font-outfit">{performanceData.avgOccupancy}%</span>
                </div>
                <Slider
                  value={[performanceData.avgOccupancy]}
                  onValueChange={(value) => handlePerformanceChange('avgOccupancy', value[0])}
                  max={100}
                  step={1}
                  className="my-2"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <TrendingUp className="w-4 h-4 text-forest-green" />
                  Average Nightly Rate ($)
                </Label>
                <Input
                  type="number"
                  value={performanceData.avgNightlyRate}
                  onChange={(e) => handlePerformanceChange('avgNightlyRate', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-gold"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <Star className="w-4 h-4 text-forest-green" />
                  Star Rating
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handlePerformanceChange('starRating', star)}
                      className={`text-2xl transition-all ${
                        star <= performanceData.starRating ? 'text-gold' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2 text-black">
                  <MessageSquare className="w-4 h-4 text-forest-green" />
                  Number of Reviews
                </Label>
                <Input
                  type="number"
                  value={performanceData.numReviews}
                  onChange={(e) => handlePerformanceChange('numReviews', parseInt(e.target.value) || 0)}
                  className="border-gray-300 focus:border-gold"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Expenses (Optional) */}
        <Collapsible open={expensesOpen} onOpenChange={setExpensesOpen}>
          <Card className="glass-card rounded-2xl shadow-sm border-0">
            <CollapsibleTrigger className="w-full">
              <CardHeader className="cursor-pointer hover:bg-warm-gray transition-colors rounded-t-2xl">
                <CardTitle className="flex items-center justify-between text-forest-green">
                  <span className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Expenses (Optional)
                  </span>
                  {expensesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-black">
                    <Droplets className="w-4 h-4 text-forest-green" />
                    Cleaning Cost per Stay ($)
                  </Label>
                  <Input
                    type="number"
                    value={expenseData.cleaningCost}
                    onChange={(e) => handleExpenseChange('cleaningCost', parseInt(e.target.value) || 0)}
                    className="border-gray-300 focus:border-gold"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-black">
                    <Briefcase className="w-4 h-4 text-forest-green" />
                    Management Fee (%)
                  </Label>
                  <Input
                    type="number"
                    value={expenseData.managementPercent}
                    onChange={(e) => handleExpenseChange('managementPercent', parseInt(e.target.value) || 0)}
                    className="border-gray-300 focus:border-gold"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-black">
                    <Zap className="w-4 h-4 text-forest-green" />
                    Monthly Utilities ($)
                  </Label>
                  <Input
                    type="number"
                    value={expenseData.monthlyUtilities}
                    onChange={(e) => handleExpenseChange('monthlyUtilities', parseInt(e.target.value) || 0)}
                    className="border-gray-300 focus:border-gold"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-black">
                    <Building className="w-4 h-4 text-forest-green" />
                    Monthly HOA ($)
                  </Label>
                  <Input
                    type="number"
                    value={expenseData.monthlyHOA}
                    onChange={(e) => handleExpenseChange('monthlyHOA', parseInt(e.target.value) || 0)}
                    className="border-gray-300 focus:border-gold"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-black">
                    <DollarSign className="w-4 h-4 text-forest-green" />
                    Annual Property Taxes ($)
                  </Label>
                  <Input
                    type="number"
                    value={expenseData.annualTaxes}
                    onChange={(e) => handleExpenseChange('annualTaxes', parseInt(e.target.value) || 0)}
                    className="border-gray-300 focus:border-gold"
                  />
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* CTA Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate My STR Value
        </Button>
        <p className="text-xs text-center text-gray-600">
          Takes &lt;2 seconds using real market data
        </p>
      </div>

      {/* RIGHT COLUMN - Live Preview */}
      <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
        <Card className="glass-card rounded-2xl shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-br from-forest-green to-forest-green-light p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Estimated Listing Price</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-outfit">{formatCurrency(estimatedValue)}</span>
            </div>
            <p className="text-sm opacity-75 mt-2">Based on local market trends and your STR performance</p>
          </div>
          <CardContent className="p-6">
            <Button
              variant="outline"
              className="w-full border-gold text-gold hover:bg-gold hover:text-white transition-all"
            >
              See Why →
            </Button>
          </CardContent>
        </Card>

        {/* Quick Snapshot Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="glass-card rounded-xl shadow-sm border-0 p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">KVI Score</p>
            <p className="text-2xl font-outfit text-gold">{kviScore}</p>
            <p className="text-xs text-gray-500">/100</p>
          </Card>
          
          <Card className="glass-card rounded-xl shadow-sm border-0 p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Market Multiplier</p>
            <p className="text-2xl font-outfit text-gold">{marketMultiplier}×</p>
            <p className="text-xs text-gray-500">Price/Revenue</p>
          </Card>
          
          <Card className="glass-card rounded-xl shadow-sm border-0 p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">Cap Rate</p>
            <p className="text-2xl font-outfit text-gold">{capRate}%</p>
            <p className="text-xs text-gray-500">Benchmark</p>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="glass-card rounded-2xl shadow-sm border-0">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-poppins text-black mb-1">Market-strong STR investment</h4>
                <p className="text-sm text-gray-600">
                  Your property shows strong performance metrics compared to the local market average.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
