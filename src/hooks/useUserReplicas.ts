// src/hooks/useUserReplicas.ts
import { useEffect, useState } from "react";
import axios from "axios";

export function useUserReplicas(walletAddress: string | undefined) {
  const [replicas, setReplicas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) return;
    setLoading(true);
    axios.get("https://api.sensay.io/v1/replicas", {
      params: {
        ownerID: walletAddress,
        page_index: 1,
        page_size: 24,
        sort: "name"
      },
      headers: {
        "X-ORGANIZATION-SECRET": import.meta.env.VITE_SENSAY_ORG_SECRET,
        "X-API-Version": "2025-03-25",
        "X-USER-ID": walletAddress,
        "accept": "application/json"
      }
    })
    .then(res => {
      setReplicas(res.data?.items || []);
      setError(null);
    })
    .catch(err => {
      setError("Failed to fetch replicas");
      setReplicas([]);
    })
    .finally(() => setLoading(false));
  }, [walletAddress]);

  return { replicas, loading, error };
}
