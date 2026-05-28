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
        <div className="flex flex-col gap-6 w-full">
        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-200 shadow-sm py-20 px-8 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <ClipboardX className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">
                        Aún no tienes postulaciones
                    </h3>
                    <p className="text-base text-gray-500 max-w-xs mx-auto">
                        Explora las ofertas disponibles y postúlate a la que más se ajuste a ti
                    </p>
                </div>
                <Link
                    href={routes.estudiante.ofertas}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    Explorar ofertas
                </Link>
            </div>
        ) : (
            items.map((application) => (
                <Postulacion
                    key={application.jobOffer?.jobOfferId}
                    data={application}
                    onDelete={onDelete}
                />
            ))
        )}
        </div>
    );
};