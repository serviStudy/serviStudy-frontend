"use client";

import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";
import { ApplicationPageResponse } from "../types/applicationTypes";
import { ListPostulaciones } from "../components/ListPostulaciones";
import { Loader2 } from "lucide-react";

export const ListPostulacionesClient = () => {
    const [data, setData] = useState<ApplicationPageResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApplications = async () => {
        try {
            const result = await getApplications();
            setData(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchApplications();
    }, []);

    if (loading){
        return(
            <div className="flex flex-col gap-3 min-h-[60vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
                <p>cargando Postulaciones</p>
            </div>
        )
    };

    if (!data){
            return(
                <div className="flex flex-col gap-3 min-h-[60vh] items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
                    <p>Error al cargar Postulaciones</p>
                </div>
            )
    };
    return <ListPostulaciones data={data} />;
};