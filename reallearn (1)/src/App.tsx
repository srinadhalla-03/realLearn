import { useState, useEffect } from 'react';
import { TabType, ConceptItem, UserStats } from './types';
import { POPULAR_CONCEPTS } from './data/concepts';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ConceptView } from './components/ConceptView';
import { ExploreView } from './components/ExploreView';
import { LessonsView } from './components/LessonsView';
import { BookmarksView } from './components/BookmarksView';
import { ProfileView } from './components/ProfileView';
import { VoiceInputModal } from './components/VoiceInputModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeConcept, setActiveConcept] = useState<ConceptItem | null>(null);
  const [customConcepts, setCustomConcepts] = useState<ConceptItem[]>([]);
  const [isVoiceOpen, setIsVoiceOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // User persistent state
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('reallearn_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      conceptsCompleted: ['queue'],
      bookmarkedIds: ['queue', 'wifi'],
      streakDays: 3,
      totalSimulationsRun: 8,
      quizzesPassed: 1,
    };
  });

  useEffect(() => {
    localStorage.setItem('reallearn_stats', JSON.stringify(userStats));
  }, [userStats]);

  const handleSelectConcept = (concept: ConceptItem) => {
    setActiveConcept(concept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setActiveConcept(null);
  };

  const handleToggleBookmark = (conceptId: string) => {
    setUserStats((prev) => {
      const exists = prev.bookmarkedIds.includes(conceptId);
      const updated = exists
        ? prev.bookmarkedIds.filter((id) => id !== conceptId)
        : [...prev.bookmarkedIds, conceptId];
      return { ...prev, bookmarkedIds: updated };
    });
  };

  const handleCompleteConcept = (conceptId: string) => {
    setUserStats((prev) => {
      const alreadyCompleted = prev.conceptsCompleted.includes(conceptId);
      return {
        ...prev,
        conceptsCompleted: alreadyCompleted
          ? prev.conceptsCompleted
          : [...prev.conceptsCompleted, conceptId],
        quizzesPassed: prev.quizzesPassed + 1,
      };
    });
  };

  const handleResetProgress = () => {
    setUserStats({
      conceptsCompleted: [],
      bookmarkedIds: ['queue'],
      streakDays: 1,
      totalSimulationsRun: 0,
      quizzesPassed: 0,
    });
  };

  // Dynamic Search or AI Generation
  const handleSearchQuery = async (query: string) => {
    const normalized = query.toLowerCase().trim();

    // 1. Check local pre-built concepts first for instant response
    const found = POPULAR_CONCEPTS.find(
      (c) =>
        c.title.toLowerCase().includes(normalized) ||
        normalized.includes(c.id.toLowerCase()) ||
        c.id === normalized ||
        (normalized.includes('wifi') && c.id === 'wifi') ||
        (normalized.includes('stack') && c.id === 'stack') ||
        (normalized.includes('queue') && c.id === 'queue') ||
        (normalized.includes('gravity') && c.id === 'gravity') ||
        (normalized.includes('binary') && c.id === 'binary_search') ||
        (normalized.includes('dns') && c.id === 'dns')
    );

    if (found) {
      setActiveConcept(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Check previously generated custom concepts
    const foundCustom = customConcepts.find((c) =>
      c.title.toLowerCase().includes(normalized)
    );
    if (foundCustom) {
      setActiveConcept(foundCustom);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Call server-side Gemini API route
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: query }),
      });
      const resData = await res.json();

      if (resData.success && resData.data) {
        const item: ConceptItem = {
          ...resData.data,
          id: `custom_${Date.now()}`,
          readTime: '3 min',
          isCustomGenerated: true,
        };
        setCustomConcepts((prev) => [item, ...prev]);
        setActiveConcept(item);
      } else {
        // Fallback concept generator
        const fallbackItem: ConceptItem = {
          id: `custom_${Date.now()}`,
          title: query,
          tagline: `Let's understand ${query} through a real-world physical analogy.`,
          overviewSummary: `${query} operates on coordinated principles where inputs undergo systematic transformation to yield predictable outcomes. By linking the mechanism to everyday physical objects, abstract rules become intuitive.`,
          keyPoints: [
            {
              title: 'Fundamental Principle',
              description: `The core mechanism governing how ${query} behaves in real scenarios.`,
              tag: 'Core Rule',
              icon: 'Zap'
            },
            {
              title: 'Sequential Processing',
              description: 'Components interact systematically from input trigger to output delivery.',
              tag: 'Architecture',
              icon: 'Layers'
            },
            {
              title: 'State Transition',
              description: 'Preserves balance and prevents unexpected state corruption during execution.',
              tag: 'Reliability',
              icon: 'ShieldCheck'
            },
            {
              title: 'Everyday Impact',
              description: `Practical systems that leverage the principles of ${query} in modern life.`,
              tag: 'Application',
              icon: 'Globe'
            }
          ],
          images: [
            {
              id: 'fallback_img_1',
              url: `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`,
              title: `Physical Analogy of ${query}`,
              caption: `Everyday physical components working together to illustrate ${query}.`,
              tag: 'Physical Model'
            },
            {
              id: 'fallback_img_2',
              url: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80`,
              title: 'System Integration',
              caption: `How modern software and physical engineering apply ${query} at scale.`,
              tag: 'Engineering'
            },
            {
              id: 'fallback_img_3',
              url: `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80`,
              title: 'Practical Infrastructure',
              caption: `Reliable execution frameworks designed around the rules of ${query}.`,
              tag: 'Infrastructure'
            }
          ],
          realWorldExamples: [
            {
              title: `Consumer Technology & Daily Use`,
              description: `Everyday consumer devices and digital software applications apply the core principles of ${query} to provide predictable user experiences.`,
              tag: 'Everyday Life',
              icon: 'Smartphone',
              systemExample: `${query} automated workflow engine`
            },
            {
              title: `High-Throughput Cloud Services`,
              description: `Distributed backend infrastructure orchestrates data flow efficiently using the invariant rules of ${query}.`,
              tag: 'Cloud Infrastructure',
              icon: 'Server',
              systemExample: 'Distributed microservices architecture'
            },
            {
              title: `Industrial Precision & Safety`,
              description: `Critical physical systems depend on this invariant to eliminate human error and ensure deterministic results.`,
              tag: 'Industry',
              icon: 'ShieldCheck',
              systemExample: 'Automated factory controller'
            }
          ],
          category: 'General',
          difficulty: 'Beginner',
          readTime: '3 min',
          story: {
            title: 'Real-World Story',
            description: `Imagine an everyday system where multiple parts coordinate seamlessly to achieve ${query}. Just like clockwork gears or an organized assembly line, each step happens in clear order.`,
            analogyObject: 'Coordinated Gearbox & Assembly Line',
            steps: [
              { step: 1, title: 'Input Trigger', detail: 'The process begins with an incoming command or stimulus.' },
              { step: 2, title: 'Transformation Flow', detail: 'The core mechanism converts inputs into intermediate energy or state.' },
              { step: 3, title: 'Output Fulfillment', detail: 'The final result is delivered reliably.' },
            ],
          },
          interactiveVisual: {
            title: 'Interactive Visual',
            subtitle: `Simulate ${query} mechanics in real time.`,
            type: 'custom',
            initialElements: ['Step A', 'Step B', 'Step C'],
            primaryAction: '+ Add Input',
            secondaryAction: '- Process State',
            primaryLabel: 'Source Origin',
            secondaryLabel: 'Destination Target',
            keyTakeaways: [
              `Every mechanism in ${query} relies on defined rules and conservation of state.`,
              'Breaking it down into physical analogies makes abstract formulas intuitive.',
              'Real-world parallels help you retain concepts faster without rote memorization.',
            ],
          },
          videoWalkthrough: [
            {
              id: 1,
              title: '1. What is this concept?',
              caption: `Let's understand ${query} using physical intuitive models.`,
              graphicType: 'analogy',
              illustrationDetails: {
                heading: query,
                subheading: 'Physical Metaphor',
                items: [
                  'Step 1: Input Trigger',
                  'Step 2: Processing Flow',
                  'Step 3: Output Fulfilled'
                ],
                accentColor: '#3b82f6'
              }
            },
            {
              id: 2,
              title: '2. Underlying Mechanics',
              caption: 'Step-by-step state changes and invariant preservation.',
              graphicType: 'diagram',
              illustrationDetails: {
                heading: 'Internal Mechanics',
                subheading: 'System Process',
                items: [
                  'Rule A: Deterministic order',
                  'Rule B: Stable state changes',
                  'Rule C: Output confirmation'
                ],
                accentColor: '#8b5cf6'
              }
            }
          ],
          quiz: {
            question: `What is the most intuitive way to remember how ${query} works?`,
            options: [
              'By relating its core mechanism to a physical, real-world everyday object',
              'By memorizing raw text without visualization',
              'By guessing randomly',
              'None of the above',
            ],
            correctIndex: 0,
            explanation: 'Physical visual analogies activate spatial memory and intuition.',
          },
          relatedTopics: ['Queue', 'How does Wi-Fi work?', 'Binary Search', 'How does gravity work?'],
          isCustomGenerated: true,
        };
        setCustomConcepts((prev) => [fallbackItem, ...prev]);
        setActiveConcept(fallbackItem);
      }
    } catch (err) {
      console.error('AI generation error:', err);
    } finally {
      setIsLoadingAi(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isCurrentBookmarked = activeConcept
    ? userStats.bookmarkedIds.includes(activeConcept.id)
    : false;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        activeConcept={activeConcept}
        onBack={handleBackToHome}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={isCurrentBookmarked}
        onOpenMenu={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="transition-opacity duration-200">
        {activeConcept ? (
          <ConceptView
            concept={activeConcept}
            onSelectConcept={handleSelectConcept}
            onSearchQuery={handleSearchQuery}
            isBookmarked={isCurrentBookmarked}
            onToggleBookmark={handleToggleBookmark}
            onCompleteConcept={handleCompleteConcept}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                onSelectConcept={handleSelectConcept}
                onSearchQuery={handleSearchQuery}
                onOpenVoiceInput={() => setIsVoiceOpen(true)}
                isLoading={isLoadingAi}
              />
            )}
            {activeTab === 'explore' && (
              <ExploreView
                onSelectConcept={handleSelectConcept}
                onSearchQuery={handleSearchQuery}
              />
            )}
            {activeTab === 'lessons' && (
              <LessonsView
                onSelectConcept={handleSelectConcept}
                completedIds={userStats.conceptsCompleted}
              />
            )}
            {activeTab === 'bookmarks' && (
              <BookmarksView
                bookmarkedIds={userStats.bookmarkedIds}
                customConcepts={customConcepts}
                onSelectConcept={handleSelectConcept}
                onRemoveBookmark={handleToggleBookmark}
                onExploreClick={() => setActiveTab('explore')}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileView
                stats={userStats}
                onResetProgress={handleResetProgress}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeConcept ? 'lessons' : activeTab}
        onSelectTab={(tab) => {
          setActiveConcept(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={userStats.bookmarkedIds.length}
      />

      {/* Voice Recognition Modal */}
      <VoiceInputModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onTranscript={handleSearchQuery}
      />

      {/* Quick Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectConcept={handleSelectConcept}
        onSearchQuery={handleSearchQuery}
      />
    </div>
  );
}
