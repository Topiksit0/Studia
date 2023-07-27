import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBell } from "react-icons/fi";
import { Tag } from './Tag';
import { useAuthContext } from "../../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div>
            <nav className="h-[8rem] bg-white">
                <div className="container flex flex-wrap items-center ">
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <h1 className='p-10 sm:px-16 font-bold text-3xl italic leading-none tracking-tight cursor-pointer'>Studia <span className='text-pink-500 text-4xl '>.</span></h1>
                    <div className=' absolute right-0 flex items-center '>

                        <FiBell size={25} className="lg:mr-8 mr-4 cursor-pointer " />
                        <Tag className={'hidden lg:block'} User={user} />
                        {user && <p className='font-semibold mr-5 hidden lg:block'>{user['name']}</p>}
                        <button onClick={() => navigate(`/app/profile/${user.id}/`)} className='rounded w-14 mr-9'>
                            {user && user['profile_photo'] ? (
                                <img
                                    src={user['profile_photo'].url}
                                    className='object-scale-down rounded-lg cursor-pointer'
                                    alt=""
                                />
                            ) : (
                                <div></div>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
