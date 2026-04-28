import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Camera, Loader2, PlusCircle, User, Phone, AlignLeft, Calendar, Clock, Sparkles } from 'lucide-react';
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

  const SectionTitle = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1.5 h-6 bg-[#2552d0] rounded-full"></div>
      <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 lg:px-0">
      <Card className="overflow-hidden border-none shadow-2xl shadow-gray-200/50 rounded-[32px] bg-white mb-10">
        <div className="w-full bg-gradient-to-b from-[#2552d0] to-[#3a6bf0] h-48 relative">
        </div>

        <div className="px-8 pb-16 lg:px-16">
          <div className="flex flex-col items-center -mt-24 mb-12">
            <div className="relative">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[32px] border-4 border-white bg-gray-50 text-6xl font-bold text-[#2552d0] shadow-xl">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
                ) : (
                  inicial
                )}
              </div>
              <button
                type="button"
                className="absolute -bottom-2 -right-2 h-11 w-11 rounded-[14px] bg-[#2552d0] text-white flex items-center justify-center shadow-lg hover:bg-blue-800 transition-colors border-4 border-white"
                onClick={actions.triggerFileInput}
              >
                <Camera className="h-5 w-5" strokeWidth={2.5} />
              </button>
              <input
                type="file"
                ref={refs.fileInputRef}
                onChange={actions.handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <span className="mt-4 text-xs font-bold text-gray-400 tracking-widest uppercase">
              FOTO DE PERFIL
            </span>
          </div>

          <div className="space-y-12">
            <section>
              <SectionTitle title="Información Personal" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ml-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setters.setName(e.target.value)}
                      placeholder="Ej: Estudiante de comunicaciones"
                      className="pl-12 rounded-2xl border-none bg-[#f8f9fa] h-14 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#2552d0]/20 transition-all"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs font-medium ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Teléfono de Contacto</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => setters.setContactNumber(e.target.value)}
                      placeholder="Ej: 315-887-9086"
                      className="pl-12 rounded-2xl border-none bg-[#f8f9fa] h-14 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#2552d0]/20 transition-all"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs font-medium ml-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            <section>
              <SectionTitle title="Descripción del Perfil" />
              <div className="ml-4 space-y-2">
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setters.setDescription(e.target.value)}
                    placeholder="Describe tu experiencia, habilidades blandas, y qué buscas aportar..."
                    className="pl-12 pt-4 min-h-36 rounded-3xl border-none bg-[#f8f9fa] text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#2552d0]/20 transition-all resize-none"
                  />
                </div>
                {errors.description && <p className="text-red-500 text-xs font-medium ml-1">{errors.description}</p>}
              </div>
            </section>

            <section>
              <SectionTitle title="Disponibilidad" />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 ml-4">
                <div className="space-y-3">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Días Laborales
                  </Label>
                  <div className="flex flex-wrap gap-2.5">
                    {DAYS_OPTIONS.map((day) => {
                      const isSelected = 
                        (day === "Entre semana" && isEntreSemanaSelected) ||
                        (day === "Fines de semana" && isFinesDeSemanaSelected) ||
                        (day === "Específicos" && isEspecificosSelected);
                        
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handlePresetDays(day)}
                          className={`px-5 py-3 text-sm font-medium rounded-2xl transition-all duration-200 border-2 ${
                            isSelected
                              ? "bg-white border-[#2552d0] text-[#2552d0] shadow-sm"
                              : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  {isEspecificosSelected && normalizedDays.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 p-4 bg-[#f8f9fa] rounded-2xl">
                      {normalizedDays.map(d => (
                        <Tag key={d} variant="specific_day" label={translateDay(d)} />
                      ))}
                    </div>
                  )}
                  {errors.days && <p className="text-red-500 text-xs font-medium ml-1">{errors.days}</p>}
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tipo de Jornada
                  </Label>
                  <div className="flex flex-wrap gap-2.5">
                    {SCHEDULE_OPTIONS.map((schedule) => {
                      const isSelected = formData.jornada === schedule.id;
                      return (
                        <button
                          key={schedule.id}
                          type="button"
                          onClick={() => setters.setJornada(schedule.id)}
                          className={`px-5 py-3 text-sm font-medium rounded-2xl transition-all duration-200 border-2 ${
                            isSelected
                              ? "bg-white border-[#2552d0] text-[#2552d0] shadow-sm"
                              : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {schedule.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.jornada && <p className="text-red-500 text-xs font-medium ml-1">{errors.jornada}</p>}
                </div>
              </div>
            </section>

            <section>
              <SectionTitle title="Habilidades y Cualidades" />
              <div className="ml-4 space-y-4">
                <div className="flex flex-col sm:flex-row max-w-xl items-start sm:items-center gap-3">
                  <div className="relative w-full">
                    <Sparkles className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
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
                      className="pl-12 rounded-2xl border-none bg-[#f8f9fa] h-14 text-sm font-medium focus-visible:ring-2 focus-visible:ring-[#2552d0]/20 w-full"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleAddSkillClick}
                    className="h-14 px-6 rounded-2xl bg-[#2552d0] hover:bg-blue-800 text-white font-bold transition-all shadow-md shadow-[#2552d0]/30 flex items-center gap-2 w-full sm:w-auto"
                  >
                    <PlusCircle className="h-5 w-5" />
                    Añadir
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 p-5 bg-[#f8f9fa] rounded-3xl">
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

            <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-end gap-8 border-t border-gray-100">
              <button
                type="button"
                className="text-gray-400 font-bold text-sm tracking-widest uppercase hover:text-gray-600 transition-colors"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancelar
              </button>
              <Button
                className="w-full sm:w-auto px-8 h-14 rounded-2xl bg-[#2552d0] text-white font-bold text-base hover:bg-blue-800 transition-all shadow-lg shadow-[#2552d0]/30"
                onClick={actions.handleSave}
                disabled={saving}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Guardando...
                  </span>
                ) : "Guardar Cambios"}
              </Button>
            </div>
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

