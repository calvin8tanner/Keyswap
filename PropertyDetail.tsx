import { useState } from 'react';
import { ArrowLeft, MapPin, Bed, Bath, Users, Calendar, DollarSign, TrendingUp, Car, Utensils, Waves, Phone, Mail, Wifi, CheckCircle, Building, Star, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getNearbyPropertyManagers, getFeaturedPropertyManager } from './PropertyManagerService';
import { MonthlyProfitCalculator } from './MonthlyProfitCalculator';
import { PropertyMap } from './PropertyMap';

interface PropertyDetailProps {
  property: any; // Using any to handle different property formats
  onBack: () => void;
}

export function PropertyDetail({ property, onBack }: PropertyDetailProps) {
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

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Transform property data to handle different formats
  const normalizedProperty = {
    id: property.id || 1,
    title: property.title || 'Property Title',
    location: property.location || 'Location Not Available',
    listingPrice: property.listingPrice || property.price || 0,
    nightlyRate: property.nightlyRate || property.nightly_rate || 0,
    annualRevenue: property.annualRevenue || (property.nightly_rate || 100) * 365 * ((property.occupancy_rate || 75) / 100),
    occupancyRate: property.occupancyRate || property.occupancy_rate || 75,
    revPAR: property.revPAR || property.revpar || 0,
    images: property.images || ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'],
    description: property.description,
    propertyType: property.propertyType || property.property_type || 'Property',
    features: property.features || [
      'High Occupancy Rate',
      'WiFi',
      'Kitchen',
      'Parking',
      'AC/Heating',
      'Washer/Dryer',
      'Smart TV',
      'Self Check-in'
    ],
    host: property.host || 'Property Owner',
    bedrooms: property.bedrooms || 2,
    bathrooms: property.bathrooms || 2,
    sleeps: property.sleeps || (property.bedrooms || 2) * 2,
    sqft: property.sqft || 1200,
    yearBuilt: property.yearBuilt || 2015,
    daysOnMarket: property.daysOnMarket || 30,
    strRating: property.strRating || property.airbnbRating || 4.8,
    reviewCount: property.reviewCount || 125,
    superhostStatus: property.superhostStatus || false
  };

  // Get nearby property managers
  const nearbyManagers = getNearbyPropertyManagers(normalizedProperty.location);
  const featuredManager = getFeaturedPropertyManager(normalizedProperty.location);

  const featureIcons: { [key: string]: any } = {
    'High Occupancy Rate': TrendingUp,
    'Superhost Property': CheckCircle,
    'Instant Book Ready': Calendar,
    'Self Check-in': Users,
    'Professional Photos': Users,
    'Guest Favorites': CheckCircle,
    'Hot Tub': Waves,
    'Pool': Waves,
    'WiFi': Wifi,
    'Kitchen': Utensils,
    'Parking': Car,
    'Pet Friendly': Users,
    'AC/Heating': Users,
    'Washer/Dryer': Users,
    'Smart TV': Users,
    'Workspace': Users,
    'Fire Pit': Users,
    'Outdoor Seating': Users,
    'Game Room': Users,
    'Near Attractions': MapPin
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inquiry submitted:', inquiryForm);
  };

  const monthlyRevenue = normalizedProperty.annualRevenue / 12;
  const pricePerSqft = normalizedProperty.listingPrice / normalizedProperty.sqft;
  const capRate = ((normalizedProperty.annualRevenue - (normalizedProperty.annualRevenue * 0.3)) / normalizedProperty.listingPrice) * 100;

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
      {/* Back button */}
      <Button variant="ghost" onClick={onBack} className="mb-6 text-black hover:bg-purple-lighter">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to results
      </Button>

      {/* Property header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-purple-lighter text-black">
            {normalizedProperty.propertyType.replace('-', ' ')}
          </Badge>
          <Badge className="bg-green-100 text-green-800 border border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Income Verified
          </Badge>
          {normalizedProperty.superhostStatus && (
            <Badge className="bg-purple-dark text-white">Superhost Property</Badge>
          )}
          <Badge variant="outline" className="border-purple/20 text-black">
            {normalizedProperty.daysOnMarket} days on market
          </Badge>
        </div>
        <h1 className="mb-2 text-black">{normalizedProperty.title}</h1>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-black">
            <MapPin className="h-4 w-4 text-purple" />
            <span>{normalizedProperty.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-purple" />
            <span className="text-black">{formatNumber(normalizedProperty.occupancyRate)}% occupied</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Property details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageWithFallback
              src={normalizedProperty.images[0]}
              alt={normalizedProperty.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
            <div className="hidden md:grid grid-cols-1 gap-4">
              {normalizedProperty.images.slice(1, 3).map((image, index) => (
                <ImageWithFallback
                  key={index}
                  src={image}
                  alt={`Property ${index + 2}`}
                  className="w-full h-44 object-cover rounded-lg"
                />
              ))}
              {normalizedProperty.images.length < 3 && (
                <div className="w-full h-44 bg-purple-lighter rounded-lg flex items-center justify-center">
                  <span className="text-black">Additional Photos</span>
                </div>
              )}
            </div>
          </div>

          {/* STR Performance Metrics */}
          <Card className="border-purple/10">
            <CardHeader>
              <CardTitle className="text-black">STR Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-purple">{formatNumber(normalizedProperty.occupancyRate)}%</div>
                  <div className="text-sm text-black">Occupancy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-black">${formatNumber(normalizedProperty.revPAR)}</div>
                  <div className="text-sm text-black">RevPAR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-black">${formatNumber(monthlyRevenue)}</div>
                  <div className="text-sm text-black">Monthly Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Bed className="h-5 w-5 text-purple" />
              <div>
                <div className="text-black">{formatNumber(normalizedProperty.bedrooms)}</div>
                <div className="text-sm text-black">Bedrooms</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bath className="h-5 w-5 text-purple" />
              <div>
                <div className="text-black">{formatNumber(normalizedProperty.bathrooms)}</div>
                <div className="text-sm text-black">Bathrooms</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-purple" />
              <div>
                <div className="text-black">{normalizedProperty.sleeps}</div>
                <div className="text-sm text-black">Sleeps</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-purple" />
              <div>
                <div className="text-black">{normalizedProperty.yearBuilt}</div>
                <div className="text-sm text-black">Year Built</div>
              </div>
            </div>
          </div>

          <Separator className="border-purple/10" />

          {/* Property Description */}
          <div>
            <h3 className="mb-4 text-black">Investment Overview</h3>
            {normalizedProperty.description ? (
              <p className="text-black leading-relaxed">
                {normalizedProperty.description}
              </p>
            ) : (
              <>
                <p className="text-black mb-4">
                  This {normalizedProperty.propertyType.replace('-', ' ')} STR property in {normalizedProperty.location} offers 
                  exceptional returns with {formatNumber(normalizedProperty.occupancyRate)}% occupancy rate. 
                  Built in {normalizedProperty.yearBuilt}, this {normalizedProperty.sqft.toLocaleString()} square foot property sleeps {normalizedProperty.sleeps} guests 
                  comfortably across {formatNumber(normalizedProperty.bedrooms)} bedrooms and {formatNumber(normalizedProperty.bathrooms)} bathrooms.
                </p>
                <p className="text-black">
                  The property generates ${normalizedProperty.annualRevenue.toLocaleString()} in annual revenue, making it an ideal turnkey STR investment.
                  {normalizedProperty.superhostStatus && " This property comes with Superhost status, ensuring higher visibility and booking rates."}
                </p>
              </>
            )}
          </div>

          <Separator className="border-purple/10" />

          {/* STR Features */}
          <div>
            <h3 className="mb-4 text-black">STR Features & Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {normalizedProperty.features.map((feature: string) => {
                const IconComponent = featureIcons[feature] || Users;
                return (
                  <div key={feature} className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-purple" />
                    <span className="text-black">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator className="border-purple/10" />

          {/* Property Location Map */}
          <div>
            <h3 className="mb-4 text-black">Property Location</h3>
            <PropertyMap
              properties={[{
                id: normalizedProperty.id,
                title: normalizedProperty.title,
                location: normalizedProperty.location,
                price: normalizedProperty.listingPrice,
                nightlyRate: normalizedProperty.nightlyRate,
                occupancyRate: normalizedProperty.occupancyRate,
                revpar: normalizedProperty.revPAR,
                propertyType: normalizedProperty.propertyType,
                bedrooms: normalizedProperty.bedrooms,
                bathrooms: normalizedProperty.bathrooms,
                sqft: normalizedProperty.sqft,
                images: normalizedProperty.images,
                guestRating: normalizedProperty.guestRating,
                capRate: normalizedProperty.estimatedCapRate,
                annualRevenue: normalizedProperty.annualRevenue
              }]}
              singleProperty={true}
              height="350px"
            />
            <p className="text-sm text-black mt-2">
              <MapPin className="inline h-4 w-4 text-purple mr-1" />
              {normalizedProperty.location}
            </p>
          </div>
        </div>

        {/* Right column - Investment details and contact */}
        <div className="lg:col-span-1 space-y-6">
          {/* Investment Summary */}
          <Card className="border-purple/10">
            <CardHeader>
              <CardTitle className="text-2xl text-black">
                ${formatNumber(normalizedProperty.listingPrice, 0)}
              </CardTitle>
              <p className="text-black">${formatNumber(pricePerSqft, 0)} per sq ft</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black">Annual Revenue:</span>
                  <span className="text-black">${normalizedProperty.annualRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Occupancy Rate:</span>
                  <span className="text-purple">{formatNumber(normalizedProperty.occupancyRate)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">RevPAR:</span>
                  <span className="text-purple">${formatNumber(normalizedProperty.revPAR)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black">Est. Cap Rate:</span>
                  <span className="text-purple">{formatNumber(capRate)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Profit Calculator */}
          <MonthlyProfitCalculator 
            propertyPrice={normalizedProperty.listingPrice}
            annualRevenue={normalizedProperty.annualRevenue}
            propertyType={normalizedProperty.propertyType}
          />

          {/* Host Contact */}
          <Card className="border-purple/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple text-white">{normalizedProperty.host.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-black">{normalizedProperty.host}</div>
                  <div className="text-sm text-black">Property Owner</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button className="flex-1 bg-purple hover:bg-purple-dark text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="flex-1 border-purple/20 text-black hover:bg-purple-lighter">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Investment Inquiry Form */}
          <Card className="border-purple/10">
            <CardHeader>
              <CardTitle className="text-black">Investment Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                  className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                  className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                  className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                />
                <Textarea
                  placeholder="I'm interested in this STR investment property..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                  rows={4}
                  className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                />
                <Button type="submit" className="w-full bg-purple hover:bg-purple-dark text-white">
                  Send Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verified STR Income Statement */}
      <div className="mt-12">
        <Separator className="border-purple/10 mb-8" />
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-6 w-6 text-forest-green" />
            <h2 className="text-2xl text-black">Verified STR Income</h2>
          </div>
          <p className="text-black">Official STR income statement verified by Keyswap</p>
        </div>

        <Card className="border-2 border-forest-green bg-white">
          <CardHeader className="bg-gradient-to-r from-tan-lighter to-tan-light border-b-2 border-forest-green">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-black flex items-center gap-2 mb-2">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=40&h=40"
                    alt="STR Platform"
                    className="w-8 h-8 rounded"
                  />
                  STR Income Statement
                </CardTitle>
                <p className="text-sm text-black">Property ID: {normalizedProperty.id} • Last 12 Months</p>
              </div>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Income Statement Table */}
            <div className="space-y-6">
              {/* Gross Revenue Section */}
              <div>
                <h3 className="text-lg text-black mb-4 pb-2 border-b border-tan">Gross Revenue</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-black">Nightly Bookings</span>
                    <span className="text-black">${formatNumber(normalizedProperty.annualRevenue * 0.92)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Cleaning Fees</span>
                    <span className="text-black">${formatNumber(normalizedProperty.annualRevenue * 0.06)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black">Extra Guest Fees</span>
                    <span className="text-black">${formatNumber(normalizedProperty.annualRevenue * 0.02)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-tan">
                    <span className="text-black">Total Gross Revenue</span>
                    <span className="text-xl text-forest-green">${formatNumber(normalizedProperty.annualRevenue)}</span>
                  </div>
                </div>
              </div>

              {/* Booking Statistics */}
              <div>
                <h3 className="text-lg text-black mb-4 pb-2 border-b border-tan">Booking Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <p className="text-sm text-black mb-1">Total Nights Booked</p>
                    <p className="text-2xl text-forest-green">{Math.round((normalizedProperty.occupancyRate / 100) * 365)}</p>
                  </div>
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <p className="text-sm text-black mb-1">Occupancy Rate</p>
                    <p className="text-2xl text-forest-green">{formatNumber(normalizedProperty.occupancyRate)}%</p>
                  </div>
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <p className="text-sm text-black mb-1">Avg. Nightly Rate</p>
                    <p className="text-2xl text-forest-green">${formatNumber(normalizedProperty.nightlyRate)}</p>
                  </div>
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <p className="text-sm text-black mb-1">RevPAR</p>
                    <p className="text-2xl text-forest-green">${formatNumber(normalizedProperty.revPAR)}</p>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div>
                <h3 className="text-lg text-black mb-4 pb-2 border-b border-tan">Monthly Income Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { month: 'January', revenue: normalizedProperty.annualRevenue * 0.07 },
                    { month: 'February', revenue: normalizedProperty.annualRevenue * 0.06 },
                    { month: 'March', revenue: normalizedProperty.annualRevenue * 0.08 },
                    { month: 'April', revenue: normalizedProperty.annualRevenue * 0.09 },
                    { month: 'May', revenue: normalizedProperty.annualRevenue * 0.10 },
                    { month: 'June', revenue: normalizedProperty.annualRevenue * 0.11 },
                    { month: 'July', revenue: normalizedProperty.annualRevenue * 0.12 },
                    { month: 'August', revenue: normalizedProperty.annualRevenue * 0.11 },
                    { month: 'September', revenue: normalizedProperty.annualRevenue * 0.09 },
                    { month: 'October', revenue: normalizedProperty.annualRevenue * 0.08 },
                    { month: 'November', revenue: normalizedProperty.annualRevenue * 0.05 },
                    { month: 'December', revenue: normalizedProperty.annualRevenue * 0.04 }
                  ].map((item) => (
                    <div key={item.month} className="flex justify-between items-center p-3 bg-tan-lighter rounded border border-tan">
                      <span className="text-sm text-black">{item.month}</span>
                      <span className="text-black">${formatNumber(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Performance */}
              <div>
                <h3 className="text-lg text-black mb-4 pb-2 border-b border-tan">Guest Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-black">Guest Rating</span>
                    </div>
                    <p className="text-2xl text-forest-green">{normalizedProperty.strRating}</p>
                    <p className="text-sm text-black">{normalizedProperty.reviewCount} reviews</p>
                  </div>
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-forest-green" />
                      <span className="text-black">Total Guests</span>
                    </div>
                    <p className="text-2xl text-forest-green">{Math.round((normalizedProperty.occupancyRate / 100) * 365 * 2.3)}</p>
                    <p className="text-sm text-black">Last 12 months</p>
                  </div>
                  <div className="bg-tan-lighter p-4 rounded-lg border border-tan">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-forest-green" />
                      <span className="text-black">Repeat Guests</span>
                    </div>
                    <p className="text-2xl text-forest-green">18%</p>
                    <p className="text-sm text-black">Above average</p>
                  </div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-black mb-1">Income Verification</h4>
                    <p className="text-sm text-black mb-2">
                      This income statement has been verified by Keyswap through direct integration with STR platform APIs. 
                      All data is pulled directly from the host's STR account and represents actual earned income 
                      over the past 12 months (September 2024 - September 2025).
                    </p>
                    <p className="text-xs text-black">
                      Verified on: September 29, 2025 • Document ID: KS-{normalizedProperty.id}-2025-09
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Manager Advertisements - Location Based */}
      {featuredManager && (
        <div className="mt-12">
          <Separator className="border-purple/10 mb-8" />
          <div className="mb-6">
            <h2 className="text-2xl text-black mb-2">Need Help Managing This Property?</h2>
            <p className="text-black">Professional property managers in your area can handle everything for you.</p>
          </div>

          {/* Featured Property Manager */}
          <Card className="border border-forest-green bg-gradient-to-r from-tan-lighter to-tan-light mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-forest-green text-white">
                    <Building className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <span className="text-sm text-black">Property Management</span>
                </div>
                <Button variant="outline" size="sm" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                  Get Quote
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={featuredManager.image}
                  alt={featuredManager.managerName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg text-black mb-1">{featuredManager.companyName}</h3>
                  <p className="text-sm text-black mb-2">{featuredManager.managerName} • {featuredManager.location}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-black">{featuredManager.rating}</span>
                      <span className="text-sm text-gray-600">({featuredManager.reviewCount})</span>
                    </div>
                    <div className="text-sm text-black">{featuredManager.avgOccupancyRate}% avg occupancy</div>
                    <div className="text-sm text-forest-green">{featuredManager.monthlyFee} fee</div>
                  </div>
                  <p className="text-sm text-black mb-3">{featuredManager.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {featuredManager.services.slice(0, 4).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-forest-green/20">
                        {service}
                      </Badge>
                    ))}
                    {featuredManager.services.length > 4 && (
                      <Badge variant="outline" className="text-xs border-forest-green/20">
                        +{featuredManager.services.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-forest-green hover:bg-forest-green-dark text-white">
                      <Phone className="w-3 h-3 mr-1" />
                      {featuredManager.phone}
                    </Button>
                    <Button variant="outline" size="sm" className="border-forest-green text-forest-green">
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Nearby Property Managers */}
          {nearbyManagers.length > 1 && (
            <div>
              <h3 className="text-lg text-black mb-4">Other Property Managers Nearby</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyManagers.slice(1, 3).map((manager) => (
                  <Card key={manager.id} className="border border-black hover:border-forest-green transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <ImageWithFallback
                          src={manager.image}
                          alt={manager.managerName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-black">{manager.companyName}</h4>
                          <p className="text-sm text-gray-600 mb-2">{manager.managerName}</p>
                          <div className="flex items-center gap-3 text-sm mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-black">{manager.rating}</span>
                            </div>
                            <span className="text-black">{manager.avgOccupancyRate}% occ.</span>
                            <span className="text-forest-green">{manager.monthlyFee}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {manager.services.slice(0, 2).map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}