import { StudentSkill } from "./StudentSkill"

interface Props {
    skills: string[]
    onRemove: (skill: string) => void
}

export const SkillsList = ({ skills, onRemove }: Props) => {
    return (
        <div className="flex gap-1 flex-wrap">
            {skills.map(skill => (
                <StudentSkill
                    key={skill}
                    label={skill}
                    onClick={() => onRemove(skill)}
                />
            ))}
        </div>
    )
}