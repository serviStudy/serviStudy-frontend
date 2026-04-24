import React from 'react'
import { HeaderLR } from './HeaderLR'
import { Loader2 } from 'lucide-react'

interface LoadingScreenProps {
  background?: string
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  background = "" 
}) => {
  return (
    <div className={`flex min-h-screen items-center justify-center ${background}`}>
      <HeaderLR />
      <Loader2 className="h-10 w-10 animate-spin text-[#1a4b9e]" />
    </div>
  )
}
