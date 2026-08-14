import { useState } from 'react';
import { Play, RotateCcw, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function BinarySearchSimulation({ concept }: Props) {
  const array = [3, 8, 14, 27, 35, 42, 59, 71, 88, 99];
  const [target, setTarget] = useState<number>(42);
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(array.length - 1);
  const [mid, setMid] = useState<number>(Math.floor((0 + array.length - 1) / 2));
  const [found, setFound] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(1);
  const [log, setLog] = useState<string>('Target: 42. Check Midpoint at index 4 (Value: 35).');

  const handleStep = () => {
    if (found || low > high) return;

    const currentMid = Math.floor((low + high) / 2);
    const midVal = array[currentMid];

    if (midVal === target) {
      setFound(true);
      setLog(`FOUND! Element ${target} found at index ${currentMid} in only ${stepCount} steps!`);
      return;
    }

    if (midVal < target) {
      const nextLow = currentMid + 1;
      const nextMid = Math.floor((nextLow + high) / 2);
      setLow(nextLow);
      setMid(nextMid);
      setStepCount((s) => s + 1);
      setLog(`${midVal} < ${target} → Discarded left half (indices 0..${currentMid}). Next Mid: ${array[nextMid]} (idx ${nextMid})`);
    } else {
      const nextHigh = currentMid - 1;
      const nextMid = Math.floor((low + nextHigh) / 2);
      setHigh(nextHigh);
      setMid(nextMid);
      setStepCount((s) => s + 1);
      setLog(`${midVal} > ${target} → Discarded right half (indices ${currentMid}..${high}). Next Mid: ${array[nextMid]} (idx ${nextMid})`);
    }
  };

  const handleReset = (newTarget?: number) => {
    const t = newTarget !== undefined ? newTarget : target;
    setTarget(t);
    setLow(0);
    setHigh(array.length - 1);
    const initialMid = Math.floor((0 + array.length - 1) / 2);
    setMid(initialMid);
    setFound(false);
    setStepCount(1);
    setLog(`Target: ${t}. Array initialized. Midpoint is index ${initialMid} (Value: ${array[initialMid]}).`);
  };

  return (
    <div className="space-y-6">
      {/* Real-World Story */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/60 rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800">
            Analogy: Thick Phonebook Flipping
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-inner flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex flex-col items-center bg-slate-100 p-2.5 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-700">1. Open Middle</span>
            <span className="text-[10px] text-slate-400">Page 500</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
          <div className="flex flex-col items-center bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
            <span className="font-bold text-emerald-800">2. Discard Half</span>
            <span className="text-[10px] text-emerald-600">Cut 500 pages</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
          <div className="flex flex-col items-center bg-slate-900 text-white p-2.5 rounded-lg">
            <span className="font-bold">3. Target Found</span>
            <span className="text-[10px] text-emerald-400">O(log N) Time</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Select a target and step through halving the search space.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
            O(log N) Efficiency
          </span>
        </div>

        {/* Target Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 flex-shrink-0">Pick Target:</span>
          {[8, 27, 42, 71, 99].map((val) => (
            <button
              key={val}
              onClick={() => handleReset(val)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                target === val
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {val}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStep}
            disabled={found}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer ${
              found
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
            }`}
          >
            <Play className="w-4 h-4" />
            {found ? 'Found Target!' : `Step ${stepCount}: Halve Search Space`}
          </button>
          <button
            onClick={() => handleReset()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Sorted Array Row */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 w-full">
            {array.map((val, idx) => {
              const isEliminated = idx < low || idx > high;
              const isMid = idx === mid && !isEliminated;
              const isTargetMatch = found && val === target;

              return (
                <motion.div
                  key={val}
                  layout
                  className={`flex flex-col items-center justify-center p-2 rounded-lg font-bold text-sm transition-all relative ${
                    isTargetMatch
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 scale-105 shadow-md'
                      : isMid
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 scale-105'
                      : isEliminated
                      ? 'bg-slate-200/60 text-slate-400 opacity-40 line-through'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  <span>{val}</span>
                  <span className="text-[9px] font-mono opacity-60">i={idx}</span>
                  {idx === low && !isEliminated && (
                    <span className="absolute -bottom-4 text-[8px] font-bold text-blue-600 uppercase">
                      Low
                    </span>
                  )}
                  {idx === high && !isEliminated && (
                    <span className="absolute -bottom-4 text-[8px] font-bold text-red-600 uppercase">
                      High
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mt-7">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-amber-400"></span> Midpoint
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-emerald-500"></span> Found Match
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-300"></span> Eliminated
            </span>
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
