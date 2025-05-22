// src/utils/metadata.ts
import { convertIPFSURL } from "./ipfs";

export const createReplicaMetadata = (replica: any) => ({
  name: replica.name,
  description: replica.bio || "Physics mentor AI replica",
  image: replica.profileImage || replica.profile_image,
  attributes: [
    { trait_type: "Era", value: replica.era },
    { trait_type: "Specialty", value: replica.specialty },
    { trait_type: "Type", value: replica.type },
    ...(replica.tags?.map((tag: string) => ({ trait_type: "Expertise", value: tag })) || [])
  ],
  external_url: `https://photon-chi-five.vercel.app/replicas/${replica.uuid}`,
});
