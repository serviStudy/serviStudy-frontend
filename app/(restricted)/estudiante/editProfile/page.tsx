import { HeaderLR } from '@/components/shared/HeaderLR'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import React from 'react'


const page = () => {
    return (
        <div className="flex flex-col gap-9 min-h-screen items-center justify-center bg-gray-200 pb-10 sm:pt-16 lg:pb-12 lg:pt-32 md:pt-12 sm:pb-10">
            <HeaderLR/>
            
            <div className="bg-white w-77.5 h-154.25 rounded-[9px] md:w-124 lg:w-228 lg:h-234.5 lg:rounded-[14px">
                <div className="relative flex items-center justify-center bg-popover w-77.5 h-49 rounded-t-[9px] p-24 md:w-124 md:h-60 lg:justify-start lg:w-228 lg:h-62.25 lg:rounded-t-[9px]">

                </div>
            </div>
        </div>
    )
}

export default page