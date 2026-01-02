"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BLOGS from "@/constants";
import {
  Sparkles,
  X,
  SlidersHorizontal,
  RotateCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------------------------------- DATA --------------------------------- */

const GENRES = [
  "Action", "Adventure", "Fantasy", "Sci-Fi", "Drama",
  "Mystery", "Romance", "Horror", "Supernatural", "Comedy",
  "Thriller", "Psychological",
];

const TYPES = [
  { label: "Movie", value: 1, type: "Movie" },
  { label: "Short", value: 12, type: "TV" },
  { label: "Medium", value: 26, type: "TV" },
  { label: "Long", value: 60, type: "TV" },
];

/* -------------------------------- COMPONENT ------------------------------- */

export default function SurpriseModal({
  predictions = [],
  onClose,
  onRead,
  onManualSearch,
  isLoading = false,
}) {
  const [isManual, setIsManual] = useState(false);
  const [isManualSearching, setIsManualSearching] = useState(false);

  const [index, setIndex] = useState(0);
  const [exploration, setExploration] = useState(0.3);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedType, setSelectedType] = useState(TYPES[1]);

  /* ------------------------------- EFFECTS -------------------------------- */

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  // Reset slider index on new results
  useEffect(() => {
    setIndex(0);

    // If these results came from manual search → exit manual mode
    if (isManualSearching && predictions.length > 0) {
      setIsManual(false);
      setIsManualSearching(false);
    }
  }, [predictions, isManualSearching]);

  /* ------------------------------- HANDLERS ------------------------------- */

  const handleClose = useCallback(() => {
    setIsManual(false);
    setIsManualSearching(false);
    setIndex(0);
    setSelectedGenres([]);
    setSelectedType(TYPES[1]);
    onClose?.();
  }, [onClose]);

  const next = () => setIndex((i) => Math.min(i + 1, predictions.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const toggleGenre = (g) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const handleManualSearch = () => {
    if (!selectedGenres.length || typeof onManualSearch !== "function") return;

    setIsManualSearching(true);

    onManualSearch({
      genres: selectedGenres,
      preferred_episodes: selectedType.value,
      type: selectedType.type,
      exploration,
      top_n: 5,
    });
  };

  if (!predictions.length && !isManual) return null;

  /* ---------------------------- RESULT VIEW ---------------------------- */

  const renderResults = () => {
    const anime = predictions[index];
    if (!anime) return null;

    const title = anime.display_title || anime.title || "Unknown Anime";

    const matchedBlog = BLOGS.find(
      (b) => b?.title?.toLowerCase().includes(title.toLowerCase())
    );

    return (
      <div className="p-8 text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300 flex justify-center gap-2">
          <Sparkles className="w-3 h-3 animate-pulse" />
          AI Surprise
        </p>

        <input
          type="range"
          min={0}
          max={100}
          value={exploration * 100}
          onChange={(e) => setExploration(e.target.value / 100)}
          className="w-full"
        />

        <motion.div
          key={anime.anime_id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6"
        >
          <h3 className="text-3xl font-black text-teal-300">{title}</h3>

          <p className="text-xs text-slate-400 mt-2">
            {anime.type} · {anime.episodes} episodes
          </p>

          <p className="text-xs text-slate-500 mt-2">
            {anime.genres.join(", ")}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            {matchedBlog ? (
              <button
                onClick={() => {
                  onRead(matchedBlog);
                  handleClose();
                }}
                className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300"
              >
                Read Blog →
              </button>
            ) : (
              <a
                href={`https://myanimelist.net/anime.php?q=${encodeURIComponent(
                  title
                )}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300"
              >
                View on MAL →
              </a>
            )}
          </div>
        </motion.div>

        <div className="flex justify-between items-center">
          <button onClick={prev} disabled={index === 0}>
            <ChevronLeft />
          </button>
          <span className="text-xs text-slate-500">
            {index + 1} / {predictions.length}
          </span>
          <button onClick={next} disabled={index === predictions.length - 1}>
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button onClick={() => setIsManual(true)}>
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button onClick={() => setIndex(0)}>
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  /* ---------------------------- MANUAL VIEW ---------------------------- */

  const renderForm = () => (
    <div className="p-8 space-y-6">
      <h3 className="text-sm uppercase tracking-widest text-teal-300">
        Manual Discovery
      </h3>

      <div className="flex flex-wrap gap-2">
        {GENRES.map((g) => (
          <button
            key={g}
            onClick={() => toggleGenre(g)}
            className={`px-3 py-1 text-xs rounded-full ${
              selectedGenres.includes(g)
                ? "bg-teal-500 text-black"
                : "bg-white/5 text-slate-400"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {TYPES.map((t) => (
          <button
            key={t.label}
            onClick={() => setSelectedType(t)}
            className={`p-2 rounded-xl ${
              selectedType.label === t.label
                ? "bg-teal-500 text-black"
                : "bg-white/5 text-slate-400"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleManualSearch}
        disabled={isLoading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-bold"
      >
        {isLoading ? "Finding Anime..." : "Find Anime"}
      </button>
    </div>
  );

  /* ------------------------------ RENDER ------------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <motion.div className="relative w-full max-w-md rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          {isManual ? (
            <button onClick={() => setIsManual(false)}>
              <ChevronLeft />
            </button>
          ) : (
            <span />
          )}

          <button onClick={handleClose}>
            <X />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isManual ? renderForm() : renderResults()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
