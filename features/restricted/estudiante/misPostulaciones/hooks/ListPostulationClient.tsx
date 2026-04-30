"use client";

import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";
import { ApplicationItem, ApplicationPageResponse } from "../types/applicationTypes";
import { ListPostulaciones } from "../components/ListPostulaciones";
import { Loader2, AlertCircle } from "lucide-react";

export const ListPostulacionesClient = () => {
    const [items, setItems] = useState<ApplicationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const result: ApplicationPageResponse = await getApplications();
                setItems(result.content);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = (jobOfferId: string) => {
        setItems((prev) => prev.filter((app) => app.jobOffer.jobOfferId !== jobOfferId));
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm py-24">
                <Loader2 className="h-9 w-9 animate-spin text-[#2552d0]" />
                <p className="text-sm text-gray-500 font-medium">Cargando tus postulaciones...</p>
            </div>
        )
    };

    if (error) {
        return (
            <div className="flex flex-col gap-4 items-center justify-center bg-white rounded-3xl border border-red-100 shadow-sm py-24">
                <div className="bg-red-50 p-4 rounded-2xl">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-center">
                    <p className="text-base font-bold text-gray-800">Error al cargar postulaciones</p>
                    <p className="text-sm text-gray-500 mt-1">Intenta recargar la página</p>
                </div>
            </div>
        )
    };

    return <ListPostulaciones items={items} onDelete={handleDelete} />;
};