"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSpotlight from "@/components/dashboard/HeroSpotlight";
import MetricsRow from "@/components/dashboard/MetricsRow";
import JumpBackInCarousel from "@/components/dashboard/JumpBackInCarousel";
import FilterBar from "@/components/dashboard/FilterBar";
import MediaGrid from "@/components/dashboard/MediaGrid";
import MediaModal from "@/components/modals/MediaModal";
import { useMediaLibrary } from "@/hooks/useMediaLibrary";

export default function HomePage() {
  const {
    library,
    loading,
    metrics,
    filteredItems,
    pageItems,
    featuredItem,
    jumpBackInItems, // Hook-оос авч байна
    setFeaturedSpotlight, // Hook-оос авч байна
    currentFilter,
    setCurrentFilter,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedSort,
    setSelectedSort,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    itemsPerPage,
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
  } = useMediaLibrary();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-zinc-400">
        Loading CineTrack library...
      </div>
    );
  }

  return (
    <>
      <Header
        onOpenModal={openAddModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="w-full pt-16 bg-[#111111] min-h-[calc(100vh-140px)]">
        <div className="flex flex-col w-full">
          <HeroSpotlight
            featuredItem={featuredItem}
            onQuickIncrement={quickIncrement}
            onEditItem={openEditModal}
          />

          <MetricsRow metrics={metrics} />

          {/* Динамикаар ирж байгаа active watching жагсаалт болон spotlight тохируулах функцыг дамжуулж байна */}
          <JumpBackInCarousel
            items={jumpBackInItems}
            onQuickIncrement={quickIncrement}
            onSelectSpotlight={setFeaturedSpotlight}
          />

          <FilterBar
            metrics={metrics}
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            onOpenModal={openAddModal}
          />

          <MediaGrid
            pageItems={pageItems}
            totalFilteredCount={filteredItems.length}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onQuickIncrement={quickIncrement}
            onToggleWatched={toggleMovieWatched}
            onEdit={openEditModal}
            onDelete={deleteItem}
            onResetFilters={resetFilters}
          />

          <MediaModal
            isOpen={isModalOpen}
            editingItem={editingItem}
            onClose={closeModal}
            onSave={saveMediaItem}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
