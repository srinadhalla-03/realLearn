import { useState } from 'react';
import { Search, Compass, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { ConceptItem } from '../types';
import { CATEGORIES, POPULAR_CONCEPTS } from '../data/concepts';

interface Props {
  onSelectConcept: (concept: ConceptItem) => void;
  onSearchQuery: (query: string) => void;
}

export function ExploreView({ onSelectConcept, onSearchQuery }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filterText, setFilterText] = useState<string>('');

  const filteredConcepts = POPULAR_CONCEPTS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesText =
      c.title.toLowerCase().includes(filterText.toLowerCase()) ||
      c.tagline.toLowerCase().includes(filterText.toLowerCase()) ||
      c.story.description.toLowerCase().includes(filterText.toLowerCase());
    return matchesCategory && matchesText;
  });

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-6">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Explore Visual Concepts
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Browse interactive physical analogies across computer science, physics, and everyday tech.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter concepts..."
          className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Concept Grid / List */}
      <div className="space-y-3.5">
        {filteredConcepts.map((concept) => (
          <div
            key={concept.id}
            onClick={() => onSelectConcept(concept)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {concept.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {concept.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {concept.title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {concept.story.description}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Analogy: {concept.story.analogyObject}
              </span>
              <span className="font-semibold text-slate-700">
                {concept.difficulty}
              </span>
            </div>
          </div>
        ))}

        {filteredConcepts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Want a custom visual explanation?</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              We can generate a real-world visual analogy for "{filterText}" instantly.
            </p>
            <button
              onClick={() => onSearchQuery(filterText)}
              className="px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
            >
              Generate Visual for "{filterText}" →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
