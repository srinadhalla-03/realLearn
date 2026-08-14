import { useState, useEffect } from 'react';
import { Wifi, Smartphone, Radio, ShieldAlert, Zap, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function WifiSimulation({ concept }: Props) {
  const [band, setBand] = useState<'2.4GHz' | '5GHz'>('5GHz');
  const [hasObstacle, setHasObstacle] = useState<boolean>(false);
  const [transmitting, setTransmitting] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(12);
  const [latency, setLatency] = useState<number>(12);

  useEffect(() => {
    // Dynamic signal calculation
    let baseLatency = band === '5GHz' ? 8 : 24;
    if (hasObstacle) {
      baseLatency += band === '5GHz' ? 45 : 12; // 5GHz suffers more through walls
    }
    setLatency(baseLatency);
  }, [band, hasObstacle]);

  const handleSendPacket = () => {
    setPacketCount((c) => c + 1);
  };

  const signalQuality = () => {
    if (hasObstacle && band === '5GHz') return { text: 'Fair (Wall Attenuation)', color: 'text-amber-600', bars: 2 };
    if (hasObstacle && band === '2.4GHz') return { text: 'Good (Penetrated Wall)', color: 'text-emerald-600', bars: 3 };
    if (band === '5GHz') return { text: 'Excellent (High Bandwidth)', color: 'text-blue-600', bars: 4 };
    return { text: 'Very Good (2.4GHz)', color: 'text-emerald-600', bars: 4 };
  };

  const signal = signalQuality();

  return (
    <div className="space-y-6">
      {/* Real-World Story Card */}
      <div className="bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/60 rounded-2xl p-5 sm:p-6 border border-cyan-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-100/80 text-cyan-800">
            Analogy: Invisible Walkie-Talkies
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Story Visual */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-inner flex items-center justify-around min-h-[140px] relative overflow-hidden">
          {/* Router */}
          <div className="flex flex-col items-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-cyan-400 flex items-center justify-center shadow-lg">
              <Radio className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2">Home Router</span>
            <span className="text-[10px] text-slate-400">Transmitter</span>
          </div>

          {/* Radio Waves Traveling */}
          <div className="flex-1 max-w-[200px] flex items-center justify-center relative px-2">
            {[1, 2, 3].map((wave) => (
              <motion.div
                key={wave}
                animate={{
                  scale: [1, 2.2],
                  opacity: [0.9, 0],
                  x: [0, 60],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  delay: wave * 0.45,
                  ease: 'easeOut',
                }}
                className={`absolute w-8 h-8 rounded-full border-2 ${
                  band === '5GHz' ? 'border-cyan-400' : 'border-blue-500'
                }`}
              />
            ))}
            <div className="text-[10px] font-mono text-slate-400 z-10 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
              {band} Waves
            </div>
          </div>

          {/* Smartphone */}
          <div className="flex flex-col items-center z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2">Smartphone</span>
            <span className="text-[10px] text-slate-400">Receiver</span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Tweak frequency bands and test wall penetration.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-cyan-100 text-cyan-900 px-2.5 py-0.5 rounded-md">
            Radio Wave Physics
          </span>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setBand(band === '5GHz' ? '2.4GHz' : '5GHz')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Band: {band}
          </button>
          <button
            onClick={() => setHasObstacle(!hasObstacle)}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
              hasObstacle
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            {hasObstacle ? 'Remove Wall' : 'Add Wall'}
          </button>
          <button
            onClick={handleSendPacket}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider border border-blue-200 transition-all cursor-pointer"
          >
            <Wifi className="w-4 h-4" />
            Burst Packet
          </button>
          <button
            onClick={() => {
              setBand('5GHz');
              setHasObstacle(false);
              setPacketCount(1);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Live Signal Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Frequency Band</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">{band}</div>
            <div className="text-[10px] text-slate-500 mt-1">
              {band === '5GHz' ? 'Shallow waves, high data rate' : 'Long waves, high penetration'}
            </div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Signal Quality</div>
            <div className={`text-base font-bold mt-0.5 ${signal.color}`}>{signal.text}</div>
            <div className="text-[10px] text-slate-500 mt-1">Obstacle: {hasObstacle ? 'Drywall / Brick' : 'Clear Line-of-Sight'}</div>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Estimated Latency</div>
            <div className="text-base font-bold text-indigo-600 mt-0.5">{latency} ms</div>
            <div className="text-[10px] text-slate-500 mt-1">Packets sent: {packetCount}</div>
          </div>
        </div>

        {/* Action Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>
            Transmitting data at {band}. {hasObstacle ? 'Signal absorbed by wall.' : 'Direct path established.'}
          </span>
        </div>
      </div>
    </div>
  );
}
