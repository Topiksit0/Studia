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

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/accordion'

import { FiChevronDown } from "react-icons/fi";


const CourseInside = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
    const navigate = useNavigate();
    const [courseInformation, setCourseInformation] = useState([]);
    const [courseContentInformation, setCourseContentInformation] = useState([]);
    let { id } = useParams();
    console.log(courseContentInformation)

    function handleHome() {
        navigate("/courses");
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

    function RenderCourseInsideSectionContent(subsection) {
        const url = "/courses/" + id + "/" + subsection.titulo + "/"
        return (
            <div>
                <a href={url}>
                    <p className='text-base font-normal ml-4 pb-5'>
                        {subsection.titulo}
                        {selectFaseSectionContent(subsection.fase)}
                    </p>

                </a>
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
                            {section.subsecciones.map(RenderCourseInsideSectionContent)}
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
                            <img src="https://media.licdn.com/dms/image/C4E03AQFEOaCX1a2YrA/profile-displayphoto-shrink_100_100/0/1663844200883?e=1686787200&v=beta&t=kK62__WjZnUk90Z_rcA42H5ugHGm1kbSM6nlGrSynLk" className='object-scale-down rounded-lg cursor-pointer' alt="" />
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

                            <a href="" className=''>
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
                
                <div className='container-fluid h-screen w-screen rounded-tl-3xl bg-[#e7eaf886] flex flex-wrap'>

                    <div className='flex-1 min-w-0  sm:w-auto mt-8 ml-8 mr-8'>

                        <img src="https://kinsta.com/wp-content/uploads/2022/03/what-is-postgresql.png" alt="" className='rounded shadow' />
                        {courseContentInformation[0] && <p className='text-xl mt-5 font-semibold'> {courseContentInformation[0].subsecciones[0].titulo}</p>}
                        <div className='flex flex-row mt-4  items-center'>
                            <p className='text-base font-semibold'>{courseInformation.professor}</p>
                            <button type="button" class="duration-150 ml-auto flex-shrink-0 flex border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 border-gray-600 text-black hover:text-white hover:bg-gray-600 focus:ring-gray-800">
                                <FiUser className='mr-4' size={20} />
                                Participants
                            </button>
                        </div>
                        <hr className="h-px my-3 bg-gray-800 border-0 "></hr>
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
        </div>
    )
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});


export default connect(mapStateToProps, { checkAuthenticated, load_user })(CourseInside);