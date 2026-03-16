import Link from "next/link"
import Image from "next/image"

export const HeaderLR = () => {
return (
    <div className="bg-white w-full absolute top-0" >
                <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 w-full">
                    <div className="flex items-center shrink-0 gap-2 md:gap-3">
                        <Image
                            src="/logoo.jpg"
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
                    <svg 
                        width="25px" 
                        height="25px" 
                        viewBox="0 0 48 48" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 0h48v48H0z" fill="none"/>
                        <g id="Shopicon">
                        <polygon points="40,22 14.828,22 28.828,8 26,5.172 7.172,24 26,42.828 28.828,40 14.828,26 40,26" fill="currentColor"/>
                        </g>
                    </svg>
                    </Link>
                </div>
                </header>
            </div>
)
}
