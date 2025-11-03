import React from 'react';

export default function RandomBar({ t, onShuffle }) {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="rounded-2xl bg-gradient-to-br from-fuchsia-900/30 via-fuchsia-800/20 to-purple-900/20 border border-fuchsia-500/20 p-5 flex items-center justify-between gap-4 shadow-xl shadow-fuchsia-900/10">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">{t('tabs.random')}</h3>
          <p className="text-sm text-fuchsia-100/70">{t('random.hint')}</p>
        </div>
        <button
          onClick={onShuffle}
          className="shrink-0 inline-flex items-center justify-center rounded-xl bg-fuchsia-500 text-white px-4 py-2 font-semibold hover:bg-fuchsia-400 transition-colors shadow-lg shadow-fuchsia-900/30"
        >
          {t('actions.shuffle')}
        </button>
      </div>
    </div>
  );
}
