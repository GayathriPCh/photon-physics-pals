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

// MIT photon wallpaper for Photon God
const PHOTON_GOD_WALLPAPER =
  "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201905/MIT-Better-Photons_0.jpg?itok=AG6ognx-";

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
        overflow-hidden border border-white/15 shadow-xl rounded-2xl
        bg-white/10 backdrop-blur-xl
        transition-all
        ${featured ? "w-full max-w-3xl" : ""}
      `}
      style={{
        fontFamily: "'Outfit', sans-serif",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.20)",
      }}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={wallpaper}
            alt={`${physicist.name}'s era`}
            className="object-cover w-full h-full opacity-70"
          />
          {/* Overlay for header text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </AspectRatio>
        <div className="absolute -bottom-8 left-6 flex items-center">
          <Avatar
            className={`
              border-4 border-gradient-to-tr from-blue-400 via-purple-400 to-pink-400
              shadow-lg
              ${featured ? "h-20 w-20" : "h-16 w-16"}
              bg-white/30
            `}
            style={{
              boxShadow: "0 4px 20px 0 rgba(80, 80, 255, 0.18)",
            }}
          >
            <AvatarImage src={physicist.avatar} alt={physicist.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
              {physicist.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-5">
            <h3
              className={`font-extrabold text-white leading-tight ${featured ? "text-2xl" : "text-xl"}`}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {physicist.name}
            </h3>
            <Badge
              variant="outline"
              className="bg-black/40 text-white border-white/30 text-xs px-3 py-1 mt-1 rounded-full"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {physicist.era}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 rounded-full bg-black/30 hover:bg-black/50 transition
            ${liked ? "text-pink-500 hover:text-pink-400" : "text-gray-300 hover:text-white"}
          `}
          onClick={() => toggleLike(physicist.id)}
        >
          <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
        </Button>
      </div>

      <CardContent className={`pt-12 pb-6 px-7`}>
        <div className="mb-3">
          <h4 className="text-base font-semibold text-blue-300 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Specialty
          </h4>
          <p className="text-gray-200 text-base">{physicist.specialty}</p>
        </div>

        <div>
          <h4 className="text-base font-semibold text-blue-300 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            About
          </h4>
          <p className="text-gray-300 text-base line-clamp-3">{physicist.bio}</p>
        </div>

        {physicist.topics && physicist.topics.length > 0 && (
          <div className="mt-4">
            <h4 className="text-base font-semibold text-blue-300 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Topics
            </h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {physicist.topics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700/80 text-xs rounded-full px-3 py-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t border-white/10 pt-5 px-7 pb-6">
        <div
          className="text-blue-400 text-base rounded-xl px-4 py-2 bg-black/20 truncate max-w-[60%] font-medium"
          style={{
            fontFamily: "'Outfit', sans-serif",
          }}
          title={physicist.knownFor}
        >
          {physicist.knownFor}
        </div>
        <Link to={`/chat/${physicist.id}`}>
          <Button
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-purple-600 font-bold text-base px-6 py-2 rounded-full shadow-lg transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <MessageCircle className="mr-2 h-5 w-5" /> Start Chat
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
