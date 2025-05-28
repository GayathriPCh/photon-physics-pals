import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MessageCircle, Heart } from "lucide-react";
import { Physicist } from "@/types";
import { useLikes } from "@/hooks/useLikes";

const PHOTON_GOD_WALLPAPER =
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f914c869-b03c-4e58-9ff0-d0fb340ba97f/djqle2x-b351a03a-c94e-48fa-866d-bc9363c55ef0.jpg/v1/fill/w_1183,h_676,q_70,strp/a_mysterious_world_ruled_by_quantum_mechanics_by_giorgioquepee8081_djqle2x-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvZjkxNGM4NjktYjAzYy00ZTU4LTlmZjAtZDBmYjM0MGJhOTdmXC9kanFsZTJ4LWIzNTFhMDNhLWM5NGUtNDhmYS04NjZkLWJjOTM2M2M1NWVmMC5qcGciLCJ3aWR0aCI6Ijw9MTM0NCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.HEpE2bv5Gg5fCmm29K44ewuReYPxEsMXl65V6DAUmW0";
interface PhysicistCardProps {
  physicist: Physicist;
  featured?: boolean;
}

export const PhysicistCard: React.FC<PhysicistCardProps> = ({
  physicist,
  featured = false,
}) => {
  const { toggleLike, isLiked } = useLikes();
  const liked = isLiked(physicist.id);

  // Identify Photon God by id or name
  const isPhotonGod =
    physicist.id === "90af87a0-bc41-4e40-aacd-494fdfdfadd2" ||
    physicist.name.toLowerCase().includes("photon");

  // Use special wallpaper for Photon God
  const wallpaper = isPhotonGod
    ? PHOTON_GOD_WALLPAPER
    : physicist.wallpaper;

  return (
    <Card
      className={`
        overflow-hidden border-none shadow-xl rounded-2xl
        transition-all
        ${featured ? "w-full max-w-3xl" : ""}
      `}
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "linear-gradient(135deg, #23252b 0%, #181920 100%)",
        boxShadow: "0 4px 24px 0 rgba(20,22,30,0.22)",
      }}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={wallpaper}
            alt={`${physicist.name}'s era`}
            className="object-cover w-full h-full opacity-60"
          />
          {/* Overlay for header text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181920]/90 via-[#181920]/60 to-transparent" />
        </AspectRatio>
        <div className="absolute -bottom-8 left-6 flex items-center">
          <div
            className={`
              h-16 w-16 rounded-xl flex items-center justify-center
              border-2
            `}
            style={{
              borderColor: "#3bf0e4", // Soft cyan/blue accent
              background: "#181920",
              boxShadow: "0 0 0 2px #23252b",
              overflow: "hidden",
            }}
          >
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarImage src={physicist.avatar} alt={physicist.name} className="object-cover h-full w-full rounded-xl" />
              <AvatarFallback className="bg-[#23252b] text-[#E0E0E0] font-bold text-2xl rounded-xl">
                {physicist.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-5">
            <h3
              className={`font-extrabold leading-tight text-[1.35rem]`}
              style={{
                color: "#E0E0E0", // Soft white
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {physicist.name}
            </h3>
            <Badge
              variant="outline"
              className="bg-[#23252b] text-[#b0b0b0] border-none text-xs px-3 py-1 mt-1 rounded-full"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {physicist.era}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-[#23252b] hover:bg-[#23252b]/80 transition
            ${liked ? "text-blue-400 hover:text-cyan-300" : "text-gray-400 hover:text-[#E0E0E0]"}
          `}
          onClick={() => toggleLike(physicist.id)}
        >
          <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className="pt-12 pb-6 px-7">
        <div className="mb-3">
          <h4 className="text-base font-semibold mb-1" style={{
            fontFamily: "'Outfit', sans-serif",
            color: "#8ecae6",
            letterSpacing: "0.01em",
          }}>
            Specialty
          </h4>
          <p className="text-[#E0E0E0] text-base">{physicist.specialty}</p>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-1" style={{
            fontFamily: "'Outfit', sans-serif",
            color: "#8ecae6",
            letterSpacing: "0.01em",
          }}>
            About
          </h4>
          <p className="text-[#b0b0b0] text-base line-clamp-3">{physicist.bio}</p>
        </div>
        {physicist.topics && physicist.topics.length > 0 && (
          <div className="mt-4">
            <h4 className="text-base font-semibold mb-1" style={{
              fontFamily: "'Outfit', sans-serif",
              color: "#8ecae6",
              letterSpacing: "0.01em",
            }}>
              Topics
            </h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {physicist.topics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-[#23252b] text-[#E0E0E0] text-xs rounded-full px-3 py-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-[#23252b] pt-5 px-7 pb-6">
        <div
          className="text-[#8ecae6] text-base rounded-xl px-4 py-2 bg-[#23252b] truncate max-w-[60%] font-medium"
          style={{
            fontFamily: "'Outfit', sans-serif",
          }}
          title={physicist.knownFor}
        >
          {physicist.knownFor}
        </div>
        <Link to={`/chat/${physicist.id}`}>
          <Button
            className="bg-gradient-to-r from-[#3bf0e4] to-[#3b82f6] font-bold text-base px-6 py-2 rounded-full transition-all"
            style={{ fontFamily: "'Outfit', sans-serif'" }}
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Start Chat
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
