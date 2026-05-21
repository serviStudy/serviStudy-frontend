import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, Bot, PieChart, Zap, ShieldCheck, Lock, Check, BarChart3, Target } from "lucide-react"
import Link from "next/link"

export function ModalRecomendation() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-5 flex gap-2 py-0.5 px-2 cursor-pointer text-white text-[15px] bg-linear-to-r from-green-500 to-blue-500">
                    <Sparkles/>
                    Realizar compatibilidad
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[600px] max-h-[95vh] overflow-y-auto p-6 md:p-8 border-none shadow-2xl bg-white sm:rounded-3xl [&>button]:right-5 [&>button]:top-5 [&>button]:bg-slate-100 [&>button]:rounded-full [&>button]:p-1.5 [&>button]:opacity-70 hover:[&>button]:opacity-100">
                <div className="flex flex-col w-full">
                    
                    {/* Top Header: Badge & Title */}
                    <div className="flex flex-col items-center text-center mb-5 mt-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full w-fit mb-4 shadow-sm border border-blue-100">
                            <Sparkles size={14} className="text-teal-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-800">Nueva</span>
                        </div>

                        <h2 className="text-2xl md:text-[1.75rem] font-extrabold text-[#1e293b] leading-[1.2]">
                            Contacta con <br className="sm:hidden"/>
                            <span className="bg-linear-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">mayor precisión</span>
                            <Target className="inline-block ml-2 w-6 h-6 text-blue-500" strokeWidth={2} />
                        </h2>
                    </div>

                    {/* Miniaturized Mockup (Between Title and Description) */}
                    <div className="w-full bg-slate-50/50 rounded-2xl p-4 md:p-5 border border-slate-100 mb-6 relative overflow-hidden flex justify-center shadow-inner">
                        {/* Decorative background blurs */}
                        <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-blue-200/40 blur-[40px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 bg-green-200/40 blur-[40px] rounded-full pointer-events-none" />

                        <div className="w-full max-w-[340px] relative z-10">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-slate-800 text-[13px]">Selecciona postulantes</h3>
                                <Sparkles size={16} className="text-yellow-400 fill-yellow-400/20" strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-2">
                                {/* Compact Mock Card 1 */}
                                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 shadow-sm bg-white">
                                    <div className="w-4 h-4 rounded-[4px] bg-blue-600 flex items-center justify-center shrink-0">
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                    </div>
                                    <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full object-cover shrink-0" alt="avatar" />
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-800 text-[13px] mb-1 leading-none">Carlos</div>
                                        <div className="w-20 h-1.5 bg-slate-200 rounded-full mb-1"></div>
                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-center justify-center px-2 py-1 bg-green-50 rounded-lg border border-green-100/50">
                                        <span className="text-green-600 font-extrabold text-[12px] leading-none mb-0.5">92%</span>
                                        <span className="text-green-500 text-[6px] font-bold uppercase tracking-widest">Compatible</span>
                                    </div>
                                </div>

                                {/* Compact Mock Card 2 */}
                                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 shadow-sm bg-white">
                                    <div className="w-4 h-4 rounded-[4px] bg-blue-600 flex items-center justify-center shrink-0">
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                    </div>
                                    <img src="https://i.pravatar.cc/150?img=5" className="w-8 h-8 rounded-full object-cover shrink-0" alt="avatar" />
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-800 text-[13px] mb-1 leading-none">Diana</div>
                                        <div className="w-20 h-1.5 bg-slate-200 rounded-full mb-1"></div>
                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-center justify-center px-2 py-1 bg-blue-50 rounded-lg border border-blue-100/50">
                                        <span className="text-blue-600 font-extrabold text-[12px] leading-none mb-0.5">76%</span>
                                        <span className="text-blue-500 text-[6px] font-bold uppercase tracking-widest">Compatible</span>
                                    </div>
                                </div>

                                {/* Compact Mock Card 3 */}
                                <div className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-100 shadow-sm bg-white">
                                    <div className="w-4 h-4 rounded-[4px] bg-blue-600 flex items-center justify-center shrink-0">
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                    </div>
                                    <img src="https://i.pravatar.cc/150?img=12" className="w-8 h-8 rounded-full object-cover shrink-0" alt="avatar" />
                                    <div className="flex-1">
                                        <div className="font-bold text-slate-800 text-[13px] mb-1 leading-none">Juan</div>
                                        <div className="w-20 h-1.5 bg-slate-200 rounded-full mb-1"></div>
                                        <div className="w-12 h-1.5 bg-slate-100 rounded-full"></div>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-center justify-center px-2 py-1 bg-orange-50 rounded-lg border border-orange-100/50">
                                        <span className="text-orange-500 font-extrabold text-[12px] leading-none mb-0.5">61%</span>
                                        <span className="text-orange-400 text-[6px] font-bold uppercase tracking-widest">Compatible</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Text */}
                    <p className="text-slate-600 text-[14px] leading-relaxed mb-6 text-center px-2">
                        Nuestra función de compatibilidad analiza automáticamente qué tan alineados están los postulantes con tu oferta laboral.
                        Obtén resultados en porcentaje, compara candidatos y toma decisiones más rápidas y acertadas.
                    </p>

                    {/* Features list (2x2 grid for compact vertical space) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 px-2">
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                                <Bot size={16} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-slate-800 text-[12px] leading-snug">Evaluar postulantes automáticamente</h4>
                        </div>
                        
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                                <PieChart size={16} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-slate-800 text-[12px] leading-snug">Obtener porcentajes de compatibilidad</h4>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-orange-50 text-orange-500 rounded-lg shrink-0">
                                <Zap size={16} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-slate-800 text-[12px] leading-snug">Identificar perfiles ideales más rápido</h4>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                                <ShieldCheck size={16} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-slate-800 text-[12px] leading-snug">Tomar decisiones con mayor confianza</h4>
                        </div>
                    </div>

                    {/* Button */}
                    <Button asChild className="w-full py-5 h-auto bg-linear-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-[14px] rounded-xl shadow-lg shadow-blue-500/20 mb-3 cursor-pointer">
                        <Link href="/empleador/suscripcion" className="flex items-center justify-center gap-2">
                            <Sparkles size={16} />
                            Descubre todos los beneficios
                        </Link>
                    </Button>
                    
                    {/* Footer text */}
                    <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-medium">
                        <Lock size={10} />
                        Disponible con suscripción premium
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
