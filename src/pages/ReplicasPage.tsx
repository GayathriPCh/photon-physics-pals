// src/pages/ReplicasPage.tsx
import { useSensayReplicas } from "@/hooks/useSensayReplicas";
import { PhysicistCard } from "@/components/PhysicistCard";
import { mapReplicaToPhysicist } from "@/utils/mapReplicaToPhysicist";

const ReplicasPage = () => {
  const { replicas, loading, error } = useSensayReplicas();

  if (loading) return <div>Loading physicists...</div>;
  if (error) return <div>Error loading physicists: {error.message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {replicas.map(replica => (
        <PhysicistCard 
          key={replica.uuid}
          physicist={mapReplicaToPhysicist(replica)}
        />
      ))}
    </div>
  );
};

export default ReplicasPage;
