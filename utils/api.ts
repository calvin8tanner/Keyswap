// Authentication API utilities
export const authApi = {
  async checkAuth() {
    // Stub implementation
    return {
      isAuthenticated: false,
      user: null,
      profile: null
    };
  },

  async logout() {
    // Stub implementation
    sessionStorage.removeItem('keyswap_access_token');
  }
};
