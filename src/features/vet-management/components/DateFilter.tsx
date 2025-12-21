import { Calendar } from 'lucide-react';
import type { DateFilterProps } from '../types';

export function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  return (
    <div className="flex items-center gap-3" data-testid="date-filter">
      <Calendar className="w-5 h-5 text-white" />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        data-testid="date-input"
        className="px-4 py-2 border border-neutral-200 rounded-xl bg-white
                   focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                   transition-all duration-200"
      />
    </div>
  );
}
