export default function MetricsRow({ metrics }) {
  const { total, movies, series, watching, completed, watchlist } = metrics;
  const loggedPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="w-full px-margin md:px-margin-desktop py-space-lg">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Stat 1 */}
        <div className="bg-[#181818] border border-white/5 p-space-md rounded-xl flex items-center justify-between shadow-sm hover:border-white/10 transition-colors group">
          <div>
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider block">
              Total Titles
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-stat-counter text-stat-counter text-white group-hover:text-primary transition-colors">
                {total}
              </span>
              <span className="text-tertiary font-body-sm text-body-sm">
                <span>{movies}</span>M • <span>{series}</span>S
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              video_library
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-[#181818] border border-white/5 p-space-md rounded-xl flex items-center justify-between shadow-sm hover:border-white/10 transition-colors group">
          <div>
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider block">
              Currently Watching
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-stat-counter text-stat-counter text-white group-hover:text-cyan-400 transition-colors">
                {watching}
              </span>
              <span className="text-cyan-400 font-label-sm text-label-sm uppercase tracking-wide">
                Active Streaks
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-cyan-950/40 text-cyan-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">
              play_circle
            </span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#181818] border border-white/5 p-space-md rounded-xl flex items-center justify-between shadow-sm hover:border-white/10 transition-colors group">
          <div>
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider block">
              Completed
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-stat-counter text-stat-counter text-white group-hover:text-emerald-400 transition-colors">
                {completed}
              </span>
              <span className="text-emerald-400 font-label-sm text-label-sm">
                {loggedPct}% Logged
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-950/40 text-emerald-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">
              check_circle
            </span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-[#181818] border border-white/5 p-space-md rounded-xl flex items-center justify-between shadow-sm hover:border-white/10 transition-colors group">
          <div>
            <span className="text-tertiary font-label-md text-label-md uppercase tracking-wider block">
              Plan To Watch
            </span>
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-stat-counter text-stat-counter text-white group-hover:text-amber-400 transition-colors">
                {watchlist}
              </span>
              <span className="text-tertiary font-body-sm text-body-sm">
                348h backlog
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-950/40 text-amber-400 flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">
              bookmark
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
