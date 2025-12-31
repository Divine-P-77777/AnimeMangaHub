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
        title="Tokyo Rift: Memory Overdrive"
        description="Follow the last vanguard through a collapsing anime multiverse."
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
