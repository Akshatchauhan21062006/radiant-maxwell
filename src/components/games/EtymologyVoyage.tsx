import React, { useState } from 'react';
import { ETYMOLOGY_WORDS, EtymologyWord } from '../../data/gamesData';
import { Compass, BookOpen, Globe, Sparkles, Check, HelpCircle } from 'lucide-react';

export const EtymologyVoyage: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<EtymologyWord>(ETYMOLOGY_WORDS[0]);
  const [revealedIds, setRevealedIds] = useState<number[]>([1]);

  const handleSelect = (word: EtymologyWord) => {
    setSelectedWord(word);
    if (!revealedIds.includes(word.id)) {
      setRevealedIds(prev => [...prev, word.id]);
    }
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book relative overflow-hidden space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 mb-1">
            <Compass className="w-3.5 h-3.5 text-brass" />
            <span>Indian Knowledge Systems & Global English</span>
          </div>
          <h3 className="font-serif text-2xl text-ink font-normal tracking-tight">
            The Etymological Voyage: Words Born from India
          </h3>
        </div>

        <div className="text-xs font-mono text-ink-faint">
          Discovered: <strong className="text-claret">{revealedIds.length} of {ETYMOLOGY_WORDS.length}</strong> roots
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Mystery Word Deck */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-mono uppercase text-ink-faint block mb-1">Select an English Word to Uncover its Root</span>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2.5">
            {ETYMOLOGY_WORDS.map((w) => {
              const isSelected = selectedWord.id === w.id;
              const isDiscovered = revealedIds.includes(w.id);

              return (
                <button
                  key={w.id}
                  onClick={() => handleSelect(w)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs min-h-[50px] ${
                    isSelected
                      ? 'bg-claret-soft border-claret/40 text-claret shadow-xs ring-1 ring-claret/20'
                      : 'bg-parchment-warm/60 border-deckle text-ink-muted hover:bg-parchment-deep hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="font-serif text-base font-medium block text-ink">{w.englishWord}</span>
                    <span className="text-[10px] font-mono text-ink-faint block">{w.pronunciation}</span>
                  </div>
                  {isDiscovered ? (
                    <span className="text-[10px] font-mono bg-parchment-deep text-ink-muted px-2 py-0.5 rounded border border-deckle">
                      {w.sourceLanguage}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-ink-faint">Locked ?</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Historical Voyage Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE3] border border-deckle space-y-5 shadow-book">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deckle pb-3">
            <div>
              <span className="text-xs font-mono text-claret font-bold uppercase tracking-wider block">
                Etymological Genesis
              </span>
              <h4 className="font-serif text-3xl text-ink font-normal mt-0.5">
                {selectedWord.englishWord}
              </h4>
              <span className="text-xs font-mono text-ink-faint">{selectedWord.pronunciation}</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-deckle text-right self-start sm:self-auto">
              <span className="text-[10px] font-mono text-ink-faint block uppercase">Source Language</span>
              <span className="font-serif text-sm font-semibold text-brass-dark">{selectedWord.sourceLanguage}</span>
            </div>
          </div>

          {/* Root & Original Meaning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-white border border-deckle space-y-1">
              <span className="text-[10px] font-mono uppercase text-ink-faint block">Original Indian Root:</span>
              <span className="font-serif text-lg font-bold text-claret block">{selectedWord.indianOriginRoot}</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-deckle space-y-1">
              <span className="text-[10px] font-mono uppercase text-ink-faint block">Original Meaning:</span>
              <span className="font-reading text-xs text-ink block">{selectedWord.originalMeaning}</span>
            </div>
          </div>

          {/* Historical Journey */}
          <div className="p-5 rounded-xl bg-white border border-deckle space-y-2">
            <span className="text-xs font-mono font-semibold uppercase text-claret flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brass" />
              <span>Historical Voyage into English:</span>
            </span>
            <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
              {selectedWord.fascinatingJourney}
            </p>
          </div>

          <div className="text-[11px] font-mono text-ink-faint italic border-t border-deckle/60 pt-2">
            Reflecting Dr. Dodiya’s scholarship on NEP 2020, Indian Knowledge Systems (IKS), and Multilingual Pedagogy.
          </div>

        </div>

      </div>

    </div>
  );
};
