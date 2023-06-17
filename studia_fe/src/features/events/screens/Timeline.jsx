import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';

import {
    FiArrowRight,
    FiFolder,
    FiTrello,
    FiBook,
} from "react-icons/fi";

import { NewsButtonHandler, CalendarButtonHandler } from '../components/EventHandlers.jsx'
import { Sidebar } from '../../../shared/elements/Sidebar'; 
import { Navbar } from '../../../shared/elements/Navbar';

import '../styles/utils.css'

const TimelineEvents = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const [textSearch, setTextSearch] = useState("");
    const [timelineInfo, setTimelineInfo] = useState([]);

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
            <Navbar user={user}/>
            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <Sidebar section={'events'}/>
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
                                <CalendarButtonHandler />
                                <NewsButtonHandler />
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(TimelineEvents);