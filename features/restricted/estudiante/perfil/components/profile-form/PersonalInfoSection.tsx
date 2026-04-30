import React from 'react';
import { User, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SectionTitle } from './SectionTitle';

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
    <section>
      <SectionTitle title="Información Personal" icon={User} />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-2.5">
          <Label htmlFor="name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Nombre Completo</Label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setters.setName(e.target.value)}
              placeholder="Tu nombre completo"
              className="pl-12 rounded-xl border border-gray-100 bg-gray-50/50 h-14 text-sm md:text-base font-medium text-gray-700 focus-visible:ring-4 focus-visible:ring-blue-600/5 focus-visible:border-blue-600/20 transition-all placeholder:text-gray-300"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs font-medium ml-1">{errors.name}</p>}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="contactNumber" className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Teléfono de Contacto</Label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => setters.setContactNumber(e.target.value)}
              placeholder="Ej: 315-887-9086"
              className="pl-12 rounded-xl border border-gray-100 bg-gray-50/50 h-14 text-sm md:text-base font-medium text-gray-700 focus-visible:ring-4 focus-visible:ring-blue-600/5 focus-visible:border-blue-600/20 transition-all placeholder:text-gray-300"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs font-medium ml-1">{errors.phone}</p>}
        </div>
      </div>
    </section>
  );
};
