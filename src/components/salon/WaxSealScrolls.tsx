import React, { useState } from 'react';
import { FORTUNE_SCROLLS, FortuneScroll } from '../../data/salonDelightsData';
import { Flame, Scroll, Sparkles, Copy, Check, RotateCcw, Bookmark, Feather } from 'lucide-react';

interface Props {
  onUnlockStamp?: (id: 'scroll') => void;
}

export const WaxSealScrolls: React.FC<Props> = ({ onUnlockStamp }) => {
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isCracking, setIsCracking] = useState<boolean>(false);

  const activeScroll: FortuneScroll = FORTUNE_SCROLLS[currentIdx % FORTUNE_SCROLLS.length];

  const handleBreakSeal = () => {
    setIsCracking(true);
    setTimeout(() => {
      setIsCracking(false);
      setIsBroken(true);
      onUnlockStamp?.('scroll');
    }, 450);
  };

  const handleNextScroll = () => {
    setIsBroken(false);
    setCurrentIdx((prev) => (prev + 1) % FORTUNE_SCROLLS.length);
  };

  const handleCopyBookmark = () => {
    const textToCopy = `📜 ${activeScroll.title} (${activeScroll.theme}) 📜\n\nDr. A.P.J. Abdul Kalam:\n"${activeScroll.kalamInsight}" — ${activeScroll.kalamSource}\n\nMark Twain:\n"${activeScroll.twainWisdom}" — ${activeScroll.twainSource}\n\nDaily Salon Blessing:\n${activeScroll.salonBlessing}\n\n[Drawn from the Literary Salon at Dr. Rajnikant Dodiya's Portal]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro strip */}
      <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
            <Scroll className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h4 className="font-serif text-base text-ink font-medium">Break the Wax Seal: Daily Destiny Scroll</h4>
            <p className="text-ink-muted font-reading">
              A daily tactile reflection pairing Dr. A.P.J. Abdul Kalam's vision with Mark Twain's courage. Tap to crack the seal.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md font-semibold shrink-0">
          Daily Fortune Ritual
        </span>
      </div>

      {!isBroken ? (
        /* The Sealed Parchment Letter */
        <div className="folio-card rounded-2xl sm:rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#F5EFE6] to-[#EBE2D3] border-2 border-[#D8CABB] shadow-book text-center space-y-6 relative overflow-hidden">
          {/* Subtle envelope lines */}
          <div className="absolute inset-x-0 top-0 h-1/2 border-b border-black/5 pointer-events-none" />
          
          <div className="max-w-md mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
              Confidential Correspondence • Salon Archive
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              Scroll #{activeScroll.id} • The Seal of {activeScroll.theme}
            </h3>
            <p className="text-xs text-ink-muted font-reading">
              Within this sealed folio rests a synthesis of Dr. Kalam’s ignited thoughts and Twainian fortitude for your journey today.
            </p>
          </div>

          {/* The Wax Seal Button */}
          <div className="pt-2">
            <button
              onClick={handleBreakSeal}
              disabled={isCracking}
              className={`group relative inline-flex flex-col items-center justify-center p-6 rounded-full bg-gradient-to-br from-[#24416B] via-[#162A45] to-[#0A1424] border-4 border-[#C59B27] shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
                isCracking ? 'animate-ping' : ''
              }`}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center text-amber-200 border border-white/20">
                <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-amber-200">
                  Break Seal
                </span>
              </div>
            </button>
            <p className="text-[11px] font-mono text-ink-faint mt-3">
              ✦ Click to crack open the wax seal ✦
            </p>
          </div>
        </div>
      ) : (
        /* The Unrolled Scroll */
        <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-[#FAF7F0] border-2 border-brass/50 shadow-book space-y-6 animate-fade-in relative overflow-hidden">
          {/* Decorative scroll headers */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-semibold uppercase">
                Theme: {activeScroll.theme}
              </span>
              <span className="text-xs font-mono text-ink-faint">
                Scroll #{activeScroll.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyBookmark}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-deckle hover:border-claret text-xs font-medium text-ink shadow-2xs hover:bg-claret-soft hover:text-claret transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Saved Bookmark!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save as Bookmark</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextScroll}
                className="px-3 py-1.5 rounded-lg bg-white border border-deckle hover:border-claret text-xs font-medium text-ink-muted hover:text-ink transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Draw Another</span>
              </button>
            </div>
          </div>

          <div className="text-center py-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
              {activeScroll.title}
            </h3>
          </div>

          {/* Dual Wisdom Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dr. Kalam */}
            <div className="p-5 rounded-2xl bg-white border border-deckle space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-800 font-mono text-[11px] uppercase font-bold">
                  <Flame className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dr. A.P.J. Abdul Kalam</span>
                </div>
                <p className="font-reading text-sm text-ink leading-relaxed italic">
                  "{activeScroll.kalamInsight}"
                </p>
              </div>
              <span className="text-[10px] font-mono text-ink-faint block pt-2 border-t border-deckle/60">
                Source: {activeScroll.kalamSource}
              </span>
            </div>

            {/* Mark Twain */}
            <div className="p-5 rounded-2xl bg-white border border-deckle space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-claret font-mono text-[11px] uppercase font-bold">
                  <Feather className="w-3.5 h-3.5 text-claret" />
                  <span>Mark Twain</span>
                </div>
                <p className="font-reading text-sm text-ink leading-relaxed italic">
                  "{activeScroll.twainWisdom}"
                </p>
              </div>
              <span className="text-[10px] font-mono text-ink-faint block pt-2 border-t border-deckle/60">
                Source: {activeScroll.twainSource}
              </span>
            </div>
          </div>

          {/* Salon Blessing */}
          <div className="p-4 sm:p-5 rounded-2xl bg-brass-soft border border-brass/30 space-y-1.5">
            <div className="flex items-center gap-2 text-brass-dark text-[11px] font-mono uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>Daily Salon Reflection</span>
            </div>
            <p className="font-reading text-xs sm:text-sm text-ink leading-relaxed">
              {activeScroll.salonBlessing}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
