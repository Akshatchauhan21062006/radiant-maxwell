import React, { useState } from 'react';
import {
  PROFESSOR_INFO,
  BOOKS,
  EXPERTISE_AREAS,
  QUALIFICATIONS,
  ELIGIBILITIES,
  EXPERIENCES,
  MEMBERSHIPS
} from '../data/professorData';
import { LITERARY_QUOTES } from '../data/literaryData';
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Feather,
  Archive,
  Layers,
  ShieldCheck,
  Bookmark,
  ChevronRight,
  GraduationCap,
  Award,
  Briefcase,
  Users,
  Heart,
  Quote,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { MainTab } from './Navbar';
import { useScholarSession } from '../hooks/useScholarSession';

interface HomePageProps {
  onNavigate: (tab: MainTab, subId?: string) => void;
  onOpenCompendium: () => void;
  initialView?: 'overview' | 'cv';
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCompendium,
  initialView = 'overview'
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'cv'>(initialView);
  const featuredBooks = BOOKS.slice(0, 3);
  const { isBookOwned, isExamOwned } = useScholarSession();

  // Signature daily aphorism from Dr. Kalam & Mark Twain
  const dailyAphorism = LITERARY_QUOTES[1] || LITERARY_QUOTES[0];

  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pt-2">
      
      {/* ========================================================= */}
      {/* 1. SCHOLAR HERO: ATMOSPHERIC PORTRAIT & SCHOLAR IDENTITY   */}
      {/* ========================================================= */}
      <section className="folio-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 bg-white border border-deckle shadow-book relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claret-soft border border-claret/20 text-claret text-xs font-mono font-semibold max-w-full truncate">
              <Feather className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{PROFESSOR_INFO.institution}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ink font-normal leading-[1.15] tracking-tight">
              {PROFESSOR_INFO.name}
            </h1>
            
            <p className="font-serif text-sm sm:text-lg italic text-claret font-medium leading-snug">
              {PROFESSOR_INFO.title}
            </p>

            {/* Academic Credentials Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-parchment-warm text-ink-muted border border-deckle">
                <GraduationCap className="w-3.5 h-3.5 text-claret" />
                <span>Ph.D. in Education (2018)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-parchment-warm text-ink-muted border border-deckle">
                <Award className="w-3.5 h-3.5 text-brass" />
                <span>UGC-NET & GSET</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-parchment-warm text-ink-muted border border-deckle">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>IQAC Coordinator</span>
              </span>
            </div>

            <blockquote className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-parchment-warm/70 border-l-4 border-brass text-xs sm:text-sm font-reading text-ink-muted leading-relaxed italic">
              "{PROFESSOR_INFO.academicPhilosophy.slice(0, 240)}..."
            </blockquote>

            <p className="text-xs sm:text-sm text-ink-muted font-sans font-light leading-relaxed">
              Scholar of English Language Education, doctoral researcher on Dr. A.P.J. Abdul Kalam's educational philosophy, author of six books and editor of four academic volumes. Specializing in post-method pedagogy, multilingualism, and AI-enabled language acquisition under NEP 2020.
            </p>

            {/* Responsive Action Buttons (Aligned & Balanced on Mobile) */}
            <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              {/* Primary Action Button */}
              <button
                onClick={() => onNavigate('research')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Layers className="w-4 h-4 text-white" />
                <span>Curated Research & Books</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Actions Grid on Mobile (No Orphaned Buttons) */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setActiveView(activeView === 'overview' ? 'cv' : 'overview')}
                  className="col-span-2 sm:col-auto px-4 py-2.5 sm:py-3 rounded-xl bg-parchment-warm border border-deckle hover:border-claret text-xs font-medium text-ink transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <FileText className="w-4 h-4 text-claret shrink-0" />
                  <span>{activeView === 'overview' ? 'View Biography & CV' : 'Switch to Overview'}</span>
                </button>

                <button
                  onClick={() => onNavigate('store')}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#1C2541] hover:bg-[#2A375B] text-white text-xs font-medium shadow-xs transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px]"
                >
                  <BookOpen className="w-4 h-4 text-[#48CAE4] shrink-0" />
                  <span>The Atheneum</span>
                </button>

                <button
                  onClick={() => onNavigate('salon')}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-deckle hover:border-claret text-ink-muted hover:text-claret text-xs font-medium transition-all flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-brass shrink-0" />
                  <span>Literary Salon</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Portrait with Bookish Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-deckle shadow-book-lg bg-parchment-warm group">
              <img
                src={PROFESSOR_INFO.photoUrl}
                alt={PROFESSOR_INFO.name}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={400}
                height={430}
                className="w-full h-[280px] sm:h-[380px] lg:h-[430px] object-cover object-top filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-pure/90 via-ink-pure/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brass-light block">Academic Fellowship</span>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white">{PROFESSOR_INFO.name}</h3>
                <p className="text-[11px] text-parchment-deep font-light">Ph.D. in Education • UGC-NET & GSET (English & Education)</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* VIEW SWITCHER TABS: OVERVIEW VS FULL CV / BIOGRAPHY       */}
      {/* ========================================================= */}
      <div className="flex items-center justify-center w-full">
        <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex p-1 sm:p-1.5 rounded-2xl bg-white border border-deckle shadow-xs text-xs font-sans">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-3 sm:px-5 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
              activeView === 'overview'
                ? 'bg-claret text-white font-medium shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-parchment-warm'
            }`}
          >
            <Feather className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Overview</span>
          </button>

          <button
            onClick={() => setActiveView('cv')}
            className={`px-3 sm:px-5 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
              activeView === 'cv'
                ? 'bg-claret text-white font-medium shadow-xs'
                : 'text-ink-muted hover:text-ink hover:bg-parchment-warm'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline truncate">Curriculum Vitae</span>
            <span className="sm:hidden truncate">Full CV</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODE 1: SCHOLARLY OVERVIEW                                */}
      {/* ========================================================= */}
      {activeView === 'overview' && (
        <div className="space-y-16 animate-fade-in">
          
          {/* 1. Three Pillars of Inquiry */}
          <section className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Scholarly Focus</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal">Pillars of Inquiry & Pedagogy</h2>
              <p className="text-xs text-ink-muted font-reading font-light">
                Core academic domains informing Dr. Dodiya’s teaching, authored monographs, and university governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="folio-card rounded-2xl p-6 bg-white border border-deckle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-claret-soft text-claret flex items-center justify-center">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-ink font-medium">Post-Method & Multilingualism</h3>
                <p className="text-xs text-ink-muted font-reading leading-relaxed font-light">
                  Pioneering context-sensitive pedagogy where students' mother tongues (L1) serve as cognitive scaffolding rather than barriers in English acquisition.
                </p>
              </div>

              <div className="folio-card rounded-2xl p-6 bg-white border border-deckle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brass-soft text-brass-dark flex items-center justify-center">
                  <Feather className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-ink font-medium">Dr. Kalam’s Educational Thoughts</h3>
                <p className="text-xs text-ink-muted font-reading leading-relaxed font-light">
                  Doctoral thesis examining creative inquiry, value orientation, and ethical purpose in youth education, drawing on Dr. A.P.J. Abdul Kalam's seminal writings.
                </p>
              </div>

              <div className="folio-card rounded-2xl p-6 bg-white border border-deckle space-y-3">
                <div className="w-10 h-10 rounded-xl bg-claret-soft text-claret flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-ink font-medium">Techno-Pedagogy & AI in ELE</h3>
                <p className="text-xs text-ink-muted font-reading leading-relaxed font-light">
                  Serving as Coordinator of CAIELE, researching how generative AI, blended learning, and digital humanities elevate classroom engagement under NEP 2020.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Focused Daily Philosophical Aphorism Showcase (Directs to Literary Salon) */}
          <section className="folio-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-8 bg-gradient-to-br from-white via-parchment-warm/50 to-[#FAF5EC] border border-deckle shadow-book relative overflow-hidden">
            <Quote className="hidden sm:block absolute -right-4 -bottom-4 w-32 h-32 text-deckle/20 pointer-events-none rotate-12" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                {/* Responsive Aphorism Header Badges (No Wrapping Glitch) */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-claret font-bold bg-claret-soft px-2.5 py-1 rounded-md border border-claret/20 shrink-0">
                    <Sparkles className="w-3 h-3 text-brass shrink-0" />
                    <span>Aphorism of the Day</span>
                    <span className="opacity-40">•</span>
                    <span>{dailyAphorism.theme}</span>
                  </span>
                  {dailyAphorism.source && (
                    <span className="text-[11px] font-mono text-ink-muted">
                      • {dailyAphorism.source}
                    </span>
                  )}
                </div>

                <p className="font-serif text-lg sm:text-xl text-ink font-normal italic leading-snug">
                  "{dailyAphorism.quote}"
                </p>
                <span className="text-xs font-mono font-bold text-ink block">
                  — {dailyAphorism.author}
                </span>

                <div className="p-3.5 rounded-xl bg-white/80 border border-deckle text-xs font-reading text-ink-muted leading-relaxed">
                  <strong className="text-claret font-serif font-medium block mb-0.5">Faculty Reflection (Dr. Dodiya):</strong>
                  {dailyAphorism.drDodiyaReflection}
                </div>
              </div>

              <div className="shrink-0 space-y-2">
                <button
                  onClick={() => onNavigate('salon')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-brass" />
                  <span>Explore The Literary Salon</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-ink-faint font-reading text-center">
                  Victorian burns, poetry & destiny scrolls
                </p>
              </div>
            </div>
          </section>

          {/* 3. Curated Landmark Bookshelf Showcase */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-deckle">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Monographs & Treatises</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-0.5">Selected Books</h2>
                <p className="text-xs text-ink-muted font-reading font-light mt-0.5">Author of 6 books and editor of 4 academic volumes.</p>
              </div>
              <button
                onClick={() => onNavigate('research')}
                className="text-xs font-medium text-claret hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Explore All 10 Volumes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredBooks.map((book, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('research')}
                  className="folio-card rounded-2xl p-5 bg-white border border-deckle hover:border-claret/50 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 inline-block uppercase">
                      {book.year} • {book.type === 'edited' ? 'Edited' : 'Authored'}
                    </span>
                    <h4 className="font-serif text-base font-medium text-ink group-hover:text-claret transition-colors leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-ink-muted font-reading font-light">
                      Publisher: {book.publisher}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-deckle text-[11px] font-mono text-ink-faint flex items-center justify-between mt-3">
                    <span>ISBN {book.isbn}</span>
                    <span className="text-claret group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. The Atheneum: Digital Acquisitions Desk Spotlight */}
          <section className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-parchment-warm/40 to-white border border-deckle shadow-book space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-deckle pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-block mb-1">
                  The Atheneum • Official Digital Library
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
                  Doctoral Monograph & UGC-NET CBT Portal
                </h3>
                <p className="text-xs text-ink-muted font-reading font-light max-w-xl mt-1">
                  Direct student access to Dr. Dodiya's Ph.D. monograph reader with anti-piracy licensing, and a 25-question UGC-NET/GSET Computer-Based Test simulator with instant faculty rationale.
                </p>
              </div>

              <button
                onClick={() => onNavigate('store')}
                className="px-6 py-3 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Visit The Atheneum</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => onNavigate('store')}
                className="p-5 rounded-2xl bg-white border border-deckle hover:border-claret cursor-pointer transition-all space-y-2 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  {isBookOwned ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 uppercase flex items-center gap-1">
                      ✓ Licensed Copy
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-claret bg-claret-soft px-2 py-0.5 rounded uppercase">
                      Digital Monograph
                    </span>
                  )}
                  <span className={`text-xs font-serif font-bold ${isBookOwned ? 'text-emerald-800' : 'text-ink group-hover:text-claret'}`}>
                    {isBookOwned ? 'Acquired' : '₹399'}
                  </span>
                </div>
                <h4 className="font-serif text-base font-medium text-ink group-hover:text-claret transition-colors">
                  Educational Thoughts of APJ Abdul Kalam
                </h4>
                <p className="text-xs text-ink-muted font-reading font-light leading-relaxed">
                  {isBookOwned
                    ? 'Full 4-chapter monograph unlocked on this device. Click to read in cloud reader.'
                    : 'In-browser protected reader with 1-device active student lock and dynamic forensic watermarking.'}
                </p>
              </div>

              <div
                onClick={() => onNavigate('store')}
                className="p-5 rounded-2xl bg-white border border-deckle hover:border-claret cursor-pointer transition-all space-y-2 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  {isExamOwned ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 uppercase flex items-center gap-1">
                      ✓ Enrolled
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-brass-dark bg-brass-soft px-2 py-0.5 rounded uppercase">
                      Mock CBT Exam
                    </span>
                  )}
                  <span className={`text-xs font-serif font-bold ${isExamOwned ? 'text-emerald-800' : 'text-ink group-hover:text-claret'}`}>
                    {isExamOwned ? 'Enrolled' : '₹299'}
                  </span>
                </div>
                <h4 className="font-serif text-base font-medium text-ink group-hover:text-claret transition-colors">
                  UGC-NET & GSET 25-Question Simulation
                </h4>
                <p className="text-xs text-ink-muted font-reading font-light leading-relaxed">
                  {isExamOwned
                    ? 'All 25 questions and diagnostic evaluation unlocked. Click to launch simulator.'
                    : 'Timed 60-min test engine, question palette, negative marking, instant percentile, and faculty answers.'}
                </p>
              </div>
            </div>
          </section>

          {/* 5. Institutional Leadership & Academic Compendium Callout */}
          <section className="p-6 sm:p-8 rounded-2xl bg-parchment-warm border border-deckle flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono uppercase font-semibold text-claret">Institutional Governance & Verification</span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">Need Full NAAC or Accreditation Transcripts?</h3>
              <p className="text-xs text-ink-muted font-reading font-light max-w-xl">
                Access the complete catalog of all 22 invited lectures, 12 conference papers, 9 session chairs, FDP certificates, and university degree verification.
              </p>
            </div>

            <button
              onClick={onOpenCompendium}
              className="px-6 py-3 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-medium shadow-xs transition-all flex items-center gap-2 shrink-0 min-h-[44px]"
            >
              <Archive className="w-4 h-4" />
              <span>Open Academic Compendium</span>
            </button>
          </section>

        </div>
      )}

      {/* ========================================================= */}
      {/* MODE 2: CURRICULUM VITAE & ACADEMIC RECORD                */}
      {/* ========================================================= */}
      {activeView === 'cv' && (
        <div className="space-y-12 sm:space-y-16 animate-fade-in">
          
          {/* 2.1 Profile Narrative */}
          <section className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book space-y-4">
            <div className="flex items-center gap-2.5 text-claret border-b border-deckle pb-3">
              <GraduationCap className="w-5 h-5 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Academic Biography & Trajectory</h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
              {PROFESSOR_INFO.fullProfile}
            </p>
          </section>

          {/* 2.2 Formal Academic Degrees & Net/Gset */}
          <section className="space-y-6">
            <div className="pb-2 border-b border-deckle flex items-center gap-2">
              <Award className="w-5 h-5 text-claret shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Formal Academic Degrees</h2>
            </div>

            {/* Mobile Card Layout */}
            <div className="sm:hidden space-y-3">
              {QUALIFICATIONS.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-deckle shadow-2xs space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-medium text-ink text-sm">{q.qualification}</span>
                    <span className="text-[11px] font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20 shrink-0">{q.year}</span>
                  </div>
                  <p className="text-xs text-ink-muted">{q.institution}</p>
                  {q.details && <p className="text-[11px] text-ink-faint italic">{q.details}</p>}
                </div>
              ))}
            </div>

            {/* Desktop / Tablet Table Layout */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
              <table className="w-full text-left text-xs text-ink-muted min-w-[540px]">
                <thead className="bg-parchment-warm text-ink border-b border-deckle font-mono text-[10px] sm:text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3 sm:px-4">Year</th>
                    <th className="py-2.5 px-3 sm:px-4">Qualification</th>
                    <th className="py-2.5 px-3 sm:px-4">University / Institution</th>
                    <th className="py-2.5 px-3 sm:px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deckle/60">
                  {QUALIFICATIONS.map((q, idx) => (
                    <tr key={idx} className="hover:bg-parchment-light">
                      <td className="py-3 px-3 sm:px-4 font-mono font-semibold text-claret whitespace-nowrap">{q.year}</td>
                      <td className="py-3 px-3 sm:px-4 font-medium text-ink">{q.qualification}</td>
                      <td className="py-3 px-3 sm:px-4">{q.institution}</td>
                      <td className="py-3 px-3 sm:px-4 text-ink-faint font-light">{q.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF5EB] border border-brass/30 text-xs text-ink-muted space-y-1 font-reading font-light leading-relaxed">
              <span className="font-semibold text-brass-dark block">Doctoral Research Record:</span>
              <p>P.G. Department of Education, Sardar Patel University; Registration No. {PROFESSOR_INFO.phdDetails.regNo}.</p>
              <p>Research Guide: {PROFESSOR_INFO.phdDetails.guide}. Result declared: {PROFESSOR_INFO.phdDetails.resultDeclared}.</p>
            </div>
          </section>

          {/* 2.3 Eligibility Examinations */}
          <section className="space-y-4">
            <h3 className="text-xs sm:text-sm font-mono font-semibold uppercase text-ink-muted">National & State Eligibility Qualifications</h3>
            
            {/* Mobile Card Layout */}
            <div className="sm:hidden space-y-3">
              {ELIGIBILITIES.map((e, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-deckle shadow-2xs space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-medium text-ink text-sm">{e.examination}</span>
                    <span className="text-[11px] font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20 shrink-0">{e.year}</span>
                  </div>
                  <p className="text-xs text-ink-muted">Subject: <span className="text-ink font-medium">{e.subject}</span></p>
                  <p className="text-[11px] text-ink-faint">Body: {e.body}</p>
                </div>
              ))}
            </div>

            {/* Desktop / Tablet Table Layout */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
              <table className="w-full text-left text-xs text-ink-muted min-w-[500px]">
                <thead className="bg-parchment-warm text-ink border-b border-deckle font-mono text-[10px] sm:text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3 sm:px-4">Year</th>
                    <th className="py-2.5 px-3 sm:px-4">Examination</th>
                    <th className="py-2.5 px-3 sm:px-4">Subject</th>
                    <th className="py-2.5 px-3 sm:px-4">Conducting Body</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deckle/60">
                  {ELIGIBILITIES.map((e, idx) => (
                    <tr key={idx} className="hover:bg-parchment-light">
                      <td className="py-3 px-3 sm:px-4 font-mono font-semibold text-claret whitespace-nowrap">{e.year}</td>
                      <td className="py-3 px-3 sm:px-4 font-medium text-ink">{e.examination}</td>
                      <td className="py-3 px-3 sm:px-4">{e.subject}</td>
                      <td className="py-3 px-3 sm:px-4 text-ink-faint">{e.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2.4 Professional Experience */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-deckle flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-claret shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Professional & Teaching Experience</h2>
            </div>

            {/* Mobile Card Layout */}
            <div className="sm:hidden space-y-3">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-deckle shadow-2xs space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif font-medium text-ink text-sm">{exp.position}</span>
                    <span className="text-[10px] font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20 shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-xs text-ink-muted">{exp.institution}</p>
                </div>
              ))}
            </div>

            {/* Desktop / Tablet Table Layout */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
              <table className="w-full text-left text-xs text-ink-muted min-w-[500px]">
                <thead className="bg-parchment-warm text-ink border-b border-deckle font-mono text-[10px] sm:text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3 sm:px-4 w-36">Period</th>
                    <th className="py-2.5 px-3 sm:px-4">Position</th>
                    <th className="py-2.5 px-3 sm:px-4">Institution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deckle/60">
                  {EXPERIENCES.map((exp, idx) => (
                    <tr key={idx} className="hover:bg-parchment-light">
                      <td className="py-3 px-3 sm:px-4 font-mono font-semibold text-claret whitespace-nowrap">{exp.period}</td>
                      <td className="py-3 px-3 sm:px-4 font-medium text-ink">{exp.position}</td>
                      <td className="py-3 px-3 sm:px-4 text-ink-muted">{exp.institution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 2.5 Areas of Expertise */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-deckle flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-claret shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Areas of Pedagogical & Research Expertise</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {EXPERTISE_AREAS.map((area, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white border border-deckle flex items-center gap-2.5 text-xs text-ink shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-claret shrink-0"></span>
                  <span className="font-medium leading-snug">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2.6 Vision & Academic Philosophy */}
          <section className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#FAF5EB] border border-brass/30 space-y-3">
            <div className="flex items-center gap-2 text-brass-dark">
              <Heart className="w-5 h-5 text-brass-dark shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Vision & Educational Philosophy</h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-reading font-light italic">
              "{PROFESSOR_INFO.academicPhilosophy}"
            </p>
          </section>

          {/* 2.7 Professional Memberships */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-deckle flex items-center gap-2">
              <Users className="w-5 h-5 text-claret shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Professional Memberships</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {MEMBERSHIPS.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl sm:rounded-2xl bg-white border border-deckle text-xs flex flex-col justify-between shadow-book space-y-2">
                  <div>
                    <span className="text-[10px] font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20 inline-block uppercase">{m.type}</span>
                    <h3 className="font-serif text-sm sm:text-base font-normal text-ink mt-2">{m.association}</h3>
                  </div>
                  <span className="text-[11px] font-mono text-ink-faint">{m.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 2.8 Official Compendium Callout */}
          <section className="p-6 sm:p-8 rounded-2xl bg-parchment-warm border border-deckle flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg text-ink font-normal">Complete Invited Talks & Research Dissemination</h4>
              <p className="text-xs text-ink-muted font-reading font-light mt-0.5">
                Inspect the complete record of all 22 invited lectures, 12 conference papers, and 9 session chairs.
              </p>
            </div>
            <button
              onClick={onOpenCompendium}
              className="px-5 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-1.5 shrink-0 min-h-[44px]"
            >
              <Archive className="w-4 h-4" />
              <span>Open Compendium</span>
            </button>
          </section>

        </div>
      )}

    </div>
  );
};
