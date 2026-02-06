
import React from 'react';
import { isDevMode } from '../config';

interface LayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col p-8 md:p-12 max-w-2xl mx-auto selection:bg-orange-100 overflow-x-hidden">
      <header className="flex items-center justify-between mb-12 h-12">
        {onBack && (
          <button 
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center text-[#F5576C] opacity-40 hover:opacity-100 transition-opacity active:scale-90"
            aria-label="Go back"
          >
            <span className="text-4xl font-light">←</span>
          </button>
        )}
        
        <div className="flex-1"></div>

        <div className="flex items-center space-x-4">
          {isDevMode() && (
            <div className="px-3 py-1 rounded-full bg-orange-100/50 text-[9px] text-orange-600 font-bold border border-orange-200/50 uppercase tracking-widest">
              Dev Mode
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;
