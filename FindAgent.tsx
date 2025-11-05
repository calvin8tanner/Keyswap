import { useState } from 'react';
import { Phone, Mail, MapPin, Star, Award, Calendar, Filter, Search, Users, Building, Shield, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Agent {
  id: number;
  name: string;
  title: string;
  image: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  specialization: string[];
  location: string;
  phone: string;
  email: string;
  propertiesSold: number;
  avgSalePrice: number;
  languages: string[];
  certifications: string[];
  description: string;
}

interface PropertyManager {
  id: number;
  companyName: string;
  managerName: string;
  image: string;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  services: string[];
  location: string;
  phone: string;
  email: string;
  propertiesManaged: number;
  avgOccupancyRate: number;
  monthlyFee: string;
  setupFee: number;
  certifications: string[];
  description: string;
  serviceAreas: string[];
}

export function FindAgent() {
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

  const [activeTab, setActiveTab] = useState('agents');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const agents: Agent[] = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "STR Investment Specialist",
      image: "https://images.unsplash.com/photo-1628657485319-5865d0f2791d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MjI0NDI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviewCount: 127,
      yearsExperience: 8,
      specialization: ["Short-term Rentals", "Investment Properties", "Downtown Austin"],
      location: "Austin, TX",
      phone: "(512) 555-0123",
      email: "sarah.chen@keyswap.com",
      propertiesSold: 156,
      avgSalePrice: 485000,
      languages: ["English", "Mandarin"],
      certifications: ["CRS", "SRES", "ABR"],
      description: "Specializing in short-term rental investments with deep knowledge of Austin's STR market. I help investors find high-performing properties with proven revenue potential."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Coastal Property Expert",
      image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0JTIwc3VpdHxlbnwxfHx8fDE3NTYxODc4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviewCount: 89,
      yearsExperience: 12,
      specialization: ["Beachfront Properties", "Luxury Rentals", "Miami Market"],
      location: "Miami, FL",
      phone: "(305) 555-0456",
      email: "michael.rodriguez@keyswap.com",
      propertiesSold: 203,
      avgSalePrice: 725000,
      languages: ["English", "Spanish"],
      certifications: ["GRI", "CLHMS", "CIPS"],
      description: "Expert in luxury beachfront STR properties throughout South Florida. I specialize in high-end vacation rentals with exceptional guest experiences and strong ROI."
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Mountain Resort Specialist",
      image: "https://images.unsplash.com/photo-1712174766230-cb7304feaafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsdG9yJTIwd29tYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjIzNzIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      reviewCount: 64,
      yearsExperience: 6,
      specialization: ["Mountain Properties", "Ski Rentals", "Resort Areas"],
      location: "Aspen, CO",
      phone: "(970) 555-0789",
      email: "emily.johnson@keyswap.com",
      propertiesSold: 78,
      avgSalePrice: 890000,
      languages: ["English", "French"],
      certifications: ["ABR", "RSPS", "SFR"],
      description: "Focused on mountain resort properties and seasonal rentals. I understand the unique dynamics of ski town real estate and help investors capitalize on seasonal demand."
    },
    {
      id: 4,
      name: "Carlos Martinez",
      title: "Urban Investment Advisor",
      image: "https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1NjIzNzIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      reviewCount: 92,
      yearsExperience: 9,
      specialization: ["City Properties", "Investment Analysis", "First-time Investors"],
      location: "Miami, FL",
      phone: "(305) 555-0321",
      email: "carlos.martinez@keyswap.com",
      propertiesSold: 134,
      avgSalePrice: 425000,
      languages: ["English", "Spanish", "Portuguese"],
      certifications: ["CCIM", "SIOR", "CRE"],
      description: "Helping new investors enter the short-term rental market with data-driven insights and comprehensive market analysis. I focus on properties with strong cash flow potential."
    },
    {
      id: 5,
      name: "Jennifer Kim",
      title: "Historic Property Specialist",
      image: "https://images.unsplash.com/photo-1634133472760-e5c2bd346787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZWFsdG9yJTIwaGVhZHNob3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTYyMzcxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      reviewCount: 76,
      yearsExperience: 11,
      specialization: ["Historic Properties", "Unique Rentals", "Charleston Market"],
      location: "Charleston, SC",
      phone: "(843) 555-0654",
      email: "jennifer.kim@keyswap.com",
      propertiesSold: 98,
      avgSalePrice: 380000,
      languages: ["English", "Korean"],
      certifications: ["GRI", "AHWD", "GREEN"],
      description: "Expert in historic and unique properties that make exceptional STR rentals. I help investors find distinctive properties with character that command premium rates."
    },
    {
      id: 6,
      name: "David Wong",
      title: "Lake & Resort Properties",
      image: "https://images.unsplash.com/photo-1734209507417-1f70aa230aa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTYyMzcyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      reviewCount: 113,
      yearsExperience: 14,
      specialization: ["Lakefront Properties", "Resort Homes", "Luxury Retreats"],
      location: "Lake Tahoe, CA",
      phone: "(530) 555-0987",
      email: "david.wong@keyswap.com",
      propertiesSold: 187,
      avgSalePrice: 650000,
      languages: ["English", "Chinese"],
      certifications: ["CLHMS", "CRS", "RSPS"],
      description: "Specializing in luxury lakefront and resort properties perfect for high-end vacation rentals. I understand the seasonal dynamics and help maximize year-round revenue potential."
    }
  ];

  const specializations = [
    'All Specializations',
    'Short-term Rentals',
    'Investment Properties',
    'Beachfront Properties',
    'Mountain Properties',
    'Historic Properties',
    'Luxury Rentals',
    'First-time Investors'
  ];

  const filteredAgents = agents.filter(agent => {
    const locationMatch = !searchLocation || 
      agent.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      agent.name.toLowerCase().includes(searchLocation.toLowerCase());
    
    const specializationMatch = selectedSpecialization === 'all' || 
      agent.specialization.some(spec => spec.toLowerCase().includes(selectedSpecialization.toLowerCase()));
    
    return locationMatch && specializationMatch;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      case 'sales':
        return b.propertiesSold - a.propertiesSold;
      default:
        return 0;
    }
  });

  const propertyManagers: PropertyManager[] = [
    {
      id: 1,
      companyName: "Elite STR Management",
      managerName: "Rachel Thompson",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDg5MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviewCount: 156,
      yearsInBusiness: 7,
      services: ["Guest Communication", "Cleaning", "Maintenance", "Dynamic Pricing", "Guest Screening"],
      location: "Austin, TX",
      phone: "(512) 555-0199",
      email: "rachel@elitestr.com",
      propertiesManaged: 85,
      avgOccupancyRate: 87,
      monthlyFee: "12-15%",
      setupFee: 299,
      certifications: ["VRMA", "STR Plus", "Licensed"],
      description: "Full-service STR management with focus on maximizing revenue through dynamic pricing and exceptional guest experiences.",
      serviceAreas: ["Austin", "Round Rock", "Cedar Park", "Georgetown"]
    },
    {
      id: 2,
      companyName: "Coastal Property Pros",
      managerName: "James Parker",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjQ4OTMwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviewCount: 203,
      yearsInBusiness: 9,
      services: ["24/7 Guest Support", "Professional Photography", "Listing Optimization", "Revenue Management", "Concierge Services"],
      location: "Miami, FL",
      phone: "(305) 555-0288",
      email: "james@coastalpros.com",
      propertiesManaged: 142,
      avgOccupancyRate: 82,
      monthlyFee: "10-14%",
      setupFee: 399,
      certifications: ["VRMA", "Google Certified", "Insured"],
      description: "Specializing in luxury beachfront properties with premium guest services and professional marketing.",
      serviceAreas: ["Miami Beach", "South Beach", "Coconut Grove", "Coral Gables"]
    },
    {
      id: 3,
      companyName: "Mountain Vista Management",
      managerName: "Lisa Rodriguez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc1NjQ4OTMxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviewCount: 89,
      yearsInBusiness: 5,
      services: ["Seasonal Management", "Snow Removal", "Hot Tub Maintenance", "Ski Equipment Rental", "Local Experience Booking"],
      location: "Aspen, CO",
      phone: "(970) 555-0377",
      email: "lisa@mountainvista.com",
      propertiesManaged: 56,
      avgOccupancyRate: 78,
      monthlyFee: "15-18%",
      setupFee: 499,
      certifications: ["VRMA", "Resort Certified", "Bonded"],
      description: "Expert management of mountain resort properties with specialized services for seasonal rentals and outdoor enthusiasts.",
      serviceAreas: ["Aspen", "Snowmass", "Basalt", "Carbondale"]
    },
    {
      id: 4,
      companyName: "Urban Nest Co.",
      managerName: "Marcus Johnson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1NjQ4OTMxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviewCount: 134,
      yearsInBusiness: 6,
      services: ["Tech Integration", "Smart Home Setup", "Urban Guide Services", "Fast Turnovers", "Security Monitoring"],
      location: "Charleston, SC",
      phone: "(843) 555-0466",
      email: "marcus@urbannest.com",
      propertiesManaged: 73,
      avgOccupancyRate: 84,
      monthlyFee: "11-13%",
      setupFee: 349,
      certifications: ["VRMA", "Smart Home Certified", "Licensed"],
      description: "Modern property management focusing on technology integration and urban experiences for city properties.",
      serviceAreas: ["Charleston", "Mount Pleasant", "Folly Beach", "Isle of Palms"]
    },
    {
      id: 5,
      companyName: "Lakeside Hospitality",
      managerName: "Catherine Wong",
      image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NDg5MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviewCount: 97,
      yearsInBusiness: 8,
      services: ["Waterfront Maintenance", "Boat Dock Management", "Luxury Amenities", "Event Coordination", "Outdoor Activity Planning"],
      location: "Lake Tahoe, CA",
      phone: "(530) 555-0588",
      email: "catherine@lakesidehospitality.com",
      propertiesManaged: 64,
      avgOccupancyRate: 85,
      monthlyFee: "13-16%",
      setupFee: 449,
      certifications: ["VRMA", "Luxury Certified", "Environmental Certified"],
      description: "Specialized in luxury lakefront properties with focus on outdoor experiences and premium guest amenities.",
      serviceAreas: ["South Lake Tahoe", "North Lake Tahoe", "Truckee", "Olympic Valley"]
    }
  ];

  const managerServices = [
    'All Services',
    'Guest Communication',
    'Cleaning',
    'Maintenance', 
    'Dynamic Pricing',
    'Professional Photography',
    'Listing Optimization',
    'Concierge Services',
    'Smart Home Setup'
  ];

  const filteredPropertyManagers = propertyManagers.filter(manager => {
    const locationMatch = !searchLocation || 
      manager.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
      manager.managerName.toLowerCase().includes(searchLocation.toLowerCase());
    
    const serviceMatch = managerServices.includes(selectedSpecialization);
    
    return locationMatch && serviceMatch;
  });

  const sortedPropertyManagers = [...filteredPropertyManagers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return b.yearsInBusiness - a.yearsInBusiness;
      case 'sales':
        return b.propertiesManaged - a.propertiesManaged;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-foreground">Find Your STR Investment Team</h1>
        <p className="text-muted-foreground max-w-3xl">
          Connect with experienced agents who specialize in short-term rental properties and professional property managers who can handle the day-to-day operations of your investment.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="managers" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Property Managers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by location or agent name"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec, index) => (
                      <SelectItem key={index} value={index === 0 ? 'all' : spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="sales">Most Sales</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center">
                  {sortedAgents.length} agents found
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAgents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow border border-black">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <ImageWithFallback
                      src={agent.image}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground truncate">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.title}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{formatNumber(agent.rating, 1)}</span>
                        <span className="text-sm text-muted-foreground">({formatNumber(agent.reviewCount, 0)})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {agent.location}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {agent.description}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {agent.specialization.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {agent.specialization.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{agent.specialization.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                      <div className="text-sm text-foreground">{agent.yearsExperience} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Properties Sold</div>
                      <div className="text-sm text-foreground">{agent.propertiesSold}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Sale Price</div>
                      <div className="text-sm text-foreground">${formatNumber(agent.avgSalePrice, 0)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Languages</div>
                      <div className="text-sm text-foreground">{agent.languages.join(', ')}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    {agent.certifications.slice(0, 3).map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Award className="h-2 w-2 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="flex-1 bg-forest-green hover:bg-forest-green-dark">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedAgents.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-foreground mb-2">No agents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="managers">
          {/* Search and Filters for Property Managers */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by location or company name"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                  <SelectTrigger>
                    <SelectValue placeholder="Services" />
                  </SelectTrigger>
                  <SelectContent>
                    {managerServices.map((service, index) => (
                      <SelectItem key={index} value={index === 0 ? 'all' : service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="sales">Most Properties</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground flex items-center">
                  {sortedPropertyManagers.length} managers found
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Managers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPropertyManagers.map((manager) => (
              <Card key={manager.id} className="hover:shadow-lg transition-shadow border border-black">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <ImageWithFallback
                      src={manager.image}
                      alt={manager.managerName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground truncate">{manager.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{manager.managerName}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{formatNumber(manager.rating, 1)}</span>
                        <span className="text-sm text-muted-foreground">({formatNumber(manager.reviewCount, 0)})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {manager.location}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {manager.description}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {manager.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {manager.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{manager.services.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                    <div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                      <div className="text-sm text-foreground">{manager.yearsInBusiness} years</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Properties</div>
                      <div className="text-sm text-foreground">{manager.propertiesManaged}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Monthly Fee</div>
                      <div className="text-sm text-foreground">{manager.monthlyFee}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Avg Occupancy</div>
                      <div className="text-sm text-foreground">{formatNumber(manager.avgOccupancyRate)}%</div>
                    </div>
                  </div>

                  <div className="bg-tan-lighter p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Setup Fee</div>
                    <div className="text-sm text-foreground">${formatNumber(manager.setupFee, 0)}</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {manager.certifications.slice(0, 3).map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Shield className="h-2 w-2 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="flex-1 bg-forest-green hover:bg-forest-green-dark">
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedPropertyManagers.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-foreground mb-2">No property managers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}