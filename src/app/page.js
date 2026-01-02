"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import BlogSection from "./components/BlogSection";
import Footer from "@/app/components/Footer";
import SurpriseModal from "@/app/components/SurpriseModal";
import { getRecommendation } from "@/services/recommendation";

export default function HomePage() {
  const [predictions, setPredictions] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <Hero
        title="Don't Just Watch. Discover."
        description="Your ultimate destination for in-depth anime reviews."
        onSurprise={() => setShowSurprise(true)}
      />

      <BlogSection
        onSurprise={(results) => {
          setPredictions(results);
          setShowSurprise(true);
        }}
      />

      {showSurprise && (
        <SurpriseModal
          predictions={predictions}
          onClose={() => setShowSurprise(false)}
          onRead={(blog) => setActiveBlog(blog)}
          onManualSearch={async (criteria) => {
            const results = await getRecommendation(criteria);
            setPredictions(results);
          }}
        />
      )}

      <Footer />
    </main>
  );
}
