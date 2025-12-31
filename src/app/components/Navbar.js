"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [homeOpen, setHomeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for blur bg
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* Blur glass bar after scroll ( \_____/ feel with rounded-full ) */}
        <div
          className={`flex items-center justify-between px-4 py-1 transition-all duration-300`}
        >
          {/* Logo / Brand - left */}
          <div className={`flex items-center gap-2 p-1  ${scrolled
            ? "rounded-full border border-white/10 bg-white-950/70 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
            : ""
            } `}>
            <div className="h-8 w-8 rounded-full border border-teal-300/70" >

              <img src="/logo.png" className="rounded-full w-10 " alt="Logo" />            </div>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-teal-100">
              Anime Blog
            </span>
          </div>

          {/* Links - right */}
          <nav className={`hidden gap-8 px-2 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-100 md:flex   ${scrolled
            ? "rounded-full border border-white/10 bg-white-950/70 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.7)]"
            : ""
            } `}>
            {/* Home with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setHomeOpen(true)}
              onMouseLeave={() => setHomeOpen(false)}
            >
              <button
                type="button"
                onClick={() => setHomeOpen((prev) => !prev)}
                className="flex items-center gap-1 rounded-full px-3 py-1.5 transition-all duration-300 hover:bg-teal-400/10 hover:text-teal-300"
              >
                <span>Home</span>
                <span
                  className={`text-[9px] mt-[1px] transition-transform duration-300 ${homeOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                  ▾
                </span>
              </button>

              {/* Dropdown */}
              {homeOpen && (
                <div className="absolute z-50 right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-white-950/95 p-2 shadow-2xl backdrop-blur-xl origin-top-right">
                  <Link
                    href="/about"
                    className="block rounded-xl px-3 py-2 text-[11px] tracking-[0.16em] text-slate-200 hover:bg-white-400/10 hover:text-teal-300 transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="block rounded-xl px-3 py-2 text-[11px] tracking-[0.16em] text-slate-200 hover:bg-white-400/10 hover:text-teal-300 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/admin"
                    className="block rounded-xl px-3 py-2 text-[11px] tracking-[0.16em] text-amber-300 hover:bg-amber-400/10 hover:text-amber-200 transition-colors"
                  >
                    Admin Login
                  </Link>
                </div>
              )}
            </div>

            {/* Other tabs */}
            <button className="hover:text-teal-300">Blogs</button>
            <button className="hover:text-teal-300">Discover Anime</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
