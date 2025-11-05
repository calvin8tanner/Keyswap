import { Building2, Target, Users2, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function AboutPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl text-black mb-6">About Keyswap</h1>
        <p className="text-xl text-black/80 max-w-3xl mx-auto">
          The premier marketplace connecting investors with turnkey short-term rental investment properties.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <h2 className="text-3xl text-black mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-black/80 max-w-4xl mx-auto text-center mb-8">
          Keyswap is revolutionizing the way investors discover and acquire short-term rental properties. 
          We provide transparent, data-driven insights and verified income statements to empower investors 
          to make confident, informed decisions in the STR market.
        </p>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl text-black mb-10 text-center">What Sets Us Apart</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-forest-green/20 hover:border-forest-green/40 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-forest-green" />
                </div>
                <h3 className="text-xl text-black mb-3">Verified Properties</h3>
                <p className="text-black/70">
                  Every listing includes verified income data and performance metrics from actual STR platforms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/20 hover:border-gold/40 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl text-black mb-3">Data-Driven Insights</h3>
                <p className="text-black/70">
                  Advanced analytics including RevPAR, occupancy rates, cash-on-cash returns, and cap rates.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-forest-green/20 hover:border-forest-green/40 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mb-4">
                  <Users2 className="h-8 w-8 text-forest-green" />
                </div>
                <h3 className="text-xl text-black mb-3">Expert Network</h3>
                <p className="text-black/70">
                  Connect with specialized STR agents and professional property managers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gold/20 hover:border-gold/40 transition-all">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl text-black mb-3">Turnkey Ready</h3>
                <p className="text-black/70">
                  All properties are fully furnished and ready to generate income from day one.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16 bg-tan-lighter/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl text-black mb-6">Our Story</h2>
        <div className="space-y-4 text-black/80">
          <p>
            Founded in 2024, Keyswap emerged from a simple observation: the short-term rental investment market 
            lacked transparency and reliable data. Traditional real estate platforms weren't built for the unique 
            needs of STR investors who need to see actual performance metrics, not just property specs.
          </p>
          <p>
            We built Keyswap to bridge this gap. Our platform provides investors with the same level of financial 
            transparency they'd expect from any other investment vehicle—verified income statements, historical 
            performance data, and predictive analytics.
          </p>
          <p>
            Today, Keyswap serves thousands of investors across the country, facilitating millions of dollars 
            in STR property transactions. We're proud to be the most trusted marketplace for short-term rental 
            investment properties.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl text-forest-green mb-2">$250M+</div>
          <div className="text-black">Properties Listed</div>
        </div>
        <div>
          <div className="text-4xl text-forest-green mb-2">5,000+</div>
          <div className="text-black">Investors Served</div>
        </div>
        <div>
          <div className="text-4xl text-forest-green mb-2">98%</div>
          <div className="text-black">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
}
