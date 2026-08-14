import { useState, FormEvent } from 'react';
import { Search, Mic, ArrowRight, Eye, Lightbulb, Compass, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ConceptItem } from '../types';

interface Props {
  onSelectConcept: (concept: ConceptItem) => void;
  onSearchQuery: (query: string) => void;
  onOpenVoiceInput: () => void;
  isLoading?: boolean;
}

export function HomeView({
  onSelectConcept,
  onSearchQuery,
  onOpenVoiceInput,
  isLoading = false,
}: Props) {
  const [searchInput, setSearchInput] = useState<string>('');

  const tryTopics = [
    { label: 'How does Wi-Fi work?', id: 'wifi' },
    { label: 'What is a Stack?', id: 'stack' },
    { label: 'How does gravity work?', id: 'gravity' },
    { label: 'Queue', id: 'queue' },
    { label: 'Binary Search', id: 'binary_search' },
  ];

  const journeySteps = [
    {
      number: '01',
      title: 'Ask',
      desc: 'Type or speak any concept you want to master.',
      icon: Search,
    },
    {
      number: '02',
      title: 'See',
      desc: 'Watch high-quality visual analogies unfold.',
      icon: Eye,
    },
    {
      number: '03',
      title: 'Understand',
      desc: 'Grasp the core mechanics through interactive stories.',
      icon: Lightbulb,
    },
    {
      number: '04',
      title: 'Explore',
      desc: 'Dive deeper into related topics naturally.',
      icon: Compass,
    },
  ];

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput.trim());
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 pt-6 pb-28 space-y-9">
      {/* Hero Headline */}
      <section className="text-center space-y-3.5 pt-3">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.12]"
        >
          What do you
          <br />
          want to
          <br />
          understand?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto px-2"
        >
          Enter any topic. We'll explain it through real-world examples, visuals and
          interactive stories.
        </motion.p>
      </section>

      {/* Search & Action Input Card */}
      <motion.form
        onSubmit={handleFormSubmit}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50/70 rounded-2xl border border-slate-200/60 focus-within:border-blue-500 focus-within:bg-white transition-all">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            id="home-search-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search any topic... e.g."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none py-2"
          />
          <button
            type="button"
            id="mic-voice-btn"
            onClick={onOpenVoiceInput}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0 cursor-pointer"
            title="Voice input"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Explain Visually CTA Button */}
        <button
          type="submit"
          id="explain-visually-cta"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Generating Visual Story...</span>
            </>
          ) : (
            <>
              <span>Explain Visually</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.form>

      {/* TRY LEARNING Chips */}
      <section className="space-y-3 text-center">
        <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-sans">
          TRY LEARNING:
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-md mx-auto">
          {tryTopics.map((topic) => (
            <button
              key={topic.id}
              id={`try-topic-${topic.id}`}
              onClick={() => onSearchQuery(topic.label)}
              className="px-4 py-2 rounded-full bg-blue-100/70 hover:bg-blue-200/80 text-blue-900 font-semibold text-xs sm:text-sm tracking-tight transition-all active:scale-95 shadow-sm cursor-pointer border border-blue-200/40"
            >
              {topic.label}
            </button>
          ))}
        </div>
      </section>

      {/* The Learning Journey Section */}
      <section className="pt-4 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 text-center tracking-tight">
          The Learning Journey
        </h2>

        <div className="relative pl-6 sm:pl-8 space-y-4">
          {/* Vertical Connecting Line */}
          <div className="absolute top-6 bottom-6 left-9 sm:left-11 w-0.5 bg-slate-200 -translate-x-1/2"></div>

          {journeySteps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.number} className="relative flex items-center gap-4 sm:gap-6">
                {/* Number Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center text-blue-600 font-extrabold text-sm sm:text-base z-10 flex-shrink-0">
                  {step.number}
                </div>

                {/* Step Content Card */}
                <div className="flex-1 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0 mt-0.5">
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
