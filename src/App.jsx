import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import Gallery from './components/Gallery';

// Fetch real cat photos. Primary source: TheCatAPI (no key needed for light usage).
async function fetchCatImages(query, limit = 28) {
  try {
    const q = (query || '').trim();

    // If the user typed a breed-like term, try to resolve it to a breed id
    let breedId = '';
    if (q) {
      const breedRes = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${encodeURIComponent(q)}`);
      if (breedRes.ok) {
        const breeds = await breedRes.json();
        if (Array.isArray(breeds) && breeds.length > 0) {
          breedId = breeds[0].id; // take the best match
        }
      }
    }

    const url = new URL('https://api.thecatapi.com/v1/images/search');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('mime_types', 'jpg,png');
    // Prefer images with breed info if we resolved a breed id
    if (breedId) url.searchParams.set('breed_ids', breedId);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch cat photos');
    const data = await res.json();

    // Normalize into simple array of image URLs
    const urls = (Array.isArray(data) ? data : []).map((item) => item.url).filter(Boolean);

    // Fallback: if API returns nothing, show a few guaranteed kittens
    if (!urls.length) {
      return Array.from({ length: Math.min(12, limit) }).map((_, i) => `https://placekitten.com/${400 + (i % 6) * 20}/${400 + ((i + 3) % 6) * 20}`);
    }

    return urls;
  } catch (e) {
    // Network or API error fallback
    return Array.from({ length: 12 }).map((_, i) => `https://placekitten.com/${360 + (i % 6) * 30}/${360 + ((i + 2) % 6) * 30}`);
  }
}

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);
  const [query, setQuery] = useState('');

  const runSearch = useCallback(async (q) => {
    setQuery(q);
    setLoading(true);
    const urls = await fetchCatImages(q, 28);
    setImages(urls);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Initial showcase
    runSearch('cute');
  }, [runSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-indigo-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-10 pb-24">
        <section className="mb-6">
          <div className="mx-auto max-w-3xl">
            <SearchBar onSearch={runSearch} />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Results for: <span className="font-medium text-slate-700">{query || '—'}</span>
              </p>
              <button
                onClick={() => runSearch(query || 'cats')}
                className="text-sm text-fuchsia-700 hover:underline"
              >
                Refresh
              </button>
            </div>
            <div className="mt-4">
              <Suggestions onPick={runSearch} />
            </div>
          </div>
        </section>

        <section>
          <Gallery images={images} loading={loading} onOpen={setActiveSrc} />
        </section>
      </main>

      {activeSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSrc(null)}
        >
          <div className="max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={activeSrc} alt="Selected cat" className="h-full w-full object-contain" />
            <div className="flex items-center justify-between border-t px-4 py-3 text-sm">
              <span className="text-slate-600 truncate pr-2">{activeSrc}</span>
              <div className="flex gap-2">
                <a href={activeSrc} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-black">Open</a>
                <button onClick={() => setActiveSrc(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
