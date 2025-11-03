const THEMES = [
  { key: 'christmas', label: 'Christmas', categoryId: 15 }, // clothes
  { key: 'halloween', label: 'Halloween', categoryId: 1 }, // hats
  { key: 'easter', label: 'Easter', categoryId: 5 }, // boxes (closest fun pick)
  { key: 'movies', label: 'Movie Cats', categoryId: 4 }, // sunglasses = cinematic vibes
  { key: 'cartoons', label: 'Cartoonish', categoryId: 3 }, // funny
];

export default function ThemePicker({ value, onChange }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex flex-wrap gap-2">
        {THEMES.map((t) => {
          const active = value?.key === t.key;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t)}
              className={
                'px-3 py-1.5 rounded-full text-sm transition border ' +
                (active
                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white border-transparent shadow'
                  : 'bg-white hover:bg-black/5 text-black border-black/10')
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { THEMES };
