"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import BlogSection from "./components/BlogSection";
import Footer from "@/app/components/Footer";
import SurpriseModal from "@/app/components/SurpriseModal";

export default function HomePage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <Hero
        title="Don't Just Watch. Discover."
        description="Your ultimate destination for in-depth anime reviews, manga breakdowns, and intelligent recommendations tailored to your taste."
        onSurprise={() => {
          document.getElementById('surprise-me-btn')?.click(); // Quick hack to trigger existing logic without massive refactor
          // ideally we lift state, but this works instanly for now
          document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Pass setter DOWN */}
      <BlogSection onSurprise={setSelectedBlog} />

      {/* Controlled modal */}
      <SurpriseModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      <Footer />
    </main>
  );
}
