import React, { useState } from 'react';
import { PROFESSOR_INFO, PUBLICATIONS, BOOKS, EXPERTISE_AREAS } from '../data/professorData';
import { VirtualBookshelf } from './VirtualBookshelf';
import { Search, Filter, BookOpen, ExternalLink, Award, FileText, Sparkles, Archive, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MainTab } from './Navbar';
import { useScholarSession } from '../hooks/useScholarSession';

interface ResearchPageProps {
  onOpenCompendium?: () => void;
  onNavigate?: (tab: MainTab) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onOpenCompendium, onNavigate }) => {
  const { isBookOwned } = useScholarSession();
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [publicationSearch, setPublicationSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const themes = ['All', ...Array.from(new Set(PUBLICATIONS.map(p => p.theme)))];

  const filteredPublications = PUBLICATIONS.filter(pub => {
    const matchesTheme = selectedTheme === 'All' || pub.theme === selectedTheme;
    const matchesSearch = pub.title.toLowerCase().includes(publicationSearch.toLowerCase()) ||
                          pub.journal.toLowerCase().includes(publicationSearch.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  return (
    <div className="space-y-16 animate-fade-in pt-2">
      
      {/* Title Header */}
      <div className="pb-6 border-b border-deckle">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Scholarly Oeuvre</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight mt-1">
          Research & Publications
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1.5 max-w-2xl leading-relaxed">
          Doctoral inquiry, 10 authored and edited academic volumes, 19 peer-reviewed papers, and verified citation metrics.
        </p>
      </div>

      {/* 1. Doctoral Dissertation Spotlight */}
      <section className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-white border border-deckle shadow-book space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deckle pb-3">
          <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-3 py-1 rounded-full border border-claret/20 self-start sm:self-auto">
            Doctoral Dissertation • Ph.D. in Education (2018)
          </span>
          <span className="text-xs font-mono text-ink-faint">Sardar Patel University, Vallabh Vidyanagar</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal leading-snug">
          "A Study of the Educational Thoughts as reflected in APJ Abdul Kalam’s Writings"
        </h3>

        <p className="text-xs sm:text-sm text-ink-muted font-reading font-light leading-relaxed">
          An in-depth qualitative and conceptual investigation analyzing Dr. Kalam's autobiographical and philosophical treatises—crystallizing his vision for teacher-led creative inquiry, value integration in school curricula, and science-humanities synthesis for national development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-sans text-ink-muted border-t border-deckle/60">
          <div>
            <strong className="text-ink font-medium block">Research Guide:</strong>
            <span className="text-ink-faint">{PROFESSOR_INFO.phdDetails.guide}</span>
          </div>
          <div>
            <strong className="text-ink font-medium block">University Registration:</strong>
            <span className="text-ink-faint font-mono">Reg. No. {PROFESSOR_INFO.phdDetails.regNo}</span>
          </div>
          <div>
            <strong className="text-ink font-medium block">Result Declaration:</strong>
            <span className="text-ink-faint font-mono">{PROFESSOR_INFO.phdDetails.resultDeclared}</span>
          </div>
        </div>

        {onNavigate && (
          <div className="pt-3 border-t border-deckle/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-parchment-warm/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4 sm:px-8 rounded-b-2xl sm:rounded-b-3xl">
            <div className="text-xs">
              <span className="font-medium text-ink block">
                {isBookOwned ? 'Your Ph.D. Monograph Scholar Pass is Active' : 'Looking to read the complete Ph.D. monograph?'}
              </span>
              <span className="text-ink-faint text-[11px]">
                {isBookOwned
                  ? 'Your single-device cloud edition is unlocked. Open the reader to continue reading.'
                  : 'Available with single-device anti-piracy licensing and sample chapter reader.'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('store')}
              className={`px-4 py-2 rounded-xl text-white text-xs font-medium transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 ${
                isBookOwned ? 'bg-emerald-800 hover:bg-emerald-700' : 'bg-claret hover:bg-claret-light'
              }`}
            >
              {isBookOwned ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Read Full Monograph (Unlocked)</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Acquire at The Atheneum</span>
                </>
              )}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      {/* 2. Interactive Virtual Bookshelf (Authored & Edited Books) */}
      <section className="space-y-4">
        <VirtualBookshelf onNavigate={onNavigate} />
      </section>

      {/* 3. Peer-Reviewed Publications (19 Papers) with Card vs Table Switcher */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-deckle">
          <div>
            <span className="text-xs font-mono uppercase text-claret font-semibold">19 Peer-Reviewed Articles</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-0.5">Journal Publications</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-parchment-warm border border-deckle text-xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'cards' ? 'bg-claret text-white font-medium shadow-xs' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-claret text-white font-medium shadow-xs' : 'text-ink-muted hover:text-ink'
                }`}
              >
                Table
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search publications..."
                value={publicationSearch}
                onChange={(e) => setPublicationSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-deckle text-xs text-ink focus:outline-none focus:border-claret min-h-[38px]"
              />
            </div>
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <Filter className="w-3.5 h-3.5 text-ink-faint shrink-0" />
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTheme(t)}
              className={`px-3 py-1 rounded-lg text-xs font-sans whitespace-nowrap transition-all ${
                selectedTheme === t
                  ? 'bg-claret text-white shadow-xs font-medium'
                  : 'bg-parchment-warm text-ink-muted hover:bg-parchment-deep hover:text-ink border border-deckle'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* View Mode: Curated Cards */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPublications.map((pub) => (
              <div key={pub.no} className="folio-card rounded-2xl p-5 bg-white border border-deckle space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-claret bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20">
                    {pub.year} • {pub.theme}
                  </span>
                  <span className="text-[11px] font-mono text-ink-faint">#{pub.no}</span>
                </div>

                <h4 className="font-serif text-base font-normal text-ink leading-snug">
                  {pub.title}
                </h4>

                <p className="text-xs text-ink-muted font-reading italic">
                  {pub.journal}
                </p>

                <div className="pt-2 border-t border-deckle/60 flex items-center justify-between text-[11px] font-mono text-ink-faint">
                  <span>ISSN: {pub.issn}</span>
                  <span className="text-claret font-sans font-medium text-xs">Peer-Reviewed</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* View Mode: Bibliographic Table */
          <div className="overflow-x-auto rounded-2xl border border-deckle bg-white shadow-book">
            <table className="w-full text-left text-xs text-ink-muted min-w-[550px]">
              <thead className="bg-parchment-warm text-ink border-b border-deckle font-mono text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4 w-16">Year</th>
                  <th className="py-3 px-4">Article Title & Journal Details</th>
                  <th className="py-3 px-4 w-44">Thematic Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-deckle/60">
                {filteredPublications.map((pub) => (
                  <tr key={pub.no} className="hover:bg-parchment-light">
                    <td className="py-3 px-4 font-mono font-bold text-ink-faint">{pub.no}</td>
                    <td className="py-3 px-4 font-mono font-bold text-claret">{pub.year}</td>
                    <td className="py-3 px-4 space-y-0.5">
                      <p className="font-serif text-sm font-normal text-ink leading-snug">{pub.title}</p>
                      <p className="text-[11px] text-ink-faint italic">{pub.journal} • ISSN: {pub.issn}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-parchment-warm text-ink font-mono text-[10px] border border-deckle block truncate">
                        {pub.theme}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. Verified Research Profiles & Citation Metrics */}
      <section className="space-y-6 pt-4">
        <div className="pb-3 border-b border-deckle flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <span className="text-xs font-mono uppercase text-claret font-semibold">Academic Indexing</span>
            <h2 className="font-serif text-2xl text-ink font-normal mt-0.5">Research Profiles & Citation Metrics</h2>
          </div>
          <span className="text-xs font-mono text-ink-faint">Institutional Domain: {PROFESSOR_INFO.researchProfiles.verifiedDomain}</span>
        </div>

        {/* Platform links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <a href={`https://orcid.org/${PROFESSOR_INFO.researchProfiles.orcid}`} target="_blank" rel="noreferrer" className="p-3.5 rounded-xl bg-white border border-deckle hover:border-claret text-center text-xs text-ink transition-all shadow-2xs">
            <span className="font-bold block">ORCID</span>
            <span className="text-[10px] font-mono text-ink-faint truncate block mt-0.5">{PROFESSOR_INFO.researchProfiles.orcid}</span>
          </a>

          <a href={`https://scholar.google.com/citations?user=${PROFESSOR_INFO.researchProfiles.googleScholar}`} target="_blank" rel="noreferrer" className="p-3.5 rounded-xl bg-white border border-deckle hover:border-claret text-center text-xs text-ink transition-all shadow-2xs">
            <span className="font-bold block">Google Scholar</span>
            <span className="text-[10px] font-mono text-ink-faint truncate block mt-0.5">X92BI1AAAAAJ</span>
          </a>

          <div className="p-3.5 rounded-xl bg-white border border-deckle text-center text-xs text-ink shadow-2xs">
            <span className="font-bold block">VIDWAN</span>
            <span className="text-[10px] font-mono text-ink-faint block mt-0.5">ID: 655426</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-deckle text-center text-xs text-ink shadow-2xs">
            <span className="font-bold block">Researcher ID</span>
            <span className="text-[10px] font-mono text-ink-faint block mt-0.5">PUF-7257-2026</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-deckle text-center text-xs text-ink shadow-2xs">
            <span className="font-bold block">ResearchGate</span>
            <span className="text-[10px] font-mono text-ink-faint block mt-0.5">Score: 74.2</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-deckle text-center text-xs text-ink shadow-2xs">
            <span className="font-bold block">LinkedIn</span>
            <span className="text-[10px] font-mono text-ink-faint block mt-0.5">Dr. Rajnikant Dodiya</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-parchment-warm border border-deckle text-center">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-claret block">{PROFESSOR_INFO.researchProfiles.scholarCitations}</span>
            <span className="text-xs text-ink-muted font-mono mt-1 block">Google Scholar Citations</span>
          </div>

          <div className="p-5 rounded-2xl bg-parchment-warm border border-deckle text-center">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-ink block">{PROFESSOR_INFO.researchProfiles.scholarCitationsSince2021}</span>
            <span className="text-xs text-ink-muted font-mono mt-1 block">Citations Since 2021</span>
          </div>

          <div className="p-5 rounded-2xl bg-parchment-warm border border-deckle text-center">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-brass-dark block">{PROFESSOR_INFO.researchProfiles.hIndex}</span>
            <span className="text-xs text-ink-muted font-mono mt-1 block">h-index</span>
          </div>

          <div className="p-5 rounded-2xl bg-parchment-warm border border-deckle text-center">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-claret block">{PROFESSOR_INFO.researchProfiles.rgScore}</span>
            <span className="text-xs text-ink-muted font-mono mt-1 block">ResearchGate Score</span>
          </div>
        </div>
      </section>

    </div>
  );
};
