import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

export const useNotion = () => {
  const [notionPageId, setNotionPageId] = useState<string | null>(null);
  const { account } = useWallet();

  const initializeNotionPage = async () => {
    if (!account) return null;
    try {
      const response = await fetch("http://localhost:5001/api/create-notion-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account }),
      });
      const data = await response.json();
      if (data.pageId) setNotionPageId(data.pageId);
      return data.pageId;
    } catch (err) {
      console.error("Error initializing Notion page:", err);
      return null;
    }
  };

  const saveNoteToNotion = async (content: string) => {
    if (!account) return;
    try {
      await fetch("http://localhost:5001/api/append-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account, content }),
      });
    } catch (err) {
      console.error("Error saving note to Notion:", err);
    }
  };

  return { notionPageId, initializeNotionPage, saveNoteToNotion };
};
