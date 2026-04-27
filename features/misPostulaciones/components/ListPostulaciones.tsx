import { ApplicationPageResponse } from '../types/applicationTypes';
import { Postulacion } from './Postulacion';

interface Props {
    data: ApplicationPageResponse;
}

export const ListPostulaciones = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-4 w-auto">
        {data.content.length === 0 ? (
            <div className="flex items-center justify-center rounded-[21px] min-w-138 bg-white/30 backdrop-blur-md min-h-75">
                <div className="text-center px-6">
                    <h3 className="text-lg font-semibold text-gray-500">
                    No se encontraron postulaciones
                    </h3>
                </div>
            </div>
        ) : (
            data.content.map((application) => (
                <Postulacion
                    key={application.jobOffer.jobOfferId}
                    data={application}
                />
            ))
        )}
        </div>
    );
};