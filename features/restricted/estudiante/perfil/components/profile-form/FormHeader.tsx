import React from 'react';
import { Camera } from 'lucide-react';

interface FormHeaderProps {
  formData: {
    imageUrl: string | null;
  };
  actions: {
    triggerFileInput: () => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  refs: {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
  };
  inicial: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  formData,
  actions,
  refs,
  inicial
}) => {
  return (
    <>
      <div className="w-full bg-linear-to-br from-blue-900 via-blue-700 to-blue-600 h-28 md:h-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0id2hpdGUiIC8+PC9zdmc+')]"></div>
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 md:px-12">
        <div className="flex flex-col items-center -mt-16 md:-mt-28 mb-8 md:mb-10">
          <div className="relative group">
            <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center overflow-hidden rounded-xl border-[6px] border-white bg-gray-50 text-5xl md:text-7xl font-bold text-blue-600 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
              ) : (
                inicial
              )}
            </div>
            <button
              type="button"
              className="absolute -bottom-3 -right-3 h-8 w-8 md:h-10 md:w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-all duration-300 hover:scale-110 border-[4px] md:border-[6px] border-white z-20"
              onClick={actions.triggerFileInput}
            >
              <Camera className="h-4 w-4" strokeWidth={2.2} />
            </button>
            <input
              type="file"
              ref={refs.fileInputRef}
              onChange={actions.handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};
