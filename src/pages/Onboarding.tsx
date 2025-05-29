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
import { Sparkles, Zap } from "lucide-react";
import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import { Contract, EventLog } from 'ethers';
import '../fonts.css'
const ONBOARD_BG = "/onboard.jpg";

// Solana theme icons
const SparkleIcon = () => <Sparkles className="inline-block text-[#00FFA3] mr-1 mb-1" size={30} />;
const LightningIcon = () => <Zap className="inline-block text-[#03E1FF] mr-1 mb-1" size={16} />;

// Community hook (from your logic, untouched)
const useCommunityReplicas = () => {
  const fetchCommunityReplicas = async () => {
    const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"string","name":"sensayUUID","type":"string"},{"indexed":false,"internalType":"string","name":"tokenURI","type":"string"}],"name":"ReplicaMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getSensayUUID","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"sensayUUID","type":"string"},{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mintReplica","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sensayUUIDs","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const CONTRACT_ADDRESS = "0x9409d35495cC79C1BfAd22c730fe75E88aA3C000";
    
    // 1. Provider setup
    let provider;
    try {
      if (!window.ethereum) {
        console.error("[Community] No Ethereum provider found (window.ethereum is undefined).");
        return [];
      }
      provider = new ethers.BrowserProvider(window.ethereum);
      console.log("[Community] Connected to Ethereum provider.");
    } catch (err) {
      console.error("[Community] Failed to connect to Ethereum provider:", err);
      return [];
    }

    // 2. Contract setup
    let contract;
    try {
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      console.log("[Community] Connected to contract at:", CONTRACT_ADDRESS);
    } catch (err) {
      console.error("[Community] Failed to connect to contract:", err);
      return [];
    }

    // 3. Fetch ReplicaMinted events
    let events = [];
    try {
      const filter = contract.filters.ReplicaMinted();
      console.log("[Community] Created ReplicaMinted filter:", filter);
      events = await contract.queryFilter(filter);
      console.log(`[Community] Fetched ${events.length} ReplicaMinted events.`);
      if (events.length === 0) {
        console.warn("[Community] No ReplicaMinted events found. No community replicas exist yet.");
        return [];
      }
    } catch (err) {
      console.error("[Community] Error querying ReplicaMinted events:", err);
      return [];
    }

    // 4. Extract sensayUUIDs
    const uuids = events.map((event, idx) => {
      if ('args' in event && event.args) {
        console.log(`[Community] Event #${idx}: sensayUUID =`, event.args.sensayUUID);
        return event.args.sensayUUID;
      } else {
        console.warn(`[Community] Event #${idx} missing args.`);
        return null;
      }
    }).filter(Boolean);

    if (uuids.length === 0) {
      console.warn("[Community] No sensayUUIDs found in events.");
      return [];
    }

    // 5. Fetch replica data from API
    const responses = await Promise.all(
      uuids.map(async (uuid, idx) => {
        try {
          console.log(`[Community] Fetching replica data for UUID: ${uuid}`);
          const res = await fetch(`https://api.sensay.io/v1/replicas/${uuid}`);
          if (!res.ok) {
            console.warn(`[Community] API responded with status ${res.status} for UUID: ${uuid}`);
            return null;
          }
          const data = await res.json();
          console.log(`[Community] Received data for UUID: ${uuid}`, data);
          return data;
        } catch (err) {
          console.error(`[Community] Error fetching data for UUID: ${uuid}`, err);
          return null;
        }
      })
    );

    const validResponses = responses.filter(Boolean);
    console.log(`[Community] Fetched and validated ${validResponses.length} community replicas.`);

    // 6. Map to physicist objects
    const mapped = validResponses.map(mapReplicaToPhysicist);
    console.log("[Community] Final mapped community replicas:", mapped);

    return mapped;
  };

  return useQuery({
    queryKey: ['community-replicas'],
    queryFn: fetchCommunityReplicas
  });
};

const Onboarding = () => {
  const { replicas, loading, error } = useSensayReplicas();
  const { setSelectedInterests, setSelectedPhysicists } = useUserContext();
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedPhysicistIds, setSelectedPhysicistIds] = useState<string[]>([]);
  const physicists = replicas.map(mapReplicaToPhysicist);
  const navigate = useNavigate();
  const { data: communityReplicas } = useCommunityReplicas();

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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-outfit"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(0,255,163,0.13) 0%, rgba(3,225,255,0.13) 50%, rgba(220,31,255,0.13) 100%),
          url(${ONBOARD_BG}),
          linear-gradient(120deg, #000 0%, #181A20 100%)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
      }}
    >
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#000000] flex items-center justify-center gap-2 drop-shadow-lg"  style={{ fontFamily: 'cyber' }}>
          <SparkleIcon />
          G'day mate! Whom do you want to get acquainted with today?
          <SparkleIcon />
        </h1>

        {/* Interests */}
        <Card className="mb-8 border-none shadow-lg bg-[#181A20]/90 backdrop-blur-lg text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#03E1FF] text-xl">
              <SparkleIcon />
              Choose Your Interests
            </CardTitle>
            <CardDescription className="text-[#00FFA3]">
              <LightningIcon /> Select topics that excite you most.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InterestSelector
              selectedInterests={interests}
              onSelectionChange={setInterests}
            />
          </CardContent>
        </Card>

        {/* Physicists */}
        <Card className="mb-8 border-none shadow-lg bg-[#181A20]/90 backdrop-blur-lg text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#03E1FF] text-xl">
              <SparkleIcon />
              Choose Physicists
            </CardTitle>
            <CardDescription className="text-[#00FFA3]">
              <LightningIcon /> Select your favorite minds to chat with.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-[#03E1FF] flex items-center gap-2">
                <SparkleIcon /> Loading physicists...
              </div>
            ) : error ? (
              <div className="text-[#DC1FFF]">Error loading physicists.</div>
            ) : (
              <PhysicistSelector
                physicists={physicists}
                selectedPhysicistIds={selectedPhysicistIds}
                onSelectionChange={setSelectedPhysicistIds}
              />
            )}
          </CardContent>
        </Card>

        {/* Community */}
        <Card className="mb-8 border-none shadow-lg bg-[#181A20]/90 backdrop-blur-lg text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#03E1FF] text-xl">
              <SparkleIcon />
              From the Community
            </CardTitle>
            <CardDescription className="text-[#00FFA3]">
              <LightningIcon /> Popular physicist replicas created by others
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
              <div className="text-[#03E1FF] flex items-center gap-2">
                <SparkleIcon /> No community replicas yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            className="mt-2 bg-gradient-to-r from-[#227657] via-[#03E1FF] to-[#DC1FFF] text-black font-bold text-lg px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            onClick={handleContinue}
          >
            <LightningIcon />
            Let's go people!
            <SparkleIcon />
          </Button>
        </div>
      </div>
      <style>{`
        * { font-family: 'Outfit', sans-serif !important; }
        ::selection { background: #03E1FF44; }
      `}</style>
    </div>
  );
};

export default Onboarding;
