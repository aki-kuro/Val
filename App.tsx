
import React, { useState, useEffect, useCallback } from 'react';
import { DayKey, DayConfig } from './types';
import { DAYS, CONFIG, isDevMode } from './config';
import { githubStorage } from './services/githubService';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import DayRose from './components/DayRose';
import DayPropose from './components/DayPropose';
import DayChocolate from './components/DayChocolate';
import DayTeddy from './components/DayTeddy';
import DayPromise from './components/DayPromise';
import DayHug from './components/DayHug';
import DayKiss from './components/DayKiss';
import DayValentine from './components/DayValentine';

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<DayKey | null>(null);
  const [previewDay, setPreviewDay] = useState<DayConfig | null>(null);
  const [unlockedDays, setUnlockedDays] = useState<DayKey[]>([]);
  const [completedDays, setCompletedDays] = useState<DayKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDayConfig, setActiveDayConfig] = useState<DayConfig | null>(null);
  const [forceUnlock, setForceUnlock] = useState(false);

  const checkUnlocked = useCallback(() => {
    const unlocked: DayKey[] = [];
    const dev = isDevMode() || forceUnlock;
    
    DAYS.forEach(day => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      const now = new Date();
      if (dayDate <= now || CONFIG.testing || dev) {
        unlocked.push(day.id);
      }
    });
    setUnlockedDays(unlocked);
  }, [forceUnlock]);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await githubStorage.readFile('data/progress.json');
      setCompletedDays(data.daysCompleted || []);
    } catch (e) {
      console.log('Journey started...');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUnlocked();
    loadProgress();
  }, [checkUnlocked, loadProgress]);

  useEffect(() => {
    if (currentDay) {
      const conf = DAYS.find(d => d.id === currentDay);
      setActiveDayConfig(conf || null);
    } else {
      setActiveDayConfig(null);
    }
  }, [currentDay]);

  const handleCompleteDay = async () => {
    if (currentDay && !completedDays.includes(currentDay)) {
      setCompletedDays(prev => [...prev, currentDay]);
      await githubStorage.updateProgress(currentDay, 'completed');
    }
  };

  const renderCurrentDay = () => {
    if (!currentDay) return null;
    
    switch (currentDay) {
      case 'roseDay': return <DayRose onComplete={handleCompleteDay} />;
      case 'proposeDay': return <DayPropose onComplete={handleCompleteDay} />;
      case 'chocolateDay': return <DayChocolate onComplete={handleCompleteDay} />;
      case 'teddyDay': return <DayTeddy onComplete={handleCompleteDay} />;
      case 'promiseDay': return <DayPromise onComplete={handleCompleteDay} />;
      case 'hugDay': return <DayHug onComplete={handleCompleteDay} />;
      case 'kissDay': return <DayKiss onComplete={handleCompleteDay} />;
      case 'valentineDay': return <DayValentine onComplete={handleCompleteDay} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF5F0]">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-12 h-12 border-2 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          <p className="font-serif italic text-orange-500 text-2xl animate-pulse">Our memories are loading...</p>
        </div>
      </div>
    );
  }

  const activeTheme = activeDayConfig || previewDay;
  const themeStyle = activeTheme ? {
    '--soft-pink': activeTheme.theme.bg,
    '--accent': activeTheme.theme.primary,
    color: activeTheme.theme.text,
    backgroundColor: activeTheme.theme.bg
  } as React.CSSProperties : {
    '--soft-pink': '#FFF5F0',
    '--accent': '#FF7E5F',
    backgroundColor: '#FFF5F0'
  } as React.CSSProperties;

  return (
    <div style={themeStyle} className="transition-all duration-1000 min-h-screen">
      <Layout 
        onBack={currentDay ? () => { setCurrentDay(null); setPreviewDay(null); } : undefined}
      >
        <div className="animate-soft flex-1 flex flex-col">
          {currentDay ? (
            renderCurrentDay()
          ) : (
            <LandingPage 
              days={DAYS} 
              unlockedDays={unlockedDays} 
              completedDays={completedDays} 
              onSelectDay={setCurrentDay} 
              onHoverDay={setPreviewDay}
              onDevUnlock={() => setForceUnlock(true)}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};

export default App;
