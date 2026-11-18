"use client";

import { useRef } from "react";
import { JUMP_BACK_IN_ITEMS } from "@/data/initialMedia";

export default function JumpBackInCarousel({ library, onQuickIncrement }) {
  const carouselRef = useRef(null);

  const scrollBy = (offset) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="w-full px-margin md:px-margin-desktop py-space-sm space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-1.5 h-4 rounded-full bg-primary-container" />
          <h2 className="font-headline-sm text-headline-sm text-white font-bold">
            Jump Back In
          </h2>
          <span className="text-tertiary font-body-sm text-body-sm hidden sm:inline">
            • Active TV Binges
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollBy(-300)}
            className="w-8 h-8 rounded-full bg-[#181818] border border-white/5 hover:bg-surface-bright flex items-center justify-center text-tertiary hover:text-white transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>
          <button
            onClick={() => scrollBy(300)}
            className="w-8 h-8 rounded-full bg-[#181818] border border-white/5 hover:bg-surface-bright flex items-center justify-center text-tertiary hover:text-white transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-space-md overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {JUMP_BACK_IN_ITEMS.map((card) => {
          const liveItem = library.find((x) => x.id === card.id);
          const curSeason = liveItem?.curSeason ?? 1;
          const curEp = liveItem?.curEp ?? 1;
          const totalEp = liveItem?.totalEp ?? 10;
          const pct = liveItem
            ? Math.min(100, Math.round((curEp / totalEp) * 100))
            : card.percent;
          const badgeText = liveItem
            ? `S${curSeason}:E${curEp} / ${totalEp}`
            : card.episodeBadge;

          return (
            <div
              key={card.id}
              className="flex-none w-72 bg-[#181818] border border-white/5 hover:border-white/15 rounded-xl p-4 shadow-sm group transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-label-sm uppercase font-semibold">
                    {card.platform}
                  </span>
                  <span className="text-primary font-semibold flex items-center gap-0.5">
                    ★ {card.rating}
                  </span>
                </div>
                <div>
                  <h3 className="font-title-md text-white font-bold truncate group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 text-tertiary text-xs pt-1">
                    <span>{card.year}</span>
                    <span>•</span>
                    <span>{card.genre}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-medium">
                      {badgeText}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-2.5">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tertiary">{pct}% watched</span>
                  <button
                    onClick={() => onQuickIncrement(card.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-primary-container hover:text-white text-zinc-300 font-label-sm uppercase transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      add
                    </span>{" "}
                    +1 Ep
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
