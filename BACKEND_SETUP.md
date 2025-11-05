# Keyswap Backend Integration Guide

## Overview

Your Keyswap marketplace now has a fully functional backend powered by Supabase, including:

- ✅ **User Authentication** - Sign up, login, logout, and session management
- ✅ **Property Listings** - CRUD operations for property management
- ✅ **User Profiles** - Profile creation and updates
- ✅ **Saved Properties** - Favorites/bookmarking functionality
- ✅ **File Uploads** - Property images and income verification documents
- ✅ **Inquiries** - Contact sellers about properties
- ✅ **Subscriptions** - Seller subscription plan management
- ✅ **Secure Storage** - Private file storage with signed URLs

---

## Architecture

### Three-Tier Architecture

```
Frontend (React) → Server (Hono) → Database (Supabase)
```

1. **Frontend**: React components use API utility functions
2. **Server**: Hono web server running on Supabase Edge Functions
3. **Database**: Supabase Postgres + KV Store for flexible data storage

---

## Getting Started

### 1. Testing Authentication

Try creating an account and logging in:

1. Click "Sign Up" in the navigation
2. Fill out the form (choose Buyer or Seller)
3. Create your account
4. You'll be automatically logged in and redirected

**Demo Credentials** (if you create a test account):
- Email: `test@keyswap.com`
- Password: `password123`

### 2. Understanding the API

All backend interactions are handled through the `/utils/api.tsx` file:

```typescript
import { authApi, propertyApi, userApi, savedApi, uploadApi, inquiryApi, subscriptionApi } from '../utils/api';

// Example: Login
const { user, accessToken } = await authApi.login(email, password);

// Example: Get properties
const properties = await propertyApi.getAll({ location: 'Miami' });

// Example: Save a property (requires authentication)
await savedApi.save(accessToken, propertyId);
```

---

## API Reference

### Authentication API (`authApi`)

#### Sign Up
```typescript
const { user, session, accessToken } = await authApi.signup(
  email: string,
  password: string,
  name: string,
  userType: 'buyer' | 'seller'
);
```

#### Login
```typescript
const { user, session, accessToken } = await authApi.login(
  email: string,
  password: string
);
```

#### Logout
```typescript
await authApi.logout();
```

#### Get Current Session
```typescript
const { session, user, accessToken } = await authApi.getSession();
```

#### Check Auth Status
```typescript
const { isAuthenticated, user, profile } = await authApi.checkAuth();
```

---

### Property API (`propertyApi`)

#### Get All Properties (with filters)
```typescript
const properties = await propertyApi.getAll({
  location?: string,
  propertyType?: string,
  maxPrice?: number,
  minReturn?: number
});
```

#### Get Single Property
```typescript
const property = await propertyApi.getById(propertyId);
```

#### Create Property (requires auth)
```typescript
const property = await propertyApi.create(accessToken, {
  title: string,
  location: string,
  price: number,
  propertyType: string,
  bedrooms: number,
  bathrooms: number,
  sqft: number,
  images: string[],
  nightlyRate: number,
  occupancyRate: number,
  annualRevenue: number,
  cashOnCashReturn: number,
  // ... other fields
});
```

#### Update Property (requires auth + ownership)
```typescript
const updatedProperty = await propertyApi.update(
  accessToken,
  propertyId,
  updateData
);
```

#### Delete Property (requires auth + ownership)
```typescript
await propertyApi.delete(accessToken, propertyId);
```

#### Get User's Properties
```typescript
const myProperties = await propertyApi.getUserProperties(accessToken);
```

---

### User API (`userApi`)

#### Get Profile
```typescript
const profile = await userApi.getProfile(accessToken);
```

#### Update Profile
```typescript
const updatedProfile = await userApi.updateProfile(accessToken, {
  name?: string,
  phone?: string,
  bio?: string,
  // ... other fields
});
```

---

### Saved Properties API (`savedApi`)

#### Get Saved Properties
```typescript
const savedProperties = await savedApi.getSaved(accessToken);
```

#### Save Property
```typescript
await savedApi.save(accessToken, propertyId);
```

#### Remove Saved Property
```typescript
await savedApi.remove(accessToken, propertyId);
```

---

### Upload API (`uploadApi`)

#### Upload Image
```typescript
const imageUrl = await uploadApi.uploadImage(accessToken, fileObject);
```

#### Upload Document
```typescript
const documentUrl = await uploadApi.uploadDocument(accessToken, fileObject);
```

**Note**: Files are stored in private Supabase Storage buckets. URLs are signed and valid for 1 year.

---

### Inquiry API (`inquiryApi`)

#### Submit Inquiry
```typescript
const inquiry = await inquiryApi.submit(
  accessToken,
  propertyId,
  message: string
);
```

#### Get Inquiries
```typescript
const { sent, received, total } = await inquiryApi.getAll(accessToken);
```

---

### Subscription API (`subscriptionApi`)

#### Update Subscription
```typescript
const subscription = await subscriptionApi.update(
  accessToken,
  plan: string,
  price: number
);
```

---

## Data Storage

### KV Store Structure

Data is stored in the Supabase KV store with the following key patterns:

- `user:{userId}` - User profiles and settings
- `property:{propertyId}` - Property listings
- `saved:{userId}:{propertyId}` - Saved/favorited properties
- `inquiry:{inquiryId}` - Property inquiries/messages

### Supabase Storage Buckets

- **Bucket**: `make-46e78b5c-keyswap-storage` (private)
- **Images**: `images/{userId}/{timestamp}-{filename}`
- **Documents**: `documents/{userId}/{timestamp}-{filename}`

---

## Authentication Flow

### Session Management

The app uses Supabase Auth for session management:

1. User signs up or logs in
2. Access token is returned and stored in `sessionStorage`
3. Token is sent with all authenticated requests in `Authorization` header
4. Server validates token on protected routes
5. On logout, token is removed from `sessionStorage`

### Protected Routes

Server routes that require authentication:
- `/user/profile` - User profile operations
- `/properties` (POST, PUT, DELETE) - Property modifications
- `/user/saved` - Saved properties
- `/user/properties` - User's property listings
- `/uploads/*` - File uploads
- `/inquiries` - Property inquiries
- `/subscription/*` - Subscription management

---

## Adding Backend to Existing Components

### Example: PropertyGrid with Real Data

```typescript
import { useEffect, useState } from 'react';
import { propertyApi } from '../utils/api';

function PropertyGrid() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await propertyApi.getAll();
      setProperties(data);
    } catch (error) {
      console.error('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render properties...
}
```

### Example: Save Property Button

```typescript
import { savedApi } from '../utils/api';

function SaveButton({ propertyId }) {
  const [isSaved, setIsSaved] = useState(false);
  const accessToken = sessionStorage.getItem('keyswap_access_token');

  const handleSave = async () => {
    if (!accessToken) {
      alert('Please log in to save properties');
      return;
    }

    try {
      if (isSaved) {
        await savedApi.remove(accessToken, propertyId);
      } else {
        await savedApi.save(accessToken, propertyId);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Failed to save property:', error);
    }
  };

  return (
    <button onClick={handleSave}>
      {isSaved ? 'Saved' : 'Save Property'}
    </button>
  );
}
```

---

## Server Endpoints

All server endpoints are prefixed with `/make-server-46e78b5c`

Base URL: `https://{projectId}.supabase.co/functions/v1/make-server-46e78b5c`

### Available Endpoints

#### Auth
- `POST /auth/signup` - Create new user
- `POST /auth/login` - Sign in (use Supabase client-side)
- `GET /auth/session` - Check current session

#### Properties
- `GET /properties` - List all properties (with optional filters)
- `GET /properties/:id` - Get single property
- `POST /properties` - Create property (auth required)
- `PUT /properties/:id` - Update property (auth + ownership required)
- `DELETE /properties/:id` - Delete property (auth + ownership required)
- `GET /user/properties` - Get user's properties (auth required)

#### User
- `GET /user/profile` - Get user profile (auth required)
- `PUT /user/profile` - Update profile (auth required)

#### Saved Properties
- `GET /user/saved` - Get saved properties (auth required)
- `POST /user/saved` - Save property (auth required)
- `DELETE /user/saved/:propertyId` - Remove saved property (auth required)

#### Uploads
- `POST /uploads/image` - Upload property image (auth required)
- `POST /uploads/document` - Upload document (auth required)

#### Inquiries
- `POST /inquiries` - Submit inquiry (auth required)
- `GET /inquiries` - Get inquiries (auth required)

#### Subscriptions
- `POST /subscription/update` - Update subscription (auth required)

---

## Error Handling

All API functions throw errors that should be caught:

```typescript
try {
  const properties = await propertyApi.getAll();
} catch (error) {
  console.error('Error loading properties:', error);
  // Show user-friendly error message
  alert(error.message || 'Something went wrong');
}
```

---

## Next Steps

### Recommended Enhancements

1. **Integrate with PropertyGrid**
   - Replace mock data with `propertyApi.getAll()`
   - Add loading and error states
   
2. **Add Favorites Feature**
   - Add save button to property cards
   - Create "Saved Properties" page
   
3. **Enhance Seller Dashboard**
   - Load real property listings with `propertyApi.getUserProperties()`
   - Show real inquiry data
   
4. **Add Property Creation Form**
   - Build form in SellPage
   - Use `propertyApi.create()` to submit
   - Upload images with `uploadApi.uploadImage()`

5. **Implement Inquiry System**
   - Add "Contact Seller" button on PropertyDetail
   - Use `inquiryApi.submit()` to send messages

---

## Important Notes

### Security

- ✅ Access tokens are validated on the server
- ✅ File uploads are stored in private buckets
- ✅ Row-level security through ownership checks
- ✅ CORS is properly configured

### Limitations (Prototyping Environment)

⚠️ **This is a development/prototyping environment:**
- Not intended for collecting real PII or sensitive financial data in production
- For production deployment, migrate to a secure hosting environment
- Email confirmation is auto-enabled (no email server configured)

### Data Persistence

- Data is stored in Supabase KV store and persists across sessions
- Files are stored in Supabase Storage
- User sessions are managed by Supabase Auth

---

## Troubleshooting

### "Unauthorized" Errors

Check that:
1. User is logged in: `sessionStorage.getItem('keyswap_access_token')`
2. Token is being passed to API functions
3. Token hasn't expired (sign in again if needed)

### Properties Not Loading

Check browser console for errors:
```javascript
// Test property API directly
import { propertyApi } from './utils/api';
const properties = await propertyApi.getAll();
console.log(properties);
```

### File Upload Issues

Ensure:
1. File size is under 10MB
2. User is authenticated
3. File is converted to base64 correctly

---

## Support

For backend issues:
- Check browser console for detailed error messages
- Review server logs in Supabase dashboard
- Verify API calls with network tab in DevTools

---

**Built with ❤️ for Keyswap - Your STR Investment Marketplace**
