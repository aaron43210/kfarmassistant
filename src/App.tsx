import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import ChatBot from "@/components/ChatBot";
import Home from "./pages/Home";
import CropAdvisory from "./pages/CropAdvisory";
import PestDetection from "./pages/PestDetection";
import MarketPrices from "./pages/MarketPrices";
import Schemes from "./pages/Schemes";
import Weather from "./pages/Weather";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crop-advisory" element={<CropAdvisory />} />
                <Route path="/pest-detection" element={<PestDetection />} />
                <Route path="/market-prices" element={<MarketPrices />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/weather" element={<Weather />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ChatBot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
