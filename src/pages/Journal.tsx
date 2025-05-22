import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Book, Home, MessageCircle, Calendar } from "lucide-react";

const Journal = () => {
  const { notes } = useUserContext();
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredNotes = activeTab === "all" 
    ? notes 
    : notes.filter(note => note.physicistId === activeTab);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home size={16} /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>Learning Journal</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <header className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Book className="mr-2 h-8 w-8" />
            <h1 className="text-3xl font-bold">Your Learning Journal</h1>
          </div>
          <p className="text-gray-300 max-w-2xl">
            Track your insights and organize what you've learned from your conversations with physics' greatest minds.
          </p>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-black/20 p-1 rounded-lg">
              <TabsTrigger 
                value="all" 
                className={`px-4 py-2 rounded-md ${activeTab === "all" ? "bg-white/10" : ""}`}
              >
                All Notes
              </TabsTrigger>
              {/* We would dynamically generate these based on unique physicist IDs */}
              <TabsTrigger 
                value="einstein" 
                className={`px-4 py-2 rounded-md ${activeTab === "einstein" ? "bg-white/10" : ""}`}
              >
                Einstein
              </TabsTrigger>
              <TabsTrigger 
                value="newton" 
                className={`px-4 py-2 rounded-md ${activeTab === "newton" ? "bg-white/10" : ""}`}
              >
                Newton
              </TabsTrigger>
            </TabsList>
            
            <Link to="/replicas">
              <Button variant="outline" className="border-purple-400 text-purple-400">
                Back to Physicists
              </Button>
            </Link>
          </div>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredNotes.length > 0 ? (
              <div className="grid gap-6">
                {filteredNotes.map((note, index) => (
                  <Card key={index} className="bg-black/30 border-none shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-white">{note.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" /> 
                            {new Date(note.timestamp).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-blue-400 text-blue-400">
                          {note.physicistName}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                      <div className="mt-4 flex justify-end">
                        <Link to={`/chat/${note.physicistId}`}>
                          <Button size="sm" variant="outline" className="text-sm border-green-400 text-green-400">
                            <MessageCircle className="h-3 w-3 mr-1" /> Continue Chat
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Book className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">Your journal is empty</h3>
                <p className="text-gray-400 mb-6">
                  Start chatting with physicists and take notes to build your learning journal
                </p>
                <Link to="/replicas">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                    Start a Conversation
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Journal;
