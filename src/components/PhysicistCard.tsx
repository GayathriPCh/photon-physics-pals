
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MessageCircle } from "lucide-react";
import { Physicist } from "@/types";

interface PhysicistCardProps {
  physicist: Physicist;
  featured?: boolean;
}

export const PhysicistCard: React.FC<PhysicistCardProps> = ({ 
  physicist, 
  featured = false 
}) => {
  return (
    <Card className={`overflow-hidden border-none shadow-lg ${
      featured 
        ? "bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-sm w-full max-w-3xl" 
        : "bg-black/30 backdrop-blur-sm"
    }`}>
      <div className="relative">
        <AspectRatio ratio={16/9}>
          <img 
            src={physicist.wallpaper} 
            alt={`${physicist.name}'s era`}
            className="object-cover w-full h-full opacity-60"
          />
        </AspectRatio>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 flex items-center">
          <Avatar className={`border-2 border-white ${featured ? 'h-16 w-16' : 'h-12 w-12'}`}>
            <AvatarImage src={physicist.avatar} alt={physicist.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500">
              {physicist.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className={`font-bold text-white ${featured ? 'text-2xl' : 'text-lg'}`}>{physicist.name}</h3>
            <Badge variant="outline" className="bg-black/30 text-white border-white/30 text-xs">
              {physicist.era}
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-blue-400 mb-1">Specialty</h4>
          <p className="text-gray-200">{physicist.specialty}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-blue-400 mb-1">About</h4>
          <p className="text-gray-300 text-sm line-clamp-3">{physicist.bio}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-white/10 pt-4">
        <Badge 
          variant="outline" 
          className={`${
            physicist.id === "godofphysics" 
              ? "border-yellow-500 text-yellow-500" 
              : "border-blue-400 text-blue-400"
          }`}
        >
          {physicist.knownFor}
        </Badge>
        
        <Link to={`/chat/${physicist.id}`}>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <MessageCircle className="mr-2 h-4 w-4" /> Start Chat
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
