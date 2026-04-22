"use client"
import { Button } from '@/components/ui/button';

interface TagProps {
    label: string;
    selected: boolean;
    variant?: "day" | "jornada"
    onClick: () => void;
}

    export const Tag = ({ label, selected, variant, onClick }: TagProps) => {
    return (
        <Button size={'tag'} 
            variant={'tag'}
            onClick={onClick}
            className={` 
                ${variant === "day" && selected ? "bg-green-200 border-2 border-green-700 text-green-700" : ""}
                ${variant === "jornada" && selected ? "bg-orange-100 border-2 border-orange-600 text-orange-700" : ""}
            `}
        >
            {label}
        </Button>
    )
}