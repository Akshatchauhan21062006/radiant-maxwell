import React, { useState } from 'react';
import { WIT_QUOTES, WitQuote } from '../../data/gamesData';
import { Feather, Award, CheckCircle2, XCircle, RotateCcw, ChevronRight, Sparkles } from 'lucide-react';

export const TwainVsWilde: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [witScore, setWitScore] = useState(0);
  const [duelComplete, setDuelComplete] = useState(false);

  const currentQuote: WitQuote = WIT_QUOTES[currentIdx];
  const isAnswered = selectedAuthor !== null;
  const isCorrect = selectedAuthor === currentQuote.author;

  const authors: ('Mark Twain' | 'Oscar Wilde' | 'George Bernard Shaw')[] = [
    'Mark Twain',
    'Oscar Wilde',
    'George Bernard Shaw'
  ];

  const handlePick = (author: 'Mark Twain' | 'Oscar Wilde' | 'George Bernard Shaw') => {
    if (isAnswered) return;
    setSelectedAuthor(author);
    if (author === currentQuote.author) {
      setWitScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < WIT_QUOTES.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAuthor(null);
    } else {
      setDuelComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAuthor(null);
    setWitScore(0);
    setDuelComplete(false);
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book relative overflow-hidden space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 mb-1">
            <Feather className="w-3.5 h-3.5 text-claret" />
            <span>19th-Century Parlour Game</span>
          </div>
          <h3 className="font-serif text-2xl text-ink font-normal tracking-tight">
            Twain vs. Wilde: The Wit Duel
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink">
            Aphorism: <span className="font-bold text-claret">{currentIdx + 1}/{WIT_QUOTES.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink">
            Wit Meter: <span className="font-bold text-brass-dark">{witScore} correct</span>
          </div>
        </div>
      </div>

      {!duelComplete ? (
        <div className="space-y-6">
          
          {/* Aphorism Display Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#FCFBF8] via-[#FAF7F2] to-[#F5EFE3] border border-deckle text-center space-y-3 relative shadow-book">
            <span className="text-[10px] font-mono uppercase tracking-widest text-ink-faint block">
              Identify the Author of this Maxim:
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl text-ink font-normal leading-relaxed italic max-w-2xl mx-auto">
              "{currentQuote.quote}"
            </blockquote>
          </div>

          {/* 3 Author Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {authors.map((author) => {
              const isSelected = selectedAuthor === author;
              const isAuthorCorrect = currentQuote.author === author;

              let btnStyle = 'bg-white border-deckle hover:border-claret text-ink hover:bg-parchment-warm shadow-2xs';
              if (isAnswered) {
                if (isAuthorCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold shadow-xs ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                } else {
                  btnStyle = 'bg-white/50 border-deckle/50 text-ink-faint opacity-50';
                }
              }

              return (
                <button
                  key={author}
                  disabled={isAnswered}
                  onClick={() => handlePick(author)}
                  className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 min-h-[72px] ${btnStyle}`}
                >
                  <span className="font-serif text-lg">{author}</span>
                  <span className="text-[10px] font-mono text-ink-faint">
                    {author === 'Mark Twain' ? '🇺🇸 American Realist Satire' :
                     author === 'Oscar Wilde' ? '🇬🇧 Victorian Aesthetic Paradox' : '🇮🇪 Irish Fabian Wit'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Literary Analysis */}
          {isAnswered && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-fade-in ${
              isCorrect ? 'bg-[#FAF5EB] border-brass/40' : 'bg-parchment-warm border-deckle'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                  isCorrect ? 'text-brass-dark' : 'text-rose-700'
                }`}>
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  <span>{isCorrect ? 'Brilliant Discernment!' : `A Keen Guess, but it was ${currentQuote.author}!`}</span>
                </span>
                <span className="text-xs font-mono text-ink-faint">Source: {currentQuote.workOrContext}</span>
              </div>

              <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
                {currentQuote.wittyAnalysis}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-2 shadow-xs min-h-[44px]"
                >
                  <span>{currentIdx + 1 < WIT_QUOTES.length ? 'Next Wit Challenge' : 'Complete Duel'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Final Parlour Rank Card */
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-claret-soft border border-claret/30 text-claret mx-auto flex items-center justify-center font-serif text-3xl font-bold shadow-xs">
            🎩
          </div>
          <h4 className="font-serif text-2xl text-ink font-normal">
            {witScore >= 6 ? 'Grand Master of 19th-Century Irony' :
             witScore >= 4 ? 'Connoisseur of British & American Wit' : 'Apprentice of Letters'}
          </h4>
          <p className="text-xs text-ink-muted font-reading leading-relaxed">
            You accurately identified <strong className="text-claret font-semibold">{witScore} of {WIT_QUOTES.length}</strong> master aphorisms.
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all inline-flex items-center gap-2 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Duel Again</span>
          </button>
        </div>
      )}

    </div>
  );
};
