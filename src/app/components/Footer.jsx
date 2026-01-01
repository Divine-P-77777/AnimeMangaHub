"use client";

import Link from "next/link";
import { Github, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-gradient-to-b from-black via-slate-950 to-black">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-32 bg-gradient-to-t from-teal-500/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold tracking-wide text-slate-100">
              Anime<span className="text-teal-400">Manga</span>Hub
            </h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Your daily dose of anime, manga & gaming culture.
              Read. Watch. Decode.
            </p>

            {/* Social */}
            <div className="flex gap-4 pt-2">
              <SocialIcon href="#" icon={<Twitter size={18} />} />
              <SocialIcon href="#" icon={<Instagram size={18} />} />
              <SocialIcon href="#" icon={<Youtube size={18} />} />
              <SocialIcon href="#" icon={<Github size={18} />} />
            </div>
          </div>

          {/* Explore */}
          <FooterColumn title="Explore">
            <FooterLink href="#">Anime Blogs</FooterLink>
            <FooterLink href="#">Manga Reviews</FooterLink>
            <FooterLink href="#">Gaming Articles</FooterLink>
            <FooterLink href="#">Watch Recommendations</FooterLink>
          </FooterColumn>

          {/* Community */}
          <FooterColumn title="Community">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Contributors</FooterLink>
            <FooterLink href="#">Join Discord</FooterLink>
            <FooterLink href="#">Feedback</FooterLink>
          </FooterColumn>

          {/* Legal */}
          <FooterColumn title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">DMCA</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs tracking-widest text-slate-500">
            © {new Date().getFullYear()} ANISCOUT. ALL RIGHTS RESERVED.
          </p>

          <p className="text-[10px] uppercase tracking-[0.35em] text-teal-400/70">
            Built for Otakus & Gamers 🎮
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------
   Reusable components
---------------------------------------------- */

function FooterColumn({
  title,
  children,
}) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-teal-300">
        {title}
      </h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-slate-400 transition hover:text-teal-300"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <Link
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-slate-300 transition hover:border-teal-400 hover:text-teal-300 hover:shadow-[0_0_20px_rgba(45,212,191,0.5)]"
    >
      {icon}
    </Link>
  );
}
