import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar, { VIBES } from './components/SearchBar';
import Gallery from './components/Gallery';
import Tabs from './components/Tabs';
import Pagination from './components/Pagination';
import RandomBar from './components/RandomBar';
import RandomCard from './components/RandomCard';

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
    'actions.shuffle': 'Shuffle',
    'gallery.empty': "Let's find some cats! Choose a category and hit Search.",
    'gallery.catAlt': 'Cat image',
    'tabs.memes': 'Memes',
    'tabs.cute': 'Cute',
    'tabs.all': 'All',
    'tabs.random': 'Random',
    'pagination.prev': 'Prev',
    'pagination.next': 'Next',
    'pagination.page': 'Page',
    'pagination.of': 'of',
    'random.hint': 'Pure randomness — fresh kitty picks every time you shuffle.',
    'random.tap': 'Tap to reveal a cat',
    'random.tapHint': 'Click the frame to get a new random kitty. Click again for another!',
    'random.new': 'click for new',
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
    'actions.shuffle': 'Перемешать',
    'gallery.empty': 'Давай найдём котиков! Выбери категорию и нажми Искать.',
    'gallery.catAlt': 'Изображение кота',
    'tabs.memes': 'Мемчики',
    'tabs.cute': 'Милые',
    'tabs.all': 'Все',
    'tabs.random': 'Рандом',
    'pagination.prev': 'Назад',
    'pagination.next': 'Вперёд',
    'pagination.page': 'Страница',
    'pagination.of': 'из',
    'random.hint': 'Чистый рандом — новые котики каждый раз, когда жмёшь Перемешать.',
    'random.tap': 'Нажми здесь — появится котик',
    'random.tapHint': 'Кликни по рамке, чтобы получить случайного кота. Ещё клик — новый!',
    'random.new': 'кликни для нового',
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
    const isRandom = filters.vibe === 'random';
    const isMemes = MEME_CATEGORY_KEYS.has(filters.vibe);
    const base = new URL('https://api.thecatapi.com/v1/images/search');
    base.searchParams.set('limit', String(PER_PAGE));
    base.searchParams.set('page', String(p));
    base.searchParams.set('order', 'Rand');

    if (!isRandom) {
      const categoryId = categoryOverride ?? vibeMeta[filters.vibe];
      if (categoryId) base.searchParams.set('category_ids', String(categoryId));
      if (includeBreed && filters.breed && filters.breed !== 'any') {
        base.searchParams.set('breed_ids', filters.breed);
      }
      if (isMemes && !categoryId) {
        base.searchParams.set('category_ids', '3'); // funny
      }
    }

    return base.toString();
  };

  const fetchPage = useCallback(async (targetPage) => {
    const isRandom = filters.vibe === 'random';
    if (isRandom) {
      // In random mode, we don't prefetch a gallery grid
      setImages([]);
      setPage(0);
      return;
    }
    setLoading(true);
    try {
      const urls = [buildUrl(targetPage)];

      // Fallbacks if breed has low coverage
      if (filters.breed && filters.breed !== 'any') {
        urls.push(buildUrl(targetPage, { includeBreed: false }));
      }
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

      const all = Array.from(
        new Map(
          results
            .flat()
            .map((d) => [d.url, d])
        ).values()
      );

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

  const isRandom = filters.vibe === 'random';

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
        {isRandom ? (
          <>
            {/* Optional info bar retained for context; you can remove if you want ultra-minimal */}
            {/* <RandomBar t={t} onShuffle={() => {}} /> */}
            <RandomCard t={t} />
          </>
        ) : (
          <>
            <SearchBar t={t} filters={filters} setFilters={setFilters} onSearch={handleSearch} breeds={breeds} />
            <Gallery t={t} images={images} onOpen={setActiveSrc} />
            <div className="max-w-6xl mx-auto px-4">
              <Pagination page={page} totalPages={TOTAL_PAGES} onPageChange={handlePageChange} t={t} />
              {loading && (
                <p className="mt-3 text-sm text-white/70">{t('actions.loading')}</p>
              )}
            </div>
          </>
        )}
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
