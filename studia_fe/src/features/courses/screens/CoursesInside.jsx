import { useEffect, useState, React } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';
import { useParams } from 'react-router-dom';
import { FiUser } from "react-icons/fi";

import { ActivitiesText, ActivitiesLecture, ActivitiesDelivery, ActivitiesPeerReview, ActivitiesQuestionnaire } from '../components/Activities';
import { ProfessorData } from '../components/ProfessorData';
import { Nothing404 } from '../components/Nothing404';

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import { AccordionCourseContent } from '../components/AccordionCourseContent';
import { Chatbot } from '../components/ChatBot';



const CourseInside = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const [courseInsideSectionType, setcourseInsideSectionType] = useState('course');
  const [courseInformation, setCourseInformation] = useState([]);
  const [files, setFiles] = useState([]);
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
    if (files.length === 0) {
      return (
        <Nothing404 />
      )
    }
  }

  function RenderParticipantsInsideCourseHandler(students) {
    return (
      <button className='bg-white rounded flex p-3 items-center space-x-3 shadow w-[14rem]'>
        <img src={students.profile_photo} alt="" className='rounded w-14 h-14'/>
        <p className='font-medium'>{students.name}</p>
      </button>
    )
  }

  function RenderParticipantsInsideCourse() {
    if (courseInformation.students.length === 0) {
      return (
        <Nothing404 />
      )
    } else {
      return (
        <div className='flex space-x-8'>
          {courseInformation.students.map(RenderParticipantsInsideCourseHandler)}
        </div>
      )
    }
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
            <div className='flex flex-row mt-8  items-center space-x-8 ml-5'>
              <button
                className={`font-medium hover:text-black pb-3 ${courseInsideSectionType === 'course' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                  }`}
                onClick={() => setcourseInsideSectionType('course')}
              >
                Course
              </button>
              <button
                className={`font-medium hover:text-black pb-3 ${courseInsideSectionType === 'files' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                  }`}
                onClick={() => setcourseInsideSectionType('files')}
              >
                Files
              </button>

              <button
                className={`font-medium hover:text-black pb-3 ${courseInsideSectionType === 'participants' ? 'text-black border-b-2 border-black' : 'text-gray-500'
                  }`}
                onClick={() => setcourseInsideSectionType('participants')}
              >
                Participants
              </button>
            </div>
            <hr className="h-px  bg-gray-600 border-0 mb-6"></hr>
            {courseInsideSectionType === 'course' && courseContentInformation.length > 0 && RenderTextActivitiesInsideCourse()}
            {courseInsideSectionType === 'files' && RenderFilesInsideCourse()}
            {courseInsideSectionType === 'participants' && RenderParticipantsInsideCourse()}
          </div>
          <div>
            <AccordionCourseContent {...{ courseContentInformation, setCourseSubsection, setCourseSection }} />
            {courseInformation && courseInformation.professor && (
              <ProfessorData professor={courseInformation.professor} />
            )}
          </div>
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