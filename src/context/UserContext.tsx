
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Note } from "@/types";

interface UserContextType {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  selectedPhysicists: string[];
  setSelectedPhysicists: (physicistIds: string[]) => void;
  useSimplifiedLanguage: boolean;
  setUseSimplifiedLanguage: (use: boolean) => void;
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPhysicists, setSelectedPhysicists] = useState<string[]>([]);
  const [useSimplifiedLanguage, setUseSimplifiedLanguage] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Relativity Basics",
      content: "Time dilation occurs when two observers moving relative to each other measure different elapsed times for the same event. The faster an object moves, the more time slows down for it relative to a stationary observer.",
      physicistId: "einstein",
      physicistName: "Albert Einstein",
      timestamp: "2025-05-19T14:32:00Z"
    },
    {
      id: "2",
      title: "Newton's Laws Applications",
      content: "Every object continues in its state of rest, or of uniform motion in a straight line, unless compelled to change that state by forces impressed upon it. This explains why we feel pushed back when a car accelerates forward!",
      physicistId: "newton",
      physicistName: "Isaac Newton",
      timestamp: "2025-05-18T10:15:00Z"
    }
  ]);

  const addNote = (note: Note) => {
    setNotes(prev => [note, ...prev]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const value = {
    selectedInterests,
    setSelectedInterests,
    selectedPhysicists,
    setSelectedPhysicists,
    useSimplifiedLanguage,
    setUseSimplifiedLanguage,
    notes,
    addNote,
    deleteNote
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
