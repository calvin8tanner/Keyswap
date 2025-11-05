import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, TrendingUp, DollarSign, Calendar, Users, Map, Grid3x3 } from 'lucide-react';
import { PropertyMap } from './PropertyMap';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  nightlyRate: number;
  occupancyRate: number;
  annualRevenue: number;
  cashOnCashReturn: number;
  guestRating: number;
  revpar: number;
  capRate: number;
  managementType: 'self-managed' | 'property-managed';
  managementCompany?: string;
  description?: string;
}

interface PropertyGridProps {
  properties?: Property[];
  searchLocation?: string;
  filters?: {
    propertyType: string;
    priceRange: number[];
    amenities: string[];
    managementType?: string;
  };
  onPropertySelect: (property: Property) => void;
}

export function PropertyGrid({ properties, searchLocation, filters, onPropertySelect }: PropertyGridProps) {
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

  // Mock properties data - this would normally come from an API
  const mockProperties: Property[] = [
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
      managementType: 'self-managed',
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
      managementType: 'property-managed',
      managementCompany: 'XYZ Management',
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
      managementType: 'self-managed',
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
      managementType: 'property-managed',
      managementCompany: 'ABC Management',
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
      managementType: 'self-managed',
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
      managementType: 'property-managed',
      managementCompany: 'DEF Management',
      description: "Trophy asset combining rental income with personal use potential in North America's premier four-season destination. The $425 nightly rate reflects Tahoe's luxury positioning—winter ski season commands $700+/night while summer lake activities sustain strong shoulder demand. Environmental restrictions severely limit new lakefront construction, making this an irreplaceable asset class. The property's DEF Management handles everything from snow removal to maintenance, delivering 11.1% cash-on-cash returns with minimal owner involvement. Tahoe's wealthy Bay Area proximity and flight-to-quality trend post-pandemic support both income stability and 6-7% annual appreciation."
    },
    {
      id: 7,
      title: "Downtown Studio Apartment",
      location: "Nashville, TN",
      price: 275000,
      propertyType: "Condo",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      images: ["https://images.unsplash.com/photo-1610123172763-1f587473048f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkaW8lMjBhcGFydG1lbnQlMjBjaXR5fGVufDF8fHx8MTc1NjQ4OTMwNnww&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 165,
      occupancyRate: 85,
      annualRevenue: 51233,
      cashOnCashReturn: 18.6,
      guestRating: 4.6,
      revpar: 140,
      capRate: 12.8,
      managementType: 'self-managed'
    },
    {
      id: 8,
      title: "Ski Resort Chalet",
      location: "Aspen, CO",
      price: 1250000,
      propertyType: "Single Family",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      images: ["https://images.unsplash.com/photo-1604178449087-4b419466052e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2klMjBjaGFsZXQlMjBtb3VudGFpbiUyMHJlc29ydHxlbnwxfHx8fDE3NTY0ODkzMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 650,
      occupancyRate: 62,
      annualRevenue: 147330,
      cashOnCashReturn: 11.8,
      guestRating: 4.9,
      revpar: 403,
      capRate: 8.6,
      managementType: 'property-managed',
      managementCompany: 'GHI Management'
    },
    {
      id: 9,
      title: "Oceanfront Beach Condo",
      location: "Outer Banks, NC",
      price: 625000,
      propertyType: "Condo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1650,
      images: ["https://images.unsplash.com/photo-1655055051751-ed4a23bef7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNvbmRvJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc1NjQ4OTMwN3ww&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 295,
      occupancyRate: 76,
      annualRevenue: 81954,
      cashOnCashReturn: 13.1,
      guestRating: 4.8,
      revpar: 224,
      capRate: 9.2,
      managementType: 'self-managed'
    },
    {
      id: 10,
      title: "Desert Modern Villa",
      location: "Scottsdale, AZ",
      price: 775000,
      propertyType: "Single Family",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2650,
      images: ["https://images.unsplash.com/photo-1605474231454-4c006ed61ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjB2YWNhdGlvbiUyMGhvbWUlMjBhcml6b25hfGVufDF8fHx8MTc1NjQ4OTMwOHww&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 385,
      occupancyRate: 71,
      annualRevenue: 99844,
      cashOnCashReturn: 12.9,
      guestRating: 4.7,
      revpar: 273,
      capRate: 9.0,
      managementType: 'property-managed',
      managementCompany: 'JKL Management'
    },
    {
      id: 11,
      title: "Urban Penthouse Loft",
      location: "Seattle, WA",
      price: 1125000,
      propertyType: "Condo",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2200,
      images: ["https://images.unsplash.com/photo-1607570799395-b968ad047e3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBlbnRob3VzZSUyMGxvZnQlMjBhcGFydG1lbnR8ZW58MXx8fHwxNzU2NDg5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 475,
      occupancyRate: 79,
      annualRevenue: 137078,
      cashOnCashReturn: 12.2,
      guestRating: 4.8,
      revpar: 375,
      capRate: 8.5,
      managementType: 'self-managed'
    },
    {
      id: 12,
      title: "Wine Country Estate",
      location: "Napa Valley, CA",
      price: 1500000,
      propertyType: "Single Family",
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: 3800,
      images: ["https://images.unsplash.com/photo-1656589370113-2aca109a4e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwY291bnRyeSUyMHZpbmV5YXJkJTIwaG91c2V8ZW58MXx8fHwxNzU2NDg5MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080"],
      nightlyRate: 795,
      occupancyRate: 65,
      annualRevenue: 188788,
      cashOnCashReturn: 12.6,
      guestRating: 4.9,
      revpar: 517,
      capRate: 8.8,
      managementType: 'property-managed',
      managementCompany: 'MNO Management'
    }
  ];

  // Use provided properties or fallback to mock data
  const displayProperties = properties || mockProperties;

  // Basic filtering logic - in a real app this would be more sophisticated
  const filteredProperties = displayProperties.filter(property => {
    // Filter by search location if provided
    if (searchLocation && searchLocation.trim() !== '') {
      const locationMatch = property.location.toLowerCase().includes(searchLocation.toLowerCase());
      if (!locationMatch) return false;
    }

    // Filter by price range if filters provided
    if (filters?.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (property.price < minPrice || property.price > maxPrice) return false;
    }

    // Filter by management type if provided
    if (filters?.managementType) {
      const managementMatch = property.managementType === filters.managementType;
      if (!managementMatch) return false;
    }

    return true;
  });

  const [selectedMapProperty, setSelectedMapProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');

  // Transform properties for map
  const propertiesForMap = filteredProperties.map(p => ({
    ...p,
    nightly_rate: p.nightlyRate,
    occupancy_rate: p.occupancyRate,
    revpar: p.revpar
  }));

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="text-black">
          <span className="text-sm">Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-forest-green hover:bg-forest-green/90' : ''}
          >
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-forest-green hover:bg-forest-green/90' : ''}
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>
      </div>

      {/* Interactive Map - Show when map view is selected */}
      {viewMode === 'map' && (
        <PropertyMap 
        properties={propertiesForMap}
        searchLocation={searchLocation}
        selectedProperty={selectedMapProperty}
        onPropertySelect={(property) => {
          setSelectedMapProperty(property);
          onPropertySelect(property);
        }}
        />
      )}

      {/* Property Cards Grid */}
      <div className={`grid grid-cols-1 ${viewMode === 'map' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'} gap-6`}>
        {filteredProperties.map((property) => (
        <Card 
          key={property.id} 
          className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-black hover:border-forest-green hover:scale-[1.02] group"
          onClick={() => onPropertySelect(property)}
        >
          <div className="relative">
            <ImageWithFallback
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Property Type Badge */}
            <Badge className="absolute top-3 left-3 bg-white text-black border border-purple/20 shadow-md">
              {property.propertyType}
            </Badge>

            {/* Income Verified Badge */}
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
              <span className="text-sm text-black">Income Verified</span>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Title and Location */}
              <div>
                <h3 className="text-lg mb-1 text-black group-hover:text-black transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center text-black text-sm">
                  <MapPin className="w-4 h-4 mr-1 text-purple" />
                  <span className="text-black">{property.location}</span>
                </div>
              </div>

              {/* Property Details */}
              <div className="flex items-center gap-4 text-sm text-black">
                <span>{formatNumber(property.bedrooms)} bed</span>
                <span>{formatNumber(property.bathrooms)} bath</span>
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>

              {/* Management Type Badge */}
              <div className="flex items-center justify-center">
                <Badge 
                  className={
                    property.managementType === 'self-managed' 
                      ? 'bg-tan-light text-black border border-forest-green/20' 
                      : 'bg-forest-green text-white'
                  }
                >
                  <Users className="w-3 h-3 mr-1" />
                  {property.managementType === 'self-managed' ? 'Self Managed' : 'Property Managed'}
                </Badge>
              </div>
              {property.managementType === 'property-managed' && property.managementCompany && (
                <div className="text-center text-xs text-black opacity-70">
                  by {property.managementCompany}
                </div>
              )}

              {/* Occupancy, Cap Rate & RevPAR */}
              <div className="bg-gradient-to-r from-purple-lighter to-purple-light rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 text-purple mr-1" />
                      <span className="text-xs text-black">Occupancy</span>
                    </div>
                    <div className="text-black">{formatNumber(property.occupancyRate)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-black mb-1">Cap Rate</div>
                    <div className="text-black">{formatNumber(property.capRate)}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-black mb-1">RevPAR</div>
                    <div className="text-black">${formatNumber(property.revpar)}</div>
                  </div>
                </div>
              </div>

              {/* Annual Revenue */}
              <div className="flex justify-start">
                <div className="bg-purple-light rounded-lg p-3 w-full">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="w-4 h-4 text-purple mr-1" />
                    <span className="text-xs text-black">Annual Revenue</span>
                  </div>
                  <div className="text-black text-center">${property.annualRevenue.toLocaleString()}</div>
                </div>
              </div>

              {/* Price */}
              <div className="pt-2 border-t">
                <div className="text-2xl text-black">
                  ${property.price.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
}