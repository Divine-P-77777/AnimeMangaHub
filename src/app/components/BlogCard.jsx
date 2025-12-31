"use client";

import Image from "next/image";
import { trackClick } from "@/lib/analytics";

export default function BlogCard({ blog, onRead }) {
  return (
    <article
      onClick={() => {
        trackClick(blog.id);
        onRead();
      }}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-950/80 to-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.4)]"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-3 px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-teal-300">
          {blog.tag}
        </p>

        <h3 className="line-clamp-2 text-sm font-semibold text-slate-50 group-hover:text-teal-300 transition-colors">
          {blog.title}
        </h3>

        <p className="line-clamp-3 text-xs text-slate-400">
          {blog.description}
        </p>

        <span className="inline-block pt-2 text-[10px] uppercase tracking-[0.25em] text-slate-500 group-hover:text-teal-300 transition-colors">
          Read More →
        </span>
      </div>
    </article>
  );
}
