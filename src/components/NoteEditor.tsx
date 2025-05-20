
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/UserContext";
import { usePhysicists } from "@/hooks/usePhysicists";

interface NoteEditorProps {
  physicistId: string;
  onSave: () => void;
  onCancel: () => void;
  initialNote?: {
    title: string;
    content: string;
  };
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  physicistId,
  onSave,
  onCancel,
  initialNote
}) => {
  const { addNote } = useUserContext();
  const { physicists } = usePhysicists();
  
  const physicist = physicists.find(p => p.id === physicistId);
  
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  
  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    
    addNote({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      physicistId,
      physicistName: physicist?.name || "Unknown",
      timestamp: new Date().toISOString()
    });
    
    onSave();
  };
  
  return (
    <div className="space-y-4">
      <Input
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <textarea
        className="w-full min-h-[150px] bg-white/10 border border-white/20 rounded-md p-3 text-white placeholder:text-white/50 resize-none"
        placeholder="What did you learn? Add your notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          className="border-white/30 text-white/80 hover:bg-white/5"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-purple-500"
          onClick={handleSave}
        >
          Save Note
        </Button>
      </div>
    </div>
  );
};
