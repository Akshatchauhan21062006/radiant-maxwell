import React, { useState } from 'react';
import { STORE_PRODUCTS, StoreProduct } from '../../data/storeCatalogData';
import { saveOrderAndLicenses, fetchLicensesFromSupabase, loginAndTransferDevice } from '../../lib/supabase';
import { loadRazorpaySDK } from '../../lib/razorpay';
import {
  getVerifiedPrice,
  sanitizeScholarName,
  validateIndianMobile,
  validateEmail,
  validateUtr
} from '../../lib/security';
import { QRCodeSVG } from 'qrcode.react';
import {
  X,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  CreditCard,
  Search,
  UserCheck,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Clock,
  AlertTriangle
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CirculationDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: StoreProduct | null;
  onPurchaseSuccess: (product: StoreProduct, studentName: string, studentMobile: string, orderId: string, deviceToken?: string) => void;
}

export const CirculationDeskModal: React.FC<CirculationDeskModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  onPurchaseSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'restore'>('checkout');
  const [activeProduct, setActiveProduct] = useState<StoreProduct>(selectedProduct || STORE_PRODUCTS[0]);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [activeDeviceToken, setActiveDeviceToken] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi_qr' | 'upi_id' | 'razorpay'>('upi_qr');
  const [upiUtr, setUpiUtr] = useState('');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');

  // Restore Pass state
  const [restoreMobile, setRestoreMobile] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');
  const [restoredDetails, setRestoredDetails] = useState<{ name: string; items: string[]; orderId: string } | null>(null);

  // Sync selectedProduct if opened from different cards
  React.useEffect(() => {
    if (selectedProduct) {
      setActiveProduct(selectedProduct);
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  // Standard UPI URI format supported by all Indian UPI apps
  const officialUpiId = 'rajnikant.dodiya@oksbi';
  const upiUri = `upi://pay?pa=${officialUpiId}&pn=Dr%20Rajnikant%20S%20Dodiya&am=${activeProduct.price}&cu=INR&tn=Atheneum%20${activeProduct.id}`;

  const copyUpiId = () => {
    navigator.clipboard.writeText(officialUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // Complete purchase via manual UPI (Queued for institutional verification)
  const handleUpiPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeScholarName(studentName);
    const mobileCheck = validateIndianMobile(studentMobile);
    const isEmailValid = validateEmail(studentEmail);

    if (!cleanName) {
      alert('Please enter your valid Scholar Name.');
      return;
    }
    if (!mobileCheck.isValid) {
      alert(mobileCheck.error || 'Please enter a valid 10-digit Indian WhatsApp number.');
      return;
    }
    if (!isEmailValid) {
      alert('Please enter a valid personal or academic email address.');
      return;
    }

    const utrCheck = validateUtr(upiUtr);
    if (!utrCheck.isValid) {
      alert(utrCheck.error || 'Please enter the 12-digit UTR/Ref number from your UPI payment app.');
      return;
    }

    let verifiedPrice: number;
    try {
      verifiedPrice = getVerifiedPrice(activeProduct.id, activeProduct.price);
    } catch (err: any) {
      alert(err.message || 'Pricing integrity exception.');
      return;
    }

    setIsProcessing(true);
    const orderId = `HMP-${Date.now().toString().slice(-6)}`;
    const upiPayId = `upi_utr_${utrCheck.cleanUtr}`;

    setGeneratedOrderId(orderId);
    setPaymentId(upiPayId);

    const licensedItems: ('book' | 'exam')[] = [];
    if (activeProduct.type === 'book') licensedItems.push('book');
    else if (activeProduct.type === 'exam') licensedItems.push('exam');
    else if (activeProduct.type === 'bundle') {
      licensedItems.push('book');
      licensedItems.push('exam');
    }

    // Persist manual transfer as 'pending_verification' (Zero free pass loophole)
    const saveResult = await saveOrderAndLicenses(
      {
        order_id: orderId,
        mobile: mobileCheck.cleanMobile,
        student_name: cleanName,
        product_type: activeProduct.type,
        amount: verifiedPrice,
        razorpay_payment_id: upiPayId,
        status: 'pending_verification'
      },
      licensedItems
    );

    if (saveResult.deviceToken) {
      setActiveDeviceToken(saveResult.deviceToken);
    }

    setIsProcessing(false);
    setPurchaseComplete(true);
  };

  // Complete purchase via Razorpay (Instant Bank-Verified Access)
  const handleInitiateRazorpay = async () => {
    const cleanName = sanitizeScholarName(studentName);
    const mobileCheck = validateIndianMobile(studentMobile);
    const isEmailValid = validateEmail(studentEmail);

    if (!cleanName) {
      alert('Please enter your valid Scholar Name.');
      return;
    }
    if (!mobileCheck.isValid) {
      alert(mobileCheck.error || 'Please enter a valid 10-digit Indian WhatsApp number.');
      return;
    }
    if (!isEmailValid) {
      alert('Please enter a valid personal or academic email address.');
      return;
    }

    let verifiedPrice: number;
    try {
      verifiedPrice = getVerifiedPrice(activeProduct.id, activeProduct.price);
    } catch (err: any) {
      alert(err.message || 'Pricing integrity error.');
      return;
    }

    setIsProcessing(true);
    const orderId = `HMP-${Date.now().toString().slice(-6)}`;
    setGeneratedOrderId(orderId);

    // Dynamically load Razorpay checkout script if not present
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const loaded = await loadRazorpaySDK();
      if (!loaded) {
        alert('Could not initialize Razorpay payment gateway. Please check your internet connection.');
        setIsProcessing(false);
        return;
      }
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TpOz4ZlxJBGo0E';

    if (typeof window !== 'undefined' && window.Razorpay) {
      const options = {
        key: razorpayKey,
        amount: verifiedPrice * 100, // in paise - strictly verified against immutable catalog!
        currency: 'INR',
        name: 'The Atheneum | Dr. Rajnikant S. Dodiya',
        description: `Acquisition: ${activeProduct.title}`,
        image: 'https://rajnikantdodiya.com/favicon.svg',
        prefill: {
          name: cleanName,
          email: studentEmail.trim(),
          contact: mobileCheck.cleanMobile
        },
        theme: {
          color: '#6B1D2F'
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        },
        handler: async function (response: any) {
          const razorpayPayId = response.razorpay_payment_id;
          if (!razorpayPayId) {
            alert('Security Alert: Missing payment confirmation ID from gateway response.');
            setIsProcessing(false);
            return;
          }
          setPaymentId(razorpayPayId);

          const licensedItems: ('book' | 'exam')[] = [];
          if (activeProduct.type === 'book') licensedItems.push('book');
          else if (activeProduct.type === 'exam') licensedItems.push('exam');
          else if (activeProduct.type === 'bundle') {
            licensedItems.push('book');
            licensedItems.push('exam');
          }

          const saveResult = await saveOrderAndLicenses(
            {
              order_id: orderId,
              mobile: mobileCheck.cleanMobile,
              student_name: cleanName,
              product_type: activeProduct.type,
              amount: verifiedPrice,
              razorpay_payment_id: razorpayPayId,
              status: 'completed'
            },
            licensedItems
          );

          if (saveResult.deviceToken) {
            setActiveDeviceToken(saveResult.deviceToken);
          }

          setIsProcessing(false);
          setPurchaseComplete(true);
        }
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          alert(`Payment issue: ${resp.error?.description || 'Payment was not completed.'}`);
          setIsProcessing(false);
        });
        rzp.open();
      } catch (err) {
        console.error('Razorpay popup prevented or encountered error:', err);
        alert('Could not initialize Razorpay checkout popup. Please ensure popups are permitted in your browser or try again.');
        setIsProcessing(false);
      }
    } else {
      alert('Razorpay payment gateway is currently unreachable. Please try again or use direct UPI transfer.');
      setIsProcessing(false);
    }
  };

  const handleEnterPortal = () => {
    onPurchaseSuccess(activeProduct, studentName, studentMobile, generatedOrderId, activeDeviceToken);
    onClose();
  };

  const handleRestorePass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreMobile.trim()) return;

    setRestoreStatus('searching');
    const result = await loginAndTransferDevice(restoreMobile);

    if (result.success && result.unlockedItems && result.unlockedItems.length > 0) {
      setRestoredDetails({
        name: result.name || 'Scholar',
        items: result.unlockedItems,
        orderId: result.orderId || 'HMP-ACCESS'
      });
      if (result.deviceToken) {
        setActiveDeviceToken(result.deviceToken);
      }
      setRestoreStatus('found');
    } else {
      setRestoreStatus('not_found');
    }
  };

  const handleApplyRestoredSession = () => {
    if (!restoredDetails) return;
    const restoredProduct = STORE_PRODUCTS.find(p => restoredDetails.items.includes(p.type)) || activeProduct;
    onPurchaseSuccess(restoredProduct, restoredDetails.name, restoreMobile, restoredDetails.orderId, activeDeviceToken);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-ink-pure/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-deckle max-h-[94vh] overflow-y-auto space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-deckle pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-claret font-bold">
              The Circulation Desk • Academic Licensing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-0.5">
              Acquire Scholar Access
            </h3>
            <p className="text-xs text-ink-muted font-reading font-light mt-0.5">
              Authorized personal access for Indian scholars with single-device binding and digital rights protection.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-2 rounded-xl bg-parchment-warm text-ink-muted hover:text-claret transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Mode Tabs: New Checkout vs Restore Pass */}
        {!purchaseComplete && (
          <div className="flex items-center gap-2 p-1 rounded-xl bg-parchment-warm border border-deckle text-xs font-mono">
            <button
              onClick={() => setActiveTab('checkout')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'checkout'
                  ? 'bg-claret text-white shadow-xs font-bold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              1. New Acquisition Pass
            </button>
            <button
              onClick={() => setActiveTab('restore')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'restore'
                  ? 'bg-claret text-white shadow-xs font-bold'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              2. Restore Pass (Login by Mobile)
            </button>
          </div>
        )}

        {/* TAB 1: CHECKOUT / NEW ACQUISITION */}
        {activeTab === 'checkout' && !purchaseComplete && (
          <form onSubmit={paymentMethod === 'razorpay' ? (e) => { e.preventDefault(); handleInitiateRazorpay(); } : handleUpiPaymentSubmit} className="space-y-6">
            
            {/* 1. Select / Confirm Product */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-ink-faint block">
                Select Academic Product:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {STORE_PRODUCTS.map((prod) => {
                  const isCurrent = prod.id === activeProduct.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setActiveProduct(prod)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isCurrent
                          ? 'border-claret bg-claret-soft/40 shadow-xs'
                          : 'border-deckle bg-white hover:border-claret/40'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-ink-faint uppercase block truncate">{prod.badge}</span>
                      <h4 className="font-serif text-xs font-medium text-ink mt-0.5 line-clamp-1">
                        {prod.title}
                      </h4>
                      <div className="mt-1.5 font-serif font-bold text-sm text-claret">
                        ₹{prod.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Scholar Registration Form */}
            <div className="space-y-3 pt-3 border-t border-deckle">
              <span className="text-xs font-mono uppercase text-ink-faint block">
                Scholar Registration (Binds to 1 Active Device):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-ink-faint block mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deckle bg-parchment-warm/40 text-base sm:text-xs font-sans text-ink focus:outline-none focus:border-claret min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-ink-faint block mb-1">WhatsApp Mobile (+91)</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={studentMobile}
                    onChange={(e) => setStudentMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-deckle bg-parchment-warm/40 text-base sm:text-xs font-mono text-ink focus:outline-none focus:border-claret min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-ink-faint block mb-1">Email Address (For Tax Receipt & Watermark)</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@university.ac.in"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-deckle bg-parchment-warm/40 text-base sm:text-xs font-sans text-ink focus:outline-none focus:border-claret min-h-[44px]"
                />
              </div>
            </div>

            {/* 3. DEDICATED UPI PAYMENT & QR CODE OPTIONS */}
            <div className="space-y-3 pt-3 border-t border-deckle">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-ink-faint block">
                  Select Payment Method (India Only):
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Instant Activation
                </span>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-parchment-warm text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'upi_qr'
                      ? 'bg-claret text-white shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI QR Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_id')}
                  className={`py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'upi_id'
                      ? 'bg-claret text-white shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI ID / App</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('razorpay')}
                  className={`py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'razorpay'
                      ? 'bg-claret text-white shadow-xs font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card / NetBanking</span>
                </button>
              </div>

              {/* OPTION A: UPI QR CODE (DEFAULT & HIGHLY REQUESTED) */}
              {paymentMethod === 'upi_qr' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EE] border border-brass/50 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    
                    {/* The Scannable Dynamic UPI QR Code */}
                    <div className="p-3 bg-white rounded-2xl border border-deckle shadow-md shrink-0 flex flex-col items-center">
                      <QRCodeSVG
                        value={upiUri}
                        size={150}
                        level="M"
                        includeMargin={false}
                        className="rounded-lg"
                      />
                      <div className="text-[10px] font-mono text-ink-muted mt-2 font-bold tracking-wider flex items-center gap-1">
                        <span className="text-emerald-700">BHIM</span> • <span className="text-blue-700">GPay</span> • <span className="text-purple-700">PhonePe</span> • <span className="text-sky-700">Paytm</span>
                      </div>
                    </div>

                    {/* Payee Info & Amount */}
                    <div className="space-y-2.5 text-xs flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-claret font-bold">
                          Official Scholar Account
                        </span>
                        <span className="font-serif font-bold text-xl text-claret">
                          ₹{activeProduct.price}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-deckle space-y-1.5 text-ink">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-ink-faint">Payee:</span>
                          <span className="font-bold text-ink">Dr. Rajnikant S. Dodiya</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-ink-faint">Official UPI ID:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-claret">{officialUpiId}</span>
                            <button
                              type="button"
                              onClick={copyUpiId}
                              className="p-1 rounded bg-black/5 hover:bg-black/10 text-ink-muted text-[10px] flex items-center gap-0.5"
                              title="Copy UPI ID"
                            >
                              {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-ink-muted font-reading leading-relaxed">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM. After making the payment of <strong>₹{activeProduct.price}</strong>, enter your 12-digit UTR number below to activate immediately.
                      </p>

                      {/* Mobile Deep-link */}
                      <div className="pt-1 block sm:hidden">
                        <a
                          href={upiUri}
                          className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-sans text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>Tap to Pay in Your UPI App</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* 12-Digit UPI UTR Input */}
                  <div className="pt-2 border-t border-deckle/60">
                    <label className="text-[11px] font-mono text-ink-faint block mb-1">
                      UPI Reference Number / UTR (Optional / 12-digit transaction ID from receipt):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 428190349120"
                      value={upiUtr}
                      onChange={(e) => setUpiUtr(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-deckle bg-white text-base sm:text-xs font-mono text-ink focus:outline-none focus:border-claret min-h-[44px]"
                    />
                  </div>
                </div>
              )}

              {/* OPTION B: UPI ID INPUT */}
              {paymentMethod === 'upi_id' && (
                <div className="p-4 rounded-2xl bg-parchment-warm/60 border border-deckle space-y-3 animate-fade-in">
                  <span className="text-[11px] font-mono text-ink-faint block">
                    Enter your Virtual Payment Address (UPI ID):
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. yourname@oksbi or 9876543210@paytm"
                      value={upiIdInput}
                      onChange={(e) => setUpiIdInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-deckle bg-white text-base sm:text-xs font-mono text-ink focus:outline-none focus:border-claret min-h-[44px]"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted font-reading">
                    A collect request for ₹{activeProduct.price} will be simulated to your UPI app.
                  </p>
                </div>
              )}

              {/* OPTION C: RAZORPAY GATEWAY PREVIEW */}
              {paymentMethod === 'razorpay' && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>Razorpay Standard Checkout: RuPay, Visa, Mastercard, NetBanking.</span>
                  </div>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-[10px] shrink-0">
                    Test Mode
                  </span>
                </div>
              )}

            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Verifying Payment & Generating License...</span>
              ) : paymentMethod === 'razorpay' ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Launch Razorpay Gateway (₹{activeProduct.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>I Have Paid ₹{activeProduct.price} via UPI • Activate My Access</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        )}

        {/* TAB 2: RESTORE EXISTING SCHOLAR PASS */}
        {activeTab === 'restore' && !purchaseComplete && (
          <form onSubmit={handleRestorePass} className="space-y-6">
            <div className="p-4 rounded-2xl bg-parchment-warm border border-deckle space-y-2 text-xs">
              <span className="font-bold text-ink block">Already acquired Dr. Dodiya's monograph or CBT exam?</span>
              <p className="text-ink-muted leading-relaxed font-light">
                Enter your registered WhatsApp mobile number to verify your license and unlock your edition on this device.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-ink-faint block">Registered Mobile Number (+91)</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={restoreMobile}
                  onChange={(e) => setRestoreMobile(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-deckle bg-parchment-warm/40 text-base sm:text-xs font-mono text-ink focus:outline-none focus:border-claret min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={restoreStatus === 'searching'}
                  className="px-5 py-3 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all min-h-[44px] flex items-center gap-1.5 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>{restoreStatus === 'searching' ? 'Verifying...' : 'Verify Pass'}</span>
                </button>
              </div>
            </div>

            {restoreStatus === 'found' && restoredDetails && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Active Scholar Pass Verified!</span>
                </div>
                <div className="text-xs text-ink space-y-1 font-mono">
                  <p>Candidate: <strong className="font-sans">{restoredDetails.name}</strong></p>
                  <p>Order Reference: <strong>#{restoredDetails.orderId}</strong></p>
                  <p>Entitled Access: <strong>{restoredDetails.items.join(', ').toUpperCase()}</strong></p>
                </div>
                <button
                  type="button"
                  onClick={handleApplyRestoredSession}
                  className="w-full py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-medium hover:bg-emerald-700 transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Unlock My Entitlements on this Device</span>
                </button>
              </div>
            )}

            {restoreStatus === 'not_found' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2 text-xs text-amber-900 animate-fade-in">
                <span className="font-bold block">No active license found for +91 {restoreMobile}</span>
                <p className="leading-relaxed">
                  Please verify that you entered the same 10-digit mobile number provided during acquisition, or obtain a new scholar pass.
                </p>
              </div>
            )}
          </form>
        )}

        {/* PURCHASE CONFIRMATION & ACCESS PORTAL LAUNCH */}
        {purchaseComplete && (
          <div className="text-center space-y-5 py-4 animate-fade-in">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-md ${
              paymentId.startsWith('upi_utr_') ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {paymentId.startsWith('upi_utr_') ? <Clock className="w-8 h-8 text-amber-700" /> : <CheckCircle2 className="w-8 h-8 text-emerald-700" />}
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-mono uppercase font-bold tracking-widest ${
                paymentId.startsWith('upi_utr_') ? 'text-amber-800' : 'text-emerald-700'
              }`}>
                {paymentId.startsWith('upi_utr_') ? 'Manual Transfer Queued for Audit' : 'Academic License Activated'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                {paymentId.startsWith('upi_utr_') ? 'Payment Receipt Logged' : `Welcome to The Atheneum, ${studentName}`}
              </h3>
              <p className="text-xs text-ink-muted font-reading max-w-md mx-auto">
                {paymentId.startsWith('upi_utr_')
                  ? 'Your bank UTR reference has been recorded in the institutional audit log. Passes paid via direct manual transfer are activated upon admin reconciliation.'
                  : 'Your personal license has been registered in the institutional repository and bound to this device.'}
              </p>
            </div>

            {/* License Receipt Card */}
            <div className="p-4 rounded-2xl bg-parchment-warm border border-deckle text-xs font-mono text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-deckle pb-2">
                <span className="text-ink-faint">Order ID:</span>
                <span className="font-bold text-ink">#{generatedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-deckle pb-2">
                <span className="text-ink-faint">Product:</span>
                <span className="font-bold text-ink">{activeProduct.title}</span>
              </div>
              <div className="flex justify-between border-b border-deckle pb-2">
                <span className="text-ink-faint">Payment Reference:</span>
                <span className={`font-bold ${paymentId.startsWith('upi_utr_') ? 'text-amber-800' : 'text-emerald-700'}`}>
                  {paymentId}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-ink-faint">Licensed Candidate:</span>
                <span className="font-bold text-ink">{studentName} (+91 {studentMobile})</span>
              </div>
            </div>

            {paymentId.startsWith('upi_utr_') ? (
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <p className="text-[11px] font-mono text-amber-900 bg-amber-50 border border-amber-200 p-3 rounded-xl leading-relaxed text-left">
                  Verification takes 2–4 hours during office hours. Once verified, visit the <strong>Restore Pass</strong> tab with mobile <strong>+91 {studentMobile}</strong> to activate your pass on this device.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-[#2C1810] hover:bg-[#3D2012] text-white text-xs font-mono font-medium shadow-xs transition-all min-h-[44px]"
                >
                  Return to Library Desk
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEnterPortal}
                className="px-8 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-sans font-medium transition-all shadow-xs inline-flex items-center gap-2 min-h-[48px]"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Enter Unlocked Reading Room / Exam Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
