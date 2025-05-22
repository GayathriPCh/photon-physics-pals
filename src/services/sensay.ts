import axios from "axios";

const API_URL = "https://api.sensay.io/v1";
const ORG_SECRET = import.meta.env.VITE_SENSAY_ORG_SECRET;
const API_VERSION = "2025-03-25";

export async function ensureSensayUser(userId: string, name?: string) {
  console.log("[ensureSensayUser] Checking user:", userId);
  try {
    const res = await axios.get(`${API_URL}/users/me`, {
      headers: {
        "X-ORGANIZATION-SECRET": ORG_SECRET,
        "X-API-Version": API_VERSION,
        "X-USER-ID": userId,
        "accept": "application/json"
      }
    });
    console.log("[ensureSensayUser] User exists:", res.data);
    return true;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      console.log("[ensureSensayUser] User not found, creating:", userId);
      const createRes = await axios.post(
        `${API_URL}/users`,
        { name: name || userId, id: userId },
        {
          headers: {
            "X-ORGANIZATION-SECRET": ORG_SECRET,
            "X-API-Version": API_VERSION,
            "Content-Type": "application/json",
            "accept": "application/json"
          }
        }
      );
      console.log("[ensureSensayUser] User created:", createRes.data);
      return true;
    }
    console.error("[ensureSensayUser] Unexpected error:", err);
    throw err;
  }
}

// src/services/sensay.ts
export async function createSensayReplica({
    name,
    specialty,
    era,
    type,
    purpose,
    greeting,
    ownerID,
    topics,
    avatarUrl,
    suggestedQuestions,
    userSystemMessage,
    voicePreviewText,
  }: {
    name: string;
    specialty: string;
    era: string;
    type: "individual" | "character" | "brand";
    purpose: string;
    greeting: string;
    ownerID: string;
    topics: string[];
    avatarUrl: string;
    suggestedQuestions: string[];
    userSystemMessage: string;
    voicePreviewText: string;
  }) {
    const tags = [...new Set([...topics, specialty, era])];
    const randomHash = Math.random().toString(36).substring(2, 8);
    const slug = (
      name.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
      + "-" + randomHash + "-" + Date.now()
    );    
    const photonContext = `You are ${name} texting through the Photon app, which allows cross-timeline communication. Reply naturally using modern texting style while staying true to your era's knowledge and personality.`;
    const systemMessage = `${photonContext} ${userSystemMessage ? userSystemMessage.trim() : ""}`;

    const payload = {
      name,
      purpose: purpose,
      shortDescription: specialty,
      greeting,
      type,
      ownerID,
      private: false,
      whitelistEmails: [],
      slug,
      tags,
      profileImage: avatarUrl,
      suggestedQuestions,
      llm: {
        model: "claude-3-5-haiku-latest",
        memoryMode: "rag-search",
        systemMessage,
        tools: []
      },
      voicePreviewText: voicePreviewText.replace("{name}", name),
    };

    // Log the payload before sending
    console.log("[createSensayReplica] Request payload:", JSON.stringify(payload, null, 2));

    try {
      const res = await axios.post(`${API_URL}/replicas`, payload, {
        headers: {
          "X-ORGANIZATION-SECRET": ORG_SECRET,
          "X-API-Version": API_VERSION,
          "Content-Type": "application/json",
          "accept": "application/json",
          "X-USER-ID": ownerID
        }
      });
      // Log the response data
      console.log("[createSensayReplica] Response:", res.data);
      return res.data;
    } catch (error: any) {
      // Log error details for debugging
      if (error.response) {
        console.error("[createSensayReplica] Error response:", error.response.data);
      } else {
        console.error("[createSensayReplica] Error:", error.message);
      }
      throw error;
    }
  }
