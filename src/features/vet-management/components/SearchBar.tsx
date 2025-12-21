import { Search } from 'lucide-react';
import type { SearchBarProps } from '../types';

export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
}: SearchBarProps) {
  return (
    <div className="relative" data-testid="search-bar">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid="search-input"
        className="block w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-xl
                   bg-white focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                   transition-all duration-200"
      />
    </div>
  );
}
