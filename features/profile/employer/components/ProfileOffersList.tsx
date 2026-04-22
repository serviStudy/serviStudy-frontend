"use client";
import { useJobOffers } from "@/features/restricted/employer/jobOffer/hooks/useJobOffers";
import { ProfileOfferCard } from "@/features/restricted/employer/jobOffer/components/ProfileOfferCard";

interface ProfileOffersListProps {
  imageUrl?: string;
  businessName?: string;
}

export const ProfileOffersList = ({ imageUrl, businessName }: ProfileOffersListProps) => {
  const { offers, loading } = useJobOffers();

  if (loading) return <p className="text-sm text-gray-400 italic">Cargando ofertas...</p>;

  const activeOffers = offers.filter(o => o.status !== "DELETED");

  if (!activeOffers || activeOffers.length === 0) {
    return <p className="text-sm text-gray-400 italic">Aún no tienes ofertas publicadas.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 pb-10">
      {activeOffers.map(offer => {
        const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;
        return (
          <ProfileOfferCard 
            key={offerId} 
            offer={offer} 
            imageUrl={imageUrl} 
            businessName={businessName}
          />
        );
      })}
    </div>
  );
};
