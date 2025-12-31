"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BLOGS from "@/constants/index";
import { motion } from "framer-motion";  

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const activeBlog = BLOGS[activeIndex];
  const shortDesc =
    activeBlog.description.length > 40
      ? activeBlog.description.slice(0, 37).trimEnd() + "..."
      : activeBlog.description;

  // Auto-switch every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BLOGS.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Thoda clamp kar diya for stability
      const y = Math.min(window.scrollY, 600);
      setScrollY(y);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax factors
  const bgOffset = scrollY * 0.2;      // slow
  const contentOffset = scrollY * 0.1; // even slower
  const controlsOffset = scrollY * 0.15;


    const promoBlogs = BLOGS.slice(0, 3); // top 3 promote


  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background anime cover (fade between slides) */}
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{ transform: `translateY(${bgOffset}px)` }}
        >
          {BLOGS.map((blog, index) => (
            <div
              key={blog.title}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Global dark overlay (moves very slightly for depth) */}
        <div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70 will-change-transform"
          style={{ transform: `translateY(${bgOffset * 0.6}px)` }}
        />

        {/* Right side phonk-ish black + neon gradient */}
        <div className="absolute inset-y-0 right-0 z-20 w-full md:w-1/2 bg-gradient-to-l from-black/95 via-black/85 to-transparent" />

        {/* Content on right */}
        <div className="relative z-30 mx-auto flex min-h-screen max-w-6xl items-center px-4 md:px-6">
          <div
            className="ml-auto max-w-md space-y-6 text-slate-100 will-change-transform"
            style={{ transform: `translateY(${contentOffset * -0.3}px)` }} // thoda upar float feel
          >
            <p className="text-xs uppercase tracking-[0.3em] text-teal-300/80">
              Featured Blog
            </p>

            {/* Animated title / desc */}
            <div className="space-y-3 transition-all duration-500 ease-out">
              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                {activeBlog.title}
              </h1>

              <p className="text-sm text-slate-300">{shortDesc}</p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-full border border-teal-300/80 bg-black/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-100 backdrop-blur-xl hover:bg-teal-300/10">
                Explore Blog
              </button>

              <button className="flex items-center gap-2 rounded-full bg-teal-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 hover:bg-teal-300">
                Anime Watch Recs
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] text-teal-300">
                  ▶
                </span>
              </button>
            </div>

            <p className="pt-4 text-[10px] uppercase tracking-[0.25em] text-slate-400">
              Stay alert and be ready
            </p>
          </div>
        </div>

        {/* Bottom-left rectangular switch box */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex w-full -translate-x-1/2 justify-center px-4 md:left-6 md:translate-x-0 md:justify-start will-change-transform"
          style={{ transform: `translateY(${controlsOffset * -0.2}px)` }} // subtle float
        >
          <div className="pointer-events-auto flex max-w-xl gap-2 rounded-2xl p-2 backdrop-blur-xl border border-white/10 bg-black/60">
            {BLOGS.map((blog, index) => (
              <button
                key={blog.title}
                onClick={() => setActiveIndex(index)}
                className={`flex-1 rounded-xl px-3 py-2 text-left transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-teal-400/20 border border-teal-300/80"
                    : "bg-white/5 border border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-teal-300/80">
                  {index === activeIndex ? "Now Playing" : "Next Up"}
                </p>
                <p className="mt-1 line-clamp-1 text-xs font-semibold text-slate-100">
                  {blog.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>



    </>
  );
}
