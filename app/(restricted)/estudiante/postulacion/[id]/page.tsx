import { OfferDetailPostulation } from "@/features/restricted/estudiante/postPostularse/components/OfferDetailPostulation";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen w-full">
            <OfferDetailPostulation id={id}/>
        </div>
    );
}
