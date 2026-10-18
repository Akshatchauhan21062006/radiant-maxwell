import React, { useState } from 'react';
import { DictionDuel } from './games/DictionDuel';
import { TwainVsWilde } from './games/TwainVsWilde';
import { RhetoricalAlchemist } from './games/RhetoricalAlchemist';
import { EtymologyVoyage } from './games/EtymologyVoyage';
import { LiteraryAtelier } from './LiteraryAtelier';
import { Zap, Feather, Sparkles, Compass, Gamepad2, BookOpen } from 'lucide-react';

export const LiteraryArcade: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'diction' | 'wit' | 'rhetoric' | 'devices' | 'etymology'>('diction');

  const games = [
    {
      id: 'diction' as const,
      title: 'The Diction Duel',
      subtitle: 'Twain’s Lightning vs. Lightning Bug',
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      tag: 'Mark Twain'
    },
    {
      id: 'wit' as const,
      title: 'Twain vs. Wilde',
      subtitle: 'The 19th-Century Parlour Wit Duel',
      icon: <Feather className="w-4 h-4 text-claret" />,
      tag: 'Satire & Irony'
    },
    {
      id: 'rhetoric' as const,
      title: 'Rhetorical Alchemist',
      subtitle: 'Figure of Speech Decryptor',
      icon: <Sparkles className="w-4 h-4 text-brass" />,
      tag: 'Rhetoric'
    },
    {
      id: 'devices' as const,
      title: 'Rhetorical Matrix',
      subtitle: 'Figures of Speech & Pedagogy',
      icon: <BookOpen className="w-4 h-4 text-sky-700" />,
      tag: 'Pedagogy'
    },
    {
      id: 'etymology' as const,
      title: 'Etymological Voyage',
      subtitle: 'English Words Born from India',
      icon: <Compass className="w-4 h-4 text-emerald-700" />,
      tag: 'IKS & NEP 2020'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Literary Arcade Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-deckle">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 mb-1">
            <Gamepad2 className="w-3.5 h-3.5 text-claret" />
            <span>Interactive Scholarly Play</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-0.5">
            The Literary Arcade & Scholarly Games
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1">
            Five interactive literary challenges exploring lexical precision, Victorian satire, rhetorical figures, pedagogical devices, and Indian etymological journeys.
          </p>
        </div>
      </div>

      {/* Game Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {games.map((g) => {
          const isSelected = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[95px] ${
                isSelected
                  ? 'bg-claret-soft border-claret shadow-xs ring-2 ring-claret/20'
                  : 'bg-white border-deckle hover:border-claret/40 text-ink-muted hover:bg-parchment-warm shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="p-1.5 rounded-lg bg-white border border-deckle shadow-2xs">
                  {g.icon}
                </span>
                <span className="text-[10px] font-mono uppercase font-bold text-ink-faint">
                  {g.tag}
                </span>
              </div>

              <div className="mt-2">
                <h4 className={`font-serif text-sm sm:text-base font-medium leading-tight ${isSelected ? 'text-claret font-semibold' : 'text-ink'}`}>
                  {g.title}
                </h4>
                <p className="text-[10.5px] font-sans text-ink-muted truncate mt-0.5">
                  {g.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Game Container */}
      <div className="pt-2 animate-fade-in">
        {activeGame === 'diction' && <DictionDuel />}
        {activeGame === 'wit' && <TwainVsWilde />}
        {activeGame === 'rhetoric' && <RhetoricalAlchemist />}
        {activeGame === 'devices' && <LiteraryAtelier />}
        {activeGame === 'etymology' && <EtymologyVoyage />}
      </div>

    </div>
  );
};
