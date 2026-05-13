"use client"

import React from 'react'
import { toast } from 'sonner';
import { deleteApplication } from '../services/applicationService';
import { Trash2 } from 'lucide-react';

interface Props {
    jobOfferId: string;
    onDelete: (jobOfferId: string) => void;
    variant?: 'default' | 'icon';
}

export const ApplyButtonDelete = ({ jobOfferId, onDelete, variant = 'default' }: Props) => {
    const handleApply = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await deleteApplication(jobOfferId)
            toast.success("Postulación retirada con éxito")
            onDelete(jobOfferId)
        } catch (error) {
            console.log(error)
            toast.error("Error al retirar postulación");
        }
    }

    if (variant === 'icon') {
        return (
            <button
                onClick={handleApply}
                className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 shadow-sm active:scale-90 cursor-pointer"
                title="Retirar postulación"
            >
                <Trash2 size={20} />
            </button>
        )
    }

}