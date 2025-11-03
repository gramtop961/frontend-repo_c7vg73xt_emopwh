export default function ThemePicker({ themes = [], active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((th) => {
        const isActive = th.id === active;
        return (
          <button
            key={th.id}
            onClick={() => onSelect?.(th.id)}
            className={
              'group relative rounded-full border px-4 py-2 text-sm transition ' +
              (isActive
                ? 'border-transparent text-white bg-gradient-to-br from-fuchsia-500 to-indigo-500 shadow'
                : 'border-gray-200 bg-white/80 text-gray-800 hover:bg-white')
            }
            title={`${th.label} • ${th.count}`}
          >
            <span className="font-medium">{th.label}</span>
            <span className={
              'ml-2 rounded-full px-2 py-0.5 text-[11px] leading-none ' +
              (isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600')
            }>
              {th.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
