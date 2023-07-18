import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../../../actions/auth';
import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import { Tag } from '../../../shared/elements/Tag';
import { EditPanel } from '../components/EditPanel';
import { CoursesCardsProfile } from '../components/CoursesCardsProfile';

const UserProfile = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [userProfile, setUserProfile] = useState([]);
  let { uid } = useParams();

  function renderCourseCard(course) {
    return (
      <>
        <CoursesCardsProfile course={course} user={user} />
      </>
    )
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
                  className="absolute top-0 w-full h-full bg-center bg-cover lg:rounded-tl-3xl"
                  style={{
                    backgroundImage: `url(${userProfile.landscape_photo})`
                  }}

                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-50 bg-black lg:rounded-tl-3xl"
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

                        <div className="w-full lg:w-4/12 px-4  flex justify-end lg:order-2 lg:text-right lg:self-center">
                          <button name='editButton' onClick={handleOpenModal}
                            className={`p-2.5 lg:m-4 mt-8 bg-indigo-500 rounded-xl hover:rounded-3xl hover:bg-indigo-600  text-white ${user.id !== userProfile.id ? 'invisible opacity-0' : ''}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          {showModal && <EditPanel onClose={handleCloseModal} userProfile={userProfile} uid={uid} />}
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        </div>
                      </div>
                      <div className="text-center mt-12">
                        <h3 className="text-4xl font-semibold leading-normal text-blueGray-800 flex items-center justify-center text-center">
                          {userProfile && userProfile.name}
                          <Tag className={'hidden lg:block'} User={userProfile} />
                        </h3>

                        <h3 className="text-xl font-medium leading-normal text-blueGray-500 mb-7">
                          <p>{userProfile && userProfile.user_name}</p>
                        </h3>
                        <div className="mb-2 text-blueGray-600 flex justify-center">
                          <i className="fas fa-university mr-2 text-lg text-blueGray-400" />
                          <p>{userProfile && userProfile.university}</p>
                        </div>
                      </div>
                      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-base leading-relaxed text-blueGray-700" name='editDescription'>
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