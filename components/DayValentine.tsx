
import React, { useState, useEffect } from 'react';
import { githubStorage } from '../services/githubService';

interface JourneyData {
  rose?: any;
  propose?: any;
  teddy?: any;
  promise?: any;
  hug?: any;
  kiss?: any;
}

const DayValentine: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Welcome, 2: Manifesto, 3: Finale
  const [manifestoPage, setManifestoPage] = useState(0);
  const [journeyData, setJourneyData] = useState<JourneyData>({});
  const [loading, setLoading] = useState(false);

  const loadJourney = async () => {
    setLoading(true);
    const data: JourneyData = {};
    try {
      const [rose, propose, teddy, promise, hug, kiss] = await Promise.allSettled([
        githubStorage.readFile('data/rose-day.json'),
        githubStorage.readFile('data/propose-day.json'),
        githubStorage.readFile('data/teddy-day.json'),
        githubStorage.readFile('data/promise-day.json'),
        githubStorage.readFile('data/hug-day.json'),
        githubStorage.readFile('data/kiss-day.json'),
      ]);

      if (rose.status === 'fulfilled') data.rose = rose.value.data;
      if (propose.status === 'fulfilled') data.propose = propose.value.data;
      if (teddy.status === 'fulfilled') data.teddy = teddy.value.data;
      if (promise.status === 'fulfilled') data.promise = promise.value.data;
      if (hug.status === 'fulfilled') data.hug = hug.value.data;
      if (kiss.status === 'fulfilled') data.kiss = kiss.value.data;
      
      setJourneyData(data);
    } catch (e) {
      console.error("Failed to load journey data", e);
    } finally {
      setLoading(false);
      setStage(2);
    }
  };

  // Automatically save completion when reaching the finale
  useEffect(() => {
    if (stage === 3) {
      const saveProgress = async () => {
        try {
          await githubStorage.writeFile('data/final-day.json', { completed: true, timestamp: new Date().toISOString() });
          await githubStorage.updateProgress('valentineDay', 'completed');
        } catch (e) {
          console.error("Auto-save failed:", e);
        }
      };
      saveProgress();
    }
  }, [stage]);

  const manifestoPages = [
    {
      title: "The Beginning",
      icon: "🌹",
      content: `We bloomed with a ${journeyData.rose?.color || 'passionate'} rose, marking the beginning of something that transcends space and time. March 28th changed everything.`
    },
    {
      title: "The Proposal",
      icon: "💍",
      content: `You chose "Yes". You chose us. You chose forever, proving that distance is just a number compared to the gravity of our love.`
    },
    {
      title: "Sweet Moments",
      icon: "🍫",
      content: `Every reason, every memory shared over chocolates... they're the small bricks building our fortress. I'm obsessed with every bit of you.`
    },
    {
      title: "The Comfort",
      icon: "🧸",
      content: `Your answers, your vulnerability... you built a teddy that represents the safety and warmth we find in each other's digital presence.`
    },
    {
      title: "The Vow",
      icon: "🤝",
      content: `"${journeyData.promise?.custom || 'I promise to love you through every season and every distance, forever.'}" - A root planted deep in our soil.`
    },
    {
      title: "The Connection",
      icon: "🫂",
      content: `We closed the distance in our hearts. 550km felt like nothing when we finally "hugged" through the screen. One day, it'll be real.`
    },
    {
      title: "The Seal",
      icon: "💋",
      content: `A kiss sent across the miles. A match made in destiny. Sealed with the promise of a thousand real ones to come.`
    },
    {
      title: "Synthesis",
      icon: "✨",
      content: "This week wasn't just a celebration, it was a testament. A synthesis of every laugh, every 'mera bacha', every 3am call. It's our story, and it's just starting."
    }
  ];

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center animate-soft">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif italic text-gray-400">Loading our journey...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[600px] py-10">
      {stage === 0 && (
        <div className="w-full max-w-md p-10 text-center space-y-16 animate-soft">
          <div className="relative flex justify-center">
            <div className="text-[160px] leading-none relative z-10 animate-pulse-slow">💝</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#F5576C]/5 rounded-full blur-[100px] -z-10"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-6xl font-serif font-bold italic text-[#F5576C] leading-tight drop-shadow-sm opacity-90">
              Happy Valentine's Day!
            </h2>
          </div>

          <button 
            onClick={loadJourney}
            className="w-full py-6 rounded-full bg-[#F5576C]/10 text-[#F5576C] font-serif italic text-2xl border border-[#F5576C]/20 transition-all hover:bg-[#F5576C] hover:text-white active:scale-95 shadow-sm"
          >
            continue
          </button>
        </div>
      )}

      {stage === 2 && (
        <div className="w-full max-w-xl space-y-12 animate-soft flex flex-col items-center px-4 pb-20">
          {/* Manifesto text removed as per request */}

          <div className="p-10 md:p-14 bg-white/10 backdrop-blur-md rounded-[4rem] w-full relative min-h-[350px] flex flex-col items-center justify-center text-center shadow-sm">
            <div className="text-8xl mb-12 transition-transform duration-700 hover:scale-110">{manifestoPages[manifestoPage].icon}</div>
            <p className="font-serif text-xl italic text-gray-800 leading-relaxed max-w-xs mx-auto drop-shadow-sm">
              {manifestoPages[manifestoPage].content}
            </p>
          </div>

          <div className="w-full flex gap-4 max-w-sm">
            {manifestoPage > 0 && (
              <button 
                onClick={() => setManifestoPage(prev => prev - 1)}
                className="flex-1 py-4 rounded-full text-gray-400 font-serif italic text-lg transition-all hover:text-[#F5576C] active:scale-90"
              >
                Previous
              </button>
            )}
            <button 
              onClick={() => {
                if (manifestoPage < manifestoPages.length - 1) {
                  setManifestoPage(prev => prev + 1);
                } else {
                  setStage(3);
                }
              }}
              className="flex-[2] py-4 rounded-full bg-[#F5576C] text-white font-serif italic text-xl transition-all shadow-md active:scale-95"
            >
              {manifestoPage < manifestoPages.length - 1 ? 'Next Memory' : 'The Finale'}
            </button>
          </div>
        </div>
      )}

      {stage === 3 && (
        <div className="w-full max-w-2xl animate-soft flex flex-col items-center px-4 space-y-16 py-10">
          <div className="text-center space-y-12 w-full flex flex-col items-center">
            <div className="text-[200px] leading-none animate-pulse relative z-10 drop-shadow-2xl">💝</div>
            <div className="space-y-6">
              <p className="font-cursive text-8xl text-[#F5576C] leading-none drop-shadow-sm select-none">
                I Love You Shreya.
              </p>
              <p className="text-2xl font-serif italic text-gray-400/50 select-none">Forever and always, mera bacha.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DayValentine;
