import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, MapPin, Layers, Calendar } from 'lucide-react';

interface CropRecommendation {
  name: string;
  nameLocal: string;
  suitability: number;
  season: string;
  yield: string;
  tips: string;
}

const CropAdvisory = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    district: '',
    soilType: '',
    season: ''
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram',
    'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const soilTypes = language === 'ml' 
    ? ['കളിമണ്ണ് (Clay)', 'മണൽ (Sandy)', 'പശിമ (Loam)', 'കറുത്ത മണ്ണ് (Black soil)', 'ചുവന്ന മണ്ണ് (Red soil)']
    : ['Clay', 'Sandy', 'Loam', 'Black soil', 'Red soil'];

  const seasons = language === 'ml'
    ? ['വൈശാഖം (Summer)', 'കാർഷിക (Monsoon)', 'ശീതകാലം (Winter)', 'വർഷം മുഴുവൻ (Year-round)']
    : ['Summer', 'Monsoon', 'Winter', 'Year-round'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const sampleRecommendations: CropRecommendation[] = [
        {
          name: 'Rice',
          nameLocal: 'നെല്ല്',
          suitability: 95,
          season: 'Monsoon',
          yield: '4-6 tons/hectare',
          tips: 'Best suited for clay soil. Ensure proper drainage during heavy rains.'
        },
        {
          name: 'Coconut',
          nameLocal: 'തെങ്ങ്',
          suitability: 88,
          season: 'Year-round',
          yield: '50-80 coconuts/tree/year',
          tips: 'Requires well-drained soil. Regular watering during dry periods is essential.'
        },
        {
          name: 'Banana',
          nameLocal: 'വാഴ',
          suitability: 82,
          season: 'Year-round',
          yield: '25-30 kg/plant',
          tips: 'Thrives in warm, humid climate. Protect from strong winds.'
        }
      ];
      setRecommendations(sampleRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <Sprout className="h-8 w-8" />
            {t('crop.title')}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Farm Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* District Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('crop.location')}
                  </label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Soil Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    {t('crop.soil')}
                  </label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, soilType: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map(soil => (
                        <SelectItem key={soil} value={soil}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Season */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t('crop.season')}
                  </label>
                  <Select
                    value={formData.season}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, season: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map(season => (
                        <SelectItem key={season} value={season}>
                          {season}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={!formData.district || !formData.soilType || !formData.season || isLoading}
                >
                  {isLoading ? 'Analyzing...' : t('crop.submit')}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {recommendations.length > 0 && (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{t('crop.results')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((crop, index) => (
                    <div key={index} className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {language === 'ml' ? crop.nameLocal : crop.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ml' ? crop.name : crop.nameLocal}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-primary">
                            {crop.suitability}% Match
                          </div>
                          <div className="w-16 h-2 bg-border rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${crop.suitability}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Season:</strong> {crop.season}</p>
                        <p><strong>Expected Yield:</strong> {crop.yield}</p>
                        <p className="text-muted-foreground">{crop.tips}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {recommendations.length === 0 && !isLoading && (
              <Card className="shadow-medium">
                <CardContent className="text-center py-12">
                  <Sprout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fill in your farm details to get personalized crop recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisory;