import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Disc, Orbit, CheckCircle2 } from 'lucide-react';
import { ConceptItem } from '../../types';

interface Props {
  concept: ConceptItem;
}

export function GravitySimulation({ concept }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [starMass, setStarMass] = useState<number>(100);
  const [satellites, setSatellites] = useState<
    Array<{ x: number; y: number; vx: number; vy: number; color: string; trail: Array<{ x: number; y: number }> }>
  >([
    { x: 150, y: 70, vx: 2.2, vy: 0, color: '#38bdf8', trail: [] },
    { x: 150, y: 220, vx: -1.7, vy: 0, color: '#a855f7', trail: [] },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear Canvas
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw Spacetime Curvature Grid Rings
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let r = 20; r <= 140; r += 20) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Central Star (Mass)
      const starRadius = Math.min(24, Math.max(12, starMass / 6));
      const gradient = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, starRadius * 2);
      gradient.addColorStop(0, '#fde047');
      gradient.addColorStop(0.5, '#f97316');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(centerX, centerY, starRadius, 0, Math.PI * 2);
      ctx.fill();

      // Update and Draw Satellites
      if (isPlaying) {
        setSatellites((prev) =>
          prev.map((sat) => {
            const dx = centerX - sat.x;
            const dy = centerY - sat.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Gravitational force: F = G * M / r^2
            const force = (starMass * 1.8) / Math.max(distSq, 100);
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            const nvx = sat.vx + ax;
            const nvy = sat.vy + ay;
            const nx = sat.x + nvx;
            const ny = sat.y + nvy;

            // Keep trail
            const newTrail = [...sat.trail, { x: nx, y: ny }].slice(-30);

            return {
              ...sat,
              x: nx,
              y: ny,
              vx: nvx,
              vy: nvy,
              trail: newTrail,
            };
          })
        );
      }

      // Render Trails & Bodies
      satellites.forEach((sat) => {
        // Draw Trail
        if (sat.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(sat.trail[0].x, sat.trail[0].y);
          for (let i = 1; i < sat.trail.length; i++) {
            ctx.lineTo(sat.trail[i].x, sat.trail[i].y);
          }
          ctx.strokeStyle = sat.color;
          ctx.globalAlpha = 0.4;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Draw Planet Body
        ctx.fillStyle = sat.color;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, starMass, satellites]);

  const handleLaunch = () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 90;
    const cx = 150;
    const cy = 100;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    const speed = 1.8 + Math.random() * 0.6;
    // perpendicular tangent
    const vx = -Math.sin(angle) * speed;
    const vy = Math.cos(angle) * speed;

    const colors = ['#38bdf8', '#34d399', '#f43f5e', '#a855f7', '#fbbf24'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    setSatellites((prev) => [...prev, { x, y, vx, vy, color, trail: [] }]);
  };

  const handleReset = () => {
    setStarMass(100);
    setSatellites([
      { x: 150, y: 50, vx: 2.1, vy: 0, color: '#38bdf8', trail: [] },
      { x: 150, y: 160, vx: -1.7, vy: 0, color: '#a855f7', trail: [] },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Real-World Story Card */}
      <div className="bg-gradient-to-br from-violet-50/70 via-white to-purple-50/60 rounded-2xl p-5 sm:p-6 border border-violet-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
            Real-World Story
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-100/80 text-violet-800">
            Analogy: Stretched Rubber Trampoline
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-5">
          {concept.story.description}
        </p>

        {/* Orbit Canvas Simulation */}
        <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className="w-full max-w-sm h-48 rounded-lg"
          />
          <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            Curved Spacetime Well
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Interactive Visual</h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Launch orbital satellites and alter central gravitational mass.
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-violet-100 text-violet-900 px-2.5 py-0.5 rounded-md">
            General Relativity
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={handleLaunch}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Orbit className="w-4 h-4" />
            + Orbit Body
          </button>
          <button
            onClick={() => setStarMass((m) => (m >= 200 ? 50 : m + 50))}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-200 transition-all cursor-pointer"
          >
            <Disc className="w-4 h-4" />
            Mass: {starMass}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        {/* Telemetry Log */}
        <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <span>Active Orbiting Bodies: {satellites.length} | Spacetime Curvature: {starMass * 2} G-Units</span>
        </div>
      </div>
    </div>
  );
}
