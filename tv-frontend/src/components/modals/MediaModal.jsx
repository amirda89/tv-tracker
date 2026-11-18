"use client";

import { useState, useEffect } from "react";

export default function MediaModal({ isOpen, editingItem, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [status, setStatus] = useState("Plan to Watch");
  const [genre, setGenre] = useState("Sci-Fi");
  const [year, setYear] = useState(2024);
  const [rating, setRating] = useState(8.5);
  const [runtime, setRuntime] = useState("2h 12m");
  const [curSeason, setCurSeason] = useState(1);
  const [curEp, setCurEp] = useState(0);
  const [totalSeasons, setTotalSeasons] = useState(1);
  const [totalEp, setTotalEp] = useState(10);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setType(editingItem.type || "Movie");
      setStatus(editingItem.status || "Plan to Watch");
      setGenre(editingItem.genre || "Sci-Fi");
      setYear(editingItem.year || 2024);
      setRating(editingItem.rating || 8.5);
      setRuntime(editingItem.runtime || "");
      setCurSeason(editingItem.cur_season ?? 1);
      setCurEp(editingItem.cur_ep ?? 0);
      setTotalSeasons(editingItem.total_seasons ?? 1);
      setTotalEp(editingItem.total_ep ?? 10);
    } else {
      setTitle("");
      setType("Movie");
      setStatus("Plan to Watch");
      setGenre("Sci-Fi");
      setYear(2024);
      setRating(8.5);
      setRuntime("2h 12m");
      setCurSeason(1);
      setCurEp(0);
      setTotalSeasons(1);
      setTotalEp(10);
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  // Одоогийн улирал болон ангийг нийт хязгаар дотор барих validation функц
  const handleSeasonChange = (val) => {
    const num = Number(val);
    const maxS = Number(totalSeasons) || 1;
    if (num > maxS) {
      setCurSeason(maxS); // Нийт улирлаас илүү гаргахгүй
    } else {
      setCurSeason(Math.max(1, num));
    }
  };

  const handleEpChange = (val) => {
    const num = Number(val);
    const maxE = Number(totalEp) || 10;
    if (num > maxE) {
      setCurEp(maxE); // Нийт ангиас илүү гаргахгүй
    } else {
      setCurEp(Math.max(0, num));
    }
  };

  const getComputedSeriesStatus = () => {
    const s = Number(curSeason) || 1;
    const e = Number(curEp) || 0;
    const ts = Number(totalSeasons) || 1;
    const te = Number(totalEp) || 10;

    if (e >= te && s >= ts) return "Completed";
    if (e >= te && s < ts) return `Watching (Auto-moves to S${s + 1}:E1)`;
    if (s === 1 && e === 0) return "Plan to Watch";
    return "Watching";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const computedStatus =
      type === "Series" ? getComputedSeriesStatus() : status;

    const payload = {
      id: editingItem?.id || null,
      title: title.trim(),
      type,
      status: computedStatus.startsWith("Watching")
        ? "Watching"
        : computedStatus,
      genre,
      year: Number(year) || 2024,
      rating: Number(rating) || 8.0,
      runtime: runtime.trim(),
      cur_season: Number(curSeason) || 1,
      cur_ep: Number(curEp) || 0,
      total_seasons: Number(totalSeasons) || 1,
      total_ep: Number(totalEp) || 10,
    };
    onSave(payload);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <div className="bg-[#181818] border border-white/10 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
          <h3 className="text-white font-bold text-base">
            {editingItem ? "Edit Tracked Title" : "Add Title to Library"}
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 overflow-y-auto max-h-[80vh]"
        >
          <div>
            <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div
            className={`grid ${type === "Movie" ? "grid-cols-2" : "grid-cols-1"} gap-3`}
          >
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
              >
                <option value="Movie">Movie</option>
                <option value="Series">Series</option>
              </select>
            </div>

            {type === "Movie" && (
              <div>
                <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
                >
                  <option value="Plan to Watch">Plan to Watch</option>
                  <option value="Watching">Watching</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
          </div>

          {type === "Series" && (
            <div className="p-3 rounded-lg bg-[#111111] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-400 uppercase font-semibold">
                  Series Progress
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-medium">
                  Auto Status:{" "}
                  <strong className="text-white">
                    {getComputedSeriesStatus()}
                  </strong>
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-400">
                    Cur Season (Max: {totalSeasons})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={totalSeasons}
                    value={curSeason}
                    onChange={(e) => handleSeasonChange(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-[#222] border border-white/5 text-white text-center text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400">
                    Cur Episode (Max: {totalEp})
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={totalEp}
                    value={curEp}
                    onChange={(e) => handleEpChange(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-[#222] border border-white/5 text-white text-center text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400">
                    Total Seasons
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalSeasons}
                    onChange={(e) => setTotalSeasons(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-[#222] border border-white/5 text-white text-center text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400">
                    Total Eps / Season
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalEp}
                    onChange={(e) => setTotalEp(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-[#222] border border-white/5 text-white text-center text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
              >
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Anime">Anime</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Year
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Runtime
              </label>
              <input
                type="text"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white text-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onChange={onClose}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs uppercase font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
