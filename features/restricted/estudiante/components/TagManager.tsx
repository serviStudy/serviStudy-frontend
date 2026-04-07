import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { SkillsList } from "./SkillsList"
import { validateSkill } from "../utils/validator"

interface Props {
    skills: string[]
    setSkills: React.Dispatch<React.SetStateAction<string[]>>
}

export const TagManager = ({ skills, setSkills }: Props) => {
    const [inputValue, setInputValue] = React.useState("")
    const [error, setError] = React.useState<string | null>(null)

    function handleAdd() {
        const validationError = validateSkill(inputValue, skills)

        if (validationError) {
            setError(validationError)
            return
        }

        setSkills(prev => [...prev, inputValue.trim()])
        setInputValue("")
        setError(null)
    }

    function handleRemove(skill: string) {
        setSkills(prev => prev.filter(s => s !== skill))
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <p className="font-bold text-gray-500 text-[12px] md:text-[14px] lg:text-[17px]">Habilidades</p>

            <div className='flex w-full gap-6'>
                <Input
                    className="text-[12px] text-gray-500 md:text-[11px] lg:text-[14px] font-medium rounded-[15px] h-5 lg:h-9 border border-gray-400"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleAdd()}}}
                    placeholder="Añadir habilidades"
                />

                <Button className="h-5 lg:h-9"
                    onClick={handleAdd}>
                    <PlusCircle className="h-2! w-2! md:h-2! md:w-2! lg:w-4! lg:h-8!"/>
                </Button>
            </div>
            <SkillsList skills={skills} onRemove={handleRemove} />
        </div>
    )
}