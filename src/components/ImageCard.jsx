import React from 'react';

export default function ImageCard({ src, t, onOpen }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 backdrop-blur-sm">
      <img
        src={src}
        alt={t('gallery.catAlt')}
        className="w-full aspect-square object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 p-3 flex justify-end bg-gradient-to-t from-black/60 to-transparent">
        <button
          onClick={() => onOpen(src)}
          className="px-3 py-1.5 rounded-md text-sm font-medium bg-fuchsia-500 text-white hover:bg-fuchsia-400 shadow-md shadow-fuchsia-900/30"
        >
          {t('actions.open')}
        </button>
      </div>
    </div>
  );
}
