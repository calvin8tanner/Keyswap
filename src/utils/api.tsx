import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Base API URL for server functions
const API_BASE_URL = `${SUPABASE_URL}/functions/v1/make-server-46e78b5c`;

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// ==================== Authentication API ====================

export const authApi = {
  async signup(email: string, password: string, name: string, userType: 'buyer' | 'seller') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          userType,
        },
      },
    });

    if (error) throw error;

    // Store access token in sessionStorage
    if (data.session?.access_token) {
      sessionStorage.setItem('keyswap_access_token', data.session.access_token);
    }

    return {
      user: data.user,
      session: data.session,
      accessToken: data.session?.access_token || '',
    };
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Store access token in sessionStorage
    if (data.session?.access_token) {
      sessionStorage.setItem('keyswap_access_token', data.session.access_token);
    }

    return {
      user: data.user,
      session: data.session,
      accessToken: data.session?.access_token || '',
    };
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    sessionStorage.removeItem('keyswap_access_token');
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;

    return {
      session: data.session,
      user: data.session?.user || null,
      accessToken: data.session?.access_token || '',
    };
  },

  async checkAuth() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return {
        isAuthenticated: false,
        user: null,
        profile: null,
      };
    }

    // Get user profile data
    try {
      const token = sessionStorage.getItem('keyswap_access_token');
      const profile = token ? await userApi.getProfile(token) : null;

      return {
        isAuthenticated: true,
        user: data.user,
        profile,
      };
    } catch {
      return {
        isAuthenticated: true,
        user: data.user,
        profile: null,
      };
    }
  },
};

// ==================== Property API ====================

export const propertyApi = {
  async getAll(filters?: {
    location?: string;
    propertyType?: string;
    maxPrice?: number;
    minReturn?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.location) params.append('location', filters.location);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.minReturn) params.append('minReturn', filters.minReturn.toString());
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';

    return apiRequest(endpoint);
  },

  async getById(propertyId: string) {
    return apiRequest(`/properties/${propertyId}`);
  },

  async create(accessToken: string, propertyData: any) {
    return apiRequest('/properties', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(propertyData),
    });
  },

  async update(accessToken: string, propertyId: string, updateData: any) {
    return apiRequest(`/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateData),
    });
  },

  async delete(accessToken: string, propertyId: string) {
    return apiRequest(`/properties/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async getUserProperties(accessToken: string) {
    return apiRequest('/user/properties', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

// ==================== User API ====================

export const userApi = {
  async getProfile(accessToken: string) {
    return apiRequest('/user/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async updateProfile(accessToken: string, profileData: any) {
    return apiRequest('/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    });
  },
};

// ==================== Saved Properties API ====================

export const savedApi = {
  async getSaved(accessToken: string) {
    return apiRequest('/user/saved', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },

  async save(accessToken: string, propertyId: string) {
    return apiRequest('/user/saved', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ propertyId }),
    });
  },

  async remove(accessToken: string, propertyId: string) {
    return apiRequest(`/user/saved/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

// ==================== Upload API ====================

export const uploadApi = {
  async uploadImage(accessToken: string, file: File) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const userId = user.user.id;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `images/${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('make-46e78b5c-keyswap-storage')
      .upload(filePath, file);

    if (error) throw error;

    // Get signed URL (valid for 1 year)
    const { data: urlData } = await supabase.storage
      .from('make-46e78b5c-keyswap-storage')
      .createSignedUrl(filePath, 31536000);

    return urlData?.signedUrl || '';
  },

  async uploadDocument(accessToken: string, file: File) {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const userId = user.user.id;
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `documents/${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('make-46e78b5c-keyswap-storage')
      .upload(filePath, file);

    if (error) throw error;

    // Get signed URL (valid for 1 year)
    const { data: urlData } = await supabase.storage
      .from('make-46e78b5c-keyswap-storage')
      .createSignedUrl(filePath, 31536000);

    return urlData?.signedUrl || '';
  },
};

// ==================== Inquiry API ====================

export const inquiryApi = {
  async submit(accessToken: string, propertyId: string, message: string) {
    return apiRequest('/inquiries', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ propertyId, message }),
    });
  },

  async getAll(accessToken: string) {
    return apiRequest('/inquiries', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

// ==================== Subscription API ====================

export const subscriptionApi = {
  async update(accessToken: string, plan: string, price: number) {
    return apiRequest('/subscription/update', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ plan, price }),
    });
  },
};

// Export all APIs
export default {
  authApi,
  propertyApi,
  userApi,
  savedApi,
  uploadApi,
  inquiryApi,
  subscriptionApi,
};
