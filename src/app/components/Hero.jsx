"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BLOGS from "@/constants/index";
import { motion, AnimatePresence } from "framer-motion";

const getRandomBlogs = (blogs, count = 5) => {
  const shuffled = [...blogs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Hero({ title, description, onSurprise }) {
  const [featuredBlogs] = useState(() => getRandomBlogs(BLOGS, 5));
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const activeBlog = featuredBlogs[activeIndex];

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
      {/* Background Slider */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${bgOffset}px)` }}
      >
        {featuredBlogs.map((blog, index) => (
          <div
            key={blog.title}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? "opacity-100" : "opacity-0"
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

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      <div className="absolute inset-y-0 right-0 z-20 w-full md:w-1/2 bg-gradient-to-l from-black/95 via-black/80 to-transparent" />

      <div className="relative z-30 mx-auto flex min-h-screen max-w-7xl items-center px-4 md:px-6">
        <div
          className="ml-auto max-w-xl space-y-8 text-slate-100 text-right"
          style={{ transform: `translateY(${contentOffset * -0.3}px)` }}
        >
          <div className="space-y-4">
            <h1 className="text-3xl mt-10 font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                Stop
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
                Searching.
              </span>
              <span className="block text-teal-400 ">
                Start Watching.
              </span>
            </h1>

            <p className="ml-auto max-w-lg text-lg text-slate-400 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          {/* Glassy Buttons */}
          <div className="flex flex-wrap justify-end gap-4 pt-4">
            <button
              onClick={() =>
                document
                  .getElementById("latest-blogs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white
              bg-white/5 backdrop-blur-sm border border-white/20
              shadow-[0_0_30px_rgba(255,255,255,0.05)]
              transition-all hover:scale-105 hover:border-teal-400/50"
            >
              <span className="relative z-10">Read Reviews</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={onSurprise}
              className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest text-white
              bg-teal-400/5 backdrop-blur-sm border border-teal-400/30
              shadow-[0_0_40px_rgba(45,212,191,0.15)]
              transition-all hover:bg-teal-400/10 hover:scale-105"
            >
              <span>Get AI Suggestion</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-400 text-black
                shadow-[0_0_15px_rgba(45,212,191,0.6)]
                transition-transform group-hover:rotate-45">
                ✦
              </span>
            </button>
          </div>

          <div className="mt-12 flex justify-end items-center gap-4 opacity-70">
            <p className="text-[10px] uppercase tracking-widest text-right">
              Featured:{" "}
              <span className="text-teal-300 font-bold">
                {activeBlog.title}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex w-full -translate-x-1/2 justify-center px-4 md:left-6 md:translate-x-0 md:justify-start"
        style={{ transform: `translateY(${controlsOffset * -0.2}px)` }}
      >
        <div className="pointer-events-auto hidden md:flex max-w-xl gap-2 rounded-2xl
          bg-transparent backdrop-blur-sm border border-white/10
          shadow-[0_0_40px_rgba(0,0,0,0.6)] p-2">
          {featuredBlogs.map((blog, index) => (
            <button
              key={blog.title}
              onClick={() => setActiveIndex(index)}
              className={`flex-1 rounded-xl px-3 py-2 text-left transition-all
                ${index === activeIndex
                  ? "bg-teal-400/20 border border-teal-300/80 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
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

        <div className="pointer-events-auto flex md:hidden gap-2">
          {featuredBlogs.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all
                ${index === activeIndex
                  ? "bg-teal-400 scale-125 shadow-[0_0_10px_#2dd4bf]"
                  : "bg-white/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
