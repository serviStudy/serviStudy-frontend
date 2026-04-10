import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Camera, Loader2, PlusCircle } from 'lucide-react';
import { StudentSkill } from '../types/studentProfile.types';
import { isSpecificDays, isWeekDays, isWeekend, normalizeDays, translateDay } from '../utils/workDays.utils';
import { Tag } from './ui/Tag';
import { WorkDaysModal } from './modals/WorkDaysModal';

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
  const router = useRouter();
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
    <div className="mx-auto max-w-4xl px-4 lg:px-0">
      <Card className="overflow-hidden border-none shadow-md rounded-[24px]">
        <div className=" w-full bg-popover lg:h-40 " />

        <CardContent className="px-6 pb-10 lg:px-10">
          <div className="relative -mt-12 mb-8 inline-block">
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#2552d0] text-[40px] font-bold text-white shadow-sm">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
              ) : (
                inicial
              )}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-50 border border-gray-100"
              onClick={actions.triggerFileInput}
            >
              <Camera className="h-4 w-4 text-[#2552d0]" strokeWidth={2.5} />
            </Button>
            <input
              type="file"
              ref={refs.fileInputRef}
              onChange={actions.handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[14px] font-bold text-gray-700">Nombre Estudiante</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setters.setName(e.target.value)}
                placeholder="Ej: Estudiante de comunicaciones"
                className="rounded-xl border-gray-300 focus-visible:ring-[#2552d0]"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-[14px] font-bold text-gray-700">Número de contacto</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => setters.setContactNumber(e.target.value)}
                placeholder="Ej: 315-887-9086"
                className="rounded-xl border-gray-300 focus-visible:ring-[#2552d0]"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label htmlFor="description" className="text-[14px] font-bold text-gray-700">Descripción del perfil</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setters.setDescription(e.target.value)}
              placeholder="Estudiante motivado y enérgico..."
              className="min-h-24 rounded-xl border-gray-300 focus-visible:ring-[#2552d0]"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-[14px] font-bold text-gray-700">Días laborales</Label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OPTIONS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handlePresetDays(day)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      (day === "Entre semana" && isEntreSemanaSelected) ||
                      (day === "Fines de semana" && isFinesDeSemanaSelected) ||
                      (day === "Específicos" && isEspecificosSelected)
                        ? "bg-[#d2ffe1] border-2 font-semibold border-green-700 text-green-700"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              {isEspecificosSelected && normalizedDays.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {normalizedDays.map(d => (
                    <Tag key={d} variant="specific_day" label={translateDay(d)} />
                  ))}
                </div>
              )}
              {errors.days && <p className="text-red-500 text-xs">{errors.days}</p>}
            </div>

            <div className="space-y-3">
              <Label className="text-[14px] font-bold text-gray-700">Jornada</Label>
              <div className="flex flex-wrap gap-2">
                {SCHEDULE_OPTIONS.map((schedule) => (
                  <button
                    key={schedule.id}
                    type="button"
                    onClick={() => setters.setJornada(schedule.id)}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      formData.jornada === schedule.id
                        ? "border-2 border-orange-600 font-semibold text-orange-700 bg-orange-100"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {schedule.label}
                  </button>
                ))}
              </div>
              {errors.jornada && <p className="text-red-500 text-xs">{errors.jornada}</p>}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Label className="text-[14px] font-bold text-gray-700">Cualidades</Label>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Tag 
                  key={skill.id} 
                  variant="skill" 
                  label={skill.skillName} 
                  onRemove={() => skill.id && actions.handleRemoveSkill(skill.id)} 
                />
              ))}
            </div>
            
            <div className="flex max-w-lg items-center gap-2 mt-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkillClick();
                  }
                }}
                placeholder="Añadir nueva habilidad"
                className="rounded-full border-gray-300"
              />
              <Button
                type="button"
                onClick={handleAddSkillClick}
                className="px-7 rounded-[12px] bg-primary"
                size="icon"
              >
                <PlusCircle className="h-9 w-9 text-white" />
              </Button>
            </div>
            {errors.skills && <p className="text-red-500 text-xs">{errors.skills}</p>}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-32 rounded-xl border-none bg-gray-200 text-gray-600 font-bold hover:bg-gray-300"
              onClick={() => router.back()}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button
              className="w-full sm:w-48 rounded-xl bg-[#2552d0] text-white font-bold hover:bg-blue-800"
              onClick={actions.handleSave}
              disabled={saving}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </span>
              ) : "Guardar Cambios"}
            </Button>
          </div>
        </CardContent>
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
