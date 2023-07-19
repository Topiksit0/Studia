import React from 'react'
import { SettingsBreadcrumb } from './SettingsBreadcrumb';
import { NotImplemented } from '../../../shared/elements/NotImplemented';

export const SettingContent = ({ selectedOption }) => {
    const contactMethods = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ,
            contact: "studiawip@gmail.com"
        },
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
            ,
            contact: "Barcelona."
        },
    ]
    return (
        <div>
            {selectedOption === 'password' && (
                <div>
                    <main className='py-14 text-base'>
                        <div className="max-w-screen-xl  px-4 text-gray-600 md:px-8">
                            <SettingsBreadcrumb index={'Change password'} />
                           
                        </div>
                    </main>
                </div>
            )}
            {selectedOption === 'language' && (
                <div>
                    <main className='py-14 text-base'>
                        <div className="max-w-screen-xl  px-4 text-gray-600 md:px-8">
                            <SettingsBreadcrumb index={'Language'} />
                            <NotImplemented/>
                        </div>
                    </main>
                </div>
            )}

            {selectedOption === 'notification' && (
                <div>
                    <main className='py-14 text-base'>
                        <div className="max-w-screen-xl  px-4 text-gray-600 md:px-8">
                            <SettingsBreadcrumb index={'Notification preferences'} />
                            <NotImplemented/>
                        </div>
                    </main>
                </div>
            )}

            {selectedOption === 'help' && (
                <div>
                    <main className="py-14 text-base">
                        <div className="max-w-screen-xl  px-4 text-gray-600 md:px-8">
                            <div className="max-w-lg gap-24  lg:flex lg:max-w-none">
                                <div className="max-w-lg space-y-3">
                                    <h3 className="text-indigo-600 font-semibold">
                                        <SettingsBreadcrumb index={'Help'} />
                                    </h3>
                                    <div>

                                    </div>
                                    <p className="text-gray-800 py-10 text-3xl sm:text-4xl font-bold">
                                        Let us know how we can help
                                    </p>
                                    <p className='font-medium'>
                                        We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or use the contact information below.
                                    </p>
                                    <div>
                                        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                            {
                                                contactMethods.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-x-3 mt-6">
                                                        <div className="flex-none text-gray-400 ">
                                                            {item.icon}
                                                        </div>
                                                        <p className='font-normal '>{item.contact}</p>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex-1 mt-20 sm:max-w-lg lg:max-w-md bg-white rounded p-7 shadow-lg ">
                                    <form
                                        method='POST'
                                        action='https://getform.io/f/f2dc89ec-4d74-4789-a837-8411ebbeb789'
                                        className="space-y-5"
                                    >
                                        <div>
                                            <label className="font-medium">
                                                Full name
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                name='name'
                                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                name='email'
                                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="font-medium">
                                                Message
                                            </label>
                                            <textarea required name='message' className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                                        </div>
                                        <button
                                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

