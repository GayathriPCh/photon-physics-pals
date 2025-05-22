import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wallet, Star, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export const AppHeader: React.FC = () => {
  const { account, isConnecting, connectWallet, disconnectWallet, networkId } = useWallet();
  const [photonTokens, setPhotonTokens] = React.useState<{ balance: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Connected to Rootstock Testnet successfully!",
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

  const truncatedAddress = account 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : '';

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/replicas", label: "Physicists" },
    { to: "/journal", label: "Journal" },
    { to: "/create-replica", label: "Create Replica" },
  ];

  const renderDesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-white/90 hover:text-white transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const renderMobileNav = () => (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-l border-slate-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-white">Menu</span>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>
          <nav className="flex-1 space-y-4">
            {navLinks.map((link) => (
              <SheetClose key={link.to} asChild>
                <Link
                  to={link.to}
                  className="block py-2 text-lg font-medium text-white/90 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderWalletButton = () => {
    if (account) {
      return (
        <div className="flex items-center space-x-3">
          {networkId !== 31 && (
            <Badge variant="destructive" className="text-xs">
              Wrong Network
            </Badge>
          )}

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
                {truncatedAddress}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-slate-900 border border-slate-800 text-white">
              <div className="px-3 py-2 text-sm">
                <p className="font-medium">{truncatedAddress}</p>
                <p className="text-gray-400 text-xs">Rootstock Testnet</p>
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
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <Button 
        onClick={handleConnectWallet}
        disabled={isConnecting}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      >
        {isConnecting ? (
          'Connecting...'
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {isMobile ? 'Connect' : 'Connect Wallet'}
          </>
        )}
      </Button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/10 px-4 py-2 sm:py-3">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/replicas" className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Photon
            </span>
          </Link>
          {!isMobile && renderDesktopNav()}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {renderWalletButton()}
          {isMobile && renderMobileNav()}
        </div>
      </div>
    </header>
  );
};
