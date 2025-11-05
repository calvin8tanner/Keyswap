import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { SellPage } from './pages/SellPage';
import { FindAgent } from './components/FindAgent';
import { PropertyDetail } from './components/PropertyDetail';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { SellerDashboard } from './components/SellerDashboard';
import { AboutPage } from './pages/AboutPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { BlogPage } from './pages/BlogPage';
import { authApi } from './utils/api';

type PageType = 'home' | 'buy' | 'sell' | 'agents' | 'login' | 'signup' | 'dashboard' | 'about' | 'help' | 'contact' | 'careers' | 'blog' | 'privacy' | 'terms' | 'cookies' | 'sitemap';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem('keyswap_access_token');
        if (token) {
          const { isAuthenticated, user, profile } = await authApi.checkAuth();
          if (isAuthenticated && user) {
            setIsLoggedIn(true);
            setCurrentUser({ ...user, ...profile });
            setAccessToken(token);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setSelectedProperty(null); // Clear any selected property when navigating
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
    // Scroll to top of page when property is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToResults = () => {
    setSelectedProperty(null);
  };

  const handleLogin = (user: any, token: string) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setAccessToken(token);
    // Navigate to dashboard if seller, otherwise home
    const userType = user?.userType || user?.user_metadata?.userType;
    if (userType === 'seller') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleSignupSuccess = (user: any, token: string) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setAccessToken(token);
    // Navigate to dashboard if seller, otherwise home
    const userType = user?.userType || user?.user_metadata?.userType;
    if (userType === 'seller') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      sessionStorage.removeItem('keyswap_access_token');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setAccessToken('');
      setCurrentPage('home');
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto mb-4"></div>
          <p className="text-black">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show header on login/signup/dashboard pages
  const showHeader = currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'dashboard';
  
  // Show footer on all pages
  const showFooter = true;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showHeader && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <div className="flex-1">
        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
        )}
        
        {currentPage === 'signup' && (
          <SignUpPage onNavigate={handleNavigate} onSignupSuccess={handleSignupSuccess} />
        )}
        
        {currentPage === 'dashboard' && (
          <SellerDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            user={currentUser}
            accessToken={accessToken}
          />
        )}
        
        {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'dashboard' && (
          <>
            {selectedProperty ? (
              <PropertyDetail 
                property={selectedProperty} 
                onBack={handleBackToResults} 
              />
            ) : (
              <>
                {currentPage === 'home' && (
                  <HomePage 
                    onPropertySelect={handlePropertySelect} 
                    onNavigate={handleNavigate}
                  />
                )}
                {currentPage === 'buy' && (
                  <BuyPage onPropertySelect={handlePropertySelect} />
                )}
                {currentPage === 'sell' && (
                  <SellPage />
                )}
                {currentPage === 'agents' && (
                  <FindAgent />
                )}
                {currentPage === 'about' && (
                  <AboutPage />
                )}
                {currentPage === 'help' && (
                  <HelpCenterPage />
                )}
                {currentPage === 'privacy' && (
                  <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
                    <h1 className="text-4xl text-black mb-6">Privacy Policy</h1>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-black mb-4">Last updated: September 29, 2025</p>
                      <p className="text-black mb-4">
                        At Keyswap, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
                      </p>
                      <h3 className="text-2xl text-black mb-3">Information We Collect</h3>
                      <p className="text-black mb-4">
                        We collect information you provide directly to us, including name, email, phone number, and property information 
                        when you create an account or list a property.
                      </p>
                      <h3 className="text-2xl text-black mb-3">How We Use Your Information</h3>
                      <p className="text-black mb-4">
                        We use the information we collect to provide, maintain, and improve our services, process transactions, 
                        and communicate with you about your account and our services.
                      </p>
                    </div>
                  </div>
                )}
                {currentPage === 'terms' && (
                  <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
                    <h1 className="text-4xl text-black mb-6">Terms of Service</h1>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-black mb-4">Last updated: September 29, 2025</p>
                      <p className="text-black mb-4">
                        By accessing and using Keyswap, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                      </p>
                      <h3 className="text-2xl text-black mb-3">User Accounts</h3>
                      <p className="text-black mb-4">
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities 
                        that occur under your account.
                      </p>
                      <h3 className="text-2xl text-black mb-3">Listing Requirements</h3>
                      <p className="text-black mb-4">
                        All property listings must include accurate information and verified income documentation. 
                        Misrepresentation of property details or income may result in account suspension.
                      </p>
                    </div>
                  </div>
                )}
                {currentPage === 'contact' && (
                  <ContactPage />
                )}
                {currentPage === 'careers' && (
                  <CareersPage />
                )}
                {currentPage === 'blog' && (
                  <BlogPage />
                )}
                {(currentPage === 'cookies' || currentPage === 'sitemap') && (
                  <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
                    <h1 className="text-4xl text-black mb-6">
                      {currentPage === 'cookies' && 'Cookie Policy'}
                      {currentPage === 'sitemap' && 'Sitemap'}
                    </h1>
                    <p className="text-black">This page is coming soon.</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      
      {showFooter && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}