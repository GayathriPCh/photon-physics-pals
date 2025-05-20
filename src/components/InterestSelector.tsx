
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
      {physicsInterests.map(interest => (
        <Badge
          key={interest}
          variant={selectedInterests.includes(interest) ? "default" : "outline"}
          className={`cursor-pointer text-sm py-2 px-3 ${
            selectedInterests.includes(interest) 
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-transparent hover:bg-white/5"
          }`}
          onClick={() => toggleInterest(interest)}
        >
          {interest}
        </Badge>
      ))}
    </div>
  );
};
