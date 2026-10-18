import React, { useState } from 'react';
import { PROFESSOR_INFO } from '../data/professorData';
import { Mail, MapPin, Globe, Send, CheckCircle2, Feather, Loader2, AlertCircle, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'Academic Inquiry',
    message: ''
  });

  const recipientEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) || PROFESSOR_INFO.officialEmail;
  const ccEmail = (import.meta.env.VITE_CONTACT_CC_EMAIL as string | undefined) || PROFESSOR_INFO.alternateEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Spam honeypot trap: if filled, quietly simulate success without forwarding
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Academic Inquiry - ${formData.category}] ${formData.subject} (from ${formData.name})`,
          _cc: ccEmail,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success === true || result?.success === 'true' || response.status === 200)) {
        setSubmitted(true);
      } else {
        const errorText = result?.message || 'Unable to submit your message at this moment. Please try again or use direct email.';
        setErrorMessage(errorText);
      }
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      setErrorMessage(
        'A network error occurred while sending your message. You can try again or send directly using your email client.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getDirectMailtoUrl = () => {
    const subject = encodeURIComponent(`[${formData.category}] ${formData.subject || 'Academic Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${recipientEmail}?cc=${encodeURIComponent(ccEmail)}&subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-16 animate-fade-in pt-2">
      
      {/* Title Header */}
      <div className="pb-6 border-b border-deckle">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Academic Correspondence</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight mt-1">
          Dialogue & Contact
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1.5 max-w-2xl leading-relaxed">
          Inquiries regarding keynote lectures, academic research collaborations, ELEF & CAIELE initiatives, and institutional quality mentorship.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book space-y-6">
          <div>
            <div className="w-10 h-10 rounded-xl bg-claret-soft border border-claret/20 flex items-center justify-center text-claret mb-3">
              <Feather className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl text-ink font-normal">{PROFESSOR_INFO.name}</h2>
            <p className="text-xs text-claret font-mono font-semibold mt-0.5">{PROFESSOR_INFO.title}</p>
          </div>

          <div className="space-y-4 text-xs font-sans text-ink-muted">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-claret shrink-0 mt-0.5" />
              <div>
                <strong className="font-medium text-ink block mb-0.5">Academic Department:</strong>
                <p className="font-light leading-relaxed">{PROFESSOR_INFO.institution},</p>
                <p className="font-light leading-relaxed">{PROFESSOR_INFO.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-claret shrink-0 mt-0.5" />
              <div>
                <strong className="font-medium text-ink block mb-0.5">Official University Email:</strong>
                <a href={`mailto:${PROFESSOR_INFO.officialEmail}`} className="text-claret font-mono underline hover:text-claret-light block break-all">
                  {PROFESSOR_INFO.officialEmail}
                </a>
                <span className="text-ink-faint block text-[11px] mt-0.5 break-all">Alternate: {PROFESSOR_INFO.alternateEmail}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-claret shrink-0 mt-0.5" />
              <div>
                <strong className="font-medium text-ink block mb-0.5">Institute Portal:</strong>
                <a href={`https://${PROFESSOR_INFO.instituteWebsite}`} target="_blank" rel="noreferrer" className="text-ink hover:text-claret underline block font-mono break-all">
                  {PROFESSOR_INFO.instituteWebsite}
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-parchment-warm border border-deckle space-y-2 text-[11px] text-ink-muted font-reading font-light">
            <strong className="text-ink font-serif font-medium block">Consultancy & Advisory Domains:</strong>
            <ul className="space-y-1 list-disc list-inside">
              <li>Invited Keynotes & National English Pedagogy Webinars</li>
              <li>IQAC Quality Assurance & NAAC Documentation Advisory</li>
              <li>Teacher Education Curriculum & Syllabus Design (NEP 2020)</li>
              <li>Techno-Pedagogical Integration & AI in English Education</li>
              <li>Peer Reviews & Academic Editorial Collaboration</li>
            </ul>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="lg:col-span-7 folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book">
          <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal mb-5">Send an Academic Enquiry</h3>

          {submitted ? (
            <div className="p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-ink font-normal">Enquiry Transmitted</h4>
              <p className="text-xs text-ink-muted max-w-md mx-auto font-reading leading-relaxed">
                Thank you, {formData.name}. Your correspondence regarding <span className="font-medium text-ink">"{formData.subject || formData.category}"</span> has been dispatched to Dr. Dodiya's institutional inbox (<span className="font-mono text-ink text-[11px]">{recipientEmail}</span>) with a copy to <span className="font-mono text-ink text-[11px]">{ccEmail}</span>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage(null);
                  setFormData({ name: '', email: '', subject: '', category: 'Academic Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium min-h-[44px] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Anti-spam honeypot hidden field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_honey">Leave this blank</label>
                <input
                  id="_honey"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{errorMessage}</p>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] text-amber-800">Prefer sending directly from your mailbox?</span>
                    <a
                      href={getDirectMailtoUrl()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-claret hover:bg-claret-light text-white font-medium text-[11px] transition-colors"
                    >
                      <span>Open in Email App</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-ink font-medium block mb-1">Your Full Name & Designation *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Prof. / Dr. / Scholar Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink placeholder-ink-faint focus:outline-none focus:border-claret min-h-[44px] text-base sm:text-xs"
                  />
                </div>

                <div>
                  <label className="text-ink font-medium block mb-1">Your Institutional Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="scholar@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink placeholder-ink-faint focus:outline-none focus:border-claret min-h-[44px] text-base sm:text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-ink font-medium block mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink focus:outline-none focus:border-claret min-h-[44px] text-base sm:text-xs"
                  >
                    <option value="Academic Inquiry">Academic & Research Inquiry</option>
                    <option value="Invited Keynote / Lecture">Invited Keynote / Lecture Invitation</option>
                    <option value="ELEF / CAIELE Collaboration">ELEF / CAIELE Program Collaboration</option>
                    <option value="IQAC & Quality Mentorship">IQAC & Accreditation Consultation</option>
                    <option value="Curriculum & Book Review">Curriculum & Book Review</option>
                  </select>
                </div>

                <div>
                  <label className="text-ink font-medium block mb-1">Subject *</label>
                  <input
                    required
                    type="text"
                    placeholder="Specific subject of correspondence"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink placeholder-ink-faint focus:outline-none focus:border-claret min-h-[44px] text-base sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-ink font-medium block mb-1">Message or Invitation Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Please describe your academic institution, proposal, or conference details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-parchment-warm/60 border border-deckle text-ink placeholder-ink-faint focus:outline-none focus:border-claret font-sans text-base sm:text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-claret hover:bg-claret-light disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium shadow-xs flex items-center justify-center gap-2 transition-all min-h-[44px]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Academic Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Academic Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
