import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import Gallery from './components/Gallery';

function buildImageUrls(query, count = 28) {
  const q = encodeURIComponent(`cat ${query}`);
  // Use Unsplash Source with signature parameter to get diverse images without an API key
  return Array.from({ length: count }).map((_, i) => `https://source.unsplash.com/600x600/?${q}&sig=${i + 1}`);
}

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);
  const [query, setQuery] = useState('');

  const runSearch = useCallback((q) => {
    setQuery(q);
    setLoading(true);
    const urls = buildImageUrls(q, 28);
    // Preload a few to make initial view feel instant
    setImages(urls);
    // Small delay to allow skeletons to render smoothly
    setTimeout(() => setLoading(false), 400);
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
