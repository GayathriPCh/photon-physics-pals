import React from "react";
import "./PhotonGodCard.css";

export function PhotonGodCard({ physicist, onChat }) {
  return (
    <div className="photon-card">
      <div className="photon-card-header">
        <img className="photon-avatar" src={physicist.avatar} alt={physicist.name} />
        <div>
          <div className="photon-name">{physicist.name}</div>
          <div className="photon-era">{physicist.era}</div>
        </div>
      </div>
      <div className="photon-card-content">
        <div>
          <span className="photon-label">Specialty</span>
          <div>{physicist.specialty}</div>
        </div>
        <div>
          <span className="photon-label">About</span>
          <div>{physicist.bio}</div>
        </div>
        <div>
          <span className="photon-label">Topics</span>
          <div className="photon-topics">
            {physicist.topics.map((topic, idx) => (
              <span className="photon-topic" key={idx}>{topic}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="photon-card-footer">
        <div className="photon-knownfor" title={physicist.knownFor}>
          {physicist.knownFor}
        </div>
        <button className="photon-chat-btn" onClick={onChat}>Start Chat</button>
      </div>
    </div>
  );
}
