"use client";

import Link from "next/link";

export default function Header({ onOpenModal, searchQuery, onSearchChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="h-16 w-full px-margin md:px-margin-desktop flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg">
          <Link className="flex items-center gap-space-xs group" href="/">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_0_12px_rgba(229,9,20,0.45)]">
              <span className="material-symbols-outlined text-on-primary-container text-[20px]">
                movie
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-primary-container group-hover:brightness-110 transition-all">
              CINETRACK
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-space-xs bg-surface-container-lowest p-1 rounded-full">
            <Link
              aria-current="page"
              className="px-space-md py-1.5 rounded-full transition-all bg-surface-container-high text-on-surface font-title-md shadow-[0_0_12px_rgba(0,0,0,0.4)]"
              href="/"
            >
              Home
            </Link>
            <Link
              className="px-space-md py-1.5 rounded-full font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-all"
              href="#library"
            >
              Movies
            </Link>
            <Link
              className="px-space-md py-1.5 rounded-full font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-all"
              href="#library"
            >
              Series
            </Link>
            <Link
              className="px-space-md py-1.5 rounded-full font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-all"
              href="#library"
            >
              My List
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-space-sm md:gap-space-md">
          <div className="relative hidden sm:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-tertiary text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-56 lg:w-72 pl-9 pr-14 py-1.5 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
              placeholder="Search titles, cast, genres..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-surface-container-highest text-tertiary-fixed font-label-sm text-label-sm uppercase pointer-events-none">
              Ctrl+K
            </span>
          </div>

          <button
            className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
            title="Filter view"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>

          <button
            onClick={onOpenModal}
            className="hidden md:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-label-md text-label-md uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(229,9,20,0.3)]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Title</span>
          </button>

          <div className="flex items-center gap-space-xs pl-space-xs">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-2 ring-surface-variant">
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
            <span className="material-symbols-outlined text-tertiary text-[18px] cursor-pointer hover:text-on-surface transition-colors">
              arrow_drop_down
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
