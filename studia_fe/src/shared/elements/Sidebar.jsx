import React, { useState } from 'react';
import { IconContext } from "react-icons";


import {
    FiGrid,
    FiCalendar,
    FiCheckCircle,
    FiSettings,
    FiBarChart
} from "react-icons/fi";


export const Sidebar = (props) => {

    const iconProps = {
        courses: {},
        events: {},
        dashboard: {},
        qualifications: {},
        configuration: {},
    };

    if (props.section === 'courses') {
        iconProps.courses = { color: 'white', size: '25px' };
    } else if (props.section === 'events') {
        iconProps.events = { color: 'white', size: '25px' };
    } else if (props.section === 'dashboard') {
        iconProps.dashboard = { color: 'white', size: '25px' };
    } else if (props.section === 'qualifications') {
        iconProps.qualifications = { color: 'white', size: '25px' };
    } else if (props.section === 'configuration') {
        iconProps.configuration = { color: 'white', size: '25px' };
    }

    return (
        <div>
            <aside id="default-sidebar" className=" top-0 left-0 w-[33vmin] h-screen transition-transform -translate-x-full sm:translate-x-0 z-50" aria-label="Sidebar">
                <div className="h-full px-12 py-4 overflow-y-auto bg-white ">
                    <ul className="space-y-96 font-medium py-12 ">
                        <a href="/app/courses" className='pt-6'>
                            <li className={`py-3 mt-8 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 ${Object.keys(iconProps.courses).length > 0 ? 'bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3' : ''}`}>
                                <span className='flex font-bold'>
                                    <IconContext.Provider value={iconProps.courses}>
                                        <FiGrid size={25} />
                                    </IconContext.Provider>
                                    <h2 className={`${Object.keys(iconProps.courses).length > 0 ? 'pl-2 text-white' : 'px-4'}`}>My Courses</h2>
                                </span>
                            </li>
                        </a>

                        <a href="/app/events/timeline" className=''>
                            <li className={`py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 ${Object.keys(iconProps.events).length > 0 ? 'bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3' : ''}`}>
                                <span className='flex font-bold'>
                                    <IconContext.Provider value={iconProps.events}>
                                        <FiCalendar size={25} />
                                    </IconContext.Provider>
                                    <h2 className={`${Object.keys(iconProps.events).length > 0 ? 'pl-2 text-white' : 'px-4'}`}>Events</h2>
                                </span>
                            </li>
                        </a>

                        <a href="/app/dashboard">
                            <li className={`py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 ${Object.keys(iconProps.dashboard).length > 0 ? 'bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3' : ''}`}>
                                <span className='flex font-bold'>
                                    <IconContext.Provider value={iconProps.dashboard}>
                                        <FiBarChart size={25} />
                                    </IconContext.Provider>
                                    <h2 className={`${Object.keys(iconProps.dashboard).length > 0 ? 'pl-2 text-white' : 'px-4'}`}>Dashboard</h2>
                                </span>
                            </li>
                        </a>

                        <a href="/app/qualifications">
                            <li className={`py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 ${Object.keys(iconProps.qualifications).length > 0 ? 'bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3' : ''}`}>
                                <span className='flex align-middle font-bold'>
                                    <IconContext.Provider value={iconProps.qualifications}>
                                        <FiCheckCircle size={25} />
                                    </IconContext.Provider>
                                    <h2 className={`${Object.keys(iconProps.qualifications).length > 0 ? 'pl-2 text-white' : 'px-4'}`}>Qualifications</h2>
                                </span>
                            </li>
                        </a>

                        <a href="/app/configuration">
                            <li className={`py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 ${Object.keys(iconProps.configuration).length > 0 ? 'bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3' : ''}`}>
                                <span className='flex font-bold'>
                                    <IconContext.Provider value={iconProps.configuration}>
                                        <FiSettings size={25} />
                                    </IconContext.Provider>
                                    <h2 className={`${Object.keys(iconProps.configuration).length > 0 ? 'pl-2 text-white' : 'px-4'}`}>Configuration</h2>
                                </span>
                            </li>
                        </a>


                    </ul>
                </div>

            </aside>
        </div>

    )
}
