
import { DayConfig } from './types';

const obfuscate = (token: string) => btoa(token);
const deobfuscate = (encoded: string) => atob(encoded);

export const CONFIG = {
  nicknames: {
    primary: 'Darling',
    secondary: 'My Love'
  },
  github: {
    owner: 'OWNER_USERNAME',
    repo: 'valentine-week-2026',
    token: obfuscate('ghp_YOUR_TOKEN_HERE'),
    branch: 'main'
  },
  dates: {
    roseDay: '2026-02-07',
    proposeDay: '2026-02-08',
    chocolateDay: '2026-02-09',
    teddyDay: '2026-02-10',
    promiseDay: '2026-02-11',
    hugDay: '2026-02-12',
    kissDay: '2026-02-13',
    valentineDay: '2026-02-14'
  },
  testing: false 
};

export const getToken = () => deobfuscate(CONFIG.github.token);

export const isDevMode = () => 
  typeof window !== 'undefined' && 
  (window.location.search.includes('dev=true') || window.location.search.includes('love=forever'));

export const DAYS: DayConfig[] = [
  { 
    id: 'roseDay', 
    name: 'Rose Day', 
    date: CONFIG.dates.roseDay, 
    icon: '🌹',
    theme: { primary: '#FF7E5F', secondary: '#FEB47B', text: '#5D2E2E', bg: '#FFF5F0' } 
  },
  { 
    id: 'proposeDay', 
    name: 'Propose Day', 
    date: CONFIG.dates.proposeDay, 
    icon: '💍',
    theme: { primary: '#6A11CB', secondary: '#2575FC', text: '#FFFFFF', bg: '#F5F5FF' } 
  },
  { 
    id: 'chocolateDay', 
    name: 'Chocolate Day', 
    date: CONFIG.dates.chocolateDay, 
    icon: '🍫',
    theme: { primary: '#8E5431', secondary: '#D2B48C', text: '#3E2723', bg: '#FAF3E0' } 
  },
  { 
    id: 'teddyDay', 
    name: 'Teddy Day', 
    date: CONFIG.dates.teddyDay, 
    icon: '🧸',
    theme: { primary: '#FFB347', secondary: '#FFCC33', text: '#5D4037', bg: '#FFF9E5' } 
  },
  { 
    id: 'promiseDay', 
    name: 'Promise Day', 
    date: CONFIG.dates.promiseDay, 
    icon: '🤝',
    theme: { primary: '#43E97B', secondary: '#38F9D7', text: '#1B5E20', bg: '#F0FFF4' } 
  },
  { 
    id: 'hugDay', 
    name: 'Hug Day', 
    date: CONFIG.dates.hugDay, 
    icon: '🤗',
    theme: { primary: '#A18CD1', secondary: '#FBC2EB', text: '#4A148C', bg: '#F9F0FF' } 
  },
  { 
    id: 'kissDay', 
    name: 'Kiss Day', 
    date: CONFIG.dates.kissDay, 
    icon: '💋',
    theme: { primary: '#F093FB', secondary: '#F5576C', text: '#FFFFFF', bg: '#FFF5F5' } 
  },
  { 
    id: 'valentineDay', 
    name: 'Valentine\'s Day', 
    date: CONFIG.dates.valentineDay, 
    icon: '💝',
    theme: { primary: '#FF0844', secondary: '#FFB199', text: '#FFFFFF', bg: '#FFF0F0' } 
  },
];
