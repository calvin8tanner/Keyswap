import { useState } from 'react';
import { PropertyFilters } from './PropertyFilters';
import { PropertyGrid } from './PropertyGrid';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { TrendingUp, MapPin, Users, Star, Database } from 'lucide-react';
import { seedDatabase } from '../utils/seed-helper';

interface HomePageProps {
  onPropertySelect: (property: any) => void;
  onNavigate?: (page: 'buy') => void;
}

export function HomePage({ onPropertySelect, onNavigate }: HomePageProps) {
  const [filters, setFilters] = useState({
    propertyType: 'all',
    priceRange: [50000, 2000000],
    amenities: []
  });
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedDatabase = async () => {
    if (confirm('Seed the database with 6 sample properties? This will add initial data for testing.')) {
      setIsSeeding(true);
      try {
        await seedDatabase();
        alert('✅ Database seeded successfully! Refresh the page to see the properties.');
      } catch (error: any) {
        alert(`❌ Error: ${error.message}`);
      } finally {
        setIsSeeding(false);
      }
    }
  };

  // Featured properties data (subset for homepage display)
  const featuredProperties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      location: "Miami Beach, FL",
      price: 485000,
      propertyType: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      images: [
        "https://images.unsplash.com/photo-1759178390576-8650277c9103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGNvbmRvJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5Nzc4NzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1605742696206-aab511e95546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaCUyMGNvbmRvJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTk3Nzg3NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1609602126247-4ab7188b4aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNvbmRvJTIwYmVkcm9vbSUyMG9jZWFuJTIwdmlld3xlbnwxfHx8fDE3NTk3Nzg3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1603072819161-e864800276cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWFjaCUyMGNvbmRvJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTk3Nzg3NDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 225,
      occupancyRate: 78,
      annualRevenue: 64150,
      cashOnCashReturn: 13.2,
      guestRating: 4.8,
      revpar: 176,
      capRate: 9.5,
      description: "Prime investment opportunity in Miami Beach's hottest market. This turnkey condo delivers consistent 78% occupancy with strong RevPAR of $176. Located steps from the beach and nightlife, it attracts year-round business and leisure travelers. Recent STR data shows 15% YoY revenue growth in this building. The 13.2% cash-on-cash return significantly outperforms traditional rental properties, while the easy self-management model requires minimal oversight. Perfect for investors seeking immediate cash flow in a recession-resistant vacation market."
    },
    {
      id: 2,
      title: "Luxury Beach House",
      location: "Destin, FL",
      price: 850000,
      propertyType: "Single Family",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      images: [
        "https://images.unsplash.com/photo-1696439827907-6b574245f10b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5NzQ5MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1722185388507-0a46e2d9dcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaCUyMGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzc4NzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1721369483526-62f48a00b949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwYmVkcm9vbXxlbnwxfHx8fDE3NTk3Nzg3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1729615220884-4acf89995f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwcG9vbHxlbnwxfHx8fDE3NTk3Nzg3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 350,
      occupancyRate: 72,
      annualRevenue: 92120,
      cashOnCashReturn: 10.8,
      guestRating: 4.9,
      revpar: 252,
      capRate: 7.8,
      description: "High-end investment property in Destin's premium vacation rental corridor. Commanding $350/night rates with proven 72% occupancy despite luxury positioning demonstrates strong demand resilience. Professionally managed by XYZ Management with stellar 4.9 guest rating ensuring consistent bookings. The $92K annual revenue is backed by 18 months of verified STR data. Private pool and beach access attract high-spending families, with peak season rates reaching $600+/night. Destin's limited new construction and growing tourism (+12% annually) create favorable supply/demand dynamics for long-term appreciation."
    },
    {
      id: 3,
      title: "Downtown Austin Loft",
      location: "Austin, TX",
      price: 395000,
      propertyType: "Condo",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 850,
      images: [
        "https://images.unsplash.com/photo-1753182372047-5118a851913f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkb3dudG93biUyMGxvZnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTk3Nzg3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1612049803462-939ab8685fd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbG9mdCUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5Nzc4NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1738748444659-f8975b12ce57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwYmVkcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NTk3Nzg3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1696420691256-b325ec3ec3a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Z0JTIwa2l0Y2hlbiUyMGluZHVzdHJpYWx8ZW58MXx8fHwxNzU5Nzc4NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 185,
      occupancyRate: 82,
      annualRevenue: 55435,
      cashOnCashReturn: 14.0,
      guestRating: 4.7,
      revpar: 152,
      capRate: 10.2,
      description: "Cash flow powerhouse in Austin's booming tech corridor. Exceptional 14% cash-on-cash return driven by 82% occupancy—well above market average. The compact 1-bed layout appeals to business travelers attending SXSW, F1 races, and tech conferences, generating consistent mid-week bookings that vacation properties miss. Walking distance to bars, restaurants, and entertainment keeps this unit booked year-round. Austin's population growth (+3% annually) and corporate relocations ensure sustained demand. Low HOA fees and turnkey condition mean minimal capital expenditure for the next 5+ years."
    },
    {
      id: 4,
      title: "Mountain View Cabin",
      location: "Gatlinburg, TN",
      price: 425000,
      propertyType: "Single Family",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      images: [
        "https://images.unsplash.com/photo-1692805102200-ffa228403409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5Nzc4NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1645242075656-e4e435b7a5f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMGxpdmluZyUyMHJvb20lMjBmaXJlcGxhY2V8ZW58MXx8fHwxNzU5Nzc4NzUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1699629208190-672f7ef56d7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMGJlZHJvb20lMjBydXN0aWN8ZW58MXx8fHwxNzU5Nzc4NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1610486870547-05b74398c3d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJpbiUyMG1vdW50YWluJTIwdmlld3xlbnwxfHx8fDE3NTk3Nzg3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 195,
      occupancyRate: 75,
      annualRevenue: 53363,
      cashOnCashReturn: 12.6,
      guestRating: 4.6,
      revpar: 146,
      capRate: 8.9,
      description: "Recession-proof investment in America's #1 cabin rental market. Gatlinburg's 12+ million annual visitors to Great Smoky Mountains National Park create unparalleled demand stability. This property achieves 75% occupancy with minimal marketing thanks to ABC Management's proven local expertise. The cabin's mountain views and hot tub command premium rates during fall foliage and winter seasons when bookings spike at $300+/night. Strong 12.6% cash-on-cash return with hands-off management makes this ideal for passive investors. Gatlinburg's restricted development zones protect against oversupply."
    },
    {
      id: 5,
      title: "Historic Charleston Townhouse",
      location: "Charleston, SC",
      price: 675000,
      propertyType: "Townhouse",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2100,
      images: [
        "https://images.unsplash.com/photo-1618178991987-3da631f4009e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHRvd25ob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTc3ODc1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1725623831784-9d9c09187c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwdG93bmhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5Nzc4NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1668512624222-2e375314be39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duaG91c2UlMjBiZWRyb29tJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTk3Nzg3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3duaG91c2UlMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc1OTc3ODc1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 275,
      occupancyRate: 70,
      annualRevenue: 70288,
      cashOnCashReturn: 10.4,
      guestRating: 4.8,
      revpar: 193,
      capRate: 8.2,
      description: "Premium historic property in Charleston's protected downtown district where new construction is virtually impossible. This scarcity factor drives both rental rates and appreciation—Charleston vacation rental permits are capped, creating a protected investment moat. The property attracts affluent couples and small groups seeking authentic Southern charm, achieving $275/night with 70% occupancy despite zero advertising spend. Heritage tourism drives consistent shoulder-season demand. The 8.2% cap rate understates true returns given Charleston's 8% annual appreciation trend. Rare opportunity in a supply-constrained luxury market."
    },
    {
      id: 6,
      title: "Lakefront Retreat",
      location: "Lake Tahoe, CA",
      price: 950000,
      propertyType: "Single Family",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      images: [
        "https://images.unsplash.com/photo-1736247150811-689481e7a778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlZnJvbnQlMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1OTc3ODc1NHww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1679939153966-6ec05249db1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlZnJvbnQlMjBob3VzZSUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5Nzc4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1679939153963-fd105167b4c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlZnJvbnQlMjBob3VzZSUyMGJlZHJvb218ZW58MXx8fHwxNzU5Nzc4NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1730749222041-226268a7e2a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwaG91c2UlMjBkZWNrJTIwdmlld3xlbnwxfHx8fDE3NTk3Nzg3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ],
      nightlyRate: 425,
      occupancyRate: 68,
      annualRevenue: 105670,
      cashOnCashReturn: 11.1,
      guestRating: 4.9,
      revpar: 289,
      capRate: 7.4,
      description: "Trophy asset combining rental income with personal use potential in North America's premier four-season destination. The $425 nightly rate reflects Tahoe's luxury positioning—winter ski season commands $700+/night while summer lake activities sustain strong shoulder demand. Environmental restrictions severely limit new lakefront construction, making this an irreplaceable asset class. The property's DEF Management handles everything from snow removal to maintenance, delivering 11.1% cash-on-cash returns with minimal owner involvement. Tahoe's wealthy Bay Area proximity and flight-to-quality trend post-pandemic support both income stability and 6-7% annual appreciation."
    }
  ];

  const handleViewAllProperties = () => {
    setShowAllProperties(true);
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Proven Performance",
      description: "All properties come with 12+ months of verified rental history and performance data.",
      backgroundImage: "https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc1Njk5NTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Carefully selected properties in high-demand tourist destinations and business centers.",
      backgroundImage: "https://images.unsplash.com/photo-1622015663319-e97e697503ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTY5OTU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: Users,
      title: "Full Support",
      description: "Connect with experienced property managers and local real estate experts.",
      backgroundImage: "https://images.unsplash.com/photo-1740258662768-b46a3f3f0c06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuc2lvbiUyMHByb3BlcnR5fGVufDF8fHx8MTc1Njk5NTc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-background to-purple-lighter/20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-black">
            Why Choose Keyswap?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple/20 overflow-hidden group h-80">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${feature.backgroundImage})` }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm text-purple mb-4 shadow-lg">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl mb-3 text-white drop-shadow-lg">{feature.title}</h3>
                  <p className="text-white/90 drop-shadow-md leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="py-16 bg-gradient-to-b from-purple-lighter/20 to-background">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2 text-black">
                {showAllProperties ? 'All Investment Properties' : 'Featured Investment Properties'}
              </h2>
              <p className="text-black">
                {showAllProperties 
                  ? 'Browse our complete collection of turnkey rental properties'
                  : 'Handpicked properties with exceptional investment potential'
                }
              </p>
            </div>
            <Badge className="bg-purple text-white shadow-md">
              <Star className="w-4 h-4 mr-1" />
              <span className="text-white">{showAllProperties ? 'All Listings' : 'New Listings'}</span>
            </Badge>
          </div>

          <PropertyFilters filters={filters} setFilters={setFilters} />
          
          <PropertyGrid 
            properties={showAllProperties ? undefined : featuredProperties} 
            onPropertySelect={onPropertySelect}
            filters={filters}
          />

          {!showAllProperties && (
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-purple hover:bg-purple-dark text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={handleViewAllProperties}
              >
                View All Properties
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Seed Database Button */}
      <div className="text-center mt-12">
        <Button 
          size="lg" 
          className="bg-purple hover:bg-purple-dark text-white shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={handleSeedDatabase}
          disabled={isSeeding}
        >
          {isSeeding ? 'Seeding...' : 'Seed Database'}
        </Button>
      </div>
    </div>
  );
}