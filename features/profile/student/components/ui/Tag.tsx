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
        return 'border-[2px] font-semibold border-blue-800 bg-blue-100 text-blue-800 px-4 py-2 text-sm';
      case 'day':
        return 'border border-red-300 text-green-600 px-4 py-1 text-sm font-medium';
      case 'specific_day':
        return 'border border-green-700 bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold';
      case 'schedule':
        return 'border border-orange-600 text-orange-700 bg-orange-100 px-4 py-1 text-sm font-medium';
      default:
        return 'bg-gray-100 text-gray-800 px-4 py-1 text-sm';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${getStyles()}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-blue-900 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </span>
  );
};
