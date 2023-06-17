import { useEffect, React, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { IconContext } from "react-icons";
import { Link, useNavigate } from 'react-router-dom';
import { FiGrid } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

import './styles/utils.css'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/accordion'
import { render } from 'react-dom';


const QualificationsHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const navigate = useNavigate();
    const [qualifications, setQualifications] = useState([]);

    function handleHome() {
        navigate("/courses");
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();

    }, []);

    useEffect(() => {
        callQualificationsData();
    }, [user]);


    function callQualificationsData() {

        if (user) {
            const link = "http://localhost:8000/api/accounts/users/" + user['id'] + "/qualifications/";
            fetch(link)
                .then((res) => res.json())
                .then((data) => {
                    setQualifications(data);
                })
                .catch((error) => console.error(error));
        }
    }


    function RenderQualifications(curso_grade) {
        return (
            <div className='border border-black bg-white rounded my-6 py-6'>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <div className='' >
                                <h2 className='text-lg font-medium   ml-4'>
                                    <AccordionIcon className=' ' />
                                    {curso_grade.curso_title}

                                </h2>
                            </div>
                        </AccordionButton>
                        <AccordionPanel>
                            <div className='flex flex-col mt-4'>
                                {curso_grade.notas.map(RenderQualificationsNotas)}
                            </div>

                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </div>

        )
    }

    function RenderQualificationsNotas(notas) {
        return (
            <div className='px-12'>
                <div className='container flex py-2 my-2 px-6 rounded space-x-7 bg-indigo-100'>
                    <p className='font-normal text-base flex w-1/4'>{notas.descripcion}</p>

                    <div className='w-1/4 justify-center text-center items-center flex'>
                        <span className="bg-indigo-600 text-indigo-200 text-xs font-medium  w-[3rem] py-0.5 rounded ">{notas.calificacion}</span>
                    </div>




                    <p className='font-normal text-base flex w-1/4 overflow-hidden overflow-ellipsis whitespace-nowrap'>{notas.comentarios}</p>
                    <p className=' font-bold text-base flex w-1/4 text-center justify-end'>{notas.ponderacion}</p>
                </div>
            </div>

        )
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

                            <a href="/events/timeline" className=''>
                                <li className='py-3 mt-8 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiCalendar size={25} />
                                        <h2 className='px-4 '>Events</h2>
                                    </span>

                                </li>
                            </a>

                            <a href="">
                                <li className='py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiBarChart size={25} />
                                        <h2 className='px-4'>Dashboard</h2>
                                    </span>

                                </li>
                            </a>

                            <a href="">
                                <li className='bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3 mt-7'>
                                    <span className='flex px-5'>     <IconContext.Provider value={{ color: 'white', size: '25px' }}>
                                        <FiCheckCircle />
                                    </IconContext.Provider>
                                        <h1 className='pl-2 text-white '>Qualifications</h1></span>

                                </li>
                            </a>

                            <a href="/configuration" className='py-10'>
                                <li className='py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold '>
                                        <FiSettings size={25} />

                                        <h1 className='px-4 '>Configuration</h1></span>
                                </li>
                            </a>
                        </ul>
                    </div>

                </aside>
                <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886] '>
                    <div className='p-9 px-12 font-bold text-2xl'>
                        <h2>Qualifications</h2>
                        <div className='mt-8'>
                            {qualifications.map(RenderQualifications)}
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(QualificationsHome);