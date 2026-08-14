import { useState } from 'react';
import { Layers, Info, Check, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { ConceptItem } from '../types';

interface Props {
  concept: ConceptItem;
}

export function VisualDiagram({ concept }: Props) {
  const [activeNode, setActiveNode] = useState<number>(0);

  const getDiagramData = () => {
    switch (concept.interactiveVisual.type) {
      case 'queue':
        return {
          nodes: [
            { id: 0, label: 'Rear (Tail)', role: 'Enqueue point', detail: 'New elements enter at the rear.', color: '#3b82f6' },
            { id: 1, label: 'Internal Buffer', role: 'Sequenced storage', detail: 'Elements wait strictly in order of arrival.', color: '#8b5cf6' },
            { id: 2, label: 'Front (Head)', role: 'Dequeue point', detail: 'Oldest element exits first for processing.', color: '#10b981' },
          ],
          flowText: 'FIFO Pipeline: Elements flow unidirectionally from Rear to Front',
        };
      case 'stack':
        return {
          nodes: [
            { id: 0, label: 'Top Element', role: 'Active target', detail: 'Push & Pop happen exclusively at the top.', color: '#ec4899' },
            { id: 1, label: 'Middle Elements', role: 'Submerged state', detail: 'Cannot be accessed without popping upper items.', color: '#8b5cf6' },
            { id: 2, label: 'Bottom (Base)', role: 'Foundation', detail: 'The very first item pushed into the stack.', color: '#64748b' },
          ],
          flowText: 'LIFO Stack: Items stack vertically; last item on top is first removed',
        };
      case 'wifi':
        return {
          nodes: [
            { id: 0, label: 'Internet Router', role: 'Transmitter', detail: 'Encodes data bytes into high-frequency RF waves.', color: '#3b82f6' },
            { id: 1, label: 'Radio Waves (2.4/5GHz)', role: 'Transmission medium', detail: 'Oscillating electromagnetic field in airspace.', color: '#f59e0b' },
            { id: 2, label: 'Device Antenna', role: 'Receiver & Demodulator', detail: 'Converts oscillations back into digital bits.', color: '#10b981' },
          ],
          flowText: 'Wireless RF Pipeline: Digital Data ➔ Electromagnetic Waves ➔ Digital Data',
        };
      case 'gravity':
        return {
          nodes: [
            { id: 0, label: 'Massive Body (Sun)', role: 'Spacetime Curvature', detail: 'Mass warps the surrounding spacetime fabric.', color: '#f59e0b' },
            { id: 1, label: 'Curvature Well', role: 'Gravitational Potential', detail: 'The slope determines orbital velocity required.', color: '#8b5cf6' },
            { id: 2, label: 'Orbiting Body', role: 'Geodesic Path', detail: 'Freefalling in forward momentum around the curve.', color: '#3b82f6' },
          ],
          flowText: 'Relativistic Mechanics: Mass tells spacetime how to curve, spacetime tells mass how to move',
        };
      case 'binary_search':
        return {
          nodes: [
            { id: 0, label: 'Low Pointer (L)', role: 'Lower Boundary', detail: 'Start of active search window.', color: '#ef4444' },
            { id: 1, label: 'Mid Pointer (M)', role: 'Comparison Pivot', detail: 'Target is compared against array[mid].', color: '#3b82f6' },
            { id: 2, label: 'High Pointer (H)', role: 'Upper Boundary', detail: 'End of active search window.', color: '#10b981' },
          ],
          flowText: 'Divide & Conquer: Discard 50% of the dataset at each comparison step',
        };
      case 'dns':
        return {
          nodes: [
            { id: 0, label: 'User Browser', role: 'Client Query', detail: 'Requests IP address for domain name.', color: '#3b82f6' },
            { id: 1, label: 'DNS Resolver / TLD', role: 'Hierarchical Lookup', detail: 'Recursively checks Root, .com, and Authoritative servers.', color: '#8b5cf6' },
            { id: 2, label: 'Web Server', role: 'Direct IP Connection', detail: 'Browser handshakes directly with destination server.', color: '#10b981' },
          ],
          flowText: 'DNS Resolution: Domain Name ➔ Hierarchy Query ➔ IP Address Handshake',
        };
      default:
        return {
          nodes: [
            { id: 0, label: 'Input / Producer', role: 'Source', detail: 'Initiates data or state trigger.', color: '#3b82f6' },
            { id: 1, label: 'Core Mechanism', role: 'Transformation', detail: 'Applies algorithm or physical law.', color: '#8b5cf6' },
            { id: 2, label: 'Output / Consumer', role: 'Result', detail: 'Delivers expected outcome.', color: '#10b981' },
          ],
          flowText: 'System Process Flow: Input ➔ Processing Engine ➔ Output Resolution',
        };
    }
  };

  const data = getDiagramData();

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Diagram Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Visual Architecture Diagram
            </h4>
            <p className="text-[11px] text-slate-500">
              Click any component node to inspect mechanics
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          Interactive Infographic
        </span>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
          {data.nodes.map((node, idx) => {
            const isSelected = activeNode === idx;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(idx)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-md border-blue-500 ring-2 ring-blue-100 scale-[1.02]'
                    : 'bg-white/70 hover:bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: node.color }}
                />
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Node 0{idx + 1}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                </div>
                <div className="font-bold text-sm text-slate-900 mb-0.5">
                  {node.label}
                </div>
                <div className="text-[11px] font-medium text-slate-500">
                  {node.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Selected Node */}
        <div className="mt-4 p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-xs">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white flex-shrink-0 mt-0.5 font-bold text-xs"
            style={{ backgroundColor: data.nodes[activeNode].color }}
          >
            {activeNode + 1}
          </div>
          <div className="space-y-0.5 text-left">
            <div className="text-xs font-bold text-slate-900">
              {data.nodes[activeNode].label} — {data.nodes[activeNode].role}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {data.nodes[activeNode].detail}
            </p>
          </div>
        </div>

        {/* Process Flow Banner */}
        <div className="mt-3 text-center text-[11px] font-medium text-slate-500 bg-slate-100/80 py-2 px-3 rounded-lg border border-slate-200/60">
          {data.flowText}
        </div>
      </div>
    </div>
  );
}
