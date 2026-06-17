import React from 'react';
import { AgentChat } from '@/features/ai-agent/components/AgentChat';

export const metadata = {
  title: 'Agente IA Premium - ServiStudy',
  description: 'Comunícate con tu Agente IA exclusivo para estudiantes premium.',
};

export default function EstudianteAgentePage() {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50/50">
      <AgentChat userType="student" />
    </div>
  );
}
