"use client";
import React, { useState } from "react";
import { CreateJobOfferDTO, DayWeek } from "../../types/jobOffer.types";
import { useJobOfferForm } from "../../hooks/useJobOfferForm";
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
    <form onSubmit={handleSubmit} className="relative w-full max-w-4xl mx-auto">
      
      {/* Premium Form Container with Glassmorphism */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-green-900/5 p-8 lg:p-10 border border-white relative overflow-hidden">
        
        {/* Subtle Decorative Glows inside the form */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-green-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-green-50/50 to-transparent rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100/60">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-600/20 transform -rotate-3">
              <Briefcase className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                {isEditing ? "Editar Oferta" : "Nueva Vacante"}
              </h2>
              <p className="text-gray-400 text-sm font-bold mt-1 tracking-wide">
                Configura los detalles para atraer al mejor talento.
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-green-800 text-xs font-black uppercase tracking-widest">Publicación Rápida</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          
          {/* Section 1: Información General (Inside a subtle card) */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Briefcase size={16} className="text-green-600" />
              </div>
              <h3 className="text-gray-900 font-black text-lg tracking-tight">Detalles Principales</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                   Título de la Vacante
                </label>
                <Input 
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Ej: Mesero para Eventos"
                  className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white font-bold text-gray-900 focus:ring-2 focus:ring-green-500/20 transition-all shadow-inner"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                   Ubicación
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input 
                    value={formData.establishmentAddress}
                    onChange={(e) => handleChange("establishmentAddress", e.target.value)}
                    placeholder="Dirección del establecimiento"
                    className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white font-bold text-gray-900 focus:ring-2 focus:ring-green-500/20 transition-all shadow-inner pl-11"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Días y Horarios */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <CalendarDays size={16} className="text-orange-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg tracking-tight">Días Laborales</h3>
              </div>
              
              <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                {[
                  { id: "WEEKDAYS", label: "Lun-Vie" },
                  { id: "WEEKENDS", label: "Fines Sem." },
                  { id: "CUSTOM", label: "Elegir" }
                ].map((p) => (
                  <button 
                    key={p.id}
                    type="button" 
                    onClick={() => handleDaysPresetToggle(p.id as any)} 
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                      activeDaysPreset === p.id 
                      ? "bg-white text-orange-600 shadow-sm border border-gray-100/50" 
                      : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              
              <AnimatePresence>
                {activeDaysPreset === "CUSTOM" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="flex justify-between mt-3 bg-orange-50/50 p-2 rounded-2xl border border-orange-100/50"
                  >
                    {ALL_DAYS.map(day => (
                      <button 
                        type="button" 
                        key={day.value} 
                        onClick={() => toggleDay(day.value)} 
                        className={`h-9 w-9 rounded-xl text-[11px] font-black transition-all ${
                          formData.workDays.includes(day.value) 
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 -translate-y-0.5" 
                            : "bg-white text-gray-400 border border-gray-100 hover:border-orange-300"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-black text-lg tracking-tight">Horario</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 h-[46px]">
                {[
                  { id: "FULL_TIME", label: "Completa", icon: "☀️" },
                  { id: "PART_TIME", label: "Media", icon: "🌓" },
                  { id: "FLEXIBLE", label: "Flexible", icon: "⚡" }
                ].map((s) => (
                  <button 
                    key={s.id}
                    type="button" 
                    onClick={() => handleChange("workSchedule", s.id)} 
                    className={`flex flex-col items-center justify-center rounded-2xl border transition-all ${
                      formData.workSchedule === s.id 
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-inner" 
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-white"
                    }`}
                  >
                    <span className="text-xs font-black">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
          </section>
          
          {/* Section 3: Condiciones y Contrato */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 grid grid-cols-1 md:grid-cols-2 gap-5">
             <div className="space-y-2">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <Receipt size={14} className="text-green-500" /> Salario (o equivalente)
                 </label>
                 <Input 
                    value={formData.salaryDescription} 
                    onChange={handleSalaryChange}
                    placeholder="Ej: $1.200.000 + Auxilios"
                    className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white font-black text-green-600 text-lg focus:ring-2 focus:ring-green-500/20 shadow-inner"
                    required
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                   <ClipboardCheck size={14} className="text-green-500" /> Tipo de Contrato
                 </label>
                 <Input 
                     value={formData.contractDescription}
                     onChange={(e) => handleChange("contractDescription", e.target.value)}
                     placeholder="Ej: Contrato de Aprendizaje"
                     className="h-12 rounded-xl border-gray-200 bg-gray-50 focus:bg-white font-bold text-gray-900 focus:ring-2 focus:ring-green-500/20 shadow-inner"
                     required
                 />
              </div>
          </section>

          {/* Section 4: Labores y Requisitos */}
          <section className="bg-white rounded-3xl p-6 border border-gray-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6">
            <div className="space-y-2">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Info size={14} className="text-green-500" /> Funciones del Cargo
               </label>
               <Textarea 
                 value={formData.description}
                 onChange={(e) => handleChange("description", e.target.value)}
                 placeholder="Describe detalladamente las tareas a realizar..."
                 className="min-h-[100px] rounded-2xl border-gray-200 bg-gray-50 focus:bg-white p-4 font-medium resize-none text-sm leading-relaxed text-gray-900 focus:ring-2 focus:ring-green-500/20 shadow-inner"
                 required
               />
            </div>
            
            <div className="space-y-3">
               <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Sparkles size={14} className="text-green-500" /> Habilidades requeridas
               </label>
               
               <div className="flex gap-3">
                 <div className="relative flex-1">
                   <Plus size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   <Input 
                     value={skillsInput}
                     onChange={(e) => setSkillsInput(e.target.value)}
                     onKeyDown={onKeyDownSkill}
                     placeholder="Añade una habilidad y presiona Enter..."
                     className="h-12 pl-10 rounded-xl border-gray-200 bg-gray-50 focus:bg-white font-bold text-sm focus:ring-2 focus:ring-green-500/20 shadow-inner"
                   />
                 </div>
                 <button 
                   type="button"
                   onClick={onAddSkill}
                   className="px-6 h-12 bg-green-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 active:scale-95"
                 >
                   Añadir
                 </button>
               </div>

               {formData.requirements.length > 0 ? (
                 <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                   {formData.requirements.map((req: any, index: number) => {
                     const label = typeof req === 'string' ? req : (req.requirementName || req.name || "Requisito");
                     return (
                       <motion.span 
                         initial={{ scale: 0.8, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         key={`${label}-${index}`} 
                         onClick={() => handleRequirementRemove(req)}
                         className="group bg-green-50/50 text-green-700 border border-green-100 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer shadow-sm"
                       >
                         {label}
                         <X size={14} className="text-green-300 group-hover:text-red-500 transition-colors" />
                       </motion.span>
                     );
                   })}
                 </div>
               ) : (
                 <p className="text-xs font-bold text-gray-400 italic ml-1 mt-2">No has añadido habilidades aún. ¡Destaca lo que buscas!</p>
               )}
            </div>
          </section>
        </div>

        {/* Footer Action */}
        <div className="relative z-10 mt-8 pt-6 flex justify-end">
           <button 
              type="submit" 
              disabled={saving}
              className="w-full sm:w-auto px-10 h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl font-black text-[13px] uppercase tracking-widest transition-all shadow-xl shadow-green-600/30 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group overflow-hidden relative"
           >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <span>{isEditing ? "Guardar Cambios" : "Publicar Oferta"}</span>
                  <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
           </button>
        </div>
      </div>

    </form>
  );
};
