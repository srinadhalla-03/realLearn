import { useState, useEffect } from 'react';
import { Mic, X, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
}

export function VoiceInputModal({ isOpen, onClose, onTranscript }: Props) {
  const [listening, setListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      setListening(false);
      setTranscript('');
      return;
    }

    // Check Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setListening(true);
      recognition.onresult = (event: any) => {
        const text = Array.from(event.results)
          .map((res: any) => res[0].transcript)
          .join('');
        setTranscript(text);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();

      return () => {
        try {
          recognition.stop();
        } catch (e) {}
      };
    } catch (e) {
      setSupported(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVoiceSubmit = () => {
    if (transcript.trim()) {
      onTranscript(transcript.trim());
      onClose();
    }
  };

  const sampleVoicePrompts = [
    'How do airplanes generate lift?',
    'What is a binary tree?',
    'How does blockchain work?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-5"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pulse Microphone Indicator */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="absolute inset-0 bg-blue-500 rounded-full"
          />
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg z-10">
            <Mic className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">
            {listening ? 'Listening...' : 'Speak your question'}
          </h3>
          <p className="text-xs text-slate-500">
            Ask any question (e.g., "How does GPS work?")
          </p>
        </div>

        {transcript ? (
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-900 text-sm font-medium">
            "{transcript}"
          </div>
        ) : (
          <div className="space-y-1.5 pt-2">
            <span className="text-[11px] text-slate-400 font-bold uppercase">Or try asking:</span>
            {sampleVoicePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  onTranscript(prompt);
                  onClose();
                }}
                className="w-full text-xs text-slate-700 hover:bg-slate-100 p-2 rounded-lg border border-slate-200 transition-colors text-left flex items-center justify-between"
              >
                <span>"{prompt}"</span>
                <Sparkles className="w-3 h-3 text-blue-500" />
              </button>
            ))}
          </div>
        )}

        {transcript && (
          <button
            onClick={handleVoiceSubmit}
            className="w-full py-3 rounded-xl bg-slate-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer"
          >
            Explain Visually →
          </button>
        )}
      </motion.div>
    </div>
  );
}
