"use client"
import { HeaderStudent } from '@/components/shared/HeaderStudent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { StudentSkill } from '@/features/restricted/estudiante/components/StudentSkill'
import { TagGroup } from '@/features/restricted/estudiante/components/TagGroup'
import { tagDays } from '@/features/restricted/estudiante/data/tagDays'
import { tagJornada } from '@/features/restricted/estudiante/data/tagJornada'
import { useTagSelection } from '@/features/restricted/estudiante/hooks/useTagSelection'
import { Camera, PlusCircle } from 'lucide-react'
import { TagManager } from '@/features/restricted/estudiante/components/TagManager'
import React from 'react'
import { useEditProfileForm } from '@/features/restricted/estudiante/hooks/useEditProfileForm'


const page = () => {
    const { selection, toggleTag } = useTagSelection()

    const {
        formData,
        handleChange,
        handleCancel,
        handleSubmit,
        skills,
        setSkills,
        errors
    } = useEditProfileForm(selection)

    return (
        <div className="flex flex-col gap-9 min-h-[90vh] items-center bg-destructive top-60 pt-14 md:pt-18 lg:pt-18 lg:pb-12">
            <HeaderStudent/>
            
            <div className="bg-white rounded-[9px] min-w-20 mx-0 md:min-w-160 md:max-w-300 md:h-auto lg:w-228 lg:h-auto lg:rounded-[14px]">
                <div className="relative bg-popover w-auto h-20 rounded-t-[9px] p-8 md:w-max-w-300 md:h-28 lg:justify-start lg:w-228 lg:h-44 lg:rounded-t-[9px]">

                    {/* foto de perfil */}
                    <div className='absolute top-12 md:top-18 lg:top-30'>
                        <div className='relative'>
                            <div className='absolute'>
                                <div className='bg-primary flex items-center justify-center border-3 border-white rounded-full h-15 w-15 md:w-21 md:h-21 lg:w-28 lg:h-28'/>
                            </div>                        
                            <div className='absolute left-10 top-8 md:left-16 md:top-12 lg:left-20 lg:top-18'>
                                <button className='bg-white rounded-full border p-1 md:p-1.25 lg:p-2 border-gray-400'>
                                    <Camera className='text-gray-500 h-2.5 w-2.5 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4'></Camera>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* información personal */}
                <div className='px-8 py-10 flex flex-col gap-2.5 md:gap-4.5 md:py-14 lg:px-12 lg:pt-20'>
                    <form action="" className='flex flex-col gap-2 md:gap-3.5 lg:gap-6'>
                        <div className='flex flex-col gap-2.5 md:flex-row'>
                            
                            <label className="text-[12px] flex flex-col md:text-[14px] lg:text-[17px] font-bold text-gray-500">
                                Nombre del estudiante
                                <Input className="text-[12px] md:text-[14px] lg:text-sm lg:w-115 font-normal rounded-[15px] h-5 lg:h-9 border- border-gray-400"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                />
                                {errors.name && <span className='text-[12px] font-semibold text-red-700'>{errors.name}</span>}
                            </label>

                            <label className="text-[12px] md:text-[14px] lg:text-[17px] font-bold text-gray-500">
                                Número de contacto
                                <Input className="text-[12px] md:text-[14px] lg:text-sm lg:w-full font-normal rounded-[15px] h-5 lg:h-9 border border-gray-400"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                />
                                {errors.phone && <span className='text-[12px] font-semibold text-red-700'>{errors.phone}</span>}
                            </label>
                        </div>

                        <label className="text-[12px] md:text-[14px] lg:text-[17px] lg:flex lg:flex-col font-bold text-gray-500">
                            Descripción del perfil
                            <Textarea className="text-[12px] md:text-[14px] lg:text-sm lg:w-full field-sizing-content md:field-sizing-content md:min-h-30 md:max-h-30! lg:max-h-70 font-normal rounded-[15px] min-h-10 lg:h-14 border border-gray-400"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            />
                            {errors.description && <span className='text-[12px] font-semibold text-red-700'>{errors.description}</span>}
                        </label>
                    </form>

                    <div className='flex flex-col gap-2 md:gap-5 md:flex-row md:justify-between md:w-full'>
                        <div>
                            <p className="text-[12px] md:text-[14px] lg:text-[17px] lg:flex lg:flex-col font-bold text-gray-500">Días laborales</p>
                            <TagGroup 
                                tags={tagDays}
                                selection={selection.day}
                                onToggle={(tag) => toggleTag('day', tag)}
                                variant={'day'}                             
                            />
                            {errors.days && <span className='text-[12px] font-semibold text-red-700'>{errors.days}</span>}
                        </div>

                        <div>
                            <p className="text-[12px] md:text-[14px] lg:text-[17px] lg:flex lg:flex-col font-bold text-gray-500">Jornada</p>
                            <TagGroup 
                                tags={tagJornada} 
                                selection={selection.jornada} 
                                onToggle={(tag) => toggleTag('jornada', tag)}
                                variant={'jornada'}                               
                            />
                            {errors.jornada && <span className='text-[12px] font-semibold text-red-700'>{errors.jornada}</span>}
                        </div>
                    </div>

                    {/* input de skillsStudent */}
                    <div className='flex flex-col w-220 justify-between'>
                        <TagManager skills={skills} setSkills={setSkills} />
                        {errors.skills && <span className="text-red-700 font-semibold text-[11px] md:text-[12px]">{errors.skills}</span>}
                    </div>

                    {/* botones del form */}
                    <div className='flex gap-3 md:gap-4 left-48'>
                        <Button variant={'cancelEditProfile'} size={'buttonEditProfile'} onClick={handleCancel}>Cancelar</Button>
                        <Button variant={'keepChangesEditProfile'} size={'buttonEditProfile'} onClick={handleSubmit}>Guardar Cambios</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page