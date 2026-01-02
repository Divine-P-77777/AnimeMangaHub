"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { trackReadTime } from "@/lib/analytics";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function BlogView({ blog, onClose }) {
    const startTimeRef = useRef(null);
    const modalRef = useRef(null);

    function highlightNumbers(children) {
        if (typeof children === "string") {
            return children.split(/(\d+(\.\d+)?)/g).map((part, i) =>
                /\d/.test(part) ? (
                    <span key={i} className="text-cyan-400 font-semibold">
                        {part}
                    </span>
                ) : (
                    part
                )
            );
        }
        return children;
    }


    useEffect(() => {
        if (!blog) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        startTimeRef.current = Date.now();

        return () => {
            document.body.style.overflow = originalOverflow;
            const seconds = Math.round(
                (Date.now() - (startTimeRef.current ?? Date.now())) / 1000
            );
            trackReadTime(blog.id, seconds);
        };
    }, [blog]);


    if (!blog) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md
             flex items-center justify-center p-2 sm:p-4"
            onWheel={(e) => e.stopPropagation()}
        >

            <div
                ref={modalRef}
                className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh]
                rounded-2xl bg-gradient-to-br from-slate-900 via-black to-slate-900
                border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
                <header className="px-4 sm:px-6 py-4 border-b border-white/10 bg-black/60">
                    <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                            <span className="inline-block mb-2 px-3 py-1 text-[9px] sm:text-[10px]
                            uppercase tracking-[0.3em] rounded-full bg-teal-400/20 text-teal-300">
                                {blog.tag}
                            </span>

                            <h1 className="text-xl sm:text-3xl font-black text-slate-100 leading-snug">
                                {blog.title}
                            </h1>

                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-300">
                                {blog.description}
                            </p>

                            <p className="mt-1 text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">
                                {blog.readTime} • {blog.anime.episodes} eps •{" "}
                                {blog.anime.members.toLocaleString()} members
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 h-fit rounded-lg text-slate-400
                            hover:text-teal-300 hover:bg-white/10 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div
                    className="flex-1 overflow-y-auto overscroll-contain custom-scrollbar"
                    onWheelCapture={(e) => e.stopPropagation()}
                >

                    <div className="relative h-40 sm:h-56">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-[500px] mx-auto h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    <section className="px-4 sm:px-8 py-5 border-b border-white/5 bg-slate-900/40">
                        <div className="flex flex-wrap gap-5 text-sm">
                            <div>
                                <span className="block text-xs text-slate-400 uppercase">
                                    Rating
                                </span>
                                <span className="text-2xl font-bold text-teal-400">
                                    {blog.anime.rating}
                                </span>
                            </div>

                            <div>
                                <span className="block text-xs text-slate-400 uppercase">
                                    Episodes
                                </span>
                                <span className="font-semibold text-slate-200">
                                    {blog.anime.episodes}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {blog.anime.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="px-4 py-4 text-xs rounded-full
                                        bg-white/10 text-teal-200 border border-teal-400/30"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <article className="px-4 sm:px-8 py-8 max-w-3xl mx-auto">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                strong: ({ children }) => (
                                    <strong className="font-bold text-slate-100">
                                        {children}
                                    </strong>
                                ),

                                p: ({ children }) => (
                                    <p className="text-slate-300 leading-relaxed mb-4">
                                        {highlightNumbers(children)}
                                    </p>
                                ),

                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-black text-slate-100 mt-8 mb-3">
                                        {children}
                                    </h2>
                                ),
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </article>

                </div>

                <footer className="px-4 sm:px-6 py-3 border-t border-white/10 bg-black/60
                flex justify-between items-center">
                    <button className="px-5 py-2 rounded-xl border border-teal-400/30
                    text-teal-300 text-[10px] uppercase tracking-widest
                    hover:bg-teal-400/10 transition">
                        Share Blog
                    </button>

                    <span className="text-[9px] text-slate-500 uppercase tracking-widest hidden sm:block">
                        Scroll to read • ESC to close
                    </span>
                </footer>
            </div>
        </div>
    );
}
