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

      {/* dummy section for scroll testing */}
       <motion.section
        className="relative w-full bg-black py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background glow / phonk blob */}
        <div className="pointer-events-none absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:px-6">
          {/* Heading Row */}
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">
                ANIME BLOG VERSE
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-50 md:text-3xl lg:text-4xl">
                Dive deeper into the multiverse of stories
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-400">
                Hand-picked entries from your featured timeline. Neon-soaked streets,
                broken timelines, and the characters who refuse to fade out.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-teal-300/70 bg-teal-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal-100 backdrop-blur-xl hover:bg-teal-300/20"
            >
              View All Blogs
            </motion.button>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-5 md:grid-cols-3">
            {promoBlogs.map((blog, index) => (
              <motion.article
                key={blog.title}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl"
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="space-y-3 px-4 py-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-teal-300/80">
                    {blog.tag || "Featured"}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-50">
                    {blog.title}
                  </h3>
                  <p className="line-clamp-3 text-xs text-slate-400">
                    {blog.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <button className="text-[11px] uppercase tracking-[0.25em] text-teal-300/90 group-hover:text-teal-200">
                      Read Blog
                    </button>

                    <span className="text-[10px] text-slate-500">
                      {blog.readTime || "4 min read"}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="min-h-screen">
<div className="h-screen flex items-center justify-center bg-[#0c0013] ">
    <p className="text-7xl"> LENIS SCROLL EFFECT</p>
</div>
      </section>
    </>
  );
}
