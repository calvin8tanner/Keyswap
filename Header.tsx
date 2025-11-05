import { useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Menu } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'buy' | 'sell' | 'agents' | 'login' | 'signup') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'buy', label: 'Buy' },
    { id: 'sell', label: 'Sell' },
    { id: 'agents', label: 'Find Agent' }
  ];

  const handleMobileNavigate = (page: any) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Text */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center hover:scale-105 transition-all duration-200 hover:opacity-90"
          >
            <span className="text-2xl font-bold text-forest-green">
              Keyswap
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id as any)}
                className={`
                  ${currentPage === item.id 
                    ? 'bg-purple text-white shadow-md' 
                    : 'text-black hover:bg-purple-lighter hover:text-black transition-all duration-200'
                  }
                `}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black hover:bg-purple-lighter"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-forest-green">Navigation</SheetTitle>
                <SheetDescription>
                  Browse properties and find agents
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "outline"}
                    onClick={() => handleMobileNavigate(item.id)}
                    className={`
                      w-full justify-start
                      ${currentPage === item.id 
                        ? 'bg-forest-green text-white shadow-md' 
                        : 'text-black hover:bg-tan-lighter border-tan-dark'
                      }
                    `}
                  >
                    {item.label}
                  </Button>
                ))}
                <div className="border-t border-tan-dark pt-4 mt-4 flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => handleMobileNavigate('login')}
                    className="w-full justify-start text-black hover:bg-tan-lighter border-tan-dark"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => handleMobileNavigate('signup')}
                    className="w-full justify-start bg-forest-green hover:bg-forest-green-dark text-white shadow-md"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('login')}
              className="hidden sm:inline-flex text-black hover:bg-purple-lighter hover:text-black"
            >
              Login
            </Button>
            <Button 
              onClick={() => onNavigate('signup')}
              className="bg-purple hover:bg-purple-dark text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}