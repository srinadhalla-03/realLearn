import { PlaySquare, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';
import { ConceptItem } from '../types';
import { POPULAR_CONCEPTS } from '../data/concepts';

interface Props {
  onSelectConcept: (concept: ConceptItem) => void;
  completedIds: string[];
}

export function LessonsView({ onSelectConcept, completedIds }: Props) {
  const tracks = [
    {
      title: 'Foundational Data Structures',
      desc: 'Master fundamental memory models through physical queues and cafeteria trays.',
      conceptIds: ['queue', 'stack', 'binary_search'],
      badge: 'CS Fundamentals',
    },
    {
      title: 'Everyday Tech Unpacked',
      desc: 'Understand the invisible signals and routing systems making your phone work.',
      conceptIds: ['wifi', 'dns'],
      badge: 'Networking',
    },
    {
      title: 'Cosmic Mechanics & Physics',
      desc: 'Visualize the shape of spacetime and planetary orbits.',
      conceptIds: ['gravity'],
      badge: 'Astrophysics',
    },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Visual Learning Tracks
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Guided sequences of interactive analogies to build deep intuition.
        </p>
      </div>

      <div className="space-y-6">
        {tracks.map((track, trackIdx) => {
          const trackConcepts = POPULAR_CONCEPTS.filter((c) =>
            track.conceptIds.includes(c.id)
          );
          const completedCount = trackConcepts.filter((c) =>
            completedIds.includes(c.id)
          ).length;
          const progressPercent = Math.round((completedCount / trackConcepts.length) * 100);

          return (
            <div
              key={trackIdx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {track.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{track.desc}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                  <span>Track Progress</span>
                  <span>{completedCount}/{trackConcepts.length} Completed ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Concepts in track */}
              <div className="space-y-2 pt-1">
                {trackConcepts.map((c, i) => {
                  const isDone = completedIds.includes(c.id);
                  return (
                    <div
                      key={c.id}
                      onClick={() => onSelectConcept(c)}
                      className="p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 flex items-center justify-between transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isDone
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isDone ? '✓' : i + 1}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">
                            {c.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Analogy: {c.story.analogyObject}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">
                          {c.readTime}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
