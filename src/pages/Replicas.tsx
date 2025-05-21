import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhysicistCard } from "@/components/PhysicistCard";
import { PhysicistFilters } from "@/components/PhysicistFilters";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useUserContext } from "@/context/UserContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Replicas = () => {
  const { physicists, timelines, allTopics, loading, error } = usePhysicists();
  const { selectedPhysicists } = useUserContext();
  const [filters, setFilters] = useState({
    search: "",
    timeline: "all",
    topic: ""
  });
  const [activeTab, setActiveTab] = useState<"selected" | "all">("selected");

  const filteredPhysicists = useMemo(() => {
    let filtered = activeTab === "selected"
      ? physicists.filter(p => selectedPhysicists.includes(p.id))
      : physicists;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        (p.specialty ?? "").toLowerCase().includes(searchTerm)
      );
    }

    if (filters.timeline && filters.timeline !== "all") {
      filtered = filtered.filter(p =>
        (p.era ?? "").toLowerCase() === filters.timeline.toLowerCase()
      );
    }

    if (filters.topic) {
      filtered = filtered.filter(p =>
        (p.topics ?? []).some(t => t.toLowerCase() === filters.topic.toLowerCase())
      );
    }

    return filtered;
  }, [physicists, selectedPhysicists, filters, activeTab]);

  // Find the "Photon Guide" (God of Physics) if present
  const godOfPhysics = physicists.find(p => p.name.toLowerCase().includes("photon"));

  const handleFilterChange = (newFilters: {
    search: string;
    timeline: string;
    topic: string;
  }) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="p-8 text-center text-lg text-white">Loading physicists...</div>;
  if (error) return <div className="p-8 text-center text-lg text-red-400">Error loading physicists.</div>;

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

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Physics Mentors</h1>
          <p className="text-gray-300 max-w-2xl">
            Chat with history's greatest physics minds. They'll explain complex concepts 
            in approachable ways while maintaining their unique personalities.
          </p>
        </header>

        <div className="mb-8">
          <PhysicistFilters
            timelines={timelines}
            topics={allTopics}
            onFilterChange={handleFilterChange}
          />
        </div>

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

        <Tabs defaultValue="selected" onValueChange={(value) => setActiveTab(value as "selected" | "all")}>
          <TabsList className="bg-black/30 mb-6">
            <TabsTrigger value="selected">Your Selected Physicists</TabsTrigger>
            <TabsTrigger value="all">All Physicists</TabsTrigger>
          </TabsList>

          <TabsContent value="selected" className="mt-0">
            {filteredPhysicists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhysicists.map(physicist => (
                  <PhysicistCard key={physicist.id} physicist={physicist} />
                ))}
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">
                  {filters.search || filters.timeline !== "all" || filters.topic
                    ? "No physicists match your filters"
                    : "You haven't selected any physicists yet"}
                </p>
                <Link to="/onboarding">
                  <Button variant="outline" className="border-purple-400 text-purple-400">
                    Select Physicists
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {filteredPhysicists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhysicists.map(physicist => (
                  <PhysicistCard key={physicist.id} physicist={physicist} />
                ))}
              </div>
            ) : (
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">No physicists match your filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

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
