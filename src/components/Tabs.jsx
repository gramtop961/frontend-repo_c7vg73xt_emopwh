export default function Tabs({ value, onChange }) {
  const tabs = [
    { key: 'random', label: 'Random' },
    { key: 'themes', label: 'Themes' },
    { key: 'memes', label: 'Memes' },
    { key: 'cute', label: 'Cute' },
  ];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="inline-flex rounded-xl bg-white/60 p-1 border border-fuchsia-200/60 shadow-sm">
          {tabs.map((t) => {
            const active = value === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={
                  'px-4 py-2 rounded-lg text-sm font-medium transition ' +
                  (active
                    ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow'
                    : 'text-black/70 hover:text-black hover:bg-black/5')
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
