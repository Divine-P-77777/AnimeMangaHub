"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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



export default function SurpriseModal({
  prediction,
  onClose,
  onRead,
  onManualSearch,
  isLoading = false
}) {
  const [isManual, setIsManual] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState(TYPES[1]);

  // Reset form state when closing
  const handleClose = useCallback(() => {
    setIsManual(false);
    setSelectedGenres([]);
    setSelectedType(TYPES[1]);
    onClose();
  }, [onClose]);

  // Handle scroll lock on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle prediction changes
  useEffect(() => {
    if (prediction?.manualMode) {
      setIsManual(true);
    } else if (prediction) {
      setIsManual(false);
    }
  }, [prediction]);

  // Handle manual search
  const handleSearch = () => {
    if (selectedGenres.length === 0) return;

    onManualSearch({
      genres: selectedGenres,
      preferred_episodes: selectedType.value,
      type: selectedType.type,
      top_n: 10
    });
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
      ? BLOGS.find(b =>
        typeof b?.title === "string" &&
        b.title.toLowerCase().includes(title.toLowerCase())
      )
      : null;

    return (
      <div className="relative p-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300 mb-6 flex justify-center items-center gap-2">
          <Sparkles className="w-3 h-3 animate-pulse" />
          AI Recommendation
        </p>

        <h2 className="text-xl font-medium text-slate-400 mb-6">You should watch</h2>

        <h3 className="mt-4 text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-teal-400 to-emerald-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)] mb-4">
          {title || "A Hidden Anime Gem"}
        </h3>

        {typeof prediction?.score === "number" && (
          <div className="mb-8 text-sm text-slate-400 flex justify-center items-center gap-2">
            <span>Match Score:</span>
            <span className="text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              {prediction.score.toFixed(2)}%
            </span>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8 shadow-lg">
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {prediction.reason || "Based on your preferences, this seems like a perfect fit."}
          </p>

          {matchedBlog ? (
            <div className="space-y-3">
              <p className="text-teal-400 text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                Editor's Breakdown Available
              </p>
              <button
                onClick={() => {
                  onRead(matchedBlog);
                  handleClose();
                }}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-teal-500/20 to-teal-400/20 border border-teal-400/30 text-teal-300 font-bold hover:from-teal-500 hover:to-teal-400 hover:border-teal-300 hover:text-teal-100 backdrop-blur-sm transition-all shadow-lg hover:shadow-teal-400/20"
              >
                Read Full Blog Review →
              </button>
            </div>
          ) : (
            <button
              onClick={() => window.open(`https://myanimelist.net/anime.php?q=${encodeURIComponent(title)}`, "_blank")}
              className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/20 text-slate-300 font-bold hover:bg-white/10 hover:border-white/30 backdrop-blur-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Search className="w-4 h-4" />
              Find on MyAnimeList
            </button>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 flex gap-4 justify-center">
          <button
            onClick={() => setIsManual(true)}
            className="group text-xs text-slate-400 uppercase tracking-widest font-medium hover:text-teal-300 flex items-center gap-1 transition-all p-2 -m-2 rounded-lg hover:bg-white/5"
          >
            <SlidersHorizontal className="w-3 h-3 group-hover:rotate-12 transition-transform" />
            Customize Search
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className="relative p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/50 backdrop-blur-sm pb-4 z-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Manual Discovery
          </p>
          <p className="text-xs text-slate-500 mt-1">Pick your perfect anime</p>
        </div>
        <button
          onClick={handleClose}
          className="p-2 text-slate-400 hover:text-teal-300 hover:bg-white/10 rounded-xl transition-all group"
        >
          <X className="w-5 h-5 group-hover:rotate-90" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Type Selector */}
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-3 flex items-center gap-1">
            Preferred Length
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {TYPES.map(t => (
              <button
                key={t.label}
                onClick={() => setSelectedType(t)}
                className={`p-3 rounded-xl border-2 transition-all group hover:shadow-md backdrop-blur-sm ${selectedType.label === t.label
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 border-teal-500 text-black font-bold shadow-lg shadow-teal-400/25"
                  : "bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/30 hover:text-teal-300"
                  }`}
              >
                <div className="text-xs font-bold">{t.label}</div>
                <div className="text-[10px] opacity-75">{t.type}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Genre Selector */}
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-widest block mb-3 flex items-center gap-1">
            Genres <span className="text-teal-400 font-bold">({selectedGenres.length})</span>
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar pb-2">
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => toggleGenre(g)}
                className={`text-xs px-4 py-2 rounded-full border font-medium transition-all whitespace-nowrap ${selectedGenres.includes(g)
                  ? "bg-teal-500 text-black border-teal-500 shadow-md hover:shadow-lg transform scale-105"
                  : "bg-white/5 border-white/20 text-slate-400 hover:bg-white/10 hover:border-teal-400/50 hover:text-teal-300 hover:shadow-md"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || selectedGenres.length === 0}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-black font-black uppercase tracking-[0.1em] text-sm shadow-2xl hover:shadow-teal-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100 transition-all backdrop-blur-sm border border-teal-400/20"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <RotateCw className="w-4 h-4 animate-spin" />
              Analyzing Preferences...
            </div>
          ) : (
            `Find My Anime (${selectedGenres.length} genres)`
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      {/* Overlay click to close */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-slate-950/95 via-black/80 to-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden max-h-[90vh]"
      >
        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-teal-500/10 to-transparent blur-[80px] pointer-events-none" />

        {/* Global Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-50 p-3 text-slate-400 hover:text-teal-300 hover:bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg transition-all group hover:scale-110 hover:rotate-3"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>

        {isManual ? renderForm() : renderResult()}
      </motion.div>
    </div>
  );
}
