import React, { useState } from 'react';

export default function RandomCard({ t }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandom = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=1&order=Rand');
      const data = await res.json();
      const url = Array.isArray(data) && data[0]?.url ? data[0].url : null;
      setImg(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 mt-8">
      <div
        onClick={fetchRandom}
        role="button"
        aria-label="reveal-random-cat"
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-fuchsia-400/40 bg-fuchsia-500/5 hover:bg-fuchsia-500/10 transition-colors duration-300 shadow-xl shadow-fuchsia-900/10"
      >
        <div className="aspect-[4/3] w-full flex items-center justify-center p-4">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-fuchsia-100/80">
              <div className="h-10 w-10 rounded-full border-2 border-fuchsia-400/40 border-t-fuchsia-400 animate-spin" />
              <p className="text-sm">{t('actions.loading')}</p>
            </div>
          ) : img ? (
            <img
              src={img}
              alt={t('gallery.catAlt')}
              className="h-full w-full object-cover rounded-xl"
            />
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-white">
                {t('random.tap')}
              </p>
              <p className="mt-1 text-sm text-fuchsia-100/70">{t('random.hint')}</p>
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-purple-500/10" />
        {img && (
          <div className="absolute bottom-3 right-3">
            <span className="rounded-md bg-fuchsia-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-md shadow-fuchsia-900/30">
              {t('random.new')}
            </span>
          </div>
        )}
      </div>
      <p className="mt-3 text-center text-sm text-fuchsia-100/70">{t('random.tapHint')}</p>
    </section>
  );
}
