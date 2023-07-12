import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../../actions/auth';
import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';

const UserProfile = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const [courses, setCourses] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  let { uid } = useParams();

  function renderCourseCard(course) {
    return (
      <div className=' rounded my-3 bg-slate-100 w-2/3 flex space-x-8 items-center text-center'>
        <img className='w-[9rem] h-[5rem] rounded object-cover' src={course.course_photo} alt="" />
        <h1 className='font-medium'>{course.title}</h1>
        <h2 className='truncate text-gray-600'>{course.description}</h2>
      </div>
    )
  }

  function renderTag() {
    if (userProfile.is_professor) {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 mt-2 px-2.5 mx-4 py-0.5 rounded invisible sm:visible">Student</span>
      )
    } else {
      return (
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-3 mt-2 px-2.5 mx-4 py-0.5 rounded invisible sm:visible">Professor</span>
      )
    }
  }

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  useEffect(() => {
    const link = "http://localhost:8000/api/accounts/users/" + uid + "/courses/";
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error(error));
  }, [user, uid]);

  useEffect(() => {
    const link = "http://localhost:8000/api/accounts/users/" + uid + "/";
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch((error) => console.error(error));
  }, [user, uid]);

  return (
    <div className='h-screen w-full bg-white'>
      <Navbar user={user} />
      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <Sidebar section={'courses'} />
        <div className='container-fluid w-full  rounded-tl-3xl bg-[#e7eaf886]  '>
          <>
            <link
              rel="stylesheet"
              href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
            />
            <link
              rel="stylesheet"
              href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
            />
            <main className="profile-page">
              <section className="relative block h-96">
                <div
                  className="absolute top-0 w-full h-full bg-center bg-cover rounded-tl-3xl"
                  style={{
                    backgroundImage:
                      'url("https://e1.pxfuel.com/desktop-wallpaper/224/436/desktop-wallpaper-star-wars-on-twitter-twitter-banner.jpg")'
                  }}
                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-50 bg-black rounded-tl-3xl"
                  />
                </div>

              </section>
              <section className="relative py-16 ">
                <div className="container mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                          <div className="relative">
                            <img
                              alt="..."
                              src={userProfile && userProfile.profile_photo}
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-2 lg:text-right lg:self-center">
                          <button class=" p-2.5 m-4 mt-8 bg-indigo-500 rounded-xl hover:rounded-3xl hover:bg-indigo-600 transition-all duration-300 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        </div>
                      </div>
                      <div className="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-800 flex items-center justify-center text-center">
                          {userProfile && userProfile.name}
                          {renderTag()}
                        </h3>

                        <h3 className="text-xl font-medium leading-normal text-blueGray-500 mb-7">
                          {userProfile && userProfile.user_name}
                        </h3>
                        <div className="mb-2 text-blueGray-600">
                          <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
                          {userProfile && userProfile.university}
                        </div>
                      </div>
                      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                              {userProfile && userProfile.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='border-t '>
                        <div className='my-4 flex flex-col justify-center items-center'>
                          {courses && courses.map(renderCourseCard)}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(UserProfile);