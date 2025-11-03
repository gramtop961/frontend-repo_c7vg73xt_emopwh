import React, { useMemo, useState } from 'react';
import { Search, RefreshCcw, ExternalLink } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ lang = 'en', setLang, t }) {
  // Multiple avatar sources + robust fallback to ensure an image always shows
  const sources = useMemo(
    () => [
      'https://loremflickr.com/96/96/kitten',
      'https://placekitten.com/96/96',
      // Data URI fallback (cat emoji on gradient) so we never end up with a broken image
      'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>
            <defs>
              <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stop-color='#f0abfc'/>
                <stop offset='100%' stop-color='#93c5fd'/>
              </linearGradient>
            </defs>
            <rect width='100%' height='100%' fill='url(#g)'/>
            <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='56'>🐱</text>
          </svg>`
        ),
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const avatarSrc = sources[idx] ?? sources[sources.length - 1];

  const handleError = () => {
    setIdx((i) => (i + 1) % sources.length);
  };

  const handleShare = () => {
    const url = window.location.origin;
    try {
      navigator.clipboard?.writeText(url);
    } catch {}
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            onError={handleError}
            alt="kitti.cat avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover shadow-lg select-none"
            loading="eager"
            decoding="async"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="text-fuchsia-700">kitti</span>
              <span className="text-slate-900">.cat</span>
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">{t?.('tagline')}</p>
          </div>
        </div>
        <div className="hidden md:flex items-center text-slate-500 text-sm gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label={t?.('openSite')}
            title={t?.('openSite')}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t?.('openSite')}
          </button>
          <div className="hidden sm:flex items-center"><Search className="h-4 w-4 mr-2" /><span>{t?.('tryExamples')}</span></div>
          <button
            type="button"
            onClick={() => setIdx((i) => (i + 1) % sources.length)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            aria-label={t?.('newAvatar')}
            title={t?.('newAvatar')}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            {t?.('newAvatar')}
          </button>
          <LanguageSwitcher lang={lang} onChange={setLang} />
        </div>
      </div>
    </header>
  );
}
