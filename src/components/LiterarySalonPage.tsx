import React, { useState } from 'react';
import { useSalonRewards } from '../hooks/useSalonRewards';
import { VictorianBurnGenerator } from './salon/VictorianBurnGenerator';
import { LiteraryPersonaTest } from './salon/LiteraryPersonaTest';
import { WaxSealScrolls } from './salon/WaxSealScrolls';
import { MagneticPoetry } from './salon/MagneticPoetry';
import { SalonStampPassbook } from './salon/SalonStampPassbook';
import { HonoraryDiplomaModal } from './salon/HonoraryDiplomaModal';
import { LiteraryArcade } from './LiteraryArcade';
import { WisdomCompass } from './WisdomCompass';
import { Sparkles, Flame, Award, Scroll, Feather, GraduationCap, Compass } from 'lucide-react';

export const LiterarySalonPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'burn' | 'persona' | 'scroll' | 'poetry' | 'scholarly'>('burn');
  const {
    unlockedStamps,
    unlockStamp,
    unlockedCount,
    isFellowshipEligible,
    userName,
    setUserName,
    justUnlocked,
    showDiplomaModal,
    setShowDiplomaModal
  } = useSalonRewards();

  const delightFeatures = [
    {
      id: 'burn' as const,
      label: 'Victorian Burn Generator',
      tagline: '19th-Century Retorts for Modern Life',
      icon: <Flame className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'persona' as const,
      label: 'Literary Persona Oracle',
      tagline: 'Discover Your Intellectual Alter-Ego',
      icon: <Award className="w-4 h-4 text-claret" />
    },
    {
      id: 'scroll' as const,
      label: 'Break the Wax Seal',
      tagline: 'Daily Kalam & Twain Destiny Scrolls',
      icon: <Scroll className="w-4 h-4 text-emerald-700" />
    },
    {
      id: 'poetry' as const,
      label: 'Magnetic Salon Poetry',
      tagline: 'Aphorism Workshop & Word Playground',
      icon: <Feather className="w-4 h-4 text-sky-700" />
    },
    {
      id: 'scholarly' as const,
      label: 'Scholarly Parlour Games',
      tagline: 'Diction Duels, Satire & Rhetoric',
      icon: <GraduationCap className="w-4 h-4 text-ink-muted" />
    }
  ];

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pt-2">
      
      {/* Title Header */}
      <div className="pb-6 border-b border-deckle">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-soft border border-brass/30 text-brass-dark text-xs font-mono font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brass" />
          <span>Interactive Humanities Atelier & Cabinet of Delights</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight">
          The Literary Salon
        </h1>
        <p className="text-sm sm:text-base text-ink-muted font-reading font-light mt-2 max-w-2xl leading-relaxed">
          An inviting digital parlour featuring witty Victorian burns for modern life, personality oracles, daily destiny scrolls, magnetic wordcraft, scholarly parlour games, and collectible fellowship honors.
        </p>
      </div>

      {/* Collectible Stamps & Fellowship Tracker */}
      <section>
        <SalonStampPassbook
          unlockedStamps={unlockedStamps}
          unlockedCount={unlockedCount}
          isFellowshipEligible={isFellowshipEligible}
          onOpenDiploma={() => setShowDiplomaModal(true)}
          justUnlocked={justUnlocked}
        />
      </section>

      {/* Primary Cabinet of Delights Navigator */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-deckle">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">
              The Cabinet of Delights
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-0.5">
              Interactive Parlour Activities
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1">
              Zero academic prerequisites required. Designed for immediate amusement, reflection, and shareable rewards.
            </p>
          </div>
        </div>

        {/* Feature switcher tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 scrollbar-none snap-x touch-pan-x">
          {delightFeatures.map((f) => {
            const isSelected = activeFeature === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFeature(f.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[92px] w-[145px] shrink-0 sm:w-auto snap-start ${
                  isSelected
                    ? 'bg-claret-soft border-claret shadow-xs ring-2 ring-claret/20'
                    : 'bg-white border-deckle hover:border-claret/40 text-ink-muted hover:bg-parchment-warm shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="p-1.5 rounded-lg bg-white border border-deckle shadow-2xs">
                    {f.icon}
                  </span>
                </div>

                <div>
                  <h4 className={`font-serif text-sm font-medium leading-tight ${isSelected ? 'text-claret font-semibold' : 'text-ink'}`}>
                    {f.label}
                  </h4>
                  <p className="text-[10px] font-sans text-ink-muted truncate mt-0.5">
                    {f.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase */}
        <div className="pt-2 animate-fade-in">
          {activeFeature === 'burn' && (
            <VictorianBurnGenerator onUnlockStamp={unlockStamp} />
          )}

          {activeFeature === 'persona' && (
            <LiteraryPersonaTest
              userName={userName}
              setUserName={setUserName}
              onUnlockStamp={unlockStamp}
            />
          )}

          {activeFeature === 'scroll' && (
            <WaxSealScrolls onUnlockStamp={unlockStamp} />
          )}

          {activeFeature === 'poetry' && (
            <MagneticPoetry onUnlockStamp={unlockStamp} />
          )}

          {activeFeature === 'scholarly' && (
            <LiteraryArcade />
          )}
        </div>
      </section>

      {/* 2. Interactive Wisdom Compass & Philosophical Reflection Chamber */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center gap-2 pb-2 border-b border-deckle">
          <Compass className="w-4 h-4 text-claret" />
          <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
            The Chamber of Literary Philosophy & Aphorisms
          </h3>
        </div>
        <WisdomCompass />
      </section>

      {/* Honorary Fellowship Diploma Modal */}
      <HonoraryDiplomaModal
        isOpen={showDiplomaModal}
        onClose={() => setShowDiplomaModal(false)}
        userName={userName}
        setUserName={setUserName}
      />

    </div>
  );
};
