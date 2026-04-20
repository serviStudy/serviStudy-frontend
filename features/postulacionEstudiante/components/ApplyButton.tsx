"use client"

import React from 'react'
import { createApplication } from '../service/postulacionService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
    offerId: string;
}

export const ApplyButton = ({offerId}: Props) => {
    const handleApply = async () => {
        try {
            await createApplication({
                jobOfferId: offerId
            })
            alert("Postulacion enviada con exito")
        }catch (error) {
            console.log(error)
            toast.error("Error al postularse");
        }
    }

    return (
        <Button className="w-full justify-center py-5 text-[17px]" onClick={handleApply}>Postularme</Button>
    )
}