import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';
import { useParams } from 'react-router-dom';
import { FiUser } from "react-icons/fi";

import { ActivitiesText, ActivitiesLecture, ActivitiesDelivery, ActivitiesPeerReview, ActivitiesQuestionnaire } from '../components/Activities';

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import { AccordionCourseContent } from '../components/AccordionCourseContent';
import { Chatbot } from '../components/ChatBot';



const CourseInside = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const [courseOrFiles, setcourseOrFiles] = useState('course');
  const [courseInformation, setCourseInformation] = useState([]);
  const [courseContentInformation, setCourseContentInformation] = useState([]);
  const [courseSubsection, setCourseSubsection] = useState([]);
  const [courseSection, setCourseSection] = useState([]);
  let { courseId } = useParams();

  const componentMap = {
    texto: ActivitiesText,
    entrega: ActivitiesDelivery,
    lecture: ActivitiesLecture,
    peer_review: ActivitiesPeerReview,
    cuestionario: ActivitiesQuestionnaire,
  };

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
    const link = "http://localhost:8000/api/courses/" + courseId + "/";
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setCourseInformation(data);
      })
      .catch((error) => console.error(error));
  }

  function callCourseSectionData() {
    const link = "http://localhost:8000/api/courses/" + courseId + "/activities/"
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setCourseContentInformation(data);
        setCourseSection(data[0].titulo);
        setCourseSubsection(data[0].subsecciones[0].titulo);
      })
  }

  function renderAllActivities(activities) {
    const Component = componentMap[activities.tipo];
    if (Component) {
      return <Component activitie={activities} />;
    }
    return null;
  }

  function RenderTextActivitiesInsideCourse() {
    const section_ = courseContentInformation.find(seccion => seccion.titulo === courseSection);
    const subsection_ = section_.subsecciones.find(subseccion => subseccion.titulo === courseSubsection);
    var contenido = subsection_.contenido;
    return (
      <div className='mb-12'>
        {contenido.map(renderAllActivities)}
      </div>
    )
  }

  function RenderFilesInsideCourse() {
    return(
      <div className='py-7 flex flex-col items-center justify-center'>
        <img className='opacity-50' src="https://liferay-support.zendesk.com/hc/article_attachments/360032795211/empty_state.gif" alt="" />
        <h2 className='py-3 font-medium text-gray-600'>There are no files to show</h2> 
      </div>
    )
  }


  return (
    <div className='h-screen w-full bg-white'>
      <Navbar user={user} />
      <div className='flex flex-wrap-reverse sm:flex-nowrap bg-white'>
        <Sidebar section={'courses'} />
        <div className='container-fluid min-h-screen w-screen rounded-tl-3xl bg-[#e7eaf886] flex flex-wrap'>
          <div className='flex-1 min-w-0  sm:w-auto mt-8 ml-8 mr-8'>
            <img src="https://kinsta.com/wp-content/uploads/2022/03/what-is-postgresql.png" alt="" className='rounded shadow' />
            <p className='text-xl mt-5 font-semibold'>{courseSubsection}</p>
            <div className='flex flex-row mt-4  items-center'>
              <img class="w-8 h-8 rounded-full mr-3" src={courseInformation.professor && courseInformation.professor.profile_photo} alt="Rounded avatar" />
              <p className='text-base font-semibold'>{courseInformation.professor && courseInformation.professor.name}</p>
              <button type="button" class="duration-150 ml-auto flex-shrink-0 flex border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 border-gray-600 text-black hover:text-white hover:bg-indigo-400 hover:border-gray-50 focus:ring-gray-800">
                <FiUser className='mr-4' size={20} />
                Participants
              </button>
            </div>
            <div className='flex flex-row mt-4  items-center space-x-8 ml-5'>
              <button
                className={`font-medium text-gray-600 hover:text-black pb-3 ${courseOrFiles === 'course'
                  ? 'text-[black] border-b-2 border-black'
                  : ''
                  }`}
                onClick={() => setcourseOrFiles('course')}>
                Course
              </button>
              <button
                className={`font-medium text-gray-600 hover:text-black pb-3 ${courseOrFiles === 'files'
                  ? 'text-[black] border-b-2 border-black'
                  : ''
                  }`}
                onClick={() => setcourseOrFiles('files')}>
                Files
              </button>
            </div>
            <hr className="h-px  bg-gray-600 border-0 mb-6"></hr>
            {courseOrFiles === 'course' && courseContentInformation.length > 0 && RenderTextActivitiesInsideCourse()}
            {courseOrFiles === 'files' && RenderFilesInsideCourse()}
          </div>
          <AccordionCourseContent {...{ courseContentInformation, setCourseSubsection, setCourseSection }} />
        </div>
      </div>
      <Chatbot />
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { checkAuthenticated, load_user })(CourseInside);