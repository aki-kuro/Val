
export type DayKey = 'roseDay' | 'proposeDay' | 'chocolateDay' | 'teddyDay' | 'promiseDay' | 'hugDay' | 'kissDay' | 'valentineDay';

export interface DayConfig {
  name: string;
  date: string;
  id: DayKey;
  icon: string;
  theme: {
    primary: string;
    secondary: string;
    text: string;
    bg: string;
  };
}

export interface ProgressData {
  daysUnlocked: string[];
  daysCompleted: string[];
  startedAt: string;
  lastUpdated?: string;
}

export interface RoseData {
  color: string;
  letter: string;
  viewedAt: string;
  completed: boolean;
  gameScore?: number;
}

export interface ProposeData {
  answer: 'yes' | 'no';
  noClickAttempts: number;
  answeredAt: string;
  timeToDecide: number;
  gameScore?: number;
}
