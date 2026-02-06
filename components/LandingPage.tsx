
import React, { useState } from 'react';
import { DayConfig, DayKey } from '../types';
import Countdown from './Countdown';

interface LandingPageProps {
  days: DayConfig[];
  unlockedDays: DayKey[];
  completedDays: DayKey[];
  onSelectDay: (day: DayKey) => void;
  onHoverDay: (day: DayConfig | null) => void;
  onDevUnlock: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ days, unlockedDays, completedDays, onSelectDay, onHoverDay, onDevUnlock }) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastClickedId, setLastClickedId] = useState<string | null>(null);

  const handleDayClick = (day: DayConfig) => {
    const isUnlocked = unlockedDays.includes(day.id);
    
    if (isUnlocked) {
      onSelectDay(day.id);
    } else {
      if (lastClickedId === day.id) {
        const newCount = clickCount + 1;
        if (newCount >= 15) {
          onDevUnlock();
          setClickCount(0);
        } else {
          setClickCount(newCount);
        }
      } else {
        setLastClickedId(day.id);
        setClickCount(1);
      }
    }
  };

  return (
    <div className="space-y-16 pb-20 animate-soft">
      <div className="pt-10 flex flex-col items-center justify-center">
        <Countdown />
      </div>

      <div className="grid grid-cols-2 gap-10 px-4">
        {days.map((day) => {
          const isUnlocked = unlockedDays.includes(day.id);
          const isCompleted = completedDays.includes(day.id);

          return (
            <button
              key={day.id}
              onClick={() => handleDayClick(day)}
              onMouseEnter={() => isUnlocked && onHoverDay(day)}
              onMouseLeave={() => onHoverDay(null)}
              className={`group relative py-12 px-6 rounded-[3.5rem] flex flex-col items-center justify-center transition-all duration-700 ${
                !isUnlocked 
                  ? 'opacity-20 cursor-default grayscale' 
                  : isCompleted 
                    ? 'shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] opacity-80' 
                    : 'bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm hover:-translate-y-3 hover:bg-white/50'
              }`}
              style={isUnlocked && !isCompleted ? { borderColor: day.theme.primary + '33' } : {}}
            >
              {isCompleted && (
                <div className="absolute top-6 right-6 opacity-40">
                   <span className="text-xs font-serif italic" style={{ color: day.theme.primary }}>❤</span>
                </div>
              )}
              
              <div className="text-center space-y-2">
                <div className="text-[9px] uppercase tracking-[0.4em] font-medium opacity-40 font-serif">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xl font-serif font-bold leading-tight tracking-tight">
                  {day.name}
                </div>
              </div>

              {!isUnlocked && clickCount > 0 && lastClickedId === day.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold opacity-10">{15 - clickCount}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage;
