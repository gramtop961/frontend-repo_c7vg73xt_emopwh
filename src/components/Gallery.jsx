import React from 'react';
import ImageCard from './ImageCard';

export default function Gallery({ t, images, onOpen }) {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      {images.length === 0 ? (
        <div className="text-center text-white/70 py-16">
          <p className="text-lg">{t('gallery.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <ImageCard key={src + idx} src={src} t={t} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
