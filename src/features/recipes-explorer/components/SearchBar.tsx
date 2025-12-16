import { Search } from 'lucide-react';
import type { SearchBarProps } from '../types';

export function SearchBar({ value, onChange, placeholder = 'Buscar recetas...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 transition-colors duration-200 peer-focus:text-accent-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid="search-input"
        className="peer w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-white/50 hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent focus:shadow-md transition-all duration-200 text-neutral-900 placeholder:text-neutral-400"
      />
    </div>
  );
}
