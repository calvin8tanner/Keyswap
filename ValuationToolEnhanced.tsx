import { useState } from 'react';
import { ValuationForm } from './ValuationForm';
import { ValuationResults } from './ValuationResults';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Calculator, TrendingUp, MapPin, DollarSign, Play, 
  CheckCircle2, Star, Users, BarChart3, Shield, Zap,
  FileText, Award, ArrowRight, Sparkles
} from 'lucide-react';
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

export function ValuationToolEnhanced() {
  const [step, setStep] = useState<'landing' | 'input' | 'loading' | 'results'>('landing');
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

  // Landing Page
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-tan-lighter">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-forest-green via-forest-green-light to-gold text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-20 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-sm">Powered by Vivrant Analytics AI™</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins mb-6">
                Know Your STR's True Worth
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90 font-inter max-w-3xl mx-auto">
                Get an instant, data-driven valuation of your short-term rental property with comprehensive market analysis, revenue forecasting, and investment metrics
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  onClick={() => setStep('input')}
                  size="lg"
                  className="bg-white text-forest-green hover:bg-tan px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 hover:-translate-y-1"
                >
                  Get Free Valuation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo (2 min)
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                <div className="text-center">
                  <div className="text-4xl font-outfit mb-2">15,247</div>
                  <div className="text-sm opacity-80">Valuations This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-outfit mb-2">92%</div>
                  <div className="text-sm opacity-80">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-outfit mb-2">$2.4B</div>
                  <div className="text-sm opacity-80">Properties Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-outfit mb-2">4.9/5</div>
                  <div className="text-sm opacity-80">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="py-20">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
            <div className="w-full">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-poppins text-black mb-4">
                  Why Keyswap's Valuation Tool is Different
                </h2>
                <p className="text-xl text-gray-600">
                  The most comprehensive STR valuation platform built for investors
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                      <BarChart3 className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">Dual-Method Valuation</h3>
                    <p className="text-gray-600 mb-4">
                      We use both Income/Cap Rate and Revenue Multiple methods, weighted by market conditions, for superior accuracy
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>±8-12% precision range</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-forest-green/20 rounded-2xl flex items-center justify-center mb-6">
                      <TrendingUp className="w-8 h-8 text-forest-green" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">12-Month Revenue Forecast</h3>
                    <p className="text-gray-600 mb-4">
                      Month-by-month projections for ADR, occupancy, and revenue based on seasonal trends and local events
                    </p>
                    <div className="flex items-center gap-2 text-sm text-forest-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AI-powered seasonality models</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                      <MapPin className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">Live Market Comparables</h3>
                    <p className="text-gray-600 mb-4">
                      Real-time analysis of similar STR properties within your area with performance metrics and pricing data
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Updated every 24 hours</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-forest-green/20 rounded-2xl flex items-center justify-center mb-6">
                      <Shield className="w-8 h-8 text-forest-green" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">Regulation Risk Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Assess local STR regulations, compliance requirements, and potential policy changes that impact value
                    </p>
                    <div className="flex items-center gap-2 text-sm text-forest-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Legal database integration</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                      <Award className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">KVI Score™</h3>
                    <p className="text-gray-600 mb-4">
                      Proprietary Keyswap Value Index rates your property's investment quality on a 0-100 scale
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>7 weighted factors analyzed</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-lg border-0 hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-forest-green/20 rounded-2xl flex items-center justify-center mb-6">
                      <FileText className="w-8 h-8 text-forest-green" />
                    </div>
                    <h3 className="text-2xl font-poppins text-black mb-3">Downloadable PDF Report</h3>
                    <p className="text-gray-600 mb-4">
                      Professional investor-ready report with charts, comps, and detailed analysis you can share
                    </p>
                    <div className="flex items-center gap-2 text-sm text-forest-green">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Branded & print-ready</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
            <div className="w-full">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-poppins text-black mb-4">
                  Trusted by 50,000+ STR Investors
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="glass-card rounded-2xl shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "The valuation was spot-on! Listed at their suggested price and had 3 offers within a week. The revenue forecast helped me understand exactly what to expect."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest-green rounded-full flex items-center justify-center text-white">
                        MK
                      </div>
                      <div>
                        <div className="font-poppins text-black">Michael K.</div>
                        <div className="text-sm text-gray-500">Miami Beach, FL</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "As a real estate investor, I've used many tools. Keyswap's dual-method approach and detailed comps are the most comprehensive I've seen for STR properties."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest-green rounded-full flex items-center justify-center text-white">
                        SR
                      </div>
                      <div>
                        <div className="font-poppins text-black">Sarah R.</div>
                        <div className="text-sm text-gray-500">Nashville, TN</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card rounded-2xl shadow-sm border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-gold text-gold" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "The KVI Score and regulation risk analysis gave me confidence in my purchase decision. This tool saved me from overpaying on a property with STR restrictions."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-forest-green rounded-full flex items-center justify-center text-white">
                        JL
                      </div>
                      <div>
                        <div className="font-poppins text-black">James L.</div>
                        <div className="text-sm text-gray-500">Austin, TX</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
            <div className="w-full">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-poppins text-black mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600">
                  Get your comprehensive valuation report in 3 simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-white text-3xl font-outfit mx-auto mb-6 shadow-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-poppins text-black mb-3">Enter Property Details</h3>
                  <p className="text-gray-600">
                    Provide basic information about your property including location, size, amenities, and current STR performance
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-white text-3xl font-outfit mx-auto mb-6 shadow-lg">
                    2
                  </div>
                  <h3 className="text-2xl font-poppins text-black mb-3">AI Analysis</h3>
                  <p className="text-gray-600">
                    Our AI analyzes 50+ data points including market comps, seasonal trends, regulations, and investment metrics
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center text-white text-3xl font-outfit mx-auto mb-6 shadow-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-poppins text-black mb-3">Get Your Report</h3>
                  <p className="text-gray-600">
                    Receive a comprehensive valuation report with pricing recommendations, revenue forecasts, and actionable insights
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => setStep('input')}
                  size="lg"
                  className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  Start Your Free Valuation
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-gray-500 mt-4">Takes 3-5 minutes · No credit card required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-forest-green to-forest-green-light text-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-poppins mb-6">
                Ready to Discover Your Property's True Value?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of investors who've used our tool to make smarter STR investment decisions
              </p>
              <Button
                onClick={() => setStep('input')}
                size="lg"
                className="bg-white text-forest-green hover:bg-tan px-12 py-6 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 hover:-translate-y-1"
              >
                Get Free Valuation Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

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
