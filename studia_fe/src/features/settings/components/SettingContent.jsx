import { useEffect, useState, React } from 'react';
import { SettingsBreadcrumb } from './SettingsBreadcrumb';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { NotImplemented } from '../../../shared/elements/NotImplemented';
import { useSelector } from 'react-redux';

export const SettingContent = ({ selectedOption, user, setSelectedOption }) => {
    const [isOldPasswordHidden, setOldPasswordHidden] = useState(true)
    const [isNewPasswordHidden, setNewPasswordHidden] = useState(true)
    const [isNewRePasswordHidden, setNewRePasswordHidden] = useState(true)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('')

    const accessToken = useSelector(state => state.auth.access);

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

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    const transition = { duration: 0.3 };

    function changePasswordButton() {
        fetch(`http://localhost:8000/api/accounts/users/${user.id}/change-password/`, {
            method: 'POST',
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
                new_password_repeat: newPasswordRepeat,
            }),
        }).then((response) => {
            if (response.ok) {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'success',
                    text: 'Password has been updated',
                    title: 'Success!'
                })
                setSelectedOption('help')
            } else {
                response.json().then((data) => {
                    console.log();
                    Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    }).fire({
                        icon: 'error',
                        text: data['detail'],
                        title: 'Failure'
                    })
                });
            }
        }
        ).catch((error) => {
            console.error('Error de red al intentar cambiar la contraseña:', error);
        });
    }

    return (
        <div>
            {selectedOption === 'password' && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
                    <main className="py-14 text-base">
                        <div className="max-w-screen-xl px-4 text-gray-600 md:px-8 ">
                            <SettingsBreadcrumb index={'Change password'} />
                            <div className='mt-16 '>
                                <div className='text-base font-normal flex flex-col space-y-8'>
                                    <div>
                                        <label className="text-gray-600 font-medium">
                                            Old Password
                                        </label>
                                        <div className="relative max-w-xs mt-2">
                                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                                onClick={() => setOldPasswordHidden(!isOldPasswordHidden)}
                                            >
                                                {
                                                    isOldPasswordHidden ? (
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    )
                                                }
                                            </button>
                                            <input
                                                type={isOldPasswordHidden ? "password" : "text"}
                                                placeholder="Enter your old password"
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full pr-12 pl-3 py-2 text-gray-500  outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>

                                        <label className="text-gray-600 font-medium">
                                            New password
                                        </label>
                                        <div className="relative max-w-xs mt-2">
                                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                                onClick={() => setNewPasswordHidden(!isNewPasswordHidden)}
                                            >
                                                {
                                                    isNewPasswordHidden ? (
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    )
                                                }
                                            </button>
                                            <input
                                                type={isNewPasswordHidden ? "password" : "text"}
                                                placeholder="Enter your new password"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full pr-12 pl-3 py-2 text-gray-500  outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-gray-600 font-medium">
                                            Rewrite your new password
                                        </label>
                                        <div className="relative max-w-xs mt-2">
                                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                                onClick={() => setNewRePasswordHidden(!isNewRePasswordHidden)}
                                            >
                                                {
                                                    isNewRePasswordHidden ? (
                                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                        </svg>

                                                    )
                                                }
                                            </button>
                                            <input
                                                type={isNewRePasswordHidden ? "password" : "text"}
                                                placeholder="Rewrite your password"
                                                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                                                className="w-full pr-12 pl-3 py-2 text-gray-500  outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div >
                                <button onClick={changePasswordButton}
                                    className="px-3 mt-8 py-1.5 text-sm text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </main>
                </motion.div>
            )}
            {selectedOption === 'language' && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
                    <main className="py-14 text-base">
                        <div className="max-w-screen-xl px-4 text-gray-600 md:px-8">
                            <SettingsBreadcrumb index={'Language'} />
                            <NotImplemented />
                        </div>
                    </main>
                </motion.div>
            )}

            {selectedOption === 'notification' && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
                    <main className="py-14 text-base">
                        <div className="max-w-screen-xl px-4 text-gray-600 md:px-8">
                            <SettingsBreadcrumb index={'Notification preferences'} />
                            <NotImplemented />
                        </div>
                    </main>
                </motion.div>
            )}

            {selectedOption === 'help' && (
                <motion.div initial="hidden" animate="visible" exit="hidden" variants={variants} transition={transition}>
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
                </motion.div>
            )}
        </div>
    );
};

