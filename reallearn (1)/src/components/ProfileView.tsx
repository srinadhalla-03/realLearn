import { User, Award, Zap, Brain, CheckCircle2, RotateCcw } from 'lucide-react';
import { UserStats } from '../types';

interface Props {
  stats: UserStats;
  onResetProgress: () => void;
}

export function ProfileView({ stats, onResetProgress }: Props) {
  const achievements = [
    { title: 'Visual Thinker', desc: 'Explored your first real-world analogy', unlocked: stats.conceptsCompleted.length > 0 },
    { title: 'Queue & Stack Ace', desc: 'Mastered FIFO and LIFO mechanics', unlocked: stats.conceptsCompleted.includes('queue') && stats.conceptsCompleted.includes('stack') },
    { title: 'Physics Intuition', desc: 'Simulated gravity curvature in space', unlocked: stats.conceptsCompleted.includes('gravity') },
    { title: 'Quiz Master', desc: 'Answered 3 intuition check questions', unlocked: stats.quizzesPassed >= 3 },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-md">
            RL
          </div>
          <div>
            <h2 className="text-xl font-bold">Visual Learner</h2>
            <p className="text-xs text-slate-400">Mastering through intuition & physical models</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="bg-slate-800/60 p-2.5 rounded-xl">
            <div className="text-lg font-extrabold text-blue-400">{stats.conceptsCompleted.length}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Mastered</div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl">
            <div className="text-lg font-extrabold text-amber-400">{stats.streakDays} Days</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Daily Streak</div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl">
            <div className="text-lg font-extrabold text-emerald-400">{stats.quizzesPassed}</div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Quizzes Won</div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Earned Mastery Badges
        </h3>

        <div className="space-y-2.5">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                ach.unlocked
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    ach.unlocked ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {ach.unlocked ? '✓' : '🔒'}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm">{ach.title}</div>
                  <div className="text-[11px] opacity-80">{ach.desc}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings / Reset */}
      <div className="pt-4 flex justify-between items-center text-xs text-slate-400 px-1">
        <span>RealLearn v1.0 • Powered by Gemini</span>
        <button
          onClick={onResetProgress}
          className="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset Demo Data
        </button>
      </div>
    </div>
  );
}
