"use client"

import React from 'react'
import { toast } from 'sonner';
import { deleteApplication } from '../services/applicationService';

interface Props {
    jobOfferId: string;
    onDelete: (jobOfferId: string) => void;
}

export const ApplyButtonDelete = ({ jobOfferId, onDelete }: Props) => {
    const handleApply = async () => {
        try {
            await deleteApplication(jobOfferId)
            toast.success("Postulación retirada con éxito")
            onDelete(jobOfferId)
        } catch (error) {
            console.log(error)
            toast.error("Error al retirar postulación");
        }
    }

    return (
        <button
            onClick={handleApply}
            className='text-sm font-semibold px-5 py-2.5 rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer'
        >
            Retirar postulación
        </button>
    )
}