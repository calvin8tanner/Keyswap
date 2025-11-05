import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Home, Calendar, Users, MapPin, BarChart3, Calculator, Target, Filter, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

export function MarketData() {
  // Helper function to format numbers with max 2 decimals and commas
  const formatNumber = (num: number, maxDecimals: number = 2): string => {
    if (Number.isInteger(num)) {
      return num.toLocaleString('en-US');
    }
    const fixed = num.toFixed(maxDecimals);
    const cleaned = fixed.replace(/\.?0+$/, '');
    return parseFloat(cleaned).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals
    });
  };

  const [selectedMarket, setSelectedMarket] = useState('austin-tx');
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');
  const [calculatorInputs, setCalculatorInputs] = useState({
    purchasePrice: 500000,
    downPayment: 100000,
    nightlyRate: 200,
    occupancyRate: 75,
    expenses: 30
  });

  const marketData = {
    'austin-tx': {
      name: 'Austin, TX',
      medianPrice: 485000,
      priceChange: 8.5,
      medianNightlyRate: 185,
      avgOccupancy: 76,
      revPAR: 140,
      daysOnMarket: 18,
      totalListings: 2847,
      newListings: 342,
      inventory: 2.1,
      cashOnCashReturn: 12.3,
      capRate: 5.8,
      forecast: 'positive',
      seasonality: { peak: 'Mar-May, Sep-Oct', low: 'Jan-Feb' },
      topNeighborhoods: [
        { name: 'Downtown', avgPrice: 650000, avgNightly: 220, growth: 12.3, revpar: 168, occupancy: 81 },
        { name: 'South Austin', avgPrice: 420000, avgNightly: 165, growth: 9.8, revpar: 128, occupancy: 78 },
        { name: 'East Austin', avgPrice: 380000, avgNightly: 155, growth: 15.2, revpar: 118, occupancy: 76 }
      ],
      propertyTypes: [
        { type: 'Condo', avgPrice: 450000, nightlyRate: 175, occupancy: 78, share: 45 },
        { type: 'Single Family', avgPrice: 580000, nightlyRate: 220, occupancy: 74, share: 35 },
        { type: 'Townhouse', avgPrice: 520000, nightlyRate: 195, occupancy: 76, share: 20 }
      ]
    },
    'miami-fl': {
      name: 'Miami, FL',
      medianPrice: 425000,
      priceChange: -2.1,
      medianNightlyRate: 175,
      avgOccupancy: 82,
      revPAR: 143,
      daysOnMarket: 22,
      totalListings: 3421,
      newListings: 287,
      inventory: 3.2,
      cashOnCashReturn: 10.8,
      capRate: 6.2,
      forecast: 'stable',
      seasonality: { peak: 'Dec-Apr', low: 'Aug-Sep' },
      topNeighborhoods: [
        { name: 'South Beach', avgPrice: 850000, avgNightly: 285, growth: 5.4, revpar: 232, occupancy: 84 },
        { name: 'Brickell', avgPrice: 520000, avgNightly: 195, growth: -1.2, revpar: 162, occupancy: 83 },
        { name: 'Wynwood', avgPrice: 365000, avgNightly: 145, growth: 8.7, revpar: 119, occupancy: 82 }
      ],
      propertyTypes: [
        { type: 'Condo', avgPrice: 485000, nightlyRate: 195, occupancy: 84, share: 60 },
        { type: 'Single Family', avgPrice: 650000, nightlyRate: 245, occupancy: 78, share: 25 },
        { type: 'Townhouse', avgPrice: 520000, nightlyRate: 185, occupancy: 82, share: 15 }
      ]
    },
    'aspen-co': {
      name: 'Aspen, CO',
      medianPrice: 890000,
      priceChange: 18.2,
      medianNightlyRate: 385,
      avgOccupancy: 68,
      revPAR: 262,
      daysOnMarket: 31,
      totalListings: 156,
      newListings: 12,
      inventory: 1.8,
      cashOnCashReturn: 14.2,
      capRate: 4.1,
      forecast: 'strong',
      seasonality: { peak: 'Dec-Mar, Jun-Aug', low: 'Apr-May, Sep-Nov' },
      topNeighborhoods: [
        { name: 'West End', avgPrice: 1200000, avgNightly: 450, growth: 22.1, revpar: 315, occupancy: 70 },
        { name: 'Red Mountain', avgPrice: 950000, avgNightly: 380, growth: 19.8, revpar: 266, occupancy: 68 },
        { name: 'East Aspen', avgPrice: 720000, avgNightly: 325, growth: 16.5, revpar: 228, occupancy: 66 }
      ],
      propertyTypes: [
        { type: 'Condo', avgPrice: 750000, nightlyRate: 350, occupancy: 70, share: 40 },
        { type: 'Single Family', avgPrice: 1200000, nightlyRate: 485, occupancy: 65, share: 45 },
        { type: 'Chalet', avgPrice: 1500000, nightlyRate: 625, occupancy: 62, share: 15 }
      ]
    },
    'nashville-tn': {
      name: 'Nashville, TN',
      medianPrice: 395000,
      priceChange: 6.8,
      medianNightlyRate: 165,
      avgOccupancy: 74,
      revPAR: 122,
      daysOnMarket: 19,
      totalListings: 1840,
      newListings: 198,
      inventory: 2.4,
      cashOnCashReturn: 13.1,
      capRate: 6.8,
      forecast: 'positive',
      seasonality: { peak: 'Mar-Jun, Sep-Nov', low: 'Jan-Feb' },
      topNeighborhoods: [
        { name: 'Music Row', avgPrice: 485000, avgNightly: 195, growth: 14.2, revpar: 144, occupancy: 76 },
        { name: 'The Gulch', avgPrice: 525000, avgNightly: 205, growth: 11.5, revpar: 152, occupancy: 74 },
        { name: 'Downtown', avgPrice: 465000, avgNightly: 185, growth: 8.9, revpar: 137, occupancy: 75 }
      ],
      propertyTypes: [
        { type: 'Condo', avgPrice: 385000, nightlyRate: 155, occupancy: 76, share: 50 },
        { type: 'Single Family', avgPrice: 445000, nightlyRate: 185, occupancy: 72, share: 40 },
        { type: 'Townhouse', avgPrice: 420000, nightlyRate: 170, occupancy: 74, share: 10 }
      ]
    },
    'charleston-sc': {
      name: 'Charleston, SC',
      medianPrice: 525000,
      priceChange: 4.2,
      medianNightlyRate: 195,
      avgOccupancy: 71,
      revPAR: 138,
      daysOnMarket: 26,
      totalListings: 980,
      newListings: 85,
      inventory: 2.8,
      cashOnCashReturn: 11.4,
      capRate: 5.2,
      forecast: 'stable',
      seasonality: { peak: 'Mar-Jun, Oct-Nov', low: 'Jan-Feb, Jul-Aug' },
      topNeighborhoods: [
        { name: 'Historic District', avgPrice: 685000, avgNightly: 245, growth: 6.8, revpar: 174, occupancy: 73 },
        { name: 'French Quarter', avgPrice: 625000, avgNightly: 225, growth: 5.2, revpar: 162, occupancy: 72 },
        { name: 'King Street', avgPrice: 485000, avgNightly: 185, growth: 7.1, revpar: 131, occupancy: 71 }
      ],
      propertyTypes: [
        { type: 'Historic Home', avgPrice: 625000, nightlyRate: 235, occupancy: 69, share: 35 },
        { type: 'Condo', avgPrice: 465000, nightlyRate: 175, occupancy: 73, share: 45 },
        { type: 'Townhouse', avgPrice: 545000, nightlyRate: 205, occupancy: 71, share: 20 }
      ]
    },
    'park-city-ut': {
      name: 'Park City, UT',
      medianPrice: 825000,
      priceChange: 12.4,
      medianNightlyRate: 285,
      avgOccupancy: 65,
      revPAR: 185,
      daysOnMarket: 35,
      totalListings: 425,
      newListings: 28,
      inventory: 2.1,
      cashOnCashReturn: 13.8,
      capRate: 4.5,
      forecast: 'strong',
      seasonality: { peak: 'Dec-Mar, Jun-Sep', low: 'Apr-May, Oct-Nov' },
      topNeighborhoods: [
        { name: 'Old Town', avgPrice: 1050000, avgNightly: 365, growth: 15.8, revpar: 237, occupancy: 67 },
        { name: 'Deer Valley', avgPrice: 1250000, avgNightly: 425, growth: 18.2, revpar: 276, occupancy: 63 },
        { name: 'Canyons Village', avgPrice: 685000, avgNightly: 245, growth: 11.5, revpar: 159, occupancy: 65 }
      ],
      propertyTypes: [
        { type: 'Condo', avgPrice: 685000, nightlyRate: 255, occupancy: 67, share: 45 },
        { type: 'Single Family', avgPrice: 1050000, nightlyRate: 345, occupancy: 62, share: 40 },
        { type: 'Chalet', avgPrice: 1350000, nightlyRate: 485, occupancy: 58, share: 15 }
      ]
    }
  };

  const currentMarket = marketData[selectedMarket as keyof typeof marketData];

  const trendsData = {
    '6m': [
      { month: 'Jul 2024', avgPrice: 475000, nightlyRate: 178, occupancy: 74, revpar: 132 },
      { month: 'Aug 2024', avgPrice: 478000, nightlyRate: 180, occupancy: 75, revpar: 135 },
      { month: 'Sep 2024', avgPrice: 481000, nightlyRate: 182, occupancy: 76, revpar: 138 },
      { month: 'Oct 2024', avgPrice: 483000, nightlyRate: 184, occupancy: 77, revpar: 142 },
      { month: 'Nov 2024', avgPrice: 484000, nightlyRate: 185, occupancy: 76, revpar: 141 },
      { month: 'Dec 2024', avgPrice: 485000, nightlyRate: 185, occupancy: 76, revpar: 140 }
    ],
    '12m': [
      { month: 'Jan 2024', avgPrice: 462000, nightlyRate: 172, occupancy: 71, revpar: 122 },
      { month: 'Feb 2024', avgPrice: 468000, nightlyRate: 175, occupancy: 74, revpar: 130 },
      { month: 'Mar 2024', avgPrice: 471000, nightlyRate: 178, occupancy: 76, revpar: 135 },
      { month: 'Apr 2024', avgPrice: 476000, nightlyRate: 182, occupancy: 78, revpar: 142 },
      { month: 'May 2024', avgPrice: 482000, nightlyRate: 184, occupancy: 79, revpar: 145 },
      { month: 'Jun 2024', avgPrice: 485000, nightlyRate: 185, occupancy: 76, revpar: 140 },
      { month: 'Jul 2024', avgPrice: 475000, nightlyRate: 178, occupancy: 74, revpar: 132 },
      { month: 'Aug 2024', avgPrice: 478000, nightlyRate: 180, occupancy: 75, revpar: 135 },
      { month: 'Sep 2024', avgPrice: 481000, nightlyRate: 182, occupancy: 76, revpar: 138 },
      { month: 'Oct 2024', avgPrice: 483000, nightlyRate: 184, occupancy: 77, revpar: 142 },
      { month: 'Nov 2024', avgPrice: 484000, nightlyRate: 185, occupancy: 76, revpar: 141 },
      { month: 'Dec 2024', avgPrice: 485000, nightlyRate: 185, occupancy: 76, revpar: 140 }
    ],
    '24m': [
      { month: 'Jan 2023', avgPrice: 425000, nightlyRate: 158, occupancy: 68, revpar: 107 },
      { month: 'Mar 2023', avgPrice: 432000, nightlyRate: 162, occupancy: 69, revpar: 112 },
      { month: 'May 2023', avgPrice: 438000, nightlyRate: 165, occupancy: 70, revpar: 116 },
      { month: 'Jul 2023', avgPrice: 445000, nightlyRate: 168, occupancy: 71, revpar: 119 },
      { month: 'Sep 2023', avgPrice: 452000, nightlyRate: 170, occupancy: 72, revpar: 122 },
      { month: 'Nov 2023', avgPrice: 458000, nightlyRate: 172, occupancy: 73, revpar: 125 },
      { month: 'Jan 2024', avgPrice: 462000, nightlyRate: 172, occupancy: 71, revpar: 122 },
      { month: 'Mar 2024', avgPrice: 471000, nightlyRate: 178, occupancy: 76, revpar: 135 },
      { month: 'May 2024', avgPrice: 482000, nightlyRate: 184, occupancy: 79, revpar: 145 },
      { month: 'Jul 2024', avgPrice: 475000, nightlyRate: 178, occupancy: 74, revpar: 132 },
      { month: 'Sep 2024', avgPrice: 481000, nightlyRate: 182, occupancy: 76, revpar: 138 },
      { month: 'Dec 2024', avgPrice: 485000, nightlyRate: 185, occupancy: 76, revpar: 140 }
    ]
  };

  const currentTrends = trendsData[selectedTimeframe as keyof typeof trendsData];

  const marketComparison = [
    { market: 'Austin, TX', revpar: 140, occupancy: 76, growth: 8.5, cashReturn: 12.3 },
    { market: 'Miami, FL', revpar: 143, occupancy: 82, growth: -2.1, cashReturn: 10.8 },
    { market: 'Aspen, CO', revpar: 262, occupancy: 68, growth: 18.2, cashReturn: 14.2 },
    { market: 'Nashville, TN', revpar: 122, occupancy: 74, growth: 6.8, cashReturn: 13.1 },
    { market: 'Charleston, SC', revpar: 138, occupancy: 71, growth: 4.2, cashReturn: 11.4 },
    { market: 'Park City, UT', revpar: 185, occupancy: 65, growth: 12.4, cashReturn: 13.8 }
  ];

  const calculateROI = () => {
    const { purchasePrice, downPayment, nightlyRate, occupancyRate, expenses } = calculatorInputs;
    const annualRevenue = nightlyRate * 365 * (occupancyRate / 100);
    const annualExpenses = annualRevenue * (expenses / 100);
    const netIncome = annualRevenue - annualExpenses;
    const cashOnCashReturn = (netIncome / downPayment) * 100;
    const capRate = (netIncome / purchasePrice) * 100;
    
    return {
      annualRevenue: Math.round(annualRevenue),
      annualExpenses: Math.round(annualExpenses),
      netIncome: Math.round(netIncome),
      cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
      capRate: Math.round(capRate * 10) / 10
    };
  };

  const roiResults = calculateROI();

  const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-black">Short-Term Rental Market Intelligence</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-black">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="text-black">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
        <p className="text-black max-w-4xl">
          Comprehensive market analytics for short-term rental investors. Track performance metrics, 
          analyze trends, compare markets, and make data-driven investment decisions with real-time insights.
        </p>
      </div>

      {/* Market Selector & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6 bg-purple-lighter/50 rounded-lg">
        <div>
          <Label className="text-black mb-2 block">Market</Label>
          <Select value={selectedMarket} onValueChange={setSelectedMarket}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="austin-tx">Austin, TX</SelectItem>
              <SelectItem value="miami-fl">Miami, FL</SelectItem>
              <SelectItem value="aspen-co">Aspen, CO</SelectItem>
              <SelectItem value="nashville-tn">Nashville, TN</SelectItem>
              <SelectItem value="charleston-sc">Charleston, SC</SelectItem>
              <SelectItem value="park-city-ut">Park City, UT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-black mb-2 block">Timeframe</Label>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
              <SelectItem value="24m">Last 24 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-black mb-2 block">Data Updated</Label>
          <div className="flex items-center h-10 px-3 border rounded-md bg-background">
            <span className="text-sm text-black">December 28, 2024</span>
          </div>
        </div>
        <div>
          <Label className="text-black mb-2 block">Market Status</Label>
          <div className="flex items-center h-10 px-3">
            <Badge className={`${
              currentMarket.forecast === 'strong' ? 'bg-green-100 text-green-800' :
              currentMarket.forecast === 'positive' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {currentMarket.forecast === 'strong' ? 'Strong Growth' :
               currentMarket.forecast === 'positive' ? 'Positive Outlook' : 'Stable Market'}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends & Charts</TabsTrigger>
          <TabsTrigger value="neighborhoods">Neighborhoods</TabsTrigger>
          <TabsTrigger value="comparison">Market Comparison</TabsTrigger>
          <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Median Property Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl text-black">
                    ${currentMarket.medianPrice.toLocaleString()}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    currentMarket.priceChange > 0 ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {currentMarket.priceChange > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm">{formatNumber(Math.abs(currentMarket.priceChange))}%</span>
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={Math.min(currentMarket.priceChange + 50, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Average RevPAR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-black">
                  ${formatNumber(currentMarket.revPAR)}
                </div>
                <div className="text-sm text-black mt-1">Revenue per available room</div>
                <div className="mt-2">
                  <Progress value={(currentMarket.revPAR / 300) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Cash-on-Cash Return</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">
                  {formatNumber(currentMarket.cashOnCashReturn)}%
                </div>
                <div className="text-sm text-black mt-1">Annual return on investment</div>
                <div className="mt-2">
                  <Progress value={currentMarket.cashOnCashReturn * 5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-purple">
                  {formatNumber(currentMarket.avgOccupancy)}%
                </div>
                <div className="text-sm text-black mt-1">Average yearly occupancy</div>
                <div className="mt-2">
                  <Progress value={currentMarket.avgOccupancy} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Average Nightly Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl text-black">${formatNumber(currentMarket.medianNightlyRate)}</div>
                <div className="text-sm text-black">per night</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Cap Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl text-black">{formatNumber(currentMarket.capRate)}%</div>
                <div className="text-sm text-black">capitalization rate</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Days on Market</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl text-black">{currentMarket.daysOnMarket} days</div>
                <div className="text-sm text-black">average listing time</div>
              </CardContent>
            </Card>
          </div>

          {/* Market Activity & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Market Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-purple" />
                    <span className="text-black">Total Active Listings</span>
                  </div>
                  <span className="text-black">{currentMarket.totalListings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple" />
                    <span className="text-black">New This Month</span>
                  </div>
                  <span className="text-black">{currentMarket.newListings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple" />
                    <span className="text-black">Inventory (months)</span>
                  </div>
                  <span className="text-black">{currentMarket.inventory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple" />
                    <span className="text-black">Peak Season</span>
                  </div>
                  <span className="text-black text-sm">{currentMarket.seasonality.peak}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Property Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentMarket.propertyTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, share }) => `${type} (${share}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="share"
                      >
                        {currentMarket.propertyTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Revenue Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revpar" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="nightlyRate" stackId="2" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Price Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value?.toLocaleString()}`, 'Average Price']} />
                        <Line type="monotone" dataKey="avgPrice" stroke="#8b5cf6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Occupancy Rate Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                        <Bar dataKey="occupancy" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="neighborhoods">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl text-black">Top Performing Neighborhoods in {currentMarket.name}</h3>
              <Badge variant="outline" className="text-black">
                Updated Dec 2024
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentMarket.topNeighborhoods.map((neighborhood, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-black">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-purple" />
                        <span>{neighborhood.name}</span>
                      </div>
                      <Badge variant={index === 0 ? 'default' : 'secondary'} className="bg-purple text-white">
                        #{index + 1}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-black">Avg Property Price</div>
                        <div className="text-lg text-black">${neighborhood.avgPrice.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-black">Nightly Rate</div>
                        <div className="text-lg text-black">${formatNumber(neighborhood.avgNightly)}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-black">RevPAR</div>
                        <div className="text-lg text-purple">${formatNumber(neighborhood.revpar)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-black">Occupancy</div>
                        <div className="text-lg text-green-600">{formatNumber(neighborhood.occupancy)}%</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-black">YoY Growth</span>
                      <div className={`flex items-center space-x-1 ${
                        neighborhood.growth > 0 ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {neighborhood.growth > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="text-sm">{formatNumber(Math.abs(neighborhood.growth))}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Market Comparison Dashboard</CardTitle>
              <p className="text-sm text-black">Compare key performance metrics across different markets</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 text-black">Market</th>
                      <th className="text-right p-4 text-black">RevPAR</th>
                      <th className="text-right p-4 text-black">Occupancy</th>
                      <th className="text-right p-4 text-black">Price Growth</th>
                      <th className="text-right p-4 text-black">Cash Return</th>
                      <th className="text-center p-4 text-black">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketComparison.map((market, index) => (
                      <tr key={index} className={`border-b hover:bg-purple-lighter/20 ${
                        market.market === currentMarket.name ? 'bg-purple-lighter/50' : ''
                      }`}>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {market.market === currentMarket.name && (
                              <Badge variant="outline" className="text-xs">Current</Badge>
                            )}
                            <span className="text-black">{market.market}</span>
                          </div>
                        </td>
                        <td className="text-right p-4 text-black">${formatNumber(market.revpar)}</td>
                        <td className="text-right p-4 text-green-600">{formatNumber(market.occupancy)}%</td>
                        <td className={`text-right p-4 ${
                          market.growth > 0 ? 'text-green-600' : 'text-red-500'
                        }`}>
                          {market.growth > 0 ? '+' : ''}{formatNumber(market.growth)}%
                        </td>
                        <td className="text-right p-4 text-purple">{formatNumber(market.cashReturn)}%</td>
                        <td className="text-center p-4">
                          <div className="flex justify-center">
                            {Array.from({ length: 5 }, (_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < Math.round(market.cashReturn / 3) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-black">
                  <Calculator className="h-5 w-5" />
                  <span>Investment ROI Calculator</span>
                </CardTitle>
                <p className="text-sm text-black">Calculate potential returns for your investment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-black">Purchase Price</Label>
                  <Input
                    type="number"
                    value={calculatorInputs.purchasePrice}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      purchasePrice: Number(e.target.value)
                    })}
                    className="text-black"
                  />
                </div>
                <div>
                  <Label className="text-black">Down Payment</Label>
                  <Input
                    type="number"
                    value={calculatorInputs.downPayment}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      downPayment: Number(e.target.value)
                    })}
                    className="text-black"
                  />
                </div>
                <div>
                  <Label className="text-black">Average Nightly Rate</Label>
                  <Input
                    type="number"
                    value={calculatorInputs.nightlyRate}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      nightlyRate: Number(e.target.value)
                    })}
                    className="text-black"
                  />
                </div>
                <div>
                  <Label className="text-black">Occupancy Rate (%)</Label>
                  <Input
                    type="number"
                    value={calculatorInputs.occupancyRate}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      occupancyRate: Number(e.target.value)
                    })}
                    className="text-black"
                  />
                </div>
                <div>
                  <Label className="text-black">Operating Expenses (%)</Label>
                  <Input
                    type="number"
                    value={calculatorInputs.expenses}
                    onChange={(e) => setCalculatorInputs({
                      ...calculatorInputs,
                      expenses: Number(e.target.value)
                    })}
                    className="text-black"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-black">
                  <Target className="h-5 w-5" />
                  <span>Projected Returns</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-lighter/50 rounded-lg">
                    <div className="text-sm text-black">Annual Revenue</div>
                    <div className="text-xl text-black">${roiResults.annualRevenue.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-purple-lighter/50 rounded-lg">
                    <div className="text-sm text-black">Annual Expenses</div>
                    <div className="text-xl text-black">${roiResults.annualExpenses.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-lighter/50 rounded-lg">
                  <div className="text-sm text-black">Net Annual Income</div>
                  <div className="text-2xl text-green-600">${roiResults.netIncome.toLocaleString()}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-lighter/50 rounded-lg">
                    <div className="text-sm text-black">Cash-on-Cash Return</div>
                    <div className="text-xl text-purple">{roiResults.cashOnCashReturn}%</div>
                  </div>
                  <div className="p-4 bg-purple-lighter/50 rounded-lg">
                    <div className="text-sm text-black">Cap Rate</div>
                    <div className="text-xl text-purple">{roiResults.capRate}%</div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-sm text-green-800 mb-1">Investment Grade</div>
                  <div className="text-lg text-green-800">
                    {roiResults.cashOnCashReturn > 15 ? 'Excellent' :
                     roiResults.cashOnCashReturn > 12 ? 'Very Good' :
                     roiResults.cashOnCashReturn > 8 ? 'Good' : 'Fair'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasts">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Market Forecast & Predictions</CardTitle>
                <p className="text-sm text-black">AI-powered insights for the next 12 months</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-lg text-green-800 mb-2">Price Forecast</h4>
                    <div className="text-2xl text-green-600 mb-2">+{formatNumber(currentMarket.priceChange * 1.2)}%</div>
                    <p className="text-sm text-green-700">
                      Continued growth expected based on demand trends and supply constraints.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-lg text-blue-800 mb-2">Demand Outlook</h4>
                    <div className="text-2xl text-blue-600 mb-2">Strong</div>
                    <p className="text-sm text-blue-700">
                      Tourist demand remains robust with increasing business travel recovery.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="text-lg text-purple-800 mb-2">Investment Rating</h4>
                    <div className="text-2xl text-purple-600 mb-2">Buy</div>
                    <p className="text-sm text-purple-700">
                      Market fundamentals support continued investment opportunities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Seasonal Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg text-black mb-4">Peak Season Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-black">Period:</span>
                        <span className="text-black">{currentMarket.seasonality.peak}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Occupancy Boost:</span>
                        <span className="text-green-600">+15-20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Rate Premium:</span>
                        <span className="text-green-600">+25-35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg text-black mb-4">Low Season Insights</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-black">Period:</span>
                        <span className="text-black">{currentMarket.seasonality.low}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Occupancy Impact:</span>
                        <span className="text-red-500">-20-30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black">Strategy:</span>
                        <span className="text-blue-600">Monthly rentals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}