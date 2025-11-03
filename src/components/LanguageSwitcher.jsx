import React from 'react';

export default function LanguageSwitcher({ lang = 'en', onChange }) {
  const isRU = lang === 'ru';
  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://placekitten.com/40/${isRU ? 42 : 40}`}
        alt="Cat"
        width={28}
        height={28}
        className="h-7 w-7 rounded-full object-cover shadow"
      />
      <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 bg-white text-xs font-medium shadow-sm">
        <button
          type="button"
          onClick={() => onChange?.('en')}
          className={`px-2.5 py-1.5 ${!isRU ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
          aria-pressed={!isRU}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => onChange?.('ru')}
          className={`px-2.5 py-1.5 ${isRU ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
          aria-pressed={isRU}
        >
          RU
        </button>
      </div>
    </div>
  );
}
