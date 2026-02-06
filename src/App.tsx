import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Onboarding from "./pages/auth/Onboarding";
import Dashboard from "./pages/Dashboard";

// Farmer Pages
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import FarmerListings from "./pages/farmer/FarmerListings";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import FarmerProfile from "./pages/farmer/FarmerProfile";
import FarmerEarnings from "./pages/farmer/FarmerEarnings";
import FarmerNotifications from "./pages/farmer/FarmerNotifications";

// Buyer Pages
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import BuyerMarketplace from "./pages/buyer/BuyerMarketplace";
import BuyerOrders from "./pages/buyer/BuyerOrders";
import BuyerProfile from "./pages/buyer/BuyerProfile";
import BuyerNotifications from "./pages/buyer/BuyerNotifications";
import BuyerPayments from "./pages/buyer/BuyerPayments";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Farmer Routes */}
            <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
            <Route path="/farmer/listings" element={<FarmerListings />} />
            <Route path="/farmer/orders" element={<FarmerOrders />} />
            <Route path="/farmer/profile" element={<FarmerProfile />} />
            <Route path="/farmer/earnings" element={<FarmerEarnings />} />
            <Route path="/farmer/notifications" element={<FarmerNotifications />} />
            
            {/* Buyer Routes */}
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/marketplace" element={<BuyerMarketplace />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/buyer/profile" element={<BuyerProfile />} />
            <Route path="/buyer/notifications" element={<BuyerNotifications />} />
            <Route path="/buyer/payments" element={<BuyerPayments />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
