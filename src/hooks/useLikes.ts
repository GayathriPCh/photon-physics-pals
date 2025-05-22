
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const useLikes = () => {
  // In a real app, this would be synchronized with a database
  const [likedPhysicists, setLikedPhysicists] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleLike = (physicistId: string) => {
    setLikedPhysicists(prev => {
      const isCurrentlyLiked = prev[physicistId];
      
      toast({
        title: isCurrentlyLiked ? "Replica Unliked" : "Replica Liked",
        description: isCurrentlyLiked 
          ? "You've removed your like from this physicist replica" 
          : "You've liked this physicist replica",
        variant: isCurrentlyLiked ? "destructive" : "default",
      });
      
      return {
        ...prev,
        [physicistId]: !isCurrentlyLiked
      };
    });
    
    return !likedPhysicists[physicistId];
  };

  const isLiked = (physicistId: string) => {
    return !!likedPhysicists[physicistId];
  };

  return {
    toggleLike,
    isLiked,
    likedPhysicists
  };
};
