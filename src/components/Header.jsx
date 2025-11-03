import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ lang, setLang, t }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-gradient-to-b from-black/60 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            kitti.cat
          </h1>
          <a
            href="https://t.me/wloserw"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white/80 hover:text-white underline underline-offset-4"
          >
            @wloserw telegram
          </a>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-white/70 text-sm">
            {t('header.tagline')}
          </p>
          <LanguageSwitcher lang={lang} onChange={setLang} />
        </div>
      </div>
    </header>
  );
}
