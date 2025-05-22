
export interface Physicist {
  id: string;
  name: string;
  era: string;
  specialty: string;
  bio: string;
  knownFor: string;
  avatar: string;
  wallpaper: string;
  creator?: string; // wallet address of creator
  isOfficial?: boolean; // indicates if this is an official physicist or user-created
  nftAddress?: string; // NFT contract address if minted
  tokenId?: string; // Token ID if minted
  engagement?: {
    messages?: number;
    likes?: number;
    bookmarks?: number;
  };
  likes?: number; // Number of likes for this physicist
  timeline?: string; // Historical timeline (Ancient, Renaissance, Modern, Contemporary, etc.)
  topics?: string[]; // Array of topics this physicist can discuss
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

export interface WalletInfo {
  address: string;
  provider: string;
  chainId: number;
  balance?: string;
}

export interface PhotonToken {
  balance: string;
  earned: string;
}

export interface ReplicaNFT {
  tokenId: string;
  contractAddress: string;
  physicist: Physicist;
  creator: string;
  createdAt: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
}

export interface Timeline {
  id: string;
  name: string;
  range: string;
}
