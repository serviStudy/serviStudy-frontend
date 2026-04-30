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
        return 'border-[2px] rounded-xl font-semibold border-blue-800 bg-blue-100 text-blue-800 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm';
      case 'day':
      case 'specific_day':
        return 'border rounded-xl border-green-700 bg-green-100 text-green-700 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold';
      case 'schedule':
        return 'border rounded-xl border-orange-600 text-orange-700 bg-orange-100 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium';
      default:
        return 'bg-gray-100 rounded-xl text-gray-800 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 ${getStyles()}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-blue-900 focus:outline-none ml-1"
        >
          <X className="h-3 w-3 md:h-4 md:w-4" />
        </button>
      )}
    </span>
  );
};
