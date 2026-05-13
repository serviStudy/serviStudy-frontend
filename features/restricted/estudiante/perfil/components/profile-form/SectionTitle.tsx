import React from 'react';

export const SectionTitle = ({ title, icon: Icon }: { title: string; icon?: any }) => (
  <div className="flex items-center gap-3 mb-6">
    {Icon && <Icon className="w-5 h-5 text-blue-600" />}
    <h3 className="text-lg font-bold text-blue-900">
      {title}
    </h3>
  </div>
);
