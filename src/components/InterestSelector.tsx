import React from "react";
import { Badge } from "@/components/ui/badge";

const physicsInterests = [
  "Mechanics",
  "Thermodynamics",
  "Electromagnetism",
  "Optics",
  "Quantum Physics",
  "Relativity",
  "Nuclear Physics",
  "Astrophysics",
  "Fluid Dynamics",
  "Acoustics",
  "Particle Physics",
  "String Theory",
  "Atomic Physics",
  "Condensed Matter",
  "Plasma Physics"
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onSelectionChange: (interests: string[]) => void;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterests,
  onSelectionChange
}) => {
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onSelectionChange(selectedInterests.filter(i => i !== interest));
    } else {
      onSelectionChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {physicsInterests.map(interest => {
        const selected = selectedInterests.includes(interest);
        return (
          <Badge
            key={interest}
            variant="default"
            className={`
              cursor-pointer text-sm py-2 px-4 rounded-full transition
              ${selected 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md border-none"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20 font-normal"
              }
            `}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </Badge>
        );
      })}
    </div>
  );
};
