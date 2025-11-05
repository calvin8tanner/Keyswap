import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { authApi } from '../utils/api';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
  onSignupSuccess?: (user: any, accessToken: string) => void;
}

export function SignUpPage({ onNavigate, onSignupSuccess }: SignUpPageProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }

    setIsLoading(true);
    
    try {
      const fullName = `${firstName} ${lastName}`;
      const { user, accessToken } = await authApi.signup(email, password, fullName, userType);
      
      // Store access token in sessionStorage
      if (accessToken) {
        sessionStorage.setItem('keyswap_access_token', accessToken);
      }
      
      setSuccess(true);
      
      // Wait a moment to show success message
      setTimeout(() => {
        if (onSignupSuccess) {
          onSignupSuccess(user, accessToken || '');
        } else {
          // Default: navigate to login
          onNavigate('login');
        }
      }, 1500);
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-lighter to-white flex items-center justify-center px-4">
        <Card className="border-purple/10 shadow-lg max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl text-black mb-2">Account Created!</h2>
            <p className="text-black mb-4">
              Welcome to Keyswap! Redirecting you to your {userType === 'seller' ? 'dashboard' : 'account'}...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-lighter to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-black mb-2">Join Keyswap</h1>
          <p className="text-black">Create your account to start investing</p>
        </div>

        <Card className="border-purple/10 shadow-lg">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl text-black">Sign Up</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* User Type Selection */}
              <div>
                <label className="block text-sm text-black mb-2">
                  I am a...
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('buyer')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userType === 'buyer'
                        ? 'border-purple bg-purple/5 text-black'
                        : 'border-gray-200 text-black hover:border-purple/30'
                    }`}
                  >
                    <div className="text-sm">Buyer</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('seller')}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      userType === 'seller'
                        ? 'border-purple bg-purple/5 text-black'
                        : 'border-gray-200 text-black hover:border-purple/30'
                    }`}
                  >
                    <div className="text-sm">Seller</div>
                  </button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-black mb-2">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                    className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-black mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                    className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm text-black mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="border-purple/20 focus:border-purple text-black placeholder:text-black/60"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="border-purple/20 focus:border-purple text-black placeholder:text-black/60 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-purple"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-black mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="border-purple/20 focus:border-purple text-black placeholder:text-black/60 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-purple"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="border-purple/20 data-[state=checked]:bg-purple data-[state=checked]:border-purple cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-black leading-relaxed">
                    I agree to the{' '}
                    <button 
                      type="button" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Navigate to terms page when implemented
                      }}
                      className="text-black hover:text-purple underline"
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Navigate to privacy page when implemented
                      }}
                      className="text-black hover:text-purple underline"
                    >
                      Privacy Policy
                    </button>
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple-dark text-white py-3"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-black">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-black">
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-black hover:text-purple underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-black hover:text-purple underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}