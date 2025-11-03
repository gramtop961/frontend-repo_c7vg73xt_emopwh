import { Cat } from 'lucide-react';

export default function Header({ title = 'kitti.cat', subtitle = 'purrfect vibes' }) {
  return (
    <header className="pt-8">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 text-white flex items-center justify-center shadow-md">
          <Cat className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
