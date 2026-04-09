import { useState } from "react"

type Selection = {
    day: string | null;
    jornada: string | null;
}

export const useTagSelection = () => {
    const [selection, setSelection] = useState({
        day: null,
        jornada: null
    })

    const toggleTag = (type: 'day' | 'jornada', tag: string) => {
        setSelection(prev => ({
            ...prev,
            [type]: prev[type] === tag ? null : tag
        }))
    }

    return {selection, toggleTag}
}
