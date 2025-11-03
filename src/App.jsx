import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import SearchBar, { VIBES } from './components/SearchBar';
import Gallery from './components/Gallery';

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
  },
};

const MEME_CATEGORY_KEYS = new Set(['memes']);

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = useCallback((key) => I18N[lang][key] || key, [lang]);

  const [filters, setFilters] = useState({ vibe: 'all', breed: 'any' });
  const [page, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);

  const vibeMeta = useMemo(() => {
    return VIBES.reduce((acc, v) => {
      acc[v.key] = v.catId;
      return acc;
    }, {});
  }, []);

  const fetchCats = useCallback(async (append = false) => {
    const isMemes = MEME_CATEGORY_KEYS.has(filters.vibe);
    setLoading(true);
    try {
      const limit = 18;
      const nextPage = append ? page + 1 : 0;
      let url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${nextPage}&order=Desc`;

      const categoryId = vibeMeta[filters.vibe];
      if (categoryId) url += `&category_ids=${categoryId}`;
      if (filters.breed && filters.breed !== 'any') {
        url += `&breed_ids=${filters.breed}`;
      }

      // For Memes we also use TheCatAPI funny category (id=3)
      if (isMemes && !categoryId) {
        url += `&category_ids=3`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const newImages = (data || []).map((d) => d.url);
      setImages((prev) => (append ? [...prev, ...newImages] : newImages));
      setPage(nextPage);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filters, page, vibeMeta]);

  useEffect(() => {
    // initial load
    fetchCats(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchCats(false);
  };

  const handleLoadMore = () => {
    fetchCats(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Header lang={lang} setLang={setLang} t={t} />

      <main className="pt-4">
        <SearchBar t={t} filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        <Gallery t={t} images={images} onOpen={setActiveSrc} onLoadMore={handleLoadMore} loading={loading} />
      </main>

      {activeSrc && (
        <div
          className="fixed inset-0 z-30 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveSrc(null)}
        >
          <img
            src={activeSrc}
            alt={t('gallery.catAlt')}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}

      <footer className="py-10 text-center text-white/50">
        <p>© {new Date().getFullYear()} kitti.cat</p>
      </footer>
    </div>
  );
}
