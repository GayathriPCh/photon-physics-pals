
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Physicist } from "@/types";

interface PhysicistSelectorProps {
  physicists: Physicist[];
  selectedPhysicistIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const PhysicistSelector: React.FC<PhysicistSelectorProps> = ({
  physicists,
  selectedPhysicistIds,
  onSelectionChange
}) => {
  const togglePhysicist = (id: string) => {
    if (selectedPhysicistIds.includes(id)) {
      onSelectionChange(selectedPhysicistIds.filter(pid => pid !== id));
    } else {
      onSelectionChange([...selectedPhysicistIds, id]);
    }
  };
  
  // Ensure "God of Physics" is always selected and can't be deselected
  const isGodOfPhysics = (id: string) => id === "godofphysics";
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {physicists.map(physicist => (
        <Card 
          key={physicist.id}
          className={`cursor-pointer transition-all border-2 ${
            selectedPhysicistIds.includes(physicist.id) || isGodOfPhysics(physicist.id)
              ? "border-purple-500 bg-purple-500/10" 
              : "border-gray-700 bg-black/20 hover:border-gray-500"
          }`}
          onClick={() => !isGodOfPhysics(physicist.id) && togglePhysicist(physicist.id)}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            <Avatar className="h-12 w-12 border border-white/20">
              <AvatarImage src={physicist.avatar} alt={physicist.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500">
                {physicist.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="font-medium">{physicist.name}</h3>
                {isGodOfPhysics(physicist.id) && (
                  <Badge className="ml-2 bg-gradient-to-r from-amber-400 to-yellow-200 text-black">Guide</Badge>
                )}
              </div>
              <p className="text-xs text-gray-400">{physicist.specialty}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
