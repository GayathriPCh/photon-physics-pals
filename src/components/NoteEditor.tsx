import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NoteEditorProps {
  onSave: (content: string) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ onSave, onCancel, isSaving }) => {
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4">
      <Input
        className="bg-white/5 text-white border-white/20"
        placeholder="Write your physics insights here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          onClick={() => onSave(content)}
          disabled={isSaving || !content.trim()}
        >
          {isSaving ? "Saving..." : "Save Note"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
