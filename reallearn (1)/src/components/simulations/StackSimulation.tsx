import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Layers, Eye, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function StackSimulation({ concept }: Props) {
  const [storyPlaying, setStoryPlaying] = useState<boolean>(false);
  const [storyStep, setStoryStep] = useState<number>(0);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stack Items state (bottom to top)
  const [stackItems, setStackItems] = useState<string[]>(['Plate 1', 'Plate 2', 'Plate 3']);
  const [lastAction, setLastAction] = useState<string>('Stack initialized with 3 plates [LIFO]');
  const [peeked, setPeeked] = useState<boolean>(false);
  const [plateCount, setPlateCount] = useState<number>(4);

  // Story autoplay
  useEffect(() => {
    if (storyPlaying) {
      storyTimerRef.current = setInterval(() => {
        setStoryStep((prev) => (prev + 1) % 3);
      }, 2200);
    } else {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    }
    return () => {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    };
  }, [storyPlaying]);

  const handlePush = () => {
    if (stackItems.length >= 6) {
      setLastAction('Stack Overflow! Maximum safe tray height reached (6 plates).');
      return;
    }
    const newPlate = `Plate ${plateCount}`;
    const next = [...stackItems, newPlate];
    setStackItems(next);
    setPlateCount((c) => c + 1);
    setLastAction(`PUSH: Added '${newPlate}' to the TOP of the stack.`);
    setPeeked(false);
  };

  const handlePop = () => {
    if (stackItems.length === 0) {
      setLastAction('Stack Underflow! No plates left to remove.');
      return;
    }
    const removed = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setLastAction(`POP: Removed '${removed}' from the TOP (Last-In, First-Out).`);
    setPeeked(false);
  };

  const handlePeek = () => {
    if (stackItems.length === 0) {
      setLastAction('Stack is empty. Top is null.');
      return;
    }
    setPeeked(true);
    setLastAction(`PEEK: Inspected top item '${stackItems[stackItems.length - 1]}'.`);
  };

  const handleReset = () => {
    setStackItems(['Plate 1', 'Plate 2', 'Plate 3']);
    setPlateCount(4);
    setLastAction('Reset stack to default [Plate 1, 2, 3]');
    setPeeked(false);
  };

  return (
    <div className="space-y-6">
      {/* Real-World Story Card */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 rounded-2xl p-5 sm:p-6 border border-amber-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100/80 text-amber-800">
            Analogy: Cafeteria Plate Dispenser
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Story Animation Box */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-inner flex flex-col items-center justify-center min-h-[160px]">
          <div className="relative w-48 flex flex-col items-center justify-end h-32 border-b-4 border-slate-800 pb-1">
            {/* Spring Base Visual */}
            <div className="w-40 h-2 bg-slate-400 rounded-sm mb-1"></div>

            {/* Plates stacked */}
            <div className="flex flex-col-reverse items-center gap-1.5 w-full">
              <motion.div
                animate={{ scale: storyStep === 0 ? 1.05 : 1 }}
                className="w-36 h-6 rounded-lg bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm"
              >
                Plate 1 (Bottom)
              </motion.div>
              <motion.div
                animate={{ scale: storyStep === 1 ? 1.05 : 1 }}
                className="w-36 h-6 rounded-lg bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm"
              >
                Plate 2 (Middle)
              </motion.div>
              {storyStep !== 2 && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, scale: storyStep === 0 ? 1.08 : 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="w-36 h-6 rounded-lg bg-orange-600 text-white text-[11px] font-bold flex items-center justify-center shadow-md ring-2 ring-orange-200"
                >
                  Plate 3 (Top - Freshly Placed)
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {storyStep === 0 && 'Dishwasher pushes Plate 3 onto the top.'}
              {storyStep === 1 && 'Diner arrives: Only the top plate (Plate 3) is accessible.'}
              {storyStep === 2 && 'Diner takes Plate 3 off. Plate 2 is now exposed as top.'}
            </span>
            <span className="text-slate-400 font-mono">Step {storyStep + 1}/3</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            id="play-stack-story"
            onClick={() => setStoryPlaying(!storyPlaying)}
            className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
          >
            {storyPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>
          <button
            id="reset-stack-story"
            onClick={() => {
              setStoryPlaying(false);
              setStoryStep(0);
            }}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Simulate push and pop operations on a stack.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
            LIFO (Last-In, First-Out)
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            id="push-btn"
            onClick={handlePush}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Push Item
          </button>
          <button
            id="pop-btn"
            onClick={handlePop}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all active:scale-95 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
            Pop Item
          </button>
          <button
            id="peek-stack-btn"
            onClick={handlePeek}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider border border-amber-200 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Peek Top
          </button>
          <button
            id="reset-stack-state-btn"
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Stack Container View */}
        <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200 flex flex-col items-center">
          <div className="w-full max-w-xs flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span className="text-amber-700 font-mono">▲ TOP (Push/Pop Target)</span>
            <span className="text-slate-400 font-mono">Max: 6</span>
          </div>

          <div className="relative w-full max-w-xs h-64 border-x-4 border-b-4 border-slate-800 rounded-b-xl bg-white flex flex-col-reverse items-center justify-start p-3 gap-2 shadow-inner overflow-hidden">
            <AnimatePresence mode="popLayout">
              {stackItems.length === 0 ? (
                <div className="text-slate-400 text-xs italic self-center my-auto font-mono">
                  [ Stack is empty. Push a plate! ]
                </div>
              ) : (
                stackItems.map((item, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  const isPeeked = isTop && peeked;

                  return (
                    <motion.div
                      key={`${item}-${idx}`}
                      layout
                      initial={{ y: -60, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -60, opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', damping: 22, stiffness: 350 }}
                      className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-between shadow-sm transition-all ${
                        isPeeked
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200'
                          : isTop
                          ? 'bg-slate-900 text-white ring-2 ring-slate-400'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 opacity-70" />
                        <span>{item}</span>
                      </div>
                      <span className="text-[10px] font-mono opacity-70">
                        {isTop ? 'TOP' : `idx ${idx}`}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          <div className="w-full max-w-xs mt-3 flex justify-between text-[11px] text-slate-500 font-mono">
            <span>▼ BASE (Bottom)</span>
            <span>Capacity: {stackItems.length} / 6</span>
          </div>
        </div>

        {/* Action Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="truncate">{lastAction}</span>
        </div>
      </div>
    </div>
  );
}
