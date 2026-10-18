import React, { useState } from 'react';
import { MAGNETIC_WORDS, MAGNETIC_POETRY_PRESETS } from '../../data/salonDelightsData';
import { Feather, Sparkles, Copy, Check, RotateCcw, Shuffle, Plus, Stamp } from 'lucide-react';

interface Props {
  onUnlockStamp?: (id: 'poetry') => void;
}

export const MagneticPoetry: React.FC<Props> = ({ onUnlockStamp }) => {
  const [activeWords, setActiveWords] = useState<string[]>(['laughter', 'is', 'unruly', 'lightning', 'in', 'the', 'soul']);
  const [customWord, setCustomWord] = useState<string>('');
  const [isCertified, setIsCertified] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleAddWord = (word: string) => {
    setActiveWords(prev => [...prev, word]);
    setIsCertified(false);
  };

  const handleRemoveWord = (index: number) => {
    setActiveWords(prev => prev.filter((_, i) => i !== index));
    setIsCertified(false);
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customWord.trim().toLowerCase();
    if (trimmed) {
      setActiveWords(prev => [...prev, trimmed]);
      setCustomWord('');
      setIsCertified(false);
    }
  };

  const handleShufflePreset = () => {
    const randomPreset = MAGNETIC_POETRY_PRESETS[Math.floor(Math.random() * MAGNETIC_POETRY_PRESETS.length)];
    setActiveWords(randomPreset);
    setIsCertified(false);
  };

  const handleCertify = () => {
    setIsCertified(true);
    onUnlockStamp?.('poetry');
  };

  const handleCopyPoem = () => {
    const poemText = activeWords.join(' ');
    const shareText = `📜 MAGNETIC SALON APHORISM 📜\n\n"${poemText.toUpperCase()}"\n\n[Certified by H.M. Patel Institute Literary Salon — Dr. Rajnikant Dodiya]`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro strip */}
      <div className="bg-sky-50/60 border border-sky-200/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-300 text-sky-800 flex items-center justify-center shrink-0">
            <Feather className="w-5 h-5 text-sky-700" />
          </div>
          <div>
            <h4 className="font-serif text-base text-ink font-medium">Magnetic Salon Poetry & Aphorisms</h4>
            <p className="text-ink-muted font-reading">
              Click word tiles to arrange a profound or delightfully absurd line. No rules, pure creative play.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded-md font-semibold shrink-0">
          Playful Toy
        </span>
      </div>

      {/* The Magnetic Board (Desk) */}
      <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FAF8F5] via-white to-[#F2EDE4] border-2 border-deckle shadow-book relative">
        <div className="flex items-center justify-between pb-3 border-b border-deckle mb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-claret font-semibold">
            Your Composition Desk
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShufflePreset}
              className="px-2.5 py-1 rounded-lg bg-white border border-deckle hover:border-claret text-xs text-ink-muted hover:text-claret transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Shuffle className="w-3 h-3" />
              <span>Inspire Me</span>
            </button>
            <button
              onClick={() => { setActiveWords([]); setIsCertified(false); }}
              className="px-2.5 py-1 rounded-lg bg-white border border-deckle hover:border-claret text-xs text-ink-muted hover:text-claret transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Word placement area */}
        <div className="min-h-[120px] p-4 rounded-2xl bg-white/70 border border-dashed border-deckle-dark flex flex-wrap items-center gap-2 content-start relative overflow-hidden">
          {activeWords.length === 0 ? (
            <p className="text-xs font-reading text-ink-faint italic mx-auto self-center">
              Click words from the tile box below to build your poetic sentence...
            </p>
          ) : (
            activeWords.map((w, idx) => (
              <button
                key={`${w}-${idx}`}
                onClick={() => handleRemoveWord(idx)}
                title="Click to remove"
                className="px-3 py-1.5 rounded-md bg-stone-900 hover:bg-claret text-amber-50 font-mono text-xs shadow-md border border-stone-700 hover:scale-95 transition-all group cursor-pointer flex items-center gap-1"
              >
                <span>{w}</span>
                <span className="text-[10px] text-stone-400 group-hover:text-amber-200">×</span>
              </button>
            ))
          )}

          {/* Ink Seal of Certification */}
          {isCertified && (
            <div className="absolute right-4 bottom-3 border-2 border-claret text-claret font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg rotate-[-6deg] bg-claret-soft/95 shadow-sm animate-fade-in flex items-center gap-1.5">
              <span>✦ CERTIFIED BY SALON ✦</span>
            </div>
          )}
        </div>

        {/* Board bottom actions */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
          <form onSubmit={handleAddCustomWord} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add your own word..."
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-deckle bg-white text-base sm:text-xs font-mono text-ink focus:outline-none focus:border-claret min-w-[150px]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white text-xs font-mono flex items-center gap-1 transition-all min-h-[38px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCertify}
              disabled={activeWords.length === 0}
              className="px-4 py-2 rounded-xl bg-claret hover:bg-claret-light disabled:opacity-50 text-white text-xs font-medium shadow-xs flex items-center gap-1.5 transition-all min-h-[38px]"
            >
              <Stamp className="w-4 h-4" />
              <span>Certify & Stamp</span>
            </button>

            {isCertified && (
              <button
                onClick={handleCopyPoem}
                className="px-4 py-2 rounded-xl bg-white border border-deckle hover:border-claret text-xs font-medium text-ink shadow-2xs hover:bg-claret-soft hover:text-claret transition-all flex items-center gap-1.5 animate-fade-in min-h-[38px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Card</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Word Tiles Box */}
      <div className="folio-card rounded-2xl p-4 sm:p-5 bg-white border border-deckle shadow-2xs space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted font-bold block">
          Magnetic Word Palette (Tap to Add):
        </span>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {MAGNETIC_WORDS.map((w) => (
            <button
              key={w}
              onClick={() => handleAddWord(w)}
              className="px-3 py-1.5 sm:py-1 rounded-lg bg-parchment-warm/90 hover:bg-claret hover:text-white border border-deckle text-ink-muted font-mono text-xs transition-colors shadow-2xs cursor-pointer active:scale-95 touch-manipulation min-h-[36px] sm:min-h-0 flex items-center"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
