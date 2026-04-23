import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { validateEditProfile } from '@/features/restricted/estudiante/utils/validator';
import { getStudentProfile, updateStudentProfile } from '../services/studentProfileService';
import { normalizeDays } from '../utils/workDays.utils';

import { useProfileForm } from './useProfileForm';
import { useSkills } from './useSkills';
import { useWorkDays } from './useWorkDays';
import { useImageUpload } from './useImageUpload';

export const useEditStudentProfile = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formHook = useProfileForm();
  const workDaysHook = useWorkDays();
  const imageHook = useImageUpload();

  const loadProfile = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await getStudentProfile();
      if (data) {
        setUserId(data.userId || data.id || "");
        formHook.setName(data.name ?? "");
        formHook.setContactNumber(data.contactNumber ?? "");
        formHook.setDescription(data.description ?? "");
        
        workDaysHook.setJornada(data.workSchedule ?? null);
        const uniqueNormalizedDays = normalizeDays(data.workDays || []);
        workDaysHook.setDays(uniqueNormalizedDays);
        workDaysHook.setInitialDays(uniqueNormalizedDays);
        
        skillsHook.setSkills(data.studentSkills ?? []);
        imageHook.setImageUrl(data.imgUrl ?? null);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      toast.error("No se pudo cargar el perfil");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const skillsHook = useSkills(loadProfile);

  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "");
    loadProfile();
  }, []);

  const handleSave = async () => {
    const formErrors = validateEditProfile({
      name: formHook.name,
      phone: formHook.contactNumber,
      description: formHook.description,
      skills: skillsHook.skills.map(s => s.skillName),
      days: workDaysHook.days.length > 0 ? workDaysHook.days[0] : null,
      jornada: workDaysHook.jornada
    });
    setErrors(formErrors);

    setSaving(true);
    try {
      await updateStudentProfile({
        name: formHook.name,
        contactNumber: formHook.contactNumber,
        description: formHook.description,
        jornada: workDaysHook.jornada,
        imageFile: imageHook.imageFile ?? undefined
      });

      await workDaysHook.syncDays(userId);

      toast.success("Perfil actualizado correctamente");
      router.push("/estudiante/perfil");
    } catch (error: any) {
      console.error("Error al guardar:", error);
      toast.error(error.message || "Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const inicial = (formHook.name || email).charAt(0).toUpperCase() || "E";

  return {
    loading,
    saving,
    formData: {
      name: formHook.name,
      contactNumber: formHook.contactNumber,
      description: formHook.description,
      jornada: workDaysHook.jornada,
      days: workDaysHook.days,
      skills: skillsHook.skills,
      imageUrl: imageHook.imageUrl,
      email
    },
    setters: {
      setName: formHook.setName,
      setContactNumber: formHook.setContactNumber,
      setDescription: formHook.setDescription,
      setJornada: workDaysHook.setJornada,
      setDays: workDaysHook.setDays,
    },
    actions: {
      handleImageChange: imageHook.handleImageChange,
      handleAddSkill: skillsHook.handleAddSkill,
      handleRemoveSkill: skillsHook.handleRemoveSkill,
      handleToggleDay: workDaysHook.handleToggleDay,
      handleSave,
      triggerFileInput: imageHook.triggerFileInput
    },
    refs: {
      fileInputRef: imageHook.fileInputRef
    },
    errors,
    inicial
  };
};
