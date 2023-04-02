import { useEffect, useState, React } from 'react';
import { connect, useSelector } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { IconContext } from "react-icons";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { FiGrid } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiBarChart } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

import './styles/utils.css'

const CoursesHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);


  function RenderCourseFirst() {
    if (courses.length === 0) {
      return (
        <div className='py-10 flex flex-wrap'>
          <div className='w-96'>
            <SkeletonTheme height={'10rem'} baseColor="#c7d2fe">
              <Skeleton count={1} />
            </SkeletonTheme>
            <div className='py-5'>
              <SkeletonTheme baseColor="#c7d2fe">
                <Skeleton count={9} />
              </SkeletonTheme>

            </div>

          </div>


          <div className='w-96 ml-8'>
          <SkeletonTheme height={'10rem'} baseColor="#c7d2fe">
              <Skeleton count={1} />
            </SkeletonTheme>
            <div className='py-5'>
              <SkeletonTheme baseColor="#c7d2fe">
                <Skeleton count={9} />
              </SkeletonTheme>

            </div>

          </div>


          <div className='w-96 ml-8'>
          <SkeletonTheme height={'10rem'} baseColor="#c7d2fe">
              <Skeleton count={1} />
            </SkeletonTheme>
            <div className='py-5'>
              <SkeletonTheme baseColor="#c7d2fe">
                <Skeleton count={9} />
              </SkeletonTheme>

            </div>

          </div>
          
        </div>
      )

    }
    else {
      return (
        courses.map(RenderCourse)
      )
    }
  }

  function RenderCourse(course) {
    if (course === null) {
      return (
        <h1>  empty</h1>
      )
    }
    else {
      return (
        <div className='py-10'>
          <div className="max-w-sm bg-white  rounded-lg shadow cursor-pointer h-[35rem]">
            <img className="rounded-t-lg w-full h-[13rem] object-cover" src={course.img} alt="" />
            <div className="p-3 flex flex-col justify-center items-center">
              <h1>{course.title}</h1>
            </div>
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
              <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
          </button>
          <h1 className='p-10 sm:px-16 font-bold text-3xl italic leading-none tracking-tight cursor-pointer'>Studia <span className='text-pink-500 text-4xl '>.</span></h1>
          <form className='px-48 invisible sm:visible'>
            <label for="default-search " className="mb-2 text-sm font-medium text-black sr-only  dark:text-white">Search</label>
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-black dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm bg-[#e7eaf886] rounded-lg" placeholder="Search for knowledge" required>
              </input>
            </div>
          </form>


          <div className=' absolute right-0 flex items-center pb-10 sm:pb-0'>
            <FiBell size={25} className="mr-8 cursor-pointer" />
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 invisible sm:visible">Student</span>
            {user && <p className='font-semibold mr-5'>{user['name']}</p>}

            <div className='rounded w-14 mr-9'>
              <img src="" className='object-scale-down rounded-lg cursor-pointer border border-black' alt="" />
            </div>

          </div>

        </div>
      </nav>

      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <aside id="default-sidebar" className=" top-0 left-0 w-[40vmin] h-screen transition-transform -translate-x-full sm:translate-x-0 z-50" aria-label="Sidebar">
          <div className="h-full px-12 py-4 overflow-y-auto bg-white ">
            <ul className="space-y-96 font-medium py-12 ">
              <a href="" className='pt-6'>
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
                <li className='py-3 mt-7 pl-5 hover:bg-indigo-200 transition rounded-lg duration-300 '>
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
        <div className='container-fluid h-screen w-full rounded-tl-3xl bg-[#e7eaf886] '>
          <div className='p-9 px-12 font-bold text-2xl'>
            <h2>My Courses</h2>
            {RenderCourseFirst()}
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(CoursesHome);