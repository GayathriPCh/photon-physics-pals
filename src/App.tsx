import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Replicas from "./pages/Replicas";
import Chat from "./pages/Chat";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";
import CreateReplica from "./pages/CreateReplica";
import { AppHeader } from "./components/AppHeader";
import { WalletProvider } from './context/WalletContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <WalletProvider>
                <AppHeader />
                <main className="pt-16 min-h-[calc(100vh-4rem)]">
                  <Routes>
                    <Route path="/" element={<Onboarding />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/replicas" element={<Replicas />} />
                    <Route path="/chat/:physicistId" element={<Chat />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-replica" element={<CreateReplica />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </WalletProvider>
            </BrowserRouter>
          </TooltipProvider>
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
