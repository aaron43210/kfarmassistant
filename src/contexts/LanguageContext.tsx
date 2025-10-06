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
    'nav.weather': 'Weather',
    'nav.records': 'Farm Records',
    'nav.resources': 'Resource Planning',
    'nav.knowledge': 'Knowledge Base',
    
    // Home Page
    'home.welcome': 'Welcome to Kerala Farm Assistant',
    'home.description': 'Your AI-powered companion for modern farming in Kerala. Get crop advice, detect pests, check market prices, and access government schemes.',
    'home.crop.title': 'Crop Advisory',
    'home.crop.desc': 'Get personalized crop recommendations based on your location, soil type, and season.',
    'home.pest.title': 'Pest Detection',
    'home.pest.desc': 'Upload photos of affected plants and get instant diagnosis with treatment recommendations.',
    'home.weather.title': 'Weather Updates',
    'home.weather.desc': 'Get real-time weather forecasts, climate alerts, and farming precautions for your location.',
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
    'schemes.details': 'View Details',
    
    // Chatbot
    'chatbot.title': 'Farming Assistant',
    'chatbot.welcome': 'Hello! Ask me anything about farming, crops, weather, or government schemes.',
    'chatbot.placeholder': 'Type your question...',
    'chatbot.error': 'Error',
    
    // Weather
    'weather.title': 'Real-Time Weather & Climate Updates',
    'weather.subtitle': 'Stay informed about weather conditions to protect your crops',
    'weather.selectLocation': 'Select Your Location',
    'weather.current': 'Current Weather',
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.rainChance': 'Rain Chance',
    'weather.alerts': 'Weather Alerts',
    'weather.precautions': 'Precautions to Take',
    'weather.forecast': '3-Day Forecast',
    'weather.rain': 'rain',
    'weather.loading': 'Loading...',
    'weather.refresh': 'Refresh',
    'weather.selectLocationPrompt': 'Select a location to view weather information'
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
    'nav.weather': 'കാലാവസ്ഥ',
    'nav.records': 'കൃഷി രേഖകൾ',
    'nav.resources': 'വിഭവ ആസൂത്രണം',
    'nav.knowledge': 'അറിവ് ശേഖരം',
    
    // Home Page
    'home.welcome': 'കേരള ഫാം അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം',
    'home.description': 'കേരളത്തിലെ ആധുനിക കൃഷിക്കായി നിങ്ങളുടെ AI പവർ ചെയ്ത സഹായി. വിള ഉപദേശം, കീട നിർണയം, മാർക്കറ്റ് വില, സർക്കാർ പദ്ധതികൾ എന്നിവ നേടുക.',
    'home.crop.title': 'വിള ഉപദേശം',
    'home.crop.desc': 'നിങ്ങളുടെ സ്ഥലം, മണ്ണിന്റെ തരം, സീസൺ എന്നിവ അടിസ്ഥാനമാക്കി വ്യക്തിഗത വിള ശുപാർശകൾ നേടുക.',
    'home.pest.title': 'കീട നിർണയം',
    'home.pest.desc': 'രോഗബാധിതമായ ചെടികളുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് ചികിത്സാ ശുപാർശകളോടെ തൽക്ഷണ നിർണയം നേടുക.',
    'home.weather.title': 'കാലാവസ്ഥ വിവരങ്ങൾ',
    'home.weather.desc': 'നിങ്ങളുടെ സ്ഥലത്തിനായി തത്സമയ കാലാവസ്ഥാ പ്രവചനങ്ങൾ, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, കൃഷി മുൻകരുതലുകൾ എന്നിവ നേടുക.',
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
    'schemes.details': 'വിശദാംശങ്ങൾ കാണുക',
    
    // Chatbot
    'chatbot.title': 'കാർഷിക സഹായി',
    'chatbot.welcome': 'നമസ്കാരം! കൃഷി, വിളകൾ, കാലാവസ്ഥ, അല്ലെങ്കിൽ സർക്കാർ പദ്ധതികൾ എന്നിവയെക്കുറിച്ച് എന്തും ചോദിക്കൂ.',
    'chatbot.placeholder': 'നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
    'chatbot.error': 'പിശക്',
    
    // Weather
    'weather.title': 'തത്സമയ കാലാവസ്ഥ വിവരങ്ങൾ',
    'weather.subtitle': 'നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കാൻ കാലാവസ്ഥാ വിവരങ്ങൾ അറിയുക',
    'weather.selectLocation': 'നിങ്ങളുടെ സ്ഥലം തിരഞ്ഞെടുക്കുക',
    'weather.current': 'നിലവിലെ കാലാവസ്ഥ',
    'weather.temperature': 'താപനില',
    'weather.humidity': 'ആർദ്രത',
    'weather.rainChance': 'മഴയുടെ സാധ്യത',
    'weather.alerts': 'കാലാവസ്ഥ മുന്നറിയിപ്പുകൾ',
    'weather.precautions': 'എടുക്കേണ്ട മുൻകരുതലുകൾ',
    'weather.forecast': '3 ദിവസത്തെ പ്രവചനം',
    'weather.rain': 'മഴ',
    'weather.loading': 'ലോഡിംഗ്...',
    'weather.refresh': 'റിഫ്രഷ് ചെയ്യുക',
    'weather.selectLocationPrompt': 'കാലാവസ്ഥ വിവരങ്ങൾ കാണാൻ ഒരു സ്ഥലം തിരഞ്ഞെടുക്കുക'
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