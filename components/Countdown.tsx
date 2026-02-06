
import React, { useState, useEffect } from 'react';
import { DAYS } from '../config';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{h: string, m: string, s: string} | null>(null);
  const [nextDayName, setNextDayName] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextDay = DAYS.find(d => new Date(d.date) > now);
      
      if (!nextDay) {
        setTimeLeft(null);
        return;
      }

      setNextDayName(nextDay.name);
      const target = new Date(nextDay.date);
      const diff = target.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        h: hours.toString().padStart(2, '0'),
        m: mins.toString().padStart(2, '0'),
        s: secs.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center py-6">
        <span className="text-[var(--accent)] font-serif italic text-2xl">Every gift is waiting for you. ❤️</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-serif font-bold">
        Next gift in
      </div>
      <div className="flex space-x-4 items-center">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-serif text-[var(--accent)] font-bold">{timeLeft.h}</span>
          <span className="text-[8px] uppercase opacity-40 font-serif font-bold">Hours</span>
        </div>
        <span className="opacity-20 text-2xl pb-4 font-serif">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-serif text-[var(--accent)] font-bold">{timeLeft.m}</span>
          <span className="text-[8px] uppercase opacity-40 font-serif font-bold">Mins</span>
        </div>
        <span className="opacity-20 text-2xl pb-4 font-serif">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-serif text-[var(--accent)] font-bold">{timeLeft.s}</span>
          <span className="text-[8px] uppercase opacity-40 font-serif font-bold">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
