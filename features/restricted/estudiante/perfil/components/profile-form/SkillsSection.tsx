import React from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tag } from '../ui/Tag';
import { StudentSkill } from '../../types/studentProfile.types';

interface SkillsSectionProps {
  formData: {
    skills: StudentSkill[];
  };
  actions: {
    handleRemoveSkill: (id: number) => void;
    handleAddSkill: (skill: string) => void;
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
    <div className="space-y-6">
      <div className="relative group">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkillClick();
            }
          }}
          placeholder="Añade una cualidad (ej: Liderazgo)"
          className="rounded-lg border border-gray-100 bg-white h-11 pr-12 text-sm font-medium text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:border-blue-600/50 transition-all placeholder:text-gray-300 shadow-sm"
        />
        <button 
          type="button"
          onClick={handleAddSkillClick}
          className="absolute right-1 top-1 h-9 w-9 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {formData.skills.map((skill) => (
          <Tag 
            key={skill.id} 
            variant="skill" 
            label={skill.skillName} 
            onRemove={() => skill.id && actions.handleRemoveSkill(skill.id)} 
          />
        ))}
      </div>
      
      {errors.skills && <p className="text-red-500 text-xs font-medium ml-1">{errors.skills}</p>}
    </div>
  );
};
