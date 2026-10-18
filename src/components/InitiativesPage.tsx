import React from 'react';
import { Layers, Sparkles, BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface InitiativesPageProps {
  subSection?: string;
}

export const InitiativesPage: React.FC<InitiativesPageProps> = ({ subSection }) => {
  return (
    <div className="space-y-16 animate-fade-in pt-4">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Institutional Programs</span>
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mt-1">Academic Initiatives</h1>
        <p className="text-sm text-slate-600 font-light mt-1">Specialized forums, AI research centres, student clubs, and research development programs.</p>
      </div>

      {/* 5.1 ELEF – English Language Education Forum */}
      <section id="elef" className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-claret">
            <Layers className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">ELEF – English Language Education Forum</h2>
          </div>
          <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-3 py-1 rounded-full border border-claret/20 self-start sm:self-auto">Role: Convener</span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-light">
          Planning and coordination of academic, research and professional-development initiatives in English Language Education. 
          Serves as Editor for ELEF Annual Journal & ELEF Book – managing editorial planning, academic content coordination, and dissemination of scholarship in English Language Education.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
          <span className="font-semibold text-slate-900 block">ELEF Events & Webinar Series:</span>
          <p className="font-light">Upcoming ELEF Webinar Series – 2 events, dates, and posters will be announced shortly.</p>
        </div>
      </section>

      {/* 5.2 CAIELE – Centre for Artificial Intelligence in English Language Education */}
      <section id="caiele" className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-claret">
            <Sparkles className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">CAIELE – Centre for Artificial Intelligence in ELE</h2>
          </div>
          <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-3 py-1 rounded-full border border-claret/20 self-start sm:self-auto">Role: Coordinator</span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-light">
          Academic leadership for AI-enabled English Language Education, techno-pedagogy, digital learning, research and professional development.
        </p>

        {/* Related AI Publications */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-mono font-semibold uppercase text-slate-700">Related Research & Work by Dr. Dodiya:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900 block">Blended Learning in ELT</span>
              <p className="text-[11px] text-slate-500 font-light">Paper published in Zankhana E-Journal (2026)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900 block">Digitizing Wisdom & IKS</span>
              <p className="text-[11px] text-slate-500 font-light">Paper presented at International Seminar (09 Mar 2026)</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-900 block">Digital Pedagogy & Resources</span>
              <p className="text-[11px] text-slate-500 font-light">Book Chapter in SPU 21st Century Higher Education (2025)</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 font-light flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-800 shrink-0" />
          <span>CAIELE activities, detailed vision and team portal are currently under active development.</span>
        </div>
      </section>

      {/* 5.3 English Club */}
      <section id="english-club" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <h3 className="font-serif text-xl text-slate-900">English Club Initiative</h3>
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          Student language club activities, literary events, and speaking activities. Content will be added later.
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono">Coming Soon</span>
      </section>

      {/* 5.4 RDC Initiatives */}
      <section id="rdc-init" className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-claret">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">RDC – Research & Development Cell Initiatives</h2>
          </div>
          <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-3 py-1 rounded-full border border-claret/20 self-start sm:self-auto">Coordinator</span>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-light">
          Research promotion, research-policy implementation, faculty research engagement, research capacity building and development of institutional research culture at HMPIETR.
        </p>
      </section>

    </div>
  );
};
