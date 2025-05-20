
export interface Physicist {
  id: string;
  name: string;
  era: string;
  specialty: string;
  bio: string;
  knownFor: string;
  avatar: string;
  wallpaper: string;
}

export interface Message {
  id: string;
  content: string;
  simplifiedContent?: string;
  sender: "user" | "physicist";
  timestamp: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  physicistId: string;
  physicistName: string;
  timestamp: string;
}
