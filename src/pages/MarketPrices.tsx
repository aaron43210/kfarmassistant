import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, Minus, MapPin, Calendar } from 'lucide-react';

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

const MarketPrices = () => {
  const { language, t } = useLanguage();
  
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