"use client";

import { useEffect, useState } from "react";
import {
    Search,
    Calendar,
    Clock,
    ChevronDown,
    RotateCcw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSearch: () => void;
    selectedDays: string[];
    onSelectDay: (day: string) => void;
    selectedJornada: string[];
    onSelectJornada: (jornada: string) => void;
    onClearAll: () => void;
}

const FILTER_DAYS = ["Entre semana", "Fines de semana"];
const FILTER_JORNADAS = [
    "Medio tiempo",
    "Tiempo completo",
    "Flexible"
];

const COLLAPSE_DISTANCE = 100;

export function MobileHeaderOfertas({
    inputValue,
    onInputChange,
    onSearch,
    selectedDays,
    onSelectDay,
    selectedJornada,
    onSelectJornada,
    onClearAll,
}: Props) {
    const [activeFilter, setActiveFilter] = useState<"days" | "jornada" | null>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const collapseProgress = Math.min(1, scrollY / COLLAPSE_DISTANCE);
    const introOpacity = 1 - collapseProgress;
    const introMaxHeight = Math.max(0, (1 - collapseProgress) * 140);

    const toggleFilter = (filter: "days" | "jornada") => {
        setActiveFilter((prev) => (prev === filter ? null : filter));
    };

    const hasActiveFilters =
        selectedDays.length > 0 || selectedJornada.length > 0;

    const daysLabel =
        selectedDays.length === 0
            ? "Días laborales"
            : selectedDays.join(", ");

    const jornadaLabel =
        selectedJornada.length === 0
            ? "Jornada"
            : selectedJornada.join(", ");

    return (
        <div className="sticky top-0 z-30 -mx-4 px-4 py-3 mb-4 overflow-hidden md:hidden w-[95%]">
            <div
                className="overflow-hidden relative z-10  transition-[max-height,opacity] duration-300 ease-out"
                style={{
                    maxHeight: `${introMaxHeight}px`,
                    opacity: introOpacity,
                }}
            >
                <h1 className="pt-2 text-2xl font-bold leading-tight tracking-tight text-blue-900">
                    Encuentra nuevas  <span className="text-blue-300">oportunidades</span>
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    Explora cientos de oportunidades para estudiantes <br /> y da el siguiente paso en tu
                    carrera profesional.
                </p>
            </div>

            <div className="mt-3 flex flex-col gap-3">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") onSearch();
                        }}
                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/15"
                        placeholder="Buscar puesto, empresa o palabra clave"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => toggleFilter("days")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            activeFilter === "days" || selectedDays.length > 0
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-700"
                        }`}
                    >
                        <Calendar className="h-4 w-4 shrink-0" />
                        <span className="truncate">{daysLabel}</span>
                        <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform ${
                                activeFilter === "days" ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={() => toggleFilter("jornada")}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            activeFilter === "jornada" || selectedJornada.length > 0
                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-700"
                        }`}
                    >
                        <Clock className="h-4 w-4 shrink-0" />
                        <span className="truncate">{jornadaLabel}</span>
                        <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform ${
                                activeFilter === "jornada" ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>

                <AnimatePresence>
                    {activeFilter && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"
                        >
                            {activeFilter === "days" && (
                                <div className="p-4">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Días laborales
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {FILTER_DAYS.map((day) => {
                                            const isActive =
                                                day === "Todos"
                                                    ? selectedDays.length === 0
                                                    : selectedDays.includes(day);
                                            return (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => onSelectDay(day)}
                                                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                                                        isActive
                                                            ? "bg-blue-600 text-white shadow-sm"
                                                            : "bg-white text-gray-600 border border-gray-200"
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {activeFilter === "jornada" && (
                                <div className="p-4">
                                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                                        Jornada
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {FILTER_JORNADAS.map((jornada) => {
                                            const isActive =
                                                jornada === "Todas"
                                                    ? selectedJornada.length === 0
                                                    : selectedJornada.includes(jornada);
                                            return (
                                                <button
                                                    key={jornada}
                                                    type="button"
                                                    onClick={() => onSelectJornada(jornada)}
                                                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                                                        isActive
                                                            ? "bg-blue-600 text-white shadow-sm"
                                                            : "bg-white text-gray-600 border border-gray-200"
                                                    }`}
                                                >
                                                    {jornada}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {hasActiveFilters && (
                                <div className="border-t border-gray-100 px-4 py-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClearAll();
                                            setActiveFilter(null);
                                        }}
                                        className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-blue-600"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
