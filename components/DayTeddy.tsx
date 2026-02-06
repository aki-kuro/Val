
import React, { useState, useEffect, useRef } from 'react';
import { githubStorage } from '../services/githubService';

const QUESTIONS = [  
  {  
    question: "What was the exact moment you knew you loved me Jaana?"  
  },  
  {  
    question: "What's your favorite thing I've ever said to you? The one thing that stuck with you?"  
  },  
  {  
    question: "What about our relationship makes you feel most secure even with this distance?"  
  },  
  {  
    question: "If you could relive one moment with me - any moment - which one would you choose and why?"  
  },  
  {  
    question: "What's something I do that makes you feel most loved? Even the small things count."  
  },  
  {  
    question: "Where do you see us in 5 years gudiya? What does that future look like to you?"  
  },  
  {  
    question: "What's the first thing you want to do when we finally close this distance and I'm actually there with you?"  
  }  
];

const DayTeddy: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [revealedPercent, setRevealedPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleNext = async () => {
    if (!currentInput.trim()) return;
    const newAnswers = [...answers, currentInput];
    setAnswers(newAnswers);
    setCurrentInput('');
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setGameStarted(true);
    }
  };

  useEffect(() => {
    if (gameStarted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFB347';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 2000; i++) {
          ctx.fillStyle = i % 2 === 0 ? '#FFCC33' : '#FFF9E5';
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }
      }
    }
  }, [gameStarted]);

  const scrub = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.9) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let count = 0;
      for (let i = 3; i < imageData.length; i += 4) {
        if (imageData[i] === 0) count++;
      }
      const progress = (count / (canvas.width * canvas.height)) * 100;
      setRevealedPercent(progress);
      if (progress > 60) {
        finishEverything();
      }
    }
  };

  const finishEverything = async () => {
    try {
      await githubStorage.writeFile('data/teddy-day.json', { 
        answers, 
        completed: true 
      });
      onComplete();
    } catch (e) {
      console.error(e);
    }
  };

  const teddyProgress = (step / QUESTIONS.length) * 100;

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12 animate-soft max-w-md mx-auto w-full px-4 pb-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif italic text-[var(--accent)] font-bold">
          {gameStarted ? "Find your Teddy" : "Build your Teddy"}
        </h2>
        <p className="text-sm font-serif opacity-60">
          {gameStarted ? "Rub the screen to find what's hidden!" : "Answer these questions for me Jaana."}
        </p>
      </div>

      {!gameStarted ? (
        <div className="w-full space-y-8 animate-soft flex flex-col items-center">
          <div className="relative w-48 h-48 flex items-center justify-center bg-white/20 rounded-full shadow-inner border border-white/40">
            <div 
              className="absolute inset-0 border-4 border-[var(--accent)] rounded-full opacity-10 transition-all duration-700" 
              style={{ clipPath: `inset(${100 - teddyProgress}% 0 0 0)` }}
            />
            <div className="text-8xl transition-all duration-700" style={{ opacity: Math.max(0.2, step / QUESTIONS.length), transform: `scale(${0.6 + (step / QUESTIONS.length) * 0.4})` }}>
              🧸
            </div>
          </div>

          <div className="w-full bg-white/40 backdrop-blur-md p-8 rounded-[3rem] border border-white/60 shadow-xl space-y-6">
            <label className="block text-center font-serif text-xl italic text-gray-800 leading-relaxed min-h-[4rem]">
              {QUESTIONS[step].question}
            </label>
            <textarea 
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="w-full p-5 rounded-3xl bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all font-serif italic h-32 text-gray-800"
              placeholder="Tell me everything..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleNext()}
            />
            <button 
              onClick={handleNext}
              className="w-full py-5 rounded-full bg-[var(--accent)] text-white font-bold uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all font-serif text-xs"
            >
              Continue building
            </button>
          </div>
          
          <div className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold font-serif">
            Question {step + 1} of {QUESTIONS.length}
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-square bg-white/20 rounded-[4rem] overflow-hidden border-2 border-white/40 shadow-inner group">
          <div className="absolute inset-0 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
            🧸
          </div>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseMove={scrub}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={scrub}
          />
        </div>
      )}
    </div>
  );
};

export default DayTeddy;
