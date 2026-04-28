import { useState } from 'react';
import { toast } from 'sonner';
import { addStudentSkill, deleteStudentSkill } from '../services/studentProfileService';
import { StudentSkill } from '../types/studentProfile.types';

export const useSkills = (refreshProfile: (silent?: boolean) => Promise<void>) => {
  const [skills, setSkills] = useState<StudentSkill[]>([]);

  const handleAddSkill = async (skillName: string) => {
    if (!skillName.trim()) return;
    try {
      await addStudentSkill(skillName.trim());
      await refreshProfile(true);
      toast.success("Habilidad agregada");
    } catch (error: any) {
      toast.error("Error al agregar habilidad");
    }
  };

  const handleRemoveSkill = async (id: number) => {
    try {
      await deleteStudentSkill(id);
      await refreshProfile(true);
      toast.success("Habilidad eliminada");
    } catch (error: any) {
      toast.error("Error al eliminar habilidad");
    }
  };

  return {
    skills,
    setSkills,
    handleAddSkill,
    handleRemoveSkill
  };
};
