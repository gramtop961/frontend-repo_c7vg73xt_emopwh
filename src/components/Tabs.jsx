export default function Tabs({ active, onChange, labels }) {
  const items = [
    { key: 'random', label: labels?.random || 'Random' },
    { key: 'themes', label: labels?.themes || 'Themes' },
    { key: 'memes', label: labels?.memes || 'Memes' },
    { key: 'cute', label: labels?.cute || 'Cute' },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-2 rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-black/5">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onChange?.(it.key)}
              className={
                'relative flex-1 select-none rounded-xl px-4 py-2 text-sm font-medium transition ' +
                (isActive
                  ? 'text-white shadow-md bg-gradient-to-br from-fuchsia-500 to-indigo-500'
                  : 'text-gray-700 hover:bg-white/70')
              }
            >
              {isActive && (
                <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/30" />
              )}
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
