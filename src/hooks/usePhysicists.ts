import { useSensayReplicas } from "@/hooks/useSensayReplicas";
import { mapReplicaToPhysicist } from "@/utils/mapReplicaToPhysicist";
import { useMemo } from "react";

export const usePhysicists = () => {
  const { replicas, loading, error } = useSensayReplicas();

  // Map Sensay replicas to your physicist format
  const physicists = useMemo(() => replicas.map(mapReplicaToPhysicist), [replicas]);

  // You can define timelines and topics statically or extract from tags
  const timelines = [
    { id: "all", name: "All Eras", range: "All time periods" },
    { id: "renaissance", name: "Renaissance", range: "1400-1700" },
    { id: "modern", name: "Modern", range: "1700-1945" },
    { id: "contemporary", name: "Contemporary", range: "1945-Present" },
    { id: "timeless", name: "Timeless", range: "Eternal" }
  ];

  const allTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    physicists.forEach(p => (p.topics || []).forEach(t => topicsSet.add(t)));
    return Array.from(topicsSet).sort();
  }, [physicists]);

  return { physicists, timelines, allTopics, loading, error };
};
