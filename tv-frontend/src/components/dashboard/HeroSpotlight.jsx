"use client";

export default function HeroSpotlight({
  featuredItem,
  onQuickIncrement,
  onEditItem,
}) {
  const curEp = featuredItem?.curEp ?? 5;
  const totalEp = featuredItem?.totalEp ?? 9;
  const curSeason = featuredItem?.curSeason ?? 2;
  const pct = Math.min(100, Math.round((curEp / totalEp) * 100));

  return (
    <section className="relative w-full overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#181818] via-[#141414] to-[#111111]">
      <div className="relative w-full px-margin md:px-margin-desktop py-space-xl lg:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="max-w-2xl space-y-space-sm">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/15 text-primary border border-primary/20 font-label-sm text-label-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Currently Watching
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-label-sm text-label-sm uppercase tracking-wide">
              {featuredItem?.type || "TV Series"}
            </span>
            <span className="text-tertiary font-body-sm text-body-sm">
              {featuredItem?.genre || "Fantasy"} • Animation •{" "}
              {featuredItem?.year || 2024}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
            {featuredItem?.title || "Arcane: Season 2"}
          </h1>

          <p className="text-tertiary-fixed font-title-md text-title-md flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold">
              S{curSeason}:E{curEp}
            </span>
            <span className="text-white/25">•</span>
            <span className="text-zinc-300 font-medium">
              &quot;The Beast Inside&quot;
            </span>
            <span className="text-white/25">•</span>
            <span className="text-primary font-medium text-sm flex items-center gap-1">
              ★{" "}
              {featuredItem?.rating
                ? Number(featuredItem.rating).toFixed(1)
                : "9.3"}
            </span>
            <span className="text-white/25">•</span>
            <span className="text-tertiary font-body-sm">{pct}% complete</span>
          </p>

          {/* Episode Progress Bar */}
          <div className="w-full max-w-md pt-space-xs space-y-1.5">
            <div className="flex justify-between items-center text-tertiary font-label-md text-label-md">
              <span>
                {curEp} of {totalEp} Episodes Watched
              </span>
              <span className="text-primary font-bold">{pct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
              <div
                className="h-full bg-primary-container rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(229,9,20,0.6)]"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Hero Action Controls */}
          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            <button
              onClick={() => featuredItem && onQuickIncrement(featuredItem.id)}
              className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-title-md text-title-md transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                play_arrow
              </span>
              <span>+1 Next Episode</span>
            </button>
            <button
              onClick={() => featuredItem && onEditItem(featuredItem)}
              className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 text-on-surface font-title-md text-title-md border border-white/5 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">
                edit
              </span>
              <span>Edit Details</span>
            </button>
            <button
              className="p-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-tertiary hover:text-white border border-white/5 transition-all"
              title="Toggle Favorite"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                bookmark
              </span>
            </button>
          </div>
        </div>

        {/* Inline Quick Telemetry Sparkline Tile */}
        <div className="bg-surface-container/70 border border-white/[0.08] backdrop-blur-md p-space-md rounded-xl max-w-xs w-full shadow-lg">
          <div className="flex items-center justify-between pb-space-xs">
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider">
              Weekly Pace
            </span>
            <span className="text-primary font-label-sm text-label-sm font-semibold">
              +18.4 hrs
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-stat-counter text-stat-counter text-white">
              14
            </span>
            <span className="text-tertiary font-body-sm text-body-sm">
              episodes logged this week
            </span>
          </div>
          <div className="pt-space-sm">
            <svg
              className="w-full h-8 text-primary-container"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 160 32"
            >
              <path
                d="M0,28 L24,20 L48,24 L72,12 L96,16 L120,6 L144,14 L160,2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
              <path
                d="M0,28 L24,20 L48,24 L72,12 L96,16 L120,6 L144,14 L160,2 L160,32 L0,32 Z"
                fill="currentColor"
                fillOpacity="0.12"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
