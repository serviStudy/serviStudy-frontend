import { OfferList } from "@/features/restricted/employer/jobOffer/components/OfferList";
import { SelectOffer } from "@/features/selectOffersApplicants/components/SelectOffer";

export default function Page() {
    return(
        <div className="min-h-screen ">
            <SelectOffer></SelectOffer>
        </div>
    );
}