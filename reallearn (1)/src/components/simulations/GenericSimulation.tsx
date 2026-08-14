import { useState } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function GenericSimulation({ concept }: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [elements, setElements] = useState<string[]>(concept.interactiveVisual.initialElements || ['Node 1', 'Node 2', 'Node 3']);
  const [log, setLog] = useState<string>('Simulation ready. Tap the actions below to trigger interactive state changes.');

  const steps = concept.story.steps || [
    { step: 1, title: 'Starting Condition', detail: 'Initial state before interaction starts.' },
    { step: 2, title: 'Core Process Mechanism', detail: 'The main transformation or flow happening.' },
    { step: 3, title: 'Final Result / Output', detail: 'Outcome achieved according to the real-world principle.' },
  ];

  const handlePrimary = () => {
    const nextItem = `Item ${elements.length + 1}`;
    setElements([...elements, nextItem]);
    setLog(`Action triggered: Added ${nextItem} to active state.`);
  };

  const handleSecondary = () => {
    if (elements.length > 0) {
      const removed = elements[elements.length - 1];
      setElements(elements.slice(0, -1));
      setLog(`Action triggered: Processed and removed ${removed}.`);
    } else {
      setLog('No items remaining in active state.');
    }
  };

  const handleReset = () => {
    setElements(concept.interactiveVisual.initialElements || ['Node 1', 'Node 2', 'Node 3']);
    setActiveStep(0);
    setLog('Reset simulation state.');
  };

  return (
    <div className="space-y-6">
      {/* Real-World Story */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/70 rounded-2xl p-5 sm:p-6 border border-indigo-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            AI Visual Analogy
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Step Walkthrough */}
        <div className="space-y-2">
          {steps.map((st, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                activeStep === idx
                  ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  activeStep === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {idx + 1}
                </span>
                {st.title}
              </div>
              <p className="text-slate-600 text-[11px] pl-7">{st.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              {concept.interactiveVisual.title || 'Interactive Visual'}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              {concept.interactiveVisual.subtitle || 'Simulate core operations in real-time.'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
            Interactive Model
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <button
            onClick={handlePrimary}
            className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            {concept.interactiveVisual.primaryAction || '+ Add / Trigger'}
          </button>
          <button
            onClick={handleSecondary}
            className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all active:scale-95 cursor-pointer"
          >
            {concept.interactiveVisual.secondaryAction || '- Process / Remove'}
          </button>
          <button
            onClick={handleReset}
            className="py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
            Reset State
          </button>
        </div>

        {/* Dynamic Visual Stage */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-md text-xs font-bold text-slate-500 mb-3">
            <span>{concept.interactiveVisual.primaryLabel || 'Input / Source'}</span>
            <span>{concept.interactiveVisual.secondaryLabel || 'Output / Destination'}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 py-4 w-full max-w-md min-h-[90px] border-y border-slate-200 bg-white rounded-lg px-3">
            <AnimatePresence mode="popLayout">
              {elements.length === 0 ? (
                <div className="text-slate-400 text-xs italic font-mono">[ Empty State ]</div>
              ) : (
                elements.map((el, i) => (
                  <motion.div
                    key={`${el}-${i}`}
                    layout
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <span>{el}</span>
                    <span className="text-[9px] text-slate-400">#{i + 1}</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="truncate">{log}</span>
        </div>
      </div>
    </div>
  );
}
