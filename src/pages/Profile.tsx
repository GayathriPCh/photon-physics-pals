
import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, User, Star, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { wallet, photonTokens } = useUserContext();
  
  // Mock data for user's replicas
  const userReplicas = [
    {
      id: "quantum-jester",
      name: "The Quantum Jester",
      specialty: "Quantum Mechanics Simplified",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=quantumjester",
      tokenId: "123",
      engagement: {
        messages: 542,
        likes: 128,
        bookmarks: 37
      }
    },
    {
      id: "fluids-witch",
      name: "The Fluids Witch",
      specialty: "Fluid Dynamics & Thermodynamics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fluidswitch",
      tokenId: "124",
      engagement: {
        messages: 327,
        likes: 98,
        bookmarks: 24
      }
    }
  ];
  
  if (!wallet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 pt-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[70vh]">
          <h1 className="text-3xl font-bold mb-6">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-8 text-center max-w-md">
            Connect your wallet to access your profile, view your replicas, and track your $PHOTON earnings.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              <BreadcrumbLink asChild>
                <Link to="/profile">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="h-16 w-16 border-2 border-purple-500">
                    <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${wallet.address}`} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-xl">Creator Profile</span>
                    <Badge className="ml-2 bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Verified
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Wallet Address</p>
                  <p className="font-mono text-sm">{wallet.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-gray-400">Balance</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Wallet size={14} />
                      <p>{wallet.balance}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-4 rounded-lg border border-yellow-500/20">
                    <p className="text-sm text-gray-400">$PHOTON</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} className="text-yellow-400" />
                      <p>{photonTokens?.balance}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Lifetime Earnings</p>
                  <div className="bg-gradient-to-r from-amber-400/20 to-yellow-200/20 p-3 rounded-lg border border-yellow-500/20 mt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-100">${photonTokens?.earned} $PHOTON</span>
                      <Star size={16} className="text-yellow-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/create-replica" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                    Create New Replica
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="replicas" className="w-full">
              <TabsList className="bg-black/30 backdrop-blur-sm border-none w-full mb-6">
                <TabsTrigger value="replicas" className="flex-1">My Replicas</TabsTrigger>
                <TabsTrigger value="earnings" className="flex-1">Earnings</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="replicas" className="space-y-6">
                <h2 className="text-2xl font-bold">Your Physicist Replicas</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userReplicas.map(replica => (
                    <Card key={replica.id} className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={replica.avatar} />
                            <AvatarFallback>{replica.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{replica.name}</CardTitle>
                            <CardDescription>{replica.specialty}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-3 gap-1 text-center">
                          <div>
                            <p className="text-sm text-gray-400">Messages</p>
                            <p className="font-semibold">{replica.engagement?.messages}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Likes</p>
                            <p className="font-semibold">{replica.engagement?.likes}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Bookmarks</p>
                            <p className="font-semibold">{replica.engagement?.bookmarks}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          Token #{replica.tokenId}
                        </Badge>
                        <Link to={`/edit-replica/${replica.id}`}>
                          <Button size="sm" variant="outline">Edit</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="earnings" className="space-y-6">
                <h2 className="text-2xl font-bold">Earnings Dashboard</h2>
                <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>$PHOTON Earnings</CardTitle>
                    <CardDescription>Track your earnings from replica engagement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 flex items-center justify-center">
                      <p className="text-gray-400">Earnings chart will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">Settings options will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
