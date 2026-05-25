import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface FormActionsProps {
  saving: boolean;
  actions: {
    handleSave: () => void;
  };
  isPremium?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  saving,
  actions,
  isPremium
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
        className={`${isPremium ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-md shadow-blue-500/20 hover:opacity-90 hover:from-green-400 hover:to-blue-500" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"} font-semibold px-6 rounded-lg transition-all active:scale-95`}
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
