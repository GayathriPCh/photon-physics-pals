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


const solanaGradient =
  "linear-gradient(135deg, rgba(0,255,163,0.16) 0%, rgba(3,225,255,0.13) 50%, rgba(220,31,255,0.13) 100%)";

const Chat: React.FC = () => {
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

  const { messages, sendMessage, isLoading: isChatLoading } = useSensayChat(
    physicistId,
    account || undefined
  );

  const physicist = physicists.find((p) => p.id === physicistId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !physicistId || !account) return;
    await sendMessage(messageText);
    setMessageText("");
  };

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
      <div className="min-h-screen flex items-center justify-center bg-black text-white font-outfit">
        Physicist not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-outfit"
      style={{
        backgroundImage: `
          ${solanaGradient},
          url(${physicist.wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 flex flex-col bg-black/70 backdrop-blur-lg p-6 rounded-none shadow-2xl border-none">
        {/* Header */}
        <header className="mb-6 max-w-4xl mx-auto w-full">
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
            <div className="relative">
              <img
                src={physicist.avatar}
                alt={physicist.name}
                className="h-16 w-16 object-cover rounded-lg border-2 border-[#03E1FF] shadow-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white drop-shadow-lg font-outfit">{physicist.name}</h1>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Badge
                      variant="outline"
                      className="cursor-help border-[#03E1FF] text-[#03E1FF] font-semibold font-outfit"
                    >
                      {physicist.era}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-[#181A20] border border-[#DC1FFF]/40 font-outfit">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-white">{physicist.name}</h4>
                      <p className="text-sm text-gray-300">{physicist.bio}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <p className="text-[#00FFA3] text-sm font-medium font-outfit">{physicist.specialty}</p>
            </div>
          </div>
        </header>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar max-w-4xl mx-auto w-full">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role !== "user" && (
                <div className="flex-shrink-0">
                  <img
                    src={physicist.avatar}
                    alt={physicist.name}
                    className="h-10 w-10 object-cover rounded-lg border-2 border-[#03E1FF] shadow-md"
                  />
                </div>
              )}
              <div
                className={`rounded-xl px-4 py-3 max-w-[70%] shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#00FFA3]/90 to-[#03E1FF]/90 text-black font-semibold font-outfit"
                    : "bg-[#23243a]/80 text-white border border-[#DC1FFF]/30 font-outfit"
                }`}
              >
                {msg.content.split("\n").map((line, i) => (
                  <p key={i} className="font-outfit">{line}</p>
                ))}
              </div>
              {msg.role === "user" && account && (
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] rounded-lg border-2 border-[#03E1FF] shadow-md flex items-center justify-center">
                    <span className="text-black font-bold text-sm font-outfit">U</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto max-w-4xl mx-auto w-full">
          <Input
            className="flex-1 bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit"
            placeholder="Ask a physics question..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isChatLoading}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold shadow-lg hover:scale-105 transition-transform rounded-xl font-outfit"
            disabled={isChatLoading}
          >
            {isChatLoading ? "Sending..." : "Send"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-[#DC1FFF] text-[#DC1FFF] hover:bg-[#DC1FFF]/10 rounded-xl font-outfit"
            onClick={() => setShowNotes(!showNotes)}
          >
            <Book className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-[#00FFA3] text-[#00FFA3] hover:bg-[#00FFA3]/10 rounded-xl font-outfit"
            onClick={() => setShowTraining(!showTraining)}
          >
            <Lightbulb className="h-4 w-4" />
          </Button>
        </form>

        {/* Notes editor */}
        {showNotes && (
          <div className="mt-4 p-4 bg-[#181A20]/95 rounded-2xl border border-[#03E1FF]/30 shadow-xl max-w-4xl mx-auto w-full">
            <h3 className="text-[#03E1FF] font-semibold mb-2 font-outfit">
              {account ? "Your Physics Notebook" : "Connect Wallet to Save Notes"}
            </h3>
            {!account ? (
              <Button
                onClick={connectWallet}
                className="mt-2 bg-gradient-to-r from-[#DC1FFF] to-[#03E1FF] text-black font-bold rounded-xl font-outfit"
              >
                Connect Wallet
              </Button>
            ) : networkId !== 31 ? (
              <div className="text-[#00FFA3] text-sm font-outfit">
                ⚠️ Switch to Rootstock Testnet to manage your notebook
              </div>
            ) : isLoading ? (
              <div className="text-[#03E1FF] font-outfit">Checking notebook status...</div>
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
                    className="mt-2 inline-block text-sm text-[#03E1FF] hover:underline font-outfit"
                  >
                    View Full Notebook →
                  </a>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-[#00FFA3] text-sm font-outfit">
                  You don't have a notebook yet. Create one to start saving notes!
                </p>
                <Button
                  onClick={handleCreateNotebook}
                  className="bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] text-black font-bold rounded-xl font-outfit"
                >
                  Create New Notebook
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Knowledge contribution */}
        {showTraining && (
          <div className="mt-4 p-4 bg-[#181A20]/95 rounded-2xl border border-[#00FFA3]/30 shadow-xl max-w-4xl mx-auto w-full">
            <h3 className="text-[#00FFA3] font-semibold mb-2 font-outfit">
              Contribute Knowledge to {physicist.name}
            </h3>
            <KnowledgeContributionForm replicaId={physicistId} />
          </div>
        )}
      </div>
      
      {/* Custom scrollbar styling */}
      <style>{`
        * {
          font-family: 'Outfit', sans-serif !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00FFA3 0%, #03E1FF 70%, #DC1FFF 100%);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Chat;
