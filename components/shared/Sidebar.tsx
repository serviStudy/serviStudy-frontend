import { X } from 'lucide-react'
import React from 'react'

interface SidebarProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

export const Sidebar = ({ open, onClose, children }: SidebarProps) => {
    return (
        <>
        <div>
            {/* overlay */}
            <div onClick={onClose}
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden
                ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
            />

            {/* panel */}
            <div onClick={(e) => e.stopPropagation()}
                className={`lg:hidden fixed top-0 right-0 h-screen w-[65%] md:w-[55%] bg-gray-50 z-50 shadow-lg
                transform transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "translate-x-full"}`}>

                {/* x cierre de menú */}
                <div className="flex w-64 p-5 border-b md:w-96">
                    <button className="text-blue-700" onClick={onClose}>
                        <X/>
                    </button>
                </div>

                {/* contenido */}
                {children}
            </div>
        </div>
        </>
    )
}
