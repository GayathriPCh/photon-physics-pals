import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PhysicistCard } from "@/components/PhysicistCard";
import { PhysicistFilters } from "@/components/PhysicistFilters";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useUserContext } from "@/context/UserContext";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Home, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotonGodCard } from "@/components/PhotonGodCard";
import '../fonts.css';
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

  const godOfPhysics = physicists.find(
    p => p.id === "90af87a0-bc41-4e40-aacd-494fdfdfadd2" ||
         p.name.toLowerCase().includes("photon")
  );

  const handleFilterChange = (newFilters: {
    search: string;
    timeline: string;
    topic: string;
  }) => {
    setFilters(newFilters);
  };

  if (loading) return <div className="p-8 text-center text-lg text-white font-outfit">Loading physicists...</div>;
  if (error) return <div className="p-8 text-center text-lg text-white font-outfit">Error loading physicists.</div>;

  return (
    <div 
      className="min-h-screen bg-black text-white font-outfit"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(0,255,163,0.08) 0%, rgba(3,225,255,0.08) 50%, rgba(220,31,255,0.08) 100%),
          url("/bg.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/80 backdrop-blur-sm min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-12">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-[#00FFA3] hover:text-white transition-colors font-outfit">
                    <Home size={16} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#03E1FF]" />
              <BreadcrumbItem>
                <span className="text-white font-outfit">Physicists</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Hero Section */}
         <div className="text-center mb-16">
  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white font-outfit tracking-tight" style={{ fontFamily: 'cyber' }}>
    speak across <span className="text-[#531fff]">timelines.</span>
  </h1>
  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-outfit">
    Chat with history's greatest physics minds. 
  </p>
</div>

{/* Filters */}
<div className="mb-16">
  <PhysicistFilters
    timelines={timelines}
    topics={allTopics}
    onFilterChange={handleFilterChange}
  />
</div>

{/* Photon God Section */}
{godOfPhysics && (
  <div className="mb-20">
    <div className="text-center mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit" style={{ fontFamily: 'cyber' }}>
        <Sparkles className="inline-block mr-3 h-8 w-8 text-[#00FFA3]" />
        Meet Your Cosmic Guide
        <Sparkles className="inline-block ml-3 h-8 w-8 text-[#00FFA3]" />
      </h2>
      <p className="text-lg text-gray-300 font-outfit">The Photon God awaits</p>
    </div>

    <div className="flex justify-center">
      <PhotonGodCard
        physicist={godOfPhysics}
        onChat={() => {
          window.location.href = `/chat/${godOfPhysics.id}`;
        }}
      />
    </div>
  </div>
)}


          {/* Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="selected" onValueChange={(value) => setActiveTab(value as "selected" | "all")}>
              <div className="flex justify-center mb-12">
                <TabsList className="bg-[#181A20] p-1 rounded-2xl border border-[#03E1FF]/20 shadow-2xl">
                  <TabsTrigger 
                    value="selected" 
                    className="px-8 py-3 rounded-xl font-semibold font-outfit text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3] data-[state=active]:to-[#03E1FF] data-[state=active]:text-black transition-all"
                  >
                    Your Selected Physicists
                  </TabsTrigger>
                  <TabsTrigger 
                    value="all" 
                    className="px-8 py-3 rounded-xl font-semibold font-outfit text-gray-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3] data-[state=active]:to-[#03E1FF] data-[state=active]:text-black transition-all"
                  >
                    All Physicists
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="selected" className="mt-0">
                {filteredPhysicists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPhysicists.map(physicist => (
                      <div key={physicist.id} className="transform hover:scale-105 transition-transform duration-300">
                        <PhysicistCard physicist={physicist} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-[#181A20]/80 border border-[#03E1FF]/20 rounded-3xl p-12 max-w-md mx-auto">
                      <Sparkles className="h-16 w-16 text-[#00FFA3] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4 font-outfit">No Physicists Selected</h3>
                      <p className="text-gray-300 mb-8 font-outfit">
                        {filters.search || filters.timeline !== "all" || filters.topic
                          ? "No physicists match your filters"
                          : "You haven't selected any physicists yet"}
                      </p>
                      <Link to="/onboarding">
                        <Button className="bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform font-outfit">
                          Select Physicists
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="all" className="mt-0">
                {filteredPhysicists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPhysicists.map(physicist => (
                      <div key={physicist.id} className="transform hover:scale-105 transition-transform duration-300">
                        <PhysicistCard physicist={physicist} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-[#181A20]/80 border border-[#03E1FF]/20 rounded-3xl p-12 max-w-md mx-auto">
                      <Zap className="h-16 w-16 text-[#03E1FF] mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4 font-outfit">No Results Found</h3>
                      <p className="text-gray-300 font-outfit">No physicists match your current filters</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 pt-12">
            <Link to="/onboarding">
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-[#DC1FFF] text-[#DC1FFF] hover:bg-[#DC1FFF] hover:text-black px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 font-outfit"
              >
                Edit Selection
              </Button>
            </Link>
            <Link to="/journal">
              <Button className="bg-gradient-to-r from-[#03E1FF] to-[#DC1FFF] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform font-outfit">
                View Learning Journal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/create-replica">
              <Button className="bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform font-outfit">
                Create Your Own Physicist
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replicas;
