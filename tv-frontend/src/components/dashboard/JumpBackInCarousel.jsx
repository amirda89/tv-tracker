"use client";

import { useRef } from "react";
import { JUMP_BACK_IN_CAROUSEL } from "@/data/initialMedia";

export default function JumpBackInCarousel({ library, onQuickIncrement }) {
  const carouselRef = useRef(null);

  const scrollBy = (offset) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="w-full px-margin md:px-margin-desktop py-space-sm space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-2 h-5 rounded-full bg-primary-container" />
          <h2 className="font-headline-sm text-headline-sm text-white">
            Jump Back In
          </h2>
          <span className="text-tertiary font-body-sm text-body-sm hidden sm:inline">
            • Active TV Binges
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollBy(-300)}
            className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-tertiary hover:text-white transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>
          <button
            onClick={() => scrollBy(300)}
            className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-tertiary hover:text-white transition-all"
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
        className="flex gap-space-md overflow-x-auto pb-4 scroll-smooth no-scrollbar"
      >
        {JUMP_BACK_IN_CAROUSEL.map((card) => {
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
              className="flex-none w-64 md:w-72 bg-surface-container rounded-xl overflow-hidden shadow-lg group hover:scale-[1.02] transition-transform duration-200"
            >
              <div
                className="relative h-40 bg-cover bg-center"
                style={{ backgroundImage: `url("${card.banner}")` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-white font-label-sm text-label-sm font-bold uppercase">
                  {card.platform}
                </span>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-semibold">
                  ★ {card.rating}
                </span>
              </div>

              <div className="p-space-sm space-y-space-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-md text-title-md text-white truncate">
                    {card.title}
                  </h3>
                  <span className="text-secondary font-label-sm text-label-sm bg-secondary-container/20 px-2 py-0.5 rounded">
                    {badgeText}
                  </span>
                </div>

                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-container rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-tertiary font-body-sm text-body-sm">
                    {pct}% watched
                  </span>
                  <button
                    onClick={() => onQuickIncrement(card.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-highest hover:bg-primary-container text-white font-label-sm text-label-sm uppercase transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      add
                    </span>
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
