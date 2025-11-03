import React from 'react';

const TABS = [
  { key: 'memes', icon: '😹' },
  { key: 'cute', icon: '😺' },
  { key: 'all', icon: '🐾' },
];

export default function Tabs({ current, onChange, t }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="inline-flex rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/10 backdrop-blur px-1 py-1 shadow-lg shadow-fuchsia-900/20">
        {TABS.map((tab) => {
          const active = current === tab.key || (tab.key === 'cute' && current === 'all');
          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key === 'cute' ? 'all' : tab.key)}
              className={`mx-0.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/60 ${
                active
                  ? 'bg-fuchsia-500 text-white shadow-md shadow-fuchsia-900/30'
                  : 'text-fuchsia-100/80 hover:bg-fuchsia-400/20'
              }`}
              aria-pressed={active}
            >
              <span className="mr-1">{tab.icon}</span>
              {t(`tabs.${tab.key}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
