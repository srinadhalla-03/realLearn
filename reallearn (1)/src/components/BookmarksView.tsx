import { Bookmark, ArrowRight, BookOpen, Trash2 } from 'lucide-react';
import { ConceptItem } from '../types';
import { POPULAR_CONCEPTS } from '../data/concepts';

interface Props {
  bookmarkedIds: string[];
  customConcepts: ConceptItem[];
  onSelectConcept: (concept: ConceptItem) => void;
  onRemoveBookmark: (conceptId: string) => void;
  onExploreClick: () => void;
}

export function BookmarksView({
  bookmarkedIds,
  customConcepts,
  onSelectConcept,
  onRemoveBookmark,
  onExploreClick,
}: Props) {
  const allAvailable = [...POPULAR_CONCEPTS, ...customConcepts];
  const bookmarkedItems = allAvailable.filter((c) => bookmarkedIds.includes(c.id));

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Saved Analogies
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Quickly revisit your saved visual models and interactive sandboxes.
        </p>
      </div>

      {bookmarkedItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">No saved concepts yet</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Tap the bookmark icon on any concept screen to save it for quick review.
          </p>
          <button
            onClick={onExploreClick}
            className="px-4 py-2 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Explore Popular Visuals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarkedItems.map((concept) => (
            <div
              key={concept.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-3 group"
            >
              <div
                onClick={() => onSelectConcept(concept)}
                className="flex-1 cursor-pointer space-y-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    {concept.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {concept.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  {concept.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  Analogy: {concept.story.analogyObject}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRemoveBookmark(concept.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectConcept(concept)}
                  className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
