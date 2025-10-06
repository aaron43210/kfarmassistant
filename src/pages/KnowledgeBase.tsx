import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Video, FileText, Lightbulb } from 'lucide-react';

const KnowledgeBase = () => {
  const { language } = useLanguage();

  const tips = language === 'ml'
    ? [
        {
          title: 'മഴക്കാലത്തെ കൃഷി',
          content:
            'കേരളത്തിൽ ജൂൺ മുതൽ സെപ്റ്റംബർ വരെ തെക്ക് പടിഞ്ഞാറൻ മൺസൂൺ സമയമാണ്. നെല്ല്, തരക്കരികൾ എന്നിവയ്ക്ക് ഉത്തമം. നല്ല ഡ്രെയിനേജ് ഉറപ്പാക്കുക.',
          season: 'മഴക്കാലം',
        },
        {
          title: 'വേനൽക്കാല കൃഷി',
          content:
            'മാർച്ച് മുതൽ മെയ് വരെ വേനൽക്കാലം. നനവ് സംവിധാനം നിർബന്ധമാണ്. തണ്ണിമത്തൻ, മത്തങ്ങ, വെണ്ടയ്ക്ക തുടങ്ങിയവയ്ക്ക് നല്ലതാണ്.',
          season: 'വേനൽക്കാലം',
        },
        {
          title: 'ശീതകാല കൃഷി',
          content:
            'ഡിസംബർ മുതൽ ഫെബ്രുവരി വരെ. തണുപ്പ് ഇഷ്ടപ്പെടുന്ന പച്ചക്കറികൾ വളരാൻ നല്ല സമയം. കാരറ്റ്, ബീൻസ്, കാബേജ് എന്നിവയ്ക്ക് ഉത്തമം.',
          season: 'ശീതകാലം',
        },
        {
          title: 'ജൈവകൃഷി രീതികൾ',
          content:
            'കമ്പോസ്റ്റ്, വെർമികമ്പോസ്റ്റ് ഉപയോഗം മണ്ണിന്റെ ആരോഗ്യം വർദ്ധിപ്പിക്കും. രാസവളം ഉപയോഗം കുറയ്ക്കുക. പച്ചിലവളം നല്ല ബദലാണ്.',
          season: 'എല്ലാ സീസണും',
        },
      ]
    : [
        {
          title: 'Monsoon Season Farming',
          content:
            'Southwest monsoon from June to September is ideal for rice and vegetables in Kerala. Ensure proper drainage and select disease-resistant varieties.',
          season: 'Monsoon',
        },
        {
          title: 'Summer Crop Practices',
          content:
            'March to May requires irrigation systems. Watermelon, cucumber, and okra thrive. Mulching helps retain moisture. Plan water resources carefully.',
          season: 'Summer',
        },
        {
          title: 'Winter Cultivation',
          content:
            'December to February is perfect for cool-season vegetables. Carrots, beans, cabbage grow well. Protect crops from excessive dew and cold winds.',
          season: 'Winter',
        },
        {
          title: 'Organic Farming Methods',
          content:
            'Use compost and vermicompost to improve soil health. Reduce chemical fertilizer use. Green manure crops like cowpea add nutrients naturally.',
          season: 'All Seasons',
        },
      ];

  const practices = language === 'ml'
    ? [
        {
          crop: 'നെല്ല്',
          practice:
            'വിത്ത് തിരഞ്ഞെടുപ്പ്: ഉമ, ജ്യോതി തുടങ്ങിയ ഇനങ്ങൾ നല്ലതാണ്. വിത്ത് കൈകാര്യം മാവിലോസായിൽ 2 ഗ്രാം/കിലോ എന്ന തോതിൽ. കളകൾ നശിപ്പിക്കൽ നിർബന്ധമാണ്.',
        },
        {
          crop: 'തരക്കരി',
          practice:
            'ഉയർന്ന തടങ്ങൾ തയ്യാറാക്കുക. കമ്പോസ്റ്റ് സമൃദ്ധമായി ചേർക്കുക. ജൈവകീടനാശിനികൾ ഉപയോഗിക്കുക. വെള്ളം കെട്ടാതെ നോക്കുക.',
        },
        {
          crop: 'കുരുമുളക്',
          practice:
            'തണൽ, ഈർപ്പം ഉള്ള സ്ഥലം തിരഞ്ഞെടുക്കുക. പാകിയ മരക്കൊമ്പുകളിൽ കയറ്റുക. ജൈവവളം, കോഴിവളം മികച്ചതാണ്. നനവ് പ്രധാനം.',
        },
        {
          crop: 'തെങ്ങ്',
          practice:
            'നാളികേര തോട്ടം വൃത്തിയായി സൂക്ഷിക്കുക. വറ്റുന്നതിന് മുമ്പ് കോപ്ര എടുക്കൽ. വേരുകൾക്ക് ചുറ്റും നനവ് നൽകുക. വീണ ഇലകൾ മൾച്ചായി ഉപയോഗിക്കാം.',
        },
      ]
    : [
        {
          crop: 'Rice',
          practice:
            'Seed Selection: Choose varieties like Uma, Jyothi suitable for Kerala. Treat seeds with Mancozeb @ 2g/kg. Weed management is crucial for good yield.',
        },
        {
          crop: 'Vegetables',
          practice:
            'Prepare raised beds for better drainage. Add plenty of compost. Use organic pesticides. Rotate crops to prevent soil depletion and disease buildup.',
        },
        {
          crop: 'Pepper',
          practice:
            'Select shaded, moist locations. Train vines on living or dead trees. Organic manure and poultry waste work well. Regular watering is essential.',
        },
        {
          crop: 'Coconut',
          practice:
            'Keep the coconut garden clean. Harvest coconuts before they dry. Water around root zones. Fallen leaves can be used as mulch to retain moisture.',
        },
      ];

  const videos = language === 'ml'
    ? [
        {
          title: 'നെല്ല് കൃഷി - പൂർണ്ണ മാർഗ്ഗനിർദ്ദേശം',
          description: 'വിത്ത് തിരഞ്ഞെടുപ്പ് മുതൽ വിളവെടുപ്പ് വരെയുള്ള പൂർണ്ണ വിവരങ്ങൾ',
          duration: '15 മിനിറ്റ്',
        },
        {
          title: 'ജൈവ കീടനിയന്ത്രണം',
          description: 'രാസവസ്തുക്കൾ ഇല്ലാതെ കീടങ്ങളെ നിയന്ത്രിക്കാനുള്ള രീതികൾ',
          duration: '10 മിനിറ്റ്',
        },
        {
          title: 'വെർമികമ്പോസ്റ്റ് തയ്യാറാക്കൽ',
          description: 'വീട്ടിൽ വെർമികമ്പോസ്റ്റ് എങ്ങനെ ഉണ്ടാക്കാം',
          duration: '8 മിനിറ്റ്',
        },
      ]
    : [
        {
          title: 'Rice Cultivation - Complete Guide',
          description: 'Step-by-step guide from seed selection to harvesting',
          duration: '15 minutes',
        },
        {
          title: 'Organic Pest Control',
          description: 'Natural methods to control pests without chemicals',
          duration: '10 minutes',
        },
        {
          title: 'Making Vermicompost',
          description: 'Learn how to prepare vermicompost at home',
          duration: '8 minutes',
        },
      ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
            {language === 'ml' ? 'അറിവ് ശേഖരം' : 'Knowledge Base'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {language === 'ml'
              ? 'കൃഷിയിൽ വിജയം നേടാനുള്ള ടിപ്സുകളും മാർഗ്ഗനിർദ്ദേശങ്ങളും'
              : 'Tips and guidelines for successful farming'}
          </p>
        </div>

        <Tabs defaultValue="tips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
            <TabsTrigger value="tips">
              <Lightbulb className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'ടിപ്സുകൾ' : 'Tips'}
            </TabsTrigger>
            <TabsTrigger value="practices">
              <FileText className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'രീതികൾ' : 'Practices'}
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-2" />
              {language === 'ml' ? 'വീഡിയോകൾ' : 'Videos'}
            </TabsTrigger>
          </TabsList>

          {/* Tips Tab */}
          <TabsContent value="tips" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {tips.map((tip, index) => (
                <Card key={index} className="hover:shadow-medium transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tip.season}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Best Practices Tab */}
          <TabsContent value="practices" className="space-y-4">
            {practices.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-leaf-green" />
                    {item.crop}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{item.practice}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="pt-6 text-center">
                <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {language === 'ml'
                    ? 'വീഡിയോ ട്യൂട്ടോറിയലുകൾ ഉടൻ ലഭ്യമാകും'
                    : 'Video tutorials coming soon'}
                </p>
              </CardContent>
            </Card>

            {videos.map((video, index) => (
              <Card key={index} className="opacity-60">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        {video.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{video.description}</CardDescription>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1 rounded">{video.duration}</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KnowledgeBase;
