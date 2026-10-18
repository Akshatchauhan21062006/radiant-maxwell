import React, { useState } from 'react';
import { PERSONA_QUESTIONS, PERSONA_ARCHETYPES, PersonaArchetype } from '../../data/salonDelightsData';
import { Award, Feather, Sparkles, Flame, BookOpen, RotateCcw, Copy, Check, ChevronRight, User } from 'lucide-react';

interface Props {
  userName: string;
  setUserName: (name: string) => void;
  onUnlockStamp?: (id: 'persona') => void;
}

export const LiteraryPersonaTest: React.FC<Props> = ({ userName, setUserName, onUnlockStamp }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultArchetype, setResultArchetype] = useState<PersonaArchetype | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const totalQuestions = PERSONA_QUESTIONS.length;
  const currentQuestion = PERSONA_QUESTIONS[currentStep];

  const handleSelectOption = (archetypeKey: string) => {
    const updatedAnswers = [...answers, archetypeKey];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < totalQuestions) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate archetype tally
      const counts: Record<string, number> = {};
      updatedAnswers.forEach(k => {
        counts[k] = (counts[k] || 0) + 1;
      });

      let topKey: 'satirist' | 'aesthete' | 'visionary' | 'polymath' = 'satirist';
      let maxCount = 0;
      Object.keys(counts).forEach(k => {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          topKey = k as any;
        }
      });

      const archetype = PERSONA_ARCHETYPES[topKey] || PERSONA_ARCHETYPES.satirist;
      setResultArchetype(archetype);
      onUnlockStamp?.('persona');
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultArchetype(null);
  };

  const handleCopyCitation = () => {
    if (!resultArchetype) return;
    const displayName = userName.trim() || 'Distinguished Salon Scholar';
    const textToCopy = `🏛️ LITERARY SALON CITATION 🏛️\n\nConferred upon: ${displayName}\nIntellectual Archetype: ${resultArchetype.title}\nSpirit Twin: ${resultArchetype.spiritTwin}\n\nMotto: "${resultArchetype.motto}"\n\nCitation:\n"${resultArchetype.citation}"\n\n[Certified by Dr. Rajnikant Dodiya's Literary Salon, H.M. Patel Institute]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-claret-soft border border-claret/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-claret/30 text-claret flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-base text-ink font-medium">The Literary Persona Oracle</h4>
            <p className="text-ink-muted font-reading">
              Four lighthearted questions to discover your intellectual alter-ego. Zero trivia, purely your philosophical instincts.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-claret bg-white px-2.5 py-1 rounded-md font-semibold shrink-0">
          Personalized Award
        </span>
      </div>

      {resultArchetype ? (
        /* Result Parchment Card */
        <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#FCFBF8] via-white to-[#F8F4EC] border-2 border-brass/50 shadow-book relative overflow-hidden animate-fade-in">
          {/* Ornate corner motifs */}
          <div className="absolute top-3 left-3 text-brass/40 font-mono text-xs select-none">✦ ──── ✦</div>
          <div className="absolute top-3 right-3 text-brass/40 font-mono text-xs select-none">✦ ──── ✦</div>

          <div className="text-center max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brass-soft border border-brass/30 text-brass-dark text-[11px] font-mono font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brass" />
              <span>Intellectual Alter-Ego Revealed</span>
            </div>

            {/* Recipient Name Field */}
            <div className="pt-1 flex items-center justify-center gap-2">
              <span className="text-xs text-ink-muted font-reading">Conferred upon:</span>
              <div className="relative inline-block">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Eleanor Vance)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3 py-1 rounded-lg border border-deckle bg-white text-ink text-sm font-serif font-medium focus:outline-none focus:border-claret min-w-[200px] text-center"
                />
              </div>
            </div>

            <div className="py-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-claret font-normal tracking-tight">
                {resultArchetype.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-ink-muted font-semibold mt-1">
                {resultArchetype.subTitle} • Spirit Twin: {resultArchetype.spiritTwin}
              </p>
            </div>

            {/* Motto */}
            <div className="bg-parchment-warm/80 border border-deckle rounded-2xl p-4 sm:p-5 text-sm sm:text-base font-serif italic text-ink text-center">
              "{resultArchetype.motto}"
            </div>

            {/* Citation & Traits */}
            <div className="text-left bg-white/80 border border-deckle rounded-xl p-4 sm:p-5 space-y-3 text-xs">
              <div>
                <strong className="text-claret font-mono uppercase text-[10px] tracking-wider block mb-1">
                  Official Citation:
                </strong>
                <p className="font-reading text-ink-muted leading-relaxed">
                  {resultArchetype.citation}
                </p>
              </div>

              <div className="pt-2 border-t border-deckle">
                <strong className="text-ink font-mono uppercase text-[10px] tracking-wider block mb-1.5">
                  Distinctive Intellectual Hallmarks:
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-ink-muted font-reading">
                  {resultArchetype.traits.map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-claret shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleCopyCitation}
                className="px-5 py-2.5 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs flex items-center gap-2 transition-all min-h-[42px]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Citation Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Persona Citation</span>
                  </>
                )}
              </button>

              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-white border border-deckle hover:border-claret text-ink text-xs font-medium hover:bg-parchment-warm transition-all flex items-center gap-2 min-h-[42px]"
              >
                <RotateCcw className="w-4 h-4 text-ink-muted" />
                <span>Retake Oracle</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Question Steps */
        <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between border-b border-deckle pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-claret font-semibold">
              Oracle Query {currentStep + 1} of {totalQuestions}
            </span>
            <div className="flex gap-1.5">
              {PERSONA_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentStep
                      ? 'w-6 bg-claret'
                      : idx < currentStep
                      ? 'w-2 bg-claret/40'
                      : 'w-2 bg-deckle'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelectOption(opt.archetypeKey)}
                className="p-4 rounded-xl border border-deckle hover:border-claret bg-parchment-light hover:bg-claret-soft/60 text-left transition-all group flex flex-col justify-between space-y-2 min-h-[100px]"
              >
                <div className="font-serif text-sm text-ink group-hover:text-claret leading-relaxed">
                  {opt.text}
                </div>
                <div className="text-[11px] font-sans text-ink-muted group-hover:text-claret/80 italic">
                  {opt.subtext}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
