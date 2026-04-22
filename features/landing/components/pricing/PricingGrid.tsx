import { motion, AnimatePresence } from "framer-motion";
import { PriceCard } from "../PriceCard";
import { PricingPlan } from "../../constants/pricing";
import { cn } from "@/lib/utils";

interface PricingGridProps {
  plans: PricingPlan[];
  activeType: "estudiante" | "empresa";
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
};

export function PricingGrid({ plans, activeType }: PricingGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeType}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
        className={cn(
          "hidden md:grid gap-8 items-stretch pt-4",
          activeType === "empresa" ? "grid-cols-3" : "grid-cols-2 max-w-4xl mx-auto"
        )}
      >
        {plans.map((plan, index) => (
          <motion.div key={index} variants={itemVariants} className="h-full">
            <PriceCard {...plan} type={activeType} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
