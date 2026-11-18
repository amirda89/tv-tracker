"use client";

export default function MediaCard({
  item,
  onQuickIncrement,
  onToggleWatched,
  onEdit,
  onDelete,
}) {
  let statusIndicator = "";
  if (item.status === "Watching") {
    statusIndicator = (
      <span className="inline-flex items-center gap-1.5 text-cyan-400 font-label-sm uppercase font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Watching
      </span>
    );
  } else if (item.status === "Completed") {
    statusIndicator = (
      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-label-sm uppercase font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Completed
      </span>
    );
  } else {
    statusIndicator = (
      <span className="inline-flex items-center gap-1.5 text-amber-400 font-label-sm uppercase font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Plan to Watch
      </span>
    );
  }

  const ep = item.curEp || 0;
  const total = item.totalEp || 10;
  const pct = Math.min(100, Math.round((ep / total) * 100));

  return (
    <div className="group relative flex flex-col justify-between bg-[#181818] border border-white/5 hover:border-white/15 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-label-sm uppercase font-semibold">
            {item.type}
          </span>
          <span className="text-primary font-bold flex items-center gap-0.5 text-xs">
            <span>★</span> {Number(item.rating).toFixed(1)}
          </span>
        </div>

        <div>
          <h4
            className="font-title-md text-white font-bold truncate group-hover:text-primary transition-colors text-base"
            title={item.title}
          >
            {item.title}
          </h4>
          <div className="flex items-center gap-2 text-tertiary text-xs pt-1">
            <span>{item.year}</span>
            <span>•</span>
            <span className="truncate">{item.genre}</span>
          </div>
        </div>

        <div className="pt-0.5">{statusIndicator}</div>
      </div>

      <div className="mt-4">
        {item.type === "Series" ? (
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs text-tertiary">
              <span className="font-medium text-white">
                S{item.curSeason || 1}:E{ep} / {total}
              </span>
              <span>{pct}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  pct === 100 ? "bg-emerald-400" : "bg-primary-container"
                } rounded-full transition-all duration-300`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onQuickIncrement(item.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-primary-container hover:text-white text-zinc-300 font-label-sm uppercase tracking-wider transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">
                  add
                </span>{" "}
                +1 Ep
              </button>
              <div className="flex items-center gap-1 text-tertiary">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1 hover:text-white transition-colors"
                  title="Edit"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 hover:text-red-400 transition-colors"
                  title="Delete"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  schedule
                </span>{" "}
                {item.runtime || "2h 15m"}
              </span>
              <span
                className={
                  item.status === "Completed"
                    ? "text-emerald-400 font-medium"
                    : "text-amber-400 font-medium"
                }
              >
                {item.status === "Completed" ? "Watched" : "Backlog"}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onToggleWatched(item.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-surface-bright text-zinc-300 hover:text-white font-label-sm uppercase tracking-wider transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {item.status === "Completed" ? "replay" : "check"}
                </span>
                {item.status === "Completed" ? "Rewatch" : "Mark Done"}
              </button>
              <div className="flex items-center gap-1 text-tertiary">
                <button
                  onClick={() => onEdit(item)}
                  className="p-1 hover:text-white transition-colors"
                  title="Edit"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    edit
                  </span>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1 hover:text-red-400 transition-colors"
                  title="Delete"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
