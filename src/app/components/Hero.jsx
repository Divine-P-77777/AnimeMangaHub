"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BLOGS from "@/constants/index";
import { motion, AnimatePresence } from "framer-motion";


const getRandomBlogs = (blogs, count = 5) => {
  const shuffled = [...blogs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const titleVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], 
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: 0.35 },
  },
};

const descVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12,
      duration: 0.45,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: { duration: 0.25 },
  },
};

export default function Hero() {
  const [featuredBlogs] = useState(() => getRandomBlogs(BLOGS, 5));
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const activeBlog = featuredBlogs[activeIndex];

  const shortDesc =
    activeBlog.description.length > 40
      ? activeBlog.description.slice(0, 37).trimEnd() + "..."
      : activeBlog.description;


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredBlogs.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [featuredBlogs.length]);


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(Math.min(window.scrollY, 600));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOffset = scrollY * 0.2;
  const contentOffset = scrollY * 0.1;
  const controlsOffset = scrollY * 0.15;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${bgOffset}px)` }}
      >
        {featuredBlogs.map((blog, index) => (
          <div
            key={blog.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
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

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-y-0 right-0 z-20 w-full md:w-1/2 bg-gradient-to-l from-black/95 via-black/85 to-transparent" />

      {/* Content */}
      <div className="relative z-30 mx-auto flex min-h-screen max-w-6xl items-center px-4 md:px-6">
        <div
          className="ml-auto max-w-md space-y-6 text-slate-100"
          style={{ transform: `translateY(${contentOffset * -0.3}px)` }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-teal-300/80">
            Featured Blog
          </p>

          {/* 🔥 Animated text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlog.title}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <motion.h1
                variants={titleVariants}
                className="text-3xl font-extrabold md:text-4xl lg:text-5xl"
              >
                {activeBlog.title}
              </motion.h1>

              <motion.p
                variants={descVariants}
                className="text-sm text-slate-300"
              >
                {shortDesc}
              </motion.p>
            </motion.div>
          </AnimatePresence>

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

      {/* Controls */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex w-full -translate-x-1/2 justify-center px-4 md:left-6 md:translate-x-0 md:justify-start"
        style={{ transform: `translateY(${controlsOffset * -0.2}px)` }}
      >
        <div className="pointer-events-auto flex max-w-xl gap-2 rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-xl">
          {featuredBlogs.map((blog, index) => (
            <button
              key={blog.title}
              onClick={() => setActiveIndex(index)}
              className={`flex-1 rounded-xl px-3 py-2 text-left transition-all ${
                index === activeIndex
                  ? "bg-teal-400/20 border border-teal-300/80"
                  : "bg-white/5 opacity-70 hover:opacity-100"
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
  );
}
