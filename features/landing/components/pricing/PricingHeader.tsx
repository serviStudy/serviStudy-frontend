import { motion } from "framer-motion";

export function PricingHeader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-black text-blue-950 tracking-tight"
      >
        Nuestros <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500">Planes Premium</span>
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-500 font-bold text-lg max-w-2xl opacity-80"
      >
        Desbloquea el máximo potencial de ServiStudy con nuestras herramientas avanzadas de IA.
      </motion.p>
    </div>
  );
}
