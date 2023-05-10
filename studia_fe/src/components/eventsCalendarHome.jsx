import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { IconContext } from "react-icons";
import { Link, useNavigate } from 'react-router-dom';

import 'rsuite/dist/rsuite-no-reset.min.css';


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
    FiClock,
} from "react-icons/fi";

import { Calendar, Whisper, Popover, Badge, Modal, Input, Button, Placeholder, Form } from 'rsuite';

import './styles/utils.css'


const EventsCalendarHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (value) => {
        setTitle(value);
    };

    const handleDateChange = (value) => {
        setDate(value);
    };

    const [events, setEventList] = useState(
        [
            {
                title: "Programación 1: Entrega primera version de la práctica 1", time: new Date(2023, 6, 10)
            },
            {
                title: "Programación 1: Evalua a tus compañeros y recibe feedback", time: new Date(2023, 6, 21)
            },
            {
                title: "Programación 1: Entrega final de la práctica 1", time: new Date(2023, 6, 28)
            }
        ]
    );

    const handleOpen = value => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    function handleAddEvent() {
        const newEvents = [...events];
        newEvents.push({
            title: title,
            time: new Date(date)
        });
        setEventList(newEvents)
    }

    function getTodoList(date) {
        return events.filter((item) => {
            return (
                item.time.getFullYear() === date.getFullYear() &&
                item.time.getMonth() === date.getMonth() &&
                item.time.getDate() === date.getDate()
            );
        });
    }


    function renderCell(date) {
        const list = getTodoList(date);
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            const moreItem = (
                <li>
                    <Whisper
                        placement="top"
                        trigger="click"
                        speaker={
                            <Popover>
                                {list.map((item, index) => (
                                    <p key={index}>
                                        <strong>{item.title}</strong>
                                    </p>
                                ))}
                            </Popover>
                        }
                    >
                        <a>{moreCount} more</a>
                    </Whisper>
                </li>
            );

            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li className='font-medium' key={index}>
                            <Badge /> {item.title}
                        </li>
                    ))}
                    {moreCount ? moreItem : null}
                </ul>
            );
        }

        return null;
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

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
                <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886]'>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <div className='flex'>
                            <div name='maindiv' className='bg-white rounded-xl p-5 mt-3 border border-black w-auto flex-grow '>
                                <div className='flex'>
                                    <h1 className=''>Calendar</h1>
                                    <button onClick={() => handleOpen()} className='ml-auto bg-indigo-300 mr-3 font-medium rounded text-base px-3'>Add event</button>

                                    <Modal size='sm' open={open} onClose={handleClose}>
                                        <Modal.Header>
                                            <Modal.Title>Add Event</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group >
                                                <Form.ControlLabel>Title</Form.ControlLabel>
                                                <Input value={title} onChange={handleTitleChange} />
                                            </Form.Group >
                                            <Form.Group >
                                                <Form.ControlLabel>Date</Form.ControlLabel>
                                                <Input type='date' value={date} onChange={handleDateChange} />
                                            </Form.Group >
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={handleClose} appearance="subtle">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleAddEvent} appearance="primary">
                                                Add Event
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>

                                <div className='font-normal'>
                                    <Calendar bordered renderCell={renderCell} />


                                </div>

                            </div>
                            <div name='others' className='flex flex-col right-0 ml-6 mr-10'>

                                <Link to={"/events/timeline"}>
                                    <div className='bg-white rounded-lg border border-black my-3 py-2 px-4 flex'>
                                        <h1 className='text-base mr-3'>Timeline</h1>
                                        <FiClock className='ml-auto' />
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(EventsCalendarHome);