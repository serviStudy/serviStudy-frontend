import React, { useState } from "react";
import { CreateJobOfferDTO, DayWeek, WorkSchedule } from "../../types/jobOffer.types";
import { useJobOfferForm } from "../../hooks/useJobOfferForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Info, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobOfferFormProps {
  initialData?: Partial<CreateJobOfferDTO>;
  isEditing?: boolean;
  onSubmit: (data: CreateJobOfferDTO) => void;
}

const ALL_DAYS: { value: DayWeek; label: string }[] = [
  { value: "MONDAY", label: "L" },
  { value: "TUESDAY", label: "M" },
  { value: "WEDNESDAY", label: "Mi" },
  { value: "THURSDAY", label: "J" },
  { value: "FRIDAY", label: "V" },
  { value: "SATURDAY", label: "S" },
  { value: "SUNDAY", label: "D" },
];

export const JobOfferForm: React.FC<JobOfferFormProps> = ({ initialData, isEditing, onSubmit }) => {
  const {
    formData,
    handleChange,
    handleRequirementAdd,
    handleRequirementRemove,
    setWorkDaysPreset,
    toggleDay,
  } = useJobOfferForm(initialData);

  const [skillsInput, setSkillsInput] = useState("");
  const [activeDaysPreset, setActiveDaysPreset] = useState<"WEEKDAYS" | "WEEKENDS" | "CUSTOM">("WEEKDAYS");

  const handleDaysPresetToggle = (preset: "WEEKDAYS" | "WEEKENDS" | "CUSTOM") => {
    setActiveDaysPreset(preset);
    setWorkDaysPreset(preset);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '');
    handleChange("salaryDescription", rawVal);
    handleChange("salary", digitsOnly ? parseInt(digitsOnly, 10) : 0);
  };

  const onAddSkill = () => {
    if (skillsInput.trim()) {
      handleRequirementAdd(skillsInput.trim());
      setSkillsInput("");
    }
  };

  const onKeyDownSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#143285] mb-2 flex items-center justify-center gap-3">
          {isEditing && <span className="bg-blue-100 p-2 rounded-xl text-blue-600"><Info size={24}/></span>}
          {isEditing ? "Editar Oferta de Trabajo" : "Nueva Oferta de Trabajo"}
        </h2>
        <p className="text-gray-500">Define con precisión el puesto para atraer al mejor talento.</p>
      </div>

      {/* 1. Información General */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
          <h3 className="text-[#143285] font-bold text-lg">Información General</h3>
        </div>
        
        <div className="space-y-5 px-12">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Título del Puesto</label>
            <Input 
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ej: Mesero de fin de semana"
              className="border-gray-200 text-gray-900"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Dirección del establecimiento</label>
            <Input 
              value={formData.establishmentAddress}
              onChange={(e) => handleChange("establishmentAddress", e.target.value)}
              placeholder="Ej: Plaza Bolívar"
              className="border-gray-200 text-gray-900"
              required
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-100 my-8"/>

      {/* 2. Días y horarios */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">2</div>
          <h3 className="text-[#143285] font-bold text-lg">Días y horarios</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12">
          {/* Work Days */}
          <div>
            <label className="flex items-center gap-2 text-green-600 font-bold mb-3">
              <CalendarDays size={20} /> Días laborales
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                type="button" 
                onClick={() => handleDaysPresetToggle("WEEKDAYS")} 
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${activeDaysPreset === "WEEKDAYS" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                Entre semana
              </button>
              <button 
                type="button" 
                onClick={() => handleDaysPresetToggle("WEEKENDS")} 
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${activeDaysPreset === "WEEKENDS" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                Fines de semana
              </button>
              <button 
                type="button" 
                onClick={() => setActiveDaysPreset("CUSTOM")} 
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${activeDaysPreset === "CUSTOM" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                Específicos
              </button>
            </div>
            
            <div className="flex gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
              {ALL_DAYS.map(day => (
                <button 
                  type="button" 
                  key={day.value} 
                  onClick={() => {
                    setActiveDaysPreset("CUSTOM");
                    toggleDay(day.value);
                  }} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border transition-all ${
                    formData.workDays.includes(day.value) 
                      ? "bg-green-600 text-white border-green-600 shadow-sm" 
                      : "bg-white text-gray-400 border-gray-200 hover:border-green-300"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Work Schedule */}
          <div>
            <label className="flex items-center gap-2 text-orange-500 font-bold mb-3">
              <Clock size={20} /> Jornada
            </label>
            <div className="flex flex-wrap gap-2">
               <button type="button" onClick={() => handleChange("workSchedule", "FULL_TIME")} className={`px-4 py-2 rounded-full border text-sm transition-colors ${formData.workSchedule === "FULL_TIME" ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>Jornada completa</button>
               <button type="button" onClick={() => handleChange("workSchedule", "PART_TIME")} className={`px-4 py-2 rounded-full border text-sm transition-colors ${formData.workSchedule === "PART_TIME" ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>Media jornada</button>
               <button type="button" onClick={() => handleChange("workSchedule", "FLEXIBLE")} className={`px-4 py-2 rounded-full border text-sm transition-colors ${formData.workSchedule === "FLEXIBLE" ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>Flexible</button>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-gray-100 my-8"/>

      {/* 3. Contratación y Salario */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
          <h3 className="text-[#143285] font-bold text-lg">Contratación y Salario</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-12">
          <div>
             <label className="block text-gray-700 font-semibold mb-2">Salario Mensual o Por Evento</label>
             <Input 
                value={formData.salaryDescription} 
                onChange={handleSalaryChange}
                placeholder="Ej: $80.000 + comisiones"
                className="border-gray-200 text-gray-900"
                required
             />
          </div>
          <div>
             <label className="block text-gray-700 font-semibold mb-2">Tipo de Contrato</label>
             <Input 
                 value={formData.contractDescription}
                 onChange={(e) => handleChange("contractDescription", e.target.value)}
                 placeholder="Ej: Honorarios o prestaciones por ley"
                 className="border-gray-200 text-gray-900"
                 required
             />
          </div>
        </div>
      </section>

      <hr className="border-gray-100 my-8"/>

      {/* 4. Labores y Requisitos */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">4</div>
          <h3 className="text-[#143285] font-bold text-lg">Labores y Requisitos</h3>
        </div>

        <div className="space-y-6 px-12">
          <div>
             <label className="block text-gray-700 font-semibold mb-2">Descripción del Puesto y Labores</label>
             <Textarea 
               value={formData.description}
               onChange={(e) => handleChange("description", e.target.value)}
               placeholder="Escribe detalladamente las tareas que realizará el estudiante..."
               className="border-gray-200 text-gray-900 min-h-[100px]"
               required
             />
          </div>
          
          <div>
             <label className="block text-gray-700 font-semibold mb-2">Habilidades y Requisitos Clave</label>
             <div className="flex flex-wrap gap-2 mb-3">
               {formData.requirements.map((req: string) => (
                 <Badge key={req} variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 flex items-center gap-1">
                   {req}
                   <X size={14} className="cursor-pointer hover:text-blue-900" onClick={() => handleRequirementRemove(req)} />
                 </Badge>
               ))}
             </div>
             <div className="flex gap-2">
               <Input 
                 value={skillsInput}
                 onChange={(e) => setSkillsInput(e.target.value)}
                 onKeyDown={onKeyDownSkill}
                 placeholder="Ej: Inglés avanzado"
                 className="border-gray-200 text-gray-900 flex-1"
               />
               <button 
                 type="button"
                 onClick={onAddSkill}
                 className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors"
               >
                 <Plus size={20} />
               </button>
             </div>
          </div>
        </div>
      </section>

      <div className="px-12 mt-12">
         <Button 
            type="submit" 
            className="w-full bg-[#143285] hover:bg-[#0e2463] text-white py-6 text-lg rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
         >
            {isEditing ? "Guardar Cambios" : "Publicar Oferta de Trabajo"}
         </Button>
      </div>

    </form>
  )
}
