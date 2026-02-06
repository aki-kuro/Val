
import React, { useState, useEffect } from 'react';
import { githubStorage } from '../services/githubService';
import { HeartIcon } from './AestheticIcons';

const DayHug: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [distance, setDistance] = useState(100);
  const [completed, setCompleted] = useState(false);

  const handleTap = () => {
    if (completed) return;
    setDistance(prev => {
      // Made it easier: tap brings them closer by 8 units
      const next = prev - 8;
      if (next <= 0) {
        handleComplete();
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (!completed) {
      // Made it easier: drift apart much slower (2 units every 150ms)
      const drift = setInterval(() => {
        setDistance(prev => Math.min(100, prev + 2));
      }, 150);
      return () => clearInterval(drift);
    }
  }, [completed]);

  const handleComplete = async () => {
    setCompleted(true);
    try {
      await githubStorage.writeFile('data/hug-day.json', { completed: true, timestamp: new Date().toISOString() });
      onComplete();
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-20 animate-soft min-h-[500px] pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-serif italic text-[var(--accent)] font-bold">Close the distance</h2>
        <p className="text-base font-serif opacity-60 italic">Tap rapidly to bring our hearts together for a hug!</p>
      </div>

      <div className="relative w-full max-w-sm h-24 flex items-center justify-center px-4">
        {/* The connecting line/bar */}
        <div className="absolute w-[80%] h-1.5 bg-white/30 rounded-full" />
        
        {/* Left Heart */}
        <div 
          className="absolute transition-all duration-100"
          style={{ left: `calc(10% + ${(100 - distance) / 2.5}%)` }}
        >
          <HeartIcon size={48} />
        </div>

        {/* Right Heart */}
        <div 
          className="absolute transition-all duration-100"
          style={{ right: `calc(10% + ${(100 - distance) / 2.5}%)` }}
        >
          <HeartIcon size={48} />
        </div>
      </div>

      <div className="relative">
        <button
          onClick={handleTap}
          className={`w-32 h-32 rounded-full bg-white/30 backdrop-blur-md border-2 border-white/50 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all ${
            completed ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="animate-pulse">
            <HeartIcon size={56} filled={true} />
          </div>
        </button>

        {completed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-soft whitespace-nowrap">
            <div className="mb-4">
              <HeartIcon size={120} filled={true} />
            </div>

            <p className="font-serif italic opacity-60 text-lg mt-2">No distance is too far for us Jaana.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DayHug;
