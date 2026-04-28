import { routes } from '@/type/routes';
import { ClipboardX } from 'lucide-react';
import Link from 'next/link';
import { ApplicationItem } from '../types/applicationTypes';
import { Postulacion } from './Postulacion';

interface Props {
    items: ApplicationItem[];
    onDelete: (jobOfferId: string) => void;
}

export const ListPostulaciones = ({ items, onDelete }: Props) => {
    return (
        <div className="flex flex-col gap-4 w-full">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm py-20 px-8 gap-5">
                <div className="bg-blue-50 p-5 rounded-2xl">
                    <ClipboardX className="h-10 w-10 text-[#2552d0]" />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Aún no tienes postulaciones
                    </h3>
                    <p className="text-sm text-gray-500">
                        Explora las ofertas disponibles y postúlate a la que más se ajuste a ti
                    </p>
                </div>
                <Link
                    href={routes.estudiante.ofertas}
                    className="px-7 py-2.5 bg-[#2552d0] hover:bg-blue-800 text-white text-sm font-semibold rounded-2xl transition-all shadow-md shadow-blue-900/20"
                >
                    Explorar ofertas
                </Link>
            </div>
        ) : (
            items.map((application) => (
                <Postulacion
                    key={application.jobOffer.jobOfferId}
                    data={application}
                    onDelete={onDelete}
                />
            ))
        )}
        </div>
    );
};