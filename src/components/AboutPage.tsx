import React from 'react';
import { PROFESSOR_INFO, QUALIFICATIONS, ELIGIBILITIES, EXPERIENCES, EXPERTISE_AREAS, MEMBERSHIPS } from '../data/professorData';
import { GraduationCap, Award, Briefcase, BookOpen, Heart, Users, CheckCircle, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  subSection?: string;
}

export const AboutPage: React.FC<AboutPageProps> = ({ subSection }) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fade-in pt-2 sm:pt-4">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-deckle">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Faculty Biography</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">About Dr. Rajnikant S. Dodiya</h1>
        <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1">Assistant Professor – English Language Pedagogy & Education, HMPIETR</p>
      </div>

      {/* 2.1 Profile */}
      <section id="profile" className="folio-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-deckle shadow-book space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-claret">
          <GraduationCap className="w-5 h-5 shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Academic Profile</h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted font-reading leading-relaxed font-light">
          {PROFESSOR_INFO.fullProfile}
        </p>
      </section>

      {/* 2.2 Qualifications & Eligibility */}
      <section id="qualifications" className="space-y-6 sm:space-y-8">
        <div className="pb-2 border-b border-deckle flex items-center gap-2">
          <Award className="w-5 h-5 text-claret shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Qualifications & Eligibility</h2>
        </div>

        {/* Academic Qualifications Table Container */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-mono font-semibold uppercase text-ink-muted">Academic Degrees</h3>
          <div className="overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
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

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF5EB] border border-brass/30 text-xs text-ink-muted space-y-1 font-reading font-light leading-relaxed">
            <span className="font-semibold text-brass-dark block">Doctoral Research Details:</span>
            <p>P.G. Department of Education, Sardar Patel University; Registration No. {PROFESSOR_INFO.phdDetails.regNo}.</p>
            <p>Research Guide: {PROFESSOR_INFO.phdDetails.guide}. Result declared: {PROFESSOR_INFO.phdDetails.resultDeclared}.</p>
          </div>
        </div>

        {/* Eligibility Table Container */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-mono font-semibold uppercase text-ink-muted">National & State Eligibility Examinations</h3>
          <div className="overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
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
        </div>
      </section>

      {/* 2.3 Professional Experience */}
      <section id="experience" className="space-y-4">
        <div className="pb-2 border-b border-deckle flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-claret shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Professional Experience</h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-deckle bg-white shadow-book">
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

      {/* 2.4 Areas of Expertise */}
      <section id="expertise" className="space-y-4">
        <div className="pb-2 border-b border-deckle flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-claret shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Areas of Expertise</h2>
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

      {/* 2.5 Vision & Academic Philosophy */}
      <section id="philosophy" className="folio-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#FAF5EB] border border-brass/30 space-y-3">
        <div className="flex items-center gap-2 text-brass-dark">
          <Heart className="w-5 h-5 text-brass-dark shrink-0" />
          <h2 className="font-serif text-xl sm:text-2xl text-ink font-normal">Vision & Academic Philosophy</h2>
        </div>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-reading font-light italic">
          "{PROFESSOR_INFO.academicPhilosophy}"
        </p>
      </section>

      {/* 2.6 Memberships */}
      <section id="memberships" className="space-y-4">
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

    </div>
  );
};
