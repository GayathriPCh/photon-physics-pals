
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { InterestSelector } from "@/components/InterestSelector";
import { PhysicistSelector } from "@/components/PhysicistSelector";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useUserContext } from "@/context/UserContext";

const Onboarding = () => {
  const { physicists } = usePhysicists();
  const { setSelectedInterests, setSelectedPhysicists } = useUserContext();
  const navigate = useNavigate();
  
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedPhysicistIds, setSelectedPhysicistIds] = useState<string[]>([]);
  
  const handleContinue = () => {
    if (interests.length === 0) {
      toast({
        title: "Select interests",
        description: "Please select at least one area of interest",
        variant: "destructive",
      });
      return;
    }

    if (selectedPhysicistIds.length === 0) {
      toast({
        title: "Select physicists",
        description: "Please select at least one physicist to chat with",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedInterests(interests);
    setSelectedPhysicists(selectedPhysicistIds);
    
    toast({
      title: "Welcome to Photon!",
      description: "Your physics journey begins now",
    });
    
    navigate("/replicas");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Photon</span>
        </h1>
        
        <Card className="mb-8 border-none shadow-lg bg-black/20 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>What physics topics interest you?</CardTitle>
            <CardDescription className="text-gray-300">
              Select areas of physics you'd like to explore
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterestSelector 
              selectedInterests={interests} 
              onSelectionChange={setInterests} 
            />
          </CardContent>
        </Card>
        
        <Card className="mb-8 border-none shadow-lg bg-black/20 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>Choose your physics mentors</CardTitle>
            <CardDescription className="text-gray-300">
              Select the brilliant minds you'd like to chat with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PhysicistSelector 
              physicists={physicists} 
              selectedPhysicistIds={selectedPhysicistIds}
              onSelectionChange={setSelectedPhysicistIds}
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-6"
            size="lg" 
            onClick={handleContinue}
          >
            Begin Your Physics Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
