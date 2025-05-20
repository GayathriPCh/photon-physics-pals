
import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wallet, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

export const AppHeader: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet, photonTokens } = useUserContext();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 px-6 py-3">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/replicas" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Photon
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/replicas" className="text-white/90 hover:text-white transition-colors">
            Physicists
          </Link>
          <Link to="/journal" className="text-white/90 hover:text-white transition-colors">
            Journal
          </Link>
          <Link to="/create-replica" className="text-white/90 hover:text-white transition-colors">
            Create Replica
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {wallet ? (
            <>
              {photonTokens && (
                <Badge className="bg-gradient-to-r from-amber-400 to-yellow-200 text-black flex items-center gap-1.5 px-3 py-1.5">
                  <Star size={14} className="text-amber-600" />
                  <span>{photonTokens.balance} $PHOTON</span>
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 border-purple-400/50 text-purple-200">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    {wallet.address}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-900 border border-slate-800 text-white">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium">{wallet.address}</p>
                    <p className="text-gray-400 text-xs">{wallet.balance}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer hover:bg-slate-800" onClick={handleDisconnect}>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Disconnect Wallet</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
