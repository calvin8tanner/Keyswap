import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-forest-green text-white mt-16">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl text-white mb-4">Keyswap</h3>
            <p className="text-white/90 mb-4 text-sm">
              The premier marketplace for turnkey STR and short-term rental investment properties.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@keyswap.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('buy')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Browse Properties
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('sell')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  List Your Property
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('market-data')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Market Data
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('agents')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Find an Agent
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('about')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('help')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('contact')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('careers')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('blog')}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white mb-4">Stay Updated</h4>
            <p className="text-white/90 text-sm mb-4">
              Subscribe to our newsletter for the latest investment opportunities and market insights.
            </p>
            <div className="flex gap-2 mb-4">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white text-black border-white placeholder:text-gray-500"
              />
              <Button className="bg-tan hover:bg-tan-dark text-black flex-shrink-0">
                Subscribe
              </Button>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-white mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/90">
            © 2025 Keyswap. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <button 
              onClick={() => handleLinkClick('privacy')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleLinkClick('terms')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleLinkClick('cookies')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Cookie Policy
            </button>
            <button 
              onClick={() => handleLinkClick('sitemap')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}