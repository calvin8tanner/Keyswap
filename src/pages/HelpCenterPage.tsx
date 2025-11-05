import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner of any page. Fill out the registration form with your name, email, and password. You'll receive a confirmation email to verify your account."
        },
        {
          question: "Is Keyswap free to use?",
          answer: "Browsing properties and using our valuation tools is completely free. We charge a small commission only when a transaction is completed through our platform. Sellers can choose from various listing packages to feature their properties."
        },
        {
          question: "What types of properties can I find on Keyswap?",
          answer: "Keyswap specializes in turnkey short-term rental properties including single-family homes, condos, townhouses, and multi-family units. All properties are fully furnished and currently operating as STRs with verified income history."
        }
      ]
    },
    {
      title: "Buying Properties",
      faqs: [
        {
          question: "How is income data verified?",
          answer: "We verify all property income through direct integration with STR platforms or by reviewing official income statements from property management companies. Our team manually reviews each submission to ensure accuracy and authenticity."
        },
        {
          question: "Can I schedule a property tour?",
          answer: "Yes! Use the 'Schedule Tour' button on any property listing to request a viewing. The seller or their agent will contact you within 24 hours to arrange a convenient time."
        },
        {
          question: "What financing options are available?",
          answer: "We partner with several lenders who specialize in STR property financing. These loans typically require 20-25% down payment and offer competitive rates for investment properties. Contact our lending partners through the property detail page."
        },
        {
          question: "What due diligence should I perform?",
          answer: "We recommend: (1) Reviewing 12-24 months of income history, (2) Analyzing local STR regulations, (3) Getting a professional property inspection, (4) Verifying HOA rules allow STRs, (5) Reviewing existing booking calendar and reviews."
        }
      ]
    },
    {
      title: "Selling Properties",
      faqs: [
        {
          question: "How do I list my STR property?",
          answer: "Navigate to the 'Sell' page and complete the listing form. Include high-quality photos, detailed property information, and upload your income verification documents. Basic listings are free; premium placements are available for increased visibility."
        },
        {
          question: "What documents do I need to provide?",
          answer: "Required: Property photos, basic property details, and price. Strongly recommended: STR platform earnings statements (last 12 months), tax returns showing rental income, booking platform performance data, and current guest reviews."
        },
        {
          question: "How long does it take to sell?",
          answer: "Properties with verified income typically sell 3x faster than unverified listings. On average, verified STR properties sell within 45-60 days. Premium listings with strong performance data often receive offers within 2-3 weeks."
        },
        {
          question: "What are listing boosts?",
          answer: "Listing boosts place your property at the top of search results for 7 days, increasing visibility by an average of 250%. Boosted listings receive significantly more views and inquiries."
        }
      ]
    },
    {
      title: "Valuation Tool",
      faqs: [
        {
          question: "How accurate is the valuation tool?",
          answer: "Our AI-powered valuation tool analyzes over 50 data points including property characteristics, location, historical STR performance in the area, and current market conditions. Valuations are typically within 8-10% of actual sale prices."
        },
        {
          question: "What is the KVI Score?",
          answer: "The Keyswap Valuation Index (KVI) Score is a proprietary metric that rates properties from 1-100 based on their investment potential. It considers revenue performance, occupancy rates, location desirability, property condition, and amenities."
        },
        {
          question: "Can I get a valuation for any property?",
          answer: "Yes! Our tool can value any residential property that could potentially operate as an STR. Even if your property isn't currently a short-term rental, we'll provide an estimated value based on comparable STR properties in your area."
        }
      ]
    },
    {
      title: "Account & Payments",
      faqs: [
        {
          question: "How do I update my account information?",
          answer: "Log in to your account and click on your profile icon. Select 'Account Settings' to update your personal information, contact details, and preferences."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), ACH bank transfers, and wire transfers for premium services and listing upgrades."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use bank-level encryption and never store your complete payment information. All transactions are processed through secure, PCI-compliant payment processors."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Available Mon-Fri, 9am-6pm EST",
      color: "text-forest-green"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@keyswap.com",
      action: "Response within 24 hours",
      color: "text-gold"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "(555) 123-4567",
      action: "Mon-Fri, 9am-6pm EST",
      color: "text-forest-green"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl text-black mb-4">Help Center</h1>
        <p className="text-xl text-black/70 mb-8">
          Find answers to common questions about Keyswap
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/40 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 text-lg"
          />
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="mb-16">
        <h2 className="text-3xl text-black mb-8">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-2xl text-black mb-4">{category.title}</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {category.faqs.map((faq, faqIdx) => (
                  <AccordionItem 
                    key={faqIdx} 
                    value={`${idx}-${faqIdx}`}
                    className="border border-tan-dark/20 rounded-lg px-4 bg-white"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="text-black pr-4">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-black/70 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-tan-lighter/30 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl text-black mb-8 text-center">Still Need Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {contactOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <Card key={idx} className="border-tan-dark/20 hover:border-forest-green/40 transition-all">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Icon className={`h-12 w-12 ${option.color} mx-auto mb-4`} />
                    <h3 className="text-xl text-black mb-2">{option.title}</h3>
                    <p className="text-black/70 mb-2">{option.description}</p>
                    <p className="text-sm text-black/60">{option.action}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
