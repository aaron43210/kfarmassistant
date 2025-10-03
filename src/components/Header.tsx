import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages, Leaf, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { path: '/', label: t('nav.home') },
    { path: '/crop-advisory', label: t('nav.crop') },
    { path: '/pest-detection', label: t('nav.pest') },
    { path: '/weather', label: t('nav.weather') },
    { path: '/market-prices', label: t('nav.prices') },
    { path: '/schemes', label: t('nav.schemes') }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card/95 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-foreground leading-tight">
                {t('app.title')}
              </h1>
              <p className="text-xs text-muted-foreground">{t('app.subtitle')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="hidden sm:flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              <span className="text-sm">{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground">{t('app.title')}</h2>
                      <p className="text-xs text-muted-foreground">{t('app.subtitle')}</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                          isActive(item.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Language Toggle */}
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Languages className="h-4 w-4" />
                      <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;