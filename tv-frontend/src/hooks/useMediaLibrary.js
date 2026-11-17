"use client";

import { useState, useEffect, useMemo } from "react";
import {
  initialMedia,
  POSTER_FALLBACKS,
  DEFAULT_POSTER,
} from "@/data/initialMedia";

const STORAGE_KEY = "cinetrack_library_data_v3";
const ITEMS_PER_PAGE = 5;

export function useMediaLibrary() {
  const [library, setLibrary] = useState(initialMedia);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filter & Pagination States
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedSort, setSelectedSort] = useState("updated");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored).map((item) => ({
          ...item,
          image: POSTER_FALLBACKS[item.title] || item.image,
        }));
        setLibrary(parsed);
      }
    } catch {
      // Fallback to initialMedia
    }
    setIsHydrated(true);
  }, []);

  // Persist changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
    } catch {
      // Ignore storage quota errors
    }
  }, [library, isHydrated]);

  // Dashboard Metrics
  const metrics = useMemo(() => {
    const total = library.length;
    const movies = library.filter((x) => x.type === "Movie").length;
    const series = library.filter((x) => x.type === "Series").length;
    const watching = library.filter((x) => x.status === "Watching").length;
    const completed = library.filter((x) => x.status === "Completed").length;
    const watchlist = library.filter(
      (x) => x.status === "Plan to Watch",
    ).length;
    return { total, movies, series, watching, completed, watchlist };
  }, [library]);

  // Filtered & Sorted Items
  const filteredItems = useMemo(() => {
    let items = [...library];

    if (currentFilter === "movies")
      items = items.filter((x) => x.type === "Movie");
    else if (currentFilter === "series")
      items = items.filter((x) => x.type === "Series");
    else if (currentFilter === "watching")
      items = items.filter((x) => x.status === "Watching");
    else if (currentFilter === "completed")
      items = items.filter((x) => x.status === "Completed");
    else if (currentFilter === "watchlist")
      items = items.filter((x) => x.status === "Plan to Watch");

    if (selectedGenre !== "all") {
      items = items.filter((x) => x.genre === selectedGenre);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.genre.toLowerCase().includes(q) ||
          String(x.year).includes(q),
      );
    }

    if (selectedSort === "rating") items.sort((a, b) => b.rating - a.rating);
    else if (selectedSort === "year") items.sort((a, b) => b.year - a.year);
    else if (selectedSort === "alpha")
      items.sort((a, b) => a.title.localeCompare(b.title));
    else items.sort((a, b) => b.id - a.id);

    return items;
  }, [library, currentFilter, selectedGenre, searchQuery, selectedSort]);

  // Pagination Calculations
  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const pageItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Featured Spotlight Item (Arcane)
  const featuredItem = useMemo(
    () =>
      library.find((x) => x.title.toLowerCase().includes("arcane")) ||
      library[0],
    [library],
  );

  // Actions
  const quickIncrement = (id) => {
    setLibrary((prev) =>
      prev.map((item) => {
        if (item.id !== id || item.type !== "Series") return item;
        const nextEp = (item.curEp || 0) + 1;
        const total = item.totalEp || 10;
        const isDone = nextEp >= total;
        return {
          ...item,
          curEp: isDone ? total : nextEp,
          status: isDone ? "Completed" : "Watching",
        };
      }),
    );
  };

  const toggleMovieWatched = (id) => {
    setLibrary((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                item.status === "Completed" ? "Plan to Watch" : "Completed",
            }
          : item,
      ),
    );
  };

  const deleteItem = (id) => {
    if (window.confirm("Remove this title from your tracker library?")) {
      setLibrary((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const saveMediaItem = (formData) => {
    const fallback = POSTER_FALLBACKS[formData.title] || DEFAULT_POSTER;
    const image = formData.image?.startsWith("http")
      ? formData.image
      : fallback;

    if (formData.id) {
      setLibrary((prev) =>
        prev.map((item) =>
          item.id === formData.id ? { ...item, ...formData, image } : item,
        ),
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        image,
      };
      setLibrary((prev) => [newItem, ...prev]);
    }
    setCurrentPage(1);
    closeModal();
  };

  const resetFilters = () => {
    setCurrentFilter("all");
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedSort("updated");
    setCurrentPage(1);
  };

  return {
    library,
    metrics,
    filteredItems,
    pageItems,
    featuredItem,
    currentFilter,
    setCurrentFilter: (f) => {
      setCurrentFilter(f);
      setCurrentPage(1);
    },
    searchQuery,
    setSearchQuery: (q) => {
      setSearchQuery(q);
      setCurrentPage(1);
    },
    selectedGenre,
    setSelectedGenre: (g) => {
      setSelectedGenre(g);
      setCurrentPage(1);
    },
    selectedSort,
    setSelectedSort: (s) => {
      setSelectedSort(s);
      setCurrentPage(1);
    },
    currentPage: safePage,
    setCurrentPage,
    totalPages,
    startIndex,
    itemsPerPage: ITEMS_PER_PAGE,
    isModalOpen,
    editingItem,
    openAddModal,
    openEditModal,
    closeModal,
    saveMediaItem,
    quickIncrement,
    toggleMovieWatched,
    deleteItem,
    resetFilters,
  };
}
