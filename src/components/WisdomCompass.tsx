import React, { useState } from 'react';
import { LITERARY_QUOTES, LiteraryQuote } from '../data/literaryData';
import { Feather, Sparkles, Copy, Check, Shuffle, Quote, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const WisdomCompass: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);

  const themes = ['All', 'Twainian Wit', 'Kalam on Education', 'Language & Pedagogy', 'Literary Philosophy'];

  const filteredQuotes = LITERARY_QUOTES.filter(
    q => selectedTheme === 'All' || q.theme === selectedTheme
  );

  const activeQuote: LiteraryQuote = filteredQuotes[currentIndex % filteredQuotes.length] || LITERARY_QUOTES[0];

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
      setAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
      setAnimating(false);
    }, 150);
  };

  const handleShuffle = () => {
    setAnimating(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentIndex(randomIdx);
      setAnimating(false);
    }, 150);
  };

  const handleCopy = () => {
    const textToCopy = `"${activeQuote.quote}" — ${activeQuote.author}${activeQuote.source ? ` (${activeQuote.source})` : ''}\n\nScholarly Reflection by Dr. Rajnikant S. Dodiya: ${activeQuote.drDodiyaReflection}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-white via-[#FCFBF8] to-[#FAF5EC] border border-deckle shadow-book">
      {/* Decorative watermarked quotation mark */}
      <Quote className="absolute -right-4 -bottom-4 w-44 h-44 text-deckle/20 pointer-events-none rotate-12" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-deckle">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-claret-soft border border-claret/20 flex items-center justify-center text-claret">
            <Feather className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-claret font-semibold">Interactive Literary Salon</span>
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-medium tracking-tight">The Wisdom Compass</h3>
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => { setSelectedTheme(t); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all whitespace-nowrap ${
                selectedTheme === t
                  ? 'bg-claret text-white shadow-xs font-medium'
                  : 'bg-parchment-warm/80 text-ink-muted hover:bg-parchment-deep hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quote Card */}
      <div className={`py-8 sm:py-10 transition-opacity duration-200 ${animating ? 'opacity-30' : 'opacity-100'}`}>
        
        {/* Author & Theme Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20">
            {activeQuote.theme}
          </span>
          {activeQuote.source && (
            <span className="text-xs font-mono text-ink-faint italic">
              • {activeQuote.source}
            </span>
          )}
        </div>

        {/* The Quote */}
        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-ink leading-relaxed font-normal tracking-tight italic">
          "{activeQuote.quote}"
        </blockquote>

        <p className="mt-4 font-serif text-base sm:text-lg font-medium text-claret flex items-center gap-2">
          <span>— {activeQuote.author}</span>
        </p>

        {/* Professor's Literary Commentary Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#FAF5EB] border border-brass/30 relative">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-brass-dark mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Dr. Dodiya's Scholarly Perspective</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-reading font-light">
            {activeQuote.drDodiyaReflection}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-deckle">
        <div className="text-xs font-mono text-ink-faint">
          Entry {currentIndex + 1} of {filteredQuotes.length} in this canon
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous quote"
            className="p-2.5 rounded-xl bg-white border border-deckle hover:border-claret text-ink-muted hover:text-claret transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleShuffle}
            className="px-3.5 py-2 rounded-xl bg-white border border-deckle hover:border-brass text-xs font-sans font-medium text-ink-muted hover:text-ink transition-all flex items-center gap-1.5 min-h-[44px] shadow-2xs"
          >
            <Shuffle className="w-3.5 h-3.5 text-brass" />
            <span>Draw Wisdom</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-white border border-deckle hover:border-claret text-xs font-sans font-medium text-ink-muted hover:text-claret transition-all flex items-center gap-1.5 min-h-[44px] shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Cite Quote'}</span>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next quote"
            className="p-2.5 rounded-xl bg-claret text-white hover:bg-claret-light transition-all min-h-[44px] min-w-[44px] flex items-center justify-center shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
