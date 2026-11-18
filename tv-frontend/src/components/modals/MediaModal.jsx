"use client";

import { useState, useEffect } from "react";

export default function MediaModal({ isOpen, editingItem, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [status, setStatus] = useState("Watching");
  const [genre, setGenre] = useState("Sci-Fi");
  const [year, setYear] = useState(2024);
  const [rating, setRating] = useState(8.5);
  const [runtime, setRuntime] = useState("2h 12m");
  const [curSeason, setCurSeason] = useState(1);
  const [curEp, setCurEp] = useState(1);
  const [totalSeasons, setTotalSeasons] = useState(1);
  const [totalEp, setTotalEp] = useState(10);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setType(editingItem.type || "Movie");
      setStatus(editingItem.status || "Watching");
      setGenre(editingItem.genre || "Sci-Fi");
      setYear(editingItem.year || 2024);
      setRating(editingItem.rating || 8.5);
      setRuntime(editingItem.runtime || "");
      setCurSeason(editingItem.curSeason || 1);
      setCurEp(editingItem.curEp || 0);
      setTotalSeasons(editingItem.totalSeasons || 1);
      setTotalEp(editingItem.totalEp || 10);
    } else {
      setTitle("");
      setType("Movie");
      setStatus("Watching");
      setGenre("Sci-Fi");
      setYear(2024);
      setRating(8.5);
      setRuntime("2h 12m");
      setCurSeason(1);
      setCurEp(1);
      setTotalSeasons(1);
      setTotalEp(10);
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: editingItem?.id || null,
      title: title.trim(),
      type,
      status,
      genre,
      year: Number(year) || 2024,
      rating: Number(rating) || 8.0,
      runtime: runtime.trim(),
      ...(type === "Series"
        ? {
            curSeason: Number(curSeason) || 1,
            curEp: Number(curEp) || 0,
            totalSeasons: Number(totalSeasons) || 1,
            totalEp: Number(totalEp) || 10,
          }
        : {}),
    };
    onSave(payload);
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-200"
    >
      <div className="bg-[#181818] border border-white/10 w-full max-w-lg rounded-xl shadow-[0_24px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-space-md py-3.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 rounded-full bg-primary-container" />
            <h3 className="font-headline-sm text-title-md text-white font-bold">
              {editingItem ? "Edit Tracked Title" : "Add Title to Library"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-tertiary hover:text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit}
          className="p-space-md space-y-space-md overflow-y-auto"
        >
          <div className="space-y-space-xs">
            <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Severance, Dune: Part Two"
              className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white placeholder:text-tertiary/70 font-body-md text-body-md focus:outline-none focus:border-primary-container"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Type
              </label>
              <div className="flex rounded-lg bg-[#111111] border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setType("Movie")}
                  className={`flex-1 py-1 rounded text-center font-label-md text-label-md uppercase transition-all ${
                    type === "Movie"
                      ? "bg-primary-container text-white"
                      : "text-tertiary hover:text-white"
                  }`}
                >
                  Movie
                </button>
                <button
                  type="button"
                  onClick={() => setType("Series")}
                  className={`flex-1 py-1 rounded text-center font-label-md text-label-md uppercase transition-all ${
                    type === "Series"
                      ? "bg-primary-container text-white"
                      : "text-tertiary hover:text-white"
                  }`}
                >
                  Series
                </button>
              </div>
            </div>

            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white font-body-md text-body-md focus:outline-none focus:border-primary-container"
              >
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Plan to Watch">Plan to Watch</option>
              </select>
            </div>
          </div>

          {type === "Series" && (
            <div className="p-space-sm rounded-lg bg-[#111111] border border-white/5 space-y-space-xs">
              <span className="block text-cyan-400 font-label-sm text-label-sm uppercase tracking-wider">
                Series Episode Tracker
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-tertiary font-label-sm text-label-sm">
                    Cur Season
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={curSeason}
                    onChange={(e) => setCurSeason(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-surface-container border border-white/5 text-white text-center font-body-md text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-tertiary font-label-sm text-label-sm">
                    Cur Episode
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={curEp}
                    onChange={(e) => setCurEp(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-surface-container border border-white/5 text-white text-center font-body-md text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-tertiary font-label-sm text-label-sm">
                    Total Seasons
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalSeasons}
                    onChange={(e) => setTotalSeasons(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-surface-container border border-white/5 text-white text-center font-body-md text-body-md"
                  />
                </div>
                <div>
                  <label className="block text-tertiary font-label-sm text-label-sm">
                    Total Episodes
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalEp}
                    onChange={(e) => setTotalEp(e.target.value)}
                    className="w-full px-2 py-1.5 rounded bg-surface-container border border-white/5 text-white text-center font-body-md text-body-md"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white font-body-md text-body-md focus:outline-none focus:border-primary-container"
              >
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Anime">Anime</option>
                <option value="Drama">Drama</option>
                <option value="Thriller">Thriller</option>
                <option value="Action">Action</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </div>
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Release Year
              </label>
              <input
                type="number"
                min="1920"
                max="2030"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white font-body-md text-body-md focus:outline-none focus:border-primary-container"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Rating (1-10)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-primary font-bold">★</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white font-body-md text-body-md focus:outline-none focus:border-primary-container"
                />
              </div>
            </div>
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Runtime (e.g. 2h 15m)
              </label>
              <input
                type="text"
                value={runtime}
                onChange={(e) => setRuntime(e.target.value)}
                placeholder="2h 18m"
                className="w-full px-3 py-2 rounded-lg bg-[#111111] border border-white/10 text-white font-body-md text-body-md focus:outline-none focus:border-primary-container"
              />
            </div>
          </div>

          <div className="pt-space-sm flex items-center justify-end gap-space-sm">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-tertiary hover:text-white font-label-md text-label-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary-container hover:brightness-110 active:scale-95 text-on-primary-container font-label-md text-label-md uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(229,9,20,0.4)]"
            >
              Save to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
