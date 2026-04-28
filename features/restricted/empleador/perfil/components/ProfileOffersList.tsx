"use client";
import { useJobOffers } from "@/features/restricted/empleador/jobOffer/hooks/useJobOffers";
import { ProfileOfferCard } from "@/features/restricted/empleador/jobOffer/components/ProfileOfferCard";
import { OffersListSkeleton } from "./ProfileSkeletons";

interface ProfileOffersListProps {
  imageUrl?: string;
  businessName?: string;
}

export const ProfileOffersList = ({ imageUrl, businessName }: ProfileOffersListProps) => {
  const { offers, loading, refresh } = useJobOffers();

  if (loading) return <OffersListSkeleton />;

  const activeOffers = offers.filter(o => o.status !== "DELETED");

  if (!activeOffers || activeOffers.length === 0) {
    return <p className="text-sm text-gray-400 italic">Aún no tienes ofertas publicadas.</p>;
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8 pb-10">
      {activeOffers.map(offer => {
        const offerId = offer.jobOfferId || offer.id || (offer as any).idJobOffer;
        return (
          <ProfileOfferCard 
            key={offerId} 
            offer={offer} 
            imageUrl={imageUrl} 
            businessName={businessName}
            onStatusChange={refresh}
          />
        );
      })}
    </div>
  );
};
