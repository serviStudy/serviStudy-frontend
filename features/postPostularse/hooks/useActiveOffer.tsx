"use client"
import { ActiveOffer } from '@/features/ofertasActivas/types/ofertasActivas.types'
import React, { useEffect, useState } from 'react'
import { getOfferById } from '../service/postulacionService';

export const useActiveOffer = (id: string) => {
    const [offer, setOffer] = useState<ActiveOffer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                const data = await getOfferById(id);
                setOffer(data);
            } catch (err: any){
                setError(err.message);
            } finally{
                setLoading(false)
            }
        }
        fetchOffer()
    }, [id])

    return {offer, loading, error}
}
