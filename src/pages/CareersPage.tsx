import { Briefcase, MapPin, Clock, ArrowRight, Heart, Zap, Users2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function CareersPage() {
  const openPositions = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-Time",
      description: "Build and scale the platform that's transforming STR investing. Work with React, Node.js, and modern cloud infrastructure."
    },
    {
      title: "Product Designer",
      department: "Product",
      location: "San Francisco, CA / Remote",
      type: "Full-Time",
      description: "Shape the user experience for investors and sellers. Create intuitive interfaces for complex data visualization and property discovery."
    },
    {
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Remote",
      type: "Full-Time",
      description: "Develop ML models for property valuations and market predictions. Work with massive datasets of STR performance metrics."
    },
    {
      title: "Real Estate Partnership Manager",
      department: "Business Development",
      location: "Miami, FL",
      type: "Full-Time",
      description: "Build relationships with property managers, agents, and investors. Expand our network in key STR markets."
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-Time",
      description: "Create compelling content about STR investing. Manage our blog, guides, and educational resources."
    },
    {
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "Austin, TX / Remote",
      type: "Full-Time",
      description: "Help investors and sellers succeed on our platform. Provide world-class support and build lasting relationships."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipend."
    },
    {
      icon: Zap,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours. Work from anywhere in the US."
    },
    {
      icon: TrendingUp,
      title: "Growth & Learning",
      description: "$2,000 annual learning budget. Conference attendance and professional development."
    },
    {
      icon: Users2,
      title: "Team Culture",
      description: "Annual team retreats. Regular virtual events and celebrations."
    }
  ];

  const values = [
    {
      title: "Transparency First",
      description: "We believe in radical transparency—with our users, our partners, and each other."
    },
    {
      title: "Data-Driven Decisions",
      description: "Every decision is backed by data and insights, from product features to business strategy."
    },
    {
      title: "Investor Success",
      description: "Our success is measured by our users' success. We're obsessed with helping investors thrive."
    },
    {
      title: "Move Fast",
      description: "We ship quickly, learn rapidly, and iterate constantly. Perfection is the enemy of progress."
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl text-black mb-6">Join Our Team</h1>
        <p className="text-xl text-black/70 max-w-3xl mx-auto mb-8">
          Help us revolutionize short-term rental investing. We're building the future of real estate 
          technology and we'd love for you to be part of it.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-2 text-base">
            🚀 Fast-Growing Startup
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-base">
            💰 Competitive Salary + Equity
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-base">
            🌎 Remote-First
          </Badge>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl text-black mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <Card key={idx} className="border-tan-dark/20">
              <CardContent className="pt-6">
                <h3 className="text-lg text-black mb-2">{value.title}</h3>
                <p className="text-black/70 text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16 bg-tan-lighter/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl text-black mb-8 text-center">Benefits & Perks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-forest-green" />
                </div>
                <h3 className="text-lg text-black mb-2">{benefit.title}</h3>
                <p className="text-black/70 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-black/70">
            Plus: Unlimited PTO • 401(k) Matching • Home Office Stipend • Equity Options • Parental Leave
          </p>
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-16">
        <h2 className="text-3xl text-black mb-8">Open Positions</h2>
        <div className="space-y-4">
          {openPositions.map((position, idx) => (
            <Card key={idx} className="border-tan-dark/20 hover:border-forest-green/40 transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0 flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-forest-green/10 rounded-lg">
                        <Briefcase className="h-5 w-5 text-forest-green" />
                      </div>
                      <div>
                        <h3 className="text-xl text-black mb-1">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-black/60">
                          <span className="flex items-center gap-1">
                            <Badge variant="outline">{position.department}</Badge>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-black/70 ml-14">{position.description}</p>
                  </div>
                  <Button className="bg-forest-green hover:bg-forest-green/90 text-white ml-14 md:ml-4">
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Don't See Your Role */}
      <Card className="bg-gradient-to-r from-forest-green to-gold border-0">
        <CardContent className="pt-8 pb-8 text-center">
          <h2 className="text-3xl text-white mb-4">Don't See Your Perfect Role?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. Send us your resume and tell us 
            why you'd be a great fit for Keyswap.
          </p>
          <Button variant="outline" className="bg-white text-forest-green hover:bg-white/90 border-0">
            Send Us Your Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
