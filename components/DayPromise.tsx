
import React, { useState } from 'react';
import { githubStorage } from '../services/githubService';

const PRESETS = [  
  "I promise to choose you every single day Jaana especially on the days when it's hard and distance makes everything feel impossible",  
  "I promise this distance is temporary and I'm doing everything I can to end it",  
  "I promise to never let you doubt how much I love you kilometers mean nothing compared to what we have",  
  "I promise to be there for you even when I physically can't be - through screens, through voice notes, through 3am messages, whatever it takes",  
  "I promise to love every version of you Jaana - the strong one who fights through everything and the vulnerable one who shows me that inner child",  
  "I promise to fight for us no matter what obstacles come our way - giving up isn't an option when it comes to you and me",  
  "I promise to make you feel secure even from far away - you never have to question where you stand with me",  
  "I promise to build the future we dream about together the simple daily life where you're just there and that's everything",  
  "I promise to protect that inner child you hide from everyone else you're safe with me gudiya all of you",  
  "I promise this distance is just a chapter in our story, not the whole book Jaana"  
];

const BUD_POSITIONS = [
  { x: 120, y: 100 },
  { x: 280, y: 120 },
  { x: 200, y: 50 },
  { x: 80, y: 180 },
  { x: 320, y: 200 },
  { x: 150, y: 140 },
  { x: 250, y: 140 },
  { x: 100, y: 210 },
  { x: 300, y: 80 },
  { x: 200, y: 100 }
];

const DayPromise: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: Game, 1: Tree
  const [revealed, setRevealed] = useState<number[]>([]);
  const [customPromise, setCustomPromise] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [connected, setConnected] = useState<number[]>([]);

  const handleReveal = (index: number) => {
    if (!revealed.includes(index)) {
      setRevealed([...revealed, index]);
    }
  };

  const handleConnect = (id: number) => {
    if (connected.includes(id)) return;
    const next = [...connected, id];
    setConnected(next);
    if (next.length === 5) {
      setTimeout(() => setStage(1), 500);
    }
  };

  const handleSubmit = async () => {
    if (!customPromise.trim() || revealed.length < 5) return;
    setSubmitted(true);
    try {
      await githubStorage.writeFile('data/promise-day.json', { 
        presets: revealed, 
        custom: customPromise, 
        completed: true 
      });
      onComplete();
    } catch (e) {}
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-soft max-w-md mx-auto w-full px-4 pb-12">
      {stage === 0 ? (
        <div className="text-center space-y-10 w-full animate-soft">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold">Connect Our Path</h2>
            <p className="text-sm font-serif opacity-60">Tap the stars in order to grow our promise tree.</p>
          </div>
          <div className="relative w-full aspect-square bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleConnect(i)}
                className={`absolute w-12 h-12 flex items-center justify-center text-2xl transition-all duration-500 rounded-full ${
                  connected.includes(i) ? 'bg-[var(--accent)] text-white scale-125 shadow-lg' : 'bg-white/30 text-gray-400'
                }`}
                style={{
                  top: `${50 + 35 * Math.sin((i * 2 * Math.PI) / 5)}%`,
                  left: `${50 + 35 * Math.cos((i * 2 * Math.PI) / 5)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {connected.includes(i) ? '★' : '☆'}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="text-center space-y-4 animate-soft">
            <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold">The Promise Tree</h2>
            <p className="text-sm font-serif opacity-60 italic">Tap the buds to reveal my promises to you.</p>
          </div>

          <div className="relative w-full aspect-[4/3] max-w-sm flex items-center justify-center animate-soft">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-lg">
              {/* Trunk and Main Branches */}
              <path d="M200,280 Q200,200 200,150" stroke="#5D4037" strokeWidth="12" fill="none" strokeLinecap="round" />
              <path d="M200,180 Q120,160 80,180" stroke="#5D4037" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M200,180 Q280,160 320,200" stroke="#5D4037" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M200,150 Q200,100 200,50" stroke="#5D4037" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M200,150 Q120,120 120,100" stroke="#5D4037" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M200,150 Q280,120 280,120" stroke="#5D4037" strokeWidth="6" fill="none" strokeLinecap="round" />
              
              {/* Extra Twigs for 10 Buds */}
              <path d="M200,150 Q160,140 150,140" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M200,150 Q240,140 250,140" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M140,170 Q110,190 100,210" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M240,110 Q280,90 300,80" stroke="#5D4037" strokeWidth="4" fill="none" strokeLinecap="round" />

              {BUD_POSITIONS.map((pos, i) => (
                <g key={i} onClick={() => handleReveal(i)} className="cursor-pointer group">
                  <circle 
                    cx={pos.x} 
                    cy={pos.y} 
                    r={revealed.includes(i) ? 14 : 10} 
                    fill={revealed.includes(i) ? "var(--accent)" : "#C8E6C9"} 
                    className="transition-all duration-500 group-hover:scale-125 shadow-sm"
                  />
                  <circle cx={pos.x} cy={pos.y} r={revealed.includes(i) ? 6 : 0} fill="white" className="transition-all duration-500" />
                </g>
              ))}
            </svg>

            <div className="absolute top-0 left-0 w-full pointer-events-none z-20">
              {revealed.length > 0 && !submitted && (
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 mt-4 mx-4 text-center animate-soft min-h-[5rem] flex items-center justify-center">
                  <p className="font-serif italic text-base text-gray-800 leading-relaxed">
                    {PRESETS[revealed[revealed.length - 1]]}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.3em] opacity-40 font-serif font-bold">Promises Unlocked: {revealed.length}/10</p>
          </div>

          {revealed.length >= 5 && !submitted && (
            <div className="w-full space-y-6 animate-soft">
              <textarea
                value={customPromise}
                onChange={(e) => setCustomPromise(e.target.value)}
                className="w-full p-6 rounded-[2.5rem] bg-white/40 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-serif italic h-32 shadow-inner text-gray-800"
                placeholder="Write a special promise for our future..."
              />
              <button 
                onClick={handleSubmit}
                className="w-full py-5 rounded-full bg-[var(--accent)] text-white font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(255,126,95,0.3)] hover:scale-105 active:scale-95 transition-all font-serif text-xs"
              >
                Plant Our Promise
              </button>
            </div>
          )}

          {submitted && (
            <div className="text-center space-y-6 animate-soft py-10">
              <p className="font-serif italic text-3xl text-[var(--accent)] font-bold">Our love is rooted forever Jaana.</p>
              <div className="text-6xl animate-pulse">🌳❤️</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DayPromise;
