import React from "react";
import { Link } from "react-router-dom";
import { useUserReplicas } from "@/hooks/useUserReplicas";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Wallet, Atom, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MintButton } from "@/components/MintButton"; // Adjust path as needed

const Profile = () => {
  const { account } = useWallet();
  const walletAddress = account;
  const { replicas, loading, error } = useUserReplicas(walletAddress);

  if (!walletAddress) {
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
          {/* Left Panel: Wallet Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-blue-900/70 to-purple-900/60 border-none shadow-xl mb-8">
              <CardHeader className="flex flex-col items-center gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <Wallet className="text-green-400" />
                  <CardTitle className="text-white text-lg">Wallet Connected</CardTitle>
                </div>
                <CardDescription className="text-gray-300 text-xs text-center">
                  {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                </CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Atom className="text-amber-300" size={20} />
                  <span className="font-mono text-yellow-200 text-md">1,200 $PHOTON</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-xs text-gray-400">Physics is the poetry of the universe.</span>
                  <span className="text-xs text-blue-300">Your replicas earn as others chat with them.</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                  <Link to="/create-replica">+ Create New Replica</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Panel: Tabs & Replicas */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="replicas" className="w-full">
              <TabsList className="bg-black/30 backdrop-blur-sm border-none w-full mb-6">
                <TabsTrigger value="replicas" className="flex-1">My Replicas</TabsTrigger>
                <TabsTrigger value="earnings" className="flex-1">Earnings</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="replicas" className="space-y-6">
                <h2 className="text-2xl font-bold">Your Physicist Replicas</h2>
                {loading && <p className="text-gray-400">Loading your replicas...</p>}
                {error && <p className="text-red-400">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {replicas.map(replica => (
                    <Card key={replica.uuid} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-none shadow-xl hover:scale-[1.02] transition-transform">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={replica.profileImage || replica.profile_image} />
                            <AvatarFallback>{replica.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg text-white">{replica.name}</CardTitle>
                            <CardDescription className="text-blue-300">{replica.shortDescription || replica.short_description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-200">{replica.greeting || replica.introduction}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(replica.tags || []).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-900/80 text-blue-200">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Badge variant="outline" className="border-purple-400 text-purple-300 uppercase tracking-wider">
                          {replica.type}
                        </Badge>
                        <Link to={`/chat/${replica.uuid}`}>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow">
                            Start Chat
                          </Button>
                        </Link>
                        <MintButton replica={replica} />
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
