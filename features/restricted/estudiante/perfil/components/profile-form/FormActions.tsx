import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface FormActionsProps {
  saving: boolean;
  actions: {
    handleSave: () => void;
  };
}

export const FormActions: React.FC<FormActionsProps> = ({
  saving,
  actions
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="ghost"
        className="bg-blue-100/50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-semibold px-6 rounded-lg transition-all"
        onClick={() => router.back()}
        disabled={saving}
      >
        Cancelar
      </Button>
      <Button
        className="bg-blue-600 text-white font-semibold px-6 rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
        onClick={actions.handleSave}
        disabled={saving}
      >
        {saving ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Guardando...
          </span>
        ) : "Guardar cambios"}
      </Button>
    </div>
  );
};
