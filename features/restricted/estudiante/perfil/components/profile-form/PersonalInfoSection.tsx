import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    contactNumber: string;
  };
  setters: {
    setName: (val: string) => void;
    setContactNumber: (val: string) => void;
  };
  errors: Record<string, string>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  setters,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-500 ml-1">Nombre completo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setters.setName(e.target.value)}
          placeholder="Tu nombre completo"
          className="rounded-lg border border-gray-100 bg-white h-11 text-sm font-medium text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:border-blue-600/50 transition-all placeholder:text-gray-300"
        />
        {errors.name && <p className="text-red-500 text-xs font-medium ml-1">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactNumber" className="text-sm font-medium text-gray-500 ml-1">Número de contacto</Label>
        <Input
          id="contactNumber"
          value={formData.contactNumber}
          onChange={(e) => setters.setContactNumber(e.target.value)}
          placeholder="Ej: 3123456789"
          className="rounded-lg border border-gray-100 bg-white h-11 text-sm font-medium text-gray-700 focus-visible:ring-2 focus-visible:ring-blue-600/10 focus-visible:border-blue-600/50 transition-all placeholder:text-gray-300"
        />
        {errors.phone && <p className="text-red-500 text-xs font-medium ml-1">{errors.phone}</p>}
      </div>
    </div>
  );
};
