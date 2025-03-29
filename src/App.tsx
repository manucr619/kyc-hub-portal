
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KycLayout } from "./components/KycLayout";
import Dashboard from "./pages/Dashboard";
import Banks from "./pages/Banks";
import Customers from "./pages/Customers"; 
import Credentials from "./pages/Credentials";
import Transactions from "./pages/Transactions";
import Audit from "./pages/Audit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KycLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="banks" element={<Banks />} />
            <Route path="customers" element={<Customers />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="audit" element={<Audit />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
