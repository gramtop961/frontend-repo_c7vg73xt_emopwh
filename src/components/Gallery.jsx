import React from 'react';
import ImageCard from './ImageCard';

export default function Gallery({ images, loading, onOpen }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-56 w-full animate-pulse rounded-xl bg-slate-200/70" />
        ))}
      </div>
    );
  }

  if (!images?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
        Try searching for a breed like "Siamese" or a color like "black".
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, idx) => (
        <ImageCard key={idx} src={src} alt={`Cat ${idx + 1}`} onOpen={() => onOpen(src)} />)
      )}
    </div>
  );
}
