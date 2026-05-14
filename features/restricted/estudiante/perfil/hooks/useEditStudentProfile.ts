import { useState, useEffect, useCallback, useMemo } from 'react';
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
  const skillsHook = useSkills();

  const loadProfile = useCallback(async (silent = false) => {
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
        
        const initialSkills = data.studentSkills ?? [];
        skillsHook.setSkills(initialSkills);
        skillsHook.setInitialSkills(initialSkills);
        
        imageHook.setImageUrl(data.imgUrl ?? null);
      }
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      toast.error("No se pudo cargar el perfil");
    } finally {
      if (!silent) setLoading(false);
    }
  }, [formHook, workDaysHook, imageHook, skillsHook]);


  useEffect(() => {
    setEmail(localStorage.getItem("user_email") ?? "");
    loadProfile();
  }, []); // Solo al montar

  const handleSave = async () => {
    const formErrors = validateEditProfile({
      name: formHook.name,
      phone: formHook.contactNumber,
      description: formHook.description,
      skills: skillsHook.skills.map(s => s.skillName),
      days: workDaysHook.days.length > 0 ? workDaysHook.days[0] : null,
      jornada: workDaysHook.jornada
    });
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    setSaving(true);
    try {
      // 1. Guardar Perfil Básico e Imagen
      await updateStudentProfile({
        name: formHook.name,
        contactNumber: formHook.contactNumber,
        description: formHook.description,
        jornada: workDaysHook.jornada,
        imageFile: imageHook.imageFile ?? undefined
      });

      // 2. Sincronizar Días
      await workDaysHook.syncDays();

      // 3. Sincronizar Habilidades (Ahora es diferido hasta este punto)
      await skillsHook.syncSkills();

      toast.success("Perfil actualizado correctamente");
      
      // Pequeña espera para asegurar que el backend procesó todo antes de redirigir
      setTimeout(() => {
        router.push("/estudiante/perfil");
      }, 500);
      
    } catch (error: any) {
      console.error("Error al guardar:", error);
      toast.error(error.message || "Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  const inicial = useMemo(() => 
    (formHook.name || email).charAt(0).toUpperCase() || "E", 
  [formHook.name, email]);

  const formData = useMemo(() => ({
    name: formHook.name,
    contactNumber: formHook.contactNumber,
    description: formHook.description,
    jornada: workDaysHook.jornada,
    days: workDaysHook.days,
    skills: skillsHook.skills,
    imageUrl: imageHook.imageUrl,
    email
  }), [formHook.name, formHook.contactNumber, formHook.description, workDaysHook.jornada, workDaysHook.days, skillsHook.skills, imageHook.imageUrl, email]);

  const setters = useMemo(() => ({
    setName: formHook.setName,
    setContactNumber: formHook.setContactNumber,
    setDescription: formHook.setDescription,
    setJornada: workDaysHook.setJornada,
    setDays: workDaysHook.setDays,
  }), [formHook.setName, formHook.setContactNumber, formHook.setDescription, workDaysHook.setJornada, workDaysHook.setDays]);

  const actions = useMemo(() => ({
    handleImageChange: imageHook.handleImageChange,
    handleAddSkill: skillsHook.handleAddSkill,
    handleRemoveSkill: skillsHook.handleRemoveSkill,
    handleToggleDay: workDaysHook.handleToggleDay,
    handleSave,
    triggerFileInput: imageHook.triggerFileInput
  }), [imageHook.handleImageChange, skillsHook.handleAddSkill, skillsHook.handleRemoveSkill, workDaysHook.handleToggleDay, handleSave, imageHook.triggerFileInput]);

  const refs = useMemo(() => ({
    fileInputRef: imageHook.fileInputRef
  }), [imageHook.fileInputRef]);

  return {
    loading,
    saving,
    formData,
    setters,
    actions,
    refs,
    errors,
    inicial
  };
};
