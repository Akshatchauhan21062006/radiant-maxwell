import React from 'react';
import { ShieldCheck, Award, Briefcase, BookOpen, Layers, CheckCircle2, Archive, ArrowRight } from 'lucide-react';

interface LeadershipPageProps {
  onOpenCompendium?: () => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onOpenCompendium }) => {
  const leadershipRoles = [
    {
      id: 'iqac',
      title: 'IQAC & NAAC Accreditation',
      roles: [
        { title: 'Coordinator, Internal Quality Assurance Cell (IQAC)', period: 'June 2021 – Present', desc: 'Leading institutional quality assurance, academic planning and monitoring, AQAR and accreditation documentation, and institutional self-evaluation.' },
        { title: 'NAAC Coordinator / Accreditation Lead', period: 'Current', desc: 'Directing accreditation documentation, institutional metrics, evidence management, and reaccreditation preparedness.' },
        { title: 'Editor, IQAC Newsletter', period: 'Current', desc: 'Disseminating institutional quality initiatives, scholarly news, and academic benchmarks.' }
      ]
    },
    {
      id: 'initiatives',
      title: 'Key Academic Initiatives (ELEF & CAIELE)',
      roles: [
        { title: 'Convener, English Language Education Forum (ELEF)', period: 'Current', desc: 'Curating national webinars, editorial oversight for ELEF Journal and Book publications, and fostering an academic community of language educators.' },
        { title: 'Coordinator, Centre for AI in ELE (CAIELE)', period: 'Current', desc: 'Directing techno-pedagogical research, evaluating artificial intelligence tools for language acquisition, and guiding NEP 2020 digital compliance.' }
      ]
    },
    {
      id: 'rdc-lead',
      title: 'Research & Development Cell (RDC)',
      roles: [
        { title: 'Coordinator, Research & Development Cell', period: 'Current', desc: 'Fostering institutional research culture, faculty publishing mentorship, ethics compliance, and research-policy execution at HMPIETR.' }
      ]
    },
    {
      id: 'placement',
      title: 'Placement & Career Mentorship',
      roles: [
        { title: 'Placement Officer & Career Counselling Coordinator', period: '2021 – Present', desc: 'Guiding teacher-trainees towards career pathways, competitive examination strategies, and school/college placement partnerships.' }
      ],
      deliveredSessions: [
        { title: 'English Beyond Graduation: Career Pathways for English Students', venue: 'Anand Arts College (22 Aug 2026)' },
        { title: 'Effective Resume Writing', venue: 'G.J. Patel Institute of Ayurvedic Studies and Research (05 May 2026)' },
        { title: 'Resume Writing Workshop', venue: 'P.G. Dept. of Education, Sardar Patel University (05 Feb 2026)' },
        { title: 'Career Counselling', venue: 'Anand College of Education (28 Jan 2026)' },
        { title: 'Preparation for Competitive Exams', venue: 'Waymade College of Education (22 Jan 2026)' }
      ]
    },
    {
      id: 'gsirf',
      title: 'Ranking Framework & Regulatory Compliance',
      roles: [
        { title: 'GSIRF Nodal Officer', period: '2021 – Present', desc: 'Gujarat State Institutional Ranking Framework submissions and institutional data stewardship.' },
        { title: 'NCTE PAR Coordinator', period: '2021 – Present', desc: 'National Council for Teacher Education regulatory compliance and annual performance appraisal reporting.' }
      ]
    },
    {
      id: 'curriculum',
      title: 'Curriculum & Editorial Stewardship',
      roles: [
        { title: 'B.Ed. (English) Syllabus & Curriculum Construction', period: 'Academic Contribution', desc: 'Design of English pedagogical frameworks, learning outcomes, and assessment rubrics for teacher education.' },
        { title: 'Editor of Four Academic Volumes', period: '2020 – 2025', desc: 'Editing scholarly anthologies across Post-Method Pedagogy, ELT, and Knowledge Systems.' }
      ]
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in pt-2">
      
      {/* Title Header */}
      <div className="pb-6 border-b border-deckle">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Institutional Stewardship</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink font-normal tracking-tight mt-1">
          Academic Leadership
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted font-reading font-light mt-1.5 max-w-2xl leading-relaxed">
          IQAC & NAAC coordination, ELEF & CAIELE initiatives, RDC research culture, and university curriculum governance.
        </p>
      </div>

      {/* Anchor Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        {leadershipRoles.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            className="px-3.5 py-1.5 rounded-xl bg-parchment-warm border border-deckle text-ink-muted hover:text-ink hover:border-claret font-sans whitespace-nowrap transition-all shadow-2xs"
          >
            {sec.title}
          </a>
        ))}
      </div>

      {/* Leadership Sections Grid */}
      <div className="space-y-10">
        {leadershipRoles.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4">
            <div className="pb-2.5 border-b border-deckle flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-claret shrink-0" />
              <h2 className="font-serif text-2xl text-ink font-normal">{section.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.roles.map((r, idx) => (
                <div key={idx} className="folio-card rounded-2xl p-5 sm:p-6 bg-white border border-deckle space-y-2.5 shadow-book">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-claret font-bold bg-claret-soft px-2.5 py-0.5 rounded border border-claret/20 uppercase tracking-wide">
                      {r.period}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-normal text-ink">{r.title}</h3>
                  <p className="text-xs text-ink-muted font-reading font-light leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Delivered Sessions */}
            {section.deliveredSessions && (
              <div className="p-5 rounded-2xl bg-[#FAF5EB] border border-brass/30 space-y-3 mt-4">
                <h4 className="text-xs font-mono uppercase font-semibold text-brass-dark flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brass" />
                  <span>Selected Career & Guidance Sessions Delivered</span>
                </h4>
                <div className="space-y-2 text-xs">
                  {section.deliveredSessions.map((s, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-ink-muted">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brass-dark shrink-0" />
                        <span className="font-medium text-ink">{s.title}</span>
                      </div>
                      <span className="text-ink-faint pl-5 sm:pl-0 font-reading italic">• {s.venue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Compendium Link Box */}
      {onOpenCompendium && (
        <section className="p-6 rounded-2xl bg-parchment-warm border border-deckle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg text-ink font-normal">Need complete records of all 22 lectures & 9 session chairs?</h4>
            <p className="text-xs text-ink-muted font-reading font-light mt-0.5">Every institutional date and venue is preserved in the official archive.</p>
          </div>
          <button
            onClick={onOpenCompendium}
            className="px-5 py-2.5 rounded-xl bg-claret text-white text-xs font-medium hover:bg-claret-light transition-all flex items-center gap-1.5 shrink-0 min-h-[44px]"
          >
            <Archive className="w-4 h-4" />
            <span>Open Complete Compendium</span>
          </button>
        </section>
      )}

    </div>
  );
};
