import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StudentSkill } from '../types/studentProfile.types';
import { isSpecificDays, isWeekDays, isWeekend, normalizeDays } from '../utils/workDays.utils';
import { WorkDaysModal } from './modals/WorkDaysModal';

// Modular Components
import { FormHeader } from './profile-form/FormHeader';
import { PersonalInfoSection } from './profile-form/PersonalInfoSection';
import { DescriptionSection } from './profile-form/DescriptionSection';
import { AvailabilitySection } from './profile-form/AvailabilitySection';
import { SkillsSection } from './profile-form/SkillsSection';
import { FormActions } from './profile-form/FormActions';

interface EditProfileFormProps {
  formData: {
    name: string;
    contactNumber: string;
    description: string;
    jornada: string | null;
    days: string[];
    skills: StudentSkill[];
    imageUrl: string | null;
    email: string;
  };
  setters: {
    setName: (val: string) => void;
    setContactNumber: (val: string) => void;
    setDescription: (val: string) => void;
    setJornada: (val: string) => void;
    setDays: React.Dispatch<React.SetStateAction<string[]>>;
  };
  actions: {
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddSkill: (skill: string) => void;
    handleRemoveSkill: (id: number) => void;
    handleToggleDay: (day: string) => void;
    handleSave: () => void;
    triggerFileInput: () => void;
  };
  refs: {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
  };
  errors: Record<string, string>;
  saving: boolean;
  inicial: string;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  formData,
  setters,
  actions,
  refs,
  errors,
  saving,
  inicial
}) => {
  const [newSkill, setNewSkill] = useState("");
  const [isDaysModalOpen, setIsDaysModalOpen] = useState(false);

  const DAYS_OPTIONS = ["Entre semana", "Fines de semana", "Específicos"];
  const SCHEDULE_OPTIONS = [
    { id: 'FULL_TIME', label: 'Jornada completa' },
    { id: 'PART_TIME', label: 'Media jornada' },
    { id: 'FLEXIBLE', label: 'Flexible' }
  ];

  const handlePresetDays = (preset: string) => {
    if (preset === "Entre semana") {
      setters.setDays(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]);
    } else if (preset === "Fines de semana") {
      setters.setDays(["SATURDAY", "SUNDAY"]);
    } else if (preset === "Específicos") {
      setIsDaysModalOpen(true);
    }
  };

  const normalizedDays = normalizeDays(formData.days);
  const isEntreSemanaSelected = isWeekDays(normalizedDays);
  const isFinesDeSemanaSelected = isWeekend(normalizedDays);
  const isEspecificosSelected = isSpecificDays(normalizedDays);

  const handleAddSkillClick = () => {
    if (newSkill.trim()) {
      actions.handleAddSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">

      <Card className="overflow-hidden border border-gray-100 shadow-sm rounded-xl bg-white mb-8">
        <FormHeader 
          formData={formData} 
          actions={actions} 
          refs={refs} 
          inicial={inicial} 
        />

        <div className="px-6 md:px-12 pb-12">
          <div className="space-y-16">
            <PersonalInfoSection 
              formData={formData} 
              setters={setters} 
              errors={errors} 
            />

            <DescriptionSection 
              formData={formData} 
              setters={setters} 
              errors={errors} 
            />

            <AvailabilitySection 
              formData={formData}
              setters={setters}
              errors={errors}
              DAYS_OPTIONS={DAYS_OPTIONS}
              SCHEDULE_OPTIONS={SCHEDULE_OPTIONS}
              handlePresetDays={handlePresetDays}
              isEntreSemanaSelected={isEntreSemanaSelected}
              isFinesDeSemanaSelected={isFinesDeSemanaSelected}
              isEspecificosSelected={isEspecificosSelected}
              normalizedDays={normalizedDays}
            />

            <SkillsSection 
              formData={formData}
              actions={actions}
              errors={errors}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              handleAddSkillClick={handleAddSkillClick}
            />

            <FormActions 
              saving={saving} 
              actions={actions} 
            />
          </div>
        </div>
      </Card>

      <WorkDaysModal 
        open={isDaysModalOpen} 
        onOpenChange={setIsDaysModalOpen}
        selectedDays={normalizedDays}
        onToggleDay={actions.handleToggleDay}
      />
    </div>
  );
};
