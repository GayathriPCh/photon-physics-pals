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
    <div
      className="w-full max-w-4xl mx-auto rounded-2xl p-6 md:p-8 border border-[#03E1FF]/30"
      style={{
        background: "rgba(24, 26, 32, 0.8)", // #181A20 with transparency
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(0, 255, 163, 0.15)"
      }}
    >
      <div className="flex flex-wrap gap-3">
        {physicsInterests.map(interest => {
          const selected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`
                transition-all duration-150 select-none
                px-4 py-2 rounded-xl text-base font-semibold
                border-2 hover:scale-105
                ${selected
                  ? "bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] text-black shadow-lg shadow-[#00FFA3]/20"
                  : "bg-[#23243a] border-[#03E1FF]/20 text-[#03E1FF] hover:border-[#00FFA3]/50 hover:bg-[#23243a]/80"
                }
              `}
              style={{
                fontFamily: "'Outfit', sans-serif",
                outline: "none",
                transitionProperty: "transform, background, box-shadow"
              }}
            >
              {interest}
            </button>
          );
        })}
      </div>
    </div>
  );
};
