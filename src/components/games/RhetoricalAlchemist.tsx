import React, { useState } from 'react';
import { RHETORIC_PUZZLES, RhetoricPuzzle } from '../../data/gamesData';
import { Sparkles, Flame, CheckCircle2, XCircle, RotateCcw, ChevronRight, BookOpen } from 'lucide-react';

export const RhetoricalAlchemist: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  const p: RhetoricPuzzle = RHETORIC_PUZZLES[currentIdx];
  const isAnswered = selectedDevice !== null;
  const isCorrect = selectedDevice === p.correctDevice;

  const handleChoose = (opt: string) => {
    if (isAnswered) return;
    setSelectedDevice(opt);
    if (opt === p.correctDevice) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < RHETORIC_PUZZLES.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedDevice(null);
    } else {
      setPuzzleComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedDevice(null);
    setStreak(0);
    setMaxStreak(0);
    setPuzzleComplete(false);
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book relative overflow-hidden space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-deckle">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brass" />
            <span>Rhetorical Decryption Tool</span>
          </div>
          <h3 className="font-serif text-2xl text-ink font-normal tracking-tight">
            The Rhetorical Alchemist
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink">
            Decryption: <span className="font-bold text-claret">{currentIdx + 1}/{RHETORIC_PUZZLES.length}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink flex items-center gap-1">
            <Flame className={`w-3.5 h-3.5 ${streak > 0 ? 'text-amber-500 fill-amber-500' : 'text-ink-faint'}`} />
            <span>Streak: <strong className="text-amber-700">{streak}x</strong></span>
          </div>
        </div>
      </div>

      {!puzzleComplete ? (
        <div className="space-y-6">
          
          {/* Passage Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-parchment-warm/70 border border-deckle space-y-3 shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block">
              Analyze Rhetorical Structure:
            </span>
            <blockquote className="font-serif text-xl sm:text-2xl text-ink font-normal leading-relaxed italic">
              {p.passage}
            </blockquote>
            <span className="text-xs font-mono text-ink-faint block">
              — {p.speakerOrSource}
            </span>
          </div>

          {/* 4 Device Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {p.options.map((opt) => {
              const isSelected = selectedDevice === opt;
              const isOptCorrect = opt === p.correctDevice;

              let btnStyle = 'bg-white border-deckle hover:border-claret text-ink hover:bg-parchment-light shadow-2xs';
              if (isAnswered) {
                if (isOptCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                } else {
                  btnStyle = 'bg-white/50 border-deckle/50 text-ink-faint opacity-50';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswered}
                  onClick={() => handleChoose(opt)}
                  className={`p-3.5 rounded-xl border text-center transition-all font-serif text-base min-h-[50px] flex items-center justify-center ${btnStyle}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Anatomical Explanation */}
          {isAnswered && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-fade-in ${
              isCorrect ? 'bg-[#FAF5EB] border-brass/40' : 'bg-parchment-warm border-deckle'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${
                  isCorrect ? 'text-brass-dark' : 'text-rose-700'
                }`}>
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                  <span>{isCorrect ? `Correct: Identified ${p.correctDevice}!` : `Device was ${p.correctDevice}`}</span>
                </span>
                {streak > 1 && (
                  <span className="text-xs font-mono text-amber-700 font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{streak}x Streak Activated!</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
                {p.anatomicalBreakdown}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-2 shadow-xs min-h-[44px]"
                >
                  <span>{currentIdx + 1 < RHETORIC_PUZZLES.length ? 'Next Rhetorical Puzzle' : 'Complete Alchemical Rite'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Results Card */
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-brass-soft border border-brass text-brass-dark mx-auto flex items-center justify-center font-serif text-3xl font-bold shadow-xs">
            ⚖️
          </div>
          <h4 className="font-serif text-2xl text-ink font-normal">
            Alchemical Transmutation Complete!
          </h4>
          <p className="text-xs text-ink-muted font-reading leading-relaxed">
            Your maximum consecutive streak was <strong className="text-claret font-semibold">{maxStreak} correct decryptions</strong>!
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all inline-flex items-center gap-2 min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Decrypt Again</span>
          </button>
        </div>
      )}

    </div>
  );
};
