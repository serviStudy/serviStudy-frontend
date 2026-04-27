import { getEmployerOfferById } from "@/features/restricted/employer/jobOffer/service/jobOffer.service";
import { SelectOfferCard } from "@/features/selectOffersApplicants/components/selectOfferCard";

interface PageProps {
    params: {
        id: string;
    }
}

export default async function Page({ params }: PageProps) {
    const id =  params.id;

    const offer = await getEmployerOfferById(id)
    return (
        <div className="min-h-screen">
        <SelectOfferCard offer={offer} />
        </div>
    );
}