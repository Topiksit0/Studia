import React from 'react'
import figure3 from '..//assets/figure3.svg';
import logo from '../assets/logo.png'
import draw from '../assets/draw.png';
import { MdSchool } from 'react-icons/md';
import { RiSurveyFill } from 'react-icons/ri';
import { FaSchool } from 'react-icons/fa';

import './styles/home.css'

const home = () => {
    return (
        <div name='home' className='blobright shadow-md' >
            <div className='grid grid-cols-12 blobleft shadow-md'>
                <div className='col-span-3 '>
                </div>
                <div className='h-screen col-span-6'>
                    <span className='flex justify-center '>
                        <img src={logo} className='object-scale-down h-16 w-8 mx-3' />
                        <h1 className='text-center text-3xl py-4 font-semibold'> Studia</h1>
                    </span>

                    <div className='h-[43rem] items-center sm:justify-start justify-center flex flex-wrap '>
                        <div className='sm:w-6/12'>
                            <h1 className='text-5xl tracking-tight font-bold '>Welcome to the new era of Learning</h1>
                            <p className='pt-16 font-semibold'>Join the future of education with our user-friendly e-learning platform designed for the University of Barcelona.</p>
                        </div>

                        <div className='sm:ml-6 '>
                            <a href="/login">
                                <button className="relative inline-flex items-center justify-center p-1 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 
                                rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4">
                                    <span className="relative px-10 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold" >
                                        Login
                                    </span>
                                </button>
                            </a>

                        </div>
                    </div>



                    <div className='flex flex-wrap gap-x-8 h-[11rem] gap-8 '>
                        <div className='shadow-md  bg-white grid text-center cursor-pointer from-green-400 p-1 to-blue-600 bg-gradient-to-r rounded-md w-48'>
                            <div className=' dark:bg-gray-900 rounded-md flex flex-col '>
                                <div>
                                    <FaSchool size={50} className='inline-grid text-white my-3' />
                                </div>

                                <h1 className='font-semibold text-white px-3'> New student?</h1>
                                <p className='text-xs text-white px-3'>If you are a student and you have just enrolled, create your credentials.</p>
                            </div>
                        </div>



                        <div className='shadow-md  bg-white grid text-center cursor-pointer  from-green-400 p-1 to-blue-600 bg-gradient-to-r rounded-md w-48'>
                            <div className=' dark:bg-gray-900 rounded-md flex flex-col'>
                                <div>
                                    <MdSchool size={50} className='inline text-white my-3' />
                                </div>

                                <h1 className='font-semibold text-white px-3'>Do you need help?</h1>
                                <p className='text-xs text-white px-3'>Consult the resources available or contact the support team.</p>
                            </div>
                        </div>


                        <div className='shadow-md  bg-white grid text-center cursor-pointer   from-green-400 p-1 to-blue-600 bg-gradient-to-r rounded-md w-48'>
                            <div className=' dark:bg-gray-900 rounded-md flex flex-col'>
                                <div>
                                    <RiSurveyFill className='inline text-white my-3' size={50} />
                                </div>

                                <h1 className='font-semibold text-white px-3'>Help us to improve</h1>
                                <p className='text-xs text-white px-3'>Complete the survey and help us to improve the teaching platform.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 ' >

                </div>

            </div>
        </div>
    )
}

export default home