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

// Use window to persist root across HMR
declare global {
  interface Window {
    __reactAppRoot?: any;
    __reactAppInitialized?: boolean;
  }
}

// Defer initialization to ensure DOM is ready and avoid double-initialization
Promise.resolve().then(() => {
  if (window.__reactAppInitialized) return;

  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  window.__reactAppInitialized = true;

  if (!window.__reactAppRoot) {
    try {
      window.__reactAppRoot = createRoot(rootElement);
    } catch (e) {
      console.error("Failed to create React root:", e);
      return;
    }
  }

  window.__reactAppRoot.render(<App />);
});
