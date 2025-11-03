import React from 'react';

const VIBES = [
  { key: 'all', catId: null },
  { key: 'memes', catId: 3 }, // funny category in TheCatAPI
  { key: 'hats', catId: 1 },
  { key: 'space', catId: 2 },
  { key: 'sunglasses', catId: 4 },
  { key: 'boxes', catId: 5 },
  { key: 'ties', catId: 7 },
  { key: 'sinks', catId: 14 },
  { key: 'clothes', catId: 15 },
];

export default function SearchBar({ t, filters, setFilters, onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col sm:flex-row gap-3 items-stretch">
        <label className="flex-1">
          <span className="block text-xs text-white/70 mb-1">{t('search.vibe')}</span>
          <select
            name="vibe"
            value={filters.vibe}
            onChange={handleChange}
            className="w-full rounded-lg bg-black/40 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {VIBES.map((v) => (
              <option key={v.key} value={v.key} className="bg-gray-900">
                {t(`vibes.${v.key}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1">
          <span className="block text-xs text-white/70 mb-1">{t('search.breed')}</span>
          <select
            name="breed"
            value={filters.breed}
            onChange={handleChange}
            className="w-full rounded-lg bg-black/40 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="any" className="bg-gray-900">{t('breeds.any')}</option>
          </select>
        </label>

        <button
          onClick={onSearch}
          className="shrink-0 inline-flex items-center justify-center rounded-lg bg-white text-gray-900 px-4 py-2 font-semibold hover:bg-white/90 transition-colors"
        >
          {t('actions.search')}
        </button>
      </div>
      <p className="text-white/60 text-sm mt-2">
        {t('search.hint')}
      </p>
    </div>
  );
}

export { VIBES };
