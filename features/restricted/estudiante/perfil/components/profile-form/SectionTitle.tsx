import React from 'react';

export const SectionTitle = ({ title, icon: Icon }: { title: string; icon?: any }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
    <h3 className="text-lg md:text-xl font-semibold text-blue-900 flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 text-blue-600/60" />}
      {title}
    </h3>
  </div>
);
