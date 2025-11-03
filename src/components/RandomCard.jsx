import { useState } from 'react';

export default function RandomCard({ categoryId, hint = 'Tap to reveal a cat', action = 'Tap again for a new one' }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOne = async () => {
    try {
      setLoading(true);
      setError('');
      const url = new URL('https://api.thecatapi.com/v1/images/search');
      url.searchParams.set('limit', '1');
      url.searchParams.set('order', 'Rand');
      if (categoryId) url.searchParams.set('category_ids', String(categoryId));
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      const first = data?.[0];
      if (first?.url) setImg(first.url);
      else throw new Error('No image');
    } catch (e) {
      setError('Could not load a cat. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div
        role="button"
        onClick={fetchOne}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-dashed border-black/15 bg-white shadow-sm cursor-pointer group"
      >
        {/* Gradient glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-indigo-500/10" />

        {/* Content */}
        {!img && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
              {hint}
            </span>
            <span className="text-[13px] text-black/40">{action}</span>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-8 w-8 rounded-full border-2 border-black/10 border-t-transparent animate-spin" />
          </div>
        )}

        {img && (
          <img
            src={img}
            alt="Random Cat"
            className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-active:scale-[1.02]"
            loading="eager"
          />
        )}

        {img && !loading && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-xs font-medium text-black/70">
              Tap for new
            </span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="rounded-lg bg-white px-3 py-2 text-sm text-red-600 border border-red-200 shadow-sm">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
