"use client";
import { ActiveOffer } from '../types/ofertasActivas.types'
import { getActiveOffers } from '../services/ofertaActivaService';
import { useEffect, useState } from 'react';

export const useActiveOffers = () => {
    const [offers, setOffers] = useState<ActiveOffer[]>([]);
    const [selectedOffer, setSelectedOffer] = useState<ActiveOffer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getActiveOffers();

                if (!data) return;

                setOffers(data);

                if (data.length > 0){
                    setSelectedOffer(data[0]);
                }
            }catch (error){
                console.log("error loading offers", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOffers();
    }, [])

    return {
        offers,
        selectedOffer,
        setSelectedOffer,
        loading
    }
}
