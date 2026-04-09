import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export const HeaderLR = () => {
    return (
    <div className="bg-white w-full fixed top-0 z-1" >
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
            <div className="mx-auto flex h-16 justify-between items-center px-4 md:px-6 lg:px-16 w-full">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.jpg"
                            alt="Logo ServiStudy"
                            width={300}
                            height={300}
                            className="w-auto h-12 md:h-14 lg:h-14"
                        />
                        <h1 className="text-blue-900 font-extrabold text-[19px] md:text-[24px] lg:text-[24px]">
                            Servi<span className="text-blue-500">Study</span>
                        </h1>
                    </div> 
            
                </div>
                <Link href="/" className="inline-block">
                    <ChevronLeft className="text-blue-700 size-8 hover:text-blue-50 hover:bg-blue-800 transition-colors rounded-2xl" ></ChevronLeft>
                </Link>
            </div>
        </header>
    </div>
    )
}
