import { useCallback, useEffect, useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

const API_URL = 'https://api.thecatapi.com/v1/images/search?size=med';

export default function RandomCard({ t, theme = null }) {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCat = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // For themed mode we could add query hints in the future. For now, fetch random.
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      const url = data?.[0]?.url;
      if (!url) throw new Error('No image');
      setImg(url);
    } catch (e) {
      setError('Failed to load');
      setImg(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // refetch when theme changes to give a fresh vibe
    fetchCat();
  }, [fetchCat, theme]);

  return (
    <div className="relative">
      <button
        onClick={fetchCat}
        className="group w-full overflow-hidden rounded-2xl border-2 border-dashed border-fuchsia-300/70 bg-white/80 p-3 transition hover:border-fuchsia-400"
      >
        <div className="relative aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-fuchsia-50 to-indigo-50">
          {/* Image / loader */}
          {loading && (
            <div className="absolute inset-0 grid place-items-center">
              <Loader2 className="h-8 w-8 animate-spin text-fuchsia-500" />
            </div>
          )}
          {!loading && error && (
            <div className="absolute inset-0 grid place-items-center text-gray-500">
              <div className="flex items-center gap-2">
                <ImageOff className="h-6 w-6" />
                <span>{error}</span>
              </div>
            </div>
          )}
          {!loading && !error && img && (
            <img
              src={img}
              alt="Random cat"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          )}

          {/* Top-left theme badge in themed mode */}
          {theme && (
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
              {theme}
            </div>
          )}

          {/* Tap for new badge */}
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500 px-3 py-1 text-xs font-medium text-white shadow">
            {t('randomTap')}
          </div>
        </div>
      </button>
    </div>
  );
}
