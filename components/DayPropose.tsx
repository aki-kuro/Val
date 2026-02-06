
import React, { useState, useEffect, useRef } from 'react';
import { githubStorage } from '../services/githubService';
import { ProposeData } from '../types';
import { HeartIcon } from './AestheticIcons';

const PROPOSE_LETTER = `Shreya,  
  
Will you marry me jaana?  
  
I know we've been together almost 11 months. I know I tell you I love you every day. But I'm asking anyway. Officially. Because you deserve to be asked. You deserve to be chosen. Every single day.  
  
You know what you mean to me Jaana? You're the person who loved me when I told you about my issues and didn't try to fix me. The person who says "Jaana mera bacha sb theek h na?" and actually means it. The person who fights for us even when distance makes it so fucking hard.  
  
You're the soft laugh that makes time stop. The sleepy voice that I'm obsessed with. The strength I admire and the vulnerability you trust me with. You're everything I didn't know I needed until March 28th when fate finally got its shit together.  
  
I want the future with you Shreya. Not some perfect Instagram version. The real one. The one where we argue about what to eat for dinner. Where I massage your belly when you're in pain instead of being useless 550 kilometers away. Where I get to hold your hands. Where waking up next to you isn't just something I dream about.  
  
I'm working on closing this distance. I promise you I'm working on it. Because this? Us? This is worth every effort. Every sacrifice. Every hard day.  
  
You showed me what it means to choose someone. To really choose them. Not because it's easy but because it's THEM. Because it's you.  
  
So I'm asking you gudiya.  
  
Will you be mine? Not just for Valentine's Day. But for every day after that. For the boring days and the beautiful days and the hard days and all of it.  
  
Will you choose me the way I choose you?  
  
I already know your answer. I can hear you saying "Sarib+ obviously yes" in that tone that makes me smile like an idiot.  
  
But I wanted to ask anyway.  
  
I love you Shreya. I really really love you meri gudiya.  
  
Now click yes so I can see the confetti.  
  
- Your Saiz  
  
P.S. - The "No" button? Yeah that's going to run away from you. Because no isn't an option when it comes to us.`;

const DayPropose: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [decided, setDecided] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameMode) {
      const interval = setInterval(() => {
        if (hearts.length < 5) {
          setHearts(prev => [...prev, { 
            id: Date.now(), 
            x: Math.random() * 80 + 10, 
            y: Math.random() * 80 + 10 
          }]);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [gameMode, hearts]);

  const handlePop = (id: number) => {
    setScore(s => s + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
    if (score + 1 >= 7) {
      setGameMode(false);
      setDecided(true);
      saveResponse();
    }
  };

  const saveResponse = async () => {
    setLoading(true);
    const data: ProposeData = {
      answer: 'yes',
      noClickAttempts: 0,
      answeredAt: new Date().toISOString(),
      timeToDecide: 0,
      gameScore: score + 1
    };
    try {
      await githubStorage.writeFile('data/propose-day.json', data);
      await githubStorage.updateProgress('proposeDay', 'completed');
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const moveNoButton = () => {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 240 - 120;
    setNoButtonPos({ x, y });
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center space-y-8 animate-soft min-h-[500px] relative overflow-hidden pb-12">
      {!decided && !gameMode && (
        <div className="text-center space-y-12 z-10 w-full px-4 flex flex-col items-center">
          <div className="mb-4">
            <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold mb-2">Will you marry me?</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 relative h-32 w-full max-w-sm">
            <button
              onClick={() => setGameMode(true)}
              className="px-12 py-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] text-2xl font-serif italic shadow-sm hover:scale-105 active:scale-95 transition-all z-20 border border-white/30 backdrop-blur-md"
            >
              yes
            </button>
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{ transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)` }}
              className="text-lg font-serif text-gray-400 opacity-40 transition-all duration-300 hover:opacity-100 cursor-default"
            >
              no
            </button>
          </div>
        </div>
      )}

      {gameMode && (
        <div className="text-center space-y-6 w-full max-w-md z-10">
          <h3 className="font-serif italic text-2xl text-[var(--accent)]">
            Pop 7 hearts for us! ({score}/7)
          </h3>
          <div className="relative h-[400px] w-full bg-white/10 rounded-[4rem] border-2 border-white/20 overflow-hidden shadow-inner backdrop-blur-sm">
            {hearts.map(h => (
              <button
                key={h.id}
                onClick={() => handlePop(h.id)}
                className="absolute transition-transform active:scale-150 animate-bounce"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <HeartIcon size={48} />
              </button>
            ))}
          </div>
        </div>
      )}

      {decided && (
        <div className="text-center space-y-6 animate-soft z-10 w-full max-w-2xl px-4 flex flex-col items-center">
          <div className="text-8xl drop-shadow-lg animate-pulse mb-2">💍</div>
          <h2 className="text-4xl font-serif text-[var(--accent)] italic font-bold">Forever begins now.</h2>
          
          <div className="aesthetic-card p-6 md:p-10 bg-white/30 backdrop-blur-lg border-white/50 w-full overflow-y-auto max-h-[50vh] custom-scrollbar shadow-xl border">
            <div className="font-serif italic text-left text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
              {PROPOSE_LETTER}
            </div>
          </div>

          <button 
            onClick={onComplete}
            className="mt-4 px-10 py-4 rounded-full bg-[var(--accent)] text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            I'm yours
          </button>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DayPropose;
