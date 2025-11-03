import { Cat } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white">
          <Cat className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">kitti.cat</h1>
        <span className="ml-2 text-sm text-black/50">one tap to reveal a cat</span>
      </div>
    </header>
  );
}
