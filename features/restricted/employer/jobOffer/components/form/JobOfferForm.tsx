import React, { useState } from "react";
import { CreateJobOfferDTO, DayWeek } from "../../types/jobOffer.types";
import { useJobOfferForm } from "../../hooks/useJobOfferForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Info, Plus, X, Briefcase, MapPin, Receipt, ClipboardCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface JobOfferFormProps {
  initialData?: Partial<CreateJobOfferDTO>;
  isEditing?: boolean;
  onSubmit: (data: CreateJobOfferDTO) => void;
  saving?: boolean;
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

export const JobOfferForm: React.FC<JobOfferFormProps> = ({ initialData, isEditing, onSubmit, saving }) => {
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
    <form onSubmit={handleSubmit} className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 lg:p-16 max-w-5xl mx-auto border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
      
      {/* Header Premium */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-5 rounded-3xl bg-blue-50 mb-8 shadow-sm border border-blue-100/50">
          <Briefcase className="h-10 w-10 text-[#1a4b9e]" />
        </div>
        <h2 className="text-4xl font-black text-[#1a3683] lg:text-5xl tracking-tighter mb-4">
          {isEditing ? "Optimizar Detalles de Oferta" : "Nueva Oferta Estratégica"}
        </h2>
        <div className="flex items-center justify-center gap-3">
            <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
            <p className="text-gray-500 font-bold italic text-lg lg:text-xl">Publica una oportunidad irresistible para los mejores talentos</p>
            <div className="h-1.5 w-16 bg-blue-600 rounded-full"></div>
        </div>
      </div>

      {/* 1. Información General */}
      <section className="mb-16">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-[22px] bg-[#eff4ff] text-[#1a4b9e] flex items-center justify-center font-black text-xl shadow-sm border border-blue-100/50">1</div>
          <h3 className="text-[#1a3683] font-black text-2xl lg:text-3xl tracking-tight">Información de Destino</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 px-4 lg:px-8">
          <div className="space-y-4">
            <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <Briefcase size={16} className="text-[#1a3683]" /> Título del Puesto
            </label>
            <Input 
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ej: Mesero de fin de semana"
              className="h-16 rounded-[24px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all font-bold px-6 text-lg text-gray-900"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <MapPin size={16} className="text-[#1a3683]" /> Ubicación del Trabajo
            </label>
            <Input 
              value={formData.establishmentAddress}
              onChange={(e) => handleChange("establishmentAddress", e.target.value)}
              placeholder="Ej: Plaza Bolívar"
              className="h-16 rounded-[24px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all font-bold px-6 text-lg text-gray-900"
              required
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-12"></div>

      {/* 2. Días y horarios */}
      <section className="mb-16">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-[22px] bg-orange-50 text-orange-500 flex items-center justify-center font-black text-xl shadow-sm border border-orange-100/30">2</div>
          <h3 className="text-[#1a3683] font-black text-2xl lg:text-3xl tracking-tight">Compromiso y Tiempo</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 lg:px-8">
          {/* Work Days */}
          <div className="space-y-6">
            <label className="flex items-center gap-2 text-green-600 font-bold mb-4 uppercase text-[13px] tracking-widest ml-1">
              <CalendarDays size={20} /> Selección de Días
            </label>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { id: "WEEKDAYS", label: "Entre semana" },
                { id: "WEEKENDS", label: "Fines de semana" },
                { id: "CUSTOM", label: "Personalizado" }
              ].map((p) => (
                <button 
                  key={p.id}
                  type="button" 
                  onClick={() => handleDaysPresetToggle(p.id as any)} 
                  className={`px-6 py-3 rounded-[20px] border-2 text-[14px] font-black transition-all active:scale-95 ${
                    activeDaysPreset === p.id 
                    ? "border-green-500 bg-green-50 text-green-700 shadow-md" 
                    : "border-gray-100 text-gray-500 bg-white hover:bg-gray-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between gap-2 p-4 bg-gray-50 rounded-[35px] border border-gray-100 shadow-inner">
              {ALL_DAYS.map(day => (
                <button 
                  type="button" 
                  key={day.value} 
                  onClick={() => {
                    setActiveDaysPreset("CUSTOM");
                    toggleDay(day.value);
                  }} 
                  className={`w-12 h-12 lg:w-14 lg:h-14 rounded-[20px] flex items-center justify-center text-[15px] font-black border-2 transition-all active:scale-90 ${
                    formData.workDays.includes(day.value) 
                      ? "bg-green-600 text-white border-green-600 shadow-lg ring-4 ring-green-100" 
                      : "bg-white text-gray-300 border-gray-100 hover:border-green-300 hover:text-green-500 hover:shadow-sm"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Work Schedule */}
          <div className="space-y-6">
            <label className="flex items-center gap-2 text-orange-500 font-bold mb-4 uppercase text-[13px] tracking-widest ml-1">
              <Clock size={20} /> Carga Horaria
            </label>
            <div className="flex flex-col gap-4">
              {[
                { id: "FULL_TIME", label: "Jornada completa", icon: "☀️" },
                { id: "PART_TIME", label: "Media jornada", icon: "🌓" },
                { id: "FLEXIBLE", label: "Flexible / A conveniencia", icon: "⚡" }
              ].map((s) => (
                <button 
                  key={s.id}
                  type="button" 
                  onClick={() => handleChange("workSchedule", s.id)} 
                  className={`flex items-center justify-between px-8 py-5 rounded-[24px] border-2 text-lg font-black transition-all active:scale-[0.98] ${
                    formData.workSchedule === s.id 
                    ? "border-orange-400 bg-orange-50 text-orange-700 shadow-[0_15px_30px_-5px_rgba(251,146,60,0.2)]" 
                    : "border-gray-100 bg-white text-gray-500 hover:bg-orange-50/40"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-2xl">{s.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-12"></div>

      {/* 3. Contratación */}
      <section className="mb-16">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-[22px] bg-green-50 text-green-600 flex items-center justify-center font-black text-xl shadow-sm border border-green-100/30">3</div>
          <h3 className="text-[#1a3683] font-black text-2xl lg:text-3xl tracking-tight">Compensación y Trato</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 lg:px-8">
          <div className="space-y-4">
             <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <Receipt size={16} className="text-[#1a3683]" /> Remuneración Prevista
             </label>
             <Input 
                value={formData.salaryDescription} 
                onChange={handleSalaryChange}
                placeholder="Ej: $100.000 + incentivos"
                className="h-16 rounded-[24px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white font-black text-[#1a4b9e] px-6 text-xl"
                required
             />
          </div>
          <div className="space-y-4">
             <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <ClipboardCheck size={16} className="text-[#1a3683]" /> Esquéma de Contrato
             </label>
             <Input 
                 value={formData.contractDescription}
                 onChange={(e) => handleChange("contractDescription", e.target.value)}
                 placeholder="Ej: Prestacion de servicios profesionales"
                 className="h-16 rounded-[24px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white font-bold px-6 text-lg text-gray-900"
                 required
             />
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent my-12"></div>

      {/* 4. Labores y Requisitos */}
      <section className="mb-16">
        <div className="flex items-center gap-5 mb-10">
          <div className="w-12 h-12 rounded-[22px] bg-[#eff4ff] text-[#1a4b9e] flex items-center justify-center font-black text-xl shadow-sm border border-blue-100/30">4</div>
          <h3 className="text-[#1a3683] font-black text-2xl lg:text-3xl tracking-tight">Requisitos y Detalles</h3>
        </div>

        <div className="space-y-12 px-4 lg:px-8">
          <div className="space-y-5">
             <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Info size={16} className="text-[#1a3683]" /> Descripción Ejecutiva
             </label>
             <Textarea 
               value={formData.description}
               onChange={(e) => handleChange("description", e.target.value)}
               placeholder="Explota los beneficios y labores detalladamente para entusiasmar a los estudiantes..."
               className="min-h-[220px] rounded-[40px] border-gray-200 bg-gray-50/30 focus-visible:ring-[#1a4b9e] focus:bg-white transition-all p-10 font-medium resize-none text-xl leading-relaxed text-gray-900"
               required
             />
          </div>
          
          <div className="space-y-6">
             <label className="block text-[15px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Plus size={16} className="text-[#1a3683]" /> Perfil del Estudiante
             </label>
             <div className="flex flex-wrap gap-3.5 min-h-[50px]">
               {formData.requirements.map((req: string) => (
                 <Badge key={req} variant="secondary" className="bg-blue-50 text-[#1a4b9e] border border-blue-100 px-6 py-2.5 rounded-[20px] flex items-center gap-3 font-black text-sm shadow-md animate-in zoom-in-75 duration-300">
                   {req}
                   <X size={16} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleRequirementRemove(req)} />
                 </Badge>
               ))}
               {formData.requirements.length === 0 && <span className="text-gray-400 italic text-lg py-2 ml-2">Aún no has definido requisitos</span>}
             </div>
             <div className="flex gap-4">
               <Input 
                 value={skillsInput}
                 onChange={(e) => setSkillsInput(e.target.value)}
                 onKeyDown={onKeyDownSkill}
                 placeholder="Ej: Empatía, Organización, Trabajo bajo presión..."
                 className="h-16 rounded-[24px] border-gray-200 bg-gray-50/20 focus-visible:ring-[#1a4b9e] flex-1 font-bold px-7 text-lg text-gray-900"
               />
               <button 
                 type="button"
                 onClick={onAddSkill}
                 className="w-16 h-16 bg-[#1a4b9e] hover:bg-[#153a7a] text-white rounded-[24px] flex items-center justify-center transition-all shadow-xl active:scale-90"
               >
                 <Plus size={32} />
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer con Botón de Acción Estratégico */}
      <div className="mt-20 flex flex-col items-center">
         <button 
            type="submit" 
            disabled={saving}
            className="w-full h-20 bg-[#1a3683] hover:bg-[#152e6d] text-white text-2xl rounded-[28px] font-black tracking-tight transition-all shadow-[0_20px_50px_-10px_rgba(26,54,131,0.5)] hover:shadow-[0_25px_60px_-5px_rgba(26,54,131,0.6)] active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
         >
            {saving ? (
              <>
                <Loader2 className="h-8 w-8 animate-spin text-blue-200" />
                <span className="text-xl">Procesando Publicación...</span>
              </>
            ) : (
              <>
                <span>{isEditing ? "Guardar Optimización" : "Lanzar Oferta al Mercado"}</span>
                {!isEditing && <Plus size={24} className="hidden sm:block" />}
              </>
            )}
         </button>
         <p className="mt-8 text-gray-400 text-lg font-bold">La oferta será visible inmediatamente para miles de estudiantes.</p>
      </div>

    </form>
  );
};
