import { Calendar, User, ArrowRight, TrendingUp, Home, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function BlogPage() {
  const featuredPost = {
    title: "The Complete Guide to STR Investing in 2025",
    excerpt: "Everything you need to know about short-term rental investing in today's market, from finding properties to maximizing returns.",
    author: "Sarah Chen",
    date: "March 15, 2025",
    readTime: "12 min read",
    category: "Investing Strategy",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
  };

  const blogPosts = [
    {
      title: "Top 10 Markets for STR Investing in 2025",
      excerpt: "Discover the hottest markets for short-term rental investments with the best ROI potential and growth opportunities.",
      author: "Michael Rodriguez",
      date: "March 12, 2025",
      readTime: "8 min read",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=300&fit=crop"
    },
    {
      title: "How to Calculate Cap Rate for STR Properties",
      excerpt: "Master the essential metrics for evaluating short-term rental investments, including cap rate, cash-on-cash return, and ROI.",
      author: "Jennifer Park",
      date: "March 10, 2025",
      readTime: "10 min read",
      category: "Financial Analysis",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop"
    },
    {
      title: "STR Regulations: What Investors Need to Know",
      excerpt: "Navigate the complex landscape of short-term rental regulations and stay compliant in your market.",
      author: "David Thompson",
      date: "March 8, 2025",
      readTime: "7 min read",
      category: "Legal & Compliance",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop"
    },
    {
      title: "Maximizing Occupancy Rates: 10 Proven Strategies",
      excerpt: "Learn how top-performing STR hosts maintain high occupancy rates year-round with these actionable tips.",
      author: "Sarah Chen",
      date: "March 5, 2025",
      readTime: "9 min read",
      category: "Property Management",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=300&fit=crop"
    },
    {
      title: "The Ultimate STR Property Checklist",
      excerpt: "Everything you need to evaluate before buying a short-term rental investment property.",
      author: "Michael Rodriguez",
      date: "March 3, 2025",
      readTime: "6 min read",
      category: "Buying Guide",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=300&fit=crop"
    },
    {
      title: "Dynamic Pricing Strategies for STRs",
      excerpt: "Optimize your nightly rates with data-driven pricing strategies that maximize revenue without sacrificing occupancy.",
      author: "Jennifer Park",
      date: "March 1, 2025",
      readTime: "11 min read",
      category: "Revenue Management",
      image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=600&h=300&fit=crop"
    }
  ];

  const categories = [
    { name: "All Posts", count: 47, icon: Home },
    { name: "Investing Strategy", count: 15, icon: TrendingUp },
    { name: "Market Analysis", count: 12, icon: TrendingUp },
    { name: "Financial Analysis", count: 8, icon: DollarSign },
    { name: "Property Management", count: 7, icon: Home },
    { name: "Legal & Compliance", count: 5, icon: Home }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl text-black mb-4">Keyswap Blog</h1>
        <p className="text-xl text-black/70 max-w-2xl mx-auto">
          Insights, strategies, and data-driven analysis for short-term rental investors
        </p>
      </div>

      {/* Featured Post */}
      <Card className="mb-12 overflow-hidden border-forest-green/20 hover:border-forest-green/40 transition-all cursor-pointer">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-auto">
            <ImageWithFallback
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 left-4 bg-forest-green text-white">
              Featured
            </Badge>
          </div>
          <CardContent className="pt-8 pb-8 flex flex-col justify-center">
            <Badge variant="outline" className="w-fit mb-3">
              {featuredPost.category}
            </Badge>
            <h2 className="text-3xl text-black mb-4">{featuredPost.title}</h2>
            <p className="text-black/70 mb-6">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-black/60 mb-6">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {featuredPost.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {featuredPost.date}
              </span>
              <span>{featuredPost.readTime}</span>
            </div>
            <Button className="bg-forest-green hover:bg-forest-green/90 text-white w-fit">
              Read Article
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="pt-6">
              <h3 className="text-lg text-black mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-tan-lighter/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-forest-green" />
                        <span className="text-black">{category.name}</span>
                      </div>
                      <span className="text-sm text-black/60">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="overflow-hidden border-tan-dark/20 hover:border-forest-green/40 transition-all cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl text-black mb-3 group-hover:text-forest-green transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-black/70 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-black/60 mb-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <Button variant="ghost" className="p-0 h-auto text-forest-green hover:text-forest-green/80 hover:bg-transparent">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green/10">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="mt-16 bg-gradient-to-r from-forest-green to-gold border-0">
        <CardContent className="pt-8 pb-8 text-center">
          <h2 className="text-3xl text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Get the latest STR investing insights, market analysis, and property tips delivered to your inbox weekly.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button className="bg-white text-forest-green hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
