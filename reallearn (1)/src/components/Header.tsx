import { Menu, Search, ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { ConceptItem } from '../types';

interface Props {
  activeTab: string;
  activeConcept: ConceptItem | null;
  onBack: () => void;
  onOpenSearch: () => void;
  onToggleBookmark?: (conceptId: string) => void;
  isBookmarked?: boolean;
  onOpenMenu?: () => void;
}

export function Header({
  activeTab,
  activeConcept,
  onBack,
  onOpenSearch,
  onToggleBookmark,
  isBookmarked,
  onOpenMenu,
}: Props) {
  // If inside a concept/lesson view (Screen 2)
  if (activeConcept) {
    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
        <button
          id="concept-back-btn"
          onClick={onBack}
          className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-slate-900 truncate max-w-[200px] text-center">
          {activeConcept.title}
        </h1>

        <div className="flex items-center gap-1 -mr-2">
          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(activeConcept.id)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Concept'}
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-slate-700'
                }`}
              />
            </button>
          )}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </header>
    );
  }

  // Standard Header for Main Screens (Screen 1)
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 h-14 flex items-center justify-between">
      <button
        id="main-menu-btn"
        onClick={onOpenMenu}
        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5 cursor-pointer" onClick={onBack}>
        <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 font-sans">
          RealLearn
        </span>
      </div>

      <button
        id="main-search-btn"
        onClick={onOpenSearch}
        className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Search topics"
      >
        <Search className="w-5 h-5" />
      </button>
    </header>
  );
}
