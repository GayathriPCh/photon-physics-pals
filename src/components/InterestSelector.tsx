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
      className="w-full max-w-4xl mx-auto rounded-2xl p-8"
      style={{
        background: "rgba(255,255,255,0.13)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
        backdropFilter: "blur(12px)",
      }}
    >
        <h2
          className="text-2xl md:text-3xl font-bold"
          style={{ fontFamily: "'Outfit', sans-serif", backgroundImage: "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
             WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", }}
        >
        
        What physics topics interest you?
      </h2>
      <p
        className="text-base md:text-lg font-medium mb-6"
        style={{
          fontFamily: "'Outfit', sans-serif",
          background: "linear-gradient(90deg,#96fbc4 0%,#fff44f 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.01em",
        }}
      >
        Select areas of physics you'd like to explore
      </p>
      <div className="flex flex-wrap gap-4">
        {physicsInterests.map(interest => {
          const selected = selectedInterests.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`
                transition-all duration-150 select-none
                px-6 py-2 rounded-full text-lg font-bold
                ${selected
                  ? "bg-gradient-to-r from-green-300 via-blue-600 to-green-200 text-black shadow-md"
                  : "bg-[#35363a] text-white hover:bg-[#43454a] border border-transparent"
                }
              `}
              style={{
                fontFamily: "'Outfit', sans-serif",
                outline: "none",
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
