import { useState } from 'react';
import { Play, RotateCcw, Globe, Server, Laptop, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function DnsSimulation({ concept }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [domain, setDomain] = useState<string>('realLearn.io');
  const [resolvedIp, setResolvedIp] = useState<string>('');

  const steps = [
    { title: 'Browser Cache', desc: 'Browser checks local memory: "Do I already know realLearn.io?"', node: 0 },
    { title: 'ISP Resolver', desc: 'Asks Recursive Resolver: "Where is realLearn.io?"', node: 1 },
    { title: 'Root Server (.)', desc: 'Root Server replies: "I don’t know, but ask the .io TLD server."', node: 2 },
    { title: 'TLD Server (.io)', desc: 'TLD Server replies: "Ask realLearn Authoritative Name Server."', node: 3 },
    { title: 'Authoritative Server', desc: 'Auth Server returns final IP: 76.76.21.21!', node: 4 },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) setResolvedIp('76.76.21.21');
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setResolvedIp('');
  };

  return (
    <div className="space-y-6">
      {/* Real-World Story */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100/80 text-indigo-800">
            Analogy: Global Contact Book
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Story Hierarchy Path */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-inner flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto text-[11px]">
          <div className="flex flex-col items-center bg-slate-100 p-2 rounded-lg min-w-[70px]">
            <Laptop className="w-4 h-4 text-slate-600 mb-1" />
            <span className="font-bold">You</span>
            <span className="text-[9px] text-slate-400">"Alice"</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
          <div className="flex flex-col items-center bg-indigo-50 p-2 rounded-lg min-w-[70px]">
            <Server className="w-4 h-4 text-indigo-600 mb-1" />
            <span className="font-bold">Resolver</span>
            <span className="text-[9px] text-indigo-600">Local Operator</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
          <div className="flex flex-col items-center bg-slate-900 text-white p-2 rounded-lg min-w-[70px]">
            <Globe className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="font-bold">Auth Server</span>
            <span className="text-[9px] text-slate-400">10-Digit Phone #</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Simulate real-time DNS resolution hops.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-md">
            DNS Hierarchy
          </span>
        </div>

        {/* Domain Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleNext}
            disabled={currentStep === 4}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer ${
              currentStep === 4 ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            {currentStep === 4 ? 'Resolved!' : `Step ${currentStep + 1}/5`}
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs border border-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Nodes */}
        <div className="space-y-2">
          {steps.map((s, idx) => {
            const isActive = idx === currentStep;
            const isPassed = idx < currentStep;

            return (
              <motion.div
                key={s.title}
                animate={{
                  backgroundColor: isActive ? '#f5f3ff' : isPassed ? '#f8fafc' : '#ffffff',
                  borderColor: isActive ? '#818cf8' : isPassed ? '#cbd5e1' : '#e2e8f0',
                }}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  isActive ? 'ring-2 ring-indigo-200 shadow-sm' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      isPassed
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-indigo-600 text-white animate-bounce'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPassed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{s.title}</div>
                    <div className="text-[11px] text-slate-500">{s.desc}</div>
                  </div>
                </div>
                {idx === 4 && resolvedIp && (
                  <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    IP: {resolvedIp}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>
            {currentStep === 4
              ? `Connected to ${domain} via IP 76.76.21.21!`
              : `Traversing DNS path for ${domain}...`}
          </span>
        </div>
      </div>
    </div>
  );
}
