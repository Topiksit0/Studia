import React, { useState } from 'react';
import { FiUser, FiBell, FiLogOut, FiLock } from 'react-icons/fi';
import { FaLanguage  } from 'react-icons/fa';   
import { GrLanguage } from 'react-icons/gr';
import { BiHelpCircle } from 'react-icons/bi';

const SidebarSetting = ({ selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOptionChange = (option) => {
        setSelectedOption(option); // Actualizar el estado en el componente padre
    };

    const toggleDropdown = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <>
            {/* Botón del desplegable en pantallas de móvil */}
            <button
                onClick={toggleDropdown}
                className='block sm:hidden p-4 text-blue-600'
            >
                <svg
                    className={`w-6 h-6 ${isOpen ? 'transform rotate-90' : ''}`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                    />
                </svg>
            </button>

            <div className={`lg:rounded-tl-3xl h-full bg-[#eaedfa] p-9 text-base space-y-6 border-r border-[#b7bcd4] ${isOpen ? 'block' : 'hidden sm:block'}`}>
                <h1 className='text-2xl pb-6'>Settings</h1>
                <div className='space-y-4'>
                    <h1 className='text-lg pb-1'>User Account</h1>
                    <button className='flex items-center pl-4 gap-2 hover:text-indigo-600 hover:translate-x-[5px] transition-all' onClick={() => handleOptionChange('password')}>
                        <FiLock />
                        <h2 className='text-gray-700 font-medium hover:text-indigo-600'>Change password</h2>
                    </button>

                    <button className='flex items-center pl-4 gap-2 hover:text-indigo-600 hover:translate-x-[5px] transition-all' onClick={() => handleOptionChange('language')}>
                        <FaLanguage />
                        <h2 className='text-gray-700 font-medium hover:text-indigo-600'>Language</h2>
                    </button>
                </div>
                <div className='space-y-4 '>
                    <h1 className='text-lg pb-1'>Notifications</h1>
                    <button className='flex items-center pl-4 gap-2 hover:text-indigo-600 hover:translate-x-[5px] transition-all' onClick={() => handleOptionChange('notification')}>
                        <FiBell />
                        <h2 className='text-gray-700 font-medium hover:text-indigo-600'>Notification preferences</h2>
                    </button>
                </div>
                <div className='space-y-3'>
                    <hr className='mt-24 border-[#b7bcd4]' />
                    <button className='flex items-center gap-2 hover:text-indigo-600 hover:translate-x-[5px] transition-all mt-14 pt-2' onClick={() => handleOptionChange('help')}>
                        <BiHelpCircle className='w-5 h-5' />
                        <h1 className='text-base pb-1 font-medium'>Help</h1>
                    </button>
                    <button className='flex items-center gap-2 hover:text-indigo-600 hover:translate-x-[5px] transition-all'>
                        <FiLogOut className='w-5 h-5' />
                        <h1 className='text-base pb-1 font-medium'>Logout</h1>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SidebarSetting;
