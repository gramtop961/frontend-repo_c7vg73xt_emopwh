import React from 'react';
import { Cat, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-indigo-500 text-white shadow-lg">
            <Cat className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">kitti.Kat</h1>
            <p className="text-xs text-slate-500 -mt-0.5">Find endless cat photos by breed or color</p>
          </div>
        </div>
        <div className="hidden md:flex items-center text-slate-500 text-sm">
          <Search className="h-4 w-4 mr-2" />
          Type a breed (e.g., "Siamese") or color (e.g., "black")
        </div>
      </div>
    </header>
  );
}
