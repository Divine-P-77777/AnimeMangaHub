"use client";

import { useMemo, useState } from "react";
import BLOGS from "@/constants/index";
import BlogCard from "./BlogCard";
import SurpriseModal from "./SurpriseModal";
import BlogView from "./BlogView";
import { getRecommendation } from "@/services/recommendation";
import { Sparkles, Loader2 } from "lucide-react";

const PAGE_SIZE = 10;

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);

  // Recommendation Logic
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSurprise = async () => {
    setLoading(true);
    try {
      const result = await getRecommendation();

      if (!result) {
        // No history? Open manual mode immediately
        setRecommendation({ manualMode: true });
      } else {
        setRecommendation(result);
      }
    } catch (error) {
      console.error("Failed to get recommendation", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualSearch = async (criteria) => {
    setLoading(true);
    try {
      // criteria: { genres: [], preferred_episodes: int, type: str, top_n: 10 }
      const result = await getRecommendation(criteria);
      setRecommendation(result);
    } catch (error) {
      console.error("Manual search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(BLOGS.length / PAGE_SIZE);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return BLOGS.slice(start, start + PAGE_SIZE);
  }, [page, BLOGS.length]);

  return (
    <>
      {/* Section Heading */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-teal-400/80">
              Before You Watch
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-100 md:text-4xl">
              Explore Blogs
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-400">
              Deep dives, anime theories, manga breakdowns, and gaming-style
              editorials curated just for you.
            </p>
          </div>

          {/* Surprise Button */}
          <button
            id="surprise-me-btn"
            onClick={handleSurprise}
            disabled={loading}
            className="group relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(45,212,191,0.5)] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-black" />
            ) : (
              <Sparkles className="w-5 h-5 text-black" />
            )}
            <span className="text-xs uppercase tracking-[0.2em] text-black">Surprise Me</span>
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onRead={() => setSelectedBlog(blog)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border border-white/10 bg-black/60 px-5 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 backdrop-blur-xl transition hover:border-teal-300 hover:text-teal-300 disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-white/10 bg-black/60 px-5 py-2 text-xs uppercase tracking-[0.25em] text-slate-300 backdrop-blur-xl transition hover:border-teal-300 hover:text-teal-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </section>

      {/* Blog Details Modal */}
      <BlogView
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* Recommendation Modal */}
      <SurpriseModal
        prediction={recommendation}
        isLoading={loading}
        onClose={() => setRecommendation(null)}
        onRead={(blog) => setSelectedBlog(blog)}
        onManualSearch={handleManualSearch}
      />

    </>
  );
}
