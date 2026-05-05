import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  variant?: 'skill' | 'day' | 'schedule' | 'specific_day';
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'skill', onRemove }) => {
  const getStyles = () => {
    switch (variant) {
      case 'skill':
        return 'border rounded-lg font-bold border-blue-100 bg-blue-50 text-blue-600 px-3 py-1.5 text-xs tracking-tight shadow-sm';
      case 'day':
      case 'specific_day':
        return 'border rounded-lg border-green-200 bg-green-50 text-green-700 px-3 py-1 text-[11px] font-bold shadow-sm uppercase tracking-wide';
      case 'schedule':
        return 'border rounded-lg border-orange-200 text-orange-700 bg-orange-50 px-3 py-1 text-[11px] font-bold shadow-sm uppercase tracking-wide';
      default:
        return 'bg-gray-50 border border-gray-100 rounded-lg text-gray-600 px-3 py-1 text-[11px] font-bold shadow-sm';
    }
  };

  return (
    <span className={`inline-flex items-center gap-2 ${getStyles()}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-blue-900 focus:outline-none transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};
