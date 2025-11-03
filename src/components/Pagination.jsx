import React from 'react';

export default function Pagination({ page, totalPages, onPageChange, t }) {
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  return (
    <div className="mt-6 flex items-center justify-center gap-3 select-none">
      <button
        className="rounded-lg px-3 py-2 text-sm bg-fuchsia-500/10 text-white border border-fuchsia-400/30 disabled:opacity-40 hover:bg-fuchsia-500/20"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
      >
        {t('pagination.prev')}
      </button>
      <span className="text-white/80 text-sm">
        {t('pagination.page')} {page + 1} {t('pagination.of')} {totalPages}
      </span>
      <button
        className="rounded-lg px-3 py-2 text-sm bg-fuchsia-500/10 text-white border border-fuchsia-400/30 disabled:opacity-40 hover:bg-fuchsia-500/20"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
      >
        {t('pagination.next')}
      </button>
    </div>
  );
}
