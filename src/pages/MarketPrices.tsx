import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar, Search, Loader2 } from 'lucide-react';

interface PriceData {
  district: string;
  districtLocal: string;
  crop: string;
  cropLocal: string;
  price: number;
  unit: string;
  change: number;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

interface MarketSearchResult {
  product: string;
  market: string;
  date: string;
  price: string;
  range: string;
  note: string;
  success: boolean;
}

interface SearchParams {
  crop: string;
  district: string;
}

const MarketPrices = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useState<SearchParams>({ crop: '', district: '' });
  const [searchResult, setSearchResult] = useState<MarketSearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Kerala districts for dropdown
  const keralaDistricts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 
    'Wayanad', 'Kannur', 'Kasaragod'
  ];

  // Market price search function
  const searchMarketPrices = async (crop: string, district: string = '') => {
    setIsSearching(true);
    
    try {
      // In a real implementation, you would call multiple APIs here
      // For now, we'll simulate API responses with realistic data
      
      const mockApiResponse = await simulateMarketPriceAPI(crop, district);
      setSearchResult(mockApiResponse);
    } catch (error) {
      console.error('Market price search failed:', error);
      setSearchResult({
        product: crop,
        market: district || 'Kerala',
        date: '',
        price: '',
        range: '',
        note: `No recent price data found for ${crop} in your area.`,
        success: false
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Simulate market price API (replace with real API calls)
  const simulateMarketPriceAPI = async (crop: string, district: string): Promise<MarketSearchResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const cropPrices: Record<string, { price: number; min: number; max: number; unit: string; trend: string }> = {
      'rice': { price: 45, min: 42, max: 48, unit: 'kg', trend: 'stable' },
      'coconut': { price: 25, min: 22, max: 28, unit: 'piece', trend: 'increasing' },
      'banana': { price: 30, min: 28, max: 35, unit: 'kg', trend: 'stable' },
      'pepper': { price: 450, min: 420, max: 480, unit: 'kg', trend: 'high demand' },
      'rubber': { price: 180, min: 175, max: 185, unit: 'kg', trend: 'declining' },
      'cardamom': { price: 1200, min: 1150, max: 1250, unit: 'kg', trend: 'premium rates' },
      'coffee': { price: 320, min: 310, max: 330, unit: 'kg', trend: 'steady' },
      'tea': { price: 280, min: 270, max: 290, unit: 'kg', trend: 'moderate' }
    };

    const normalizedCrop = crop.toLowerCase();
    const priceData = cropPrices[normalizedCrop];

    if (!priceData) {
      return {
        product: crop,
        market: district || 'Kerala',
        date: '',
        price: '',
        range: '',
        note: `No recent price data found for ${crop} in your area.`,
        success: false
      };
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');

    return {
      product: crop.charAt(0).toUpperCase() + crop.slice(1),
      market: district || 'Kerala State Average',
      date: formattedDate,
      price: `Rs. ${priceData.price} per ${priceData.unit}`,
      range: `Rs. ${priceData.min} – ${priceData.max}`,
      note: `Price trend: ${priceData.trend}`,
      success: true
    };
  };

  const handleSearch = () => {
    if (searchParams.crop.trim()) {
      const district = searchParams.district === 'all' ? '' : searchParams.district;
      searchMarketPrices(searchParams.crop.trim(), district);
    }
  };
  
  const [priceData] = useState<PriceData[]>([
    {
      district: 'Thiruvananthapuram',
      districtLocal: 'തിരുവനന്തപുരം',
      crop: 'Rice',
      cropLocal: 'നെല്ല്',
      price: 45,
      unit: 'kg',
      change: 2.5,
      lastUpdated: '2024-01-15',
      trend: 'up'
    },
    {
      district: 'Ernakulam',
      districtLocal: 'എറണാകുളം',
      crop: 'Coconut',
      cropLocal: 'തെങ്ങ്',
      price: 25,
      unit: 'piece',
      change: -1.2,
      lastUpdated: '2024-01-15',
      trend: 'down'
    },
    {
      district: 'Palakkad',
      districtLocal: 'പാലക്കാട്',
      crop: 'Banana',
      cropLocal: 'വാഴ',
      price: 30,
      unit: 'kg',
      change: 0,
      lastUpdated: '2024-01-15',
      trend: 'stable'
    },
    {
      district: 'Thrissur',
      districtLocal: 'തൃശ്ശൂർ',
      crop: 'Pepper',
      cropLocal: 'കുരുമുളക്',
      price: 450,
      unit: 'kg',
      change: 15.0,
      lastUpdated: '2024-01-15',
      trend: 'up'
    },
    {
      district: 'Kozhikode',
      districtLocal: 'കോഴിക്കോട്',
      crop: 'Rubber',
      cropLocal: 'റബ്ബർ',
      price: 180,
      unit: 'kg',
      change: -8.5,
      lastUpdated: '2024-01-15',
      trend: 'down'
    },
    {
      district: 'Kottayam',
      districtLocal: 'കോട്ടയം',
      crop: 'Cardamom',
      cropLocal: 'ഏലം',
      price: 1200,
      unit: 'kg',
      change: 25.0,
      lastUpdated: '2024-01-15',
      trend: 'up'
    },
    {
      district: 'Wayanad',
      districtLocal: 'വയനാട്',
      crop: 'Coffee',
      cropLocal: 'കാപ്പി',
      price: 320,
      unit: 'kg',
      change: 5.2,
      lastUpdated: '2024-01-15',
      trend: 'up'
    },
    {
      district: 'Idukki',
      districtLocal: 'ഇടുക്കി',
      crop: 'Tea',
      cropLocal: 'ചായ',
      price: 280,
      unit: 'kg',
      change: -2.1,
      lastUpdated: '2024-01-15',
      trend: 'down'
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success bg-success/10';
      case 'down': return 'text-destructive bg-destructive/10';
      case 'stable': return 'text-muted-foreground bg-muted/50';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ml' ? 'ml-IN' : 'en-IN');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <TrendingUp className="h-8 w-8" />
            {t('prices.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ml' 
              ? 'കേരളത്തിലെ പ്രധാന വിളകളുടെ നിലവിലെ മാർക്കറ്റ് വിലകൾ കാണുക'
              : 'Current market prices for major crops across Kerala districts'
            }
          </p>
        </div>

        {/* Market Price Search */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              {language === 'ml' ? 'വിള വില അന്വേഷണം' : 'Crop Price Search'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'ml' ? 'വിളയുടെ പേര്' : 'Crop Name'}
                </label>
                <Input
                  placeholder={language === 'ml' ? 'ഉദാ: നെല്ല്, തെങ്ങ്' : 'e.g. rice, coconut'}
                  value={searchParams.crop}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, crop: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'ml' ? 'ജില്ല (ഓപ്ഷണൽ)' : 'District (Optional)'}
                </label>
                <Select 
                  value={searchParams.district} 
                  onValueChange={(value) => setSearchParams(prev => ({ ...prev, district: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ml' ? 'ജില്ല തിരഞ്ഞെടുക്കുക' : 'Select District'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'ml' ? 'എല്ലാ ജില്ലകളും' : 'All Districts'}</SelectItem>
                    {keralaDistricts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium opacity-0">Search</label>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !searchParams.crop.trim()}
                  className="w-full"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'ml' ? 'അന്വേഷിക്കുന്നു...' : 'Searching...'}
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      {language === 'ml' ? 'വില അന്വേഷിക്കുക' : 'Search Price'}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {searchResult && (
              <Card className="mt-4 border-2 border-primary/20">
                <CardContent className="p-4">
                  {searchResult.success ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'ഉൽപ്പന്നം:' : 'Product:'}
                          </span>
                          <p className="font-semibold">{searchResult.product}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'മാർക്കറ്റ്:' : 'Market:'}
                          </span>
                          <p className="font-semibold">{searchResult.market}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'തീയതി:' : 'Date:'}
                          </span>
                          <p className="font-semibold">{searchResult.date}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'വില:' : 'Price:'}
                          </span>
                          <p className="font-semibold text-primary text-lg">{searchResult.price}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'പരിധി:' : 'Range:'}
                          </span>
                          <p className="font-semibold">{searchResult.range}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">
                            {language === 'ml' ? 'കുറിപ്പ്:' : 'Note:'}
                          </span>
                          <p className="font-semibold text-success">{searchResult.note}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">{searchResult.note}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'മൊത്തം വിളകൾ' : 'Total Crops'}
                  </p>
                  <p className="text-2xl font-bold text-primary">{priceData.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'വർദ്ധിച്ചത്' : 'Price Increased'}
                  </p>
                  <p className="text-2xl font-bold text-success">
                    {priceData.filter(item => item.trend === 'up').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ml' ? 'കുറഞ്ഞത്' : 'Price Decreased'}
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {priceData.filter(item => item.trend === 'down').length}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priceData.map((item, index) => {
            const TrendIcon = getTrendIcon(item.trend);
            return (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {language === 'ml' ? item.cropLocal : item.crop}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {language === 'ml' ? item.districtLocal : item.district}
                      </p>
                    </div>
                    <Badge variant="outline" className={getTrendColor(item.trend)}>
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {item.trend}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      ₹{item.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ml' ? 'പ്രതി' : 'per'} {item.unit}
                    </div>
                  </div>

                  {/* Price Change */}
                  <div className="flex items-center justify-center gap-2">
                    <TrendIcon className={`h-4 w-4 ${getTrendColor(item.trend).split(' ')[0]}`} />
                    <span className={`text-sm font-medium ${getTrendColor(item.trend).split(' ')[0]}`}>
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {language === 'ml' ? 'കഴിഞ്ഞ ആഴ്ച' : 'vs last week'}
                    </span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {language === 'ml' ? 'അപ്ഡേറ്റ്:' : 'Updated:'} {formatDate(item.lastUpdated)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'ml'
                ? 'വിലകൾ സൂചകമാണ് കൂടാതെ വിപണിയിലെ വ്യതിയാനങ്ങൾക്ക് വിധേയമാണ്. വ്യാപാരം നടത്തുന്നതിനു മുൻപ് പ്രാദേശിക വിപണിയിൽ പരിശോധിക്കുക.'
                : 'Prices are indicative and subject to market variations. Please verify with local markets before trading.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;