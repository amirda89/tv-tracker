"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="h-16 w-full px-margin md:px-margin-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <Link className="flex items-center gap-space-xs group" href="/">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(229,9,20,0.45)]">
              <span className="material-symbols-outlined text-on-primary-container text-[20px]">
                movie
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary-container group-hover:brightness-110 transition-all pl-2">
              CINETRACK
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
