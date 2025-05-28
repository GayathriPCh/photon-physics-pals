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
      {/* Heading and subheading */}
      <div className="mb-6">
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "'Outfit', sans-serif", backgroundImage: "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
             WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", }}
        >
          Choose whom to speak with
        </h2>
        <p
          className="text-base md:text-lg font-medium mt-1"
          style={{
            fontFamily: "'Outfit', sans-serif",
             // Lemon yellow 
             backgroundImage: "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
             WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
            letterSpacing: "0.01em"
          }}
        >
          Select the brilliant minds you'd like to chat with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {physicists.map(physicist => {
          const selected = selectedPhysicistIds.includes(physicist.id) || isGodOfPhysics(physicist.id);
          return (
            <Card
              key={physicist.id}
              aria-selected={selected}
              tabIndex={0}
              className={`
                group cursor-pointer transition-all duration-200 rounded-xl
                border-2 shadow-lg
                ${selected
                  ? "border-green-400"
                  : "border-transparent"}
                ${isGodOfPhysics(physicist.id) ? "pointer-events-none" : ""}
              `}
              style={{
                fontFamily: "'Outfit', sans-serif",
                minHeight: 120,
backgroundImage: "linear-gradient(145deg, #0d0d0d, #1a1a1a, #2c2c2e, #3a2f4a, #1a1a1a)"
              }}
              onClick={() => !isGodOfPhysics(physicist.id) && togglePhysicist(physicist.id)}
            >
              <CardContent className="p-6 flex items-center gap-5">
                {/* Square avatar with neon green border */}
                <div
                  className="h-14 w-14 rounded-lg flex items-center justify-center bg-[#18181c]"
                  style={{
                    border: "3px solid #03fcdb", // Neon green
                    overflow: "hidden",
                  }}
                >
                  <Avatar className="h-14 w-14 rounded-lg">
                    {physicist.avatar ? (
                      <AvatarImage src={physicist.avatar} alt={physicist.name} className="object-cover h-full w-full rounded-lg" />
                    ) : (
                      <AvatarFallback className="bg-[#18181c] text-white font-bold text-2xl rounded-lg">
                        {physicist.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className="font-bold text-xl truncate text-white"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {physicist.name}
                    </h3>
                    {isGodOfPhysics(physicist.id) && (
                      <Badge className="ml-2 px-2 py-0.5 bg-[#18181c] text-green-400 font-semibold rounded text-xs border border-green-800">
                        Guide
                      </Badge>
                    )}
                  </div>
                  <p className="text-base text-neutral-300 mt-1 truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
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
