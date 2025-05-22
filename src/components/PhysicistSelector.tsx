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

  // Ensure "Photon Guide" (God of Physics) is always selected and can't be deselected
  const isGodOfPhysics = (id: string) => id === "godofphysics";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {physicists.map(physicist => {
        const selected = selectedPhysicistIds.includes(physicist.id) || isGodOfPhysics(physicist.id);
        return (
          <Card
            key={physicist.id}
            aria-selected={selected}
            tabIndex={0}
            className={`
              group cursor-pointer transition-all duration-200 rounded-xl
              ${
                selected
                  ? "border-2 border-purple-400 bg-white/5 shadow-lg"
                  : "border border-white/10 bg-white/2 hover:border-purple-300"
              }
              ${isGodOfPhysics(physicist.id) ? "pointer-events-none" : ""}
            `}
            onClick={() => !isGodOfPhysics(physicist.id) && togglePhysicist(physicist.id)}
          >
            <CardContent className="p-5 flex items-center space-x-4">
              <Avatar className="h-12 w-12 border border-white/10 shadow-sm">
                {physicist.avatar ? (
                  <AvatarImage src={physicist.avatar} alt={physicist.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                    {physicist.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3
                    className={`font-semibold text-base ${
                      selected ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {physicist.name}
                  </h3>
                  {isGodOfPhysics(physicist.id) && (
                    <Badge className="ml-2 px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-200 text-black font-semibold shadow">
                      Guide
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{physicist.specialty}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
