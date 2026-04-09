import React, { useEffect, useState } from 'react'

export const useSidebar = () => {
    // open = false -> sidebar cerrado
    const [open, setOpen] = useState(false);

    const openSidebar = () => setOpen(true)
    const closeSidebar = () => setOpen(false)
    const toggleSidebar = () => setOpen(prev => !prev)
    
    // controlla el scroll de fondo
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open]);

    // funciones 
    return {
        open,
        openSidebar,
        closeSidebar,
        toggleSidebar
    }
}
