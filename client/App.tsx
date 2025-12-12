import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PompeAChaleur from "./pages/PompeAChaleur";
import PanneauxSolaires from "./pages/PanneauxSolaires";
import Isolation from "./pages/Isolation";
import BorneRecharge from "./pages/BorneRecharge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pompe-a-chaleur" element={<PompeAChaleur />} />
          <Route path="/panneaux-solaires" element={<PanneauxSolaires />} />
          <Route path="/isolation" element={<Isolation />} />
          <Route path="/borne-recharge" element={<BorneRecharge />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const initializeApp = () => {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  // Store root reference on element to persist across HMR
  if (!(rootElement as any).__reactRoot) {
    (rootElement as any).__reactRoot = createRoot(rootElement);
  }

  (rootElement as any).__reactRoot.render(<App />);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
