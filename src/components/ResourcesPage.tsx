import React from 'react';
import { BookOpen, Clock, FileText, Sparkles, ShieldCheck } from 'lucide-react';

interface ResourcesPageProps {
  subSection?: string;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ subSection }) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pt-2 sm:pt-4">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Academic Materials</span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-900 mt-1">Academic & Teaching Resources</h1>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-1">Curriculum resources, teaching materials, research guidance, and educational materials.</p>
      </div>

      {/* 7.1 Academic Resources */}
      <section id="acad-res" className="space-y-4">
        <h2 className="font-serif text-xl sm:text-2xl text-slate-900 pb-2 border-b border-slate-200">Academic Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">Book Resource</span>
            <h3 className="font-serif text-sm font-medium text-slate-900">UGC NET English Literature (Edited Book)</h3>
            <p className="text-slate-600 font-light">Madhuvan Store, 2024 • ISBN 978-93-90256-27-3</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">Guidance Sessions</span>
            <h3 className="font-serif text-sm font-medium text-slate-900">UGC-NET Paper I: Teaching Aptitude</h3>
            <p className="text-slate-600 font-light">Delivered at M.K. Bhavnagar University (Sept 2020)</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">NET Coaching</span>
            <h3 className="font-serif text-sm font-medium text-slate-900">Higher Education System Lecture</h3>
            <p className="text-slate-600 font-light">Sardar Patel University Coaching Programme (May 2024)</p>
          </div>
        </div>
      </section>

      {/* 7.2 Teaching Resources */}
      <section id="teach-res" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <h3 className="font-serif text-lg sm:text-xl text-slate-900">Teaching Resources</h3>
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          Sample lesson plans, teaching aids, and English language pedagogy guides.
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono">Coming Soon</span>
      </section>

      {/* 7.3 Research Resources */}
      <section id="res-res" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <h3 className="font-serif text-lg sm:text-xl text-slate-900">Research Resources</h3>
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          Research methodology guides, data analysis tools, and academic writing templates.
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono">Coming Soon</span>
      </section>

      {/* 7.4 AI & English Language Education */}
      <section id="ai-ele" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <h3 className="font-serif text-lg sm:text-xl text-slate-900">AI & English Language Education</h3>
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          AI-integrated techno-pedagogy guides, prompt engineering for language learning, and CAIELE resource kits.
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono">Coming Soon</span>
      </section>

    </div>
  );
};
