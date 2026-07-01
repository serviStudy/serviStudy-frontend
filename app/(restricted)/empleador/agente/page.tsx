import React from 'react';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { AgentChat } from '@/features/ai-agent/components/AgentChat';

export const metadata = {
  title: 'Turnito - Agente IA | ServiStudy',
  description: 'Chatea con Turnito, tu asistente IA personal de ServiStudy.',
};

interface PageProps {
  searchParams: Promise<{ isNew?: string }>;
}

export default async function EmpleadorAgentePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isNewUser = params?.isNew === 'true';

  // Leer subscriptionStatus del JWT
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let subscriptionStatus: 'ACTIVE' | 'INACTIVE' = 'INACTIVE';

  if (token) {
    try {
      const decoded = decodeJwt(token) as any;
      if (decoded.subscriptionStatus === 'ACTIVE') subscriptionStatus = 'ACTIVE';
    } catch {}
  }

  return (
    <div className="h-[calc(100svh-5rem)] md:h-[calc(100svh-2rem)]">
      <AgentChat
        userType="employer"
        subscriptionStatus={subscriptionStatus}
        isNewUser={isNewUser}
      />
    </div>
  );
}
