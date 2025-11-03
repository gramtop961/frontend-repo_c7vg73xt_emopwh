import React from 'react';

export default function ImageCard({ src, t, onOpen }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <img
        src={src}
        alt={t('gallery.catAlt')}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 p-3 flex justify-end bg-gradient-to-t from-black/60 to-transparent">
        <button
          onClick={() => onOpen(src)}
          className="px-3 py-1.5 rounded-md text-sm font-medium bg-white text-gray-900 hover:bg-white/90"
        >
          {t('actions.open')}
        </button>
      </div>
    </div>
  );
}
