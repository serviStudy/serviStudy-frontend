import { OfferDetailView } from "@/features/restricted/employer/jobOffer/components/detail/OfferDetailView";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-white">
      <OfferDetailView id={id} />
    </div>
  );
}
