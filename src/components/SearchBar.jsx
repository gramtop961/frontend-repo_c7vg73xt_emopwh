import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, t }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t?.('searchPlaceholder')}
          className="w-full rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 pr-12 text-[15px] shadow-sm outline-none focus:ring-4 focus:ring-fuchsia-200"
          aria-label={t?.('searchPlaceholder')}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 px-4 py-2 text-white shadow-md hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-fuchsia-200"
          aria-label={t?.('search')}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{t?.('search')}</span>
        </button>
      </div>
    </form>
  );
}
