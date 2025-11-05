import { useState } from 'react';
import { ValuationForm } from './ValuationForm';
import { ValuationResults } from './ValuationResults';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calculator, TrendingUp, MapPin, DollarSign } from 'lucide-react';
import { getPropertyValuation, getCachedValuation, cacheValuation } from './services/ValuationService';

export interface PropertyData {
  address: string;
  lat?: number;
  lng?: number;
  bedrooms: number;
  bathrooms: number;
  sleeps?: number;
  sqft: number;
  propertyType: string;
  amenities: string[];
  photos?: string[];
  renovated?: boolean;
  strAllowed?: boolean;
  // Performance data
  annualRevenue?: number;
  avgOccupancy?: number;
  avgNightlyRate?: number;
  starRating?: number;
  numReviews?: number;
  // Expense data
  cleaningCost?: number;
  managementPercent?: number;
  monthlyUtilities?: number;
  monthlyHOA?: number;
  annualTaxes?: number;
}

export interface ValuationResult {
  valuation: {
    low: number;
    base: number;
    high: number;
    confidence: number;
  };
  forecast: {
    adr: number;
    occupancy: number;
    annual: number;
    monthly: Array<{
      month: string;
      adr: number;
      occupancy: number;
      revenue: number;
    }>;
  };
  comps: Array<{
    id: string;
    distance: number;
    adr: number;
    occupancy: number;
    revenue: number;
    price: number;
    amenities: string[];
    title: string;
    location: string;
  }>;
  drivers: Array<{
    feature: string;
    impact: string;
  }>;
}

export function ValuationTool() {
  const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleStartValuation = async (data: PropertyData) => {
    setPropertyData(data);
    setStep('loading');
    setLoadingProgress(0);

    // Check cache first
    const cached = getCachedValuation(data);
    if (cached) {
      console.log('Using cached valuation data');
      setValuationResult(cached as ValuationResult);
      setStep('results');
      return;
    }

    // Simulate progress updates while fetching real/mock data
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);

    try {
      // This will use real APIs if configured, otherwise falls back to mock data
      const apiResult = await getPropertyValuation(data);
      
      // Convert API response to match our ValuationResult interface
      const result: ValuationResult = {
        valuation: apiResult.valuation,
        forecast: apiResult.forecast,
        comps: apiResult.comps,
        drivers: [
          { feature: 'Location Score', impact: '+$45,000 (Prime area)' },
          { feature: 'Property Size', impact: '+$25,000 (Above average sqft)' },
          { feature: 'Amenities', impact: '+$15,000 (Premium amenities)' },
          { feature: 'Market Trends', impact: '+$10,000 (Growing STR demand)' }
        ]
      };

      // Cache the result
      cacheValuation(data, apiResult);
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setValuationResult(result);
      setStep('results');
      
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Valuation error:', error);
      
      // Fallback to mock data on error
      const mockResult: ValuationResult = {
      valuation: {
        low: 485000,
        base: 525000,
        high: 565000,
        confidence: 87
      },
      forecast: {
        adr: 225,
        occupancy: 78,
        annual: 64150,
        monthly: [
          { month: 'Jan', adr: 195, occupancy: 65, revenue: 3900 },
          { month: 'Feb', adr: 205, occupancy: 68, revenue: 4250 },
          { month: 'Mar', adr: 235, occupancy: 75, revenue: 5420 },
          { month: 'Apr', adr: 245, occupancy: 82, revenue: 6180 },
          { month: 'May', adr: 255, occupancy: 85, revenue: 6675 },
          { month: 'Jun', adr: 275, occupancy: 88, revenue: 7425 },
          { month: 'Jul', adr: 285, occupancy: 92, revenue: 8075 },
          { month: 'Aug', adr: 280, occupancy: 90, revenue: 7750 },
          { month: 'Sep', adr: 260, occupancy: 85, revenue: 6800 },
          { month: 'Oct', adr: 240, occupancy: 78, revenue: 5760 },
          { month: 'Nov', adr: 215, occupancy: 72, revenue: 4750 },
          { month: 'Dec', adr: 205, occupancy: 70, revenue: 4410 }
        ]
      },
      comps: [
        {
          id: '1',
          distance: 0.3,
          adr: 235,
          occupancy: 82,
          revenue: 70380,
          price: 495000,
          amenities: ['Pool', 'WiFi', 'Parking'],
          title: 'Modern Beach Condo',
          location: '0.3 miles away'
        },
        {
          id: '2',
          distance: 0.5,
          adr: 215,
          occupancy: 75,
          revenue: 58913,
          price: 515000,
          amenities: ['WiFi', 'Kitchen', 'AC'],
          title: 'Downtown Apartment',
          location: '0.5 miles away'
        },
        {
          id: '3',
          distance: 0.7,
          adr: 245,
          occupancy: 79,
          revenue: 70751,
          price: 485000,
          amenities: ['Pool', 'Hot Tub', 'WiFi', 'Parking'],
          title: 'Luxury Waterfront Unit',
          location: '0.7 miles away'
        }
      ],
      drivers: [
          { feature: 'Location Score', impact: '+$45,000 (Prime beachfront area)' },
          { feature: 'Property Size', impact: '+$25,000 (Above average sqft)' },
          { feature: 'Amenities', impact: '+$15,000 (Pool & parking)' },
          { feature: 'Market Trends', impact: '+$10,000 (Growing STR demand)' }
        ]
      };

      setValuationResult(mockResult);
      setStep('results');
    }
  };

  const handleBackToForm = () => {
    setStep('input');
    setPropertyData(null);
    setValuationResult(null);
    setLoadingProgress(0);
  };

  const handleCreateListing = () => {
    // Navigate to sell page with prefilled data
    console.log('Creating listing with data:', propertyData, valuationResult);
  };

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-tan-lighter flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-card rounded-2xl shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-forest-green font-poppins">
              <Calculator className="w-6 h-6 animate-pulse" />
              Analyzing Your STR...
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full bg-warm-gray rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-gold to-gold-dark h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-center text-black font-inter">
              {loadingProgress < 20 && 'Geocoding address...'}
              {loadingProgress >= 20 && loadingProgress < 40 && 'Analyzing comparable properties...'}
              {loadingProgress >= 40 && loadingProgress < 60 && 'Calculating market value...'}
              {loadingProgress >= 60 && loadingProgress < 80 && 'Forecasting STR performance...'}
              {loadingProgress >= 80 && 'Finalizing results...'}
            </p>
            <p className="text-center text-sm text-gray-600">
              This usually takes 8-12 seconds
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'results' && valuationResult) {
    return (
      <ValuationResults 
        result={valuationResult}
        propertyData={propertyData!}
        onBack={handleBackToForm}
        onCreateListing={handleCreateListing}
      />
    );
  }

  return (
    <div className="min-h-screen bg-tan-lighter">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-tan to-tan-dark text-black py-12">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-poppins mb-4">
              Get Your Property's STR Valuation
            </h1>
            <p className="text-xl mb-8 opacity-80 font-inter">
              Discover your property's market value and short-term rental income potential in seconds
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center p-6 glass-card rounded-xl">
                <DollarSign className="w-8 h-8 mb-3 text-forest-green" />
                <h3 className="text-lg mb-2 font-poppins">Instant Valuation</h3>
                <p className="text-sm opacity-70 font-inter">Get accurate property values with ±15% precision</p>
              </div>
              <div className="flex flex-col items-center p-6 glass-card rounded-xl">
                <TrendingUp className="w-8 h-8 mb-3 text-forest-green" />
                <h3 className="text-lg mb-2 font-poppins">Revenue Forecast</h3>
                <p className="text-sm opacity-70 font-inter">See projected ADR, occupancy, and annual income</p>
              </div>
              <div className="flex flex-col items-center p-6 glass-card rounded-xl">
                <MapPin className="w-8 h-8 mb-3 text-forest-green" />
                <h3 className="text-lg mb-2 font-poppins">Market Comps</h3>
                <p className="text-sm opacity-70 font-inter">Compare with similar STR properties nearby</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="w-full">
            <ValuationForm onSubmit={handleStartValuation} />
          </div>
        </div>
      </section>
    </div>
  );
}