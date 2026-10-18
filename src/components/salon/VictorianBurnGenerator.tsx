import React, { useState } from 'react';
import { VICTORIAN_BURNS, VictorianBurn } from '../../data/salonDelightsData';
import { Flame, Copy, Check, Sparkles, Feather, RotateCcw, Share2, Quote } from 'lucide-react';

interface Props {
  onUnlockStamp?: (id: 'burn') => void;
}

export const VictorianBurnGenerator: React.FC<Props> = ({ onUnlockStamp }) => {
  const [selectedBurn, setSelectedBurn] = useState<VictorianBurn>(VICTORIAN_BURNS[0]);
  const [copied, setCopied] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleSelect = (burn: VictorianBurn) => {
    setIsRevealing(true);
    setSelectedBurn(burn);
    setTimeout(() => {
      setIsRevealing(false);
      onUnlockStamp?.('burn');
    }, 200);
  };

  const handleCopy = () => {
    const textToCopy = `"${selectedBurn.retort}"\n\n— Inspired by ${selectedBurn.author} (${selectedBurn.source})\n"${selectedBurn.quote}"\n\nPrescription: ${selectedBurn.verdict}\n[Curated at Dr. Rajnikant Dodiya's Literary Salon]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro strip */}
      <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-serif text-base text-ink font-medium">Victorian Burn Generator</h4>
            <p className="text-ink-muted font-reading">
              19th-century rhetorical remedies for 21st-century modern exasperations. Select your grievance below.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md font-semibold shrink-0">
          Zero Trivia Required
        </span>
      </div>

      {/* Grid of modern frustrations */}
      <div>
        <label className="text-xs font-mono uppercase tracking-widest text-claret font-semibold block mb-2.5">
          Step 1: Choose Your Modern Tribulation
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {VICTORIAN_BURNS.map((b) => {
            const isSelected = selectedBurn.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => handleSelect(b)}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 min-h-[70px] ${
                  isSelected
                    ? 'bg-claret-soft border-claret shadow-xs ring-2 ring-claret/20 text-claret font-medium'
                    : 'bg-white border-deckle hover:border-claret/30 hover:bg-parchment-warm text-ink-muted'
                }`}
              >
                <span className="text-xl shrink-0 pt-0.5">{b.emoji}</span>
                <span className="text-xs font-sans leading-snug">{b.frustration}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Burn Card Output */}
      <div className={`transition-all duration-300 ${isRevealing ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-parchment-light to-[#FAF5EC] border-2 border-deckle-dark shadow-book relative overflow-hidden">
          {/* Subtle watermark quote icon */}
          <Quote className="absolute -right-4 -bottom-4 w-40 h-40 text-deckle/20 pointer-events-none rotate-12" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle mb-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-claret text-white font-mono text-[11px] font-medium uppercase tracking-wider">
                {selectedBurn.author}
              </span>
              <span className="text-xs font-mono text-ink-faint">
                {selectedBurn.source}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-deckle hover:border-claret text-xs font-medium text-ink shadow-2xs hover:bg-claret-soft hover:text-claret transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Burn Card</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Authentic Author's Quote */}
          <div className="mb-6 bg-parchment-warm/70 border border-deckle rounded-xl p-4 text-xs font-reading italic text-ink-muted leading-relaxed">
            "{selectedBurn.quote}"
          </div>

          {/* The Victorian Retort */}
          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-claret font-bold">
              The Victorian Retort
            </span>
            <p className="font-serif text-xl sm:text-2xl text-ink font-normal leading-snug text-claret">
              "{selectedBurn.retort}"
            </p>
          </div>

          {/* Practical prescription */}
          <div className="pt-4 border-t border-deckle flex items-start gap-2.5 text-xs text-ink-muted font-reading">
            <Sparkles className="w-4 h-4 text-brass shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-ink font-medium">Salon Counsel: </strong>
              {selectedBurn.verdict}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
