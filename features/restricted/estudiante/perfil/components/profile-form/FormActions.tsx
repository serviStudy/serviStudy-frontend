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
    <div className="mt-16 pt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-6 border-t border-gray-100">
      <button
        type="button"
        className="w-full sm:w-auto px-8 py-3 text-gray-400 font-bold text-sm tracking-widest uppercase hover:text-gray-600 transition-all"
        onClick={() => router.back()}
        disabled={saving}
      >
        Cancelar
      </button>
      <Button
        className="w-full sm:w-auto px-8 h-14 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-sm active:scale-95"
        onClick={actions.handleSave}
        disabled={saving}
      >
        {saving ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Guardando...
          </span>
        ) : "Guardar Cambios"}
      </Button>
    </div>
  );
};
