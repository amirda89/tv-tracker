"use client";

import MediaCard from "./MediaCard";
import Pagination from "./Pagination";

export default function MediaGrid({
  pageItems,
  totalFilteredCount,
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  onPageChange,
  onQuickIncrement,
  onToggleWatched,
  onEdit,
  onDelete,
  onResetFilters,
}) {
  return (
    <section className="w-full px-margin md:px-margin-desktop py-space-sm">
      {totalFilteredCount === 0 ? (
        <div className="w-full py-space-xl text-center space-y-space-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[32px]">
              videocam_off
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-white">
            No titles found
          </h3>
          <p className="text-tertiary font-body-sm text-body-sm max-w-sm mx-auto">
            Try clearing your search query or switching category filters to view
            your tracked cinema library.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-white font-label-md text-label-md"
            type="button"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 min-h-[420px]">
            {pageItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                onQuickIncrement={onQuickIncrement}
                onToggleWatched={onToggleWatched}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            totalItems={totalFilteredCount}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  );
}
