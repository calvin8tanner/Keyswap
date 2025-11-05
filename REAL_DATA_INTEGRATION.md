# Real Data Integration Guide for Keyswap

## Overview
This guide explains how to integrate real data sources into the Keyswap valuation tool and property marketplace.

---

## 🎯 Data Sources You'll Need

### 1. **AirDNA** (Primary STR Data) - RECOMMENDED
- **What it provides:**
  - Market analytics (ADR, occupancy, revenue)
  - Comparable properties
  - Revenue forecasts
  - Historical performance data
  - Demand scores

- **Pricing:** 
  - API access: ~$500-2,000/month
  - Per-call pricing available
  - Enterprise plans for high volume

- **Website:** https://www.airdna.co/developers
- **Documentation:** https://docs.airdna.co

- **Key Endpoints:**
  - `/market/stats` - Market overview data
  - `/rentalizer/estimate` - Revenue estimates
  - `/rentalizer/comps` - Comparable properties
  - `/property/performance` - Individual property data

### 2. **Mashvisor** (Alternative STR + Traditional RE)
- **What it provides:**
  - STR and traditional rental data
  - Property values
  - Investment metrics
  - Neighborhood analytics

- **Pricing:** $29-99/month for basic, API custom pricing
- **Website:** https://www.mashvisor.com

### 3. **Google Maps API** (Location Data)
- **What it provides:**
  - Geocoding (address → coordinates)
  - Reverse geocoding
  - Nearby places/amenities
  - Distance calculations

- **Pricing:** 
  - $5 per 1,000 requests (Geocoding)
  - $17 per 1,000 requests (Places)
  - First $200/month free credit

- **Setup:** https://developers.google.com/maps/documentation

### 4. **Property Value APIs**

**Option A: RealtyMole**
- Property details, valuations, rental estimates
- Pricing: $0.50-2.00 per request
- Website: https://www.realtymole.com/api

**Option B: Zillow (Zestimate)**
- Note: Official API discontinued, but can use RapidAPI versions
- Pricing: Variable on RapidAPI

**Option C: Attom Data Solutions**
- Comprehensive property data
- Pricing: Custom enterprise pricing
- Website: https://www.attomdata.com

### 5. **Your Own Database**
- Store user-submitted data
- Cache API responses
- Build your own comparable database
- Track market trends over time

---

## 🏗️ Architecture Options

### Option 1: Backend-First (RECOMMENDED for Production)

```
Frontend (React) → Your Backend (Node.js/Python/etc.) → External APIs
                                ↓
                           Your Database (PostgreSQL/MongoDB)
```

**Advantages:**
- ✅ Protects API keys
- ✅ Enables caching and rate limiting
- ✅ Can combine multiple data sources
- ✅ Better error handling
- ✅ Can add business logic
- ✅ Reduces costs through caching

**Example Backend (Node.js):**

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

app.post('/api/valuations/estimate', async (req, res) => {
  const { address, bedrooms, bathrooms, sleeps } = req.body;
  
  // Check cache first
  const cacheKey = JSON.stringify(req.body);
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  try {
    // 1. Geocode address
    const geocodeRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    );
    
    const { lat, lng } = geocodeRes.data.results[0].geometry.location;
    
    // 2. Get AirDNA data
    const airDnaRes = await axios.post(
      'https://api.airdna.co/v1/rentalizer/estimate',
      {
        lat,
        lng,
        bedrooms,
        bathrooms,
        accommodates: sleeps
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AIRDNA_API_KEY}`
        }
      }
    );
    
    // 3. Process and combine data
    const valuation = processValuation(airDnaRes.data);
    
    // 4. Cache the result
    cache.set(cacheKey, valuation);
    
    res.json(valuation);
    
  } catch (error) {
    res.status(500).json({ error: 'Valuation failed' });
  }
});

app.listen(3001);
```

### Option 2: Direct API Calls from Frontend

```
Frontend (React) → External APIs directly
```

**Disadvantages:**
- ❌ Exposes API keys (security risk)
- ❌ No caching (higher costs)
- ❌ Rate limiting harder to manage
- ❌ CORS issues possible

**Only use for:** Development/testing with API keys that have spending limits

---

## 💰 Cost Estimation

### Scenario: 1,000 valuations per month

**Option A: AirDNA + Google Maps**
- AirDNA: $500-1,000/month (subscription)
- Google Maps Geocoding: $5 per 1,000 = $5/month
- **Total: ~$505-1,005/month**

**Option B: Build Your Own + Supplement with APIs**
- Web scraping infrastructure: $100-200/month (servers)
- Google Maps: $5/month
- Occasional API calls for validation: $100/month
- **Total: ~$205-305/month**
- **Trade-off:** More development time, legal gray area

**Option C: Hybrid Approach**
- Cache aggressively, use APIs for new data only
- Build comp database from user submissions
- Estimated: $200-400/month

### Free Tier Options

1. **Start with Mock Data** (Current approach)
   - Use for MVP/demo
   - Great for showing investors
   - No API costs

2. **User-Generated Data**
   - Collect data from sellers
   - Build database over time
   - Free, but takes time to build

3. **Census/Public Data** (Free)
   - US Census API
   - BLS (Bureau of Labor Statistics)
   - Limited STR-specific data

---

## 🔧 Implementation Steps

### Step 1: Set Up Environment Variables

Create `.env` file:
```bash
# Google Maps
REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here

# AirDNA (or use backend)
AIRDNA_API_KEY=your_key_here  # Backend only

# Your Backend
REACT_APP_BACKEND_API_URL=https://api.keyswap.com/v1
```

### Step 2: Update ValuationTool Component

```typescript
// ValuationTool.tsx
import { getPropertyValuation } from './services/ValuationService';

const handleSubmit = async (propertyData: PropertyData) => {
  setIsLoading(true);
  
  try {
    // This will use real APIs if configured, fall back to mock data
    const result = await getPropertyValuation(propertyData);
    setValuationResult(result);
  } catch (error) {
    console.error('Valuation failed:', error);
    toast.error('Unable to generate valuation. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

### Step 3: Build Backend API (Recommended)

Choose your stack:

**Node.js + Express:**
```bash
npm install express axios node-cache dotenv
```

**Python + Flask:**
```bash
pip install flask requests flask-caching python-dotenv
```

**Python + FastAPI:**
```bash
pip install fastapi uvicorn httpx
```

### Step 4: Deploy Backend

Options:
- **Vercel** - Great for Next.js API routes
- **Railway** - Easy Node.js/Python deployment
- **Heroku** - Classic choice
- **AWS Lambda** - Serverless, pay per request
- **Google Cloud Run** - Containerized apps

### Step 5: Add Database (Optional but Recommended)

For caching and storing property data:

**PostgreSQL (Recommended):**
```sql
CREATE TABLE valuations (
  id SERIAL PRIMARY KEY,
  address TEXT,
  bedrooms INT,
  bathrooms DECIMAL,
  property_data JSONB,
  valuation_result JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

CREATE INDEX idx_address ON valuations(address);
CREATE INDEX idx_expires ON valuations(expires_at);
```

**Supabase (Easiest):**
- Built-in PostgreSQL
- Real-time subscriptions
- Authentication included
- Free tier available

---

## 📊 Sample API Response Formats

### AirDNA Rentalizer Response
```json
{
  "adr": 185.50,
  "occupancy": 76.5,
  "annual_revenue": 51843,
  "confidence": 85,
  "monthly_breakdown": [
    {
      "month": "2025-01",
      "adr": 165.00,
      "occupancy": 68.0,
      "revenue": 3468
    }
  ]
}
```

### Google Geocoding Response
```json
{
  "results": [
    {
      "geometry": {
        "location": {
          "lat": 30.2672,
          "lng": -97.7431
        }
      },
      "formatted_address": "123 Main St, Austin, TX 78701"
    }
  ],
  "status": "OK"
}
```

---

## 🎯 Recommended Approach for Keyswap

### Phase 1: MVP (Current)
- ✅ Use mock data
- ✅ Show calculations and logic
- ✅ Prove concept to investors
- **Cost: $0**

### Phase 2: Beta Launch
- Add Google Maps geocoding
- Integrate 1-2 real data sources
- Cache aggressively
- Start collecting user data
- **Cost: ~$200-500/month**

### Phase 3: Production
- Full AirDNA integration
- Your own proprietary database
- Machine learning for better estimates
- Real-time market data
- **Cost: ~$1,000-2,000/month**

---

## 🔐 Security Best Practices

1. **Never expose API keys in frontend code**
2. **Use environment variables**
3. **Implement rate limiting**
4. **Set spending limits on API accounts**
5. **Use HTTPS only**
6. **Validate all user inputs**
7. **Implement request signing** for backend API
8. **Monitor API usage** for anomalies

---

## 📚 Additional Resources

- **AirDNA API Docs:** https://docs.airdna.co
- **Google Maps Platform:** https://developers.google.com/maps
- **Real Estate API Comparison:** https://www.realtymole.com/blog/real-estate-apis
- **Census API:** https://www.census.gov/data/developers.html

---

## ⚡ Quick Start (Development)

1. **Sign up for free tiers:**
   - Google Maps (free $200/month credit)
   - Sign up for AirDNA trial if available

2. **Set up backend:**
   ```bash
   # Clone starter template
   npx create-express-api keyswap-backend
   cd keyswap-backend
   npm install axios node-cache dotenv
   ```

3. **Add API route:**
   - Copy code from ValuationService.tsx
   - Adapt for backend

4. **Test with Postman:**
   - Test each API endpoint
   - Verify data format

5. **Connect to frontend:**
   - Update REACT_APP_BACKEND_API_URL
   - Deploy and test

---

## 🤝 Need Help?

Consider hiring:
- **Backend Developer** - To build API integration ($3,000-8,000)
- **DevOps Engineer** - For deployment and scaling ($2,000-5,000)
- **Data Engineer** - For building proprietary database ($5,000-15,000)

Or use a service like:
- **RapidAPI** - Pre-built real estate APIs
- **Zapier/Make** - No-code API integration
- **BuildShip** - Visual backend builder