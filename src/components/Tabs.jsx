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
        <div className="inline-flex rounded-xl bg-black/5 p-1">
          {tabs.map((t) => {
            const active = value === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={
                  'px-4 py-2 rounded-lg text-sm font-medium transition ' +
                  (active
                    ? 'bg-white shadow-sm text-black'
                    : 'text-black/60 hover:text-black')
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
