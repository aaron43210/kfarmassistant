import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Camera, AlertTriangle, CheckCircle, Bug } from 'lucide-react';

interface AnalysisResult {
  pest: string;
  pestLocal: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string;
  prevention: string;
}

const PestDetection = () => {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const sampleResults: AnalysisResult[] = [
        {
          pest: 'Leaf Blight',
          pestLocal: 'ഇല പുഴുക്കൻ',
          confidence: 87,
          severity: 'medium',
          treatment: 'Apply copper-based fungicide. Remove affected leaves and improve air circulation.',
          prevention: 'Ensure proper spacing between plants, avoid overhead watering, and maintain good garden hygiene.'
        },
        {
          pest: 'Aphids',
          pestLocal: 'ചെറു കീടങ്ങൾ',
          confidence: 92,
          severity: 'low',
          treatment: 'Spray with neem oil solution or insecticidal soap. Introduce beneficial insects like ladybugs.',
          prevention: 'Regular monitoring, companion planting with marigolds, and maintaining plant health.'
        }
      ];
      
      const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return Bug;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
            <Bug className="h-8 w-8" />
            {t('pest.title')}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                {t('pest.upload')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Uploaded plant"
                      className="max-h-48 mx-auto rounded-lg shadow-soft"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click to select a different image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-base font-medium mb-1">{t('pest.dragdrop')}</p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Analyze Button */}
              <Button
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
                className="w-full h-12 text-base"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    {t('pest.analyze')}
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult && (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{t('pest.results')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pest Identification */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {language === 'ml' ? analysisResult.pestLocal : analysisResult.pest}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ml' ? analysisResult.pest : analysisResult.pestLocal}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">
                          {analysisResult.confidence}% Confidence
                        </div>
                      </div>
                    </div>
                    
                    {/* Severity */}
                    <div className="flex items-center gap-2 mb-4">
                      {React.createElement(getSeverityIcon(analysisResult.severity), {
                        className: `h-4 w-4 ${getSeverityColor(analysisResult.severity).split(' ')[0]}`
                      })}
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getSeverityColor(analysisResult.severity)}`}>
                        {analysisResult.severity.toUpperCase()} SEVERITY
                      </span>
                    </div>
                  </div>

                  {/* Treatment */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Treatment Recommendations:</h4>
                    <p className="text-sm leading-relaxed bg-success/5 p-3 rounded-lg border border-success/20">
                      {analysisResult.treatment}
                    </p>
                  </div>

                  {/* Prevention */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Prevention Tips:</h4>
                    <p className="text-sm leading-relaxed bg-accent/5 p-3 rounded-lg border border-accent/20">
                      {analysisResult.prevention}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!analysisResult && !isAnalyzing && selectedImage && (
              <Card className="shadow-medium">
                <CardContent className="text-center py-12">
                  <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click "Analyze Image" to detect pests and diseases
                  </p>
                </CardContent>
              </Card>
            )}

            {!selectedImage && (
              <Card className="shadow-medium">
                <CardContent className="text-center py-12">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Upload an image to get started with pest detection
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

export default PestDetection;