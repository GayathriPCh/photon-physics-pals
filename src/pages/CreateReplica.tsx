import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InterestSelector } from "@/components/InterestSelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Wallet, Upload, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  specialty: z.string().min(5, "Specialty must be at least 5 characters"),
  era: z.string().min(2, "Era must be at least 2 characters"),
  bio: z.string().min(50, "Bio should be at least 50 characters"),
  knownFor: z.string().min(5, "Known for must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const CreateReplica = () => {
  const { wallet, connectWallet } = useUserContext();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`);
  const [wallpaper, setWallpaper] = useState<string>(`https://source.unsplash.com/random/800x400/?physics,${Math.random()}`);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      specialty: "",
      era: "Modern",
      bio: "",
      knownFor: "",
    },
  });

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (values: FormValues) => {
    if (!wallet) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to create a replica",
        variant: "destructive",
      });
      return;
    }

    if (topics.length === 0) {
      toast({
        title: "Topics Required",
        description: "Please select at least one topic for your replica",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Replica Created!",
      description: "Your physicist replica will be available after review",
    });

    // In a real implementation, this would call a contract to mint the NFT
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  const regenerateAvatar = () => {
    setAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`);
  };

  const regenerateWallpaper = () => {
    setWallpaper(`https://source.unsplash.com/random/800x400/?physics,${Math.random()}`);
  };

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
                <Link to="/create-replica">Create Replica</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Create Your Physicist Replica</h1>
          <p className="text-gray-300 max-w-2xl">
            Design your own physicist character that can share knowledge with the Photon community.
            Once created, your replica will be minted as an NFT and can earn you $PHOTON tokens based on user engagement.
          </p>
        </div>

        {!wallet ? (
          <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>
                You need to connect your wallet to create a replica and mint it as an NFT
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-6">
              <Button 
                onClick={handleConnectWallet}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                size="lg"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg sticky top-24">
                    <CardHeader>
                      <CardTitle className="text-white">Replica Preview</CardTitle>
                      <CardDescription className="text-gray-300">
                        How your physicist will appear to users
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative rounded-lg overflow-hidden">
                        <img 
                          src={wallpaper} 
                          alt="Wallpaper" 
                          className="w-full h-32 object-cover"
                        />
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="absolute bottom-2 right-2 bg-black/50" 
                          onClick={regenerateWallpaper}
                        >
                          <Upload size={14} className="mr-1" color="white"/> Change
                        </Button>
                        <div className="absolute bottom-2 left-2 flex items-center">
                          <Avatar className="border-2 border-white h-14 w-14">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-white text-white">
                              {form.watch("name").charAt(0) || "P"}
                            </AvatarFallback>
                          </Avatar>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="ml-2 bg-black/50" 
                            onClick={regenerateAvatar}
                          >
                            <Upload size={14} className="mr-1" color="white" /> Avatar
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg text-white">{form.watch("name") || "Your Physicist Name"}</h3>
                        <p className="text-sm text-white">{form.watch("specialty") || "Physicist specialty"}</p>
                        
                        <div className="mt-4">
                          <Badge variant="outline" className="border-blue-400 text-blue-400">
                            {form.watch("knownFor") || "Known for..."}
                          </Badge>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-xs text-gray-500">Creator</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <p className="text-xs text-gray-300">{wallet.address}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2">
                      <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-3 rounded w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-amber-200">Potential Earnings</span>
                          <Star size={16} className="text-yellow-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Earn $PHOTON based on user engagement</p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-white">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Physicist Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Dr. Neutrino, The Quantum Jester" 
                                {...field} 
                                className="bg-black/50 border-gray-700"
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              Choose a memorable name for your physicist replica
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Specialty</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Quantum Mechanics, Fluid Dynamics" 
                                  {...field} 
                                  className="bg-black/50 border-gray-700"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                Main area of expertise
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="era"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Era</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Modern, 21st Century, Fictional" 
                                  {...field} 
                                  className="bg-black/50 border-gray-700"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-400">
                                Time period or setting
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Biography</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Write a compelling backstory for your physicist character..." 
                                {...field} 
                                className="bg-black/50 border-gray-700 min-h-[120px]"
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              Minimum 50 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="knownFor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Known For</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Pioneering Dark Matter Theory" 
                                {...field} 
                                className="bg-black/50 border-gray-700"
                              />
                            </FormControl>
                            <FormDescription className="text-gray-400">
                              A tagline or primary achievement
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 backdrop-blur-sm border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-white">Topics & Knowledge Areas</CardTitle>
                      <CardDescription className="text-gray-300">
                        Select topics that your physicist can explain to users
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InterestSelector
                        selectedInterests={topics}
                        onSelectionChange={setTopics}
                      />
                      {topics.length === 0 && (
                        <p className="text-red-400 text-sm mt-2">Please select at least one topic</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-end gap-4">
                    <Link to="/profile">
                      <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                      Create & Mint Replica
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CreateReplica;
