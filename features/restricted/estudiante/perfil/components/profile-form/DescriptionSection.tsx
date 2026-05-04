import React from 'react';
import { AlignLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { SectionTitle } from './SectionTitle';

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
    <section>
      <SectionTitle title="Descripción del Perfil" icon={AlignLeft} />
      <div className="space-y-2.5">
        <div className="relative group">
          <AlignLeft className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setters.setDescription(e.target.value)}
            placeholder="Describe tu experiencia, habilidades blandas, y qué buscas aportar..."
            className="pl-12 pt-4 min-h-[160px] rounded-xl border border-gray-100 bg-gray-50/50 text-sm md:text-base font-medium text-gray-600 focus-visible:ring-4 focus-visible:ring-blue-600/5 focus-visible:border-blue-600/20 transition-all resize-none placeholder:text-gray-300"
          />
        </div>
        {errors.description && <p className="text-red-500 text-xs font-medium ml-1">{errors.description}</p>}
      </div>
    </section>
  );
};
