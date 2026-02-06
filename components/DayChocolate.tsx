
import React, { useState, useEffect } from 'react';
import { githubStorage } from '../services/githubService';

const CHOCOLATES = [  
  {   
    type: 'reason',   
    content: 'The way you say "Sarib" jaana in that specific tone that nobody else can replicate.. it undoes me every single time.. jaana..'   
  },  
  {   
    type: 'reason',   
    content: 'Your soft laugh that makes time stop existing.. the whole world disappears until it\'s just you and that sound.. mera bacha..'   
  },  
  {   
    type: 'reason',   
    content: 'How you didn\'t try to fix me when I told you about my problems.. you just loved me through them instead.. gudiya..'   
  },  
  {   
    type: 'reason',   
    content: 'The way you\'re strong enough to fight through everything but still show me your vulnerable side.. that trust means everything.. jaana..'   
  },  
  {   
    type: 'reason',   
    content: 'Your sleepy voice when you\'re exhausted but stay up anyway just to talk to me.. those moments are my absolute favorite.. meri gudiya..'   
  },  
  {   
    type: 'reason',   
    content: 'How you say "Jaana mera bacha sb theek h na?" and I can feel how much you actually care through the screen.. every single time..'   
  },  
  {   
    type: 'reason',   
    content: 'The way you choose me every single day despite 550 kilometers trying its best to make things difficult.. that\'s strength.. gudiya..'   
  },  
  {   
    type: 'reason',   
    content: 'How you fight for us even on the hardest days when giving up would be so much easier.. you never give up on me.. jaana..'   
  },  
  {   
    type: 'reason',   
    content: 'That inner child you hide from everyone else but let me see.. I love protecting that part of you.. mera bacha.. it\'s so precious..'   
  },  
  {   
    type: 'reason',   
    content: 'Everything you do honestly.. I\'m literally obsessed with every single thing about you.. and I\'m not even embarrassed about it.. meri gudiya..'   
  },  
  {   
    type: 'memory',   
    content: 'March 28th.. 2025.. That first call when we just stared at each other like we\'d found exactly what we\'d been searching for without knowing we were searching.. gudiya.. that moment changed everything..'   
  },  
  {   
    type: 'memory',   
    content: 'The "I love you Saiz.. I really love you" voice note.. I\'ve listened to it millions of times and I\'ll probably listen to it million more.. jaana.. your voice is everything..'   
  },  
  {   
    type: 'memory',   
    content: 'Every single time you\'ve called me "mera bacha" and asked if everything\'s okay.. those moments make me feel so loved.. meri gudiya.. like I actually matter..'   
  },  
  {   
    type: 'memory',   
    content: 'When we couldn\'t talk for 4 days recently and I was genuinely crashing out and like i am today ah.. it made me realize how much I actually need you in my life.. jaana.. you\'re not just want.. you\'re need..'   
  },  
  {   
    type: 'memory',   
    content: 'Every conversation where you just listened without trying to fix me.. you taught me what real love actually looks like.. mera bacha.. that\'s the kind of forever I want with you..'   
  },  
  {   
    type: 'compliment',   
    content: 'Your eyes when you look at me through the screen.. I swear I can feel everything you\'re thinking just from that look.. gudiya.. they tell me you see me.. actually see me..'   
  },  
  {   
    type: 'compliment',   
    content: 'Your whole face when you smile.. the way your expression changes and lights up everything around you.. jaana.. you make the screen feel alive..'   
  },  
  {   
    type: 'compliment',   
    content: 'How you make me softer without making me weak and stronger without making me hard.. that\'s so rare.. meri gudiya.. you\'re the only one who can do this to me..'   
  },  
  {   
    type: 'song',   
    title: 'Sailor Song',   
    content: 'This is OURS.. Shreya Bacha.. every single time I hear it I think about you and us and everything we\'re building together.. jaana.. it\'s our song.. mera bacha..'   
  },  
  {   
    type: 'promise',   
    content: 'I promise this distance is temporary but my love for you is permanent.. meri gudiya.. I\'m working on closing these 550 kilometers.. because you\'re worth every effort.. jaana..'   
  }  
];

const DayChocolate: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [opened, setOpened] = useState<number[]>([]);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const [breaking, setBreaking] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await githubStorage.readFile('data/chocolate-day.json');
        if (data.opened) setOpened(data.opened);
      } catch (e) {}
    };
    loadData();
  }, []);

  const handleOpen = (index: number) => {
    if (opened.includes(index)) {
      setZoomedIndex(index);
      return;
    }
    
    setBreaking(index);
    setTimeout(() => {
      setBreaking(null);
      setOpened(prev => [...prev, index]);
      setZoomedIndex(index);
    }, 400);
  };

  const handleCloseZoom = async () => {
    if (opened.length === CHOCOLATES.length) {
      try {
        await githubStorage.writeFile('data/chocolate-day.json', { opened, completed: true });
        onComplete();
      } catch (e) {}
    }
    setZoomedIndex(null);
  };

  return (
    <div className="flex flex-col items-center space-y-10 animate-soft pb-10">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold">Sweet treasures for you</h2>
        <p className="text-sm font-serif opacity-60">Unlock all 20 chocolates ({opened.length}/20)</p>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full max-w-sm px-4">
        {CHOCOLATES.map((_, i) => (
          <div key={i} className="relative w-full aspect-square">
            <button
              onClick={() => handleOpen(i)}
              className={`w-full h-full rounded-xl transition-all duration-300 flex items-center justify-center text-2xl relative overflow-hidden ${
                opened.includes(i) 
                ? 'bg-white/40 border border-white/60 shadow-inner scale-95 opacity-50' 
                : 'chocolate-3d bg-[#4E2A1E] text-white hover:scale-105 active:scale-95'
              }`}
            >
              {opened.includes(i) ? '✓' : '🍫'}
              
              {breaking === i && (
                <div className="absolute inset-0 pointer-events-none z-10">
                  {[...Array(8)].map((_, j) => (
                    <div 
                      key={j}
                      className="absolute bg-[#3B1F16] w-2 h-2 rounded-sm animate-crumb"
                      style={{
                        left: '50%',
                        top: '50%',
                        '--tx': `${(Math.random() - 0.5) * 80}px`,
                        '--ty': `${(Math.random() - 0.5) * 80}px`,
                      } as any}
                    />
                  ))}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {zoomedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseZoom}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-[3rem] p-10 text-center shadow-2xl border-4 border-[var(--accent)]/20 animate-zoom-in relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-9xl animate-spin-slow">
               🍫
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--accent)] opacity-60">
                {CHOCOLATES[zoomedIndex].type}
              </div>
              
              {CHOCOLATES[zoomedIndex].title && (
                <div className="text-xl font-serif italic font-bold">
                  "{CHOCOLATES[zoomedIndex].title}"
                </div>
              )}
              
              <p className="text-lg font-serif italic leading-relaxed text-gray-800">
                {CHOCOLATES[zoomedIndex].content}
              </p>
              
              <button 
                onClick={handleCloseZoom}
                className="btn-primary w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs mt-4"
              >
                Close Piece
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .chocolate-3d {
          box-shadow: 
            0 4px 0 #3B1F16,
            0 6px 10px rgba(0,0,0,0.3);
          border: 1px solid #5D3A2D;
          background: linear-gradient(145deg, #4E2A1E, #3B1F16);
        }
        @keyframes crumb-fly {
          0% { transform: translate(0, 0) scale(1) rotate(0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-crumb { animation: crumb-fly 0.4s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.5) translateY(50px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes spin { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default DayChocolate;
