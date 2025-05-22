import React from "react";

const PHOTON_GOD_WALLPAPER =
  "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/201905/MIT-Better-Photons_0.jpg?itok=AG6ognx-";

interface PhotonGodCardProps {
  physicist: {
    name: string;
    era: string;
    avatar: string;
    specialty: string;
    bio: string;
    topics: string[];
    knownFor: string;
    id: string;
  };
  onChat?: () => void;
}

export const PhotonGodCard: React.FC<PhotonGodCardProps> = ({ physicist, onChat }) => (
  <div
    style={{
      backgroundImage: `url(${PHOTON_GOD_WALLPAPER})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 18,
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
      border: "4px solid gold",
      overflow: "hidden",
      maxWidth: 500,
      margin: "auto",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(0,0,0,0.7)",
        padding: 20,
      }}
    >
      <img
        src={physicist.avatar}
        alt={physicist.name}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          marginRight: 16,
          border: "2px solid #fff",
          objectFit: "cover",
        }}
      />
      <div>
        <div style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>
          {physicist.name}
        </div>
        <div
          style={{
            color: "#eee",
            fontSize: "0.9rem",
            marginTop: 4,
            background: "rgba(0,0,0,0.3)",
            padding: "2px 10px",
            borderRadius: 8,
            display: "inline-block",
          }}
        >
          {physicist.era}
        </div>
      </div>
    </div>
    <div
      style={{
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
        padding: "22px 20px 12px 20px",
        fontSize: "1rem",
        minHeight: 140,
      }}
    >
      <div>
        <span style={{ color: "#8ecae6", fontWeight: 600, display: "block" }}>
          Specialty
        </span>
        <div>{physicist.specialty}</div>
      </div>
      <div>
        <span style={{ color: "#8ecae6", fontWeight: 600, display: "block", marginTop: 10 }}>
          About
        </span>
        <div>{physicist.bio}</div>
      </div>
      <div>
        <span style={{ color: "#8ecae6", fontWeight: 600, display: "block", marginTop: 10 }}>
          Topics
        </span>
        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {physicist.topics.map((topic, idx) => (
            <span
              key={idx}
              style={{
                background: "#7c3aedcc",
                color: "#fff",
                borderRadius: 16,
                padding: "3px 14px",
                fontSize: "0.85rem",
                marginRight: 4,
                marginBottom: 4,
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.3)",
        padding: "14px 20px",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          color: "#8ecae6",
          fontSize: "0.98rem",
          maxWidth: "60%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={physicist.knownFor}
      >
        {physicist.knownFor}
      </div>
      <button
        style={{
          background: "linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)",
          color: "#fff",
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          padding: "8px 18px",
          cursor: "pointer",
        }}
        onClick={onChat}
      >
        Start Chat
      </button>
    </div>
  </div>
);
