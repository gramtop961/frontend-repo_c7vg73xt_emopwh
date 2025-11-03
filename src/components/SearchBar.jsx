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

export default function SearchBar({ t, filters, setFilters, onSearch, breeds = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="rounded-2xl bg-gradient-to-br from-fuchsia-900/30 via-fuchsia-800/20 to-purple-900/20 border border-fuchsia-500/20 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 items-stretch shadow-xl shadow-fuchsia-900/10">
        <label className="flex-1">
          <span className="block text-xs text-fuchsia-100/80 mb-1">{t('search.vibe')}</span>
          <select
            name="vibe"
            value={filters.vibe}
            onChange={handleChange}
            className="w-full rounded-xl bg-black/30 border border-fuchsia-500/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
          >
            {VIBES.map((v) => (
              <option key={v.key} value={v.key} className="bg-gray-900">
                {t(`vibes.${v.key}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1">
          <span className="block text-xs text-fuchsia-100/80 mb-1">{t('search.breed')}</span>
          <select
            name="breed"
            value={filters.breed}
            onChange={handleChange}
            className="w-full rounded-xl bg-black/30 border border-fuchsia-500/30 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
          >
            <option value="any" className="bg-gray-900">{t('breeds.any')}</option>
            {breeds.map((b) => (
              <option key={b.id} value={b.id} className="bg-gray-900">{b.name}</option>
            ))}
          </select>
        </label>

        <button
          onClick={onSearch}
          className="shrink-0 inline-flex items-center justify-center rounded-xl bg-fuchsia-500 text-white px-4 py-2 font-semibold hover:bg-fuchsia-400 transition-colors shadow-lg shadow-fuchsia-900/30"
        >
          {t('actions.search')}
        </button>
      </div>
      <p className="text-fuchsia-100/70 text-sm mt-2">
        {t('search.hint')}
      </p>
    </div>
  );
}

export { VIBES };
