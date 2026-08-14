import { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Share2,
  Bookmark,
  Check,
  Award,
  Volume2,
  VolumeX,
  PlayCircle,
  Eye,
  Layers,
  Gamepad2,
  Film,
  BookOpen,
  Zap,
  Clock,
  ShieldCheck,
  RotateCcw,
  Compass,
  Scissors,
  Target,
  Globe,
  Activity,
  Radio,
  ArrowUp,
  AlertTriangle,
  ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConceptItem } from '../types';
import { TopicImagesGallery } from './TopicImagesGallery';
import { TopicRealWorldExamples } from './TopicRealWorldExamples';
import { TopicInteractiveAnimation } from './TopicInteractiveAnimation';
import { VideoWalkthrough } from './VideoWalkthrough';
import { VisualDiagram } from './VisualDiagram';

interface Props {
  concept: ConceptItem;
  onSelectConcept: (concept: ConceptItem) => void;
  onSearchQuery: (query: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (conceptId: string) => void;
  onCompleteConcept: (conceptId: string) => void;
}

export function ConceptView({
  concept,
  onSelectConcept,
  onSearchQuery,
  isBookmarked,
  onToggleBookmark,
  onCompleteConcept,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [secondaryVisualView, setSecondaryVisualView] = useState<'animation' | 'video' | 'diagram'>('animation');

  // Scroll to top when concept changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setSecondaryVisualView('animation');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [concept.id]);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${concept.title}. ${concept.tagline}. ${concept.overviewSummary || ''} Key points: ${
        concept.keyPoints?.map((k) => `${k.title}: ${k.description}`).join('. ') || ''
      }`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (!quizSubmitted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null || !concept.quiz) return;
    setQuizSubmitted(true);

    if (selectedAnswer === concept.quiz.correctIndex) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
      });
      onCompleteConcept(concept.id);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'Clock':
        return <Clock className="w-3.5 h-3.5 text-blue-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Layers':
        return <Layers className="w-3.5 h-3.5 text-purple-500" />;
      case 'RotateCcw':
        return <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />;
      case 'Compass':
        return <Compass className="w-3.5 h-3.5 text-sky-500" />;
      case 'Scissors':
        return <Scissors className="w-3.5 h-3.5 text-rose-500" />;
      case 'Target':
        return <Target className="w-3.5 h-3.5 text-red-500" />;
      case 'Globe':
        return <Globe className="w-3.5 h-3.5 text-teal-500" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Radio':
        return <Radio className="w-3.5 h-3.5 text-blue-500" />;
      case 'ArrowUp':
        return <ArrowUp className="w-3.5 h-3.5 text-indigo-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  // Default fallback key points if empty
  const keyPoints = concept.keyPoints || [
    {
      title: 'First-In, First-Out (FIFO)',
      description: 'The element added earliest is processed and removed first.',
      tag: 'Order Rule',
      icon: 'Clock'
    },
    {
      title: 'Enqueue & Dequeue',
      description: 'Items enter at the rear and exit from the front in strict chronological order.',
      tag: 'Operations',
      icon: 'Layers'
    },
    {
      title: 'Fair Allocation',
      description: 'Prevents starvation by honoring exact arrival order without bias.',
      tag: 'Fairness',
      icon: 'ShieldCheck'
    },
    {
      title: 'System Buffering',
      description: 'Absorbs sudden surges in requests while servers process at a steady pace.',
      tag: 'Resilience',
      icon: 'Globe'
    }
  ];

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-8">
      {/* Top Action Bar & Title */}
      <section className="text-center space-y-3 relative">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {concept.category}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {concept.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleSpeech}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm animate-pulse'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
              title={isSpeaking ? 'Stop voice reading' : 'Listen to overview summary'}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isSpeaking ? 'Pause' : 'Listen'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(concept.id)}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="Bookmark Topic"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          {concept.title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          {concept.tagline}
        </p>
      </section>

      {/* ============================================================
          STEP 1: ESSENTIAL INFORMATION & KEY POINTS (GIVE INFORMATION FIRST)
          ============================================================ */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Step Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Essential Information & Key Points
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {concept.readTime} read
          </span>
        </div>

        {/* Overview Summary Box */}
        {concept.overviewSummary && (
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
            <p>{concept.overviewSummary}</p>
          </div>
        )}

        {/* Key Point Cards Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Core Takeaways at a Glance
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {keyPoints.map((point, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 hover:bg-slate-50 p-4 rounded-xl border border-slate-200/80 transition-all space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {point.tag || `Point 0${idx + 1}`}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                      {renderIcon(point.icon)}
                    </div>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {point.title}
                  </h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Jump to Images Callout */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Explore visual evidence & photographs below</span>
          <a
            href="#topic-images"
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
          >
            View Images <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ============================================================
          STEP 2: IMAGES FOR THE TOPIC (PROVIDED RIGHT AFTER KEY POINTS)
          ============================================================ */}
      <div id="topic-images">
        <TopicImagesGallery images={concept.images} topicTitle={concept.title} />
      </div>

      {/* ============================================================
          STEP 3: REAL-WORLD EXAMPLES (PROVIDED AFTER GIVING IMAGES)
          ============================================================ */}
      <TopicRealWorldExamples examples={concept.realWorldExamples} topicTitle={concept.title} />

      {/* ============================================================
          STEP 4: INTERACTIVE TOPIC ANIMATION (STREAMLINED INTERACTIVE SLIDE)
          ============================================================ */}
      <section id="interactive-animation-section" className="space-y-4">
        {/* Switcher header between Live Animation, Video Walkthrough, and Schematic Diagram */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              4
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
                Interactive Topic Animation
              </h2>
              <p className="text-[11px] text-slate-500">
                Experience the live physics and algorithmic mechanics
              </p>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setSecondaryVisualView('animation')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                secondaryVisualView === 'animation'
                  ? 'bg-white text-slate-950 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Animation</span>
            </button>

            <button
              onClick={() => setSecondaryVisualView('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                secondaryVisualView === 'video'
                  ? 'bg-white text-slate-950 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-red-500" />
              <span>Video Slides</span>
            </button>

            <button
              onClick={() => setSecondaryVisualView('diagram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                secondaryVisualView === 'diagram'
                  ? 'bg-white text-slate-950 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Diagram</span>
            </button>
          </div>
        </div>

        {/* Render the Selected Visual Component */}
        {secondaryVisualView === 'animation' && (
          <TopicInteractiveAnimation concept={concept} />
        )}

        {secondaryVisualView === 'video' && (
          <VideoWalkthrough concept={concept} />
        )}

        {secondaryVisualView === 'diagram' && (
          <VisualDiagram concept={concept} />
        )}
      </section>

      {/* ============================================================
          STEP 5: KEY RULES & INVARIANTS TAKEAWAYS
          ============================================================ */}
      {concept.interactiveVisual.keyTakeaways?.length > 0 && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Key Rules & System Invariants
          </h3>
          <ul className="space-y-2.5">
            {concept.interactiveVisual.keyTakeaways.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ============================================================
          STEP 6: QUICK CONCEPT CHECK QUIZ
          ============================================================ */}
      {concept.quiz && (
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold tracking-wider uppercase text-blue-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Intuition Check
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              1 Question
            </span>
          </div>

          <p className="font-medium text-sm sm:text-base text-slate-100">
            {concept.quiz.question}
          </p>

          <div className="space-y-2 pt-1">
            {concept.quiz.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === concept.quiz!.correctIndex;
              let btnStyle =
                'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800';

              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-600/90 border-emerald-400 text-white ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-600/80 border-rose-400 text-white';
                } else {
                  btnStyle =
                    'opacity-40 bg-slate-800/40 border-slate-800 text-slate-400';
                }
              } else if (isSelected) {
                btnStyle =
                  'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-300';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{option}</span>
                  {quizSubmitted && isCorrect && (
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={selectedAnswer === null}
              className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer"
            >
              Verify Answer
            </button>
          ) : (
            <div className="pt-2 text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700 leading-relaxed">
              <span className="font-bold text-blue-300 block mb-1">
                {selectedAnswer === concept.quiz.correctIndex
                  ? '🎉 Spot on!'
                  : '💡 Takeaway:'}
              </span>
              {concept.quiz.explanation}
            </div>
          )}
        </section>
      )}

      {/* Action Footer: Share & Related Topics */}
      <section className="space-y-4 pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Related Visuals
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            {copiedLink ? 'Link Copied!' : 'Share Visual'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {concept.relatedTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => onSearchQuery(topic)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{topic}</span>
              <ArrowRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
