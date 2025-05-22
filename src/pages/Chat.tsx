import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { usePhysicists } from "@/hooks/usePhysicists";
import { useUserContext } from "@/context/UserContext";
import { useWallet } from "@/context/WalletContext";
import { useNotion } from "@/hooks/useNotion";
import { useNotebookRegistry } from "@/hooks/useNotebookRegistry";
import { useSensayChat } from "@/hooks/useSensayChat";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { NoteEditor } from "@/components/NoteEditor";
import { Home, Book } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { KnowledgeContributionForm } from "@/components/KnowledgeContibution";
const Chat = () => {
  const { physicistId } = useParams<{ physicistId: string }>();
  const { physicists } = usePhysicists();
  const { useSimplifiedLanguage } = useUserContext();
  const { account, networkId, connectWallet } = useWallet();
  const { notionPageId, initializeNotionPage, saveNoteToNotion } = useNotion();
  const { notebookId, hasNotebook, isLoading, registerNotebook } = useNotebookRegistry();

  const [messageText, setMessageText] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Updated chat integration
  const { messages, sendMessage, isLoading: isChatLoading } = useSensayChat(physicistId, account || undefined);

  const physicist = physicists.find(p => p.id === physicistId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Updated message handling
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !physicistId || !account) return;
    await sendMessage(messageText);
    setMessageText("");
  };

  // Preserved notes functionality
  const handleSaveNote = async (content: string) => {
    setIsSaving(true);
    try {
      if (!hasNotebook) {
        const pageId = await initializeNotionPage();
        if (pageId) await registerNotebook(pageId);
      }
      await saveNoteToNotion(content);
      toast({
        title: "Note Saved",
        description: "Your note has been saved to Notion.",
      });
      setShowNotes(false);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save note to Notion.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateNotebook = async () => {
    if (!account) return;
    try {
      const pageId = await initializeNotionPage();
      if (!pageId) throw new Error("Notion page creation failed");
      await registerNotebook(pageId);
      toast({
        title: "Notebook Created!",
        description: "Your notebook is now securely linked to your wallet",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Could not create notebook",
        variant: "destructive",
      });
    }
  };

  if (!physicist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Physicist not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${physicist.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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

        {/* Updated chat messages display */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg px-4 py-2 max-w-[70%] ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                {msg.content.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Updated input area with loading state */}
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
          <Input
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            placeholder="Ask a physics question..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isChatLoading}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            disabled={isChatLoading}
          >
            {isChatLoading ? "Sending..." : "Send"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            onClick={() => setShowNotes(!showNotes)}
          >
            <Book className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10"
            onClick={() => setShowTraining(!showTraining)}
          >
          <Lightbulb className="h-4 w-4" />
          </Button>
        </form>

        {/* Preserved notes editor section */}
        {showNotes && (
          <div className="mt-4 p-4 bg-black/80 rounded-lg border border-white/10">
            <h3 className="text-white font-semibold mb-2">
              {account ? "Your Physics Notebook" : "Connect Wallet to Save Notes"}
            </h3>

            {!account ? (
              <Button
                onClick={connectWallet}
                className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500"
              >
                Connect Wallet
              </Button>
            ) : networkId !== 31 ? (
              <div className="text-yellow-400 text-sm">
                ⚠️ Switch to Rootstock Testnet to manage your notebook
              </div>
            ) : isLoading ? (
              <div className="text-gray-400">Checking notebook status...</div>
            ) : hasNotebook ? (
              <>
                <NoteEditor
                  onSave={handleSaveNote}
                  onCancel={() => setShowNotes(false)}
                  isSaving={isSaving}
                />
                {notebookId && (
                  <a
                    href={`https://www.notion.so/${notebookId.replace(/-/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-blue-400 hover:underline"
                  >
                    View Full Notebook →
                  </a>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-yellow-400 text-sm">
                  You don't have a notebook yet. Create one to start saving notes!
                </p>
                <Button
                  onClick={handleCreateNotebook}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Create New Notebook
                </Button>
              </div>
            )}
          </div>
        )}
        {showTraining && (
  <div className="mt-4 p-4 bg-black/80 rounded-lg border border-white/10">
    <h3 className="text-white font-semibold mb-2">
      Contribute Knowledge to {physicist.name}
    </h3>
    <KnowledgeContributionForm replicaId={physicistId} />
  </div>
)}
        
      </div>
    </div>
  );
};

export default Chat;
