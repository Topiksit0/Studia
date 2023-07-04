import React from 'react'
import { FiChevronRight } from "react-icons/fi";

export const ProfessorData = ({ professor }) => {
    return (
        <div className='flex-shrink-0 w-full sm:w-auto'>
            <div className='mt-8 bg-white rounded-lg  px-5 py-5  sm:mr-9 sm:right-0 sm:w-[30rem] w-full shadow-md sm:visible collapse'>
                <div className='flex items-center'>
                    <p className='text-lg font-medium'>About the instructor</p>
                    <button className='text-base ml-auto font-medium text-indigo-700'>View profile</button>
                    <FiChevronRight className='text-indigo-700' />
                </div>

                <div className='flex my-4 items-center space-x-3'>
                    <img className='w-[3rem] rounded' src={professor.profile_photo} alt="" />
                    <p className=' font-medium'>{professor.name}</p>

                </div>
                <p className='text-gray-500 font-normal truncate '>{professor.name} is an interactive designer & developer curently based in Amsterdam. As a multidisciplinary freelancer, he pairs a broad range of creative leadership experience.</p>
            </div>
        </div>
    )
}
