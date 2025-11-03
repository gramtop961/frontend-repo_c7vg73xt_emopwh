import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import ThemePicker from './components/ThemePicker.jsx';
import RandomCard from './components/RandomCard.jsx';

// Simple i18n helper
const dictionary = {
  en: {
    randomTap: 'Tap for a new cat',
    randomHint: 'Tip: tap anywhere on the frame to refresh',
    themesTitle: 'Themes',
    noteOther: 'These sections are coming soon. For now, enjoy random cats!',
    memes: 'Memes',
    cute: 'Cute',
    random: 'Random',
    themes: 'Themes',
  },
  ru: {
    randomTap: 'Нажмите, чтобы получить нового кота',
    randomHint: 'Подсказка: нажмите по карточке, чтобы обновить',
    themesTitle: 'Темы',
    noteOther: 'Эти разделы скоро появятся. Пока наслаждайтесь рандомными котиками!',
    memes: 'Мемы',
    cute: 'Милые',
    random: 'Случайно',
    themes: 'Темы',
  },
};

function useLocale() {
  const [locale, setLocale] = useState('en');
  useEffect(() => {
    const lang = (navigator.language || 'en').toLowerCase();
    setLocale(lang.startsWith('ru') ? 'ru' : 'en');
  }, []);
  return [locale, setLocale];
}

export default function App() {
  const [locale] = useLocale();
  const t = (key) => dictionary[locale]?.[key] ?? key;

  const THEMES = useMemo(
    () => [
      { id: 'christmas', label: 'Christmas', count: 15 },
      { id: 'halloween', label: 'Halloween', count: 1 },
      { id: 'easter', label: 'Easter', count: 5 },
      { id: 'movies', label: 'Movies', count: 4 },
      { id: 'cartoons', label: 'Cartoons', count: 3 },
    ],
    []
  );

  const [vibe, setVibe] = useState('random'); // 'random' | 'themes' | 'memes' | 'cute'
  const [theme, setTheme] = useState(THEMES[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-white to-indigo-50 text-gray-900">
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Header title="kitti.cat" subtitle="purrfect vibes" onLocaleChange={null} />

        <div className="sticky top-0 z-20 pt-4 pb-3 bg-gradient-to-b from-white/70 to-white/0 backdrop-blur-md">
          <Tabs
            active={vibe}
            onChange={setVibe}
            labels={{ random: t('random'), themes: t('themes'), memes: t('memes'), cute: t('cute') }}
          />
        </div>

        {vibe === 'themes' && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{t('themesTitle')}</h2>
            <ThemePicker themes={THEMES} active={theme} onSelect={setTheme} />
          </div>
        )}

        {(vibe === 'random' || vibe === 'themes') && (
          <div className="mt-6">
            <RandomCard t={t} theme={vibe === 'themes' ? theme : null} />
            <p className="mt-3 text-sm text-gray-600">{t('randomHint')}</p>
          </div>
        )}

        {vibe === 'memes' && (
          <div className="mt-8 rounded-xl border border-fuchsia-200/60 bg-white/70 p-6 shadow-sm">
            <p className="text-gray-700">{t('noteOther')}</p>
          </div>
        )}

        {vibe === 'cute' && (
          <div className="mt-8 rounded-xl border border-indigo-200/60 bg-white/70 p-6 shadow-sm">
            <p className="text-gray-700">{t('noteOther')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
