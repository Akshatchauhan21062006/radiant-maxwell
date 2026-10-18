import React, { useState } from 'react';
import { INVITED_TALKS, CONFERENCE_PAPERS, SESSION_CHAIRS, FDP_TRAININGS, Engagement } from '../data/professorData';
import { Filter, Calendar, Award, Mic, Users, BookOpen } from 'lucide-react';

interface EngagementsPageProps {
  subSection?: string;
}

export const EngagementsPage: React.FC<EngagementsPageProps> = ({ subSection }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const filterEngagements = (list: Engagement[]) => {
    return list.filter(item => {
      const matchesLevel = selectedLevel === 'All' || item.level === selectedLevel;
      const matchesYear = selectedYear === 'All' || item.year.toString() === selectedYear;
      return matchesLevel && matchesYear;
    });
  };

  const filteredTalks = filterEngagements(INVITED_TALKS);
  const filteredConferences = filterEngagements(CONFERENCE_PAPERS);
  const filteredChairs = filterEngagements(SESSION_CHAIRS);
  const filteredFdp = filterEngagements(FDP_TRAININGS);

  return (
    <div className="space-y-16 animate-fade-in pt-4">
      
      {/* Title Header */}
      <div className="pb-4 border-b border-slate-200">
        <span className="text-xs font-mono uppercase tracking-widest text-claret font-semibold">Academic Outreach</span>
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mt-1">Academic Engagements</h1>
        <p className="text-sm text-slate-600 font-light mt-1">Invited lectures, conference paper presentations, session chair roles, and faculty development training.</p>
      </div>

      {/* Interactive Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-semibold uppercase">
          <Filter className="w-4 h-4 text-claret shrink-0" />
          <span>Filter Academic Engagements by Level & Year</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Level Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">Level:</span>
            {['All', 'State', 'National', 'International'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedLevel === lvl
                    ? 'bg-claret text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-slate-500 font-medium">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-claret font-mono"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 6.1 Invited Talks & Lectures */}
      <section id="talks" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-claret shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Invited Talks & Lectures ({filteredTalks.length})</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs text-slate-700 min-w-[540px]">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4 w-28">Date</th>
                <th className="py-3 px-4">Topic / Role</th>
                <th className="py-3 px-4">Programme / Institution</th>
                <th className="py-3 px-4 w-28">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTalks.map((talk) => (
                <tr key={talk.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-semibold text-claret whitespace-nowrap">{talk.date}</td>
                  <td className="py-3 px-4 font-serif text-sm font-medium text-slate-900">{talk.topic}</td>
                  <td className="py-3 px-4 text-slate-600">{talk.event}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                      talk.level === 'International' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                      talk.level === 'National' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {talk.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6.2 Conferences & Seminars – Papers Presented */}
      <section id="conferences" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-claret shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Conferences & Seminars ({filteredConferences.length})</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs text-slate-700 min-w-[540px]">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4 w-28">Date</th>
                <th className="py-3 px-4">Paper Title</th>
                <th className="py-3 px-4">Conference / Organiser</th>
                <th className="py-3 px-4 w-28">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredConferences.map((paper) => (
                <tr key={paper.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-semibold text-claret whitespace-nowrap">{paper.date}</td>
                  <td className="py-3 px-4 font-serif text-sm font-medium text-slate-900">{paper.topic}</td>
                  <td className="py-3 px-4 text-slate-600">{paper.event}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                      paper.level === 'International' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                      paper.level === 'National' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {paper.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6.3 Session Chair */}
      <section id="session-chair" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-claret shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Session Chair Roles ({filteredChairs.length})</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs text-slate-700 min-w-[500px]">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4 w-28">Date</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4 w-28">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredChairs.map((sc) => (
                <tr key={sc.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-semibold text-claret whitespace-nowrap">{sc.date}</td>
                  <td className="py-3 px-4 font-serif text-sm font-medium text-slate-900">{sc.topic} – {sc.event}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
                      sc.level === 'International' ? 'bg-purple-50 text-purple-900 border-purple-200' :
                      sc.level === 'National' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                      'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {sc.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6.4 Faculty Development & Training */}
      <section id="fdp" className="space-y-4">
        <div className="pb-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-claret shrink-0" />
            <h2 className="font-serif text-xl sm:text-2xl text-slate-900">Faculty Development ({filteredFdp.length})</h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-mono text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4 w-28">Date</th>
                <th className="py-3 px-4">Programme Title</th>
                <th className="py-3 px-4">Organiser</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 w-20">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFdp.map((fdp) => (
                <tr key={fdp.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-semibold text-claret whitespace-nowrap">{fdp.date}</td>
                  <td className="py-3 px-4 font-serif text-sm font-medium text-slate-900">{fdp.topic}</td>
                  <td className="py-3 px-4 text-slate-600">{fdp.event}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{fdp.duration}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                      {fdp.typeLabel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
