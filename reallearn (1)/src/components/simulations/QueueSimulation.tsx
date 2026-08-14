import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, User, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function QueueSimulation({ concept }: Props) {
  // Real-world Story state
  const [storyPlaying, setStoryPlaying] = useState<boolean>(false);
  const [storyStep, setStoryStep] = useState<number>(0);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Interactive Array Visualizer state
  const [queueItems, setQueueItems] = useState<string[]>(['A', 'B', 'C']);
  const [lastAction, setLastAction] = useState<string>('Initialized queue with items [A, B, C]');
  const [peeked, setPeeked] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(4);

  // Story playback loop
  useEffect(() => {
    if (storyPlaying) {
      storyTimerRef.current = setInterval(() => {
        setStoryStep((prev) => (prev + 1) % 4);
      }, 2000);
    } else {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    }
    return () => {
      if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    };
  }, [storyPlaying]);

  const handleEnqueue = () => {
    if (queueItems.length >= 7) {
      setLastAction('Queue is full! Maximum demo capacity reached (7 items).');
      return;
    }
    const nextLetter = String.fromCharCode(64 + counter);
    const newItems = [...queueItems, nextLetter];
    setQueueItems(newItems);
    setCounter((c) => c + 1);
    setLastAction(`ENQUEUE: Added item '${nextLetter}' to the REAR (index ${newItems.length - 1})`);
    setPeeked(false);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setLastAction('Queue is empty! Underflow condition - nothing to dequeue.');
      return;
    }
    const removed = queueItems[0];
    const newItems = queueItems.slice(1);
    setQueueItems(newItems);
    setLastAction(`DEQUEUE: Removed item '${removed}' from the FRONT (First-In, First-Out)`);
    setPeeked(false);
  };

  const handlePeek = () => {
    if (queueItems.length === 0) {
      setLastAction('Queue is empty. Front item is null.');
      return;
    }
    setPeeked(true);
    setLastAction(`PEEK: Looked at FRONT item '${queueItems[0]}' without removing it.`);
  };

  const handleResetQueue = () => {
    setQueueItems(['A', 'B', 'C']);
    setCounter(4);
    setLastAction('Reset queue to default [A, B, C]');
    setPeeked(false);
  };

  // Real world people list in the story card
  const peopleInStory = [
    { label: '1st', name: 'Alex', color: 'bg-blue-600 text-white' },
    { label: '2nd', name: 'Bella', color: 'bg-indigo-600 text-white' },
    { label: '3rd', name: 'Chris', color: 'bg-purple-600 text-white' },
  ];

  return (
    <div className="space-y-6">
      {/* Real-World Story Card */}
      <div className="bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/60 rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100/80 text-blue-700">
            Analogy: Ticket Counter
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Animated Visual Stage */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200/80 shadow-inner min-h-[140px] flex flex-col justify-between">
          <div className="flex items-center justify-between overflow-x-auto py-2 gap-2 sm:gap-4">
            {/* Person 1 */}
            <motion.div
              animate={{
                scale: storyStep === 1 ? 1.08 : 1,
                y: storyStep === 1 ? -4 : 0,
              }}
              className="flex flex-col items-center min-w-[60px]"
            >
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${
                storyStep === 1 ? 'bg-emerald-500 text-white ring-4 ring-emerald-100' : 'bg-blue-600 text-white'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1.5">1st</span>
              <span className="text-[10px] text-slate-400">At Front</span>
            </motion.div>

            <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />

            {/* Person 2 */}
            <motion.div
              animate={{
                scale: storyStep === 2 ? 1.08 : 1,
              }}
              className="flex flex-col items-center min-w-[60px]"
            >
              <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1.5">2nd</span>
              <span className="text-[10px] text-slate-400">Waiting</span>
            </motion.div>

            <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />

            {/* Person 3 */}
            <motion.div
              animate={{
                scale: storyStep === 3 ? 1.08 : 1,
              }}
              className="flex flex-col items-center min-w-[60px]"
            >
              <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1.5">3rd</span>
              <span className="text-[10px] text-slate-400">At Rear</span>
            </motion.div>

            <div className="h-10 w-[1px] bg-slate-200 mx-1 flex-shrink-0"></div>

            {/* Ticket Counter */}
            <div className="flex flex-col items-center min-w-[70px] bg-slate-900 text-white p-2.5 rounded-xl flex-shrink-0 shadow-sm">
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Ticket</div>
                <div className="text-[10px] text-slate-300">Counter</div>
              </div>
            </div>
          </div>

          {/* Narrative status message */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {storyStep === 0 && 'Ready: Alex is 1st in line at the ticket window.'}
              {storyStep === 1 && 'Alex gets the movie ticket and walks into the theater.'}
              {storyStep === 2 && 'Bella steps up to become the new 1st in line.'}
              {storyStep === 3 && 'A new customer joins the end of the line at the rear.'}
            </span>
            <span className="text-slate-400 font-mono">Step {storyStep + 1}/4</span>
          </div>
        </div>

        {/* Story Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            id="play-story-btn"
            onClick={() => setStoryPlaying(!storyPlaying)}
            className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            title={storyPlaying ? 'Pause Story' : 'Play Story'}
          >
            {storyPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>
          <button
            id="reset-story-btn"
            onClick={() => {
              setStoryPlaying(false);
              setStoryStep(0);
            }}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
            title="Reset Story"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Visual Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
              FIFO (First-In, First-Out)
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Simulate enqueue and dequeue operations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            id="enqueue-btn"
            onClick={handleEnqueue}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Enqueue
          </button>
          <button
            id="dequeue-btn"
            onClick={handleDequeue}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300/80 transition-all active:scale-95 cursor-pointer"
          >
            <Minus className="w-4 h-4" />
            Dequeue
          </button>
          <button
            id="peek-btn"
            onClick={handlePeek}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider border border-indigo-200 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            Peek Front
          </button>
          <button
            id="reset-queue-btn"
            onClick={handleResetQueue}
            className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Queue Array Visualization Box */}
        <div className="bg-slate-50/70 rounded-xl p-4 sm:p-6 border border-slate-200 flex flex-col items-center">
          {/* Header Badges: FRONT vs REAR */}
          <div className="w-full flex items-center justify-between mb-4 max-w-md">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded bg-slate-200 text-slate-700 flex items-center gap-1">
              <span>← FRONT (Dequeue)</span>
            </span>
            <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded bg-slate-200 text-slate-700 flex items-center gap-1">
              <span>REAR (Enqueue) →</span>
            </span>
          </div>

          {/* Elements Row */}
          <div className="relative min-h-[85px] w-full max-w-md flex items-center justify-center gap-2.5 py-3 border-b-4 border-slate-700/80">
            <AnimatePresence mode="popLayout">
              {queueItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-slate-400 text-xs italic py-4 font-mono"
                >
                  [ Queue is empty. Click + ENQUEUE to add items ]
                </motion.div>
              ) : (
                queueItems.map((item, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueItems.length - 1;
                  const isHighlightPeek = isFront && peeked;

                  return (
                    <motion.div
                      key={`${item}-${idx}`}
                      layout
                      initial={{ scale: 0.5, opacity: 0, x: 20 }}
                      animate={{ scale: 1, opacity: 1, x: 0 }}
                      exit={{ scale: 0.5, opacity: 0, x: -30 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                      className={`relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl font-bold text-lg sm:text-xl shadow-md transition-all ${
                        isHighlightPeek
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-200 scale-105'
                          : idx % 3 === 0
                          ? 'bg-slate-950 text-white'
                          : idx % 3 === 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-indigo-900 text-white'
                      }`}
                    >
                      <span>{item}</span>
                      <span className="text-[9px] font-mono opacity-60 absolute bottom-1">
                        idx {idx}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Under-the-hood queue telemetry */}
          <div className="w-full max-w-md mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-2 rounded-lg border border-slate-200/80">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Size</div>
              <div className="text-sm font-bold text-slate-900">{queueItems.length}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/80">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Front Element</div>
              <div className="text-sm font-bold text-blue-600">{queueItems[0] || 'None'}</div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200/80">
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Rear Element</div>
              <div className="text-sm font-bold text-indigo-600">
                {queueItems.length > 0 ? queueItems[queueItems.length - 1] : 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* Live Action Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="truncate">{lastAction}</span>
        </div>
      </div>
    </div>
  );
}
