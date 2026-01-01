"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BLOGS from "@/constants/index";
import { Search, Sparkles, X, ChevronRight, SlidersHorizontal, RotateCw } from "lucide-react";

const GENRES = [
  "Action", "Adventure", "Fantasy", "Sci-Fi", "Drama",
  "Mystery", "Romance", "Horror", "Supernatural", "Comedy",
  "Thriller", "Psychological"
];

const TYPES = [
  { label: "Movie (1 Ep)", value: 1, type: "Movie" },
  { label: "Short (12 Eps)", value: 12, type: "TV" },
  { label: "Medium (26 Eps)", value: 26, type: "TV" },
  { label: "Long (60 Eps)", value: 60, type: "TV" },
  { label: "Web Series (100+)", value: 100, type: "TV" },
];

export default function SurpriseModal({ prediction, onClose, onRead, onManualSearch, isLoading }) {
  const [isManual, setIsManual] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState(TYPES[1]); // Default to Short

  // Effect: If prediction is actually a "manual mode request" (empty history), switch to manual automatically
  useEffect(() => {
    if (prediction?.manualMode) {
      setIsManual(true);
    } else if (prediction) {
      setIsManual(false);
    }
  }, [prediction]);

  const handleSearch = () => {
    onManualSearch({
      genres: selectedGenres,
      preferred_episodes: selectedType.value,
      type: selectedType.type,
      top_n: 10
    });
    // We stay in this component; parent will update 'prediction' prop with result
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  if (!prediction && !isManual) return null;

  // Render Helpers
  const renderResult = () => {
    if (!prediction || prediction.manualMode) return null;

    // Safe title extraction
    const title = typeof prediction?.title === "string"
      ? prediction.title
      : typeof prediction?.title_english === "string"
        ? prediction.title_english
        : "";

    const matchedBlog = title.length > 0
      ? BLOGS.find(b => typeof b?.title === "string" && b.title.toLowerCase().includes(title.toLowerCase()))
      : null;

    return (
      <div className="relative p-8 text-center animate-in fade-in zoom-in duration-300">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300 mb-6 flex justify-center items-center gap-2">
          <Sparkles className="w-3 h-3" />
          AI Recommendation
        </p>

        <h2 className="text-xl font-medium text-slate-400">You should watch</h2>

        <h3 className="mt-4 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
          {title || "A Hidden Anime Gem"}
        </h3>

        {typeof prediction?.score === "number" && (
          <div className="mt-2 text-sm text-slate-400 flex justify-center items-center gap-2">
            <span>Match Score:</span>
            <span className="text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              {prediction.score.toFixed(2)}%
            </span>
          </div>
        )}

        <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
          <p className="text-sm text-slate-300 leading-relaxed">
            {prediction.reason || "Based on your preferences, this seems like a perfect fit."}
          </p>

          {matchedBlog ? (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-teal-400 text-xs uppercase tracking-widest font-bold mb-2">Editor's Breakdown Available</p>
              <button
                onClick={() => { onRead(matchedBlog); onClose(); }}
                className="w-full py-3 rounded-xl bg-teal-400/10 border border-teal-400/50 text-teal-300 font-bold hover:bg-teal-400 hover:text-black transition-all"
              >
                Read Blog Review
              </button>
            </div>
          ) : (
            <button
              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(title + " anime")}`, "_blank")}
              className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-bold hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
            >
              <Search className="w-4 h-4" />
              Find to Watch
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex gap-4 justify-center">
          <button
            onClick={() => setIsManual(true)}
            className="text-xs text-slate-500 uppercase tracking-widest hover:text-teal-300 flex items-center gap-1 transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            Try Another Criteria
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className="relative p-8 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
          Manual Discovery
        </p>
        {prediction && !prediction.manualMode && (
          <button onClick={() => setIsManual(false)} className="text-slate-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Type Selector */}
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-3">Preferred Length</label>
          <div className="grid grid-cols-2 gap-2">
            {TYPES.map(t => (
              <button
                key={t.label}
                onClick={() => setSelectedType(t)}
                className={`text-xs p-2 rounded-lg border transition-all ${selectedType.label === t.label
                    ? "bg-teal-500/20 border-teal-500 text-teal-300"
                    : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Selector */}
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-3">
            Genres <span className="text-slate-600">({selectedGenres.length} selected)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`text-[10px] px-3 py-1.5 rounded-full border transition-all ${selectedGenres.includes(g)
                    ? "bg-teal-500 text-black border-teal-500 font-bold"
                    : "bg-black border-white/20 text-slate-400 hover:border-white/50"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={isLoading || selectedGenres.length === 0}
          className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-black uppercase tracking-widest hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]"
        >
          {isLoading ? "Analyzing..." : "Find Anime"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg rounded-3xl bg-black/90 border border-white/10 overflow-hidden shadow-2xl"
      >
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-teal-500/10 blur-[100px] pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-white bg-black/50 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isManual ? renderForm() : renderResult()}
      </motion.div>
    </div>
  );
}
