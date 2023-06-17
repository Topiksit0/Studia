import React from 'react'
import { Link } from 'react-router-dom';

import {
    FiCalendar,
    FiUsers,
    FiClock,
} from "react-icons/fi";

export const CalendarButtonHandler = () => {
    return (

        <Link to={"/app/events/calendar"}>
            <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                <h1 className='text-base mr-3'>Calendar</h1>
                <FiCalendar className='ml-auto' />
            </div>
        </Link>
    )
}

export const NewsButtonHandler = () => {
    return (
        <Link to={"/app/events/news"}>
            <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                <h1 className='text-base mr-3'>News</h1>
                <FiUsers className='ml-auto' />
            </div>
        </Link>
    )
}


export const TimelineButtonHandler = () => {
    return (
        <Link to={"/app/events/timeline"}>
            <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                <h1 className='text-base mr-3'>Timeline</h1>
                <FiClock className='ml-auto' />
            </div>
        </Link>
    )
}

