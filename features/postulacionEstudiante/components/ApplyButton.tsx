"use client"

import React from 'react'
import { createApplication } from '../service/postulacionService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Toast } from 'radix-ui';

interface Props {
    offerId: string;
}

export const ApplyButton = ({offerId}: Props) => {
    const handleApply = async () => {
        try {
            await createApplication({
                jobOfferId: offerId,
                studentProfileId: ''
            })
            alert("Postulacion enviada con exito")
        }catch (error) {
            console.log(error)
            toast.error("Error al postularse");
        }
    }

    return (
        <Button className="w-full justify-center py-5 text-[17px] cursor-pointer" onClick={handleApply}>Postularme</Button>
    )
}