import React from "react";
import { Link } from "react-router-dom";
import { useUserReplicas } from "@/hooks/useUserReplicas";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Wallet, Atom, Star, Plus, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MintButton } from "@/components/MintButton";

const solanaGradient = "linear-gradient(135deg, rgba(0,255,163,0.16) 0%, rgba(3,225,255,0.13) 50%, rgba(220,31,255,0.13) 100%)";

const Profile: React.FC = () => {
  const { account } = useWallet();
  const walletAddress = account;
  const { replicas, loading, error } = useUserReplicas(walletAddress);

  if (!walletAddress) {
    return (
      <div 
        className="min-h-screen flex flex-col font-outfit"
        style={{
          backgroundImage: `${solanaGradient}, linear-gradient(135deg, #000000 0%, #1a1a2e 100%)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-1 flex flex-col bg-black/70 backdrop-blur-lg p-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-[70vh]">
            <div className="text-center p-8 bg-[#181A20]/95 rounded-2xl border border-[#03E1FF]/30 shadow-xl">
              <Wallet className="h-16 w-16 text-[#03E1FF] mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-6 text-white">Connect Your Wallet</h1>
              <p className="text-[#03E1FF] mb-8 text-center max-w-md">
                Connect your wallet to access your profile, view your replicas, and track your $PHOTON earnings.
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-[#DC1FFF] to-[#03E1FF] text-black font-bold hover:scale-105 transition-transform font-outfit">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col font-outfit"
      style={{
        backgroundImage: `${solanaGradient}, linear-gradient(135deg, #000000 0%, #1a1a2e 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 flex flex-col bg-black/70 backdrop-blur-lg p-6">
        <div className="max-w-7xl mx-auto w-full">
          <Breadcrumb className="mb-8 text-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home size={16} /></Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/profile">Profile</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Wallet Card */}
            <div className="lg:col-span-1">
              <Card className="bg-[#181A20]/95 border-2 border-[#03E1FF]/30 shadow-2xl mb-8 rounded-2xl">
                <CardHeader className="flex flex-col items-center gap-2 pb-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="text-[#00FFA3]" />
                    <CardTitle className="text-white text-lg font-outfit">Wallet Connected</CardTitle>
                  </div>
                  <CardDescription className="text-[#03E1FF] text-xs text-center font-outfit">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2 p-2 bg-gradient-to-r from-[#00FFA3]/20 to-[#03E1FF]/20 rounded-lg">
                    <Atom className="text-[#00FFA3]" size={20} />
                    <span className="font-mono text-[#00FFA3] text-md font-bold font-outfit">1,200 $PHOTON</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 mt-4 p-3 bg-[#23243a]/50 rounded-xl">
                    <span className="text-xs text-[#03E1FF] font-outfit">Physics is the poetry of the universe.</span>
                    <span className="text-xs text-[#DC1FFF] font-outfit">Your replicas earn as others chat with them.</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold hover:scale-105 transition-transform font-outfit">
                    <Link to="/create-replica">+ Create New Replica</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Panel: Tabs & Replicas */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="replicas" className="w-full">
                <TabsList className="bg-[#181A20]/95 backdrop-blur-sm border border-[#03E1FF]/30 w-full mb-6 font-outfit">
                  <TabsTrigger 
                    value="replicas" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3]/20 data-[state=active]:to-[#03E1FF]/20 data-[state=active]:text-[#1a3912] text-white font-outfit"
                  >
                    My Replicas
                  </TabsTrigger>
                  <TabsTrigger 
                    value="earnings" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#DC1FFF]/20 data-[state=active]:to-[#03E1FF]/20 data-[state=active]:text-[#DC1FFF] text-white font-outfit"
                  >
                    Earnings
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#03E1FF]/20 data-[state=active]:to-[#DC1FFF]/20 data-[state=active]:text-[#0353ff] text-white font-outfit"
                  >
                    Settings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="replicas" className="space-y-6">
                  <h2 className="text-2xl font-bold text-white font-outfit">Your Physicist Replicas</h2>
                  
                  {loading && (
                    <div className="text-center p-8 bg-[#181A20]/95 rounded-2xl border border-[#03E1FF]/30">
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#03E1FF]"></div>
                        <p className="text-[#03E1FF] font-outfit">Loading your replicas...</p>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="text-center p-8 bg-[#181A20]/95 rounded-2xl border border-[#DC1FFF]/30">
                      <Sparkles className="h-16 w-16 text-[#00FFA3] mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2 font-outfit">Ready to Create Your First Replica?</h3>
                      <p className="text-[#03E1FF] mb-6 font-outfit max-w-md mx-auto">
                        Looks like you haven't created any replicas. Get started by creating a portal for a physicist we might've missed!
                      </p>
                      <Link to="/create-replica">
                        <Button className="bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold hover:scale-105 transition-transform font-outfit inline-flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Create Your First Replica
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  {!loading && !error && (!replicas || replicas.length === 0) && (
                    <div className="text-center p-12 bg-[#181A20]/95 rounded-2xl border border-[#00FFA3]/30 shadow-xl">
                      <Sparkles className="h-16 w-16 text-[#00FFA3] mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2 font-outfit">Ready to Create Your First Replica?</h3>
                      <p className="text-[#03E1FF] mb-6 font-outfit max-w-md mx-auto">
                        Looks like you haven't created any replicas. Get started by creating a portal for a physicist we might've missed!
                      </p>
                      <Link to="/create-replica">
                        <Button className="bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold hover:scale-105 transition-transform font-outfit inline-flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Create Your First Replica
                        </Button>
                      </Link>
                    </div>
                  )}

                  {replicas && replicas.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {replicas.map(replica => (
                        <Card key={replica.uuid} className="bg-[#181A20]/95 border border-[#DC1FFF]/30 shadow-xl hover:scale-[1.02] transition-transform rounded-2xl">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={replica.profileImage || replica.profile_image}
                                alt={replica.name}
                                className="h-12 w-12 object-cover rounded-lg border-2 border-[#03E1FF] shadow-md"
                              />
                              <div>
                                <CardTitle className="text-lg text-white font-outfit">{replica.name}</CardTitle>
                                <CardDescription className="text-[#03E1FF] font-outfit">{replica.shortDescription || replica.short_description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-gray-200 font-outfit">{replica.greeting || replica.introduction}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {(replica.tags || []).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-[#00FFA3]/20 text-[#00FFA3] border border-[#00FFA3]/30 font-outfit">{tag}</Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <Badge variant="outline" className="border-[#DC1FFF] text-[#DC1FFF] uppercase tracking-wider font-outfit">
                              {replica.type}
                            </Badge>
                            <Link to={`/chat/${replica.uuid}`}>
                              <Button size="sm" className="bg-gradient-to-r from-[#03E1FF] to-[#DC1FFF] text-black font-bold shadow hover:scale-105 transition-transform font-outfit">
                                Start Chat
                              </Button>
                            </Link>
                            <MintButton replica={replica} />
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="earnings" className="space-y-6">
                  <h2 className="text-2xl font-bold text-white font-outfit">Earnings Dashboard</h2>
                  <Card className="bg-[#181A20]/95 border border-[#00FFA3]/30 shadow-2xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white font-outfit">$PHOTON Earnings</CardTitle>
                      <CardDescription className="text-[#03E1FF] font-outfit">Track your earnings from replica engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 flex items-center justify-center">
                        <p className="text-[#03E1FF] font-outfit">Earnings chart will be displayed here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <h2 className="text-2xl font-bold text-white font-outfit">Profile Settings</h2>
                  <Card className="bg-[#181A20]/95 border border-[#DC1FFF]/30 shadow-2xl rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white font-outfit">Account Settings</CardTitle>
                      <CardDescription className="text-[#03E1FF] font-outfit">Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#03E1FF] font-outfit">Settings options will appear here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom scrollbar styling */}
      <style>{`
        * {
          font-family: 'Outfit', sans-serif !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00FFA3 0%, #03E1FF 70%, #DC1FFF 100%);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
