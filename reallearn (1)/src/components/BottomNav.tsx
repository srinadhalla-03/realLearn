import { Home, Compass, PlaySquare, Bookmark, User } from 'lucide-react';
import { TabType } from '../types';

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  bookmarksCount?: number;
}

export function BottomNav({ activeTab, onSelectTab, bookmarksCount = 0 }: Props) {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'explore' as TabType, label: 'Explore', icon: Compass },
    { id: 'lessons' as TabType, label: 'Lessons', icon: PlaySquare },
    { id: 'bookmarks' as TabType, label: 'Bookmarks', icon: Bookmark, badge: bookmarksCount },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 sm:py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.id === 'bookmarks' && bookmarksCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                    {bookmarksCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
