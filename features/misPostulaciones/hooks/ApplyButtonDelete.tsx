"use client"

import React from 'react'
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { deleteApplication } from '@/features/postPostularse/service/postulacionService';

interface Props {
    postulationId: string;
}

export const ApplyButtonDelete = ({postulationId}: Props) => {
    const handleApply = async () => {
        try {
            await deleteApplication({
                id: postulationId
            })
            alert("Postulación eliminada con exito")
        }catch (error) {
            console.log(error)
            toast.error("Error al retirar postulación");
        }
    }

    return (
        <Button className='bg-green-50 border border-green-900 text-green-900 py-1 w-auto px-7 rounded-2xl font-semibold' onClick={handleApply}>Retirar postulación</Button>
    )
}