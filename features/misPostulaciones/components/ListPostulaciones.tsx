import { applicationCardsMock } from '../mocks/applicationCards.mock'
import { Postulacion } from './Postulacion'

export const ListPostulaciones = () => {
    return (
        <div className='flex flex-col w-full justify-between items-center gap-6'>
            {applicationCardsMock.map((card) => (
                <Postulacion
                    key={card.applicationId}
                    data={card}
                />
            ))}
        </div>
    )
}