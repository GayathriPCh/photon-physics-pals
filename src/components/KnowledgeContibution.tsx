import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SensayTraining } from "@/services/sensay-training";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export const KnowledgeContributionForm = ({ replicaId }: { replicaId: string }) => {
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"text" | "file">("text");

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textContent.trim()) return;

    setIsLoading(true);
    try {
      const entryRes = await SensayTraining.createKnowledgeEntry(replicaId);
      const knowledgeId = entryRes.data.knowledgeBaseID;
      await SensayTraining.addTextTraining(replicaId, knowledgeId, textContent);
      
      toast({
        title: "Knowledge Added!",
        description: "Your text contribution has been submitted for processing.",
      });
      setTextContent("");
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Could not add text knowledge",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const uploadRes = await SensayTraining.getFileUploadURL(
        replicaId,
        selectedFile.name
      );
      
      await axios.put(uploadRes.data.signedURL, selectedFile, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      toast({
        title: "File Uploaded!",
        description: "Your document is being processed by our AI.",
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not process your file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-[#181A20]/95 rounded-2xl border border-[#00FFA3]/30">
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === "text" ? "default" : "outline"}
          onClick={() => setMode("text")}
          className={`font-outfit ${
            mode === "text" 
              ? "bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] text-black hover:from-[#00FFA3]/90 hover:to-[#03E1FF]/90"
              : "border-[#03E1FF] text-[#03E1FF] hover:bg-[#03E1FF]/10"
          }`}
        >
          Add Text
        </Button>
        <Button
          variant={mode === "file" ? "default" : "outline"}
          onClick={() => setMode("file")}
          className={`font-outfit ${
            mode === "file" 
              ? "bg-gradient-to-r from-[#DC1FFF] to-[#03E1FF] text-black hover:from-[#DC1FFF]/90 hover:to-[#03E1FF]/90"
              : "border-[#DC1FFF] text-[#DC1FFF] hover:bg-[#DC1FFF]/10"
          }`}
        >
          Upload File
        </Button>
      </div>

      {mode === "text" ? (
        <form onSubmit={handleTextSubmit} className="space-y-4">
          <Textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter knowledge you want the physicist to learn..."
            className="bg-[#23243a]/70 border-2 border-[#03E1FF]/30 text-white placeholder:text-white/50 rounded-xl
                      focus:border-[#00FFA3] focus:ring-2 focus:ring-[#00FFA3]/40 transition font-outfit h-32"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="font-outfit bg-gradient-to-r from-[#00FFA3] via-[#03E1FF] to-[#DC1FFF] text-black font-bold 
                      hover:scale-105 transition-transform w-full"
          >
            {isLoading ? "Submitting..." : "Submit Text"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleFileSubmit} className="space-y-4">
          <div className="relative border-2 border-dashed border-[#03E1FF]/30 rounded-xl p-6 text-center">
            <Input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              accept=".txt,.pdf,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-[#03E1FF] font-outfit">
              <span className="font-semibold">Click to upload</span>
              <p className="text-sm mt-1">or drag and drop</p>
              <p className="text-xs text-[#03E1FF]/70 mt-2">TXT, PDF, DOCX</p>
            </div>
          </div>
          {selectedFile && (
            <p className="text-[#00FFA3] text-sm font-outfit">
              Selected: {selectedFile.name}
            </p>
          )}
          <Button 
            type="submit" 
            disabled={isLoading || !selectedFile}
            className="font-outfit bg-gradient-to-r from-[#DC1FFF] to-[#03E1FF] text-black font-bold 
                      hover:scale-105 transition-transform w-full"
          >
            {isLoading ? "Uploading..." : "Upload File"}
          </Button>
        </form>
      )}
    </div>
  );
};
