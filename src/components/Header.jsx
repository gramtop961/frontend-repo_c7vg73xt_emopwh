import React from 'react';
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://placekitten.com/96/96"
            alt="kitti.cat avatar"
            className="h-10 w-10 rounded-xl object-cover shadow-lg"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="text-fuchsia-700">kitti</span>
              <span className="text-slate-900">.cat</span>
            </h1>
            <p className="text-xs text-slate-500 -mt-0.5">Real cat photos. Search by breed or vibe.</p>
          </div>
        </div>
        <div className="hidden md:flex items-center text-slate-500 text-sm">
          <Search className="h-4 w-4 mr-2" />
          Try: "Siamese", "Bengal", or "black"
        </div>
      </div>
    </header>
  );
}
