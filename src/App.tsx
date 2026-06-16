import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";
import { OfflineIndicator } from "@/components/Offline/OfflineIndicator";
import { MetaTags } from "@/components/SEO/MetaTags";
import { ScrollToTop } from "@/components/Navigation/ScrollToTop";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { usePerformance } from "@/hooks/usePerformance";
import Index from "./pages/Index";
import BeforeStart from "./pages/BeforeStart";
import Calculator from "./pages/Calculator";
import Validace from "./pages/Validace";
import Diagnostika from "./pages/Diagnostika";
import VyberPlatformy from "./pages/VyberPlatformy";
import RoiKalkulacka from "./pages/RoiKalkulacka";
import Prezentace from "./pages/Prezentace";
import Checklist from "./pages/Checklist";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Guides from "./pages/Guides";
import GuidePage from "./pages/GuidePage";
import NotFound from "./pages/NotFound";
import './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  usePerformance();
  
  return (
  <ErrorBoundary>
    <HelmetProvider>
      <CurrencyProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <MetaTags />
            <Toaster />
            <Sonner />
            <OfflineIndicator />
            <div className="min-h-screen flex flex-col">
            <div className="flex-1">
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/pred-zacatkem" element={<BeforeStart />} />
                  <Route path="/validace" element={<Validace />} />
                  <Route path="/kalkulacka" element={<Calculator />} />
                  <Route path="/diagnostika" element={<Diagnostika />} />
                  <Route path="/vyber-platformy" element={<VyberPlatformy />} />
                  <Route path="/roi-kalkulacka" element={<RoiKalkulacka />} />
                  <Route path="/prezentace" element={<Prezentace />} />
                  <Route path="/checklist" element={<Checklist />} />
                  <Route path="/o-mne" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/pruvodce" element={<Guides />} />
                  <Route path="/pruvodce/:slug" element={<GuidePage />} />
                  
                  {/* Legacy routes for backward compatibility */}
                  <Route path="/calculator" element={<Navigate to="/kalkulacka" replace />} />
                  <Route path="/about" element={<Navigate to="/o-mne" replace />} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
              <Footer />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </CurrencyProvider>
    </HelmetProvider>
  </ErrorBoundary>
  );
};

export default App;