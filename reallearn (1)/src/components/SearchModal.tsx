import { useState, FormEvent } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ConceptItem } from '../types';
import { POPULAR_CONCEPTS } from '../data/concepts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (concept: ConceptItem) => void;
  onSearchQuery: (query: string) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectConcept,
  onSearchQuery,
}: Props) {
  const [query, setQuery] = useState<string>('');

  if (!isOpen) return null;

  const matches = POPULAR_CONCEPTS.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchQuery(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Search Header */}
        <form onSubmit={handleSubmit} className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics (e.g. Queue, Gravity, Wi-Fi)..."
            className="w-full text-sm font-medium text-slate-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Results List */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1.5">
          {matches.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                onSelectConcept(c);
                onClose();
              }}
              className="p-3 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-colors border border-transparent hover:border-slate-200"
            >
              <div>
                <div className="font-bold text-slate-900 text-sm">{c.title}</div>
                <div className="text-xs text-slate-400">Analogy: {c.story.analogyObject}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}

          {query && (
            <div
              onClick={() => {
                onSearchQuery(query);
                onClose();
              }}
              className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 flex items-center justify-between cursor-pointer border border-blue-200"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold">Generate AI visual for "{query}"</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
