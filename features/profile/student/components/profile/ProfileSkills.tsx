import React from 'react';
import { Zap } from 'lucide-react';
import { Tag } from '../ui/Tag';
import { StudentSkill } from '../../types/studentProfile.types';

interface ProfileSkillsProps {
  skills?: StudentSkill[];
}

export const ProfileSkills: React.FC<ProfileSkillsProps> = ({ skills }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Zap className="h-6 w-6 text-[#1a4b9e]" strokeWidth={2.5} />
        <h3 className="text-xl font-bold text-[#1a4b9e]">Cualidades</h3>
      </div>
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap font-semibold gap-2">
          {skills.map((s, idx) => (
            <Tag key={idx} variant="skill" label={s.skillName} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">Aún no has añadido cualidades.</p>
      )}
    </section>
  );
};
