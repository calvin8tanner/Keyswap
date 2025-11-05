# Backend API Setup Example

This guide shows you exactly how to set up a backend API to power your Keyswap valuation tool with real data.

## Option 1: Node.js + Express (Easiest)

### Step 1: Create New Project

```bash
mkdir keyswap-api
cd keyswap-api
npm init -y
npm install express axios node-cache dotenv cors
```

### Step 2: Create `server.js`

```javascript
// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3001;
const AIRDNA_API_KEY = process.env.AIRDNA_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// ============================================================================
// VALUATION ENDPOINT
// ============================================================================

app.post('/api/valuations/estimate', async (req, res) => {
  const { address, bedrooms, bathrooms, sleeps, sqft, propertyType, amenities } = req.body;
  
  // Input validation
  if (!address || !bedrooms || !bathrooms) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check cache
  const cacheKey = JSON.stringify(req.body);
  const cached = cache.get(cacheKey);
  if (cached) {
    console.log('Cache hit for:', address);
    return res.json({ ...cached, cached: true });
  }
  
  try {
    console.log('Processing valuation for:', address);
    
    // Step 1: Geocode the address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await axios.get(geocodeUrl);
    
    if (geocodeResponse.data.status !== 'OK') {
      return res.status(400).json({ error: 'Invalid address' });
    }
    
    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
    console.log('Geocoded to:', lat, lng);
    
    // Step 2: Fetch AirDNA data (if you have API access)
    let airdnaData = null;
    if (AIRDNA_API_KEY && AIRDNA_API_KEY !== 'YOUR_AIRDNA_API_KEY') {
      try {
        const airdnaResponse = await axios.post(
          'https://api.airdna.co/v1/rentalizer/estimate',
          {
            lat,
            lng,
            bedrooms,
            bathrooms,
            accommodates: sleeps,
            property_type: mapPropertyType(propertyType)
          },
          {
            headers: {
              'Authorization': `Bearer ${AIRDNA_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        airdnaData = airdnaResponse.data;
        console.log('AirDNA data retrieved');
      } catch (airdnaError) {
        console.error('AirDNA error:', airdnaError.message);
      }
    }
    
    // Step 3: Calculate valuation
    const valuation = calculateValuation({
      bedrooms,
      bathrooms,
      sleeps,
      sqft,
      propertyType,
      amenities,
      lat,
      lng,
      airdnaData
    });
    
    // Step 4: Cache the result
    cache.set(cacheKey, valuation);
    
    // Step 5: Return result
    res.json(valuation);
    
  } catch (error) {
    console.error('Valuation error:', error);
    res.status(500).json({ 
      error: 'Valuation failed',
      message: error.message 
    });
  }
});

// ============================================================================
// CALCULATION LOGIC
// ============================================================================

function calculateValuation(data) {
  const { bedrooms, bathrooms, sleeps, sqft, airdnaData } = data;
  
  // Use AirDNA data if available, otherwise use heuristics
  let adr, occupancy;
  
  if (airdnaData) {
    adr = airdnaData.adr || estimateAdr(bedrooms);
    occupancy = airdnaData.occupancy || 75;
  } else {
    adr = estimateAdr(bedrooms);
    occupancy = 75;
  }
  
  const annualRevenue = adr * 365 * (occupancy / 100);
  const revenueMultiple = 10; // STR properties typically sell for 8-12x annual revenue
  const baseValuation = annualRevenue * revenueMultiple;
  
  return {
    valuation: {
      low: Math.round(baseValuation * 0.85),
      base: Math.round(baseValuation),
      high: Math.round(baseValuation * 1.15),
      confidence: airdnaData ? 85 : 65
    },
    forecast: {
      adr: Math.round(adr),
      occupancy: Math.round(occupancy),
      annual: Math.round(annualRevenue),
      monthly: generateMonthlyForecast(adr, occupancy)
    },
    comps: generateMockComps(),
    marketData: {
      avgAdr: Math.round(adr),
      avgOccupancy: Math.round(occupancy),
      totalListings: 500,
      demandScore: 75
    }
  };
}

function estimateAdr(bedrooms) {
  // Simple heuristic: $100 base + $50 per bedroom
  return 100 + (bedrooms * 50);
}

function generateMonthlyForecast(avgAdr, avgOccupancy) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seasonalFactors = [0.8, 0.8, 0.95, 1.0, 1.1, 1.2, 1.3, 1.25, 1.1, 0.95, 0.85, 0.9];
  
  return months.map((month, i) => ({
    month,
    adr: Math.round(avgAdr * seasonalFactors[i]),
    occupancy: Math.round(avgOccupancy * seasonalFactors[i]),
    revenue: Math.round(avgAdr * seasonalFactors[i] * 30 * (avgOccupancy * seasonalFactors[i] / 100))
  }));
}

function generateMockComps() {
  // In production, fetch real comps from database or API
  return [
    {
      id: '1',
      distance: 0.3,
      adr: 235,
      occupancy: 82,
      revenue: 70380,
      price: 495000,
      amenities: ['Pool', 'WiFi', 'Parking'],
      title: 'Nearby Property 1',
      location: '0.3 miles away'
    },
    {
      id: '2',
      distance: 0.5,
      adr: 215,
      occupancy: 75,
      revenue: 58913,
      price: 515000,
      amenities: ['WiFi', 'Kitchen'],
      title: 'Nearby Property 2',
      location: '0.5 miles away'
    }
  ];
}

function mapPropertyType(type) {
  const mapping = {
    'Single Family': 'entire_home',
    'Condo': 'apartment',
    'Townhouse': 'townhouse',
    'Multi Family': 'entire_home'
  };
  return mapping[type] || 'entire_home';
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log(`🚀 Keyswap API running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`
Configuration:
- AirDNA: ${AIRDNA_API_KEY ? '✅ Configured' : '❌ Not configured (using mock data)'}
- Google Maps: ${GOOGLE_MAPS_API_KEY ? '✅ Configured' : '❌ Not configured'}
  `);
});
```

### Step 3: Create `.env` file

```bash
# .env
PORT=3001

# Google Maps API (Required for geocoding)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# AirDNA API (Optional - uses mock data if not provided)
AIRDNA_API_KEY=your_airdna_api_key_here
```

### Step 4: Create `package.json` scripts

```json
{
  "name": "keyswap-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "node-cache": "^5.1.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### Step 5: Run locally

```bash
npm install
npm run dev
```

Test it:
```bash
curl -X POST http://localhost:3001/api/valuations/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St, Austin, TX",
    "bedrooms": 2,
    "bathrooms": 2,
    "sleeps": 4,
    "sqft": 1200,
    "propertyType": "Condo",
    "amenities": ["WiFi", "Pool"]
  }'
```

### Step 6: Deploy to Railway

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repo
4. Add environment variables in Railway dashboard
5. Deploy!

Railway will give you a URL like: `https://keyswap-api-production.up.railway.app`

### Step 7: Update Frontend

In your React app `.env`:
```bash
REACT_APP_BACKEND_API_URL=https://keyswap-api-production.up.railway.app
```

---

## Option 2: Python + FastAPI (If you prefer Python)

### Step 1: Create Project

```bash
mkdir keyswap-api
cd keyswap-api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn httpx python-dotenv
```

### Step 2: Create `main.py`

```python
# main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv
from typing import List, Optional

load_dotenv()

app = FastAPI(title="Keyswap API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Config
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
AIRDNA_API_KEY = os.getenv("AIRDNA_API_KEY")

# Models
class PropertyInput(BaseModel):
    address: str
    bedrooms: int
    bathrooms: float
    sleeps: int
    sqft: int
    propertyType: str
    amenities: List[str]

class ValuationResponse(BaseModel):
    valuation: dict
    forecast: dict
    comps: list
    marketData: dict

# Routes
@app.post("/api/valuations/estimate", response_model=ValuationResponse)
async def estimate_valuation(property_data: PropertyInput):
    # Geocode address
    async with httpx.AsyncClient() as client:
        geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json"
        params = {
            "address": property_data.address,
            "key": GOOGLE_MAPS_API_KEY
        }
        response = await client.get(geocode_url, params=params)
        geocode_data = response.json()
        
        if geocode_data["status"] != "OK":
            raise HTTPException(status_code=400, detail="Invalid address")
        
        location = geocode_data["results"][0]["geometry"]["location"]
        lat, lng = location["lat"], location["lng"]
    
    # Calculate valuation
    adr = 100 + (property_data.bedrooms * 50)
    occupancy = 75
    annual_revenue = adr * 365 * (occupancy / 100)
    base_valuation = annual_revenue * 10
    
    return {
        "valuation": {
            "low": int(base_valuation * 0.85),
            "base": int(base_valuation),
            "high": int(base_valuation * 1.15),
            "confidence": 75
        },
        "forecast": {
            "adr": int(adr),
            "occupancy": int(occupancy),
            "annual": int(annual_revenue),
            "monthly": []
        },
        "comps": [],
        "marketData": {
            "avgAdr": int(adr),
            "avgOccupancy": int(occupancy),
            "totalListings": 500,
            "demandScore": 75
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Step 3: Run

```bash
uvicorn main:app --reload
```

---

## Option 3: Vercel Serverless Functions (No server needed!)

### Step 1: Create `/api/valuations/estimate.js`

```javascript
// api/valuations/estimate.js
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { address, bedrooms, bathrooms } = req.body;
  
  try {
    // Geocode
    const geocodeResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    );
    
    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
    
    // Calculate
    const adr = 100 + (bedrooms * 50);
    const occupancy = 75;
    const annualRevenue = adr * 365 * (occupancy / 100);
    const baseValuation = annualRevenue * 10;
    
    res.json({
      valuation: {
        low: Math.round(baseValuation * 0.85),
        base: Math.round(baseValuation),
        high: Math.round(baseValuation * 1.15),
        confidence: 75
      },
      forecast: {
        adr,
        occupancy,
        annual: Math.round(annualRevenue),
        monthly: []
      },
      comps: [],
      marketData: {
        avgAdr: adr,
        avgOccupancy: occupancy,
        totalListings: 500,
        demandScore: 75
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### Step 2: Deploy

```bash
npm install -g vercel
vercel
```

Add env vars in Vercel dashboard.

---

## Testing Your API

### Using Postman

1. Create new request
2. Method: POST
3. URL: `http://localhost:3001/api/valuations/estimate`
4. Body (JSON):
```json
{
  "address": "123 Main St, Austin, TX 78701",
  "bedrooms": 2,
  "bathrooms": 2,
  "sleeps": 4,
  "sqft": 1200,
  "propertyType": "Condo",
  "amenities": ["WiFi", "Pool", "Parking"]
}
```

### Using curl

```bash
curl -X POST http://localhost:3001/api/valuations/estimate \
  -H "Content-Type: application/json" \
  -d '{
    "address": "123 Main St, Austin, TX",
    "bedrooms": 2,
    "bathrooms": 2,
    "sleeps": 4,
    "sqft": 1200,
    "propertyType": "Condo",
    "amenities": ["WiFi", "Pool"]
  }'
```

---

## Next Steps

1. ✅ Get API up and running locally
2. ✅ Test with Postman/curl
3. ✅ Deploy to Railway/Vercel/Heroku
4. ✅ Update React app environment variables
5. ✅ Test end-to-end
6. 🎯 Add real AirDNA integration
7. 🎯 Add database for caching
8. 🎯 Add authentication
9. 🎯 Monitor API usage and costs