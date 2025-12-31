// app/page.jsx
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import BlogSection from "./components/BlogSection";
import Footer from "@/app/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero
        title="Tokyo Rift: Memory Overdrive"
        description="Follow the last vanguard through a collapsing anime multiverse."
      />
      <BlogSection/>
      <Footer />
    </main>
  );
}
