"use client";

const HERO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCaXWsxjO_Zc58LbI6ucPZlJCzPP5qa5wljVb-UM-iCi0pfFpr1nryWzKc65I-JmbhVIIKPV11BZTfL8DsHzSvKEQTvLpd7bKhcmY1pIp-UXS12CXFsLykpYl_V5jB2t2znuaiy2vtS7UYcai32Qo2O9juz84B15_NCgaVzaGIWHXhDZpHwDFlM01eHs8khwDDR1QcG8zfI_bRav12vdGSMYoe1JIotwewNDGr220Y";

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
    <section className="relative w-full -mt-16 overflow-hidden bg-surface-container-lowest">
      <div
        className="relative w-full min-h-[480px] lg:h-[540px] bg-cover bg-center flex flex-col justify-end"
        style={{ backgroundImage: `url("${HERO_BG}")` }}
      >
        {/* Scrim Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 w-full px-margin md:px-margin-desktop pt-24 pb-space-lg flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-2xl space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider shadow-[0_0_12px_rgba(229,9,20,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Currently Watching
              </span>
              <span className="text-tertiary font-body-sm text-body-sm">
                4K Ultra HD • 5.1 Surround
              </span>
            </div>

            <h1 className="font-display text-display text-white tracking-tight leading-none drop-shadow-md">
              {featuredItem?.title || "Arcane: Season 2"}
            </h1>

            <p className="text-tertiary-fixed font-title-md text-title-md flex items-center gap-2">
              <span className="text-on-surface font-semibold">
                S{curSeason}:E{curEp}
              </span>
              <span>•</span>
              <span className="italic text-tertiary">
                &quot;The Beast Inside&quot;
              </span>
              <span>•</span>
              <span className="text-tertiary font-body-sm">
                {pct === 55 ? "43m remaining" : `${pct}% complete`}
              </span>
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

            {/* Action Controls */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <button
                onClick={() =>
                  featuredItem && onQuickIncrement(featuredItem.id)
                }
                className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-title-md text-title-md transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  play_arrow
                </span>
                <span>+1 Next Episode</span>
              </button>
              <button
                onClick={() => featuredItem && onEditItem(featuredItem)}
                className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 text-on-surface font-title-md text-title-md transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  edit
                </span>
                <span>Edit Details</span>
              </button>
              <button
                className="p-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-tertiary hover:text-on-surface transition-all"
                title="Add to Favorites"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* Inline Quick Telemetry Sparkline Tile */}
          <div className="bg-surface-container/80 backdrop-blur-md p-space-md rounded-xl max-w-xs w-full shadow-xl">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider">
                Weekly Pace
              </span>
              <span className="text-primary font-label-sm text-label-sm">
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
      </div>
    </section>
  );
}
