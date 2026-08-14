import { useState } from 'react';
import { ImageIcon, Maximize2, X, Sparkles, ExternalLink } from 'lucide-react';
import { ConceptImage } from '../types';

interface Props {
  images?: ConceptImage[];
  topicTitle: string;
}

export function TopicImagesGallery({ images, topicTitle }: Props) {
  const [selectedImage, setSelectedImage] = useState<ConceptImage | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-mono font-bold text-xs flex items-center justify-center">
            2
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight flex items-center gap-2">
              Visual Reference & Images
            </h3>
            <p className="text-[11px] text-slate-500">
              Photographs and illustrations illustrating {topicTitle} in reality
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {images.length} Visuals
        </span>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className="group relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-200">
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src =
                    `https://picsum.photos/seed/${encodeURIComponent(img.title)}/600/450`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" /> Tap to expand
                </span>
              </div>

              {img.tag && (
                <span className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/10">
                  {img.tag}
                </span>
              )}
            </div>

            {/* Caption Body */}
            <div className="p-3 bg-white space-y-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {img.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl space-y-4 p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-slate-100">
                  {selectedImage.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1 px-1">
              {selectedImage.tag && (
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                  {selectedImage.tag}
                </span>
              )}
              <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
