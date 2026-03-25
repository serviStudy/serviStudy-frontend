import { StudentSkill } from '@/components/shared/StudentSkill'
import { Skill } from '@/type/skill'
import React from 'react'

interface Props {
    skill: Skill[]
}

export const SkillsList = ({ skill }: Props) => {
    return (
        <div className='flex gap-2'>
            {skill.map((skill) => (
                <StudentSkill
<<<<<<< HEAD
                    key={skill.id}
                    skill={skill}
=======
                key={skill.id}
>>>>>>> feature/isabella
                />
            ))}
        </div>
    )
}