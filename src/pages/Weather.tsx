import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Thermometer,
  CloudDrizzle,
  Zap
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    rainfall_chance: number;
    condition: string;
  };
  alerts: string[];
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    rain: number;
    condition: string;
  }>;
}

const Weather = () => {
  const { language, t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState('Thiruvananthapuram');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Alappuzha', 'Pathanamthitta', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram',
    'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod', 'Kochi'
  ];

  useEffect(() => {
    fetchWeather();
  }, [selectedLocation]);

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-weather', {
        body: { location: selectedLocation }
      });

      if (error) throw error;
      if (data?.success) {
        setWeatherData(data.data);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertInfo = (alertType: string) => {
    const alerts: any = {
      heavy_rain: {
        icon: CloudRain,
        color: 'text-blue-600',
        bg: 'bg-blue-50 border-blue-200',
        title: language === 'en' ? 'Heavy Rain Alert' : 'കനത്ത മഴ മുന്നറിയിപ്പ്',
        description: language === 'en' 
          ? 'Heavy rainfall expected. Store harvested crops safely and minimize field work.'
          : 'കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. വിളവെടുത്ത വിളകൾ സുരക്ഷിതമായി സൂക്ഷിക്കുക, വയലിലെ ജോലികൾ കുറയ്ക്കുക.'
      },
      flood_risk: {
        icon: AlertTriangle,
        color: 'text-red-600',
        bg: 'bg-red-50 border-red-200',
        title: language === 'en' ? 'Flood Risk Warning' : 'വെള്ളപ്പൊക്ക അപകടം',
        description: language === 'en'
          ? 'Flood risk in low-lying areas. Move livestock to higher ground and secure equipment.'
          : 'താഴ്ന്ന പ്രദേശങ്ങളിൽ വെള്ളപ്പൊക്ക സാധ്യത. കന്നുകാലികളെ ഉയർന്ന സ്ഥലത്തേക്ക് മാറ്റുക.'
      },
      heatwave: {
        icon: Sun,
        color: 'text-orange-600',
        bg: 'bg-orange-50 border-orange-200',
        title: language === 'en' ? 'Heatwave Alert' : 'ചൂട് മുന്നറിയിപ്പ്',
        description: language === 'en'
          ? 'Extreme heat expected. Ensure proper irrigation and wear protective clothing.'
          : 'അതിശക്തമായ ചൂട് പ്രതീക്ഷിക്കുന്നു. ശരിയായ നനയ്ക്കൽ ഉറപ്പാക്കുക, സംരക്ഷണ വസ്ത്രങ്ങൾ ധരിക്കുക.'
      },
      high_heat: {
        icon: Thermometer,
        color: 'text-orange-500',
        bg: 'bg-orange-50 border-orange-200',
        title: language === 'en' ? 'High Temperature' : 'ഉയർന്ന താപനില',
        description: language === 'en'
          ? 'High temperatures expected. Increase irrigation frequency and work during cooler hours.'
          : 'ഉയർന്ന താപനില പ്രതീക്ഷിക്കുന്നു. നനയ്ക്കൽ വർദ്ധിപ്പിക്കുക, തണുത്ത സമയത്ത് ജോലി ചെയ്യുക.'
      },
      drought_warning: {
        icon: Sun,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50 border-yellow-200',
        title: language === 'en' ? 'Drought Warning' : 'വരൾച്ച മുന്നറിയിപ്പ്',
        description: language === 'en'
          ? 'Water scarcity expected. Practice water conservation and mulching.'
          : 'ജല ദൗർലഭ്യം പ്രതീക്ഷിക്കുന്നു. ജല സംരക്ഷണം പാലിക്കുക, മൾച്ചിംഗ് നടത്തുക.'
      },
      humidity_high: {
        icon: Droplets,
        color: 'text-teal-600',
        bg: 'bg-teal-50 border-teal-200',
        title: language === 'en' ? 'High Humidity Alert' : 'ഉയർന്ന ആർദ്രത',
        description: language === 'en'
          ? 'High humidity increases pest risk. Consider preventive spraying.'
          : 'ഉയർന്ന ആർദ്രത കീടങ്ങളുടെ സാധ്യത വർദ്ധിപ്പിക്കുന്നു. പ്രതിരോധ സ്പ്രേയിംഗ് പരിഗണിക്കുക.'
      }
    };
    return alerts[alertType] || null;
  };

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('rain') || lower.includes('shower')) return CloudRain;
    if (lower.includes('thunder') || lower.includes('storm')) return Zap;
    if (lower.includes('cloud')) return Cloud;
    if (lower.includes('drizzle')) return CloudDrizzle;
    return Sun;
  };

  const getPrecautions = () => {
    if (!weatherData) return [];

    const precautions: string[] = [];
    const { current, alerts } = weatherData;

    if (alerts.includes('heavy_rain') || current.rainfall_chance > 70) {
      precautions.push(
        language === 'en'
          ? '☔ Store harvested crops in dry, covered areas'
          : '☔ വിളവെടുത്ത വിളകൾ ഉണങ്ങിയതും മൂടിയതുമായ സ്ഥലങ്ങളിൽ സൂക്ഷിക്കുക'
      );
      precautions.push(
        language === 'en'
          ? '🚜 Reduce field operations to prevent soil compaction'
          : '🚜 മണ്ണ് കംപാക്ഷൻ തടയാൻ വയലിലെ പ്രവർത്തനങ്ങൾ കുറയ്ക്കുക'
      );
      precautions.push(
        language === 'en'
          ? '🏠 Check drainage systems and clear water channels'
          : '🏠 ഡ്രെയിനേജ് സിസ്റ്റങ്ങൾ പരിശോധിക്കുക, വെള്ളം കടന്നുപോകുന്ന വഴികൾ വൃത്തിയാക്കുക'
      );
    }

    if (alerts.includes('heatwave') || alerts.includes('high_heat') || current.temp > 34) {
      precautions.push(
        language === 'en'
          ? '💧 Increase irrigation frequency, especially during early morning'
          : '💧 നനയ്ക്കൽ വർദ്ധിപ്പിക്കുക, പ്രത്യേകിച്ച് അതിരാവിലെ'
      );
      precautions.push(
        language === 'en'
          ? '🌾 Apply mulch to retain soil moisture'
          : '🌾 മണ്ണിലെ ഈർപ്പം നിലനിർത്താൻ മൾച്ച് പ്രയോഗിക്കുക'
      );
      precautions.push(
        language === 'en'
          ? '👕 Wear light, protective clothing and stay hydrated'
          : '👕 നേരിയ സംരക്ഷണ വസ്ത്രങ്ങൾ ധരിക്കുക, വെള്ളം കുടിക്കുക'
      );
    }

    if (alerts.includes('humidity_high') || current.humidity > 80) {
      precautions.push(
        language === 'en'
          ? '🦗 Monitor for pest activity and consider preventive spraying'
          : '🦗 കീടങ്ങളുടെ പ്രവർത്തനം നിരീക്ഷിക്കുക, പ്രതിരോധ സ്പ്രേയിംഗ് പരിഗണിക്കുക'
      );
      precautions.push(
        language === 'en'
          ? '🍃 Ensure proper air circulation in crops'
          : '🍃 വിളകളിൽ ശരിയായ വായു സഞ്ചാരം ഉറപ്പാക്കുക'
      );
    }

    if (alerts.includes('flood_risk')) {
      precautions.push(
        language === 'en'
          ? '🐄 Move livestock and equipment to higher ground'
          : '🐄 കന്നുകാലികളെയും ഉപകരണങ്ങളെയും ഉയർന്ന സ്ഥലത്തേക്ക് മാറ്റുക'
      );
      precautions.push(
        language === 'en'
          ? '📦 Secure fertilizers and chemicals above flood level'
          : '📦 വളങ്ങളും രാസവസ്തുക്കളും വെള്ളപ്പൊക്ക നിരപ്പിന് മുകളിൽ സുരക്ഷിതമാക്കുക'
      );
    }

    if (precautions.length === 0) {
      precautions.push(
        language === 'en'
          ? '✅ Weather conditions are favorable for normal farm operations'
          : '✅ കാലാവസ്ഥാ സാഹചര്യങ്ങൾ സാധാരണ കൃഷി പ്രവർത്തനങ്ങൾക്ക് അനുകൂലമാണ്'
      );
    }

    return precautions;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {t('weather.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('weather.subtitle')}
          </p>
        </div>

        {/* Location Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {t('weather.selectLocation')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={fetchWeather} disabled={isLoading}>
                {isLoading ? t('weather.loading') : t('weather.refresh')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : weatherData ? (
          <>
            {/* Current Weather */}
            <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">{t('weather.current')}</CardTitle>
                <CardDescription>{selectedLocation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <Thermometer className="h-12 w-12 text-primary" />
                    <div>
                      <p className="text-4xl font-bold">{weatherData.current.temp}°C</p>
                      <p className="text-sm text-muted-foreground">{t('weather.temperature')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Droplets className="h-12 w-12 text-blue-500" />
                    <div>
                      <p className="text-4xl font-bold">{weatherData.current.humidity}%</p>
                      <p className="text-sm text-muted-foreground">{t('weather.humidity')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CloudRain className="h-12 w-12 text-indigo-500" />
                    <div>
                      <p className="text-4xl font-bold">{weatherData.current.rainfall_chance}%</p>
                      <p className="text-sm text-muted-foreground">{t('weather.rainChance')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-card rounded-lg">
                  <p className="text-lg font-medium">{weatherData.current.condition}</p>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            {weatherData.alerts.length > 0 && (
              <div className="mb-6 space-y-3">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t('weather.alerts')}
                </h2>
                {weatherData.alerts.map((alert, index) => {
                  const alertInfo = getAlertInfo(alert);
                  if (!alertInfo) return null;
                  const Icon = alertInfo.icon;
                  return (
                    <Alert key={index} className={`${alertInfo.bg} border-2`}>
                      <Icon className={`h-5 w-5 ${alertInfo.color}`} />
                      <AlertTitle className={alertInfo.color}>{alertInfo.title}</AlertTitle>
                      <AlertDescription>{alertInfo.description}</AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            )}

            {/* Precautions */}
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  {t('weather.precautions')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {getPrecautions().map((precaution, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <span className="text-lg leading-tight">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 3-Day Forecast */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t('weather.forecast')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => {
                  const WeatherIcon = getWeatherIcon(day.condition);
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {new Date(day.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ml-IN', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <WeatherIcon className="h-12 w-12 text-primary" />
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-red-500" />
                              <span className="text-2xl font-bold">{day.high}°</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4 text-blue-500" />
                              <span className="text-lg text-muted-foreground">{day.low}°</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-2">{day.condition}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CloudRain className="h-4 w-4" />
                          <span>{day.rain}% {t('weather.rain')}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">{t('weather.selectLocationPrompt')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Weather;
