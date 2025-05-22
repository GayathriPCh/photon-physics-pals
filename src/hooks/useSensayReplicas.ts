import { useState, useEffect } from "react";
import axios from "axios";

// Utility to normalize replica fields (handles both snake_case and camelCase)
const normalizeReplica = (r: any) => ({
  uuid: r.uuid,
  name: r.name,
  slug: r.slug,
  profileImage: r.profileImage || r.profile_image || "",
  shortDescription: r.shortDescription || r.short_description || "",
  introduction: r.introduction || r.greeting || "",
  tags: r.tags || [],
  systemMessage: r.systemMessage || r.system_message || "",
  ownerID: r.ownerID || r.owner_id || "",
  type: r.type,
  greeting: r.greeting || r.introduction || "",
  suggestedQuestions: r.suggestedQuestions || r.suggested_questions || [],
});

export const useSensayReplicas = () => {
  const [replicas, setReplicas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReplicas = async () => {
      try {
        const response = await axios.get(
          "https://api.sensay.io/v1/replicas",
          {
            headers: {
                "X-ORGANIZATION-SECRET": import.meta.env.VITE_SENSAY_ORG_SECRET,
                "X-API-Version": "2025-03-25",
                "X-USER-ID": "photon",
                "Accept": "application/json"
              },              
            params: {
              ownerID: "photon",
              page_index: 1,
              page_size: 24,
              sort: "name"
            }
          }
        );
        // Normalize all replicas
        const items = Array.isArray(response.data.items)
          ? response.data.items.map(normalizeReplica)
          : [];
        setReplicas(items);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchReplicas();
  }, []);

  return { replicas, loading, error };
};
