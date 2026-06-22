"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect } from "react"

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  autoCloseDuration?: number;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  title = "¡Éxito!",
  message = "Cambios guardados exitosamente.",
  autoCloseDuration = 1500
}: SuccessModalProps) => {

  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-100 overflow-hidden rounded-[28px] bg-white text-center p-8 border-none shadow-2xl outline-none flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        
        {/* Animated Checkmark Circle */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Pulsing glow background */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute w-28 h-28 bg-green-100 rounded-full"
          />
          
          {/* Main green circle */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-600/20 z-10"
          >
            {/* Animated Checkmark Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
            >
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        <div className="space-y-2 z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-black text-gray-900 tracking-tight"
          >
            {title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-sm font-semibold leading-relaxed"
          >
            {message}
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
