import React, { useState } from 'react';
import { DICTION_QUESTIONS, DictionQuestion } from '../../data/gamesData';
import { Zap, Bug, Sparkles, RotateCcw, ChevronRight, Award } from 'lucide-react';

export const DictionDuel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lightningCount, setLightningCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const q: DictionQuestion = DICTION_QUESTIONS[currentIdx];

  // Randomize button positions once per question
  const isLightning = selectedWord === q.lightningWord;
  const isAnswered = selectedWord !== null;

  // Stable order for options based on question ID
  const options = q.id % 2 === 0
    ? [q.lightningWord, q.lightningBugWord]
    : [q.lightningBugWord, q.lightningWord];

  const handleSelect = (word: string) => {
    if (isAnswered) return;
    setSelectedWord(word);
    if (word === q.lightningWord) {
      setScore(prev => prev + 100);
      setLightningCount(prev => prev + 1);
    } else {
      setScore(prev => prev + 25); // consolation points for catching the lightning bug
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < DICTION_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedWord(null);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedWord(null);
    setScore(0);
    setLightningCount(0);
    setQuizComplete(false);
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book relative overflow-hidden space-y-6">
      
      {/* Top Banner & Quote Rule */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 mb-1">
            <Zap className="w-3.5 h-3.5 text-brass" />
            <span>Mark Twain's Lexical Challenge</span>
          </div>
          <h3 className="font-serif text-2xl text-ink font-normal tracking-tight">
            The Diction Duel: Lightning Bug vs. The Lightning
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink">
            Round: <span className="font-bold text-claret">{currentIdx + 1}/{DICTION_QUESTIONS.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink">
            Score: <span className="font-bold text-brass-dark">{score} pts</span>
          </div>
        </div>
      </div>

      {!quizComplete ? (
        <div className="space-y-6">
          {/* Author Citation & Passage Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative ${
            isAnswered
              ? isLightning
                ? 'bg-amber-50/70 border-brass shadow-book-lg ring-2 ring-brass/20'
                : 'bg-emerald-50/50 border-emerald-300'
              : 'bg-parchment-warm/60 border-deckle'
          }`}>
            
            {/* Sparkle or Bug Indicator Icon */}
            {isAnswered && (
              <div className="absolute top-4 right-4 animate-bounce">
                {isLightning ? (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>⚡ THE LIGHTNING!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-xs">
                    <Bug className="w-4 h-4 text-emerald-600" />
                    <span>🪲 A LIGHTNING BUG!</span>
                  </div>
                )}
              </div>
            )}

            <span className="text-[11px] font-mono uppercase text-ink-faint block mb-2">
              {q.author} • <span className="italic">{q.source}</span>
            </span>

            {/* The Text with the Blank */}
            <p className="font-serif text-base sm:text-xl md:text-2xl text-ink leading-relaxed font-normal">
              "{q.sentencePre}{' '}
              <span className={`inline-block px-3 py-0.5 rounded-lg border font-medium transition-all ${
                !isAnswered
                  ? 'border-dashed border-claret text-claret bg-claret-soft/50 min-w-[100px] text-center'
                  : isLightning
                    ? 'border-brass bg-amber-100 text-amber-950 font-semibold'
                    : 'border-emerald-400 bg-emerald-100 text-emerald-950 line-through'
              }`}>
                {isAnswered ? selectedWord : '[ Select Diction ]'}
              </span>
              {' '}{q.sentencePost}"
            </p>
          </div>

          {/* Diction Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((opt, i) => {
              const isOptionLightning = opt === q.lightningWord;
              const isSelected = selectedWord === opt;

              let btnStyle = 'bg-white border-deckle hover:border-claret text-ink hover:bg-parchment-light shadow-2xs';
              if (isAnswered) {
                if (isOptionLightning) {
                  btnStyle = 'bg-amber-100/90 border-brass text-amber-950 font-semibold shadow-xs ring-2 ring-brass/30';
                } else if (isSelected) {
                  btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900';
                } else {
                  btnStyle = 'bg-white/60 border-deckle/60 text-ink-faint opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-xl border font-serif text-lg sm:text-xl transition-all flex items-center justify-between min-h-[56px] ${btnStyle}`}
                >
                  <span className="italic">"{opt}"</span>
                  {isAnswered && (
                    <span>
                      {isOptionLightning ? <Zap className="w-5 h-5 text-amber-600 fill-amber-500" /> : <Bug className="w-5 h-5 text-emerald-600" />}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Commentary & Next Button */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-[#FAF5EB] border border-brass/40 space-y-3 animate-fade-in">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-brass-dark">
                <Sparkles className="w-4 h-4 text-brass" />
                <span>Dr. Dodiya’s Stylistic Analysis</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
                {q.commentary}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-2 shadow-xs min-h-[44px]"
                >
                  <span>{currentIdx + 1 < DICTION_QUESTIONS.length ? 'Next Literary Round' : 'View Duel Results'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-brass text-brass-dark mx-auto flex items-center justify-center font-serif text-3xl font-bold shadow-xs">
            ⚡
          </div>
          <h4 className="font-serif text-2xl text-ink font-normal">Diction Duel Concluded</h4>
          <p className="text-xs text-ink-muted font-reading leading-relaxed">
            You unleashed the Lightning on <strong className="text-claret font-semibold">{lightningCount} of {DICTION_QUESTIONS.length}</strong> master passages! Total Score: <span className="font-mono font-bold text-ink">{score} pts</span>.
          </p>
          <p className="text-xs text-ink-faint italic font-serif">
            "Words are a lens to focus one’s mind; master the word, and you master reality." — Mark Twain
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all inline-flex items-center gap-2 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Duel Again</span>
          </button>
        </div>
      )}

    </div>
  );
};
