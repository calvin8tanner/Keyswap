// Utility service for property manager location matching and advertising

export interface PropertyManager {
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

// Mock property managers data - in a real app this would come from a database
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
    serviceAreas: ["Miami Beach", "South Beach", "Coconut Grove", "Coral Gables", "Miami"]
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

/**
 * Find nearby property managers based on property location
 * This function matches property managers to properties based on location proximity
 */
export function getNearbyPropertyManagers(propertyLocation: string): PropertyManager[] {
  if (!propertyLocation) return [];

  const location = propertyLocation.toLowerCase();
  
  // Find managers whose service areas include the property location
  const nearbyManagers = propertyManagers.filter(manager => {
    // Check if the manager's location matches
    const managerLocation = manager.location.toLowerCase();
    if (managerLocation.includes(location) || location.includes(managerLocation.split(',')[0])) {
      return true;
    }

    // Check service areas
    return manager.serviceAreas.some(area => 
      area.toLowerCase().includes(location.split(',')[0]) || 
      location.includes(area.toLowerCase())
    );
  });

  // Sort by rating and return top 2-3 managers
  return nearbyManagers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

/**
 * Get featured property manager for advertising
 * Returns the highest-rated manager in the area for premium placement
 */
export function getFeaturedPropertyManager(propertyLocation: string): PropertyManager | null {
  const nearbyManagers = getNearbyPropertyManagers(propertyLocation);
  return nearbyManagers.length > 0 ? nearbyManagers[0] : null;
}