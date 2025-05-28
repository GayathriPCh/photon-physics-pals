import React, { useState } from "react";
import Onboarding from "./Onboarding";

const HeroSection = ({ onBegin }) => (
<section className="relative min-h-screen w-full flex flex-col items-center justify-center from-[#050505] via-[#0b0f17] to-[#020409] bg-[url('/bg.jpg')] bg-cover bg-center overflow-hidden">
    {/* Starry Orb Background */}
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
      <div className="w-[1000px] h-[1000px] rounded-full bg-gradient-to-br text-black opacity-20 blur-[120px]" />
    </div>

    {/* Content */}
    <div className="relative z-20 flex flex-col items-center max-w-3xl px-6 text-center">
      <span className="uppercase tracking-[0.25em] text-black text-xs font-semibold mb-6 font-heading">
        DECENTRALIZED EDTECH
      </span>

      <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight mb-6 font-heading" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <span className="bg-gradient-to-r text-black bg-clip-text text-transparent drop-shadow-lg">
          Photon
        </span>
      </h1>

      <p className="text-2xl md:text-3xl text-sky-100 font-light mb-6 max-w-2xl mx-auto font-body" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Explore physics by <span className="text-black font-semibold">chatting with legendary minds</span>.<br />
        Powered by AI, NFTs, and your curiosity.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-10 font-body" style={{ fontFamily: "'Outfit', sans-serif" }}>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-sky-300 text-sm font-medium shadow-sm border border-sky-700/40">
          Chat with Einstein, Newton & more
        </span>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1f2235] to-[#232946] text-purple-200 text-sm font-medium shadow-sm border border-purple-700/40">
          Earn $PHOTON as a creator
        </span>
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#161a2b] to-[#1d1f2f] text-indigo-200 text-sm font-medium shadow-sm border border-indigo-700/40">
          Personalized, curiosity-driven learning
        </span>
      </div>

      <button
        className="mt-2 text-black bg-gradient-to-r from-sky-600 via-blue-700 to-purple-500
 hover:from-sky-600 hover:to-purple-500 focus:ring-4 focus:outline-none focus:ring-purple-300 font-bold text-lg px-6 py-3 rounded-full shadow-lg transition-all font-body tracking-wide" 
        style={{ fontFamily: "'Outfit', sans-serif" }}
        onClick={onBegin}
      >
        Start Your Physics Journey
      </button>
    </div>
  </section>
);

const PhotonLanding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black text-white font-body">
      {!showOnboarding ? (
        <HeroSection onBegin={() => setShowOnboarding(true)} />
      ) : (
        <Onboarding />
      )}
    </div>
  );
};

export default PhotonLanding;
//style={{ fontFamily: "'Rob', Arial, sans-serif" }}