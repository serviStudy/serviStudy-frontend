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
    <div className="flex flex-col items-center mb-8">
      <div className="relative group">
        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-[6px] border-white bg-gray-50 text-5xl font-bold text-blue-600 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
          {formData.imageUrl ? (
            <img src={formData.imageUrl} alt="Perfil" className="h-full w-full object-cover" />
          ) : (
            inicial
          )}
        </div>
        <button
          type="button"
          className="absolute bottom-1 right-1 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-all duration-300 border-[3px] border-white z-20"
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
  );
};
