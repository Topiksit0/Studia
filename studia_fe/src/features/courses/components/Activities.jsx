import React from 'react'
import { useState, useEffect } from 'react';
import { FiFolder, FiTrello, FiBook, FiCheckCircle } from "react-icons/fi";


const convertStringToDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(year, month - 1, day);
};


export const ActivitiesText = ({ activitie }) => {
    return (
        <div>
            <p className='my-5 font-base'>{activitie.texto}</p>
        </div>
    )
}

export const ActivitiesLecture = ({ activitie }) => {
    console.log(activitie)
    return (
        <a href={activitie.url}>
            <div className='cursor-pointer pl-5 pt-3 rounded py-4 border-t-8 border-blue-800 border bg-white'>
                <div className='flex items-center'>
                    <p className='font-base text-lg '>Lecture</p>
                    {activitie.completed === 'true' ? <p className='text-black font-medium text-xl ml-auto mr-5'> <FiCheckCircle size={22} /></p> : <p className='text-black font-medium ml-auto mr-5'>⭕</p>}
                </div>
                <div className='flex mt-5 items-center pb-3 '>
                    <FiBook size={35} />
                    <p className='font-medium text-lg ml-5 text-'>{activitie.texto}</p>
                </div>
            </div>
        </a>
    )
}

export const ActivitiesQuestionnaire = ({ activitie }) => {
    return (
        <div className='flex justify-center'>
            <div dangerouslySetInnerHTML={{ __html: activitie.htmlcode }}></div>
        </div>
    )
}

export const ActivitiesDelivery = ({ activitie }) => {
    const currentDate = new Date();
    const deliveryDate = convertStringToDate(activitie.fecha_fin_entrega);
    const isPastDue = deliveryDate > currentDate;

    const [backgroundColorClass, setBackgroundColorClass] = useState('');

    useEffect(() => {
        if (isPastDue) {
            setBackgroundColorClass('bg-green-700');
        } else {
            setBackgroundColorClass('bg-red-700');
        }
    }, [isPastDue]);


    return (
        <div className='cursor-pointer pl-5 pt-3 rounded py-4 border-t-8 border-blue-800 border bg-white'>
            <div className='flex items-center'>
                <p className='font-base text-lg '>Delivery</p>
                {activitie.completed === 'true' ? <p className='text-black font-medium text-xl ml-auto mr-5'> <FiCheckCircle size={22} /></p> : <p className='text-black font-medium ml-auto mr-5'>⭕</p>}
            </div>

            <div className='flex mt-5 items-center pb-3 '>
                <FiFolder size={35} />
                <p className='font-medium text-lg ml-5 text-'>{activitie.texto}</p>
                <div className={`ml-auto rounded flex space-x-2 mr-5 items-center`}>
                    {activitie.evaluated === 'true' ? <p className='text-gray-500 font-medium text-sm ml-auto mr-5 italic '> Evaluated</p> : null}
                    <p className={`text-white font-medium ${backgroundColorClass} p-1 rounded`}>{activitie.fecha_fin_entrega}</p>
                </div>
                <p></p>
            </div>
        </div>
    )
}

export const ActivitiesPeerReview = ({ activitie }) => {

    const currentDate = new Date();
    const deliveryDate = convertStringToDate(activitie.fecha_fin_entrega);
    const isPastDue = deliveryDate > currentDate;

    const [backgroundColorClass, setBackgroundColorClass] = useState('');

    useEffect(() => {
        if (isPastDue) {
            setBackgroundColorClass('bg-green-700');
        } else {
            setBackgroundColorClass('bg-red-700');
        }
    }, [isPastDue]);

    return (
        <div className='cursor-pointer pl-5 pt-3 rounded py-4 border-t-8 border-blue-800 border bg-white'>
            <div className='flex items-center'>
                <p className='font-base text-lg '>Peer Review</p>
                {activitie.completed === 'true' ? <p className='text-black font-medium text-xl ml-auto mr-5'> <FiCheckCircle size={22} /></p> : <p className='text-black font-medium ml-auto mr-5'>⭕</p>}
            </div>

            <div className='flex mt-5 items-center pb-3 '>
                <FiBook size={35} />
                <p className='font-medium text-lg ml-5 text-'>{activitie.texto}</p>
                <div className={`ml-auto rounded flex space-x-2 mr-5 items-center`}>
                    {activitie.evaluated === 'true' ? <p className='text-gray-500 font-medium text-sm ml-auto mr-5 italic '> Evaluated</p> : null}
                    <p className={`text-white font-medium ${backgroundColorClass} p-1 rounded`}>{activitie.fecha_fin_entrega}</p>
                </div>
                <p></p>
            </div>
        </div>
    )
}
