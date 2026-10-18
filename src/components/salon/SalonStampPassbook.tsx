import React from 'react';
import { INITIAL_SALON_STAMPS, SalonStamp } from '../../data/salonDelightsData';
import { Award, Zap, Flame, Feather, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface Props {
  unlockedStamps: Record<string, boolean>;
  unlockedCount: number;
  isFellowshipEligible: boolean;
  onOpenDiploma: () => void;
  justUnlocked: SalonStamp | null;
}

export const SalonStampPassbook: React.FC<Props> = ({
  unlockedStamps,
  unlockedCount,
  isFellowshipEligible,
  onOpenDiploma,
  justUnlocked
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'burn':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'persona':
        return <Award className="w-5 h-5 text-claret" />;
      case 'scroll':
        return <Flame className="w-5 h-5 text-emerald-600" />;
      case 'poetry':
        return <Feather className="w-5 h-5 text-sky-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-brass" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Celebration Banner when a new stamp is awarded */}
      {justUnlocked && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-claret-soft to-amber-50 border-2 border-brass/60 text-ink shadow-md flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-brass flex items-center justify-center text-claret shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-brass animate-spin" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-claret block">
                ✦ New Salon Stamp Unlocked! ✦
              </span>
              <h5 className="font-serif text-base font-medium text-ink">
                {justUnlocked.name}
              </h5>
              <p className="text-[11px] text-ink-muted font-reading">
                {justUnlocked.description}
              </p>
            </div>
          </div>
          {isFellowshipEligible && (
            <button
              onClick={onOpenDiploma}
              className="px-3.5 py-1.5 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs shrink-0 transition-all"
            >
              View Diploma
            </button>
          )}
        </div>
      )}

      {/* Passbook Box */}
      <div className="folio-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-deckle shadow-book space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-deckle">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">
                Salon Passport & Stamp Collection
              </span>
              <span className="px-2 py-0.5 rounded-full bg-parchment-warm border border-deckle text-[11px] font-mono text-ink-muted">
                {unlockedCount} / 4 Stamps
              </span>
            </div>
            <p className="text-xs text-ink-muted font-reading mt-0.5">
              Unlock any 3 stamps through low-friction play to claim the Honorary Fellowship Diploma.
            </p>
          </div>

          <div>
            {isFellowshipEligible ? (
              <button
                onClick={onOpenDiploma}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-claret to-claret-light hover:from-claret-light hover:to-claret text-white text-xs font-medium shadow-sm flex items-center gap-2 transition-all ring-2 ring-brass/40"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Claim Fellowship Diploma</span>
              </button>
            ) : (
              <div className="text-[11px] font-mono text-ink-faint flex items-center gap-1.5 bg-parchment-warm px-3 py-1.5 rounded-lg border border-deckle">
                <Lock className="w-3.5 h-3.5 text-ink-faint" />
                <span>Earn {3 - unlockedCount} more to unlock Diploma</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Stamps Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.values(INITIAL_SALON_STAMPS).map((stamp) => {
            const isUnlocked = Boolean(unlockedStamps[stamp.id]);
            return (
              <div
                key={stamp.id}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between min-h-[90px] relative overflow-hidden ${
                  isUnlocked
                    ? 'bg-parchment-light border-brass/60 shadow-xs ring-1 ring-brass/30'
                    : 'bg-parchment-warm/40 border-dashed border-deckle opacity-60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-white border border-deckle shadow-2xs'
                        : 'bg-deckle/50 text-ink-faint'
                    }`}
                  >
                    {isUnlocked ? getIcon(stamp.id) : <Lock className="w-4 h-4 text-ink-faint" />}
                  </div>

                  {isUnlocked && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Earned</span>
                    </span>
                  )}
                </div>

                <div>
                  <h6
                    className={`font-serif text-sm font-medium leading-tight ${
                      isUnlocked ? 'text-ink' : 'text-ink-muted'
                    }`}
                  >
                    {stamp.name}
                  </h6>
                  <p className="text-[10px] font-sans text-ink-faint truncate mt-0.5">
                    {stamp.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
