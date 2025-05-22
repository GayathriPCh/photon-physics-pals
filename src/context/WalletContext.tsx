import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

const ROOTSTOCK_TESTNET = {
  chainId: '0x1f',
  chainName: 'Rootstock Testnet',
  rpcUrls: ['https://public-node.testnet.rsk.co'],
  nativeCurrency: {
    name: 'Test RBTC',
    symbol: 'tRBTC',
    decimals: 18
  },
  blockExplorerUrls: ['https://explorer.testnet.rsk.co']
};

type WalletContextType = {
  account: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  networkId: number | null;
};

const WalletContext = createContext<WalletContextType>({
  account: null,
  isConnecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  networkId: null,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [networkId, setNetworkId] = useState<number | null>(null);

  useEffect(() => {
    const savedAccount = localStorage.getItem('walletAccount');
    if (savedAccount) setAccount(savedAccount);

    if (window.ethereum) {
      const handleChainChanged = (_: string[]) => {
        window.ethereum?.request({ method: 'eth_chainId' })
          .then((chainId: string) => setNetworkId(parseInt(chainId, 16)))
          .catch(console.error);
      };
      
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.request({ method: 'eth_chainId' })
        .then((chainId: string) => setNetworkId(parseInt(chainId, 16)))
        .catch(console.error);

      return () => {
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const switchToRootstockTestnet = async () => {
    if (!window.ethereum) return false;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1f' }],
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ROOTSTOCK_TESTNET],
          });
          return true;
        } catch (addError) {
          toast.error('Failed to add Rootstock Testnet');
          return false;
        }
      }
      toast.error('Please connect to Rootstock Testnet');
      return false;
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not detected!');
      return;
    }

    setIsConnecting(true);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const switched = await switchToRootstockTestnet();
      if (!switched) return;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem('walletAccount', accounts[0]);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setNetworkId(parseInt(chainId, 16));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setNetworkId(null);
    localStorage.removeItem('walletAccount');
  };

  return (
    <WalletContext.Provider
      value={{ account, isConnecting, connectWallet, disconnectWallet, networkId }}
    >
      {children}
    </WalletContext.Provider>
  );
};

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
    };
  }
}
