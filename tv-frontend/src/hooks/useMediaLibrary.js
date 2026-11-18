"use client";

import { useState, useEffect, useMemo } from "react";

const ITEMS_PER_PAGE = 5;
const API_URL = "http://localhost:3001/api/media";

export function useMediaLibrary() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedSort, setSelectedSort] = useState("updated");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Backend-ээс өгөгдлөө татах
  const fetchLibrary = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setLibrary(data);
    } catch (err) {
      console.error("Failed to fetch library from backend", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

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

  // 1. Watching төлөвтэй кино/цувралуудыг Jump Back In хэсэгт автоматаар шүүж авах
  const jumpBackInItems = useMemo(() => {
    return library.filter((item) => item.status === "Watching");
  }, [library]);

  // Spotlight киног тодорхойлох (Зөвхөн Watching төлөвтэй үед)
  const featuredItem = useMemo(() => {
    const watchingItems = library.filter((x) => x.status === "Watching");

    // Хэрэв Watching төлөвтэй контент огт байхгүй бол null буцаана
    if (watchingItems.length === 0) return null;

    // Хэрэглэгчийн онцолж сонгосон Watching кино байвал түүнийг, үгүй бол хамгийн эхний Watching киног авна
    return (
      watchingItems.find((x) => x.is_spotlight === true) || watchingItems[0]
    );
  }, [library]);

  // 3. Spotlight-оор сонгох функц
  const setFeaturedSpotlight = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/media/${id}/spotlight`,
        {
          method: "PATCH",
        },
      );
      const updated = await res.json();

      // Local state-ээ шинэчлэх (Бүх итемд is_spotlight-ийг өөрчлөх)
      setLibrary((prev) =>
        prev.map((item) => ({
          ...item,
          is_spotlight: item.id === Number(id),
        })),
      );
    } catch (err) {
      console.error("Failed to set spotlight", err);
    }
  };

  // API руу +1 Episode явуулах хүсэлт
  const quickIncrement = async (id) => {
    const item = library.find((x) => x.id === id);
    if (!item || item.type !== "Series") return;

    try {
      const res = await fetch(`http://localhost:3001/api/media/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_quick_increment: true, // Backend рүү автоматаар анги/улирал шалгах хүсэлт явуулж байна
        }),
      });
      const updated = await res.json();

      setLibrary((prev) => prev.map((x) => (x.id === id ? updated : x)));
    } catch (err) {
      console.error("Failed to increment episode and season", err);
    }
  };

  // API руу Status өөрчлөх хүсэлт
  const toggleMovieWatched = async (id) => {
    const item = library.find((x) => x.id === id);
    if (!item) return;

    const newStatus =
      item.status === "Completed" ? "Plan to Watch" : "Completed";

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setLibrary((prev) => prev.map((x) => (x.id === id ? updated : x)));
    } catch (err) {
      console.error("Failed to toggle movie status", err);
    }
  };

  // API руу Устгах хүсэлт явуулах
  const deleteItem = async (id) => {
    if (window.confirm("Remove this title from your tracker library?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setLibrary((prev) => prev.filter((x) => x.id !== id));
      } catch (err) {
        console.error("Failed to delete item", err);
      }
    }
  };

  // API руу шинээр хадгалах эсвэл засах хүсэлт
  const saveMediaItem = async (formData) => {
    try {
      if (formData.id) {
        // Update
        const res = await fetch(`${API_URL}/${formData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setLibrary((prev) =>
          prev.map((x) => (x.id === formData.id ? updated : x)),
        );
      } else {
        // Create
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setLibrary((prev) => [created, ...prev]);
      }
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to save media item", err);
    }
  };

  return {
    library,
    loading,
    metrics,
    jumpBackInItems,
    setFeaturedSpotlight,
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
    openAddModal: () => {
      setEditingItem(null);
      setIsModalOpen(true);
    },
    openEditModal: (item) => {
      setEditingItem(item);
      setIsModalOpen(true);
    },
    closeModal: () => setIsModalOpen(false),
    saveMediaItem,
    quickIncrement,
    toggleMovieWatched,
    deleteItem,
    resetFilters: () => {
      setCurrentFilter("all");
      setSearchQuery("");
      setSelectedGenre("all");
      setSelectedSort("updated");
      setCurrentPage(1);
    },
  };
}
