"use client";

import { motion } from "framer-motion";

export default function SurpriseModal({ blog, onClose }) {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-md rounded-2xl bg-slate-950 border border-white/10 p-6 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
          Recommended for you
        </p>

        <h2 className="mt-3 text-xl font-bold text-slate-100">
          You should watch:
        </h2>

        <p className="mt-2 text-lg text-teal-400 font-semibold">
          {blog.title}
        </p>

        <p className="mt-4 text-sm text-slate-400">
          Based on the blogs you explored and your interest in{" "}
          {blog.anime.genres.join(", ")}, this anime aligns perfectly with your
          taste.
        </p>

        <button
          onClick={onClose}
          className="mt-6 rounded-full bg-teal-400 px-6 py-2 text-xs uppercase tracking-[0.3em] text-slate-900"
        >
          Explore More
        </button>
      </motion.div>
    </div>
  );
}
