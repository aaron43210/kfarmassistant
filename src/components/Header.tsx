import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages, Leaf } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navigation = [
    { path: '/', label: t('nav.home') },
    { path: '/crop-advisory', label: t('nav.crop') },
    { path: '/pest-detection', label: t('nav.pest') },
    { path: '/market-prices', label: t('nav.prices') },
    { path: '/schemes', label: t('nav.schemes') },
    { path: '/weather', label: t('nav.weather') }
  ];

  return (
    <header className="bg-card shadow-soft border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-primary">{t('app.title')}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{t('app.subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="flex items-center space-x-1"
            >
              <Languages className="h-4 w-4" />
              <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-3 flex flex-wrap gap-2">
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;