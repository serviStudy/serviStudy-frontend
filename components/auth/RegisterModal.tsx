import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type CardProps = {
    button: string
    tittle: string
    description: string
    paragraph: string
    tittleColor?: string
}

const RegisterModal = ({button, tittle, description, paragraph, tittleColor}: CardProps) => {    
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" className="hover:underline">{button}</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={`font-bold text-2xl ${tittleColor}`}>{tittle}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                        <p className="whitespace-pre-line text-[13px]">{paragraph}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RegisterModal