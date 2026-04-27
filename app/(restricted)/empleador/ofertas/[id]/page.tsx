import { OfferDetailView } from "@/features/restricted/employer/jobOffer/components/detail/OfferDetailView";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <OfferDetailView id={id} />
    </div>
  );
}