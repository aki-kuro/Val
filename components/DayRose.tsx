
import React, { useState } from 'react';
import { githubStorage } from '../services/githubService';
import { RoseData } from '../types';
import { RoseIcon } from './AestheticIcons';

const ROSE_LETTERS: Record<string, string> = {
  RED: `To my Shreya

I still blush when I say your name.. even after 11 months.. You tell me you love it when I say your name.. when I call and so I keep saying it..jaana.. just to see that smile.. Just to lose myself for a second in the moment that you're real and you're mine.. gudiya..

There's a moment right before I fall asleep where I think about your face.. the way you look at me when you think I'm not paying attention.. mera bacha.. Like you're trying to memorize me the same way I'm memorizing you.. jaana.. And it kills me.. Shreya.. It absolutely destroys me.. because I can't translate that feeling into words.. gudiya..

When we talk.. I mean REALLY talk.. when you're telling me about the things that scare you.. the things you've never told anyone else.. that's when I know what love actually means.. meri gudiya.. It's not the grand gestures.. It's you trusting me with the parts of you that you've locked away.. and me holding them so gently they never break.. jaana.. mera bacha..

Your voice changes when you're vulnerable with me.. it gets softer.. Smaller somehow.. And I want to be the only person who gets to see you like this.. raw and unfiltered and real.. gudiya.. This version of you.. just for me.. jaana.. mera bacha..

I think about holding your face in my hands constantly.. about brushing your hair back and just looking at you.. meri gudiya.. About tracing the lines of your face like I'm trying to write poetry with my fingertips.. jaana.. about the first time I get to kiss you and know it's not through a screen.. mera bacha..

Distance is a cruel thing.. but you make even the distance feel like it means something.. gudiya.. Like we're collecting moments of waiting so that when we're finally together.. every second matters.. jaana.. meri gudiya.. mera bacha..

I love you.. Shreya.. The way you love me back is the bravest thing I've ever witnessed.. mera bacha.. jaana..

- Sarib`,

  WHITE: `To my Jaana

There are no words for you.. and somehow you've become every word I've ever needed.. mera bacha.. gudiya..

Jaana is more than your name..it's the sound of coming home.. It's the feeling of finding something you didn't know you were searching for.. mera bacha.. When I say it.. my entire body relaxes.. like I'm finally safe.. gudiya..like you're right there..

You are the depth I didn't know I needed.. jaana.. You see me.. not the version I show the world.. but the version that's terrified and hopeful and desperately in love.. mera bacha.. And you stay anyway.. without needing me to be anyone other than who I am.. gudiya..

There's a kind of protection in the way you love me.. Jaana.. You hold my broken parts and tell me they're beautiful.. meri gudiya.. You tell me I'm safe with you.. and I believe you because you've never given me a reason not to.. mera bacha..

The distance aches.. god.. it aches.. jaana.. I miss you in a way that's physical.. like my body knows you're not here and it refuses to believe it.. mera bacha.. But when you call.. when I hear your voice.. suddenly 550 kilometers doesn't feel like an ending.. gudiya.. It feels like a promise we're keeping..

You've built a home inside me.. one I carry everywhere.. jaana.. On hard days.. I go there.. mera bacha.. Late nights.. I find you in my chest.. gudiya.. This feeling of belonging to someone.. of being chosen by someone who knows all the darkness and still comes back.. that's what Jaana means..

I want to belong to you completely.. Shreya.. In every lifetime.. in every version of this story.. jaana.. mera bacha.. gudiya..I choose you..

- Sarib`,

  PINK: `To my Gudiya

That laugh.. oh god.. that laugh of yours.. jaana.. mera bacha..

The one that comes out when you're genuinely happy.. when you forget everything for a second and just exist in pure joy.. gudiya.. That's the moment I fall in love with you all over again.. jaana.. That's the moment I know why the universe brought us together.. mera bacha..

You have a kiddo voice.. did you know that.. gudiya.. jaana... When you're tired or just really happy.. your voice gets softer and it's like watching someone completely let go every worry.. mera bacha.. And only I'm the one who can see you like that.. jaana.. I'm the only one to witness every moment and I will treasure them until I die.. gudiya..

Your dreams.. the ones you only tell me about when the world is quiet.. those are sacred to me.. mera bacha.. You dream so big.. Gudiya.. jaana.. You want so much from this life.. and you deserve every single thing you're asking for.. gudiya.. Let me help you reach for it.. jaana..

The carefree part of you that wants to dance in the rain and laughs at my bad jokes.. that's the part I'm madly in love with.. gudiya.. jaana.. i won't ever let anyone turn that off.. especially not the world.. mera bacha.. my world needs your lightness.. gudiya.. It needs your joy.. jaana..

I want to be the person who keeps that spark alive in you.. who reminds you that it's okay to be soft.. to be playful.. to be wonderfully.. unapologetically YOU.. mera bacha.. jaana.. gudiya..

You make me remember what it feels like to be alive.. gudiya.. Before you.. I was just existing.. jaana.. mera bacha.. Now I'm living.. because you taught me how..

Never stop laughing like that.. jaana.. gudiya.. mera bacha.. Never stop being this version of you..

- Sarib`,

  YELLOW: `To my Bacha

I see the weight you carry.. the way you try so hard to be strong.. mera bacha.. jaana.. And I want you to know.. you don't have to do that with me.. gudiya..

You don't have to be the strong one all the time.. jaana.. You don't have to pretend everything is okay when it's not.. mera bacha..You've endured so much.. carried so much.. and somewhere along the way you learned that mattering meant always holding on tight.. gudiya.. But that's not what I need.. jaana.. gudiya.. mera bacha.. I just need you..

Let me teach you what it's like to be held.. to lean into someone without fear that they'll disappear.. bacha.. jaana.. When you're with me.. you can be completely carefree.. mera bacha.. gudiya.. You're allowed to cry.. you're allowed to need me.. you're allowed to just be.. bacha..

I see the broken parts you hide from the world.. jaana.. mera bacha.. And I want to wrap myself around those parts and protect them until you remember what it feels like to be safe.. gudiya.. bacha.. Until you understand that being held doesn't make you weak.. it makes you able to finally breathe.. mera bacha.. jaana..

There's a reason i call you Bacha.. because somewhere deep inside.. you wanted permission to just rest.. jaana.. gudiya.. mera bacha.. You wanted someone to say.. it's okay to let go now.. it's okay to fall apart.. and I'll be right here to catch you.. bacha..

So let go with me.. Bacha.. jaana.. gudiya.. mera bacha.. Tell me what hurts.. show me the pieces of you that are still healing.. let me create a space where you can just be.. bacha..

You've carried everything.. let me carry you now.. jaana.. gudiya.. mera bacha.. Let me show you what it feels like to be loved without conditions.. without expectations.. just completely and utterly cherished..

Come home.. Bacha.. come home to my arms.. jaana.. gudiya.. mera bacha..

- Sarib`
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
