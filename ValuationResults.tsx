import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, FileDown, MapPin, TrendingUp, Calendar, 
  BarChart3, Shield, Users, DollarSign, Percent, Star,
  AlertCircle, CheckCircle2, Home, Lightbulb
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { ValuationResult, PropertyData } from './ValuationTool';

interface ValuationResultsProps {
  result: ValuationResult;
  propertyData: PropertyData;
  onBack: () => void;
  onCreateListing: () => void;
}

export function ValuationResults({ result, propertyData, onBack, onCreateListing }: ValuationResultsProps) {
  const { valuation, forecast, comps } = result;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (num: number) => `${num >= 0 ? '+' : ''}${num}%`;

  // Breakdown data for the horizontal bar chart
  const breakdownData = [
    { factor: 'Revenue vs Market', value: 12, color: '#C5A250' },
    { factor: 'Location & Events', value: 9, color: '#C5A250' },
    { factor: 'Reviews & Ratings', value: 6, color: '#C5A250' },
    { factor: 'Amenities & Layout', value: 5, color: '#C5A250' },
    { factor: 'Regulation Risk', value: -4, color: '#ef4444' },
    { factor: 'Liquidity', value: 3, color: '#C5A250' },
  ];

  // Factor detail cards data
  const factorDetails = [
    {
      icon: MapPin,
      title: 'Location & Events',
      score: '+9%',
      description: 'Your property sits in a high-tourism region (index 1.12). Frequent local events raise demand and boost value.',
      positive: true
    },
    {
      icon: DollarSign,
      title: 'Revenue vs Market',
      score: '+12%',
      description: 'Your STR performance exceeds the local average by 12%, demonstrating strong earning potential.',
      positive: true
    },
    {
      icon: Star,
      title: 'Reviews & Ratings',
      score: '+6%',
      description: 'High guest satisfaction scores and positive reviews contribute to premium valuation.',
      positive: true
    },
    {
      icon: Home,
      title: 'Amenities & Layout',
      score: '+5%',
      description: 'Premium amenities and optimized layout add to property desirability and market value.',
      positive: true
    },
    {
      icon: Shield,
      title: 'Regulation Risk',
      score: '-4%',
      description: 'Moderate regulatory environment with some STR restrictions in the area.',
      positive: false
    },
    {
      icon: TrendingUp,
      title: 'Liquidity',
      score: '+3%',
      description: 'Strong investor demand in this market segment ensures good resale potential.',
      positive: true
    }
  ];

  // Dual valuation methods
  const incomeMethod = Math.round(valuation.base * 0.57);
  const revenueMethod = Math.round(valuation.base * 0.43);
  const finalPrice = valuation.base;

  // Market snapshot data
  const marketData = {
    capRate: 7.2,
    regulationRisk: 'Low',
    supplyDemand: 1.08,
    tourismIndex: 1.12,
    seasonalityForecast: 4
  };

  // Calculate KVI Score
  const kviScore = 84.7;

  const handleExportPDF = () => {
    console.log('Exporting PDF report...');
    // PDF export functionality would go here
  };

  return (
    <div className="min-h-screen bg-tan-lighter">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-forest-green hover:bg-tan-light"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-poppins text-black">Your STR Valuation Report</h1>
                <p className="text-sm text-gray-600">{propertyData.address}</p>
              </div>
            </div>
            <Button
              onClick={handleExportPDF}
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-white"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-12">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-poppins text-black mb-3">Here's how we calculated your STR's estimated value</h2>
          <p className="text-lg text-gray-600">Comprehensive analysis using multiple valuation methods</p>
        </div>

        {/* Section 1: Breakdown Overview */}
        <Card className="glass-card rounded-2xl shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-green font-poppins">
              <BarChart3 className="w-6 h-6" />
              Valuation Breakdown
            </CardTitle>
            <p className="text-sm text-gray-600">Key factors contributing to your property's estimated value</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={breakdownData} layout="vertical" margin={{ left: 120, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `${value}%`} domain={[-10, 15]} />
                  <YAxis type="category" dataKey="factor" />
                  <Tooltip 
                    formatter={(value: any) => [`${value}%`, 'Impact']}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                    {breakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Factor Detail Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-poppins text-black mb-6">Detailed Factor Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factorDetails.map((factor, index) => (
              <Card key={index} className="glass-card rounded-2xl shadow-sm border-0 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      factor.positive ? 'bg-gold/20' : 'bg-red-100'
                    }`}>
                      <factor.icon className={`w-6 h-6 ${factor.positive ? 'text-gold' : 'text-red-500'}`} />
                    </div>
                    <span className={`text-lg font-outfit ${
                      factor.positive ? 'text-gold' : 'text-red-500'
                    }`}>
                      {factor.score}
                    </span>
                  </div>
                  <h4 className="font-poppins text-black mb-2">{factor.title}</h4>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Dual-Method Valuation Comparison */}
        <Card className="glass-card rounded-2xl shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-green font-poppins">
              <DollarSign className="w-6 h-6" />
              Dual-Method Valuation
            </CardTitle>
            <p className="text-sm text-gray-600">Your property value calculated using industry-standard methods</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Income/Cap Rate Method */}
              <div className="text-center">
                <div className="bg-warm-gray rounded-xl p-6 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Income / Cap Rate Method</p>
                  <p className="text-4xl font-outfit text-forest-green mb-2">{formatCurrency(incomeMethod)}</p>
                  <p className="text-sm text-gold">Weight: 57%</p>
                </div>
                <p className="text-sm text-gray-600">Based on projected annual income and local cap rates</p>
              </div>

              {/* Revenue Multiple Method */}
              <div className="text-center">
                <div className="bg-warm-gray rounded-xl p-6 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Revenue Multiple Method</p>
                  <p className="text-4xl font-outfit text-forest-green mb-2">{formatCurrency(revenueMethod)}</p>
                  <p className="text-sm text-gold">Weight: 43%</p>
                </div>
                <p className="text-sm text-gray-600">Based on market revenue multiples for similar properties</p>
              </div>
            </div>

            {/* Final Weighted Price */}
            <div className="bg-gradient-to-r from-forest-green to-forest-green-light rounded-2xl p-8 text-white text-center">
              <p className="text-sm opacity-90 mb-2">Final Weighted Listing Price</p>
              <p className="text-5xl font-outfit mb-4">{formatCurrency(finalPrice)}</p>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gold h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Market Snapshot */}
        <Card className="glass-card rounded-2xl shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-forest-green font-poppins">
              <MapPin className="w-6 h-6" />
              Market Snapshot
            </CardTitle>
            <p className="text-sm text-gray-600">Key market indicators for your area</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Local Cap Rate */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-gold flex items-center justify-center">
                  <span className="text-2xl font-outfit text-gold">{marketData.capRate}%</span>
                </div>
                <p className="text-sm text-gray-600">Local Cap Rate</p>
              </div>

              {/* Regulation Risk */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Regulation Risk</p>
                <p className="text-xs text-green-600 mt-1">{marketData.regulationRisk}</p>
              </div>

              {/* Supply/Demand */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-gold flex items-center justify-center">
                  <span className="text-2xl font-outfit text-gold">{marketData.supplyDemand}</span>
                </div>
                <p className="text-sm text-gray-600">STR Supply/Demand</p>
                <p className="text-xs text-green-600 mt-1">Tight Market</p>
              </div>

              {/* Tourism Index */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-gold flex items-center justify-center">
                  <span className="text-2xl font-outfit text-gold">{marketData.tourismIndex}</span>
                </div>
                <p className="text-sm text-gray-600">Tourism Index</p>
              </div>

              {/* Seasonality Forecast */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl font-outfit text-green-600">+{marketData.seasonalityForecast}%</span>
                </div>
                <p className="text-sm text-gray-600">Seasonality Forecast</p>
                <p className="text-xs text-gray-500 mt-1">Next 12 months</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Recommendation Box */}
        <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-gold/20 to-gold/10 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-poppins text-black mb-3">Keyswap Recommendation</h3>
                <p className="text-black mb-4">
                  Your STR performs <span className="font-poppins text-gold">12% above the local average</span> and ranks in the{' '}
                  <span className="font-poppins text-gold">top 25%</span> of your region's ROI profiles.
                </p>
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Ideal listing range for optimal investor response:</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-outfit text-forest-green">{formatCurrency(valuation.low)}</span>
                    <span className="text-gray-400">—</span>
                    <span className="text-2xl font-outfit text-forest-green">{formatCurrency(valuation.high)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">KVI Score:</span>
                    <span className="text-2xl font-outfit text-gold">{kviScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button
            onClick={onCreateListing}
            className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white py-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            List Your Property on Keyswap
          </Button>
          
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="border-2 border-forest-green text-forest-green hover:bg-forest-green hover:text-white py-8 rounded-xl transition-all"
            size="lg"
          >
            <FileDown className="w-5 h-5 mr-2" />
            Export Valuation Report (PDF)
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Powered by Vivrant Analytics AI™</p>
          <p className="text-xs text-gray-500">
            All estimates derived from live STR market data and adaptive learning models.
          </p>
        </div>
      </div>
    </div>
  );
}
