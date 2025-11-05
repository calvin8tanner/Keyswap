import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authApi } from '../utils/api';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any, accessToken: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { user, accessToken } = await authApi.login(email, password);
      
      // Store access token in sessionStorage
      if (accessToken) {
        sessionStorage.setItem('keyswap_access_token', accessToken);
      }
      
      // Call the login handler to update app state
      onLogin(user, accessToken || '');
    } catch (err: any) {
      console.error('Login error:', err);
      // Show a more user-friendly error message
      const errorMessage = err.message || 'Login failed';
      if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('invalid_credentials')) {
        setError('Invalid email or password. Please check your credentials and try again, or sign up for a new account.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-lighter to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-black mb-2">Welcome Back</h1>
          <p className="text-black">Sign in to your Keyswap account</p>
        </div>

        <Card className="border-purple/10 shadow-lg">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl text-black">Log In</h2>
          </CardHeader>
          <CardContent>
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-lg mb-6">
              <p className="text-sm">
                <strong>First time here?</strong> You'll need to{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="underline hover:text-blue-700"
                >
                  create an account
                </button>{' '}
                before you can sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

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
                    placeholder="Enter your password"
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

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-black hover:text-purple underline"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple-dark text-white py-3"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-black">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-black">
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('signup')}
                  className="text-black hover:text-purple underline"
                >
                  Sign up here
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