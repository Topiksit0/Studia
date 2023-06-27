import React from 'react'
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

export const CoursesCardHome = (course) => {
    course = course.course
    return (
        <>
            <Link to={`/app/courses/${course.id}`}>
                <div className="max-w-sm bg-white  rounded-lg shadow cursor-pointer h-[35rem] shadow2">
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
            </Link>

        </>
    )
}
