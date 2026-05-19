import { useState, useCallback } from 'react';
import { addStudentSkill, deleteStudentSkill } from '../services/studentProfileService';
import { StudentSkill } from '../types/studentProfile.types';

export const useSkills = () => {
  const [skills, setSkills] = useState<StudentSkill[]>([]);
  const [initialSkills, setInitialSkills] = useState<StudentSkill[]>([]);

  const handleAddSkill = useCallback((skillName: string) => {
    if (!skillName.trim()) return;
    // Añadir localmente con un ID temporal negativo para identificar que es nuevo
    const tempId = Math.floor(Math.random() * -1000);
    setSkills(prev => [...prev, { id: tempId, skillName: skillName.trim() }]);
  }, []);

  const handleRemoveSkill = useCallback((id: number) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  }, []);

  const syncSkills = async () => {
    const toAdd = skills.filter(s => !initialSkills.find(is => is.id === s.id));
    const toDelete = initialSkills.filter(is => !skills.find(s => s.id === is.id));

    // Ejecutar eliminaciones
    for (const skill of toDelete) {
      if (skill.id) await deleteStudentSkill(skill.id);
    }

    // Ejecutar adiciones
    for (const skill of toAdd) {
      await addStudentSkill(skill.skillName);
    }
    
    setInitialSkills(skills);
  };

  return {
    skills,
    setSkills,
    setInitialSkills,
    handleAddSkill,
    handleRemoveSkill,
    syncSkills
  };
};
