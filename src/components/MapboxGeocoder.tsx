// Mapbox Geocoding Service
// Provides geocoding functionality to convert addresses to coordinates

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY3Rhbm5lcjAyMTAiLCJhIjoiY21laXo0ODUwMDdmNzJqcTBoNWd6ZzM5dSJ9.TOuJbt3Y7bCiJ7LDBTegJw';

export interface GeocodeResult {
  longitude: number;
  latitude: number;
  placeName: string;
  context?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_TOKEN}&country=US&limit=1`
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const [longitude, latitude] = feature.center;

      // Extract context information
      const context: any = {};
      if (feature.context) {
        feature.context.forEach((item: any) => {
          if (item.id.startsWith('place')) {
            context.city = item.text;
          } else if (item.id.startsWith('region')) {
            context.state = item.text;
          } else if (item.id.startsWith('country')) {
            context.country = item.text;
          }
        });
      }

      return {
        longitude,
        latitude,
        placeName: feature.place_name,
        context
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export async function reverseGeocode(longitude: number, latitude: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding request failed');
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

export async function searchPlaces(query: string, proximity?: [number, number]): Promise<GeocodeResult[]> {
  try {
    const encodedQuery = encodeURIComponent(query);
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${MAPBOX_TOKEN}&country=US&limit=5&types=place,locality`;
    
    if (proximity) {
      url += `&proximity=${proximity[0]},${proximity[1]}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Places search request failed');
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features.map((feature: any) => {
        const [longitude, latitude] = feature.center;
        
        const context: any = {};
        if (feature.context) {
          feature.context.forEach((item: any) => {
            if (item.id.startsWith('place')) {
              context.city = item.text;
            } else if (item.id.startsWith('region')) {
              context.state = item.text;
            } else if (item.id.startsWith('country')) {
              context.country = item.text;
            }
          });
        }

        return {
          longitude,
          latitude,
          placeName: feature.place_name,
          context
        };
      });
    }

    return [];
  } catch (error) {
    console.error('Places search error:', error);
    return [];
  }
}
