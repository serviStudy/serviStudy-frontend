"use client"

import { usePathname } from 'next/navigation'
import { HeaderStudent } from '@/components/shared/HeaderStudent'

export function RestrictedHeader({ name }: { name: string }) {
  const pathname = usePathname()
  const isEmployerRoute = pathname.includes('/empleador')

  if (isEmployerRoute) return null

  return <HeaderStudent name={name} />
}
