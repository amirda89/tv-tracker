"use client";

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
}) {
  if (totalItems === 0) return null;

  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  return (
    <div className="mt-8 pt-4 border-t border-surface-container-high flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-tertiary font-body-sm text-body-sm">
        Showing{" "}
        <span className="text-white font-semibold">
          {startIndex + 1}–{endIndex}
        </span>{" "}
        of <span className="text-white font-semibold">{totalItems}</span> titles
      </div>

      <div className="flex items-center gap-1.5">
        <button
          disabled={prevDisabled}
          onClick={() => !prevDisabled && onPageChange(currentPage - 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-title-md font-body-sm transition-all ${
            prevDisabled
              ? "text-tertiary/40 cursor-not-allowed bg-surface-container-low"
              : "bg-surface-container-high hover:bg-surface-bright text-white cursor-pointer"
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">
            chevron_left
          </span>
          <span>Prev</span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg font-title-md text-body-sm flex items-center justify-center transition-all ${
                isActive
                  ? "bg-primary-container text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.45)] ring-1 ring-white/20"
                  : "bg-surface-container-high hover:bg-surface-bright text-tertiary hover:text-white"
              }`}
              type="button"
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={nextDisabled}
          onClick={() => !nextDisabled && onPageChange(currentPage + 1)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-title-md font-body-sm transition-all ${
            nextDisabled
              ? "text-tertiary/40 cursor-not-allowed bg-surface-container-low"
              : "bg-surface-container-high hover:bg-surface-bright text-white cursor-pointer"
          }`}
          type="button"
        >
          <span>Next</span>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
