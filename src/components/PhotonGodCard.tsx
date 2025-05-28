import React from "react";

const PHOTON_GOD_WALLPAPER =
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f914c869-b03c-4e58-9ff0-d0fb340ba97f/djqle2x-b351a03a-c94e-48fa-866d-bc9363c55ef0.jpg/v1/fill/w_1183,h_676,q_70,strp/a_mysterious_world_ruled_by_quantum_mechanics_by_giorgioquepee8081_djqle2x-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvZjkxNGM4NjktYjAzYy00ZTU4LTlmZjAtZDBmYjM0MGJhOTdmXC9kanFsZTJ4LWIzNTFhMDNhLWM5NGUtNDhmYS04NjZkLWJjOTM2M2M1NWVmMC5qcGciLCJ3aWR0aCI6Ijw9MTM0NCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.HEpE2bv5Gg5fCmm29K44ewuReYPxEsMXl65V6DAUmW0";
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
      borderRadius: 24,
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
      overflow: "hidden",
      maxWidth: 540,
      margin: "auto",
      background: "rgba(30,30,40,0.70)",
      backdropFilter: "blur(16px)",
      border: "none",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Outfit', sans-serif",
    }}
  >
    {/* Wallpaper background with soft overlay */}
    <div
      style={{
        background: `url(${PHOTON_GOD_WALLPAPER}) center/cover no-repeat`,
        minHeight: 180,
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg,rgba(30,30,40,0.80) 60%,rgba(30,30,40,0.50) 100%)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: 28,
          paddingBottom: 18,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            border: "3px solid #00f0ff",
            overflow: "hidden",
            marginRight: 20,
            background: "#101014",
            boxShadow: "0 0 0 4px rgba(0,240,255,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={physicist.avatar}
            alt={physicist.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </div>
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1.1,
            }}
          >
            {physicist.name}
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: "1rem",
              marginTop: 6,
              background: "rgba(0,0,0,0.35)",
              padding: "3px 14px",
              borderRadius: 8,
              display: "inline-block",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {physicist.era}
          </div>
        </div>
      </div>
    </div>

    <div
      style={{
        background: "rgba(24,24,32,0.92)",
        color: "#fff",
        padding: "30px 32px 18px 32px",
        fontSize: "1.07rem",
        minHeight: 160,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div>
        <span
          style={{
            display: "block",
            fontWeight: 700,
            fontSize: "1.08rem",
            background: "linear-gradient(90deg,#96fbc4 0%,#fff44f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 2,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Specialty
        </span>
        <div style={{ fontWeight: 500 }}>{physicist.specialty}</div>
      </div>
      <div>
        <span
          style={{
            display: "block",
            fontWeight: 700,
            fontSize: "1.08rem",
            background: "linear-gradient(90deg,#96fbc4 0%,#fff44f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 2,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          About
        </span>
        <div style={{ fontWeight: 400 }}>{physicist.bio}</div>
      </div>
      <div>
        <span
          style={{
            display: "block",
            fontWeight: 700,
            fontSize: "1.08rem",
            background: "linear-gradient(90deg,#96fbc4 0%,#fff44f 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 2,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Topics
        </span>
        <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {physicist.topics.map((topic, idx) => (
            <span
              key={idx}
              style={{
                background: "rgba(124,58,237,0.85)",
                color: "#fff",
                borderRadius: 16,
                padding: "5px 16px",
                fontSize: "1rem",
                fontWeight: 600,
                marginBottom: 4,
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.01em",
                boxShadow: "0 1px 8px 0 rgba(124,58,237,0.09)",
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 18,
        }}
      >
        <div
          style={{
            color: "#8ecae6",
            fontSize: "1.05rem",
            fontWeight: 600,
            maxWidth: "60%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "'Outfit', sans-serif",
          }}
          title={physicist.knownFor}
        >
          {physicist.knownFor}
        </div>
        <button
          style={{
            background: "linear-gradient(90deg, #3b82f6 0%, #a78bfa 100%)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 12,
            padding: "10px 28px",
            fontSize: "1.1rem",
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            boxShadow: "0 2px 12px 0 rgba(58,130,246,0.13)",
            transition: "filter 0.15s",
          }}
          onClick={onChat}
        >
          Start Chat
        </button>
      </div>
    </div>
  </div>
);
