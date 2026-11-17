"use client";

export default function FilterBar({
  metrics,
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedSort,
  onSortChange,
  onOpenModal,
}) {
  const tabs = [
    { key: "all", label: "All", count: metrics.total },
    { key: "movies", label: "Movies", count: metrics.movies },
    { key: "series", label: "Series", count: metrics.series },
    { key: "watching", label: "Watching", count: metrics.watching },
    { key: "completed", label: "Completed", count: metrics.completed },
    { key: "watchlist", label: "Plan to Watch", count: metrics.watchlist },
  ];

  return (
    <section
      id="library"
      className="sticky top-16 z-30 w-full bg-surface/90 backdrop-blur-xl shadow-md py-space-sm px-margin md:px-margin-desktop my-space-md"
    >
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-sm">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const active = currentFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onFilterChange(tab.key)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
                  active
                    ? "bg-primary-container text-on-primary-container shadow-sm"
                    : "bg-surface-container-high hover:bg-surface-bright text-tertiary hover:text-white"
                }`}
                type="button"
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Search, Genre, Sort & Add Action */}
        <div className="flex flex-wrap items-center gap-space-xs sm:gap-space-sm justify-between xl:justify-end">
          <div className="relative flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-2 text-tertiary text-[18px] pointer-events-none">
              search
            </span>
            <input
              className="w-full sm:w-56 pl-9 pr-8 py-1.5 rounded-lg bg-surface-container text-white placeholder:text-tertiary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
              placeholder="Filter title, actor, year..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-2 text-tertiary hover:text-white"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">
                  close
                </span>
              </button>
            )}
          </div>

          <select
            className="bg-surface-container text-tertiary hover:text-white px-3 py-1.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <option value="all">All Genres</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Anime">Anime</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Action">Action</option>
            <option value="Fantasy">Fantasy</option>
          </select>

          <select
            className="bg-surface-container text-tertiary hover:text-white px-3 py-1.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="updated">Recently Updated</option>
            <option value="rating">Rating (High - Low)</option>
            <option value="year">Release Year</option>
            <option value="alpha">Title (A - Z)</option>
          </select>

          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-label-md text-label-md uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(229,9,20,0.35)]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Title</span>
          </button>
        </div>
      </div>
    </section>
  );
}
