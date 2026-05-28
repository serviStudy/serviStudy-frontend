import { CircleDollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Offer } from "@/features/restricted/estudiante/postPostularse/types/offer";
import { ConvertJornadaTags } from "../hooks/ConvertJornadaTags";
import { ConvertWorkDayTags } from "../hooks/ConvertWorkDayTags";

const AVATAR_PALETTES = [
    "bg-emerald-300",
    "bg-violet-300",
    "bg-blue-300",
    "bg-amber-300",
    "bg-rose-300",
    "bg-cyan-300",
] as const;

function avatarColor(title: string) {
    const code = title?.charCodeAt(0) ?? 0;
    return AVATAR_PALETTES[code % AVATAR_PALETTES.length];
}

type Props = {
    offer: Offer;
};

export function MobileOfferCard({ offer }: Props) {
    const dayTags = ConvertWorkDayTags(offer.workDays);
    const jornadaTag = ConvertJornadaTags(offer.workSchedule);
    const isRemote = /remoto/i.test(`${offer.address} ${offer.description ?? ""}`);

    return (
        <Link
            href={`/estudiante/postulacion/${offer.id}`}
            className="flex gap-3 rounded-2xl border bg-white border-gray-100 p-4 shadow-sm transition-shadow active:shadow-md"
        >
            {offer.imageUrl ? (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <Image
                        src={offer.imageUrl}
                        alt={offer.title}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain p-1"
                    />
                </div>
            ) : (
                <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold uppercase text-white ${avatarColor(offer.title)}`}
                >
                    {offer.title?.charAt(0) || "?"}
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="truncate text-base font-bold capitalize text-blue-900">
                    {offer.title}
                </h3>

                <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                        {jornadaTag}
                    </span>
                    {isRemote && (
                        <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                            Remoto
                        </span>
                    )}
                    {dayTags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2.5} />
                    <span className="truncate text-xs font-medium capitalize">{offer.address}</span>
                </div>

                <div className="flex w-fit items-center gap-1 rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1">
                    <CircleDollarSign className="h-3.5 w-3.5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-700">
                        ${Number(offer.salary).toLocaleString("es-CO")}
                    </span>
                </div>
            </div>
        </Link>
    );
}
