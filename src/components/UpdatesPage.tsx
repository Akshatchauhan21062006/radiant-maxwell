import React from 'react';
import { LATEST_UPDATES } from '../data/professorData';
import { Bell, Calendar, Award, Sparkles, Clock, CheckCircle2 } from 'lucide-react';

interface UpdatesPageProps {
  subSection?: string;
}

export const UpdatesPage: React.FC<UpdatesPageProps> = ({ subSection }) => {
  const achievements = [
    'Ph.D. in Education, Sardar Patel University (result declared 25 April 2018)',
    'Qualified UGC-NET English (2020) and Education (2009); GSET English (2018) and Education (2019)',
    'Author of 6 books and editor of 4 academic books; 19 research papers published',
    'Session Chair at 9 national and international academic conferences',
    'Completed UGC-MMTTC Refresher Courses (2025, 2026) and Faculty Induction Programmes (2024, 2025)',
    'Lifetime memberships: All India Association for Educational Research (AIAER), Council for Teacher Education (CTE Gujarat Chapter), Indian Society for Training & Development (ISTD) (July 2026)'
  ];

  return (
    <div className="space-y-16 animate-fade-in pt-4">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Announcements & News</span>
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mt-1">Latest Updates</h1>
        <p className="text-sm text-slate-600 font-light mt-1">Recent academic news, upcoming events, research achievements, and institutional announcements.</p>
      </div>

      {/* 8.1 Latest News */}
      <section id="news" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center gap-2">
          <Bell className="w-5 h-5 text-claret" />
          <h2 className="font-serif text-2xl text-slate-900">Latest News & Activities</h2>
        </div>

        <div className="space-y-3">
          {LATEST_UPDATES.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-2xs">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-claret bg-claret-soft px-2 py-0.5 rounded border border-claret/20">{item.date}</span>
                <h3 className="font-serif text-base font-medium text-slate-900 mt-1">{item.title}</h3>
                {item.details && <p className="text-xs text-slate-500 font-light">{item.details}</p>}
              </div>
              <span className="text-[11px] font-mono text-slate-600 font-semibold bg-slate-100 px-2.5 py-1 rounded self-start md:self-auto">{item.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8.2 Events */}
      <section id="events" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-claret" />
          <h2 className="font-serif text-2xl text-slate-900">Academic Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">Upcoming Forum Event</span>
            <h3 className="font-serif text-lg font-medium text-slate-900">ELEF Webinar Series – 2</h3>
            <p className="text-xs text-slate-600 font-light">Organized by English Language Education Forum (ELEF). Dates, speakers, and registration links will be published shortly.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
            <span className="text-xs font-mono text-claret font-bold bg-claret-soft px-2 py-0.5 rounded border border-claret/20">Upcoming Conference</span>
            <h3 className="font-serif text-lg font-medium text-slate-900">ELTAI Annual Conference 2026</h3>
            <p className="text-xs text-slate-600 font-light">Participation details and presentation topics to be announced.</p>
          </div>
        </div>
      </section>

      {/* 8.3 Achievements */}
      <section id="achievements" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center gap-2">
          <Award className="w-5 h-5 text-claret" />
          <h2 className="font-serif text-2xl text-slate-900">Key Academic Achievements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((ach, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 text-xs text-slate-800 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-claret shrink-0 mt-0.5" />
              <span className="font-light leading-relaxed">{ach}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8.4 Announcements */}
      <section id="announcements" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <h3 className="font-serif text-xl text-slate-900">Announcements</h3>
        <p className="text-xs text-slate-500 font-light max-w-md mx-auto">
          Official institutional announcements, student notices, and call for papers.
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-mono">Coming Soon</span>
      </section>

    </div>
  );
};
