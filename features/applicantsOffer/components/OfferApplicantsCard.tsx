import { JobOfferDTO } from "@/features/restricted/employer/jobOffer/types/jobOffer.types";


interface Props {
    offer: JobOfferDTO;
    imageUrl?: string;
    onRefresh?: () => void;
}

export const OfferApplicantsCard = ({ offer, imageUrl, onRefresh }: Props) => {
    return (
        <div className="w-[calc(100vw-288px)] flex justify-center">
            
            <div className="flex flex-col gap-3 w-28 h-28 sm:w-[180px] sm:h-[180px] shrink-0 relative">
                <div className="w-full h-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100 flex items-center justify-center shadow-inner group-hover:rotate-1 transition-transform duration-500">
                {imageUrl ? (
                    <img src={imageUrl} alt="Establecimiento" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#28a745] to-[#1e7e34] flex items-center justify-center text-white text-3xl sm:text-[64px] font-black shadow-lg">
                    {offer.title ? offer.title.charAt(0).toUpperCase() : "E"}
                    </div>
                )}
                </div>
            </div>

        </div>
    )
}
