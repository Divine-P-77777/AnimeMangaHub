"use client";
import BLOGS from "@/constants/index";
import BlogCard from "./BlogCard";
import SurpriseModal from "./SurpriseModal";
import { useState } from "react";

export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <>
      <section className="grid gap-5 md:grid-cols-3 px-6">
        {BLOGS.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onRead={(b) => setSelectedBlog(b)}
          />
        ))}
      </section>

      <SurpriseModal
        blog={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </>
  );
}
