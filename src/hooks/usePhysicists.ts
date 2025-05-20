
import { useState, useEffect } from "react";
import { Physicist } from "@/types";

export const usePhysicists = () => {
  // This would typically fetch from an API, but we're using mock data for now
  const [physicists, setPhysicists] = useState<Physicist[]>([
    {
      id: "godofphysics",
      name: "Photon Guide",
      era: "Timeless",
      specialty: "All Physics Disciplines",
      bio: "Your personal guide to the fascinating world of physics. I can connect you with the right physicist for your questions and suggest topics to explore.",
      knownFor: "Guiding Curious Minds",
      avatar: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "einstein",
      name: "Albert Einstein",
      era: "1879-1955",
      specialty: "Theoretical Physics, Relativity",
      bio: "German-born theoretical physicist, widely acknowledged as one of the greatest physicists of all time. Best known for developing the theory of relativity and contributions to quantum mechanics.",
      knownFor: "E=mc²",
      avatar: "https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "newton",
      name: "Isaac Newton",
      era: "1643-1727",
      specialty: "Classical Physics, Calculus",
      bio: "English mathematician, physicist, astronomer, and author who is widely recognized as one of the greatest mathematicians and physicists of all time and as a key figure in the scientific revolution.",
      knownFor: "Laws of Motion",
      avatar: "https://images.unsplash.com/photo-1564473185935-42296d604ad1?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "curie",
      name: "Marie Curie",
      era: "1867-1934",
      specialty: "Radioactivity, Chemistry",
      bio: "Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different scientific fields.",
      knownFor: "Radioactivity Research",
      avatar: "https://images.unsplash.com/photo-1571444403001-1dfce6d1291f?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "feynman",
      name: "Richard Feynman",
      era: "1918-1988",
      specialty: "Quantum Electrodynamics",
      bio: "American theoretical physicist known for his work in quantum mechanics, quantum electrodynamics, and particle physics. Known for his engaging teaching style and making complex concepts understandable.",
      knownFor: "Feynman Diagrams",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1080&auto=format&fit=crop"
    },
    {
      id: "hawking",
      name: "Stephen Hawking",
      era: "1942-2018",
      specialty: "Black Holes, Cosmology",
      bio: "English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at the University of Cambridge. Hawking was known for his work on black holes and relativity.",
      knownFor: "Hawking Radiation",
      avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=250&auto=format&fit=crop",
      wallpaper: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1080&auto=format&fit=crop"
    }
  ]);
  
  return { physicists };
};
