import React, { useState } from 'react';
import { LITERARY_DEVICES, LITERARY_QUIZ, LiteraryDevice, LiteraryQuizQuestion } from '../data/literaryData';
import { Sparkles, HelpCircle, CheckCircle2, XCircle, RotateCcw, BookOpen, ChevronRight } from 'lucide-react';

export const LiteraryAtelier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'devices' | 'quiz'>('devices');
  const [selectedDevice, setSelectedDevice] = useState<LiteraryDevice>(LITERARY_DEVICES[0]);
  
  // Quiz state
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = LITERARY_QUIZ[currentQuizIdx];

  const handleSelectOption = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIdx + 1 < LITERARY_QUIZ.length) {
      setCurrentQuizIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book space-y-6">
      
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-deckle">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Pedagogical Workshop</span>
          <h3 className="font-serif text-2xl text-ink font-normal mt-0.5">The Rhetoric & Literature Atelier</h3>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-parchment-warm border border-deckle text-xs">
          <button
            onClick={() => setActiveTab('devices')}
            className={`px-3 py-1.5 rounded-lg font-sans transition-all flex items-center gap-1.5 ${
              activeTab === 'devices'
                ? 'bg-claret text-white shadow-xs font-medium'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rhetorical Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg font-sans transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-claret text-white shadow-xs font-medium'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Literary Challenge</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Rhetoric & Figures of Speech Explorer */}
      {activeTab === 'devices' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Device list selector */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-mono uppercase text-ink-faint block mb-1">Select Literary Concept</span>
            {LITERARY_DEVICES.map((d, idx) => {
              const isSelected = selectedDevice.term === d.term;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDevice(d)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs min-h-[44px] ${
                    isSelected
                      ? 'bg-claret-soft border-claret/40 text-claret shadow-2xs font-medium'
                      : 'bg-parchment-warm/60 border-deckle text-ink-muted hover:bg-parchment-warm hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="font-serif text-sm block">{d.term}</span>
                    <span className="text-[10px] font-mono text-ink-faint block">{d.category}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-claret' : 'text-ink-faint'}`} />
                </button>
              );
            })}
          </div>

          {/* Device Details Viewer */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-parchment-warm/60 border border-deckle space-y-4">
            <div className="flex items-center justify-between border-b border-deckle pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">
                  {selectedDevice.category}
                </span>
                <h4 className="font-serif text-2xl text-ink font-normal mt-1.5">{selectedDevice.term}</h4>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-ink-faint">Definition:</span>
              <p className="font-reading text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                {selectedDevice.definition}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-deckle space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-claret flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Exemplary Illustration:</span>
              </span>
              <p className="font-serif italic text-xs sm:text-sm text-ink leading-relaxed">
                {selectedDevice.example}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF5EB] border border-brass/30 space-y-1">
              <span className="text-[11px] font-mono font-semibold uppercase text-brass-dark">
                Pedagogical & Classroom Application:
              </span>
              <p className="text-xs text-ink-muted font-reading leading-relaxed font-light">
                {selectedDevice.pedagogicalApplication}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Test Your Literary Acumen Challenge */}
      {activeTab === 'quiz' && (
        <div className="p-4 sm:p-6 rounded-2xl bg-parchment-warm/50 border border-deckle max-w-xl mx-auto space-y-5">
          {!quizFinished ? (
            <>
              {/* Question Progress bar */}
              <div className="flex items-center justify-between text-xs font-mono text-ink-faint border-b border-deckle pb-2">
                <span>Question {currentQuizIdx + 1} of {LITERARY_QUIZ.length}</span>
                <span className="text-claret font-semibold">Score: {score}/{currentQuizIdx + (answered ? 1 : 0)}</span>
              </div>

              {/* Question Text */}
              <h4 className="font-serif text-lg sm:text-xl text-ink font-normal leading-relaxed">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === currentQuestion.correctIndex;
                  
                  let optionStyle = 'bg-white border-deckle hover:border-claret text-ink-muted';
                  if (answered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                    } else {
                      optionStyle = 'bg-white/60 border-deckle/60 text-ink-faint opacity-60';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={answered}
                      onClick={() => handleSelectOption(i)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-center justify-between min-h-[44px] ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {answered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answering */}
              {answered && (
                <div className="p-4 rounded-xl bg-white border border-deckle space-y-2 animate-fade-in">
                  <span className="text-xs font-mono font-semibold text-claret block">
                    Scholarly Explanation:
                  </span>
                  <p className="text-xs text-ink-muted font-reading leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-1.5 min-h-[44px]"
                  >
                    <span>{currentQuizIdx + 1 < LITERARY_QUIZ.length ? 'Next Question' : 'View Results'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-claret-soft border border-claret/30 text-claret mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                {score}/{LITERARY_QUIZ.length}
              </div>
              <h4 className="font-serif text-2xl text-ink font-normal">Challenge Completed!</h4>
              <p className="text-xs text-ink-muted max-w-sm mx-auto font-reading leading-relaxed">
                {score === LITERARY_QUIZ.length
                  ? 'Exemplary scholarship! You demonstrated mastery of rhetoric, post-method pedagogy, and literary nuances.'
                  : 'Well studied! Literature and pedagogy are endless journeys of inquiry and refinement.'}
              </p>
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all inline-flex items-center gap-2 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Challenge</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
