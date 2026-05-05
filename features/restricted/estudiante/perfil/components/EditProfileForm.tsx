import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { StudentSkill } from '../types/studentProfile.types';
import { isSpecificDays, isWeekDays, isWeekend, normalizeDays } from '../utils/workDays.utils';
import { WorkDaysModal } from './modals/WorkDaysModal';
import { Calendar, FileText, BadgeCheck } from 'lucide-react';

// Modular Components
import { FormHeader } from './profile-form/FormHeader';
import { PersonalInfoSection } from './profile-form/PersonalInfoSection';
import { DescriptionSection } from './profile-form/DescriptionSection';
import { AvailabilitySection } from './profile-form/AvailabilitySection';
import { SkillsSection } from './profile-form/SkillsSection';
import { FormActions } from './profile-form/FormActions';
import { SectionTitle } from './profile-form/SectionTitle';

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
    <div className="mx-auto w-full max-w-6xl px-4 md:px-0">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Editar Perfil</h1>
          <p className="text-gray-500 font-medium mt-1">Gestiona tu identidad profesional y disponibilidad.</p>
        </div>
        <FormActions saving={saving} actions={actions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar, Personal Info & Availability */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="p-8 rounded-xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <FormHeader 
              formData={formData} 
              actions={actions} 
              refs={refs} 
              inicial={inicial} 
            />
            <PersonalInfoSection 
              formData={formData} 
              setters={setters} 
              errors={errors} 
            />
          </Card>

          <Card className="p-8 rounded-xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <SectionTitle title="Disponibilidad" icon={Calendar} />
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
          </Card>
        </div>

        {/* Right Column: Professional Summary & Skills */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="p-8 rounded-xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <SectionTitle title="Resumen profesional" icon={FileText} />
            <DescriptionSection 
              formData={formData} 
              setters={setters} 
              errors={errors} 
            />
          </Card>

          <Card className="p-8 rounded-xl shadow-sm border border-gray-100 bg-white overflow-hidden">
            <SectionTitle title="Cualidades" icon={BadgeCheck} />
            <SkillsSection 
              formData={formData}
              actions={actions}
              errors={errors}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              handleAddSkillClick={handleAddSkillClick}
            />
          </Card>
        </div>
      </div>

      <WorkDaysModal 
        open={isDaysModalOpen} 
        onOpenChange={setIsDaysModalOpen}
        selectedDays={normalizedDays}
        onToggleDay={actions.handleToggleDay}
      />
    </div>
  );
};
