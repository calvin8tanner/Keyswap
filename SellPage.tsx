import { useState } from 'react';
import { Upload, MapPin, DollarSign, Home, Camera, Plus, X, Star, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';

export function SellPage() {
  const [formData, setFormData] = useState({
    // Basic Property Info
    propertyType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Property Details
    bedrooms: '',
    bathrooms: '',
    sleeps: '',
    sqft: '',
    yearBuilt: '',
    
    // STR Details
    listingPrice: '',
    nightlyRate: '',
    monthlyRevenue: '',
    annualRevenue: '',
    occupancyRate: '',
    strRating: '',
    reviewCount: '',
    
    // STR Status
    isActiveListing: false,
    superhostStatus: false,
    instantBookEnabled: false,
    
    // Description
    title: '',
    description: '',
    
    // Features
    features: [] as string[],
    
    // Contact Info
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    currentHost: ''
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [incomeVerificationDoc, setIncomeVerificationDoc] = useState<File | null>(null);

  const propertyTypes = [
    'Single Family',
    'Multi Family',
    'Condo',
    'Townhouse'
  ];

  const strFeatures = [
    'High Occupancy Rate', 'Superhost Property', 'Instant Book Ready', 'Self Check-in',
    'Professional Photos', 'Guest Favorites', 'Hot Tub', 'Pool', 'WiFi', 'Kitchen',
    'Parking', 'Pet Friendly', 'AC/Heating', 'Washer/Dryer', 'Smart TV', 'Workspace',
    'Fire Pit', 'Outdoor Seating', 'Game Room', 'Near Attractions', 'Mountain View',
    'Ocean View', 'City View', 'Fireplace', 'Gym Access', 'Beach Access'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('STR property listing submitted:', formData);
    // Handle form submission
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload - in real app, you'd upload to a service
    const file = e.target.files?.[0];
    if (file) {
      const mockImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
      setUploadedImages(prev => [...prev, mockImageUrl]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleIncomeVerificationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type (PDF or Word documents)
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setIncomeVerificationDoc(file);
      } else {
        alert('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      }
    }
  };

  const removeIncomeVerificationDoc = () => {
    setIncomeVerificationDoc(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-foreground">List Your STR Property</h1>
        <p className="text-muted-foreground">
          Reach qualified investors looking for profitable short-term rental opportunities. 
          Showcase your turnkey STR with performance data to attract serious buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Property Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Property Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Property ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              {uploadedImages.length < 15 && (
                <label className="border-2 border-dashed border-border rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
                  <Camera className="h-6 w-6 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Upload up to 15 high-quality photos. Use professional STR photos if available.
            </p>
          </CardContent>
        </Card>

        {/* Basic Property Information */}
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block mb-2 text-foreground">Property Type</label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-foreground">STR Property Title</label>
              <Input
                placeholder="e.g., Luxury Downtown STR with Hot Tub"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-foreground">Street Address</label>
                <Input
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">City</label>
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-foreground">State</label>
                <Input
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">ZIP Code</label>
                <Input
                  placeholder="12345"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block mb-2 text-foreground">Bedrooms</label>
                <Input
                  type="number"
                  placeholder="3"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Bathrooms</label>
                <Input
                  type="number"
                  step="0.5"
                  placeholder="2.5"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Sleeps</label>
                <Input
                  type="number"
                  placeholder="6"
                  value={formData.sleeps}
                  onChange={(e) => handleInputChange('sleeps', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Year Built</label>
                <Input
                  type="number"
                  placeholder="2010"
                  value={formData.yearBuilt}
                  onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-foreground">Square Feet</label>
              <Input
                type="number"
                placeholder="1850"
                value={formData.sqft}
                onChange={(e) => handleInputChange('sqft', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* STR Performance */}
        <Card>
          <CardHeader>
            <CardTitle>STR Performance Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-foreground">Listing Price ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="485000"
                    value={formData.listingPrice}
                    onChange={(e) => handleInputChange('listingPrice', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-foreground">Average Nightly Rate ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="180"
                    value={formData.nightlyRate}
                    onChange={(e) => handleInputChange('nightlyRate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-foreground">Monthly Revenue ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="4300"
                    value={formData.monthlyRevenue}
                    onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-foreground">Annual Revenue ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="number"
                    placeholder="52000"
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-foreground">Occupancy Rate (%)</label>
                <Input
                  type="number"
                  placeholder="78"
                  value={formData.occupancyRate}
                  onChange={(e) => handleInputChange('occupancyRate', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">STR Rating</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="4.9"
                  value={formData.strRating}
                  onChange={(e) => handleInputChange('strRating', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Number of Reviews</label>
                <Input
                  type="number"
                  placeholder="156"
                  value={formData.reviewCount}
                  onChange={(e) => handleInputChange('reviewCount', e.target.value)}
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* STR Status */}
            <div className="space-y-4">
              <h4 className="text-foreground">STR Status</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="activeListing" className="text-sm text-foreground">
                    Active STR Listing
                  </label>
                  <Switch
                    id="activeListing"
                    checked={formData.isActiveListing}
                    onCheckedChange={(checked) => handleInputChange('isActiveListing', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="superhost" className="text-sm text-foreground">
                    Superhost Status
                  </label>
                  <Switch
                    id="superhost"
                    checked={formData.superhostStatus}
                    onCheckedChange={(checked) => handleInputChange('superhostStatus', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="instantBook" className="text-sm text-foreground">
                    Instant Book Enabled
                  </label>
                  <Switch
                    id="instantBook"
                    checked={formData.instantBookEnabled}
                    onCheckedChange={(checked) => handleInputChange('instantBookEnabled', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STR Features */}
        <Card>
          <CardHeader>
            <CardTitle>STR Features & Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {strFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                  />
                  <label htmlFor={feature} className="text-sm text-foreground cursor-pointer">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
            
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.features.map((feature) => (
                  <Badge key={feature} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Property Description</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Provide a detailed description of your STR property, including guest experience, unique features, location benefits, and investment potential. Include information about existing bookings, guest feedback, and any turnkey aspects..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-foreground">Full Name</label>
                <Input
                  placeholder="John Smith"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-foreground">Current STR Host Name</label>
                <Input
                  placeholder="Host name (if different)"
                  value={formData.currentHost}
                  onChange={(e) => handleInputChange('currentHost', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple" />
              <span className="text-black">Income Verification</span>
            </CardTitle>
            <p className="text-sm text-black">
              Upload documentation to verify your rental income claims. This helps build trust with potential buyers.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Upload Area */}
              {!incomeVerificationDoc ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple/30 rounded-lg cursor-pointer bg-purple-lighter/20 hover:bg-purple-lighter/40 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-purple" />
                    <p className="mb-2 text-sm text-black">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-black">PDF or Word documents only (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleIncomeVerificationUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="border border-purple/20 rounded-lg p-4 bg-purple-lighter/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-lighter rounded-lg">
                        <FileText className="h-6 w-6 text-purple" />
                      </div>
                      <div>
                        <p className="text-sm text-black">{incomeVerificationDoc.name}</p>
                        <p className="text-xs text-black">
                          {(incomeVerificationDoc.size / 1024 / 1024).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeIncomeVerificationDoc}
                      className="text-black border-purple/20 hover:bg-purple-lighter/30"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Information Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm text-blue-800 mb-1">Acceptable Documents</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• STR platform earnings statements (last 12 months)</li>
                      <li>• Tax returns showing rental income</li>
                      <li>• Bank statements with rental deposits</li>
                      <li>• Property management reports</li>
                      <li>• Booking platform revenue summaries</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Optional Note */}
              <div className="text-xs text-black bg-purple-lighter/20 p-3 rounded-lg">
                <strong>Note:</strong> Income verification is optional but highly recommended. 
                Properties with verified income data receive 3x more buyer inquiries on average.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" size="lg" className="px-12">
            List STR Property
          </Button>
        </div>
      </form>
    </div>
  );
}