import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Book, Home, MessageCircle, Calendar, Sparkles, Zap } from "lucide-react";

const Journal = () => {
  const { notes } = useUserContext();
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotes = activeTab === "all"
    ? notes
    : notes.filter(note => note.physicistId === activeTab);

  const SparkleIcon = () => <Sparkles className="inline-block text-[#00FFA3] mr-1 mb-1" size={18} />;
  const LightningIcon = () => <Zap className="inline-block text-[#03E1FF] mr-1 mb-1" size={16} />;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#000000] via-[#181A20] to-[#000000] text-white p-6 font-outfit"
    >
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home size={16} className="text-[#00FFA3]" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="border-[#03E1FF]" />
            <BreadcrumbItem>
              <span className="text-[#03E1FF]">Learning Journal</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Book className="mr-2 h-8 w-8 text-[#00FFA3]" />
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <SparkleIcon /> Your Learning Journal
            </h1>
          </div>
          <p className="text-[#03E1FF] max-w-2xl">
            Track your insights and organize what you've learned from your conversations with physics' greatest minds.
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-[#181A20]/80 p-1 rounded-lg border border-[#00FFA3]/50">
              <TabsTrigger
                value="all"
                className={`px-4 py-2 rounded-md font-semibold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3] data-[state=active]:to-[#03E1FF] data-[state=active]:text-black`}
              >
                <SparkleIcon /> All Notes
              </TabsTrigger>
              {/* Dynamically generate these based on unique physicist IDs in production */}
              <TabsTrigger
                value="einstein"
                className={`px-4 py-2 rounded-md font-semibold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3] data-[state=active]:to-[#03E1FF] data-[state=active]:text-black`}
              >
                <LightningIcon /> Einstein
              </TabsTrigger>
              <TabsTrigger
                value="newton"
                className={`px-4 py-2 rounded-md font-semibold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00FFA3] data-[state=active]:to-[#03E1FF] data-[state=active]:text-black`}
              >
                <LightningIcon /> Newton
              </TabsTrigger>
            </TabsList>

            <Link to="/replicas">
              <Button variant="outline" className="w-full bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold hover:scale-105 transition-transform font-outfit">
                Back to Physicists
              </Button>
            </Link>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            {filteredNotes.length > 0 ? (
              <div className="grid gap-6">
                {filteredNotes.map((note, index) => (
                  <Card key={index} className="bg-[#181A20]/80 border border-[#03E1FF]/30 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white flex items-center gap-2">
                            <SparkleIcon /> {note.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-1 text-[#00FFA3]">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(note.timestamp).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-[#00FFA3] text-[#00FFA3] font-semibold">
                          {note.physicistName}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#A0AEC0] whitespace-pre-wrap">{note.content}</p>
                      <div className="mt-4 flex justify-end">
                        <Link to={`/chat/${note.id}`}>
                                  <Button
                                    className="bg-gradient-to-r from-[#3bf0e4] to-[#3b82f6] font-bold text-base px-6 py-2 rounded-full transition-all"
                                    style={{ fontFamily: "'Outfit', sans-serif'" }}
                                  >
                                    <MessageCircle className="mr-2 h-5 w-5" /> Start Chat
                                  </Button>
                                </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="mx-auto h-12 w-12 mb-4 text-[#00FFA3] opacity-70" />
                <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <SparkleIcon /> Your journal is empty
                </h3>
                <p className="text-[#03E1FF] mb-6">
                  Start chatting with physicists and take notes to build your learning journal
                </p>
                <Link to="/replicas">
                  <Button className="bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold hover:scale-105 transition-transform">
                    <LightningIcon /> Start a Conversation
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <style>{`* { font-family: 'Outfit', sans-serif !important; }`}</style>
    </div>
  );
};

export default Journal;
