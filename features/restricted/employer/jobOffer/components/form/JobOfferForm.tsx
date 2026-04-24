import React, { useState } from "react";
import { CreateJobOfferDTO, DayWeek } from "../../types/jobOffer.types";
import { useJobOfferForm } from "../../hooks/useJobOfferForm";
import { useEmployerProfile } from "@/features/profile/employer/hooks/useEmployerProfile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Info, Plus, X, Briefcase, MapPin, Receipt, ClipboardCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

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

  const { profile } = useEmployerProfile();

  // Pre-fill address if creating a new offer and profile has an address
  React.useEffect(() => {
    if (!isEditing && !formData.establishmentAddress) {
      const profileAddress = profile.businessAddress || (profile as any).business_address;
      if (profileAddress) {
        handleChange("establishmentAddress", profileAddress);
      }
    }
  }, [profile, isEditing, formData.establishmentAddress, handleChange]);

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
    <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] p-8 lg:p-12 max-w-4xl mx-auto border border-gray-100 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Header Premium - More Compact */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-blue-50 mb-6 shadow-sm border border-blue-100/50">
          <Briefcase className="h-8 w-8 text-[#1a4b9e]" />
        </div>
        <h2 className="text-3xl font-black text-black lg:text-4xl tracking-tight mb-3">
          {isEditing ? "Editar Oferta" : "Nueva Vacante"}
        </h2>
        <p className="text-gray-400 font-bold italic text-base lg:text-lg max-w-md mx-auto">Completa los detalles para atraer al mejor talento estudiantil</p>
      </div>

      {/* 1. Información General */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1a4b9e] flex items-center justify-center font-black text-lg shadow-sm border border-blue-100/50">1</div>
          <h3 className="text-black font-black text-xl lg:text-2xl">Detalles Básicos</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 px-2 lg:px-4">
          <div className="space-y-3">
            <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <Briefcase size={14} className="text-[#1a4b9e]" /> Título del Puesto
            </label>
            <Input 
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Ej: Mesero de fin de semana"
              className="h-14 rounded-2xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all font-bold px-5 text-[15px] text-black"
              required
            />
          </div>
          <div className="space-y-3">
            <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <MapPin size={14} className="text-[#1a4b9e]" /> Ubicación
            </label>
            <Input 
              value={formData.establishmentAddress}
              onChange={(e) => handleChange("establishmentAddress", e.target.value)}
              placeholder="Ej: Plaza Bolívar"
              className="h-14 rounded-2xl border-gray-200 bg-gray-50/30 focus:bg-white transition-all font-bold px-5 text-[15px] text-black"
              required
            />
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100 my-10"></div>

      {/* 2. Días y horarios */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center font-black text-lg shadow-sm border border-orange-100/30">2</div>
          <h3 className="text-black font-black text-xl lg:text-2xl">Horarios y Jornada</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2 lg:px-4">
          <div className="space-y-5">
            <label className="flex items-center gap-2 text-green-600 font-bold mb-3 uppercase text-[12px] tracking-widest ml-1">
              <CalendarDays size={18} /> Días de Trabajo
            </label>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: "WEEKDAYS", label: "Lunes a Viernes" },
                { id: "WEEKENDS", label: "Fines de Semana" },
                { id: "CUSTOM", label: "Personalizado" }
              ].map((p) => (
                <button 
                  key={p.id}
                  type="button" 
                  onClick={() => handleDaysPresetToggle(p.id as any)} 
                  className={`px-4 py-2.5 rounded-xl border-2 text-[13px] font-black transition-all active:scale-95 ${
                    activeDaysPreset === p.id 
                    ? "border-green-500 bg-green-50 text-green-700" 
                    : "border-gray-50 text-gray-400 bg-white hover:bg-gray-50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            
            <AnimatePresence>
              {activeDaysPreset === "CUSTOM" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-between gap-1.5 p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner mb-3">
                    {ALL_DAYS.map(day => (
                      <button 
                        type="button" 
                        key={day.value} 
                        onClick={() => toggleDay(day.value)} 
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-black border-2 transition-all active:scale-90 ${
                          formData.workDays.includes(day.value) 
                            ? "bg-green-600 text-white border-green-600 shadow-sm" 
                            : "bg-white text-gray-300 border-gray-100 hover:border-green-300"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mb-4">Selección manual de días</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Work Schedule */}
          <div className="space-y-5">
            <label className="flex items-center gap-2 text-orange-500 font-bold mb-3 uppercase text-[12px] tracking-widest ml-1">
              <Clock size={18} /> Tipo de Jornada
            </label>
            <div className="flex flex-col gap-3">
              {[
                { id: "FULL_TIME", label: "Jornada completa", icon: "☀️" },
                { id: "PART_TIME", label: "Media jornada", icon: "🌓" },
                { id: "FLEXIBLE", label: "Flexible", icon: "⚡" }
              ].map((s) => (
                <button 
                  key={s.id}
                  type="button" 
                  onClick={() => handleChange("workSchedule", s.id)} 
                  className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 text-[15px] font-black transition-all active:scale-[0.98] ${
                    formData.workSchedule === s.id 
                    ? "border-orange-400 bg-orange-50 text-orange-700 shadow-sm" 
                    : "border-gray-50 bg-white text-gray-400 hover:bg-orange-50/40"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-xl">{s.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100 my-10"></div>

      {/* 3. Contratación */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-black text-lg shadow-sm border border-green-100/30">3</div>
          <h3 className="text-black font-black text-xl lg:text-2xl">Condiciones</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 lg:px-4">
          <div className="space-y-3">
             <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <Receipt size={14} className="text-[#1a4b9e]" /> Remuneración
             </label>
             <Input 
                value={formData.salaryDescription} 
                onChange={handleSalaryChange}
                placeholder="Ej: $100.000 + incentivos"
                className="h-14 rounded-2xl border-gray-200 bg-gray-50/30 focus:bg-white font-black text-[#1a4b9e] px-5 text-lg"
                required
             />
          </div>
          <div className="space-y-3">
             <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
               <ClipboardCheck size={14} className="text-[#1a4b9e]" /> Tipo de Contrato
             </label>
             <Input 
                 value={formData.contractDescription}
                 onChange={(e) => handleChange("contractDescription", e.target.value)}
                 placeholder="Ej: Prestación de servicios"
                 className="h-14 rounded-2xl border-gray-200 bg-gray-50/30 focus:bg-white font-bold px-5 text-[15px] text-black"
                 required
             />
          </div>
        </div>
      </section>

      <div className="h-px bg-gray-100 my-10"></div>

      {/* 4. Labores y Requisitos */}
      <section className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1a4b9e] flex items-center justify-center font-black text-lg shadow-sm border border-blue-100/30">4</div>
          <h3 className="text-black font-black text-xl lg:text-2xl">Descripción y Requisitos</h3>
        </div>

        <div className="space-y-8 px-2 lg:px-4">
          <div className="space-y-4">
             <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Info size={14} className="text-[#1a4b9e]" /> Detalles de la posición
             </label>
             <Textarea 
               value={formData.description}
               onChange={(e) => handleChange("description", e.target.value)}
               placeholder="Describe las funciones y beneficios..."
               className="min-h-[160px] rounded-[24px] border-gray-200 bg-gray-50/30 focus:bg-white transition-all p-8 font-medium resize-none text-[17px] leading-relaxed text-black"
               required
             />
          </div>
          
          <div className="space-y-5">
             <label className="block text-[13px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Plus size={14} className="text-[#1a4b9e]" /> Perfil deseado
             </label>
             <div className="flex flex-wrap gap-2.5 min-h-[40px]">
               {formData.requirements.map((req: any, index: number) => {
                 const label = typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito");
                 return (
                   <Badge key={`${label}-${index}`} variant="secondary" className="bg-gray-50 text-black border border-gray-100 px-4 py-1.5 rounded-xl flex items-center gap-2 font-bold text-[13px] shadow-sm animate-in zoom-in-75 duration-300">
                     {label}
                     <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => handleRequirementRemove(req)} />
                   </Badge>
                 );
               })}
               {formData.requirements.length === 0 && <span className="text-gray-400 italic text-sm py-2 ml-2">Aún no has añadido requisitos</span>}
             </div>
             <div className="flex gap-3">
               <Input 
                 value={skillsInput}
                 onChange={(e) => setSkillsInput(e.target.value)}
                 onKeyDown={onKeyDownSkill}
                 placeholder="Ej: Empatía, Organización..."
                 className="h-14 rounded-2xl border-gray-200 bg-gray-50/20 focus:bg-white flex-1 font-bold px-6 text-[15px] text-black"
               />
               <button 
                 type="button"
                 onClick={onAddSkill}
                 className="w-14 h-14 bg-black hover:bg-gray-800 text-white rounded-2xl flex items-center justify-center transition-all active:scale-90"
               >
                 <Plus size={24} />
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer con Botón de Acción Estratégico */}
      <div className="mt-12 flex flex-col items-center">
         <button 
            type="submit" 
            disabled={saving}
            className="w-full h-16 bg-black hover:bg-gray-900 text-white text-xl rounded-[22px] font-black tracking-tight transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
         >
            {saving ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <span className="text-lg">Publicando...</span>
              </>
            ) : (
              <>
                <span>{isEditing ? "Guardar Cambios" : "Publicar Oferta"}</span>
                {!isEditing && <Plus size={20} className="hidden sm:block" />}
              </>
            )}
         </button>
         <p className="mt-6 text-gray-400 text-sm font-bold uppercase tracking-widest">Publicación inmediata y gratuita</p>
      </div>

    </form>
  );
};
