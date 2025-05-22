import axios from "axios";

const SENSAY_CONFIG = {
  BASE_URL: "https://api.sensay.io/v1",
  ORG_SECRET: import.meta.env.VITE_SENSAY_ORG_SECRET,
  API_VERSION: "2025-03-25"
};

export const SensayTraining = {
  async createKnowledgeEntry(replicaId: string) {
    return axios.post(
      `${SENSAY_CONFIG.BASE_URL}/replicas/${replicaId}/training`,
      {},
      {
        headers: {
          "X-ORGANIZATION-SECRET": SENSAY_CONFIG.ORG_SECRET,
          "X-API-Version": SENSAY_CONFIG.API_VERSION
        }
      }
    );
  },

  async addTextTraining(replicaId: string, knowledgeId: number, text: string) {
    return axios.put(
      `${SENSAY_CONFIG.BASE_URL}/replicas/${replicaId}/training/${knowledgeId}`,
      { rawText: text },
      {
        headers: {
          "X-ORGANIZATION-SECRET": SENSAY_CONFIG.ORG_SECRET,
          "X-API-Version": SENSAY_CONFIG.API_VERSION
        }
      }
    );
  },

  async getFileUploadURL(replicaId: string, filename: string) {
    return axios.get(
      `${SENSAY_CONFIG.BASE_URL}/replicas/${replicaId}/training/files/upload`,
      {
        params: { filename },
        headers: {
          "X-ORGANIZATION-SECRET": SENSAY_CONFIG.ORG_SECRET,
          "X-API-Version": SENSAY_CONFIG.API_VERSION
        }
      }
    );
  }
};
