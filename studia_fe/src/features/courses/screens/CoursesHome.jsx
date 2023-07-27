import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/utils.css'
import { useAuthContext } from "../../../context/AuthContext";
import { Sidebar } from '../../../shared/elements/Sidebar';
import { CoursesCardHome } from '../components/CoursesCardHome';
import { Navbar } from '../../../shared/elements/Navbar';
import { Spin } from "antd";
import { API } from "../../../constant";
import { checkAuthenticated } from "../../../helpers";

const CoursesHome = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.6 };
  const { user } = useAuthContext();


  useEffect(() => {
    if(!checkAuthenticated()){
      navigate('/');
    }
  }, []);

  const fetchCoursesCards = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}?populate=courses.cover,courses.students,courses.professor,courses.professor.profile_photo&fields[]=courses`);
      const data = await response.json();
      setCourses(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesCards();
  }, [user]);

  function RenderCourse(course) {
    return (
      <CoursesCardHome course={course} />
    )
  }

  return (
    <div className='h-screen w-full bg-white'>
      <Navbar />
      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <Sidebar section={'courses'} />
        <div className='container-fluid w-full rounded-tl-3xl bg-[#e7eaf886] '>
          <div className='p-9 px-12 font-bold text-2xl'>
            <h2>My Courses</h2>
            <motion.div className='flex flex-wrap py-11 sm:space-y-0 space-y-10  sm:space-x-12 space-x-0' initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
              {isLoading && <Spin size="large" />}
              {courses.courses && courses.courses.map(RenderCourse)}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
  
}


export default CoursesHome;