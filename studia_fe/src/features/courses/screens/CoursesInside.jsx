import { useEffect, useState, React } from 'react';
import { connect, useSelector } from 'react-redux';
import { checkAuthenticated, load_user } from '../../../actions/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUser } from "react-icons/fi";

import { FiFolder } from "react-icons/fi";
import { FiTrello } from "react-icons/fi";
import { FiBook } from "react-icons/fi";

import { Sidebar } from '../../../shared/elements/Sidebar';
import { Navbar } from '../../../shared/elements/Navbar';
import { AccordionCourseContent } from '../components/AccordionCourseContent';
import { Chatbot } from '../components/ChatBot';



const CourseInside = ({ user, isAuthenticated, checkAuthenticated, load_user }) => {
  const navigate = useNavigate();
  const [courseInformation, setCourseInformation] = useState([]);
  const [courseContentInformation, setCourseContentInformation] = useState([]);
  const [courseSubsection, setCourseSubsection] = useState([]);
  const [courseSection, setCourseSection] = useState([]);
  let { courseId } = useParams();

  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  function handleNavigate(url) {
    navigate(url);
  }
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

      if (activities.tipo === "checklist_entrega") {
        return (
          <div className='rounded my-5 '>
            <h3 className="mb-4 font-semibold text-lg text-black">Autocomprensión de la tarea</h3>
            <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="entender-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                  <label for="entender-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">🎯 He entendido la actividad que tengo que realizar.</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="empezar-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                  <label for="empezar-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">⚡ Sé como empezar la actividad. </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="planificar-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                  <label for="planificar-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">📅 He planificado de manera correcta la actividad. </label>
                </div>
              </li>
            </ul>
          </div>
        )

      }
      if (activities.tipo === "checklist_entrega_final") {
        return (
          <div className='rounded my-5 '>
            <h3 className="mb-4 font-semibold text-lg text-black">Valorar actividad</h3>
            <ul className=" text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="entender-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                  <label for="entender-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">🚀 El Peer Review me ha ayudado a mejorar mi primera entrega.</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="empezar-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                  <label for="empezar-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">🏫 He aprendido algo realizando esta actividad. </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input id="planificar-checkbox" type="checkbox" value="" className=" text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  " />
                  <label for="planificar-checkbox" className="w-full py-3 ml-2 text-base font-normal text-gray-900 ">❤️ Me ha gustado realizar esta actividad. </label>
                </div>
              </li>
            </ul>
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

      if (activities.tipo === "cuestionario") {
        return (
          <div className='flex justify-center mt-5'>
            <div dangerouslySetInnerHTML={{ __html: activities.htmlcode }}></div>
          </div>
        )
      }

    }



  }

  function RenderTextActivitiesInsideCourse() {
    // Obtiene la sección correspondiente
    const section_ = courseContentInformation.find(seccion => seccion.titulo === courseSection);
    const subsection_ = section_.subsecciones.find(subseccion => subseccion.titulo === courseSubsection);
    var contenido = subsection_.contenido;
    console.log(contenido)
    return (
      <div className='mb-12'>
        {contenido.map(renderAllActivities)}
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
            <hr className="h-px my-3 bg-gray-800 border-0 "></hr>
            {courseContentInformation.length > 0 && RenderTextActivitiesInsideCourse()}
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