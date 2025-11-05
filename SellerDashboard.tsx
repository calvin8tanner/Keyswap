import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Home, 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Settings,
  CreditCard,
  Rocket,
  Plus,
  MoreVertical,
  MapPin,
  Users,
  BarChart3,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';

interface SellerDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function SellerDashboard({ onNavigate, onLogout }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock seller data
  const sellerData = {
    name: 'John Investor',
    email: 'john@keyswap.com',
    memberSince: 'January 2024',
    totalListings: 4,
    activeListings: 3,
    totalViews: 1247,
    totalInquiries: 38,
    subscriptionPlan: 'Premium Seller',
    subscriptionPrice: 75,
    subscriptionStatus: 'active',
    renewalDate: 'October 29, 2025',
    boostCredits: 3,
    maxListings: 10,
    maxBoosts: 5
  };

  // Mock listings data
  const listings = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      location: "Miami Beach, FL",
      price: 485000,
      status: 'active',
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800",
      views: 324,
      inquiries: 12,
      boosted: true,
      boostExpiry: '5 days left',
      listedDate: 'Sep 15, 2025',
      daysOnMarket: 14
    },
    {
      id: 2,
      title: "Luxury Beach House",
      location: "Destin, FL",
      price: 850000,
      status: 'active',
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      views: 567,
      inquiries: 18,
      boosted: false,
      listedDate: 'Aug 22, 2025',
      daysOnMarket: 38
    },
    {
      id: 3,
      title: "Cozy Mountain Cabin",
      location: "Gatlinburg, TN",
      price: 425000,
      status: 'active',
      image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
      views: 289,
      inquiries: 7,
      boosted: false,
      listedDate: 'Sep 01, 2025',
      daysOnMarket: 28
    },
    {
      id: 4,
      title: "Historic Downtown Loft",
      location: "Charleston, SC",
      price: 595000,
      status: 'pending',
      image: "https://images.unsplash.com/photo-1502672260066-6bc35f0ffeee?w=800",
      views: 67,
      inquiries: 1,
      boosted: false,
      listedDate: 'Jul 10, 2025',
      daysOnMarket: 81
    }
  ];

  // Mock recent viewers data
  const recentViewers = [
    { name: 'Sarah Chen', location: 'San Francisco, CA', time: '2 hours ago', propertyId: 1, interested: true },
    { name: 'Michael Torres', location: 'Austin, TX', time: '5 hours ago', propertyId: 2, interested: false },
    { name: 'Emily Johnson', location: 'Seattle, WA', time: '1 day ago', propertyId: 1, interested: true },
    { name: 'David Kim', location: 'Los Angeles, CA', time: '1 day ago', propertyId: 3, interested: true },
    { name: 'Jessica Martinez', location: 'Denver, CO', time: '2 days ago', propertyId: 2, interested: false }
  ];

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-600 text-white';
      case 'sold': return 'bg-forest-green text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest-green text-white shadow-lg">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl text-white cursor-pointer" onClick={() => onNavigate('home')}>Keyswap</h1>
              <Badge className="bg-tan text-black">Seller Dashboard</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-forest-green-dark"
                onClick={() => onNavigate('home')}
              >
                <Home className="h-4 w-4 mr-2" />
                Marketplace
              </Button>
              <div className="h-8 w-px bg-white/20" />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-tan text-black">{sellerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm text-white">{sellerData.name}</p>
                  <p className="text-xs text-white/80">{sellerData.subscriptionPlan}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-forest-green-dark"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl mb-2 text-black">Welcome back, {sellerData.name.split(' ')[0]}!</h2>
          <p className="text-black">Manage your listings, track performance, and grow your portfolio.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-forest-green/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black mb-1">Active Listings</p>
                  <p className="text-3xl text-black">{sellerData.activeListings}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <Home className="h-6 w-6 text-forest-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-forest-green/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black mb-1">Total Views</p>
                  <p className="text-3xl text-black">{formatNumber(sellerData.totalViews)}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-forest-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-forest-green/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black mb-1">Inquiries</p>
                  <p className="text-3xl text-black">{sellerData.totalInquiries}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-forest-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-forest-green/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black mb-1">Boost Credits</p>
                  <p className="text-3xl text-black">{sellerData.boostCredits}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-forest-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">My Listings</TabsTrigger>
            <TabsTrigger value="viewers">Recent Viewers</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl text-black">Your Property Listings</h3>
              <Button 
                className="bg-forest-green hover:bg-forest-green-dark text-white"
                onClick={() => onNavigate('sell')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </div>

            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="border border-tan hover:border-forest-green transition-all overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Property Image */}
                      <div className="w-full md:w-80 h-56 md:h-auto flex-shrink-0 relative">
                        <ImageWithFallback
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                        {listing.boosted && (
                          <Badge className="absolute top-4 right-4 bg-yellow-500 text-white shadow-lg">
                            <Rocket className="h-3 w-3 mr-1" />
                            Boosted
                          </Badge>
                        )}
                        <Badge className={`absolute top-4 left-4 ${getStatusColor(listing.status)} shadow-lg`}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </Badge>
                      </div>

                      {/* Property Info */}
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="text-2xl text-black mb-2">{listing.title}</h4>
                            <div className="flex items-center text-black mb-3">
                              <MapPin className="h-4 w-4 mr-1 text-forest-green" />
                              {listing.location}
                            </div>
                            <p className="text-3xl text-forest-green">${formatNumber(listing.price)}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-black">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Settings className="h-4 w-4 mr-2" />
                                Edit Listing
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View on Marketplace
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DollarSign className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="bg-tan-lighter p-3 rounded-lg border border-tan">
                            <div className="flex items-center gap-2 mb-1">
                              <Eye className="h-4 w-4 text-forest-green" />
                              <span className="text-xs text-black">Views</span>
                            </div>
                            <p className="text-xl text-black">{formatNumber(listing.views)}</p>
                          </div>
                          <div className="bg-tan-lighter p-3 rounded-lg border border-tan">
                            <div className="flex items-center gap-2 mb-1">
                              <Users className="h-4 w-4 text-forest-green" />
                              <span className="text-xs text-black">Inquiries</span>
                            </div>
                            <p className="text-xl text-black">{listing.inquiries}</p>
                          </div>
                          <div className="bg-tan-lighter p-3 rounded-lg border border-tan">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="h-4 w-4 text-forest-green" />
                              <span className="text-xs text-black">Days Active</span>
                            </div>
                            <p className="text-xl text-black">{listing.daysOnMarket}</p>
                          </div>
                          <div className="bg-tan-lighter p-3 rounded-lg border border-tan">
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="h-4 w-4 text-forest-green" />
                              <span className="text-xs text-black">Conv. Rate</span>
                            </div>
                            <p className="text-xl text-black">{((listing.inquiries / listing.views) * 100).toFixed(1)}%</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                          {!listing.boosted ? (
                            <Button 
                              size="sm"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white"
                              disabled={sellerData.boostCredits === 0}
                            >
                              <Rocket className="h-4 w-4 mr-2" />
                              Boost ({sellerData.boostCredits} available)
                            </Button>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-md border border-yellow-200">
                              <CheckCircle className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm text-black">Active • {listing.boostExpiry}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Viewers Tab */}
          <TabsContent value="viewers" className="space-y-6">
            <Card className="border border-black">
              <CardHeader>
                <CardTitle className="text-black">Recent Property Viewers</CardTitle>
                <p className="text-sm text-black">People who have viewed your listings in the past 7 days</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentViewers.map((viewer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-tan-lighter rounded-lg border border-tan">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-forest-green text-white">
                            {viewer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-black">{viewer.name}</p>
                          <div className="flex items-center gap-3 text-sm text-black">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-forest-green" />
                              {viewer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-forest-green" />
                              {viewer.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-forest-green text-black">
                          Property #{viewer.propertyId}
                        </Badge>
                        {viewer.interested && (
                          <Badge className="bg-green-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Interested
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" className="border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Plan - Takes 2 columns */}
              <Card className="border-2 border-forest-green lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-black flex items-center justify-between">
                    <span>Current Subscription</span>
                    <Badge className="bg-forest-green text-white">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-3xl text-forest-green mb-2">{sellerData.subscriptionPlan}</p>
                    <p className="text-2xl text-black mb-1">${sellerData.subscriptionPrice}/month</p>
                    <p className="text-sm text-black">Renews on {sellerData.renewalDate}</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-black">Up to {sellerData.maxListings} active listings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-black">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-black">{sellerData.maxBoosts} boosts per month (7 days each)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-black">Priority Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-black">Featured on Keyswap's Social Media</span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-forest-green hover:bg-forest-green-dark text-white">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage Payment Method
                    </Button>
                    <Button variant="outline" className="w-full border-forest-green text-forest-green hover:bg-forest-green hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      View All Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Boost Credits */}
              <Card className="border border-forest-green/20">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-forest-green" />
                    Listing Boosts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-black">Available Credits</span>
                      <span className="text-2xl text-forest-green">{sellerData.boostCredits}/{sellerData.maxBoosts}</span>
                    </div>
                    <Progress value={(sellerData.boostCredits / sellerData.maxBoosts) * 100} className="h-2" />
                    <p className="text-sm text-black mt-2">
                      Credits reset on {sellerData.renewalDate}
                    </p>
                  </div>

                  <div className="bg-tan-lighter p-4 rounded-lg space-y-2">
                    <h4 className="text-black mb-2">What are Boosts?</h4>
                    <p className="text-sm text-black">
                      Boost your listing to the top of search results for 7 days with 3x more visibility.
                    </p>
                    <div className="flex items-center gap-2 pt-2">
                      <TrendingUp className="h-4 w-4 text-forest-green" />
                      <span className="text-sm text-black">Avg. 250% more views</span>
                    </div>
                  </div>

                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Buy More ($100/credit)
                  </Button>
                </CardContent>
              </Card>

              {/* Available Plans Comparison */}
              <Card className="border border-forest-green/20 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-black">Available Subscription Plans</CardTitle>
                  <p className="text-sm text-black">Compare plans and upgrade or downgrade anytime</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Seller Plan */}
                    <div className="border-2 border-tan rounded-lg p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl text-black mb-1">Basic Seller</h3>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl text-black">$35</span>
                          <span className="text-black">/month</span>
                        </div>
                        <p className="text-sm text-black">Perfect for new sellers</p>
                      </div>
                      
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Up to 5 active listings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Basic Analytics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">2 boosts per month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Basic Support</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full border-forest-green text-forest-green hover:bg-forest-green hover:text-white"
                        disabled={sellerData.subscriptionPlan === 'Basic Seller'}
                      >
                        {sellerData.subscriptionPlan === 'Basic Seller' ? 'Current Plan' : 'Downgrade to Basic'}
                      </Button>
                    </div>

                    {/* Premium Seller Plan */}
                    <div className="border-2 border-forest-green rounded-lg p-6 space-y-4 bg-forest-green/5 relative">
                      <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">Most Popular</Badge>
                      <div>
                        <h3 className="text-2xl text-black mb-1">Premium Seller</h3>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-3xl text-black">$75</span>
                          <span className="text-black">/month</span>
                        </div>
                        <p className="text-sm text-black">For serious investors</p>
                      </div>
                      
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Up to 10 active listings</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Advanced Analytics</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">5 boosts per month</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Priority Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-forest-green flex-shrink-0" />
                          <span className="text-sm text-black">Featured on Keyswap's Social Media</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-forest-green hover:bg-forest-green-dark text-white"
                        disabled={sellerData.subscriptionPlan === 'Premium Seller'}
                      >
                        {sellerData.subscriptionPlan === 'Premium Seller' ? 'Current Plan' : 'Upgrade to Premium'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card className="border border-forest-green/20 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-black">This Month's Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black">Active Listings</span>
                        <span className="text-black">{sellerData.activeListings} / {sellerData.maxListings}</span>
                      </div>
                      <Progress value={(sellerData.activeListings / sellerData.maxListings) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-black">Boosts Remaining</span>
                        <span className="text-black">{sellerData.boostCredits} / {sellerData.maxBoosts}</span>
                      </div>
                      <Progress value={(sellerData.boostCredits / sellerData.maxBoosts) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}