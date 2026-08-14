import { Globe, Server, Smartphone, Cpu, Activity, ShieldCheck, Compass, Zap, Building2, ShoppingCart, Plane, ArrowRight } from 'lucide-react';
import { RealWorldExample } from '../types';

interface Props {
  examples?: RealWorldExample[];
  topicTitle: string;
}

export function TopicRealWorldExamples({ examples, topicTitle }: Props) {
  if (!examples || examples.length === 0) {
    return null;
  }

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'ShoppingCart':
      case 'Checkout':
        return <ShoppingCart className="w-4 h-4 text-emerald-600" />;
      case 'Plane':
      case 'Airport':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'Server':
      case 'Cloud':
        return <Server className="w-4 h-4 text-indigo-600" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-violet-600" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'Compass':
        return <Compass className="w-4 h-4 text-sky-600" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-rose-600" />;
      default:
        return <Globe className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">
            3
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Real-World Examples & Applications
            </h3>
            <p className="text-[11px] text-slate-500">
              Where and how {topicTitle} powers modern everyday systems
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Case Studies
        </span>
      </div>

      {/* Real-World Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {examples.map((example, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                    {renderIcon(example.icon || example.tag)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    {example.tag || `Example 0${idx + 1}`}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {example.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {example.description}
              </p>
            </div>

            {example.systemExample && (
              <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <Zap className="w-3 h-3 text-amber-500 flex-shrink-0" />
                <span className="truncate">{example.systemExample}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
