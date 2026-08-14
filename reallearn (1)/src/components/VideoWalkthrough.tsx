import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward, CheckCircle, Sparkles, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptItem, VideoWalkthroughFrame } from '../types';

interface Props {
  concept: ConceptItem;
}

export function VideoWalkthrough({ concept }: Props) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const defaultFrames: VideoWalkthroughFrame[] = concept.videoWalkthrough || [
    {
      id: 1,
      title: '1. The Core Concept',
      caption: `Understanding ${concept.title}: The core principle defined through physical mechanics.`,
      graphicType: 'analogy',
      illustrationDetails: {
        heading: concept.title,
        subheading: concept.story.analogyObject,
        items: [
          concept.tagline,
          `Category: ${concept.category}`,
          `Key Principle: ${concept.interactiveVisual.keyTakeaways[0] || 'Order of Execution'}`
        ],
        accentColor: '#3b82f6',
      },
    },
    {
      id: 2,
      title: '2. Physical Analogy in Action',
      caption: concept.story.description,
      graphicType: 'diagram',
      illustrationDetails: {
        heading: 'Real-World Metaphor',
        subheading: concept.story.analogyObject,
        items: concept.story.steps?.map((s) => `${s.title}: ${s.detail}`) || [
          'Step 1: Input Trigger',
          'Step 2: Processing Flow',
          'Step 3: Output Completion'
        ],
        accentColor: '#8b5cf6',
      },
    },
    {
      id: 3,
      title: '3. Rules & Edge Cases',
      caption: `Key invariant: ${concept.interactiveVisual.keyTakeaways[1] || 'Consistent state transition'}`,
      graphicType: 'animation',
      illustrationDetails: {
        heading: 'Essential Rules',
        subheading: 'What happens behind the scenes',
        items: concept.interactiveVisual.keyTakeaways,
        accentColor: '#10b981',
      },
    },
    {
      id: 4,
      title: '4. Real-World Applications',
      caption: `Where you encounter this everyday: ${concept.interactiveVisual.realWorldApplications?.map(a => a.title).join(', ') || 'Modern Computing'}`,
      graphicType: 'diagram',
      illustrationDetails: {
        heading: 'Everyday Impact',
        subheading: 'Practical implementations',
        items: concept.interactiveVisual.realWorldApplications?.map(a => `${a.title} - ${a.desc}`) || [
          'High throughput systems',
          'Sequential request handling',
          'Reliable everyday services'
        ],
        accentColor: '#f59e0b',
      },
    },
  ];

  const currentFrame = defaultFrames[currentFrameIndex] || defaultFrames[0];
  const totalFrames = defaultFrames.length;

  // Frame timer & progress scrubber
  useEffect(() => {
    if (!isPlaying) return;

    const frameDuration = (4000 / playbackSpeed);
    const intervalTime = 50;
    const stepIncrement = (intervalTime / frameDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next frame
          if (currentFrameIndex < totalFrames - 1) {
            setCurrentFrameIndex((curr) => curr + 1);
            return 0;
          } else {
            // Loop or stop
            setCurrentFrameIndex(0);
            return 0;
          }
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentFrameIndex, totalFrames, playbackSpeed]);

  // Speech narration when frame changes if not muted
  useEffect(() => {
    if (isMuted || !isPlaying) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentFrame.caption);
      utterance.rate = playbackSpeed;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentFrameIndex, isMuted, isPlaying, playbackSpeed]);

  const togglePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setCurrentFrameIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleSpeedToggle = () => {
    setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  return (
    <div className="bg-slate-950 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-xl space-y-4 overflow-hidden">
      {/* Video Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
              Animated Visual Walkthrough
              <span className="text-[10px] font-mono bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/30 uppercase">
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Scene {currentFrameIndex + 1} of {totalFrames}</span>
        </div>
      </div>

      {/* Video Screen / Canvas Viewport */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Ambient background glow */}
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: currentFrame.illustrationDetails.accentColor }}
        />

        {/* Scene Title / Category */}
        <div className="flex items-center justify-between z-10">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {currentFrame.title}
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${currentFrame.illustrationDetails.accentColor}20`,
              color: currentFrame.illustrationDetails.accentColor,
              border: `1px solid ${currentFrame.illustrationDetails.accentColor}40`
            }}
          >
            {currentFrame.illustrationDetails.subheading}
          </span>
        </div>

        {/* Dynamic Animated Scene Graphic */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame.id}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="my-auto text-center space-y-3 z-10 px-2"
          >
            <h3
              className="text-xl sm:text-2xl font-extrabold tracking-tight"
              style={{ color: currentFrame.illustrationDetails.accentColor }}
            >
              {currentFrame.illustrationDetails.heading}
            </h3>

            {/* Scene Elements / Steps */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
              {currentFrame.illustrationDetails.items.slice(0, 3).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/80 text-xs font-medium text-slate-200 shadow-md flex items-center gap-2"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentFrame.illustrationDetails.accentColor }}
                  />
                  <span className="text-left line-clamp-1">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Subtitle / Caption Bar */}
        <div className="z-10 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <p className="truncate font-sans font-medium text-slate-300">
            {currentFrame.caption}
          </p>
        </div>
      </div>

      {/* Multi-Segment Timeline Scrubber */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {defaultFrames.map((frame, idx) => {
            const isDone = idx < currentFrameIndex;
            const isCurrent = idx === currentFrameIndex;

            return (
              <div
                key={frame.id}
                onClick={() => {
                  setCurrentFrameIndex(idx);
                  setProgress(0);
                }}
                className="h-1.5 rounded-full bg-slate-800 overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-blue-500 transition-all duration-75"
                  style={{
                    width: isDone ? '100%' : isCurrent ? `${progress}%` : '0%',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Frame Jump Pills */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
          {defaultFrames.map((f, i) => (
            <button
              key={f.id}
              onClick={() => {
                setCurrentFrameIndex(i);
                setProgress(0);
              }}
              className={`hover:text-slate-300 transition-colors cursor-pointer ${
                i === currentFrameIndex ? 'text-blue-400 font-bold' : ''
              }`}
            >
              Step {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Video Controls Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={handleRestart}
            className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center border border-slate-800 transition-colors cursor-pointer"
            title="Restart Video"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSpeedToggle}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-800 transition-colors cursor-pointer"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-slate-900 text-slate-500 border-slate-800'
                : 'bg-slate-900 text-blue-400 border-blue-500/40'
            }`}
            title={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="hidden sm:block text-[11px] text-slate-400 font-mono">
            Auto-Guided Walkthrough
          </div>
        </div>
      </div>
    </div>
  );
}
