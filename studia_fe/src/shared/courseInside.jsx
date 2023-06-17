import { useEffect, useState, React } from 'react';
import { connect, useSelector } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { IconContext } from "react-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiGrid } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiFolder } from "react-icons/fi";
import { FiTrello } from "react-icons/fi";
import { FiBook } from "react-icons/fi";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/accordion'

import ChatBot from './chatBot';


const CourseInside = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const navigate = useNavigate();
    const [courseInformation, setCourseInformation] = useState([]);
    const [courseContentInformation, setCourseContentInformation] = useState([]);
    let { id } = useParams();
    function handleNavigate(url) {
        navigate(url);
    }

    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    useEffect(callCourseData, [])

    useEffect(() => {
        if (courseContentInformation.length === 0) {
            callCourseSectionData();
        }
    });

    function callCourseData() {
        const link = "http://localhost:8000/api/courses/" + id + "/";
        fetch(link)
            .then((res) => res.json())
            .then((data) => {
                setCourseInformation(data);
            })
            .catch((error) => console.error(error));
    }

    function callCourseSectionData() {
        const link = "http://localhost:8000/api/courses/" + id + "/activities/"
        fetch(link)
            .then((res) => res.json())
            .then((data) => {
                setCourseContentInformation(data);
            })
    }

    function selectFaseSectionContent(str) {
        if (str === "Forethought") {
            return (

                <span className="  text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-green-800 text-green-400 ">{str}</span>

            )
        } else if (str === "Performance") {
            return (

                <span className="text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-yellow-600 text-yellow-200 ">{str}</span>

            )
        } else if (str === "Self-reflection") {
            return (

                <span className="text-xs absolute right-0 mr-20 font-medium px-2.5 py-0.5 rounded bg-red-600 text-red-200 ">{str}</span>

            )
        }
    }
    function convertirFecha(fecha) {
        const partes = fecha.split("-");
        return partes[2] + "-" + partes[1] + "-" + partes[0];
    }

    function RenderCourseInsideSectionContent(subsection, titulo) {
        const url = "/courses/" + id + "/" + titulo + "/" + subsection.titulo + "/"
        if (new Date(convertirFecha(subsection.fecha_inicio)).toISOString() > new Date().toISOString()) {
            return (
                <div className='cursor-pointer'>
                    <p className='text-base font-normal ml-4 pb-5'>
                        <span>🔒 </span>
                        {subsection.titulo}
                        {selectFaseSectionContent(subsection.fase)}
                    </p>
                </div>
            )
        }
        return (

            <div>
                <a href={url}>
                    <p className='text-base font-normal ml-4 pb-5'>
                        {subsection.finished === "False" ? (
                            <span role="img" aria-label="circle">⭕ </span>
                        ) : (
                            <span role="img" aria-label="checkmark">✅ </span>
                        )
                        }

                        {subsection.titulo}
                        {selectFaseSectionContent(subsection.fase)}
                    </p>

                </a>
            </div>

        )
    }

    function renderAllActivities(activities) {
        if (activities.tipo === "texto") {
            return (
                <div>
                    <p className='my-5 font-base'>{activities.texto}</p>
                </div>
            )

        } else {
            if (activities.tipo === "entrega") {
                return (
                    <div className='flex cursor-pointer mt-4 pl-4 bg-yellow-100 border-amber-400 border-2 rounded py-4'>
                        <div className='bg-amber-300 rounded shadow py-2 px-2'>
                            <FiFolder size={40} />
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-lg ml-5'>Delivery</p>
                            <p className='font-base text-base ml-5'>{activities.texto}</p>
                        </div>

                    </div>
                )
            }

            if (activities.tipo === "cuestionario") {
                return (
                    <div className='flex justify-center'>
                        <div dangerouslySetInnerHTML={{ __html: activities.htmlcode }}></div>
                    </div>
                )
            }

            if (activities.tipo === "lecture") {
                return (
                    <a href={activities.url}>
                        <div className='flex cursor-pointer mt-4 pl-4 bg-blue-100 border-blue-400 border-2 rounded py-4 pb-5'>
                            <div className='bg-cyan-300 rounded shadow py-2 px-2'>
                                <FiTrello size={40} />
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-medium text-lg ml-5'>Lecture</p>
                                <p className='font-base text-base ml-5'>{activities.texto}</p>
                            </div>

                        </div>
                    </a>


                )
            }

            if (activities.tipo === "peer_review") {
                return (
                    <div className='flex cursor-pointer mt-4 pl-4 bg-red-100 border-red-400 border-2 rounded py-4'>
                        <div className='bg-red-400 rounded shadow py-2 px-2'>
                            <FiBook size={40} />
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-lg ml-5'>Peer Review</p>
                            <p className='font-base text-base ml-5'>{activities.texto}</p>
                        </div>

                    </div>
                )
            }

            if (activities.tipo === "archivos") {
                return (
                    <div className='flex cursor-pointer mt-4 pl-4 bg-red-100 border-red-400 border-2 rounded py-4'>
                        <div className='bg-red-400 rounded shadow py-2 px-2'>
                            <FiBook size={40} />
                        </div>
                        <div className='flex flex-col'>
                            <p className='font-medium text-lg ml-5'>Files</p>
                            <p className='font-base text-base ml-5'>{activities.texto}</p>
                        </div>

                    </div>
                )

            }

        }



    }

    function RenderTextActivitiesInsideCourse() {
        // Obtiene la sección correspondiente
        var contenido = courseContentInformation[0].subsecciones[0].contenido
        return (
            <div className='mb-12'>
                {contenido.map(renderAllActivities)}
            </div>
        )
    }

    function RenderCourseContent(section) {
        return (
            <div>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <AccordionButton>
                            <div className='container bg-gray-100 rounded py-4 mb-4 flex' >
                                <h2 className='text-lg font-medium   ml-4'>
                                    {section.titulo}
                                    <AccordionIcon className='absolute right-0 mr-20 ' />

                                </h2>
                            </div>
                        </AccordionButton>
                        <AccordionPanel>
                            {section.subsecciones.map(subseccion => RenderCourseInsideSectionContent(subseccion, section.titulo))}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
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
                    <div className=' absolute right-0 flex items-center pb-10 sm:pb-0'>
                        <FiBell size={25} className="mr-8 cursor-pointer" />
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 invisible sm:visible">Student</span>
                        {user && <p className='font-semibold mr-5'>{user['name']}</p>}

                        <div className='rounded w-14 mr-9'>
                            {user && <img src={user['profile_photo']} className='object-scale-down rounded-lg cursor-pointer' alt="" />}
                        </div>
                    </div>
                    {courseInformation && <h1 className='ml-44 text-2xl font-bold '>{courseInformation.title}</h1>}
                </div>




            </nav>

            <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
                <aside id="default-sidebar" className=" top-0 left-0 w-[40vmin] h-screen transition-transform -translate-x-full sm:translate-x-0 z-50" aria-label="Sidebar">
                    <div className="h-full px-12 py-4 overflow-y-auto bg-white ">
                        <ul className="font-medium py-12 ">
                            <a href="/courses" className='pt-6'>
                                <li className='bg-gradient-to-r from-[#657DE9] to-[#6E66D6] rounded-lg py-3 '>
                                    <span className='flex px-5'>     <IconContext.Provider value={{ color: 'white', size: '25px' }}>
                                        <FiGrid />
                                    </IconContext.Provider>
                                        <h1 className='pl-2 text-white '>My Courses</h1></span>
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

                            <a href="/qualifications">
                                <li className='py-3 mt-7 pl-5 mb-6 hover:bg-indigo-200 transition rounded-lg duration-300 '>
                                    <span className='flex  align-middle font-bold '>
                                        < FiCheckCircle size={25} />
                                        <h2 className='px-4'>Qualifications</h2>
                                    </span>

                                </li>
                            </a>

                            <a href="/configuration">
                                <li className='py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300'>
                                    <span className='flex font-bold  '>
                                        < FiSettings size={25} />
                                        <h2 className='px-4'>Configuration</h2>
                                    </span>

                                </li>
                            </a>
                        </ul>
                    </div>

                </aside>

                <div className='container-fluid min-h-screen w-screen rounded-tl-3xl bg-[#e7eaf886] flex flex-wrap'>

                    <div className='flex-1 min-w-0  sm:w-auto mt-8 ml-8 mr-8'>

                        <img src="https://kinsta.com/wp-content/uploads/2022/03/what-is-postgresql.png" alt="" className='rounded shadow' />
                        {courseContentInformation[0] && <p className='text-xl mt-5 font-semibold'> {courseContentInformation[0].subsecciones[0].titulo}</p>}
                        <div className='flex flex-row mt-4  items-center'>
                            <img class="w-8 h-8 rounded-full mr-3" src={courseInformation.professor && courseInformation.professor.profile_photo} alt="Rounded avatar" />
                            <p className='text-base font-semibold'>{courseInformation.professor && courseInformation.professor.name}</p>
                            <button type="button" class="duration-150 ml-auto flex-shrink-0 flex border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 border-gray-600 text-black hover:text-white hover:bg-indigo-400 hover:border-gray-50 focus:ring-gray-800">
                                <FiUser className='mr-4' size={20} />
                                Participants
                            </button>
                        </div>
                        <hr className="h-px my-3 bg-gray-800 border-0 "></hr>

                        {courseContentInformation.length > 0 && RenderTextActivitiesInsideCourse()}


                    </div>

                    <div className='flex-shrink-0 w-full sm:w-auto'>
                        <div className='mt-8 bg-white rounded-lg  px-5 py-5  sm:mr-9 sm:right-0 sm:w-[30rem] w-full shadow-md sm:visible collapse'>
                            <p className='text-xl font-medium'>Course content</p>
                            <hr className="h-px my-8 bg-gray-400 border-0"></hr>
                            {courseContentInformation.map(RenderCourseContent)}
                        </div>

                    </div>


                </div>

            </div>
            <ChatBot />
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});


export default connect(mapStateToProps, { checkAuthenticated, load_user })(CourseInside);