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
      // Create knowledge entry
      const entryRes = await SensayTraining.createKnowledgeEntry(replicaId);
      const knowledgeId = entryRes.data.knowledgeBaseID;

      // Add text content
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
      // Get signed URL
      const uploadRes = await SensayTraining.getFileUploadURL(
        replicaId,
        selectedFile.name
      );
      
      // Upload file directly to storage
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
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === "text" ? "default" : "outline"}
          onClick={() => setMode("text")}
        >
          Add Text
        </Button>
        <Button
          variant={mode === "file" ? "default" : "outline"}
          onClick={() => setMode("file")}
        >
          Upload File
        </Button>
      </div>

      {mode === "text" ? (
        <form onSubmit={handleTextSubmit} className="space-y-2">
          <Textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Enter knowledge you want the physicist to learn..."
            className="bg-white/5 text-white"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Text"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleFileSubmit} className="space-y-2">
          <Input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            accept=".txt,.pdf,.docx"
            className="bg-white/5 text-white"
          />
          <Button type="submit" disabled={isLoading || !selectedFile}>
            {isLoading ? "Uploading..." : "Upload File"}
          </Button>
        </form>
      )}
    </div>
  );
};
