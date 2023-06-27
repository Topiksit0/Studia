import React from 'react'
import { FiFolder, FiTrello, FiBook} from "react-icons/fi";

export const ActivitiesText = ({ activitie }) => {
    return (
        <div>
            <p className='my-5 font-base'>{activitie.texto}</p>
        </div>
    )
}

export const ActivitiesLecture = ({ activitie }) => {
    return ( 
        <a href={activitie.url}>
            <div className='flex cursor-pointer mt-4 pl-4 bg-blue-100 border-blue-400 border-2 rounded py-4 pb-5'>
                <div className='bg-cyan-300 rounded shadow py-2 px-2'>
                    <FiTrello size={40} />
                </div>
                <div className='flex flex-col'>
                    <p className='font-medium text-lg ml-5'>Lecture</p>
                    <p className='font-base text-base ml-5'>{activitie.texto}</p>
                </div>

            </div>
        </a>
    )
}

export const ActivitiesFiles = ({ activitie }) => {
    return (
        <div className='flex cursor-pointer mt-4 pl-4 bg-red-100 border-red-400 border-2 rounded py-4'>
            <div className='bg-red-400 rounded shadow py-2 px-2'>
                <FiBook size={40} />
            </div>
            <div className='flex flex-col'>
                <p className='font-medium text-lg ml-5'>Files</p>
                <p className='font-base text-base ml-5'>{activitie.texto}</p>
            </div>

        </div>
    )
}

export const ActivitiesQuestionnaire = ({ activitie }) => {
    return (
        <div>Aqui hay un questionario</div>
    )
}

export const ActivitiesDelivery = ({ activitie }) => {
    return (
        <div className='flex cursor-pointer mt-4 pl-4 bg-yellow-100 border-amber-400 border-2 rounded py-4'>
            <div className='bg-amber-300 rounded shadow py-2 px-2'>
                <FiFolder size={40} />
            </div>
            <div className='flex flex-col'>
                <p className='font-medium text-lg ml-5'>Delivery</p>
                <p className='font-base text-base ml-5'>{activitie.texto}</p>
            </div>

        </div>
    )
}

export const ActivitiesPeerReview = ({ activitie }) => {
    return (
        <div className='flex cursor-pointer mt-4 pl-4 bg-red-100 border-red-400 border-2 rounded py-4'>
            <div className='bg-red-400 rounded shadow py-2 px-2'>
                <FiBook size={40} />
            </div>
            <div className='flex flex-col'>
                <p className='font-medium text-lg ml-5'>Peer Review</p>
                <p className='font-base text-base ml-5'>{activitie.texto}</p>
            </div>

        </div>
    )
}
