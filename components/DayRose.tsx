
import React, { useState } from 'react';
import { githubStorage } from '../services/githubService';
import { RoseData } from '../types';
import { RoseIcon } from './AestheticIcons';

const ROSE_LETTERS: Record<string, string> = {
  RED: `Shreya Jaana,

March 28th, 2025. That's the day everything changed, meri gudiya. Out of millions of people texting millions of times...somehow we matched. We sometimes think it's random, but I know it's fate, mera bacha. The universe doesn't mess up twice when it comes to you and me.

That first call though, Jaana. Fuck. We just sat there staring at each other like we finally found what we'd been searching for without even knowing we were searching. No words. Just this feeling of "oh...there you are," mera bacha. Like I'd been waiting my whole life and didn't even know it until I saw your face on my screen, gudiya.

And then you laughed. That soft laugh, Jaana. Time just...stopped existing. I don't know how to explain it better than that, meri gudiya. When you laugh everything else disappears and it's just you and that sound and me trying to memorize it forever, mera bacha.

550 kilometers between us, Jaana. 550 fucking kilometers. And somehow you make it feel like nothing and everything at the same time, gudiya. Nothing because when I hear "Jaana mera bacha" in that voice of yours distance doesn't exist. Everything because I can't hold your hands, mera bacha. Can't massage your head when it hurts. Can't just be there the way I'm supposed to be for my gudiya.

I've listened to "I love you Saiz, I really love you" 2000+ times, Jaana. Maybe more. I lost count. I don't care if that's obsessive, mera bacha. I AM obsessed with you Shreya, meri gudiya. With everything you do. With the way you say my name. With how you fight for us even on the hardest days. With how you choose me every single day despite this distance trying its best to break us, Jaana.

You showed me what it means to choose someone, mera bacha. Not because it's easy. But because it's them. Because it's you, gudiya.

This distance is temporary, Jaana. I'm working on it. But you and me? That's permanent, mera bacha.

I love you. I really really love you meri gudiya.

- Sarib`,

  WHITE: `Shreya Jaana,

You know when I knew I loved you? Really loved you, mera bacha?

When I told you about my issues, gudiya. My problems. All the broken parts I usually hide. And you didn't try to fix me, Jaana. You just sat there with me. Listened. Didn't judge. Didn't try to solve me like I'm some puzzle that needs correcting, meri gudiya.

You just loved me through it, mera bacha.

Most people hear your problems and immediately want to give advice or fix things or make it better, Jaana. You? You understood something most people don't, gudiya. Sometimes people don't need fixing. Sometimes they just need someone to sit with them in the dark until they're ready to find the light themselves, mera bacha.

That's what you do for me, meri gudiya. You don't try to change me, Jaana. You don't need me to be different. You see me - the real me - and you stay anyway, mera bacha. You choose me anyway, gudiya.

And that inner child you hide from everyone else? I see her too Shreya, Jaana. I see how hard you try to be strong, meri gudiya. And you ARE strong. But you don't have to hide that vulnerable side from me, mera bacha. I love that part of you too. Maybe especially that part, gudiya.

You make me softer without making me weak, Jaana. You make me stronger without making me hard. That's rare, meri gudiya. That's so fucking rare, mera bacha.

You taught me that love isn't about being perfect for someone, Jaana. It's about being real with them, gudiya. Completely. Messily. Honestly, mera bacha.

I could write a thousand letters and still not capture what you mean to me, Jaana. But I'll try anyway, meri gudiya. Every single day. For the rest of my life if you let me, mera bacha.

Thank you for loving me when I'm difficult to love, Jaana. Thank you for understanding me when I don't even understand myself, meri gudiya.

You're everything Shreya, mera bacha. Just...everything, gudiya.

- Your Saiz`,

  PINK: `My Shreya Jaana,

Jaana mera bacha sb theek h na?

I swear to god when you say that...when you ask if I'm okay in that soft worried voice, meri gudiya...something in my chest just breaks and heals at the same time, mera bacha.

You know what I'm obsessed with? Like genuinely obsessed with, Jaana? The way you say "Sarib+" in that tone that's just...yours, gudiya. The way "Jaana" sounds different when YOU say it. Soft. A little shy. Like you're giving me something precious every time, mera bacha.

And your sleepy voice, Jaana. Oh my god your sleepy voice, meri gudiya. When you're exhausted but you stay up anyway just to talk to me. When your words get all slow and lovely and I can tell you're fighting sleep just to hear me a little longer, mera bacha. Those are my favorite moments Shreya, gudiya. When you're too tired to pretend. When you're just...you. Raw and real and perfect, Jaana.

I think about the small things constantly, mera bacha. How your eyes look when you're looking at me through the screen, meri gudiya. How your whole face changes when you smile, Jaana. That exact expression you make when you're sleepy and happy at the same time, gudiya.

I know I can't hold you yet, mera bacha. Can't touch your face or play with your hair or do any of the things I think about doing every single day, Jaana. But meri gudiya...when I finally can? I'm never letting go. Never, mera bacha.

Mera bacha aaja mere pass, Jaana. I know you can't. Not yet. But soon. I'm working on it, gudiya. I promise I'm working on closing these 550 kilometers, meri gudiya.

Until then I'll keep saying I love you in every way I know how, Jaana. Through screens. Through voice notes you'll probably listen to once while I listen to yours 200 times, mera bacha. Through messages at 3am because I can't sleep without telling you goodnight properly, gudiya.

You're my favorite person Shreya, Jaana. My favorite everything, mera bacha. The way you exist in this world makes me want to exist in it too, meri gudiya.

I love you meri gudiya, mera bacha. So much it scares me sometimes, Jaana.

- Sarib`,

  YELLOW: `Shreya Jaana,

Remember when we couldn't talk for 4 days recently, mera bacha? I was crashing out. Like genuinely losing it, gudiya. And that's when it hit me how much I NEED you in my life, Jaana. Not want. Need, meri gudiya.

You're not just someone I love, mera bacha. You're the person I choose to do life with, gudiya. The boring parts. The hard parts. The beautiful mundane ordinary parts that people don't write songs about, Jaana.

You know what I want, meri gudiya? Just simple daily things with you in it, mera bacha. Grocery shopping together. Watching you eat breakfast I made, Jaana. Falling asleep next to you without having to say goodbye through a screen, gudiya. Just...existing together, mera bacha.

The future doesn't need to be complicated Shreya, Jaana. The future is simple: you're in it, meri gudiya. That's literally all that matters. Everything else we'll figure out as we go, mera bacha.

You fight for us even on days when it's hard, gudiya. Even when the distance feels impossible, Jaana. Even when we're both exhausted and frustrated and missing each other so much it physically hurts, mera bacha. You still choose us. You still choose me, meri gudiya.

That means everything Jaana. Everything, mera bacha.

I don't have poetic words for this, gudiya. I just have the truth, Jaana. You make me want to be better. Not because you're trying to change me, mera bacha. But because loving you makes me want to show up as the best version of myself, meri gudiya. For you. For us. For the future we're building together across these 550 kilometers, Jaana.

This distance is teaching me something, mera bacha. It's teaching me that love isn't about proximity, gudiya. It's about commitment. It's about choosing someone even when it's difficult. Especially when it's difficult, Jaana.

And I choose you Shreya, meri gudiya. Every single day. In every single way, mera bacha.

The distance is temporary, Jaana. My love for you is permanent, gudiya.

Come to me soon Jaana. Or I'll come to you, mera bacha. Either way...we're ending this distance. Together, meri gudiya.

I love you meri gudiya, mera bacha.

- Your Saiz`
};

const COLORS = [
  { name: 'RED', hex: '#FF4B2B', meaning: 'Passionate Love' },
  { name: 'WHITE', hex: '#FFF9F0', meaning: 'Pure Bond' },
  { name: 'PINK', hex: '#FF85A1', meaning: 'Grace & Joy' },
  { name: 'YELLOW', hex: '#FFCC33', meaning: 'Sunny Friendship' }
];

const DayRose: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [letter, setLetter] = useState<string>('');

  const handleSelect = async (color: string) => {
    setSelectedColor(color);
    const newLetter = ROSE_LETTERS[color] || "My heart beats only for you.";
    setLetter(newLetter);
    
    // Save selection automatically
    const data: RoseData = {
      color: color,
      letter: newLetter,
      viewedAt: new Date().toISOString(),
      completed: true
    };
    try {
      await githubStorage.writeFile('data/rose-day.json', data);
      await githubStorage.updateProgress('roseDay', 'completed');
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 animate-soft w-full">
      {!selectedColor ? (
        <div className="text-center space-y-10 w-full max-w-md">
          <h3 className="font-serif text-4xl italic text-[var(--accent)] font-medium">
            Pick a rose for our journey...
          </h3>
          <div className="grid grid-cols-2 gap-8 w-full">
            {COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => handleSelect(c.name)}
                className="group bg-white/30 backdrop-blur-md p-10 rounded-[3rem] border border-white/40 hover:-translate-y-2 hover:bg-white/50 transition-all flex flex-col items-center shadow-sm"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-500">
                  <RoseIcon color={c.hex} size={64} />
                </div>
                <span className="mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em] font-sans">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg aesthetic-card p-10 md:p-16 animate-soft relative border-white/40 flex flex-col items-center text-center">
          <div className="mb-6">
            <RoseIcon color={COLORS.find(c => c.name === selectedColor)?.hex} size={80} />
          </div>
          <h3 className="font-cursive text-4xl text-[var(--accent)] mb-8">A gift for you Shreya...</h3>
          <div className="text-gray-700 leading-relaxed italic text-base md:text-lg font-serif max-w-md whitespace-pre-wrap text-left bg-white/20 p-6 rounded-2xl border border-white/30 overflow-y-auto max-h-[60vh] custom-scrollbar">
            {letter}
          </div>
          <button 
            onClick={onComplete}
            className="mt-10 btn-primary px-8 py-3 rounded-full font-serif font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            I love you too
          </button>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--accent);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DayRose;
