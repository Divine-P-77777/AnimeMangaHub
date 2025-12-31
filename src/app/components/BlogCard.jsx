"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trackClick, trackReadTime } from "@/lib/analytics";

export default function BlogCard({ blog, onRead }) {
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = Date.now();
    return () => {
      const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      trackReadTime(blog.id, seconds);
    };
  }, []);

  return (
    <article
      onClick={() => {
        trackClick(blog.id);
        onRead(blog);
      }}
      className="cursor-pointer group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="relative h-40">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-4 py-4 space-y-3">
        <p className="text-[10px] uppercase tracking-[0.3em] text-teal-300">
          {blog.tag}
        </p>
        <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-3">
          {blog.description}
        </p>
      </div>
    </article>
  );
}
