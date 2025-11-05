import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, X, Key } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiY3Rhbm5lcjAyMTAiLCJhIjoiY21laXo0ODUwMDdmNzJqcTBoNWd6ZzM5dSJ9.TOuJbt3Y7bCiJ7LDBTegJw';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  nightlyRate?: number;
  occupancyRate?: number;
  revpar: number;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  images?: string[];
  guestRating?: number;
  capRate?: number;
  annualRevenue?: number;
  coordinates?: [number, number]; // [longitude, latitude]
}

interface PropertyMapProps {
  properties?: Property[];
  searchLocation?: string;
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
  singleProperty?: boolean; // For showing a single property on detail page
  height?: string; // Custom height
}

export function PropertyMap({ 
  properties = [], 
  searchLocation = '',
  selectedProperty = null,
  onPropertySelect,
  singleProperty = false,
  height = '400px'
}: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // City coordinates for demo purposes
  const cityCoordinates: { [key: string]: [number, number] } = {
    'Miami Beach, FL': [-80.1300, 25.7907],
    'Miami, FL': [-80.1918, 25.7617],
    'Destin, FL': [-86.4958, 30.3935],
    'Austin, TX': [-97.7431, 30.2672],
    'Nashville, TN': [-86.7816, 36.1627],
    'Denver, CO': [-104.9903, 39.7392],
    'Phoenix, AZ': [-112.0740, 33.4484],
    'Orlando, FL': [-81.3792, 28.5383],
    'Charleston, SC': [-79.9311, 32.7765],
    'Savannah, GA': [-81.0998, 32.0809],
    'Portland, OR': [-122.6765, 45.5231],
    'Seattle, WA': [-122.3321, 47.6062],
    'San Diego, CA': [-117.1611, 32.7157],
    'New Orleans, LA': [-90.0715, 29.9511],
    'Scottsdale, AZ': [-111.9261, 33.4942],
    'Santa Fe, NM': [-105.9378, 35.6870],
    'Park City, UT': [-111.4980, 40.6461],
    'Aspen, CO': [-106.8175, 39.1911],
    'Gatlinburg, TN': [-83.5102, 35.7143],
    'Lake Tahoe, CA': [-120.0324, 39.0968],
    'Outer Banks, NC': [-75.6474, 35.5585],
    'Napa Valley, CA': [-122.2869, 38.2975]
  };

  // Generate mock coordinates for properties that don't have them
  const getPropertyCoordinates = (property: Property): [number, number] => {
    if (property.coordinates) {
      return property.coordinates;
    }

    // Try to match city exactly or with variations
    let baseCoords = cityCoordinates[property.location];
    
    // If not found, try without state
    if (!baseCoords) {
      const cityOnly = property.location.split(',')[0].trim();
      const matchingKey = Object.keys(cityCoordinates).find(key => 
        key.toLowerCase().includes(cityOnly.toLowerCase())
      );
      if (matchingKey) {
        baseCoords = cityCoordinates[matchingKey];
      }
    }

    if (baseCoords) {
      // Add small random offset to prevent overlapping markers
      const offset = 0.015;
      const seed = property.id * 12345; // Deterministic random based on ID
      const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280 - 0.5;
      const pseudoRandom2 = ((seed * 9307 + 49299) % 233281) / 233281 - 0.5;
      
      return [
        baseCoords[0] + pseudoRandom1 * offset,
        baseCoords[1] + pseudoRandom2 * offset
      ];
    }

    // Default to center of US with deterministic offset
    const seed = property.id * 12345;
    const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280 - 0.5;
    const pseudoRandom2 = ((seed * 9307 + 49299) % 233281) / 233281 - 0.5;
    return [-98.5795 + pseudoRandom1 * 20, 39.8283 + pseudoRandom2 * 10];
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Determine initial center and zoom based on search location or properties
    let initialCenter: [number, number] = [-98.5795, 39.8283]; // Center of US
    let initialZoom = 4;

    if (singleProperty && properties.length === 1) {
      // For single property view
      initialCenter = getPropertyCoordinates(properties[0]);
      initialZoom = 13;
    } else if (searchLocation && cityCoordinates[searchLocation]) {
      initialCenter = cityCoordinates[searchLocation];
      initialZoom = 11;
    } else if (properties.length > 0) {
      // Calculate center of all properties
      const coords = properties.map(p => getPropertyCoordinates(p));
      const avgLng = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
      const avgLat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
      initialCenter = [avgLng, avgLat];
      initialZoom = 4;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: initialZoom,
      attributionControl: false
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control only if supported and not single property
    if (!singleProperty) {
      try {
        if (document.fullscreenEnabled || 
            (document as any).webkitFullscreenEnabled || 
            (document as any).mozFullScreenEnabled || 
            (document as any).msFullscreenEnabled) {
          map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
        }
      } catch (error) {
        console.log('Fullscreen mode not supported on this device');
      }
    }

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    properties.forEach(property => {
      const coords = getPropertyCoordinates(property);
      
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.style.width = singleProperty ? '36px' : '30px';
      el.style.height = singleProperty ? '46px' : '38px';
      el.style.cursor = 'pointer';
      el.setAttribute('data-property-id', property.id.toString());
      
      // Check if this is the selected property
      const isSelected = selectedProperty?.id === property.id;
      
      el.innerHTML = `
        <div class="marker-pin" style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          transition: all 0.2s;
        ">
          <svg width="100%" height="100%" viewBox="0 0 30 38" fill="none">
            <!-- Arrow pointer shape -->
            <path d="M15 38 L8 28 L8 8 C8 4 11 0 15 0 C19 0 22 4 22 8 L22 28 Z" 
                  fill="${isSelected ? '#C5A250' : '#1F3B2C'}" 
                  stroke="white" 
                  stroke-width="2"/>
            <!-- Key circle at top -->
            <circle cx="15" cy="9" r="5" fill="white"/>
            <circle cx="15" cy="9" r="2.5" fill="${isSelected ? '#C5A250' : '#1F3B2C'}"/>
          </svg>
        </div>
      `;

      // Add hover effects
      el.addEventListener('mouseenter', () => {
        const pin = el.querySelector('.marker-pin') as HTMLElement;
        if (pin) {
          pin.style.transform = 'scale(1.15)';
        }
        setHoveredProperty(property);
      });

      el.addEventListener('mouseleave', () => {
        const pin = el.querySelector('.marker-pin') as HTMLElement;
        if (pin) {
          pin.style.transform = 'scale(1)';
        }
        // Don't immediately hide - let the card handle it
        setTimeout(() => {
          setHoveredProperty(prev => prev?.id === property.id ? null : prev);
        }, 100);
      });

      // Add click handler
      el.addEventListener('click', () => {
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });

      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(coords)
        .addTo(map.current!);

      markers.current.push(marker);
    });

    // Fit bounds to show all markers
    if (properties.length > 0 && !singleProperty) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend(getPropertyCoordinates(property));
      });

      // Only fit bounds if we have multiple properties
      if (properties.length > 1) {
        map.current.fitBounds(bounds, {
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          maxZoom: 13,
          duration: 1000
        });
      } else {
        // For single property, center on it
        const coords = getPropertyCoordinates(properties[0]);
        map.current.flyTo({
          center: coords,
          zoom: 13,
          duration: 1000
        });
      }
    }
  }, [properties, mapLoaded, selectedProperty, onPropertySelect, singleProperty]);

  // Update map when search location changes
  useEffect(() => {
    if (!map.current || !mapLoaded || !searchLocation) return;

    const coords = cityCoordinates[searchLocation];
    if (coords) {
      map.current.flyTo({
        center: coords,
        zoom: 11,
        duration: 1500
      });
    }
  }, [searchLocation, mapLoaded]);

  // Highlight selected property
  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedProperty) return;

    const coords = getPropertyCoordinates(selectedProperty);
    map.current.flyTo({
      center: coords,
      zoom: 14,
      duration: 1000
    });
  }, [selectedProperty, mapLoaded]);

  const formatNumber = (num: number | undefined, maxDecimals: number = 2): string => {
    if (!num) return '0';
    if (Number.isInteger(num)) {
      return num.toLocaleString('en-US');
    }
    const fixed = num.toFixed(maxDecimals);
    const cleaned = fixed.replace(/\\.?0+$/, '');
    return parseFloat(cleaned).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals
    });
  };

  return (
    <div className="relative bg-white border border-purple/10 rounded-lg overflow-hidden">
      {/* Map Header - Only show if not single property */}
      {!singleProperty && (
        <div className="bg-purple-lighter/30 px-6 py-4 border-b border-purple/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-black">Property Map</h3>
              <p className="text-sm text-black">
                {properties.length > 0 
                  ? `Showing ${properties.length} ${properties.length === 1 ? 'property' : 'properties'}${searchLocation ? ` in ${searchLocation}` : ''}`
                  : 'Interactive map of short-term rental properties'
                }
              </p>
            </div>
            <Key className="h-5 w-5 text-purple" />
          </div>
        </div>
      )}

      {/* Mapbox Container */}
      <div 
        ref={mapContainer} 
        className="w-full"
        style={{ height: singleProperty ? height : '500px', minHeight: singleProperty ? '300px' : '400px' }}
      />

      {/* Hovered Property Card */}
      {hoveredProperty && !singleProperty && (
        <div 
          className="absolute top-20 left-4 z-10 pointer-events-auto"
          onMouseEnter={() => setHoveredProperty(hoveredProperty)}
          onMouseLeave={() => setHoveredProperty(null)}
        >
          <Card className="w-80 shadow-2xl border-2 border-forest-green overflow-hidden">
            <button
              onClick={() => setHoveredProperty(null)}
              className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-1 hover:bg-white transition-colors"
            >
              <X className="h-4 w-4 text-black" />
            </button>
            
            {hoveredProperty.images && hoveredProperty.images[0] && (
              <div className="relative h-40">
                <ImageWithFallback
                  src={hoveredProperty.images[0]}
                  alt={hoveredProperty.title}
                  className="w-full h-full object-cover"
                />
                {hoveredProperty.propertyType && (
                  <Badge className="absolute top-2 left-2 bg-white text-black border border-purple/20 shadow-md">
                    {hoveredProperty.propertyType}
                  </Badge>
                )}
              </div>
            )}

            <CardContent className="p-4">
              <h3 className="text-black mb-1">{hoveredProperty.title}</h3>
              <div className="flex items-center text-black text-sm mb-3">
                <MapPin className="w-3 h-3 mr-1 text-purple" />
                <span>{hoveredProperty.location}</span>
              </div>

              {hoveredProperty.bedrooms && hoveredProperty.bathrooms && (
                <div className="flex items-center gap-3 text-sm text-black mb-3">
                  <span>{formatNumber(hoveredProperty.bedrooms)} bed</span>
                  <span>{formatNumber(hoveredProperty.bathrooms)} bath</span>
                  {hoveredProperty.sqft && <span>{hoveredProperty.sqft.toLocaleString()} sqft</span>}
                </div>
              )}

              <div className="bg-gradient-to-r from-purple-lighter to-purple-light rounded-lg p-3 mb-3">
                <div className="grid grid-cols-3 gap-2">
                  {hoveredProperty.occupancyRate && (
                    <div>
                      <div className="text-xs text-black mb-1">Occupancy</div>
                      <div className="text-black">{formatNumber(hoveredProperty.occupancyRate)}%</div>
                    </div>
                  )}
                  {hoveredProperty.capRate && (
                    <div>
                      <div className="text-xs text-black mb-1">Cap Rate</div>
                      <div className="text-black">{formatNumber(hoveredProperty.capRate)}%</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-black mb-1">RevPAR</div>
                    <div className="text-black">${formatNumber(hoveredProperty.revpar)}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-2xl text-black">
                  ${hoveredProperty.price.toLocaleString()}
                </div>
                {hoveredProperty.nightlyRate && (
                  <div className="text-sm text-black">
                    ${hoveredProperty.nightlyRate}/night
                  </div>
                )}
              </div>

              {onPropertySelect && (
                <button
                  onClick={() => {
                    onPropertySelect(hoveredProperty);
                    setHoveredProperty(null);
                  }}
                  className="w-full mt-3 px-4 py-2 bg-forest-green text-white rounded-md hover:bg-forest-green-dark transition-colors"
                >
                  View Details
                </button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Legend - Only show if not single property */}
      {!singleProperty && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-purple/10 shadow-lg">
          <div className="text-xs text-black font-medium mb-2">Map Legend</div>
          <div className="flex items-center space-x-2 mb-1">
            <svg width="20" height="26" viewBox="0 0 30 38" fill="none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <path d="M15 38 L8 28 L8 8 C8 4 11 0 15 0 C19 0 22 4 22 8 L22 28 Z" 
                    fill="#1F3B2C" 
                    stroke="white" 
                    strokeWidth="2"/>
              <circle cx="15" cy="9" r="5" fill="white"/>
              <circle cx="15" cy="9" r="2.5" fill="#1F3B2C"/>
            </svg>
            <span className="text-xs text-black">Available Properties</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg width="20" height="26" viewBox="0 0 30 38" fill="none" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <path d="M15 38 L8 28 L8 8 C8 4 11 0 15 0 C19 0 22 4 22 8 L22 28 Z" 
                    fill="#C5A250" 
                    stroke="white" 
                    strokeWidth="2"/>
              <circle cx="15" cy="9" r="5" fill="white"/>
              <circle cx="15" cy="9" r="2.5" fill="#C5A250"/>
            </svg>
            <span className="text-xs text-black">Selected Property</span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-forest-green border-t-transparent mx-auto mb-4"></div>
            <p className="text-black">Loading interactive map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
