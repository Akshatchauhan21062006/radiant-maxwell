import React, { useState } from 'react';
import { useScholarSession, ScholarSession } from '../../hooks/useScholarSession';
import { loginAndTransferDevice } from '../../lib/supabase';
import { validateIndianMobile } from '../../lib/security';
import {
  X,
  ShieldCheck,
  Smartphone,
  BookOpen,
  Laptop,
  CheckCircle2,
  Lock,
  ArrowRight,
  LogOut,
  Sparkles,
  AlertCircle,
  Loader2,
  KeyRound
} from 'lucide-react';

interface ScholarAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReader?: () => void;
  onOpenExam?: () => void;
}

export const ScholarAuthModal: React.FC<ScholarAuthModalProps> = ({
  isOpen,
  onClose,
  onOpenReader,
  onOpenExam
}) => {
  const { session, saveSession, clearSession, isBookOwned, isExamOwned } = useScholarSession();
  const [mobileInput, setMobileInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isLoggedIn = session.unlockedItems && session.unlockedItems.length > 0 && Boolean(session.mobile);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const mobileCheck = validateIndianMobile(mobileInput);
    if (!mobileCheck.isValid) {
      setErrorMessage(mobileCheck.error || 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const cleanMobile = mobileCheck.cleanMobile;
    setIsSubmitting(true);
    const result = await loginAndTransferDevice(cleanMobile);
    setIsSubmitting(false);

    if (result.success && result.unlockedItems && result.unlockedItems.length > 0) {
      const newSession: ScholarSession = {
        name: result.name || 'Scholar',
        mobile: cleanMobile,
        orderId: result.orderId || `HMP-${Date.now().toString().slice(-6)}`,
        unlockedItems: result.unlockedItems,
        deviceToken: result.deviceToken
      };

      saveSession(newSession);
      setSuccessMessage('1-Device License transferred! Your holdings are active on this device.');
      setMobileInput('');
    } else {
      setErrorMessage(result.error || 'No active holdings found for this mobile number.');
    }
  };

  const handleSignOut = () => {
    clearSession();
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-pure/70 backdrop-blur-xs animate-fade-in">
      <div className="folio-card bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-book-xl border border-deckle relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-parchment-warm hover:bg-parchment-deep text-ink-muted hover:text-ink transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          /* ========================================================= */
          /* LOGGED IN: ACTIVE SCHOLAR HOLDINGS VIEW                   */
          /* ========================================================= */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-claret text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-6 h-6 text-brass" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-claret font-semibold block">
                  Active Scholar Pass
                </span>
                <h3 className="font-serif text-2xl text-ink font-normal leading-tight">
                  {session.name}
                </h3>
              </div>
            </div>

            {successMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Pass Metadata */}
            <div className="p-4 rounded-xl bg-parchment-warm/70 border border-deckle space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-ink-muted font-reading">Registered Mobile:</span>
                <span className="font-mono text-ink font-semibold">+91 {session.mobile}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-muted font-reading">Accession ID:</span>
                <span className="font-mono text-ink font-semibold">#{session.orderId}</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-deckle/60">
                <span className="text-ink-muted font-reading">Device License:</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>1-Device Active Here</span>
                </span>
              </div>
            </div>

            {/* Holdings & Direct Launchers */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted font-bold block">
                Your Purchased Holdings:
              </span>

              {/* Book Monograph Holding */}
              <div className="p-4 rounded-xl border border-deckle bg-white shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-claret-soft text-claret flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-medium text-ink leading-tight">
                      Dr. Kalam’s Philosophy (Treatise)
                    </h5>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                      {isBookOwned ? '✓ License Active' : 'Not Acquired'}
                    </span>
                  </div>
                </div>

                {isBookOwned && onOpenReader && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenReader();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Read Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* CBT Exam Holding */}
              <div className="p-4 rounded-xl border border-deckle bg-white shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-claret-soft text-claret flex items-center justify-center shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-medium text-ink leading-tight">
                      UGC-NET Paper I CBT Simulator
                    </h5>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block mt-0.5">
                      {isExamOwned ? '✓ License Active' : 'Not Acquired'}
                    </span>
                  </div>
                </div>

                {isExamOwned && onOpenExam && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenExam();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Launch Exam</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Actions: Sign Out */}
            <div className="pt-2 border-t border-deckle flex items-center justify-between">
              <span className="text-[11px] font-reading text-ink-faint">
                Need to release this device?
              </span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 rounded-lg bg-parchment-warm hover:bg-parchment-deep text-xs font-mono text-ink-muted hover:text-ink transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Device</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* NOT LOGGED IN: SIGN IN & DEVICE TRANSFER FORM             */
          /* ========================================================= */
          <div className="space-y-6">
            <div>
              <div className="w-10 h-10 rounded-xl bg-claret-soft text-claret flex items-center justify-center mb-3">
                <KeyRound className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">
                Scholar Authentication
              </span>
              <h3 className="font-serif text-2xl text-ink font-normal mt-0.5">
                Sign In & Transfer Pass
              </h3>
              <p className="text-xs text-ink-muted font-reading leading-relaxed mt-1">
                Enter your WhatsApp mobile number registered during acquisition to access your books and CBT exam on this device.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-ink block mb-1.5">
                  Your Registered WhatsApp Mobile Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-mono text-ink-muted">
                    +91
                  </div>
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobileInput}
                    onChange={(e) => setMobileInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink text-sm font-mono placeholder-ink-faint focus:outline-none focus:border-claret min-h-[44px]"
                  />
                </div>
              </div>

              {/* Single Device Policy Notice */}
              <div className="p-3.5 rounded-xl bg-parchment-warm border border-deckle text-[11px] text-ink-muted font-reading leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-ink">
                  <Lock className="w-3.5 h-3.5 text-claret" />
                  <span>Strict 1-Device Academic Protection</span>
                </div>
                <p>
                  Signing in here authorizes <strong>this device</strong> and will automatically log out any other previously active device. You may transfer back anytime.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !mobileInput.trim()}
                className="w-full py-3 rounded-xl bg-claret hover:bg-claret-light disabled:opacity-50 text-white text-xs font-medium shadow-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Holdings & Authorizing Device...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In & Authorize This Device</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
