import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Suggestions from './components/Suggestions';
import Gallery from './components/Gallery';

// Map fun "vibes" to TheCatAPI category ids for more variety
const VIBE_TO_CATEGORY = {
  funny: 3,
  boxes: 5,
  sunglasses: 4,
  hats: 1,
  space: 2,
  clothes: 15,
  sinks: 14,
  ties: 7,
};

const I18N = {
  en: {
    tagline: 'Real cat photos. Search by breed or vibe.',
    openSite: 'Open kitti.cat',
    tryExamples: 'Try: "Siamese", "Bengal", or "black"',
    searchPlaceholder: 'Search any cat breed or color...',
    search: 'Search',
    showing: 'Showing:',
    refresh: 'Refresh',
    loadMore: 'Load more cats',
    breedsColors: 'Breeds & colors',
    vibes: 'Vibes',
    emptyPrompt: 'Try searching for a breed like "Siamese" or a color like "black".',
    open: 'Open',
    preview: 'Preview',
    close: 'Close',
    newAvatar: 'New avatar',
    cats: 'cats',
  },
  ru: {
    tagline: 'Реальные фото котиков. Ищи по породе или настроению.',
    openSite: 'Открыть kitti.cat',
    tryExamples: 'Попробуй: «Сиамская», «Бенгальская» или «черный»',
    searchPlaceholder: 'Найди котика по породе или окрасу...',
    search: 'Искать',
    showing: 'Показываем:',
    refresh: 'Обновить',
    loadMore: 'Показать ещё котиков',
    breedsColors: 'Породы и окрасы',
    vibes: 'Вибы',
    emptyPrompt: 'Попробуй ввести породу, например «Сиамская», или цвет, например «черный».',
    open: 'Открыть',
    preview: 'Превью',
    close: 'Закрыть',
    newAvatar: 'Новый аватар',
    cats: 'котики',
  },
};

// Fetch real cat photos. Primary source: TheCatAPI (no key needed for light usage).
async function fetchCatImages({ query, vibe, page = 0, limit = 40 }) {
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
    url.searchParams.set('order', 'Rand');
    // Pagination for more cats
    url.searchParams.set('page', String(page));
    url.searchParams.set('size', 'med');

    // Prefer images with breed info if we resolved a breed id
    if (breedId) {
      url.searchParams.set('breed_ids', breedId);
    } else {
      // If a vibe maps to a category id, prefer that for variety
      const catId = VIBE_TO_CATEGORY[vibe?.toLowerCase?.() || ''];
      if (catId) url.searchParams.set('category_ids', String(catId));
      // Encourage images that have breeds when not filtering by category
      if (!catId) url.searchParams.set('has_breeds', '1');
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch cat photos');
    const data = await res.json();

    // Normalize into simple array of image URLs
    const urls = (Array.isArray(data) ? data : []).map((item) => item.url).filter(Boolean);

    // Fallback: if API returns nothing, show a few guaranteed kittens
    if (!urls.length) {
      return Array.from({ length: Math.min(16, limit) }).map((_, i) => `https://placekitten.com/${420 + (i % 6) * 20}/${420 + ((i + 3) % 6) * 20}`);
    }

    return urls;
  } catch (e) {
    // Network or API error fallback
    return Array.from({ length: 16 }).map((_, i) => `https://placekitten.com/${360 + (i % 6) * 30}/${360 + ((i + 2) % 6) * 30}`);
  }
}

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);
  const [query, setQuery] = useState('');
  const [vibe, setVibe] = useState('');
  const [page, setPage] = useState(0);
  const [lang, setLang] = useState('ru');

  const t = useCallback((key) => I18N[lang]?.[key] ?? I18N.en[key] ?? key, [lang]);

  const hasQuery = useMemo(() => Boolean((query || '').trim()), [query]);

  const runSearch = useCallback(async (q) => {
    const nextQuery = (q ?? '').trim();
    setQuery(nextQuery);
    setVibe('');
    setPage(0);
    setLoading(true);
    const urls = await fetchCatImages({ query: nextQuery, vibe: '', page: 0, limit: 40 });
    setImages(urls);
    setLoading(false);
  }, []);

  const runVibe = useCallback(async (v) => {
    setVibe(v);
    setQuery('');
    setPage(0);
    setLoading(true);
    const urls = await fetchCatImages({ query: '', vibe: v, page: 0, limit: 40 });
    setImages(urls);
    setLoading(false);
  }, []);

  const loadMore = useCallback(async () => {
    const next = page + 1;
    setPage(next);
    setLoading(true);
    const urls = await fetchCatImages({ query: hasQuery ? query : '', vibe: hasQuery ? '' : vibe, page: next, limit: 40 });
    setImages((prev) => [...prev, ...urls]);
    setLoading(false);
  }, [page, hasQuery, query, vibe]);

  useEffect(() => {
    // Initial showcase: cute vibe
    runVibe('cute');
  }, [runVibe]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-indigo-50 text-slate-900">
      <Header lang={lang} setLang={setLang} t={t} />

      <main className="mx-auto max-w-6xl px-4 pt-10 pb-28">
        <section className="mb-6">
          <div className="mx-auto max-w-3xl">
            <SearchBar onSearch={runSearch} t={t} />
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                {t('showing')} <span className="font-medium text-slate-800">{hasQuery ? `“${query}”` : (vibe ? `${vibe} ${t('cats')}` : 'cats')}</span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => (hasQuery ? runSearch(query) : runVibe(vibe || 'cute'))}
                  className="text-sm text-fuchsia-700 hover:underline"
                >
                  {t('refresh')}
                </button>
                <button
                  onClick={loadMore}
                  className="rounded-lg bg-fuchsia-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-fuchsia-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {t('loadMore')}
                </button>
              </div>
            </div>
            <div className="mt-4">
              <Suggestions onPick={runSearch} onVibe={runVibe} t={t} />
            </div>
          </div>
        </section>

        <section>
          <Gallery images={images} loading={loading} onOpen={setActiveSrc} t={t} />
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
                <a href={activeSrc} target="_blank" rel="noreferrer" className="rounded-lg bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-black">{t('open')}</a>
                <button onClick={() => setActiveSrc(null)} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">{t('close')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
