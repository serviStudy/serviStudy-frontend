import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface DescriptionSectionProps {
  formData: {
    description: string;
  };
  setters: {
    setDescription: (val: string) => void;
  };
  errors: Record<string, string>;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  formData,
  setters,
  errors
}) => {
  return (
    <div className="space-y-4">
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setters.setDescription(e.target.value)}
        placeholder="Comparte tu experiencia, habilidades y metas académicas..."
        className="min-h-[280px] rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:border-blue-600/50 transition-all resize-none placeholder:text-gray-300"
      />
      
      <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
        <span>Se recomiendan al menos 100 caracteres</span>
        <span className={formData.description.length > 2000 ? "text-red-500" : ""}>
          {formData.description.length} / 2000
        </span>
      </div>
      
      {errors.description && <p className="text-red-500 text-xs font-medium ml-1">{errors.description}</p>}
    </div>
  );
};
