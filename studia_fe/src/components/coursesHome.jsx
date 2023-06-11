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
import { FiUser } from "react-icons/fi";
import './styles/utils.css'
import { useNavigate } from 'react-router-dom';


const CoursesHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticated();
    load_user();

  }, []);

  useEffect(() => {
    function callApi() {
      if (user) {
        const link = "http://localhost:8000/api/accounts/users/" + user['id'] + "/courses/";
        fetch(link)
          .then((res) => res.json())
          .then((data) => {
            setCourses(data);
            setLoading(false);
          })
          .catch((error) => console.error(error));
      }
    }

    if (loading) {
      callApi();
    }
  });

  console.log(courses)


  function renderSkeleton() {
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

  function moveComponent(url, course) {
    navigate(url + course.id)
  }



  function RenderCourse(course) {
    return (
      <div className=' '>
        <div className="max-w-sm bg-white  rounded-lg shadow cursor-pointer h-[35rem] shadow2" onClick={() => moveComponent(`/courses/`, course)}>
          <img className="rounded-t-lg w-full h-[13rem] object-cover" src={course.course_photo} alt="" />
          <div className="p-3 flex flex-col justify-center items-center">
            <h1>{course.title}</h1>
            <p className='text-xs font-normal text-gray-400'>{course.course_type}</p>
            <div className='container bg-gray-100 py-1.5 my-6 rounded '>

            </div>
            <div className='container flex flex-row space-x-20 justify-center'>

              <div className=' px-2 bg-gray-100 h-[3rem] flex justify-center text-center align-middle space-x-1 rounded items-center'>
                <FiUser size={19} className='my-1 justify-center text-center align-middle' />
                <p className=' text-base font-normal'>{course.students.length}</p>
              </div>
              <div className=' flex bg-gray-100 h-[3rem] rounded space-x-1 px-3 items-center'>
                <img class="w-8 h-8 rounded-full mr-3" src={course.professor['profile_photo']} alt="Rounded avatar" />                
                <p className='text-base font-normal'>{course.professor['name']}</p>
              </div>
            </div>

            <div className='container bg-gray-100 rounded my-8'>
              <p className='text-sm font-normal px-5 py-5 text-ellipsis overflow-hidden '>{course.description}</p>
            </div>

          </div>
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
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 invisible sm:visible">Student</span>
            {user && <p className='font-semibold mr-5'>{user['name']}</p>}

            <div className='rounded w-14 mr-9'>
              {user && <img src={user['profile_photo']} className='object-scale-down rounded-lg cursor-pointer' alt="" />}
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
        <div className='container-fluid w-full rounded-tl-3xl bg-[#e7eaf886] '>
          <div className='p-9 px-12 font-bold text-2xl'>
            <h2>My Courses</h2>
            <div className='flex flex-wrap py-11 sm:space-y-0 space-y-10  sm:space-x-12 space-x-0'>
              {loading ? renderSkeleton() : courses.map(RenderCourse)}
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




export default connect(mapStateToProps, { checkAuthenticated, load_user })(CoursesHome);