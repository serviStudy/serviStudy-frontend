import { OfferDetailPostulation } from "@/features/postPostularse/components/OfferDetailPostulation";
export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen w-full">
            <OfferDetailPostulation id={id}/>
        </div>
    );
}
