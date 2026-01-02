"use client";

import { useMemo, useState } from "react";
import BLOGS from "@/constants/index";
import BlogCard from "./BlogCard";
import BlogView from "./BlogView";
import { Sparkles, Loader2 } from "lucide-react";
import { getRecommendation } from "@/services/recommendation";

const PAGE_SIZE = 10;

export default function BlogSection({ onSurprise }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSurprise = async () => {
    setLoading(true);
    try {
      const results = await getRecommendation();
      if (results && results.length > 0) {
        onSurprise(results); // 🔑 send UP
      }
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(BLOGS.length / PAGE_SIZE);

  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return BLOGS.slice(start, start + PAGE_SIZE);
  }, [page]);

  return (
    <>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-teal-400/80">
              Before You Watch
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-100">
              Explore Blogs
            </h2>
          </div>

          {/* ✅ SINGLE button (no nesting) */}
          <button
            onClick={handleSurprise}
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3 text-sm font-bold uppercase tracking-widest text-black hover:scale-105 transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Surprise Me
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onRead={() => setSelectedBlog(blog)}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span>Page {page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </section>

      <BlogView blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </>
  );
}
