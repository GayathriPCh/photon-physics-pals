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
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {physicists.map(physicist => {
          const selected = selectedPhysicistIds.includes(physicist.id) || isGodOfPhysics(physicist.id);
          return (
            <Card
              key={physicist.id}
              aria-selected={selected}
              tabIndex={0}
              className={`
                group cursor-pointer transition-all duration-200 rounded-xl
                border-2 shadow-lg hover:scale-[1.02] hover:shadow-[#00FFA3]/20
                ${selected
                  ? "border-[#00FFA3] bg-[#181A20]/80"
                  : "border-[#03E1FF]/30 bg-[#181A20]/60"}
                ${isGodOfPhysics(physicist.id) ? "pointer-events-none" : ""}
              `}
              onClick={() => !isGodOfPhysics(physicist.id) && togglePhysicist(physicist.id)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative">
                  <div className={`h-14 w-14 rounded-lg border-2 ${
                    selected ? "border-[#00FFA3]" : "border-[#03E1FF]/50"
                  }`}>
                    <Avatar className="h-full w-full rounded-lg">
                      {physicist.avatar ? (
                        <AvatarImage 
                          src={physicist.avatar} 
                          alt={physicist.name} 
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="bg-[#23243a] text-[#03E1FF] font-bold text-2xl">
                          {physicist.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  {isGodOfPhysics(physicist.id) && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="px-2 py-0.5 bg-[#00FFA3] text-black font-semibold rounded-full text-xs">
                        Guide
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-[#03E1FF] truncate font-outfit">
                      {physicist.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#00FFA3] mt-1 truncate font-outfit">
                    {physicist.specialty}
                  </p>
                 
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
