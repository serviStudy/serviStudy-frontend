import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export const HeaderLR = () => {
    return (
    <div className="bg-white w-full fixed top-0 z-1" >
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 w-full">
            <div className="flex items-center shrink-0 gap-2 md:gap-3">
                <Image
                    src="/logo.jpg"
                    alt="Logo ServiStudy"
                    width={300}          
                    height={300}
                    priority
                    className="h-12.5 w-auto object-contain" 
                />
                <div className="flex">
                <h1 className="text-[#1e40af] font-extrabold text-xl md:text-2xl">
                    Servi
                </h1>
                <h1 className="text-blue-500 font-bold text-xl md:text-2xl">
                    Study
                </h1>
                </div>  
            <div/>
            
            </div>
            <Link href="/" className="inline-block">
                <ChevronLeft className="text-blue-700 size-8 hover:text-blue-100 hover:bg-blue-700 transition-colors rounded-2xl" ></ChevronLeft>
            </Link>
        </div>
        </header>
    </div>
    )
}
