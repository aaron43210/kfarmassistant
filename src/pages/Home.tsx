import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sprout, Bug, TrendingUp, FileText, ArrowRight, Cloud } from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';

const Home = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Sprout,
      title: t('home.crop.title'),
      description: t('home.crop.desc'),
      path: '/crop-advisory',
      color: 'text-leaf bg-leaf/10'
    },
    {
      icon: Bug,
      title: t('home.pest.title'),
      description: t('home.pest.desc'),
      path: '/pest-detection',
      color: 'text-warning bg-warning/10'
    },
    {
      icon: Cloud,
      title: t('home.weather.title'),
      description: t('home.weather.desc'),
      path: '/weather',
      color: 'text-sky-blue bg-sky-blue/10'
    },
    {
      icon: TrendingUp,
      title: t('home.prices.title'),
      description: t('home.prices.desc'),
      path: '/market-prices',
      color: 'text-crop bg-crop/10'
    },
    {
      icon: FileText,
      title: t('home.schemes.title'),
      description: t('home.schemes.desc'),
      path: '/schemes',
      color: 'text-earth-brown bg-earth-brown/10'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Kerala farming landscape with rice fields and coconut palms" 
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              {t('home.welcome')}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('home.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg" className="text-base">
                <Link to="/crop-advisory">
                  <Sprout className="h-5 w-5 mr-2" />
                  {t('nav.crop')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white text-white hover:bg-white hover:text-primary">
                <Link to="/pest-detection">
                  <Bug className="h-5 w-5 mr-2" />
                  {t('nav.pest')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="shadow-medium border-0 hover:shadow-strong transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${service.color}`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {service.description}
                    </p>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={service.path} className="flex items-center justify-center">
                        {service.title}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted-foreground">Active Farmers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">14</div>
              <p className="text-sm text-muted-foreground">Districts Covered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-muted-foreground">Crop Varieties</p>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">AI Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;