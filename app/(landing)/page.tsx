"use client"

import React from "react"
import { usePersistentRole } from "@/hooks/usePersistentRole"
import { AnimatePresence } from "framer-motion"

// Sub-components
import Hero from "@/features/landing/components/Hero"
import StudentProfilePreview from "@/features/landing/components/StudentProfilePreview"
import EmployerDashboardPreview from "@/features/landing/components/EmployerDashboardPreview"

// Existing Landing Section Components
import Benefits from "@/features/landing/components/Benefits"
import { DOffers } from "@/features/landing/components/DOffers"
import { PricingSection } from "@/features/landing/components/PricingSection"
import { AIFeatures } from "@/features/landing/components/IAFeatures"

export default function Home() {
  const { tipoUsuario } = usePersistentRole()
  const isEstudiante = tipoUsuario === "estudiante"

  return (
    <div className="bg-gray-50 flex flex-col w-full items-center justify-center overflow-hidden transition-all duration-1000">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. DYNAMIC SECONDARY ROLE-SPECIFIC SECTIONS */}
      <AnimatePresence mode="wait">
        {isEstudiante ? (
          <StudentProfilePreview key="student-profile-preview" />
        ) : (
          <EmployerDashboardPreview key="employer-dashboard-preview" />
        )}
      </AnimatePresence>

      {/* 3. COMMON INTERACTIVE SECTIONS (DYNAMICALLY ACCENTED) */}
      <Benefits />
      
      <div id="ofertas" className="w-full">
        {isEstudiante ? (
          <DOffers />
        ) : (
          <div key="none" />
        )}
      </div>

      {isEstudiante ? (
        <div key="none" />
      ) : (
        <AIFeatures />
      )}
      
      <PricingSection />
    </div>
  )
}