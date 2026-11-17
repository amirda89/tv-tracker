"use client";

import { useState, useEffect } from "react";

const DEFAULT_POSTER_INPUT =
  "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7iiTTgloJzvGI1TAYymCfbfl3vT.jpg";

export default function MediaModal({ isOpen, editingItem, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Movie");
  const [status, setStatus] = useState("Watching");
  const [genre, setGenre] = useState("Sci-Fi");
  const [year, setYear] = useState(2024);
  const [rating, setRating] = useState(8.5);
  const [runtime, setRuntime] = useState("2h 12m");
  const [image, setImage] = useState(DEFAULT_POSTER_INPUT);
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
      setImage(editingItem.image || DEFAULT_POSTER_INPUT);
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
      setImage(DEFAULT_POSTER_INPUT);
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
      image: image.trim(),
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-200"
    >
      <div className="bg-surface-container w-full max-w-lg rounded-xl shadow-[0_24px_50px_rgba(0,0,0,0.9)] overflow-hidden max-h-[942px] flex flex-col">
        {/* Modal Header */}
        <div className="px-space-md py-space-sm bg-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-primary-container" />
            <h3 className="font-headline-sm text-headline-sm text-white">
              {editingItem ? "Edit Tracked Title" : "Add Title to Library"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-bright flex items-center justify-center text-tertiary hover:text-white transition-colors"
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
              Media Title
            </label>
            <input
              autoFocus
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Blade Runner 2049, Dune: Part Two"
              className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white placeholder:text-tertiary font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Type
              </label>
              <div className="flex rounded-lg bg-surface-container-low p-1">
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
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
              >
                <option value="Watching">Watching</option>
                <option value="Completed">Completed</option>
                <option value="Plan to Watch">Plan to Watch</option>
              </select>
            </div>
          </div>

          {/* Series-Specific Fields */}
          {type === "Series" && (
            <div className="p-space-sm rounded-lg bg-surface-container-low space-y-space-xs">
              <span className="block text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                Series Episode Telemetry
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
                    className="w-full px-2 py-1.5 rounded bg-surface-container text-white text-center font-body-md text-body-md"
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
                    className="w-full px-2 py-1.5 rounded bg-surface-container text-white text-center font-body-md text-body-md"
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
                    className="w-full px-2 py-1.5 rounded bg-surface-container text-white text-center font-body-md text-body-md"
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
                    className="w-full px-2 py-1.5 rounded bg-surface-container text-white text-center font-body-md text-body-md"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Genre & Release Year */}
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
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
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          {/* Rating & Runtime */}
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
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
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
                className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          {/* Poster URL */}
          <div className="space-y-space-xs">
            <label className="block text-tertiary font-label-sm text-label-sm uppercase tracking-wider">
              Poster Image URL (or Keywords)
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-white placeholder:text-tertiary font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
            />
          </div>

          {/* Buttons */}
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
