"use client";

import { useRef } from "react";

export default function JumpBackInCarousel({
  items,
  onQuickIncrement,
  onSelectSpotlight,
}) {
  const carouselRef = useRef(null);

  const scrollBy = (offset) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (!items || items.length === 0) {
    return (
      <section className="w-full px-4 md:px-12 py-4">
        <div className="text-zinc-500 text-sm">
          No active watching series or movies. Change status to
          &quot;Watching&quot; to see them here!
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-12 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 rounded-full bg-red-600" />
          <h2 className="text-lg text-white font-bold">Jump Back In</h2>
          <span className="text-zinc-500 text-xs hidden sm:inline">
            • Active Watching & Binges
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollBy(-300)}
            className="w-8 h-8 rounded-full bg-[#181818] border border-white/5 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>
          </button>
          <button
            onClick={() => scrollBy(300)}
            className="w-8 h-8 rounded-full bg-[#181818] border border-white/5 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
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
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {items.map((card) => {
          const curSeason = card.cur_season ?? 1;
          const curEp = card.cur_ep ?? 1;
          const totalEp = card.total_ep ?? 10;
          const pct = Math.min(100, Math.round((curEp / totalEp) * 100));

          return (
            <div
              key={card.id}
              className="flex-none w-72 bg-[#181818] border border-white/5 hover:border-white/15 rounded-xl p-4 shadow-sm group transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 uppercase font-semibold text-[10px]">
                    {card.type}
                  </span>
                  <span className="text-red-400 font-semibold flex items-center gap-0.5 text-xs">
                    ★ {Number(card.rating).toFixed(1)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold truncate group-hover:text-red-400 transition-colors text-sm">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs pt-1">
                    <span>{card.year}</span>
                    <span>•</span>
                    <span>{card.genre}</span>
                  </div>
                  {card.type === "Series" && (
                    <div className="text-cyan-400 text-xs font-medium pt-1">
                      S{curSeason}:E{curEp} / {totalEp}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-2.5">
                {card.type === "Series" && (
                  <>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">{pct}% watched</span>
                      <button
                        onClick={() => onQuickIncrement(card.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-red-600 hover:text-white text-zinc-300 uppercase text-[10px] transition-all"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          add
                        </span>{" "}
                        +1 Ep
                      </button>
                    </div>
                  </>
                )}

                {/* Хэрэглэгч энэ киног Spotlight болгож сонгох товч */}
                <button
                  onClick={() => onSelectSpotlight(card.id)}
                  className="w-full mt-2 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    star
                  </span>
                  Set as Spotlight
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
