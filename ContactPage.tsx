import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
    alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@keyswap.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST"
    },
    {
      icon: MapPin,
      title: "Office",
      content: "123 Market Street, Suite 500",
      description: "San Francisco, CA 94103"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Friday",
      description: "9:00 AM - 6:00 PM EST"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl text-black mb-4">Contact Us</h1>
        <p className="text-xl text-black/70 max-w-2xl mx-auto">
          Have a question? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-black">Full Name *</label>
                  <Input
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-black">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-black">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-black">Subject *</label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="buying">Buying a Property</SelectItem>
                      <SelectItem value="selling">Selling a Property</SelectItem>
                      <SelectItem value="valuation">Valuation Questions</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block mb-2 text-black">Message *</label>
                  <Textarea
                    required
                    placeholder="Tell us how we can help..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full bg-forest-green hover:bg-forest-green/90 text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl text-black mb-6">Get In Touch</h2>
          <p className="text-black/70 mb-8">
            Whether you're looking to buy your first STR investment property, sell an existing rental, 
            or simply have questions about our platform, we're here to help. Our team of experts is 
            available to assist you every step of the way.
          </p>

          <div className="space-y-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon;
              return (
                <Card key={idx} className="border-tan-dark/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-forest-green/10 rounded-lg">
                        <Icon className="h-6 w-6 text-forest-green" />
                      </div>
                      <div>
                        <h3 className="text-lg text-black mb-1">{info.title}</h3>
                        <p className="text-black/90 mb-1">{info.content}</p>
                        <p className="text-sm text-black/60">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 bg-tan-lighter/30 border-tan-dark/20">
            <CardContent className="pt-6">
              <h3 className="text-lg text-black mb-2">Need Immediate Assistance?</h3>
              <p className="text-black/70 mb-4">
                For urgent matters, please call us directly during business hours. Our support team 
                is available to help with any immediate concerns.
              </p>
              <Button variant="outline" className="border-forest-green text-forest-green hover:bg-forest-green/10">
                Call Now: (555) 123-4567
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Help Section */}
      <div className="bg-gradient-to-r from-forest-green to-gold p-8 rounded-2xl text-center">
        <h2 className="text-3xl text-white mb-4">Looking for Quick Answers?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Check out our Help Center for answers to frequently asked questions, guides, and tutorials.
        </p>
        <Button variant="outline" className="bg-white text-forest-green hover:bg-white/90 border-0">
          Visit Help Center
        </Button>
      </div>
    </div>
  );
}
