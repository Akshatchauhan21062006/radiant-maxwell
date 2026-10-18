import React from 'react';
import { Smartphone, ShieldAlert, X, ArrowRight, RotateCcw } from 'lucide-react';

interface DeviceTransferredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReLogin: () => void;
}

export const DeviceTransferredModal: React.FC<DeviceTransferredModalProps> = ({
  isOpen,
  onClose,
  onReLogin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/75 backdrop-blur-xs animate-fade-in">
      <div className="folio-card bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-book-xl border-2 border-amber-300 text-center space-y-5 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-parchment-warm hover:bg-parchment-deep text-ink-muted hover:text-ink transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
            Security & Licensing Notice
          </span>
          <h3 className="font-serif text-2xl text-ink font-normal">
            Session Transferred
          </h3>
          <p className="text-xs text-ink-muted font-reading leading-relaxed mt-2">
            Your scholar account was just used to sign in on <strong>another device</strong>. In accordance with Dr. Dodiya's 1-device academic policy, this device has been automatically logged out to prevent unauthorized duplication.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-parchment-warm border border-deckle text-[11px] text-ink-muted font-reading leading-relaxed text-left space-y-1">
          <span className="font-medium text-ink block">Want to study on this device instead?</span>
          <p>
            You can transfer your active pass back to this device at any time with a single tap.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              onClose();
              onReLogin();
            }}
            className="w-full py-3 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Transfer Pass Back to This Device</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white border border-deckle hover:border-claret text-ink-muted hover:text-ink text-xs font-medium transition-all min-h-[40px]"
          >
            Continue as Guest Scholar
          </button>
        </div>

      </div>
    </div>
  );
};
