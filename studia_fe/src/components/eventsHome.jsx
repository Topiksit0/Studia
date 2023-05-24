import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { IconContext } from "react-icons";
import { Link, useNavigate } from 'react-router-dom';

import {
    FiGrid,
    FiCalendar,
    FiCheckCircle,
    FiSettings,
    FiBarChart,
    FiBell,
    FiUsers,
    FiArrowRight,
    FiFolder,
    FiTrello,
    FiBook,
} from "react-icons/fi";


import './styles/utils.css'

const EventsHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const navigate = useNavigate();
    const [textSearch, setTextSearch] = useState("");
    const [timelineInfo, setTimelineInfo] = useState([]);

    function handleHome() {
        navigate("/courses");
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    useEffect(() => {
        callCourseData();
    }, [user]);


    function callCourseData() {

        if (user) {
            const link = "http://localhost:8000/api/accounts/users/" + user['id'] + "/courses/timeline/";
            fetch(link)
                .then((res) => res.json())
                .then((data) => {
                    setTimelineInfo(data);
                })
                .catch((error) => console.error(error));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChangeTextSearch = (event) => {
        setTextSearch(event.target.value);
    };

    function renderTimelineEvents(event) {
        return (
            <div>
                <h1 className='text-lg font-medium'>{event.fecha_fin_entrega}</h1>
                {event.actividades.map(renderTimelineEventsByDate)}
                <hr className="h-px my-8 bg-black border-0"></hr>
            </div>
        )
    }

    function renderTimelineEventsByDate(eventActividades) {
        if (eventActividades.tipo === "entrega") {
            return (
                <div className='flex my-5 ml-5'>
                    <div className='bg-amber-300 rounded shadow py-2 px-2 h-[3.6rem] w-[3.6rem]'>
                        <FiFolder size={40} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base ml-5 text-indigo-500'>{eventActividades.titulo}</h1>
                        <h1 className='font-medium text-base ml-5 '>{eventActividades.texto}</h1>
                    </div>
                </div>
            )
        }

        if (eventActividades.tipo === "lecture") {
            return (
                <div className='flex my-5 ml-5'>
                    <div className='bg-cyan-300 rounded shadow py-2 px-2 h-[3.6rem] w-[3.6rem]'>
                        <FiTrello size={40} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base ml-5 text-indigo-500'>{eventActividades.titulo}</h1>
                        <h1 className='font-medium text-base ml-5 '>{eventActividades.texto}</h1>
                    </div>
                </div>
            )
        }

        if (eventActividades.tipo === "peer_review") {
            return (
                <div className='flex my-5 ml-5'>
                    <div className='bg-red-400 rounded shadow py-2 px-2 h-[3.6rem] w-[3.6rem]'>
                        <FiBook size={40} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base ml-5 text-indigo-500'>{eventActividades.titulo}</h1>
                        <h1 className='font-medium text-base ml-5 '>{eventActividades.texto}</h1>
                    </div>

                </div>
            )
        }
    }

    return (
        <div className='h-screen w-full bg-white'>
            <nav className="h-[8rem] bg-white">
                <div className="container flex flex-wrap items-center ">
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-black dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <h1 className='p-10 sm:px-16 font-bold text-3xl italic leading-none tracking-tight cursor-pointer'>Studia <span className='text-pink-500 text-4xl '>.</span></h1>
                    <form className='px-48 invisible sm:visible'>
                        <label htmlFor="default-search " className="mb-2 text-sm font-medium text-black sr-only  dark:text-white">Search</label>
                        <div className="relative w-80">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-black dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm bg-[#e7eaf886] rounded-lg" placeholder="Search for knowledge" required>
                            </input>
                        </div>
                    </form>


                    <div className=' absolute right-0 flex items-center pb-10 sm:pb-0'>
                        <FiBell size={25} className="mr-8 cursor-pointer" />
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded invisible sm:visible">Student</span>
                        {user && <p className='font-semibold mr-5'>{user['name']}</p>}

                        <div className='rounded w-14 mr-9'>
                            {user && <img src={user['profile_photo']} className='object-scale-down rounded-lg cursor-pointer' alt="" />}
                        </div>

                    </div>

                </div>
            </nav>

            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <aside id="default-sidebar" class=" top-0 left-0 w-[40vmin] h-screen transition-transform -translate-x-full sm:translate-x-0 z-50" aria-label="Sidebar">
                    <div class="h-full px-12 py-4 overflow-y-auto bg-white ">
                        <ul class="font-medium py-12 ">
                            <a href="/courses">
                                <li className='py-3  pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiGrid size={25} />
                                        <h2 className='px-4'>My Courses</h2>
                                    </span>

                                </li>
                            </a>

                            <a href="" className=''>
                                <li className='bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3 mt-7'>
                                    <span className='flex px-5'>     <IconContext.Provider value={{ color: 'white', size: '25px' }}>
                                        <FiCalendar />
                                    </IconContext.Provider>
                                        <h1 className='pl-2 text-white '>Events</h1></span>
                                </li>
                            </a>

                            <a href="">
                                <li className='py-3 mt-8 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiBarChart size={25} />
                                        <h2 className='px-4'>Dashboard</h2>
                                    </span>

                                </li>
                            </a>

                            <a href="/qualifications">
                                <li className='py-3 mt-7 pl-5 mb-6 hover:bg-indigo-200 transition rounded-lg duration-300 '>
                                    <span className='flex  align-middle font-bold '>
                                        < FiCheckCircle size={25} />
                                        <h2 className='px-4'>Qualifications</h2>
                                    </span>

                                </li>
                            </a>


                            <a href="/configuration" className=''>
                                <li className='py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiSettings size={25} />
                                        <h2 className='px-4 '>Configuration</h2>
                                    </span>

                                </li>
                            </a>
                        </ul>
                    </div>

                </aside>
                <div className='container-fluid h-full w-full rounded-tl-3xl bg-[#e7eaf886]'>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <div className='flex'>
                            <div name='maindiv' className='bg-white rounded-xl p-5 mt-3 border border-black w-auto flex-grow'>
                                <h1 className=''>Timeline</h1>
                                <div className='flex'>
                                    <div className="mt-8 ">
                                        <select className="w-full p-2.5 text-base appearance-none bg-[#e7eaf886] border rounded-md shadow-sm font-normal border-black ">
                                            <option>Next 90 days</option>
                                            <option>Next 30 days</option>
                                            <option>Next week</option>
                                            <option>Today</option>
                                        </select>
                                    </div>

                                    <div className="mt-8 mx-5">
                                        <select className="w-full p-2.5 text-base bg-[#e7eaf886] appearance-none border rounded-md shadow-sm font-normal border-black">
                                            <option>Sort by Courses</option>
                                            <option>Sort by Date</option>
                                        </select>
                                    </div>
                                    <div className="ml-auto mt-8  mx-5 right-0 min-w-[20rem]">
                                        <form onSubmit={handleSubmit} className="">
                                            <div className="flex items-center w-full p-2.5 text-base bg-[#e7eaf886] appearance-none border rounded-md shadow-sm font-normal border-black">
                                                <input
                                                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                                    type="text"
                                                    placeholder="Search by activity type or name"
                                                    value={textSearch}
                                                    onChange={handleChangeTextSearch}
                                                />
                                                <button
                                                    type="submit"
                                                >
                                                    <FiArrowRight size={18} />
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                <hr className="h-px my-8 bg-black border-0"></hr>
                                {timelineInfo.map(renderTimelineEvents)}

                            </div>
                            <div name='others' className='flex flex-col right-0 ml-6 mr-10'>

                                <Link to={"/events/calendar"}>
                                    <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                                        <h1 className='text-base mr-3'>Calendar</h1>
                                        <FiCalendar className='ml-auto' />
                                    </div>
                                </Link>

                                <Link to={"/events/news"}>
                                    <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                                        <h1 className='text-base mr-3'>News</h1>
                                        <FiUsers className='ml-auto' />
                                    </div>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});




export default connect(mapStateToProps, { checkAuthenticated, load_user })(EventsHome);