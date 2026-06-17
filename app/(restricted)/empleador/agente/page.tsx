import React from 'react';
import { AgentChat } from '@/features/ai-agent/components/AgentChat';

export const metadata = {
  title: 'Agente IA Premium - ServiStudy',
  description: 'Comunícate con tu Agente IA exclusivo para empleadores premium.',
};

export default function EmpleadorAgentePage() {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50/50">
      <AgentChat userType="employer" />
    </div>
  );
}
