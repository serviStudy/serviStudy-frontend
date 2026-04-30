import React from 'react';
import { Sparkles, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag } from '../ui/Tag';
import { SectionTitle } from './SectionTitle';
import { StudentSkill } from '../../types/studentProfile.types';

interface SkillsSectionProps {
  formData: {
    skills: StudentSkill[];
  };
  actions: {
    handleRemoveSkill: (id: number) => void;
  };
  errors: Record<string, string>;
  newSkill: string;
  setNewSkill: (val: string) => void;
  handleAddSkillClick: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  formData,
  actions,
  errors,
  newSkill,
  setNewSkill,
  handleAddSkillClick
}) => {
  return (
    <section>
      <SectionTitle title="Habilidades y Cualidades" icon={Sparkles} />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row max-w-2xl items-stretch sm:items-center gap-4">
          <div className="relative flex-1 group">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkillClick();
                }
              }}
              placeholder="Añadir habilidad (Ej. React, Liderazgo)"
              className="pl-12 rounded-xl border border-gray-100 bg-gray-50/50 h-12 text-sm md:text-base font-medium text-gray-700 focus-visible:ring-4 focus-visible:ring-blue-600/5 focus-visible:border-blue-600/20 w-full placeholder:text-gray-300 transition-all"
            />
          </div>
          <Button
            type="button"
            onClick={handleAddSkillClick}
            className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm flex items-center justify-center gap-4"
          >
            <PlusCircle className="h-7 w-7" />
            Añadir
          </Button>
        </div>

        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-3 p-6 bg-gray-50 rounded-xl border border-gray-100">
            {formData.skills.map((skill) => (
              <Tag 
                key={skill.id} 
                variant="skill" 
                label={skill.skillName} 
                onRemove={() => skill.id && actions.handleRemoveSkill(skill.id)} 
              />
            ))}
          </div>
        )}
        {errors.skills && <p className="text-red-500 text-xs font-medium ml-1">{errors.skills}</p>}
      </div>
    </section>
  );
};
