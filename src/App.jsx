import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar, { VIBES } from './components/SearchBar';
import Gallery from './components/Gallery';
import Tabs from './components/Tabs';
import Pagination from './components/Pagination';

const I18N = {
  en: {
    'header.tagline': 'Find the perfect vibe of kitties',
    'search.vibe': 'Category',
    'search.breed': 'Breed',
    'search.hint': 'Tip: Try categories like Hats, Space, Sunglasses — or switch to Memes for extra laughs.',
    'breeds.any': 'Any',
    'vibes.all': 'All',
    'vibes.memes': 'Memes',
    'vibes.hats': 'Hats',
    'vibes.space': 'Space',
    'vibes.sunglasses': 'Sunglasses',
    'vibes.boxes': 'Boxes',
    'vibes.ties': 'Ties',
    'vibes.sinks': 'Sinks',
    'vibes.clothes': 'Clothes',
    'actions.search': 'Search',
    'actions.open': 'Open',
    'actions.loadMore': 'Show more cats',
    'actions.loading': 'Loading…',
    'gallery.empty': "Let's find some cats! Choose a category and hit Search.",
    'gallery.catAlt': 'Cat image',
    'tabs.memes': 'Memes',
    'tabs.cute': 'Cute',
    'tabs.all': 'All',
    'pagination.prev': 'Prev',
    'pagination.next': 'Next',
    'pagination.page': 'Page',
    'pagination.of': 'of',
  },
  ru: {
    'header.tagline': 'Найди идеальное настроение котиков',
    'search.vibe': 'Категория',
    'search.breed': 'Порода',
    'search.hint': 'Подсказка: попробуй категории Шляпы, Космос, Очки — или открой Мемы ради смеха.',
    'breeds.any': 'Любая',
    'vibes.all': 'Все',
    'vibes.memes': 'Мемы',
    'vibes.hats': 'Шляпы',
    'vibes.space': 'Космос',
    'vibes.sunglasses': 'Очки',
    'vibes.boxes': 'Коробки',
    'vibes.ties': 'Галстуки',
    'vibes.sinks': 'Раковины',
    'vibes.clothes': 'Одежда',
    'actions.search': 'Искать',
    'actions.open': 'Открыть',
    'actions.loadMore': 'Показать ещё котиков',
    'actions.loading': 'Загрузка…',
    'gallery.empty': 'Давай найдём котиков! Выбери категорию и нажми Искать.',
    'gallery.catAlt': 'Изображение кота',
    'tabs.memes': 'Мемчики',
    'tabs.cute': 'Милые',
    'tabs.all': 'Все',
    'pagination.prev': 'Назад',
    'pagination.next': 'Вперёд',
    'pagination.page': 'Страница',
    'pagination.of': 'из',
  },
};

const MEME_CATEGORY_KEYS = new Set(['memes']);
const MEME_SUPPLEMENT_CATS = [4, 1]; // sunglasses, hats

const PER_PAGE = 36; // More cats per page
const TOTAL_PAGES = 100; // 99 more pages + first one

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = useCallback((key) => I18N[lang][key] || key, [lang]);

  const [filters, setFilters] = useState({ vibe: 'all', breed: 'any' });
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);
  const [breeds, setBreeds] = useState([]);

  const vibeMeta = useMemo(() => {
    return VIBES.reduce((acc, v) => {
      acc[v.key] = v.catId;
      return acc;
    }, {});
  }, []);

  // Fetch breeds list once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://api.thecatapi.com/v1/breeds');
        const data = await res.json();
        setBreeds(Array.isArray(data) ? data.map(({ id, name }) => ({ id, name })) : []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const buildUrl = (p, { includeBreed = true, categoryOverride = null } = {}) => {
    const isMemes = MEME_CATEGORY_KEYS.has(filters.vibe);
    const base = new URL('https://api.thecatapi.com/v1/images/search');
    base.searchParams.set('limit', String(PER_PAGE));
    base.searchParams.set('page', String(p));
    base.searchParams.set('order', 'Rand');

    const categoryId = categoryOverride ?? vibeMeta[filters.vibe];
    if (categoryId) base.searchParams.set('category_ids', String(categoryId));
    if (includeBreed && filters.breed && filters.breed !== 'any') {
      base.searchParams.set('breed_ids', filters.breed);
    }
    if (isMemes && !categoryId) {
      base.searchParams.set('category_ids', '3'); // funny
    }
    return base.toString();
  };

  const fetchPage = useCallback(async (targetPage) => {
    setLoading(true);
    try {
      const urls = [buildUrl(targetPage)];

      // Fallbacks if breed has low coverage
      // 1) Same category but without breed
      if (filters.breed && filters.breed !== 'any') {
        urls.push(buildUrl(targetPage, { includeBreed: false }));
      }
      // 2) If memes selected, supplement with sunglasses/hats
      if (MEME_CATEGORY_KEYS.has(filters.vibe)) {
        for (const cat of MEME_SUPPLEMENT_CATS) {
          urls.push(buildUrl(targetPage, { includeBreed: true, categoryOverride: cat }));
        }
      }

      const results = await Promise.all(
        urls.map((u) =>
          fetch(u)
            .then((r) => r.json())
            .catch(() => [])
        )
      );

      // Flatten and de-duplicate by URL
      const all = Array.from(
        new Map(
          results
            .flat()
            .map((d) => [d.url, d])
        ).values()
      );

      // Cap to PER_PAGE to keep grid clean
      const selected = all.slice(0, PER_PAGE).map((d) => d.url);
      setImages(selected);
      setPage(targetPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filters, vibeMeta]);

  useEffect(() => {
    fetchPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchPage(0);
  };

  const handlePageChange = (p) => {
    if (p < 0 || p >= TOTAL_PAGES) return;
    fetchPage(p);
  };

  return (
    <div className="min-h-screen relative text-white bg-gradient-to-b from-[#0d0117] via-[#140226] to-[#1a0632]">
      {/* Decorative side cats */}
      <img
        src="https://cataas.com/cat?width=240&height=240&random=left"
        alt="decorative cat left"
        className="pointer-events-none hidden md:block fixed left-2 bottom-6 opacity-20 blur-[1px] rounded-xl ring-2 ring-fuchsia-500/20"
      />
      <img
        src="https://cataas.com/cat?width=260&height=260&random=right"
        alt="decorative cat right"
        className="pointer-events-none hidden md:block fixed right-2 top-20 opacity-20 blur-[1px] rounded-xl ring-2 ring-fuchsia-500/20"
      />

      <Header lang={lang} setLang={setLang} t={t} />

      <main className="pt-4 space-y-6">
        <Tabs current={filters.vibe} onChange={(v) => setFilters((f) => ({ ...f, vibe: v }))} t={t} />
        <SearchBar t={t} filters={filters} setFilters={setFilters} onSearch={handleSearch} breeds={breeds} />
        <Gallery t={t} images={images} onOpen={setActiveSrc} />
        <div className="max-w-6xl mx-auto px-4">
          <Pagination page={page} totalPages={TOTAL_PAGES} onPageChange={handlePageChange} t={t} />
          {loading && (
            <p className="mt-3 text-sm text-white/70">{t('actions.loading')}</p>
          )}
        </div>
      </main>

      {activeSrc && (
        <div
          className="fixed inset-0 z-30 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveSrc(null)}
        >
          <img
            src={activeSrc}
            alt={t('gallery.catAlt')}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl shadow-fuchsia-900/50"
          />
        </div>
      )}

      <footer className="py-10 text-center text-white/60">
        <p>© {new Date().getFullYear()} kitti.cat</p>
      </footer>
    </div>
  );
}
