import { useState } from 'react';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import ThemePicker, { THEMES } from './components/ThemePicker.jsx';
import RandomCard from './components/RandomCard.jsx';

const I18N = {
  en: {
    randomTap: 'Tap to reveal a cat',
    randomHint: 'Tap again for a new one',
    themesTitle: 'Pick a theme',
    noteOther: 'Memes and Cute tabs keep working as before.'
  },
  ru: {
    randomTap: 'Ткни, чтобы увидеть кота',
    randomHint: 'Ещё раз — новый кот',
    themesTitle: 'Выбери тематику',
    noteOther: 'Вкладки Мемы и Мимими работают как раньше.'
  },
};

function useLocale() {
  const [lang] = useState(navigator.language?.startsWith('ru') ? 'ru' : 'en');
  const t = (key) => I18N[lang]?.[key] ?? key;
  return { lang, t };
}

export default function App() {
  const [vibe, setVibe] = useState('random');
  const [theme, setTheme] = useState(THEMES[0]);
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-violet-50 text-black">
      <Header />

      <main className="space-y-6 py-8">
        <Tabs value={vibe} onChange={setVibe} />

        {vibe === 'themes' && (
          <section className="space-y-4">
            <div className="mx-auto max-w-6xl px-4">
              <h2 className="text-sm font-medium text-black/60">{t('themesTitle')}</h2>
            </div>
            <ThemePicker value={theme} onChange={setTheme} />
            <RandomCard categoryId={theme?.categoryId} hint={t('randomTap')} action={t('randomHint')} />
          </section>
        )}

        {vibe === 'random' && (
          <section>
            <RandomCard hint={t('randomTap')} action={t('randomHint')} />
          </section>
        )}

        {(vibe === 'memes' || vibe === 'cute') && (
          <section className="mx-auto max-w-6xl px-4">
            <div className="rounded-xl border border-black/10 bg-white p-4 text-sm text-black/60">
              {t('noteOther')}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
