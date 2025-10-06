import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Sprout, IndianRupee, Package } from 'lucide-react';

interface ResourceCalculation {
  seeds: number;
  fertilizer: {
    urea: number;
    phosphate: number;
    potash: number;
  };
  water: number;
  estimatedCost: number;
}

const ResourcePlanning = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('');
  const [area, setArea] = useState('');
  const [result, setResult] = useState<ResourceCalculation | null>(null);

  const crops = language === 'ml'
    ? [
        { value: 'rice', label: 'നെല്ല്' },
        { value: 'vegetables', label: 'തരക്കരി' },
        { value: 'rubber', label: 'റബ്ബർ' },
        { value: 'cashew', label: 'കശുമാവ്' },
        { value: 'pepper', label: 'കുരുമുളക്' },
        { value: 'coconut', label: 'തെങ്ങ്' },
      ]
    : [
        { value: 'rice', label: 'Rice' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'rubber', label: 'Rubber' },
        { value: 'cashew', label: 'Cashew' },
        { value: 'pepper', label: 'Pepper' },
        { value: 'coconut', label: 'Coconut' },
      ];

  // Resource requirements per acre (approximate values for Kerala)
  const resourceData: Record<string, any> = {
    rice: {
      seedsKg: 40,
      ureaKg: 65,
      phosphateKg: 35,
      potashKg: 25,
      waterLiters: 5000000,
      seedCost: 1200,
      fertilizerCost: 2800,
    },
    vegetables: {
      seedsKg: 5,
      ureaKg: 50,
      phosphateKg: 40,
      potashKg: 30,
      waterLiters: 2000000,
      seedCost: 3000,
      fertilizerCost: 3500,
    },
    rubber: {
      seedsKg: 250,
      ureaKg: 150,
      phosphateKg: 100,
      potashKg: 75,
      waterLiters: 3000000,
      seedCost: 8000,
      fertilizerCost: 6500,
    },
    cashew: {
      seedsKg: 200,
      ureaKg: 120,
      phosphateKg: 80,
      potashKg: 60,
      waterLiters: 2500000,
      seedCost: 5000,
      fertilizerCost: 4800,
    },
    pepper: {
      seedsKg: 15,
      ureaKg: 80,
      phosphateKg: 60,
      potashKg: 45,
      waterLiters: 1500000,
      seedCost: 4500,
      fertilizerCost: 3800,
    },
    coconut: {
      seedsKg: 160,
      ureaKg: 100,
      phosphateKg: 70,
      potashKg: 140,
      waterLiters: 2800000,
      seedCost: 7000,
      fertilizerCost: 5200,
    },
  };

  const calculateResources = () => {
    if (!selectedCrop || !area || parseFloat(area) <= 0) {
      return;
    }

    const areaNum = parseFloat(area);
    const cropData = resourceData[selectedCrop];

    if (!cropData) return;

    const calculation: ResourceCalculation = {
      seeds: cropData.seedsKg * areaNum,
      fertilizer: {
        urea: cropData.ureaKg * areaNum,
        phosphate: cropData.phosphateKg * areaNum,
        potash: cropData.potashKg * areaNum,
      },
      water: cropData.waterLiters * areaNum,
      estimatedCost: (cropData.seedCost + cropData.fertilizerCost) * areaNum,
    };

    setResult(calculation);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {language === 'ml' ? 'വിഭവ ആസൂത്രണം' : 'Resource Planning'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'ml'
              ? 'വിള, വിസ്തീർണം അനുസരിച്ച് ആവശ്യമായ വിത്ത്, വളം, വെള്ളം എന്നിവ കണക്കാക്കുക'
              : 'Calculate required seeds, fertilizers, and water based on crop and area'}
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {language === 'ml' ? 'വിഭവ കാൽക്കുലേറ്റർ' : 'Resource Calculator'}
            </CardTitle>
            <CardDescription>
              {language === 'ml'
                ? 'നിങ്ങളുടെ വിളയും വിസ്തീർണവും തിരഞ്ഞെടുക്കുക'
                : 'Select your crop and area to calculate requirements'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{language === 'ml' ? 'വിള തിരഞ്ഞെടുക്കുക' : 'Select Crop'}</Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={language === 'ml' ? 'വിള തിരഞ്ഞെടുക്കുക' : 'Choose a crop'}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">
                  {language === 'ml' ? 'വിസ്തീർണം (ഏക്കർ)' : 'Area (acres)'}
                </Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={language === 'ml' ? 'ഉദാ: 2.5' : 'e.g., 2.5'}
                />
              </div>
            </div>

            <Button onClick={calculateResources} className="w-full" size="lg">
              <Calculator className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'കണക്കാക്കുക' : 'Calculate'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            {/* Seeds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sprout className="h-5 w-5 text-leaf-green" />
                  {language === 'ml' ? 'വിത്ത് ആവശ്യം' : 'Seeds Required'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  {result.seeds.toFixed(1)} {language === 'ml' ? 'കിലോഗ്രാം' : 'kg'}
                </p>
              </CardContent>
            </Card>

            {/* Fertilizers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-earth-brown" />
                  {language === 'ml' ? 'വളം ആവശ്യം' : 'Fertilizers Required'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ml' ? 'യൂറിയ' : 'Urea'}
                    </p>
                    <p className="text-lg font-bold">{result.fertilizer.urea} kg</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ml' ? 'ഫോസ്ഫേറ്റ്' : 'Phosphate'}
                    </p>
                    <p className="text-lg font-bold">{result.fertilizer.phosphate} kg</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {language === 'ml' ? 'പൊട്ടാഷ്' : 'Potash'}
                    </p>
                    <p className="text-lg font-bold">{result.fertilizer.potash} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Water */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ml' ? 'ജല ആവശ്യം (ഏകദേശം)' : 'Water Required (Approx.)'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-sky-blue">
                  {(result.water / 1000).toLocaleString('en-IN')}{' '}
                  {language === 'ml' ? 'ലിറ്റർ' : 'liters'}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'ml'
                    ? 'കൃഷി കാലയളവിൽ മൊത്തം'
                    : 'Total throughout the growing season'}
                </p>
              </CardContent>
            </Card>

            {/* Estimated Cost */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <IndianRupee className="h-5 w-5" />
                  {language === 'ml' ? 'ഏകദേശ ചെലവ്' : 'Estimated Cost'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold flex items-center gap-1">
                  <IndianRupee className="h-6 w-6" />
                  {result.estimatedCost.toLocaleString('en-IN')}
                </p>
                <p className="text-sm opacity-90 mt-2">
                  {language === 'ml'
                    ? 'വിത്തും വളവും മാത്രം (അധ്വാനവും മറ്റും ഉൾപ്പെടുത്തിയിട്ടില്ല)'
                    : 'Seeds and fertilizers only (excludes labor and other costs)'}
                </p>
              </CardContent>
            </Card>

            {/* Suppliers Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'ml' ? 'വിതരണക്കാർ' : 'Local Suppliers'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  {language === 'ml'
                    ? 'നിങ്ങളുടെ പ്രദേശത്തെ വിതരണക്കാരെ സമീപിക്കാം:'
                    : 'Contact your local suppliers for inputs:'}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>{language === 'ml' ? 'കൃഷി ഭവൻ' : 'Krishi Bhavan'}</li>
                  <li>
                    {language === 'ml'
                      ? 'പ്രാഥമിക കാർഷിക സഹകരണ സംഘം'
                      : 'Primary Agricultural Cooperative Society (PACS)'}
                  </li>
                  <li>
                    {language === 'ml'
                      ? 'അംഗീകൃത കാർഷിക ഇൻപുട്ട് ഡീലർമാർ'
                      : 'Authorized Agricultural Input Dealers'}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePlanning;
