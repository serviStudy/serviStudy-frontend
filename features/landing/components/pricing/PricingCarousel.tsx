import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PriceCard } from "../PriceCard";
import { PricingPlan } from "../../constants/pricing";
import { motion } from "framer-motion";

interface PricingCarouselProps {
  plans: PricingPlan[];
  activeType: "estudiante" | "empresa";
  onSelectPlan?: (plan: PricingPlan) => void;
}

export function PricingCarousel({ plans, activeType, onSelectPlan }: PricingCarouselProps) {
  return (
    <div className="md:hidden">
      <Carousel className="w-full">
        <CarouselContent className="px-4">
          {plans.map((plan, index) => (
            <CarouselItem key={`${activeType}-${index}`} className="pl-4 basis-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <PriceCard 
                  {...plan} 
                  type={activeType} 
                  onSelect={() => onSelectPlan && onSelectPlan(plan)}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-12">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 border-blue-100 text-blue-600" />
          <CarouselNext className="static translate-y-0 h-10 w-10 border-blue-100 text-blue-600" />
        </div>
      </Carousel>
    </div>
  );
}
