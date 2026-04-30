import { useState, useRef } from 'react';
import { toast } from 'sonner';

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen es demasiado grande. Máximo 5MB.");
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return {
    imageUrl, setImageUrl,
    imageFile, setImageFile,
    fileInputRef,
    handleImageChange,
    triggerFileInput
  };
};
