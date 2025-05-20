
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useChatHistory } from "@/hooks/useChatHistory";
import { useUserContext } from "@/context/UserContext";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { NoteEditor } from "@/components/NoteEditor";
import { Home, Book, Calendar, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Chat = () => {
  const { physicistId } = useParams<{ physicistId: string }>();
  const { physicists } = usePhysicists();
  const { messages, sendMessage } = useChatHistory(physicistId || "");
  const { useSimplifiedLanguage } = useUserContext();
  
  const [messageText, setMessageText] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const physicist = physicists.find(p => p.id === physicistId);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    sendMessage(messageText);
    setMessageText("");
  };
  
  const saveNote = () => {
    toast({
      title: "Note Saved",
      description: "Your note has been added to your learning journal",
    });
    setShowNotes(false);
  };
  
  if (!physicist) {
    return <div>Physicist not found</div>;
  }
  
  return (
    <div 
      className="min-h-screen flex flex-col" 
      style={{
        backgroundImage: `url(${physicist.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-1 flex flex-col bg-black/60 backdrop-blur-sm p-4 md:p-6">
        {/* Header */}
        <header className="mb-6">
          <Breadcrumb className="mb-4 text-white">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home size={16} /></Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/replicas">Physicists</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span>{physicist.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-white">
              <AvatarImage src={physicist.avatar} alt={physicist.name} />
              <AvatarFallback>{physicist.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{physicist.name}</h1>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Badge 
                      variant="outline"
                      className="cursor-help border-blue-400 text-blue-400"
                    >
                      {physicist.era}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{physicist.name}</h4>
                      <p className="text-sm">{physicist.bio}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-gray-300 text-sm">{physicist.specialty}</p>
            </div>
          </div>
        </header>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <ChatMessage 
              key={index} 
              message={msg} 
              physicist={physicist}
              simplified={useSimplifiedLanguage} 
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
          <Input
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            placeholder="Ask a physics question..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button 
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Send
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            onClick={() => setShowNotes(!showNotes)}
          >
            <Book className="h-4 w-4" />
          </Button>
        </form>
        
        {/* Notes */}
        {showNotes && (
          <div className="mt-4 p-4 bg-black/80 rounded-lg border border-white/10">
            <h3 className="text-white font-semibold mb-2">Take Notes</h3>
            <NoteEditor 
              physicistId={physicist.id}
              onSave={saveNote}
              onCancel={() => setShowNotes(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
