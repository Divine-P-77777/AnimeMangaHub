"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";

export default function DiscoverPage() {
    const [loading, setLoading] = useState(true);
    const [metadata, setMetadata] = useState({ genres: [], ratings: [] });
    const [formData, setFormData] = useState({
        episodes: "",
        members: "",
        favorites: "",
        rating: "",
        genres: [],
    });
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [predicting, setPredicting] = useState(false);

    // Fetch metadata (genres, ratings) on mount
    useEffect(() => {
        async function fetchMetadata() {
            try {
                const res = await fetch("http://localhost:8000/metadata");
                if (!res.ok) throw new Error("Failed to load metadata");
                const data = await res.json();
                setMetadata(data);
                if (data.ratings.length > 0) {
                    setFormData((prev) => ({ ...prev, rating: data.ratings[0] }));
                }
            } catch (err) {
                setError("Could not connect to backend. Ensure server is running on port 8000.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMetadata();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenreToggle = (genre) => {
        setFormData((prev) => {
            const current = prev.genres;
            if (current.includes(genre)) {
                return { ...prev, genres: current.filter((g) => g !== genre) };
            } else {
                return { ...prev, genres: [...current, genre] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPredicting(true);
        setPrediction(null);
        setError(null);

        try {
            const payload = {
                episodes: Number(formData.episodes) || 0,
                members: Number(formData.members) || 0,
                favorites: Number(formData.favorites) || 0,
                rating: formData.rating,
                genres: formData.genres,
            };

            const res = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Prediction failed");
            const data = await res.json();
            setPrediction(data.predicted_score);
        } catch (err) {
            setError("Error getting prediction. Check console.");
            console.error(err);
        } finally {
            setPredicting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-slate-100 flex flex-col">
            <Navbar />

            <section className="relative flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4">
                {/* Background Effects */}
                <div className="pointer-events-none absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-teal-900/20 to-transparent blur-3xl opacity-50" />

                <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 items-start">

                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-teal-300">
                                AI Powered Analysis
                            </p>
                            <h1 className="text-3xl md:text-5xl font-extrabold mt-2 text-white">
                                Predict Success
                            </h1>
                            <p className="mt-2 text-slate-400 text-sm">
                                Enter your anime's parameters to estimate its MAL score.
                            </p>
                        </div>

                        {loading ? (
                            <div className="p-8 border border-white/10 rounded-2xl bg-white/5 animate-pulse text-center text-sm text-slate-400">
                                Connecting to Neural Interface...
                            </div>
                        ) : error && !metadata.ratings.length ? (
                            <div className="p-4 border border-red-500/50 rounded-xl bg-red-900/20 text-red-200 text-sm">
                                {error}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                                {/* Stats Inputs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Episodes</label>
                                        <input
                                            type="number"
                                            name="episodes"
                                            value={formData.episodes}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none transition-colors"
                                            placeholder="e.g. 12"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Members</label>
                                        <input
                                            type="number"
                                            name="members"
                                            value={formData.members}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none transition-colors"
                                            placeholder="e.g. 50000"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Favorites</label>
                                        <input
                                            type="number"
                                            name="favorites"
                                            value={formData.favorites}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none transition-colors"
                                            placeholder="e.g. 1000"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Rating</label>
                                        <select
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none transition-colors pr-8"
                                            required
                                        >
                                            {metadata.ratings.map((r) => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Genre Select */}
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Top Genres</label>
                                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                        {metadata.genres.map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => handleGenreToggle(g)}
                                                className={`text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-full border transition-all duration-200 ${formData.genres.includes(g)
                                                        ? "bg-teal-500 text-black border-teal-500 font-bold shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                                                        : "bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white"
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={predicting}
                                        className="w-full relative group overflow-hidden rounded-xl bg-teal-500 py-3 text-sm font-bold uppercase tracking-widest text-black transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative">{predicting ? "Analyzing..." : "Calculate Score"}</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>

                    {/* Right Column: Results */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-full min-h-[400px] flex flex-col justify-center"
                    >
                        {/* Visual Decor */}
                        <div className="absolute inset-0 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-sm -z-10" />

                        <div className="p-8 text-center space-y-6">
                            {prediction !== null ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    key={prediction}
                                >
                                    <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">Predicted MAL Score</p>
                                    <div className="relative inline-block">
                                        <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter">
                                            {prediction.toFixed(2)}
                                        </div>
                                        {/* Ring Glow */}
                                        <div className="absolute -inset-10 bg-teal-500/20 blur-[60px] rounded-full z-[-1]" />
                                    </div>

                                    <div className="mt-8 flex justify-center gap-4">
                                        <div className="text-left px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                            <p className="text-[10px] text-slate-500 uppercase">Quality</p>
                                            <p className={`text-lg font-bold ${prediction > 7.5 ? "text-teal-400" : prediction > 5 ? "text-yellow-400" : "text-red-400"}`}>
                                                {prediction > 8 ? "Masterpiece" : prediction > 7.5 ? "Very Good" : prediction > 6 ? "Good" : "Average"}
                                            </p>
                                        </div>
                                        <div className="text-left px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                            <p className="text-[10px] text-slate-500 uppercase">Input Genres</p>
                                            <p className="text-lg font-bold text-white">{formData.genres.length}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-slate-600 space-y-4">
                                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-slate-700 animate-spin-slow opacity-50" />
                                    <p className="text-sm font-mono tracking-wider">AWAITING INPUT DATA...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                </div>
            </section>
        </main>
    );
}
