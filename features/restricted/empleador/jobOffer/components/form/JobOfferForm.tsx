"use client";
import React, { useState } from "react";
import { CreateJobOfferDTO, DayWeek } from "../../types/jobOffer.types";
import { useJobOfferForm } from "../../hooks/useJobOfferForm";
import { toast } from "sonner";
import { useEmployerProfile } from "@/features/restricted/empleador/perfil/hooks/useEmployerProfile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, Info, Plus, X, Briefcase, MapPin, Receipt, ClipboardCheck, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JobOfferFormProps {
  initialData?: Partial<CreateJobOfferDTO>;
  isEditing?: boolean;
  onSubmit: (data: CreateJobOfferDTO) => void;
  saving?: boolean;
  /** New prop to toggle premium styling */
  isPremium?: boolean;
}

const ALL_DAYS: { value: DayWeek; label: string }[] = [
  { value: "MONDAY", label: "Lun" },
  { value: "TUESDAY", label: "Mar" },
  { value: "WEDNESDAY", label: "Mié" },
  { value: "THURSDAY", label: "Jue" },
  { value: "FRIDAY", label: "Vie" },
  { value: "SATURDAY", label: "Sáb" },
  { value: "SUNDAY", label: "Dom" },
];

export const JobOfferForm: React.FC<JobOfferFormProps> = ({ initialData, isEditing, onSubmit, saving, isPremium = false }) => {
  const {
    formData,
    handleChange,
    handleRequirementAdd,
    handleRequirementRemove,
    setWorkDaysPreset,
    toggleDay,
  } = useJobOfferForm(initialData);

  const { profile } = useEmployerProfile();

  React.useEffect(() => {
    if (!isEditing && !formData.establishmentAddress) {
      const profileAddress = profile.businessAddress || (profile as any).business_address;
      if (profileAddress) {
        handleChange("establishmentAddress", profileAddress);
      }
    }
  }, [profile, isEditing, formData.establishmentAddress, handleChange]);

  const [skillsInput, setSkillsInput] = useState("");
  const [activeDaysPreset, setActiveDaysPreset] = useState<"WEEKDAYS" | "WEEKENDS" | "CUSTOM" | "">(() => {
    if (!initialData?.workDays || initialData.workDays.length === 0) return "";
    
    const isWeekdays = initialData.workDays.length === 5 && 
      ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"].every(d => initialData.workDays?.includes(d as DayWeek));
    if (isWeekdays) return "WEEKDAYS";
    
    const isWeekends = initialData.workDays.length === 2 && 
      ["SATURDAY", "SUNDAY"].every(d => initialData.workDays?.includes(d as DayWeek));
    if (isWeekends) return "WEEKENDS";
    
    return "CUSTOM";
  });

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
    if (!formData.workSchedule) {
      toast.error("Por favor, selecciona un horario");
      return;
    }
    if (formData.workDays.length === 0) {
      toast.error("Por favor, selecciona al menos un día laboral");
      return;
    }
    onSubmit(formData);
  };

  const sectionClass = isPremium 
    ? "bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] rounded-2xl p-5 sm:p-6 relative overflow-hidden group transition-all duration-500" 
    : "bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300";

  const labelClass = isPremium
    ? "text-[12px] font-semibold text-slate-700 uppercase tracking-widest mb-2 flex items-center gap-2 drop-shadow-sm"
    : "text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2 mb-1.5";

  const inputClass = isPremium
    ? "h-11 w-full rounded-xl border border-white/60 bg-white/50 px-4 text-slate-900 font-semibold placeholder:text-slate-400 focus:bg-white/90 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_2px_10px_rgba(0,0,0,0.02)]"
    : "h-11 w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white font-normal text-gray-900 focus:ring-2 focus:ring-green-500/20 transition-all shadow-inner";

  const textareaClass = isPremium
    ? "min-h-[100px] w-full rounded-xl border border-white/60 bg-white/50 p-4 text-slate-900 font-medium leading-relaxed placeholder:text-slate-400 focus:bg-white/90 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_2px_10px_rgba(0,0,0,0.02)]"
    : "min-h-[100px] w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white p-4 font-normal resize-none text-sm leading-relaxed text-gray-900 focus:ring-2 focus:ring-green-500/20 shadow-inner";

  const iconContainerClass = isPremium
    ? "w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-slate-600 border border-white shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
    : "w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 text-gray-600";

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      
      {/* 3D Glassmorphism Premium Form Container */}
      <div className={isPremium ? "bg-white/70 backdrop-blur-2xl rounded-[1.75rem] sm:rounded-[2rem] border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] p-5 sm:p-8 relative" : "bg-white rounded-2xl shadow-md p-4 sm:p-8 relative"}>
        
        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6 pb-6 md:mb-10 md:pb-8 border-b border-slate-200/50">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 w-full">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform shrink-0 ${isPremium ? 'bg-gradient-to-br from-green-500 to-blue-600 shadow-[0_15px_30px_-5px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.5)]' : 'bg-green-600 shadow-md'}`}>
              <Briefcase className="h-6 w-6 text-white drop-shadow-md" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-sm ${isPremium ? 'bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600' : 'text-gray-900'}`}>
                {isEditing ? "Editar Oferta" : "Nueva Vacante"}
              </h2>
              <p className={`text-xs sm:text-[13px] font-medium mt-1.5 ${isPremium ? 'text-slate-500' : 'text-gray-500'}`}>
                Configura los detalles para atraer al mejor talento de <strong className="text-slate-800 drop-shadow-sm">ServiStudy</strong>.
              </p>
            </div>
          </div>
          
          {isPremium ? (
            <div className="hidden md:flex items-center gap-2.5 bg-gradient-to-r from-amber-100 to-yellow-100 px-5 py-2.5 rounded-full border border-yellow-200/60 shadow-[0_4px_12px_rgba(252,211,77,0.2),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <Sparkles size={18} className="text-amber-500 animate-pulse drop-shadow-sm" />
              <span className="text-amber-800 text-[11px] font-bold uppercase tracking-widest drop-shadow-sm">Diseño Premium</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle2 size={16} className="text-gray-600" />
              <span className="text-gray-700 text-[10px] font-semibold uppercase tracking-widest">Publicación Estándar</span>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col gap-6 md:gap-8">
          
          {/* Section 1: Información General */}
          <section className={sectionClass}>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className={iconContainerClass}>
                <Briefcase size={18} />
              </div>
              <h3 className="text-slate-900 font-bold text-lg tracking-tight drop-shadow-sm">Detalles Principales</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div>
                <label className={labelClass}>
                   Título de la Vacante
                </label>
                <Input 
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ej: Desarrollador Frontend"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                   Ubicación
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 drop-shadow-sm" />
                  <Input 
                    value={formData.establishmentAddress}
                    onChange={(e) => handleChange("establishmentAddress", e.target.value)}
                    placeholder="Dirección del establecimiento"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Días y Horarios */}
          <section className={`${sectionClass} grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10`}>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className={iconContainerClass}>
                  <CalendarDays size={18} className="text-orange-500" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg tracking-tight drop-shadow-sm">Días Laborales</h3>
              </div>
              
              <div className={`flex gap-2 p-2 rounded-[1.25rem] border ${isPremium ? 'bg-white/50 border-white/60 shadow-inner' : 'bg-gray-50 border-gray-100'}`}>
                {[
                  { id: "WEEKDAYS", label: "Lun-Vie" },
                  { id: "WEEKENDS", label: "Fines Sem." },
                  { id: "CUSTOM", label: "Elegir" }
                ].map((p) => (
                  <button 
                    key={p.id}
                    type="button" 
                    onClick={() => handleDaysPresetToggle(p.id as any)} 
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all ${
                      activeDaysPreset === p.id 
                      ? (isPremium ? "bg-white text-orange-600 shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] border border-white" : "bg-white text-orange-600 shadow-sm border border-gray-100/50")
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              
              <AnimatePresence>
                {activeDaysPreset === "CUSTOM" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className={`flex flex-wrap gap-2 justify-center sm:justify-between mt-4 p-4 rounded-2xl border overflow-hidden ${isPremium ? 'bg-white/60 border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,1)]' : 'bg-orange-50/50 border-orange-100/50'}`}
                  >
                    {ALL_DAYS.map(day => (
                      <button 
                        type="button" 
                        key={day.value} 
                        onClick={() => toggleDay(day.value)} 
                        className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-xs font-semibold transition-all flex items-center justify-center ${
                          formData.workDays.includes(day.value) 
                            ? (isPremium ? "bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-[0_10px_20px_-5px_rgba(249,115,22,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] -translate-y-1" : "bg-orange-500 text-white shadow-md -translate-y-0.5")
                            : "bg-white/50 text-slate-400 border border-white hover:border-slate-300 hover:text-slate-600 shadow-sm"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-5 relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className={iconContainerClass}>
                  <Clock size={18} className="text-blue-500" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg tracking-tight drop-shadow-sm">Tipo de Horario</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "FULL_TIME", label: "Completa", icon: "☀️" },
                  { id: "PART_TIME", label: "Media", icon: "🌓" },
                  { id: "FLEXIBLE", label: "Flexible", icon: "⚡" }
                ].map((s) => (
                  <button 
                    key={s.id}
                    type="button" 
                    onClick={() => handleChange("workSchedule", s.id)} 
                    className={`flex flex-col items-center justify-center min-h-11 h-auto py-2.5 rounded-[1.25rem] border transition-all ${
                      formData.workSchedule === s.id 
                      ? (isPremium ? "border-blue-400 bg-blue-50/80 text-blue-700 shadow-[0_8px_20px_-5px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,1)] ring-2 ring-blue-400/50" : "border-blue-500 bg-blue-50 text-blue-700 shadow-inner")
                      : "border-white/60 bg-white/40 text-slate-500 hover:bg-white/80 hover:shadow-sm"
                    }`}
                  >
                    <span className="text-xs sm:text-[13px] font-semibold text-center leading-tight px-1">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
          </section>
          
          {/* Section 3: Condiciones y Contrato */}
          <section className={`${sectionClass} grid grid-cols-1 md:grid-cols-2 gap-6`}>
             <div className="relative z-10">
                 <label className={labelClass}>
                   <Receipt size={16} className={isPremium ? "text-slate-500 drop-shadow-sm" : "text-green-500"} /> Salario (o equivalente)
                 </label>
                  <Input 
                     value={formData.salaryDescription} 
                     onChange={handleSalaryChange}
                     placeholder="Ej: $1.200.000 + Auxilios"
                     className={`${inputClass} text-[15px] ${isPremium ? 'text-emerald-600' : 'text-green-600'}`}
                     required
                  />
              </div>
              <div className="relative z-10">
                 <label className={labelClass}>
                   <ClipboardCheck size={16} className={isPremium ? "text-slate-500 drop-shadow-sm" : "text-green-500"} /> Tipo de Contrato
                 </label>
                  <Input 
                      value={formData.contractDescription}
                      onChange={(e) => handleChange("contractDescription", e.target.value)}
                      placeholder="Ej: Contrato de Aprendizaje"
                      className={inputClass}
                      required
                  />
              </div>
          </section>

          {/* Section 4: Labores y Requisitos */}
          <section className={`${sectionClass} space-y-8`}>
            
            <div className="relative z-10">
               <label className={labelClass}>
                  <Info size={16} className={isPremium ? "text-slate-500 drop-shadow-sm" : "text-green-500"} /> Funciones del Cargo
               </label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe detalladamente las tareas a realizar..."
                  className={textareaClass}
                  required
                />
            </div>
            
            <div className="relative z-10">
               <label className={labelClass}>
                  <Sparkles size={16} className={isPremium ? "text-amber-500 drop-shadow-sm" : "text-green-500"} /> Habilidades requeridas
               </label>
               
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                 <div className="relative flex-1 w-full">
                   <Plus size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 drop-shadow-sm" />
                    <Input 
                      value={skillsInput}
                      onChange={(e) => setSkillsInput(e.target.value)}
                      onKeyDown={onKeyDownSkill}
                      placeholder="Añade una habilidad y presiona Enter..."
                      className={`${inputClass} pl-11`}
                    />
                 </div>
                  <button 
                    type="button"
                    onClick={onAddSkill}
                    className={`w-full sm:w-auto px-6 h-11 rounded-xl font-bold text-[12px] uppercase tracking-widest transition-all active:scale-95 text-white flex items-center justify-center gap-2 ${
                      isPremium 
                      ? "bg-gradient-to-r from-green-500 to-blue-600 shadow-[0_15px_30px_-10px_rgba(59,130,246,0.6),inset_0_2px_0_rgba(255,255,255,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(59,130,246,0.7),inset_0_2px_0_rgba(255,255,255,0.5)] hover:-translate-y-0.5" 
                      : "bg-green-600 hover:bg-green-700 shadow-sm"
                    }`}
                  >
                    Añadir
                  </button>
               </div>

               {formData.requirements.length > 0 ? (
                 <div className={`flex flex-wrap gap-2.5 mt-4 p-4 rounded-xl border ${isPremium ? 'bg-white/50 border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,1)]' : 'bg-gray-50 border-gray-100'}`}>
                   {formData.requirements.map((req: any, index: number) => {
                     const label = typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito");
                     return (
                       <motion.span 
                         initial={{ scale: 0.8, opacity: 0, y: 15 }}
                         animate={{ scale: 1, opacity: 1, y: 0 }}
                         key={`${label}-${index}`} 
                         onClick={() => handleRequirementRemove(req)}
                         className={`group flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm ${
                           isPremium 
                           ? "bg-white border border-slate-200/80 text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)]" 
                           : "bg-green-50 text-green-700 border border-green-100 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                         }`}
                       >
                         {label}
                         <X size={16} className={`${isPremium ? 'text-slate-400' : 'text-green-400'} group-hover:text-red-500 transition-colors drop-shadow-sm`} />
                       </motion.span>
                     );
                   })}
                 </div>
               ) : (
                 <p className="text-[13px] font-medium text-slate-400 ml-1 mt-3">No has añadido habilidades aún. ¡Destaca lo que buscas!</p>
               )}
            </div>
          </section>
        </div>

        {/* Footer Action */}
        <div className="relative z-10 mt-8 flex justify-end">
           <button 
              type="submit" 
              disabled={saving}
              className={`w-full sm:w-auto px-8 sm:px-10 h-12 sm:h-14 rounded-2xl font-bold text-[13px] uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group overflow-hidden relative ${
                isPremium 
                ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-[0_20px_40px_-10px_rgba(59,130,246,0.7),inset_0_2px_0_rgba(255,255,255,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(59,130,246,0.8),inset_0_2px_0_rgba(255,255,255,0.5)] hover:-translate-y-1" 
                : "bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20"
              }`}
           >
              {isPremium && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
              )}
              
               {saving ? (
                 <>
                   <Loader2 className="h-5 w-5 animate-spin" />
                   <span>Procesando...</span>
                 </>
               ) : (
                 <>
                   <span>{isEditing ? "Guardar Cambios" : "Publicar Oferta"}</span>
                   {isPremium && <Sparkles size={18} className="transition-transform group-hover:rotate-12 group-hover:scale-110 text-white drop-shadow-md" />}
                 </>
               )}
           </button>
        </div>
      </div>

    </form>
  );
};
