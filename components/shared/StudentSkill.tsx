import React from 'react'
import { Badge } from '../ui/badge'
import { Skill } from '@/type/skill'

interface Props {
    skill: Skill
}

export const StudentSkill = ({ skill }: Props) => {
    return (
        <div>
            <Badge className='bg-popover border-2 border-primary h-5.5 font-semibold text-primary text-[11px] px-4 md:h-6 lg:text-[16px] lg:h-10'>
                {skill.skill_name}
            </Badge>
        </div>
    )
}