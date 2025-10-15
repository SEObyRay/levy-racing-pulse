import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Nieuws from "./pages/Nieuws";
import NieuwsDetail from "./pages/NieuwsDetail";
import Agenda from "./pages/Agenda";
import AgendaDetail from "./pages/AgendaDetail";
import Sponsors from "./pages/Sponsors";
import OverLevy from "./pages/OverLevy";
import ClubVan100 from "./pages/ClubVan100";
import Media from "./pages/Media";
import Contact from "./pages/Contact";
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
          <Route path="/nieuws" element={<Nieuws />} />
          <Route path="/nieuws/:year/:slug" element={<NieuwsDetail />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/:year/:slug" element={<AgendaDetail />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/over-levy" element={<OverLevy />} />
          <Route path="/club-van-100" element={<ClubVan100 />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
