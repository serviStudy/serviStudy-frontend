import { HeaderStudent } from "@/components/shared/HeaderStudent";
import { OfferDetailPostulation } from "@/features/postulacionEstudiante/components/OfferDetailPostulation";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen w-full">
            <OfferDetailPostulation id={id}/>
        </div>
    );
}
