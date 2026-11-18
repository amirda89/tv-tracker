"use client";

export default function HeroSpotlight({
  featuredItem,
  onQuickIncrement,
  onEditItem,
}) {
  // Хэрэв Watching төлөвтэй цуврал/кино байхгүй бол Hero Spotlight хэсгийг огт харуулахгүй
  if (!featuredItem) {
    return null;
  }

  const curEp = featuredItem.cur_ep ?? 0;
  const totalEp = featuredItem.total_ep ?? 10;
  const curSeason = featuredItem.cur_season ?? 1;
  const pct =
    totalEp > 0 ? Math.min(100, Math.round((curEp / totalEp) * 100)) : 0;

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
              {featuredItem.type}
            </span>
            <span className="text-tertiary font-body-sm text-body-sm">
              {featuredItem.genre} • {featuredItem.year}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
            {featuredItem.title}
          </h1>

          <p className="text-tertiary-fixed font-title-md text-title-md flex items-center gap-2 flex-wrap">
            {featuredItem.type === "Series" && (
              <>
                <span className="text-white font-semibold">
                  S{curSeason}:E{curEp}
                </span>
                <span className="text-white/25">•</span>
              </>
            )}
            <span className="text-primary font-medium text-sm flex items-center gap-1">
              ★ {Number(featuredItem.rating).toFixed(1)}
            </span>
            {featuredItem.type === "Series" && (
              <>
                <span className="text-white/25">•</span>
                <span className="text-tertiary font-body-sm">
                  {pct}% complete
                </span>
              </>
            )}
          </p>

          {/* Episode Progress Bar (Зөвхөн цуврал үед харагдана) */}
          {featuredItem.type === "Series" && (
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
          )}

          {/* Hero Action Controls */}
          <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
            {featuredItem.type === "Series" && (
              <button
                onClick={() => onQuickIncrement(featuredItem.id)}
                className="flex items-center gap-2 px-space-lg py-2.5 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-title-md text-title-md transition-all shadow-[0_0_20px_rgba(229,9,20,0.4)]"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  play_arrow
                </span>
                <span>+1 Next Episode</span>
              </button>
            )}
            <button
              onClick={() => onEditItem(featuredItem)}
              className="flex items-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 text-on-surface font-title-md text-title-md border border-white/5 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">
                edit
              </span>
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
