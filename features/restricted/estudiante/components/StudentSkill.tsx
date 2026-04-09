import React from 'react'
import { Badge } from '../../../../components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface SkillProps {
    label: string;
    onClick: () => void;
}

export const StudentSkill = ({ label, onClick }: SkillProps) => {
    return (
        <div>
            <Button size={'tag'} variant={'tag'} 
                className='bg-popover border-primary text-primary '>
                {label}
                <p className='cursor-pointer' onClick={onClick}><X/></p>
            </Button>
        </div>
    )
}