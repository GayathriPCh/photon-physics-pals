import { useState } from "react";
import axios from "axios";

export interface SensayMessage {
  role: "user" | "assistant";
  content: string;
}

export const useSensayChat = (replicaId: string | undefined, userId: string | undefined) => {
  const [messages, setMessages] = useState<SensayMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!replicaId || !userId) return;
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content }]);
    try {
      const response = await axios.post(
        `https://api.sensay.io/v1/replicas/${replicaId}/chat/completions`,
        {
          content,
          skip_chat_history: false,
          source: "embed"
        },
        {
          headers: {
            "X-ORGANIZATION-SECRET": import.meta.env.VITE_SENSAY_ORG_SECRET,
            "X-API-Version": "2025-03-25",
            "X-USER-ID": "photon",
            "Content-Type": "application/json",
            "accept": "application/json"
          }
        }
      );
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.content }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};
