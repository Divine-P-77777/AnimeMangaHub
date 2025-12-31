
"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { motion } from "framer-motion";

export default function RecommendPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    useEffect(() => {
        async function fetchRecommendation() {
            try {
                const res = await fetch("/recommend");
                if (!res.ok) throw new Error("Failed to fetch recommendation");
                const data = await res.json();
                setRecommendation(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecommendation();
    }, []);

    return (
        <main className="min-h-screen bg-black text-slate-100 flex flex-col">
            <Navbar />
            <section className="flex-1 flex items-center justify-center p-8">
                {loading ? (
                    <div className="text-slate-400">Loading recommendation...</div>
                ) : error ? (
                    <div className="text-red-400">{error}</div>
                ) : (
                    {
                        recommendation?(
                        <motion.div
                            initial={{opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full glassmorphism hover:shadow-lg transition-shadow duration-300"
                        >
                <h2 className="text-2xl font-bold mb-4 text-teal-300">{recommendation.title_english ?? 'Untitled'}</h2>
                <p className="mb-2"><strong>Status:</strong> {recommendation.status ?? 'Unknown'}</p>
                <p className="mb-2"><strong>Episodes:</strong> {recommendation.episodes ?? 'N/A'}</p>
                <p className="mb-2"><strong>Rating:</strong> {recommendation.rating ?? 'N/A'}</p>
                <p className="mb-2"><strong>Score:</strong> {recommendation.score ?? 'N/A'} (by {recommendation.scored_by ?? '0'} users)</p>
                <p className="mb-2"><strong>Genres:</strong> {(recommendation.genres || []).join(', ')}</p>
                <p className="mb-2"><strong>Themes:</strong> {(recommendation.themes || []).join(', ')}</p>
                <p className="mb-2"><strong>Demographics:</strong> {(recommendation.demographics || []).join(', ')}</p>
            </motion.div>
            ) : (
            <div className="text-slate-400">No recommendation available at the moment.</div>
                    )}
                )}
        </section>
        </main >
    );
}
