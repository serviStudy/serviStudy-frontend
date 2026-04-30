import React from 'react'

export const ProfileInfoSkeleton = () => {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-10 items-center animate-pulse">
      <div className="w-full rounded-[40px] bg-white shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner Skeleton */}
        <div className="h-[150px] lg:h-[200px] w-full bg-gray-100"></div>
        
        <div className="px-6 lg:px-12 -mt-20 relative pb-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-end">
            {/* Avatar Skeleton */}
            <div className="h-32 w-32 rounded-[2.5rem] bg-gray-200 border-[8px] border-white lg:h-44 lg:w-44 shadow-lg shrink-0"></div>
            
            <div className="flex flex-col flex-1 pb-6">
               <div className="h-10 w-2/3 bg-gray-200 rounded-2xl mb-4"></div>
               <div className="h-6 w-1/3 bg-gray-100 rounded-xl mb-6"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="h-14 bg-gray-50 rounded-[22px]"></div>
                  <div className="h-14 bg-gray-50 rounded-[22px]"></div>
                  <div className="h-14 bg-gray-50 rounded-[22px]"></div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Sections Skeleton */}
        <div className="px-6 py-10 lg:px-12 lg:py-12 space-y-12">
            <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-100 rounded-xl"></div>
                <div className="h-24 w-full bg-gray-50 rounded-[32px]"></div>
            </div>
            <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-100 rounded-xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-40 bg-gray-50 rounded-[30px]"></div>
                    <div className="h-40 bg-gray-50 rounded-[30px]"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export const OffersListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-40 bg-gray-50 rounded-[30px] border border-gray-100"></div>
      ))}
    </div>
  )
}
