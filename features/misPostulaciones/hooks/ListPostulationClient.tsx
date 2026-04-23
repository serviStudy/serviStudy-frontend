"use client";

import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";
import { ApplicationPageResponse } from "../types/applicationTypes";
import { ListPostulaciones } from "../components/ListPostulaciones";

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

    if (loading) return <p>Cargando postulaciones...</p>;

    if (!data) return <p>Error al cargar postulaciones</p>;

    return <ListPostulaciones data={data} />;
};