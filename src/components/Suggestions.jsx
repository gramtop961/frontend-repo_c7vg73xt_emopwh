import React from 'react';

const suggestions = [
  'Siamese',
  'Persian',
  'Bengal',
  'Maine Coon',
  'Sphynx',
  'black',
  'white',
  'tabby',
  'calico',
  'ginger'
];

export default function Suggestions({ onPick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
