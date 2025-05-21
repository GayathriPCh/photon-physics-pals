import { useEffect, useState } from "react";
import { ethers, BrowserProvider } from "ethers";
import { NOTEBOOK_REGISTRY_ABI, NOTEBOOK_REGISTRY_ADDRESS } from "@/contracts/notebookRegistry";
import { useWallet } from "@/context/WalletContext";
export const useNotebookRegistry = () => {
    const { account } = useWallet();
    const [notebookId, setNotebookId] = useState<string | null>(null);
    const [hasNotebook, setHasNotebook] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
      if (!account || !window.ethereum) {
        setIsLoading(false);
        return;
      }
      
      const fetchNotebook = async () => {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(
            NOTEBOOK_REGISTRY_ADDRESS,
            NOTEBOOK_REGISTRY_ABI,
            provider
          );
          
          const id = await contract.getNotebook(account);
          setNotebookId(id && id.length > 0 ? id : null);
          setHasNotebook(!!id && id.length > 0);
        } catch (error) {
          console.error("Error fetching notebook:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchNotebook();
    }, [account]);
  
    const registerNotebook = async (pageId: string) => {
      if (!account || !window.ethereum) {
        console.error("No account or ethereum provider found");
        return;
      }
      
      setIsLoading(true);
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(); 
        const contract = new ethers.Contract(
          NOTEBOOK_REGISTRY_ADDRESS,
          NOTEBOOK_REGISTRY_ABI,
          signer
        );
        const tx = await contract.setNotebook(pageId);
        await tx.wait();
        setNotebookId(pageId);
        setHasNotebook(true);
      } catch (error) {
        console.error("Failed to register notebook:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    return { notebookId, hasNotebook, registerNotebook, isLoading };
  };