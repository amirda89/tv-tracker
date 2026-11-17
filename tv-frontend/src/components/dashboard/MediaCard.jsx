"use client";

import { useState } from "react";
import { POSTER_FALLBACKS, DEFAULT_POSTER } from "@/data/initialMedia";

export default function MediaCard({
  item,
  onQuickIncrement,
  onToggleWatched,
  onEdit,
  onDelete,
}) {
  const [imgSrc, setImgSrc] = useState(
    item.image || POSTER_FALLBACKS[item.title] || DEFAULT_POSTER,
  );

  // Sync image prop updates
  const resolvedSrc = item.image || imgSrc;

  let statusBadgeClass = "bg-surface-container-high text-tertiary";
  if (item.status === "Watching") {
    statusBadgeClass = "bg-secondary-container/30 text-secondary border-none";
  } else if (item.status === "Completed") {
    statusBadgeClass = "bg-emerald-950/60 text-emerald-400";
  } else if (item.status === "Plan to Watch") {
    statusBadgeClass = "bg-surface-container-highest text-tertiary";
  }

  const ep = item.curEp || 0;
  const total = item.totalEp || 10;
  const pct = Math.min(100, Math.round((ep / total) * 100));

  return (
    <div className="group relative flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-200">
      {/* Poster Container (2:3 Aspect) */}
      <div className="relative w-full aspect-[2/3] bg-surface-container-lowest overflow-hidden">
        <img
          src={resolvedSrc}
          alt={`${item.title} Poster`}
          loading="lazy"
          onError={() =>
            setImgSrc(POSTER_FALLBACKS[item.title] || DEFAULT_POSTER)
          }
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/20 to-transparent" />

        {/* Top Pills */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-sm text-white font-label-sm text-label-sm uppercase font-semibold">
            {item.type}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm font-bold flex items-center gap-0.5">
            <span>★</span> {Number(item.rating).toFixed(1)}
          </span>
        </div>

        {/* Quick Action Hover Overlay */}
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-200 flex flex-col justify-center items-center gap-2 p-3">
          {item.type === "Series" ? (
            <button
              onClick={() => onQuickIncrement(item.id)}
              className="w-full py-1.5 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-white font-label-md text-label-md uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>{" "}
              +1 Episode
            </button>
          ) : (
            <button
              onClick={() => onToggleWatched(item.id)}
              className={`w-full py-1.5 rounded-lg ${
                item.status === "Completed"
                  ? "bg-surface-bright"
                  : "bg-primary-container"
              } hover:brightness-110 active:scale-95 text-white font-label-md text-label-md uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {item.status === "Completed" ? "replay" : "check"}
              </span>
              {item.status === "Completed" ? "Rewatch" : "Mark Watched"}
            </button>
          )}

          <div className="flex items-center gap-2 w-full pt-1">
            <button
              onClick={() => onEdit(item)}
              className="flex-1 py-1 rounded bg-surface-container hover:bg-surface-bright text-tertiary hover:text-white font-label-sm text-label-sm flex items-center justify-center gap-1 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">
                edit
              </span>{" "}
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="px-2 py-1 rounded bg-surface-container hover:bg-error-container text-tertiary hover:text-white font-label-sm text-label-sm transition-colors"
              title="Delete title"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">
                delete
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Status Badge */}
        <div className="absolute bottom-2 left-2">
          <span
            className={`px-2 py-0.5 rounded font-label-sm text-label-sm uppercase font-semibold ${statusBadgeClass}`}
          >
            {item.status}
          </span>
        </div>
      </div>

      {/* Metadata Box */}
      <div className="p-space-sm flex-1 flex flex-col justify-between">
        <div>
          <h4
            className="font-title-md text-title-md text-white truncate group-hover:text-primary transition-colors"
            title={item.title}
          >
            {item.title}
          </h4>
          <div className="flex items-center gap-2 text-tertiary font-body-sm text-body-sm pt-0.5">
            <span>{item.year}</span>
            <span>•</span>
            <span className="truncate">{item.genre}</span>
          </div>
        </div>

        {/* Tracker Bottom Block */}
        {item.type === "Series" ? (
          <div className="pt-2 space-y-1">
            <div className="flex items-center justify-between text-tertiary font-label-sm text-label-sm">
              <span className="text-white font-medium">
                S{item.curSeason || 1}:E{ep} / {total}
              </span>
              <span>{pct}%</span>
            </div>
            <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  pct === 100 ? "bg-emerald-400" : "bg-primary-container"
                } rounded-full transition-all duration-300`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="pt-2 flex items-center justify-between text-tertiary font-label-sm text-label-sm">
            <span>{item.runtime || "2h 14m"}</span>
            <span
              className={
                item.status === "Completed"
                  ? "text-emerald-400 font-semibold"
                  : "text-tertiary"
              }
            >
              {item.status === "Completed" ? "Watched" : "Unwatched"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
