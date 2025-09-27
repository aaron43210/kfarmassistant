import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, ExternalLink, Calendar, IndianRupee } from 'lucide-react';

interface Scheme {
  title: string;
  titleLocal: string;
  description: string;
  descriptionLocal: string;
  eligibility: string;
  eligibilityLocal: string;
  amount: string;
  deadline: string;
  category: string;
  categoryLocal: string;
  applyUrl: string;
}

const Schemes = () => {
  const { language, t } = useLanguage();
  
  const schemes: Scheme[] = [
    {
      title: 'PM-Kisan Samman Nidhi',
      titleLocal: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി',
      description: 'Financial support of ₹6000 per year to small and marginal farmers',
      descriptionLocal: 'ചെറുകിട കർഷകർക്ക് വർഷം ₹6000 സാമ്പത്തിക സഹായം',
      eligibility: 'Farmers with cultivable land up to 2 hectares',
      eligibilityLocal: '2 ഹെക്ടർ വരെ കൃഷിയോഗ്യമായ ഭൂമിയുള്ള കർഷകർ',
      amount: '₹6,000/year',
      deadline: 'Ongoing',
      category: 'Direct Benefit Transfer',
      categoryLocal: 'നേരിട്ടുള്ള ആനുകൂല്യ കൈമാറ്റം',
      applyUrl: 'https://pmkisan.gov.in'
    },
    {
      title: 'Soil Health Card Scheme',
      titleLocal: 'മണ്ണിന്റെ ആരോഗ്യ കാർഡ് പദ്ധതി',
      description: 'Free soil testing and recommendations for balanced use of fertilizers',
      descriptionLocal: 'സൗജന്യ മണ്ണ് പരിശോധനയും സമതുലിത വളപ്രയോഗത്തിനുള്ള ശുപാർശകളും',
      eligibility: 'All farmers with agricultural land',
      eligibilityLocal: 'കാർഷിക ഭൂമിയുള്ള എല്ലാ കർഷകരും',
      amount: 'Free',
      deadline: 'March 2024',
      category: 'Technical Support',
      categoryLocal: 'സാങ്കേതിക പിന്തുണ',
      applyUrl: 'https://soilhealth.dac.gov.in'
    },
    {
      title: 'Pradhan Mantri Fasal Bima Yojana',
      titleLocal: 'പ്രധാനമന്ത്രി ഫസൽ ബിമാ യോജന',
      description: 'Crop insurance scheme providing financial support for crop loss',
      descriptionLocal: 'വിള നഷ്ടത്തിന് സാമ്പത്തിക പിന്തുണ നൽകുന്ന വിള ഇൻഷുറൻസ് പദ്ധതി',
      eligibility: 'All farmers (landowner and tenant farmers)',
      eligibilityLocal: 'എല്ലാ കർഷകരും (ഭൂവുടമകളും കുടികിടപ്പുകാരും)',
      amount: 'Up to ₹2 lakhs',
      deadline: 'Seasonal',
      category: 'Insurance',
      categoryLocal: 'ഇൻഷുറൻസ്',
      applyUrl: 'https://pmfby.gov.in'
    },
    {
      title: 'Kerala State Horticulture Mission',
      titleLocal: 'കേരള സ്റ്റേറ്റ് ഹോർട്ടികൾച്ചർ മിഷൻ',
      description: 'Support for vegetable cultivation, processing and marketing',
      descriptionLocal: 'പച്ചക്കറി കൃഷി, സംസ്കരണം, വിപണനത്തിനുള്ള പിന്തുണ',
      eligibility: 'Farmers and Farmer Producer Organizations in Kerala',
      eligibilityLocal: 'കേരളത്തിലെ കർഷകരും കർഷക ഉത്പാദക സംഘടനകളും',
      amount: '50-75% subsidy',
      deadline: 'March 2024',
      category: 'State Scheme',
      categoryLocal: 'സംസ്ഥാന പദ്ധതി',
      applyUrl: 'https://hortnet.gov.in'
    },
    {
      title: 'Kerala Rubber Subsidy Scheme',
      titleLocal: 'കേരള റബ്ബർ സബ്‌സിഡി പദ്ധതി',
      description: 'Financial assistance for rubber plantation and processing',
      descriptionLocal: 'റബ്ബർ കൃഷിക്കും സംസ്കരണത്തിനുമുള്ള സാമ്പത്തിക സഹായം',
      eligibility: 'Small and marginal rubber farmers in Kerala',
      eligibilityLocal: 'കേരളത്തിലെ ചെറുകിട റബ്ബർ കർഷകർ',
      amount: '₹25,000-50,000',
      deadline: 'December 2024',
      category: 'State Scheme',
      categoryLocal: 'സംസ്ഥാന പദ്ധതി',
      applyUrl: 'https://rubberboard.gov.in'
    },
    {
      title: 'Coconut Development Board Schemes',
      titleLocal: 'തെങ്ങ് വികസന ബോർഡ് പദ്ധതികൾ',
      description: 'Support for coconut cultivation, processing and value addition',
      descriptionLocal: 'തെങ്ങ് കൃഷി, സംസ്കരണം, മൂല്യ വർദ്ധനവിനുള്ള പിന്തുണ',
      eligibility: 'Coconut farmers and entrepreneurs',
      eligibilityLocal: 'തെങ്ങ് കർഷകരും സംരംഭകരും',
      amount: '25-50% subsidy',
      deadline: 'Ongoing',
      category: 'Crop Specific',
      categoryLocal: 'വിള നിർദ്ദിഷ്ടം',
      applyUrl: 'https://coconutboard.gov.in'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Direct Benefit Transfer': 'bg-primary/10 text-primary',
      'Technical Support': 'bg-accent/10 text-accent-foreground',
      'Insurance': 'bg-warning/10 text-warning-foreground',
      'State Scheme': 'bg-success/10 text-success',
      'Crop Specific': 'bg-earth-brown/10 text-earth-brown'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <FileText className="h-8 w-8" />
            {t('schemes.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ml'
              ? 'കേരളത്തിലെ കർഷകർക്കായുള്ള സർക്കാർ പദ്ധതികളും സബ്‌സിഡികളും'
              : 'Government schemes and subsidies available for farmers in Kerala'
            }
          </p>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme, index) => (
            <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg leading-tight">
                    {language === 'ml' ? scheme.titleLocal : scheme.title}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(scheme.category)}
                  >
                    {language === 'ml' ? scheme.categoryLocal : scheme.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ml' ? scheme.descriptionLocal : scheme.description}
                </p>

                {/* Eligibility */}
                <div className="bg-muted/30 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold text-primary mb-1">
                    {language === 'ml' ? 'യോഗ്യത:' : 'Eligibility:'}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ml' ? scheme.eligibilityLocal : scheme.eligibility}
                  </p>
                </div>

                {/* Amount and Deadline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ml' ? 'തുക' : 'Amount'}
                      </p>
                      <p className="text-sm font-semibold text-success">{scheme.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-warning" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {language === 'ml' ? 'അവസാന തീയതി' : 'Deadline'}
                      </p>
                      <p className="text-sm font-semibold text-warning-foreground">{scheme.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button asChild size="sm" className="flex-1">
                    <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t('schemes.apply')}
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {t('schemes.details')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="mt-8 bg-primary/5">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-primary mb-3">
              {language === 'ml' ? 'സഹായം ആവശ്യമുണ്ടോ?' : 'Need Help?'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'ml'
                ? 'സർക്കാർ പദ്ധതികളെക്കുറിച്ച് കൂടുതൽ വിവരങ്ങൾക്ക് പ്രാദേശിക കൃഷി ഓഫീസുമായി ബന്ധപ്പെടുക'
                : 'Contact your local agriculture office for more information about government schemes'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm">
                📞 {language === 'ml' ? 'ഹെൽപ്‌ലൈൻ' : 'Helpline'}: 1800-180-1551
              </Button>
              <Button variant="outline" size="sm">
                🌐 agriculture.kerala.gov.in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schemes;