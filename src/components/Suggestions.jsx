import React from 'react';

const breedAndColor = [
  'Siamese',
  'Persian',
  'Bengal',
  'Maine Coon',
  'Sphynx',
  'British Shorthair',
  'Ragdoll',
  'Norwegian Forest',
  'black',
  'white',
  'tabby',
  'calico',
  'ginger',
  'tuxedo',
  'blue point',
];

const vibes = [
  'cute',
  'grumpy',
  'funny',
  'sleepy',
  'playful',
  'majestic',
  'chonky',
  'tiny',
  'fluffy',
  'sunglasses',
  'hats',
  'boxes',
  'ties',
  'space',
  'sinks',
];

export default function Suggestions({ onPick, onVibe }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Breeds & colors</h3>
        <div className="flex flex-wrap gap-2">
          {breedAndColor.map((s) => (
            <button
              key={s}
              onClick={() => onPick?.(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Vibes</h3>
        <div className="flex flex-wrap gap-2">
          {vibes.map((s) => (
            <button
              key={s}
              onClick={() => onVibe?.(s)}
              className="rounded-full bg-fuchsia-600/10 px-3 py-1.5 text-xs font-medium text-fuchsia-800 hover:bg-fuchsia-600/20 border border-fuchsia-200"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
