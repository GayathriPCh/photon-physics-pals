
import { useState, useEffect } from "react";
import { Message } from "@/types";
import { useUserContext } from "@/context/UserContext";

export const useChatHistory = (physicistId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize with welcome messages based on the physicist
  useEffect(() => {
    if (!physicistId) return;
    
    let initialMessages: Message[] = [];
    
    switch (physicistId) {
      case "godofphysics":
        initialMessages = [
          {
            id: "1",
            content: "Welcome to Photon! I'm your guide to the fascinating world of physics. What would you like to explore today?",
            simplifiedContent: "Welcome to Photon! I'm your guide to physics. What do you want to learn about?",
            sender: "physicist",
            timestamp: new Date().toISOString()
          }
        ];
        break;
      case "einstein":
        initialMessages = [
          {
            id: "1",
            content: "Greetings, my curious friend! Albert Einstein at your service. The universe is not only stranger than we imagine, it is stranger than we can imagine. What aspects of relativity or quantum mechanics shall we ponder together?",
            simplifiedContent: "Hi there! This is Albert Einstein. The universe is amazing and mysterious. Want to talk about relativity or quantum mechanics?",
            sender: "physicist",
            timestamp: new Date().toISOString()
          }
        ];
        break;
      case "newton":
        initialMessages = [
          {
            id: "1",
            content: "Good day to thee! Sir Isaac Newton presents himself. For every inquiry, there shall be an equal and informative response. What natural philosophies dost thou wish to explore today?",
            simplifiedContent: "Hello! I'm Isaac Newton. What physics topics would you like to learn about today?",
            sender: "physicist",
            timestamp: new Date().toISOString()
          }
        ];
        break;
      case "curie":
        initialMessages = [
          {
            id: "1",
            content: "Bonjour! Marie Curie at your service. One never notices what has been done; one can only see what remains to be done. Shall we discuss radioactivity or perhaps the properties of elements?",
            simplifiedContent: "Hello! I'm Marie Curie. Would you like to talk about radioactivity or chemistry?",
            sender: "physicist",
            timestamp: new Date().toISOString()
          }
        ];
        break;
      default:
        initialMessages = [
          {
            id: "1",
            content: "Hello there! I'm excited to discuss physics with you. What would you like to know?",
            simplifiedContent: "Hi! I'm ready to talk about physics. What are you interested in?",
            sender: "physicist",
            timestamp: new Date().toISOString()
          }
        ];
    }
    
    setMessages(initialMessages);
  }, [physicistId]);
  
  // Generate a physicist response based on user's message
  const generateResponse = (userMessage: string): Message => {
    // This would typically call an AI API, but we're using static responses for now
    let responseContent = "";
    let simplifiedContent = "";
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword matching for demo purposes
    if (lowerMessage.includes("gravity") || lowerMessage.includes("apple")) {
      if (physicistId === "newton") {
        responseContent = "Indeed, the contemplation of a falling apple led me to ponder the universal laws of gravitation. 'Tis not merely that objects fall, but that they are drawn to one another with a force proportional to their masses and inversely proportional to the square of the distance between them. A most elegant mathematical harmony, wouldn't thou agree?";
        simplifiedContent = "Yes, watching an apple fall helped me think about gravity. Things don't just fall down - they're pulled toward each other. The bigger the objects and the closer they are, the stronger the pull.";
      } else {
        responseContent = "Gravity is a fascinating subject. Newton's work laid the groundwork, but Einstein's general relativity revealed that gravity is actually a curvature of spacetime caused by mass and energy.";
        simplifiedContent = "Gravity is really interesting. Newton thought it was a force, but Einstein showed it's actually space and time being bent by heavy objects.";
      }
    } else if (lowerMessage.includes("relativity") || lowerMessage.includes("time")) {
      if (physicistId === "einstein") {
        responseContent = "Ah, relativity! When you sit with a nice girl for two hours you think it's only a minute, but when you sit on a hot stove for a minute you think it's two hours. That's relativity! More seriously though, time dilation is a consequence of the constant speed of light in all reference frames. Quite remarkable, ja?";
        simplifiedContent = "Relativity is about how time and space change depending on your perspective. Time actually passes slower for objects moving very fast. It happens because light speed is always the same for everyone.";
      } else {
        responseContent = "Einstein's theories of relativity revolutionized our understanding of space, time, and gravity. The notion that time flows differently depending on relative motion and gravitational potential is quite profound.";
        simplifiedContent = "Einstein showed that time can run at different speeds depending on how fast you're moving or how close you are to something very heavy.";
      }
    } else if (lowerMessage.includes("radioactivity") || lowerMessage.includes("radiation")) {
      if (physicistId === "curie") {
        responseContent = "Ah, radioactivity! My husband Pierre and I spent countless hours in our shed laboratory, studying the mysterious emissions from uranium compounds. We discovered that radioactivity is an atomic property, not influenced by chemical state or external conditions. C'est fascinant, n'est-ce pas?";
        simplifiedContent = "Radioactivity is when some elements naturally emit energy and particles. My husband Pierre and I found that this happens at the atomic level and can't be changed by chemical reactions.";
      } else {
        responseContent = "Marie Curie's pioneering work on radioactivity led to numerous discoveries and applications in science and medicine, though we now understand the health hazards of radiation exposure that tragically affected her.";
        simplifiedContent = "Marie Curie studied radioactivity and made many important discoveries, but sadly she didn't know it was dangerous, and it made her sick.";
      }
    } else {
      // Default responses by physicist
      switch (physicistId) {
        case "godofphysics":
          responseContent = "That's an interesting question! I can connect you with specialists in that area. Would you like to chat with Einstein about relativity, Newton about classical mechanics, or Curie about radioactivity?";
          simplifiedContent = "Great question! Who would you like to talk to about this - Einstein, Newton, or Curie?";
          break;
        case "einstein":
          responseContent = "A most intriguing inquiry! The pursuit of knowledge requires both imagination and persistence. As I often say, 'I have no special talent. I am only passionately curious.' Perhaps we could explore this concept through the lens of relativity?";
          simplifiedContent = "That's an interesting question! I'm really curious about this too. Should we look at it from a relativity perspective?";
          break;
        case "newton":
          responseContent = "A question worthy of natural philosophical inquiry! If I have seen further, it is by standing upon the shoulders of Giants. Let us apply the principles of mathematics and reason to unravel this mystery together.";
          simplifiedContent = "Good question! I learned from those who came before me. Let's use math and logic to figure this out.";
          break;
        case "curie":
          responseContent = "Une question fascinante! In science, we must not forget that the discoveries which have made the human mind capable of transforming nature have also given it the means to self-destruct. Let us approach this with both curiosity and responsibility.";
          simplifiedContent = "Fascinating question! Science gives us great power, so we need to be responsible with what we learn. Let's explore this carefully.";
          break;
        default:
          responseContent = "That's a fascinating aspect of physics. I'd be happy to explore that concept with you further. What specific part interests you most?";
          simplifiedContent = "That's really interesting! Which part would you like to know more about?";
      }
    }
    
    return {
      id: Date.now().toString(),
      content: responseContent,
      simplifiedContent: simplifiedContent,
      sender: "physicist",
      timestamp: new Date().toISOString()
    };
  };
  
  // Send a new message
  const sendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate response delay
    setTimeout(() => {
      const physicistResponse = generateResponse(content);
      setMessages(prev => [...prev, physicistResponse]);
    }, 1000);
  };
  
  return { messages, sendMessage };
};
