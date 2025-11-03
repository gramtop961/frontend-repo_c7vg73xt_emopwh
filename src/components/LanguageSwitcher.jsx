import React from 'react';

export default function LanguageSwitcher({ lang, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="https://cataas.com/cat?width=40&height=40&random=lang"
        alt="cat thumb"
        className="w-8 h-8 rounded object-cover ring-2 ring-white/60"
      />
      <div className="inline-flex overflow-hidden rounded-lg border border-white/20">
        <button
          type="button"
          onClick={() => onChange('en')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            lang === 'en' ? 'bg-white text-gray-900' : 'bg-transparent text-white hover:bg-white/10'
          }`}
          aria-pressed={lang === 'en'}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => onChange('ru')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors ${
            lang === 'ru' ? 'bg-white text-gray-900' : 'bg-transparent text-white hover:bg-white/10'
          }`}
          aria-pressed={lang === 'ru'}
        >
          RU
        </button>
      </div>
    </div>
  );
}
