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

let isInitialized = false;

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
  if (isInitialized) return;

  const rootElement = document.getElementById("root");
  if (rootElement) {
    isInitialized = true;
    createRoot(rootElement).render(<App />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
