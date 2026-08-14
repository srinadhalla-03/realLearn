import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Sparkles,
  ArrowRight,
  Plus,
  Minus,
  Radio,
  Layers,
  Compass,
  Scissors,
  Globe,
  Zap,
  CheckCircle,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptItem } from '../types';

interface Props {
  concept: ConceptItem;
}

export function TopicInteractiveAnimation({ concept }: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // Simulation specific state
  const [queueItems, setQueueItems] = useState<string[]>(['Customer #101', 'Customer #102', 'Customer #103']);
  const [stackItems, setStackItems] = useState<string[]>(['Plate A', 'Plate B', 'Plate C']);
  const [wifiFreq, setWifiFreq] = useState<'2.4GHz' | '5GHz'>('2.4GHz');
  const [wifiPackets, setWifiPackets] = useState<number[]>([1, 2, 3]);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [gravityMass, setGravityMass] = useState<number>(1);
  const [bsArray, setBsArray] = useState<number[]>([4, 12, 19, 27, 35, 48, 56, 63, 72, 89, 94]);
  const [bsTarget, setBsTarget] = useState<number>(48);
  const [bsLow, setBsLow] = useState<number>(0);
  const [bsHigh, setBsHigh] = useState<number>(10);
  const [bsMid, setBsMid] = useState<number>(5);
  const [bsFound, setBsFound] = useState<boolean>(false);
  const [dnsPhase, setDnsPhase] = useState<number>(0);

  // Auto-play animation timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = Math.max(1200 / speed, 300);
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 8);

      // Trigger automatic concept-specific cycle animations
      if (concept.interactiveVisual.type === 'queue') {
        setQueueItems((prev) => {
          if (prev.length >= 5) {
            return prev.slice(1);
          } else {
            const nextNum = 100 + Math.floor(Math.random() * 900);
            return [...prev, `Client #${nextNum}`];
          }
        });
      } else if (concept.interactiveVisual.type === 'stack') {
        setStackItems((prev) => {
          if (prev.length >= 4) {
            return prev.slice(0, -1);
          } else {
            const tags = ['Item α', 'Item β', 'Item γ', 'Item δ', 'Item ε'];
            const nextTag = tags[Math.floor(Math.random() * tags.length)];
            return [...prev, nextTag];
          }
        });
      } else if (concept.interactiveVisual.type === 'gravity') {
        setOrbitAngle((prev) => (prev + 15 * speed) % 360);
      } else if (concept.interactiveVisual.type === 'wifi') {
        setWifiPackets((prev) => [(prev[0] % 5) + 1, ((prev[0] + 1) % 5) + 1, ((prev[0] + 2) % 5) + 1]);
      } else if (concept.interactiveVisual.type === 'dns') {
        setDnsPhase((prev) => (prev + 1) % 4);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speed, concept.interactiveVisual.type]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleSpeed = () => setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));

  // Reset function
  const handleReset = () => {
    setAnimationStep(0);
    setQueueItems(['Customer #101', 'Customer #102', 'Customer #103']);
    setStackItems(['Plate A', 'Plate B', 'Plate C']);
    setOrbitAngle(0);
    setBsLow(0);
    setBsHigh(10);
    setBsMid(5);
    setBsFound(false);
    setDnsPhase(0);
    setMessage('Animation reset to starting state.');
  };

  // Queue Manual Controls
  const handleEnqueue = () => {
    const nextNum = 100 + Math.floor(Math.random() * 900);
    setQueueItems((prev) => [...prev, `Client #${nextNum}`]);
    setMessage(`Added Client #${nextNum} to the Rear.`);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) return;
    const removed = queueItems[0];
    setQueueItems((prev) => prev.slice(1));
    setMessage(`Served ${removed} from Front.`);
  };

  // Stack Manual Controls
  const handlePush = () => {
    const letters = ['Data X', 'Data Y', 'Data Z', 'Block 4', 'Block 5'];
    const next = letters[Math.floor(Math.random() * letters.length)];
    setStackItems((prev) => [...prev, next]);
    setMessage(`Pushed ${next} onto Top.`);
  };

  const handlePop = () => {
    if (stackItems.length === 0) return;
    const popped = stackItems[stackItems.length - 1];
    setStackItems((prev) => prev.slice(0, -1));
    setMessage(`Popped ${popped} from Top.`);
  };

  // Binary search step
  const handleBsStep = () => {
    if (bsLow > bsHigh || bsFound) {
      setBsLow(0);
      setBsHigh(10);
      setBsMid(5);
      setBsFound(false);
      setMessage('Reset search window [0..10].');
      return;
    }

    const mid = Math.floor((bsLow + bsHigh) / 2);
    setBsMid(mid);

    if (bsArray[mid] === bsTarget) {
      setBsFound(true);
      setMessage(`🎯 Found target ${bsTarget} at Index ${mid}!`);
    } else if (bsArray[mid] < bsTarget) {
      setBsLow(mid + 1);
      setMessage(`${bsArray[mid]} < ${bsTarget}: Discarding left half. Moving Low pointer to ${mid + 1}.`);
    } else {
      setBsHigh(mid - 1);
      setMessage(`${bsArray[mid]} > ${bsTarget}: Discarding right half. Moving High pointer to ${mid - 1}.`);
    }
  };

  return (
    <section className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5 overflow-hidden">
      {/* Animation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center">
            4
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              Interactive Topic Animation
              <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 uppercase">
                {isPlaying ? 'ACTIVE LOOP' : 'PAUSED'}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Live visual simulation demonstrating the mechanics of {concept.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
          </button>
          <button
            onClick={toggleSpeed}
            className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-800 transition-colors cursor-pointer"
            title="Toggle Speed"
          >
            {speed}x
          </button>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center border border-slate-800 transition-colors cursor-pointer"
            title="Reset Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Animated Viewport Canvas */}
      <div className="relative min-h-[260px] sm:min-h-[290px] w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* -------------------- QUEUE ANIMATION -------------------- */}
        {concept.interactiveVisual.type === 'queue' && (
          <div className="my-auto space-y-6 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> FRONT (Dequeue / Service Counter)
              </span>
              <span className="text-blue-400 font-bold">
                REAR (Enqueue / Entrance) ➔
              </span>
            </div>

            {/* Conveyor Track */}
            <div className="relative h-20 bg-slate-900/90 rounded-2xl border border-slate-800 p-2 flex items-center justify-start gap-2 overflow-x-auto">
              <AnimatePresence>
                {queueItems.map((item, idx) => (
                  <motion.div
                    key={item}
                    layout
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    transition={{ duration: 0.35 }}
                    className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-0.5 shadow-md ${
                      idx === 0
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40'
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="text-[9px] font-mono uppercase text-slate-400">
                      {idx === 0 ? 'Next Up #1' : `Pos #${idx + 1}`}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {queueItems.length === 0 && (
                <div className="text-slate-500 text-xs italic mx-auto">
                  Queue is empty. Click Enqueue below or let auto-run add clients.
                </div>
              )}
            </div>

            {/* Real-Time Rule Legend */}
            <div className="text-center text-xs font-mono text-slate-400">
              FIFO Invariant: Oldest arrival at the left is always served first.
            </div>
          </div>
        )}

        {/* -------------------- STACK ANIMATION -------------------- */}
        {concept.interactiveVisual.type === 'stack' && (
          <div className="my-auto space-y-4 relative z-10 flex flex-col items-center">
            <div className="text-xs font-mono text-pink-400 font-bold flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> LIFO Chamber (Top is the only entrance & exit)
            </div>

            {/* Vertical Stack Canister */}
            <div className="w-56 min-h-[150px] bg-slate-900/90 rounded-2xl border-2 border-b-4 border-slate-700 p-2 flex flex-col-reverse justify-start gap-1.5 shadow-lg">
              <AnimatePresence>
                {stackItems.map((item, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  return (
                    <motion.div
                      key={item}
                      layout
                      initial={{ opacity: 0, y: -40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -40, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between shadow-xs ${
                        isTop
                          ? 'bg-pink-600/30 border-pink-500 text-pink-200 ring-2 ring-pink-500/40'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span>{item}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900/70 text-slate-400">
                        {isTop ? 'TOP' : `Depth ${stackItems.length - idx}`}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {stackItems.length === 0 && (
                <div className="text-slate-500 text-xs italic text-center py-6">
                  Stack empty (Underflow)
                </div>
              )}
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              LIFO Invariant: The last element pushed onto Top is the first popped.
            </div>
          </div>
        )}

        {/* -------------------- WI-FI ANIMATION -------------------- */}
        {concept.interactiveVisual.type === 'wifi' && (
          <div className="my-auto space-y-5 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-blue-400 font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" /> Router (Transmitter)
              </span>
              <span className="text-emerald-400 font-bold">
                Device (Receiver Antenna)
              </span>
            </div>

            {/* Electromagnetic Wave Stage */}
            <div className="relative h-24 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between px-6 overflow-hidden">
              {/* Router */}
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-[10px] z-10 shadow-lg">
                <Radio className="w-5 h-5 animate-pulse" />
                <span>Router</span>
              </div>

              {/* Pulsing RF Wave Rings */}
              <div className="absolute left-10 inset-y-0 right-10 flex items-center justify-center pointer-events-none">
                {[1, 2, 3, 4].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute border border-blue-400/30 rounded-full"
                    animate={{
                      width: [20, 220],
                      height: [20, 90],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2 / speed,
                      repeat: Infinity,
                      delay: ring * 0.45,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>

              {/* Laptop / Phone Device */}
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex flex-col items-center justify-center font-bold text-[10px] z-10 shadow-lg">
                <Activity className="w-5 h-5" />
                <span>Device</span>
              </div>
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              RF Modulation: Binary bits (01101) encode onto oscillating electromagnetic waves at speed of light.
            </div>
          </div>
        )}

        {/* -------------------- GRAVITY ANIMATION -------------------- */}
        {concept.interactiveVisual.type === 'gravity' && (
          <div className="my-auto space-y-4 relative z-10 flex flex-col items-center">
            <div className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Spacetime Curvature & Orbital Freefall
            </div>

            {/* Orbit Stage */}
            <div className="relative w-56 h-36 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
              {/* Sun in center */}
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[9px] shadow-[0_0_25px_rgba(245,158,11,0.6)] z-10">
                Sun
              </div>

              {/* Orbital Ellipse */}
              <div className="absolute w-44 h-24 rounded-full border border-dashed border-indigo-500/40" />

              {/* Orbiting Planet Satellite */}
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-blue-400 border border-white shadow-md flex items-center justify-center text-[8px] font-bold text-slate-900"
                style={{
                  transform: `rotate(${orbitAngle}deg) translate(80px) rotate(-${orbitAngle}deg)`,
                }}
              >
                🌍
              </motion.div>
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              Einstein Rule: Mass tells spacetime how to curve; spacetime tells Earth how to move.
            </div>
          </div>
        )}

        {/* -------------------- BINARY SEARCH ANIMATION -------------------- */}
        {concept.interactiveVisual.type === 'binary_search' && (
          <div className="my-auto space-y-5 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-400">Low: Index {bsLow}</span>
              <span className="text-blue-400 font-bold">Mid: Index {bsMid} (Val: {bsArray[bsMid]})</span>
              <span className="text-emerald-400">High: Index {bsHigh}</span>
            </div>

            {/* Array Boxes */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto p-1">
              {bsArray.map((val, idx) => {
                const isInRange = idx >= bsLow && idx <= bsHigh;
                const isMid = idx === bsMid;
                const isTarget = val === bsTarget && bsFound;

                return (
                  <div
                    key={idx}
                    className={`flex-1 min-w-[28px] h-11 rounded-lg border text-xs font-mono font-bold flex flex-col items-center justify-center transition-all ${
                      isTarget
                        ? 'bg-emerald-500 text-slate-950 border-white ring-2 ring-emerald-400 scale-110'
                        : isMid
                        ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-300 scale-105'
                        : isInRange
                        ? 'bg-slate-800 border-slate-600 text-slate-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-30'
                    }`}
                  >
                    <span className="text-[8px] opacity-60">i:{idx}</span>
                    <span>{val}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              Divide & Conquer: Target {bsTarget} checked against midpoint {bsArray[bsMid]}. Discard 50% each step!
            </div>
          </div>
        )}

        {/* -------------------- DNS / GENERIC ANIMATION -------------------- */}
        {(concept.interactiveVisual.type === 'dns' || concept.interactiveVisual.type === 'custom') && (
          <div className="my-auto space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Phase {dnsPhase + 1} of 4: Hierarchical Pipeline</span>
              <span className="text-cyan-400 font-bold">google.com ➔ 142.250.190.46</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { title: '1. Browser', desc: 'Queries domain' },
                { title: '2. Root Server', desc: 'Directs to .com' },
                { title: '3. TLD Server', desc: 'Authoritative IP' },
                { title: '4. Destination', desc: 'Direct Handshake' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs transition-all ${
                    dnsPhase === idx
                      ? 'bg-cyan-600/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/40 scale-105 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-bold text-[11px] mb-0.5">{step.title}</div>
                  <div className="text-[9px] opacity-80">{step.desc}</div>
                </div>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-slate-400">
              Resolution Pipeline: Decentralized hierarchy translates human words to IP coordinates in milliseconds.
            </div>
          </div>
        )}

        {/* Dynamic Caption / Feedback Banner */}
        <div className="z-10 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span className="truncate">
              {message || `Demonstrating live execution of ${concept.title}`}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Interactive Model
          </span>
        </div>
      </div>

      {/* Manual Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {concept.interactiveVisual.type === 'queue' && (
            <>
              <button
                onClick={handleEnqueue}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Enqueue Client (Rear)
              </button>
              <button
                onClick={handleDequeue}
                disabled={queueItems.length === 0}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" /> Dequeue Client (Front)
              </button>
            </>
          )}

          {concept.interactiveVisual.type === 'stack' && (
            <>
              <button
                onClick={handlePush}
                className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Push to Top
              </button>
              <button
                onClick={handlePop}
                disabled={stackItems.length === 0}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" /> Pop from Top
              </button>
            </>
          )}

          {concept.interactiveVisual.type === 'binary_search' && (
            <button
              onClick={handleBsStep}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Scissors className="w-3.5 h-3.5" /> Step Halving Division
            </button>
          )}

          {concept.interactiveVisual.type === 'wifi' && (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setWifiFreq('2.4GHz')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  wifiFreq === '2.4GHz' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
              >
                2.4 GHz (Long Range)
              </button>
              <button
                onClick={() => setWifiFreq('5GHz')}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  wifiFreq === '5GHz' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                5 GHz (High Speed)
              </button>
            </div>
          )}

          {concept.interactiveVisual.type === 'gravity' && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Sun Gravity Well:</span>
              <button
                onClick={() => setOrbitAngle((prev) => (prev + 45) % 360)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                +Boost Velocity
              </button>
            </div>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          Auto-synced visual cycle
        </div>
      </div>
    </section>
  );
}
