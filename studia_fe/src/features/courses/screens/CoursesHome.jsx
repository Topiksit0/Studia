import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';

import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/utils.css'
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../../../shared/elements/Sidebar';
import { CoursesCardHome } from '../components/CoursesCardHome';
import { Navbar } from '../../../shared/elements/Navbar';

const CoursesHome = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.6 };

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


  function RenderCourse(course) {
    return (
      <CoursesCardHome course={course} />
    )
  }



  return (
    <div className='h-screen w-full bg-white'>
      <Navbar user={user} />
      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <Sidebar section={'courses'} />
        <div className='container-fluid w-full rounded-tl-3xl bg-[#e7eaf886] '>
          <div className='p-9 px-12 font-bold text-2xl'>
            <h2>My Courses</h2>
            <motion.div className='flex flex-wrap py-11 sm:space-y-0 space-y-10  sm:space-x-12 space-x-0' initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
              {loading ? renderSkeleton() : courses.map(RenderCourse)}
            </motion.div>
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