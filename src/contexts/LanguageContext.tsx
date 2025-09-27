import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'app.title': 'Kerala Farm Assistant',
    'app.subtitle': 'AI-Powered Farming Support for Kerala',
    'nav.home': 'Home',
    'nav.crop': 'Crop Advisory',
    'nav.pest': 'Pest Detection',
    'nav.prices': 'Market Prices',
    'nav.schemes': 'Government Schemes',
    
    // Home Page
    'home.welcome': 'Welcome to Kerala Farm Assistant',
    'home.description': 'Your AI-powered companion for modern farming in Kerala. Get crop advice, detect pests, check market prices, and access government schemes.',
    'home.crop.title': 'Crop Advisory',
    'home.crop.desc': 'Get personalized crop recommendations based on your location, soil type, and season.',
    'home.pest.title': 'Pest Detection',
    'home.pest.desc': 'Upload photos of affected plants and get instant diagnosis with treatment recommendations.',
    'home.prices.title': 'Market Prices',
    'home.prices.desc': 'Check current market prices for crops across different districts in Kerala.',
    'home.schemes.title': 'Government Schemes',
    'home.schemes.desc': 'Access information about latest government farming schemes and subsidies.',
    
    // Crop Advisory
    'crop.title': 'Crop Advisory',
    'crop.location': 'Select District',
    'crop.soil': 'Soil Type',
    'crop.season': 'Season',
    'crop.submit': 'Get Recommendations',
    'crop.results': 'Recommended Crops',
    
    // Pest Detection
    'pest.title': 'Pest Detection',
    'pest.upload': 'Upload Plant Image',
    'pest.dragdrop': 'Drag and drop an image here, or click to select',
    'pest.analyze': 'Analyze Image',
    'pest.results': 'Analysis Results',
    
    // Market Prices
    'prices.title': 'Market Prices',
    'prices.district': 'District',
    'prices.crop': 'Crop',
    'prices.price': 'Price (₹/kg)',
    'prices.updated': 'Last Updated',
    
    // Schemes
    'schemes.title': 'Government Schemes',
    'schemes.apply': 'Apply Now',
    'schemes.details': 'View Details'
  },
  ml: {
    // Header
    'app.title': 'കേരള ഫാം അസിസ്റ്റന്റ്',
    'app.subtitle': 'കേരളത്തിന് AI പവർ ചെയ്ത കാർഷിക സഹായം',
    'nav.home': 'ഹോം',
    'nav.crop': 'വിള ഉപദേശം',
    'nav.pest': 'കീട നിർണയം',
    'nav.prices': 'മാർക്കറ്റ് വില',
    'nav.schemes': 'സർക്കാർ പദ്ധതികൾ',
    
    // Home Page
    'home.welcome': 'കേരള ഫാം അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം',
    'home.description': 'കേരളത്തിലെ ആധുനിക കൃഷിക്കായി നിങ്ങളുടെ AI പവർ ചെയ്ത സഹായി. വിള ഉപദേശം, കീട നിർണയം, മാർക്കറ്റ് വില, സർക്കാർ പദ്ധതികൾ എന്നിവ നേടുക.',
    'home.crop.title': 'വിള ഉപദേശം',
    'home.crop.desc': 'നിങ്ങളുടെ സ്ഥലം, മണ്ണിന്റെ തരം, സീസൺ എന്നിവ അടിസ്ഥാനമാക്കി വ്യക്തിഗത വിള ശുപാർശകൾ നേടുക.',
    'home.pest.title': 'കീട നിർണയം',
    'home.pest.desc': 'രോഗബാധിതമായ ചെടികളുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് ചികിത്സാ ശുപാർശകളോടെ തൽക്ഷണ നിർണയം നേടുക.',
    'home.prices.title': 'മാർക്കറ്റ് വില',
    'home.prices.desc': 'കേരളത്തിലെ വിവിധ ജില്ലകളിലെ വിളകളുടെ നിലവിലെ മാർക്കറ്റ് വില പരിശോധിക്കുക.',
    'home.schemes.title': 'സർക്കാർ പദ്ധതികൾ',
    'home.schemes.desc': 'ഏറ്റവും പുതിയ സർക്കാർ കാർഷിക പദ്ധതികളെയും സബ്‌സിഡികളെയും കുറിച്ചുള്ള വിവരങ്ങൾ ആക്‌സസ് ചെയ്യുക.',
    
    // Crop Advisory
    'crop.title': 'വിള ഉപദേശം',
    'crop.location': 'ജില്ല തിരഞ്ഞെടുക്കുക',
    'crop.soil': 'മണ്ണിന്റെ തരം',
    'crop.season': 'സീസൺ',
    'crop.submit': 'ശുപാർശകൾ നേടുക',
    'crop.results': 'ശുപാർശ ചെയ്യുന്ന വിളകൾ',
    
    // Pest Detection
    'pest.title': 'കീട നിർണയം',
    'pest.upload': 'ചെടിയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
    'pest.dragdrop': 'ഇവിടെ ഒരു ചിത്രം ഡ്രാഗ് ആൻഡ് ഡ്രോപ് ചെയ്യുക, അല്ലെങ്കിൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    'pest.analyze': 'ചിത്രം വിശകലനം ചെയ്യുക',
    'pest.results': 'വിശകലന ഫലങ്ങൾ',
    
    // Market Prices
    'prices.title': 'മാർക്കറ്റ് വില',
    'prices.district': 'ജില്ല',
    'prices.crop': 'വിള',
    'prices.price': 'വില (₹/കി.ഗ്രാം)',
    'prices.updated': 'അവസാനം അപ്ഡേറ്റ് ചെയ്തത്',
    
    // Schemes
    'schemes.title': 'സർക്കാർ പദ്ധതികൾ',
    'schemes.apply': 'ഇപ്പോൾ അപേക്ഷിക്കുക',
    'schemes.details': 'വിശദാംശങ്ങൾ കാണുക'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farm-assistant-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ml')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('farm-assistant-language', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};