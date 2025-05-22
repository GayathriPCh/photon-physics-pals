
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Physicist, Message } from "@/types";

interface ChatMessageProps {
  message: Message;
  physicist?: Physicist;
  simplified: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  physicist,
  simplified 
}) => {
  const isUser = message.sender === "user";
  
  const getMessageContent = () => {
    if (isUser || !simplified) {
      return message.content;
    } else {
      return message.simplifiedContent || message.content;
    }
  };
  
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && physicist && (
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={physicist.avatar} alt={physicist.name} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500">
            {physicist.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[80%] ${isUser ? "order-first md:order-last" : ""}`}>
        <div 
          className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
              : "bg-white/10 text-white"
          }`}
        >
          {!simplified && !isUser && message.simplifiedContent && (
            <Badge 
              variant="outline" 
              className="mb-2 text-xs border-blue-400 text-blue-400"
            >
              Historical Language
            </Badge>
          )}
          <p className="whitespace-pre-wrap">{getMessageContent()}</p>
        </div>
        <p className="text-xs text-gray-400 mt-1 px-2">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
      
      {isUser && (
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src="/placeholder.svg" alt="You" />
          <AvatarFallback className="bg-blue-500">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
