import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { InterestSelector } from "@/components/InterestSelector";
import { PhysicistSelector } from "@/components/PhysicistSelector";
import { useSensayReplicas } from "@/hooks/useSensayReplicas";
import { mapReplicaToPhysicist } from "@/utils/mapReplicaToPhysicist";
import { useUserContext } from "@/context/UserContext";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Contract, EventLog } from 'ethers';

const ONBOARD_BG = "/onboard.jpg";

// Add this new hook
const useCommunityReplicas = () => {
  const fetchCommunityReplicas = async () => {
    const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"sensayUUID","type":"string"},{"indexed":false,"internalType":"string","name":"tokenURI","type":"string"}],"name":"ReplicaMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSensayUUID","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"sensayUUID","type":"string"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintReplica","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sensayUUIDs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const CONTRACT_ADDRESS = "0x9409d35495cC79C1BfAd22c730fe75E88aA3C000";
    console.log("[Community] Connecting to contract...");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

    // Get all mint events
    console.log("[Community] Fetching ReplicaMinted events...");
    const filter = contract.filters.ReplicaMinted();
    const events = await contract.queryFilter(filter);
    console.log(`[Community] Found ${events.length} mint events:`, events);

    // Extract UUIDs (with logs)
    const uuids = events.map((event, idx) => {
      if ('args' in event && event.args) {
        console.log(`[Community] Event #${idx} args:`, event.args);
        return event.args.sensayUUID;
      }
      console.warn(`[Community] Event #${idx} missing args:`, event);
      return null;
    }).filter(Boolean);

    console.log("[Community] Extracted UUIDs:", uuids);

    // Fetch Sensay data for each UUID
    const responses = await Promise.all(
      uuids.map(async (uuid, idx) => {
        try {
          console.log(`[Community] Fetching Sensay replica for UUID: ${uuid}`);
          const res = await fetch(`https://api.sensay.io/v1/replicas/${uuid}`);
          if (!res.ok) {
            console.error(`[Community] Sensay API error for UUID ${uuid}:`, res.status);
            return null;
          }
          const data = await res.json();
          console.log(`[Community] Sensay data for UUID ${uuid}:`, data);
          return data;
        } catch (err) {
          console.error(`[Community] Error fetching UUID ${uuid}:`, err);
          return null;
        }
      })
    );

    // Filter out failed/null responses
    const validResponses = responses.filter(Boolean);
    console.log("[Community] Valid Sensay responses:", validResponses);

    // Map to physicist objects
    const mapped = validResponses.map(mapReplicaToPhysicist);
    console.log("[Community] Final mapped community physicists:", mapped);

    return mapped;
  };

  return useQuery({
    queryKey: ['community-replicas'],
    queryFn: fetchCommunityReplicas
  });
};

const Onboarding = () => {
  console.log("[Onboarding] Component mounted");
  
  const { replicas, loading, error } = useSensayReplicas();
  console.log("[Onboarding] replicas:", replicas);
  console.log("[Onboarding] loading:", loading);
  console.log("[Onboarding] error:", error);

  const { setSelectedInterests, setSelectedPhysicists } = useUserContext();
  
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedPhysicistIds, setSelectedPhysicistIds] = useState<string[]>([]);

  // Map Sensay replicas to your physicist format
  const physicists = replicas.map(mapReplicaToPhysicist);
  console.log("[Onboarding] mapped physicists:", physicists);

  const handleContinue = () => {
    console.log("[Onboarding] handleContinue called");
    console.log("[Onboarding] interests:", interests);
    console.log("[Onboarding] selectedPhysicistIds:", selectedPhysicistIds);

    if (interests.length === 0) {
      console.log("[Onboarding] No interests selected, showing toast");
      toast({
        title: "Select interests",
        description: "Please select at least one area of interest",
        variant: "destructive",
      });
      return;
    }
    if (selectedPhysicistIds.length === 0) {
      console.log("[Onboarding] No physicists selected, showing toast");
      toast({
        title: "Select physicists",
        description: "Please select at least one physicist to chat with",
        variant: "destructive",
      });
      return;
    }
    setSelectedInterests(interests);
    setSelectedPhysicists(selectedPhysicistIds);
    console.log("[Onboarding] Updated user context with interests and physicists");
    
    toast({
      title: "Welcome to Photon!",
      description: "Your physics journey begins now",
    });
    console.log("[Onboarding] Navigating to /replicas");
    navigate("/replicas");
  };

  const navigate = useNavigate();
  const { data: communityReplicas } = useCommunityReplicas();

  return (
 <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url(${ONBOARD_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
      }}
    >
            <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-black">
          G'day mate! Whom do you want to get acquainted with today?
        </h1>
        
        <Card className="mb-8 border-none shadow-lg bg-black/20 backdrop-blur-sm text-white">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <InterestSelector 
              selectedInterests={interests} 
              onSelectionChange={(newInterests) => {
                console.log("[Onboarding] interests changed:", newInterests);
                setInterests(newInterests);
              }} 
            />
          </CardContent>
        </Card>
        
        <Card className="mb-8 border-none shadow-lg bg-black/20 backdrop-blur-sm text-white">
          <CardHeader>
            
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading physicists...</div>
            ) : error ? (
              <div>Error loading physicists.</div>
            ) : (
              <PhysicistSelector 
                physicists={physicists} 
                selectedPhysicistIds={selectedPhysicistIds}
                onSelectionChange={(newIds) => {
                  console.log("[Onboarding] selectedPhysicistIds changed:", newIds);
                  setSelectedPhysicistIds(newIds);
                }}
              />
            )}
          </CardContent>
        </Card>
        <Card className="mb-8 border-none shadow-lg bg-black/20 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle>From the Community</CardTitle>
            <CardDescription className="text-gray-300">
              Popular physicist replicas created by others
            </CardDescription>
          </CardHeader>
          <CardContent>
            {communityReplicas?.length ? (
              <PhysicistSelector
                physicists={communityReplicas}
                selectedPhysicistIds={[]}
                onSelectionChange={() => {}}
              />
            ) : (
              <div className="text-gray-400">No community replicas yet</div>
            )}
          </CardContent>
        </Card>
        <div className="flex justify-center">
          <button
        className="mt-2 text-black bg-gradient-to-r from-green-300 via-blue-600 to-green-200
 hover:from-sky-600 hover:to-orange-500 focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold text-lg px-6 py-3 rounded-full shadow-lg transition-all font-body tracking-wide" 
        style={{ fontFamily: "'Outfit', sans-serif" }}
        onClick={handleContinue}
      >
        Let's go people!
      </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
