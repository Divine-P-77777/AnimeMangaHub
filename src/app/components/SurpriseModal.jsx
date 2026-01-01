"use client";

import { motion } from "framer-motion";
import BLOGS from "@/constants/index";
import { Search } from "lucide-react";

export default function SurpriseModal({ prediction, onClose, onRead }) {
  if (!prediction) return null;

  // ✅ SAFE title normalization
  const title =
    typeof prediction?.title === "string"
      ? prediction.title
      : typeof prediction?.title_english === "string"
        ? prediction.title_english
        : "";

  // ✅ SAFE fuzzy match (no runtime crash)
  const matchedBlog =
    title.length > 0
      ? BLOGS.find(
        (b) =>
          typeof b?.title === "string" &&
          b.title.toLowerCase().includes(title.toLowerCase())
      )
      : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-white/10 overflow-hidden shadow-2xl"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-teal-500/20 blur-[100px]" />

        <div className="relative p-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300 mb-6">
            AI Recommendation
          </p>

          <h2 className="text-2xl font-black text-slate-100">
            You should watch
          </h2>

          <h3 className="mt-4 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-400">
            {title || "A Hidden Anime Gem"}
          </h3>

          {typeof prediction?.score === "number" && (
            <p className="mt-2 text-sm text-slate-400">
              Predicted score:{" "}
              <span className="text-teal-400 font-bold">
                {prediction.score.toFixed(2)}
              </span>
            </p>
          )}

          <div className="mt-6 bg-white/5 rounded-2xl p-5 border border-white/5">
            <p className="text-sm text-slate-300">
              {prediction.reason ||
                "Based on your recent reading behavior and preferences."}
            </p>

            {matchedBlog ? (
              <p className="mt-2 text-teal-400 font-medium">
                We already have a detailed blog on this ✨
              </p>
            ) : (
              <p className="mt-2 text-slate-400 italic">
                Not in our blog catalog yet — explore externally.
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 text-xs uppercase tracking-widest hover:bg-white/5"
            >
              Close
            </button>

            {matchedBlog ? (
              <button
                onClick={() => {
                  onRead(matchedBlog);
                  onClose();
                }}
                className="px-8 py-3 rounded-xl bg-teal-400 text-slate-900 text-xs uppercase tracking-widest font-bold hover:bg-teal-300 hover:scale-105 transition-all"
              >
                Read Blog
              </button>
            ) : title ? (
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                      title + " anime"
                    )}`,
                    "_blank"
                  )
                }
                className="px-8 py-3 rounded-xl bg-white/10 text-slate-200 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-white/20"
              >
                <Search className="w-4 h-4" />
                Search Google
              </button>
            ) : null}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
