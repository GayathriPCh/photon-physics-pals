
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhysicistCard } from "@/components/PhysicistCard";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useUserContext } from "@/context/UserContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Replicas = () => {
  const { physicists } = usePhysicists();
  const { selectedPhysicists } = useUserContext();
  
  const filteredPhysicists = physicists.filter(
    (physicist) => selectedPhysicists.includes(physicist.id)
  );
  
  const godOfPhysics = physicists.find(p => p.id === "godofphysics");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home size={16} /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>Physicists</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Your Physics Mentors</h1>
          <p className="text-gray-300 max-w-2xl">
            Chat with history's greatest physics minds. They'll explain complex concepts 
            in approachable ways while maintaining their unique personalities.
          </p>
        </header>

        {godOfPhysics && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-200">
                Featured Mentor
              </span>
            </h2>
            <div className="flex justify-center">
              <PhysicistCard physicist={godOfPhysics} featured={true} />
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6">Your Selected Physicists</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhysicists.map(physicist => (
            <PhysicistCard key={physicist.id} physicist={physicist} />
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/onboarding">
            <Button variant="outline" className="border-purple-400 text-purple-400">
              Edit Selection
            </Button>
          </Link>
          <Link to="/journal">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
              View Learning Journal
            </Button>
          </Link>
          <Link to="/create-replica">
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black">
              Create Your Own Physicist
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Replicas;
