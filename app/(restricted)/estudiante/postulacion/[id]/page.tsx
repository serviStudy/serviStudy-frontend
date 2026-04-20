import { HeaderStudent } from "@/components/shared/HeaderStudent";
import { ApplyButton } from "@/features/postulacionEstudiante/components/ApplyButton";
import { OfferDetailPostulation } from "@/features/postulacionEstudiante/components/OfferDetailPostulation";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderStudent name={""}></HeaderStudent>
            <OfferDetailPostulation id={id}/>
        </div>
    );
}
