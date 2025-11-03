import React from 'react';

export default function ImageCard({ src, alt, onOpen }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onClick={onOpen}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow hover:bg-white"
        >
          Open
        </a>
        <button
          onClick={onOpen}
          className="pointer-events-auto rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-black"
        >
          Preview
        </button>
      </div>
    </div>
  );
}
