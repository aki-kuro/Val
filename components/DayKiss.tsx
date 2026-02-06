
import React, { useState, useEffect } from 'react';
import { githubStorage } from '../services/githubService';

const MATCH_ICONS = ['💋', '❤️', '💖', '💝', '🌹', '💍'];
const CARDS = [...MATCH_ICONS, ...MATCH_ICONS].sort(() => Math.random() - 0.5);

const DayKiss: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (CARDS[newFlipped[0]] === CARDS[newFlipped[1]]) {
        setMatched(prev => [...prev, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === CARDS.length && matched.length > 0) {
      handleComplete();
    }
  }, [matched]);

  const handleComplete = async () => {
    setCompleted(true);
    try {
      await githubStorage.writeFile('data/kiss-day.json', { completed: true, timestamp: new Date().toISOString() });
      // We don't call onComplete immediately so they see the muah text
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-soft">
      {!completed ? (
        <>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold">Kiss Memory</h2>
            <p className="text-sm font-serif opacity-60">Match all the pairs to get your kiss!</p>
          </div>

          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {CARDS.map((icon, i) => (
              <button
                key={i}
                onClick={() => handleCardClick(i)}
                className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all duration-500 shadow-md transform ${
                  flipped.includes(i) || matched.includes(i)
                  ? 'bg-white rotate-0'
                  : 'bg-[var(--accent)] rotate-180 opacity-60'
                }`}
              >
                {(flipped.includes(i) || matched.includes(i)) ? icon : '?'}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-8 animate-soft text-center p-8 bg-white/20 backdrop-blur-md rounded-[4rem] border border-white/40 shadow-xl max-w-sm">
          <span className="text-[14rem] leading-none drop-shadow-xl animate-pulse">💋</span>
          <div className="space-y-6">
            <p className="text-3xl font-bold text-gray-800 leading-tight tracking-wider break-words">
              herres a kiss for you jaana
            </p>
            <button 
              onClick={onComplete}
              className="px-10 py-4 rounded-full bg-[var(--accent)] text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Catch it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayKiss;
