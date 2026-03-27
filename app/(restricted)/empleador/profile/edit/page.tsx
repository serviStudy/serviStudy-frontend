"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeaderLR } from '@/components/shared/HeaderLR'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Camera, MapPin, Pencil, Trash2, CircleDollarSign, ChevronLeft } from "lucide-react"

// Datos de ejemplo para ilustración
const MOCK_JOBS = [
  {
    id: 1,
    title: "Recepcionista nocturno",
    isActive: true,
    location: "portal del quindio",
    salary: "1.600.000"
  },
  {
    id: 2,
    title: "Programador Front",
    isActive: false,
    location: "portal del quindio",
    salary: "1.600.000"
  },
  {
    id: 3,
    title: "Recepcionista nocturno",
    isActive: true,
    location: "portal del quindio",
    salary: "1.600.000"
  },
  {
    id: 4,
    title: "Programador Front",
    isActive: false,
    location: "portal del quindio",
    salary: "1.600.000"
  }
]

export default function EditProfilePage() {
  const router = useRouter()

  // Initial state (could be fetched from an API in a real app)
  const [nombre, setNombre] = useState('Carlos Guerra Morales')
  const [telefono, setTelefono] = useState('315-887-9086')
  const [empresa, setEmpresa] = useState('Tech Solutions')
  const [direccion, setDireccion] = useState('Plaza de bolívar')
  const [descripcion, setDescripcion] = useState('Tech Solutions es una empresa dedicada al desarrollo e implementación de soluciones tecnológicas innovadoras, orientadas a optimizar procesos y mejorar la eficiencia de organizaciones de diferentes sectores.')

  const handleSave = () => {
    // Save to localStorage so it can be picked up by the profile page
    const profileData = {
      nombre,
      telefono,
      empresa,
      direccion,
      descripcion
    }
    localStorage.setItem('employer_profile', JSON.stringify(profileData))
    
    toast.success('Perfil actualizado correctamente')
    router.push('/empleador/profile')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-20">
      <HeaderLR />

      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="mb-6 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-[#1a4b9e]"
            onClick={handleCancel}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver al perfil
          </Button>
          <h1 className="text-2xl font-bold text-[#1a4b9e]">Editar Perfil</h1>
        </div>

        <Card className="overflow-hidden border-none shadow-md rounded-[24px]">
          {/* Área del Banner */}
          <div className="h-[120px] w-full bg-[#e8fbe5] lg:h-[160px] relative" />

          <CardContent className="px-6 pb-10 lg:px-10">
            {/* Avatar overlapping banner */}
            <div className="relative -mt-12 mb-8 inline-block">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#34c759] text-[40px] font-bold text-white shadow-sm">
                {empresa.charAt(0).toUpperCase()}
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-gray-50 border border-gray-100"
              >
                <Camera className="h-4 w-4 text-[#34c759]" strokeWidth={2.5} />
              </Button>
            </div>

            {/* Campos del Formulario */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-[14px] font-bold text-gray-500">Nombre Empleador</Label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Carlos Guerra Morales"
                  className="rounded-[12px] border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-[14px] font-bold text-gray-500">Número de contacto</Label>
                <Input
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: 315-887-9086"
                  className="rounded-[12px] border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa" className="text-[14px] font-bold text-gray-500">Nombre del establecimiento</Label>
                <Input
                  id="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Ej: Tech Solutions"
                  className="rounded-[12px] border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="direccion" className="text-[14px] font-bold text-gray-500">Dirección del establecimiento</Label>
                <Input
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Plaza de bolívar"
                  className="rounded-[12px] border-gray-300 focus-visible:ring-[#1a4b9e]"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="descripcion" className="text-[14px] font-bold text-gray-500">Resumen profesional</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe brevemente tu empresa o establecimiento..."
                className="min-h-[120px] rounded-[12px] border-gray-300 focus-visible:ring-[#1a4b9e]"
              />
            </div>

            {/* Sección de Ofertas de Trabajo */}
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-bold text-[#1a4b9e]">Ofertas de trabajo disponibles</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {MOCK_JOBS.map((job) => (
                  <Card key={job.id} className="border border-gray-200 bg-white p-4 shadow-none rounded-[16px] hover:border-gray-300 transition-colors">
                    <div className="flex gap-3">
                      <div className="h-12 w-12 shrink-0 rounded bg-gray-200 flex items-center justify-center">
                        <CircleDollarSign className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <h5 className="text-[14px] font-bold leading-tight text-[#1a4b9e] line-clamp-2">{job.title}</h5>
                          <div className="flex items-center gap-1.5 ml-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-end">
                          <div className={`flex items-center justify-between h-[18px] rounded-full px-2 ${job.isActive ? 'bg-[#34c759]' : 'bg-[#ff9500]'}`}>
                            <span className="text-[9px] font-bold text-white pr-2">{job.isActive ? 'Activa' : 'Desactivada'}</span>
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#1a4b9e]">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-500" strokeWidth={2.5} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <CircleDollarSign className="h-3.5 w-3.5 text-gray-500" strokeWidth={2.5} />
                        <span className="text-gray-500">{job.salary}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="w-full sm:w-[160px] rounded-[12px] border-none bg-gray-200 text-gray-600 font-bold hover:bg-gray-300"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                className="w-full sm:w-[200px] rounded-[12px] bg-[#1a4b9e] text-white font-bold hover:bg-blue-800"
                onClick={handleSave}
              >
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
