"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function loadBlogs() {
      // later replace with FastAPI call
      const res = await import("@/constants/index");
      setBlogs(res.default.slice(0, 6)); // show top 6
    }

    loadBlogs();
  }, []);

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-teal-300/80">
            ANIME BLOG VERSE
          </p>
          <h2 className="mt-3 text-2xl font-bold text-slate-50 md:text-3xl lg:text-4xl">
            Read before you watch
          </h2>
          <p className="mt-3 max-w-xl text-sm text-slate-400">
            Insights, themes, and hidden gems crafted to guide your next anime
            journey.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl"
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  <button className="text-[11px] uppercase tracking-[0.25em] text-teal-300 hover:text-teal-200">
                    Read Blog →
                  </button>
                  <span className="text-[10px] text-slate-500">
                    {blog.readTime || "4 min read"}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Surprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-teal-300/80">
            Feeling confused?
          </p>
          <h3 className="mt-3 text-xl font-bold text-slate-100 md:text-2xl">
            Let the system surprise you 🎲
          </h3>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Based on what you’ve explored, we’ll suggest an anime worth your
            time — even if it’s not trending.
          </p>

          <button className="mt-6 rounded-full bg-teal-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 hover:bg-teal-300">
            Surprise Me
          </button>
        </motion.div>
      </div>
    </section>
  );
}
